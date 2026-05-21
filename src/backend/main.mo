import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Nat32 "mo:core/Nat32";
import Char "mo:core/Char";
import Map "mo:core/Map";
import WalletTypes "types/wallet";
import WalletLib "lib/wallet";





actor {

  // ============================================================
  // TYPES
  // ============================================================

  public type UserRole = { #patient; #nurse; #admin };

  public type ServiceCategory = {
    #elderlycare; #woundcare; #postopcare; #physiotherapy; #ambulance
  };

  public type BookingStatus = {
    #pending; #accepted; #in_progress; #completed; #cancelled; #rejected
  };

  public type NurseStatus = {
    #pending_verification; #verified; #rejected
  };

  public type PatientProfile = {
    principal : Principal;
    // Basic identity
    name : Text;
    nik : ?Text;
    birthDate : ?Text;
    age : Nat;
    gender : ?Text;
    // Contact & address
    address : ?Text;
    phoneNumber : ?Text;
    // Emergency contact
    emergencyContactName : ?Text;
    emergencyContactRelation : ?Text;
    emergencyContactPhone : ?Text;
    // Documents
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    // Auth
    email : ?Text;
    passwordHash : ?Text;
    // Verification
    verificationStatus : Text;
    // Legacy fields kept for backward compat
    conditions : Text;
    allergies : Text;
    bloodType : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type PatientSummary = {
    principal : Principal;
    fullName : Text;
    nik : Text;
    submittedAt : Int;
    ktpPhotoUrl : Text;
    selfieUrl : Text;
    verificationStatus : Text;
  };

  public type NurseProfile = {
    principal : Principal;
    // Identity
    name : Text;
    specialization : Text;
    profession : ?Text;
    // Auth
    email : ?Text;
    passwordHash : ?Text;
    status : NurseStatus;
    // STR
    strNumber : Text;
    strExpiry : ?Text;
    strDocumentUrl : ?Text;
    // Education
    university : ?Text;
    graduationYear : ?Nat;
    ijazahDocumentUrl : ?Text;
    // Professional membership
    professionalOrg : ?Text;
    // Work history
    previousWorkHistory : ?Text;
    totalExperienceYears : ?Nat;
    previousFacilityType : ?Text;
    currentWorkplace : ?Text;
    currentWorkDuration : ?Nat;
    currentFacilityType : ?Text;
    // Certifications
    emergencyCertification : ?Text;
    emergencyCertExpiry : ?Text;
    additionalCertificates : ?Text;
    medicalCompetencies : ?Text;
    // Documents
    employeeIdCardUrl : ?Text;
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    // Legacy fields kept for backward compat
    experienceYears : Nat;
    strDocUrl : Text;
    ktpDocUrl : Text;
    // GPS
    latitude : ?Float;
    longitude : ?Float;
    locationUpdatedAt : ?Int;
    createdAt : Int;
    updatedAt : Int;
  };

  public type Service = {
    id : Nat;
    name : Text;
    description : Text;
    category : ServiceCategory;
    baseFeeIdr : Nat;
    isActive : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type Booking = {
    id : Nat;
    patientPrincipal : Principal;
    nursePrincipal : ?Principal;
    serviceId : Nat;
    scheduledDate : Text;
    scheduledTime : Text;
    latitude : Float;
    longitude : Float;
    notes : Text;
    status : BookingStatus;
    visitReport : ?Text;
    estimatedFeeIdr : Nat;
    createdAt : Int;
    updatedAt : Int;
  };

  public type PricingConfig = {
    perKmRateIdr : Nat;
    nightSurchargePct : Nat;
    holidaySurchargePct : Nat;
    updatedAt : Int;
  };

  public type PricingAuditEntry = {
    id : Nat;
    adminPrincipal : Principal;
    changeDescription : Text;
    changedAt : Int;
  };

  public type Article = {
    id : Nat;
    slug : Text;
    title : Text;
    metaDescription : Text;
    content : Text;
    imagePrompt : Text;
    references : [Text];
    category : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type Result<T, E> = { #ok : T; #err : E };

  public type BookingStats = {
    total : Nat;
    pending : Nat;
    accepted : Nat;
    in_progress : Nat;
    completed : Nat;
    cancelled : Nat;
    rejected : Nat;
  };

  public type DrugStock = {
    drugName : Text;
    category : Text;
    priceIdr : Nat;
    available : Bool;
    quantity : Nat;
  };

  public type Pharmacy = {
    id : Nat;
    name : Text;
    address : Text;
    phone : Text;
    lat : Float;
    lon : Float;
    openTime : Text;
    closeTime : Text;
    drugs : [DrugStock];
  };

  // ============================================================
  // ACTIVITY LOG TYPE
  // ============================================================

  public type ActivityEntry = {
    id : Nat;
    timestamp : Int;
    actorEmail : Text;
    actorRole : Text;
    actionType : Text;
    description : Text;
    metadata : Text;
  };

  // ============================================================
  // PLATFORM SETTINGS TYPE
  // ============================================================

  public type PlatformSettings = {
    appName : Text;
    supportPhone : Text;
    supportEmail : Text;
    maintenanceMode : Bool;
  };

  // ============================================================
  // STATE
  // ============================================================

  var roles        = List.empty<(Principal, UserRole)>();
  let patients     = List.empty<PatientProfile>();
  let nurses       = List.empty<NurseProfile>();
  let services     = List.empty<Service>();
  let bookings     = List.empty<Booking>();
  let auditLog     = List.empty<PricingAuditEntry>();
  let articles     = List.empty<Article>();
  let pharmacies   = List.empty<Pharmacy>();
  let activityLog  = List.empty<ActivityEntry>();

  // Wallet state
  let wallet_balances = Map.empty<Principal, WalletTypes.WalletBalance>();
  let wallet_transactions = List.empty<WalletTypes.WalletTransaction>();
  let wallet_state = { var nextTxId : Nat = 1 };

  let state = {
    var pricingConfig : PricingConfig = {
      perKmRateIdr       = 3000;
      nightSurchargePct  = 20;
      holidaySurchargePct = 25;
      updatedAt          = 0;
    };
    var nextServiceId : Nat = 1;
    var nextBookingId : Nat = 1;
    var nextAuditId   : Nat = 1;
    var nextArticleId : Nat = 1;
    var articlesSeedDone : Bool = false;
    var pharmacySeedDone : Bool = false;
  };

  // These are separate top-level fields so they get default values on upgrade
  // (avoids M0170 stable compatibility error when added to an existing deployment)
  var nextActivityId : Nat = 1;
  var accountsSeedDone : Bool = false;
  var platformSettings : PlatformSettings = {
    appName = "HEALIO MEDIKA";
    supportPhone = "+62-800-HEALIO";
    supportEmail = "support@healiomedika.id";
    maintenanceMode = false;
  };

  // ============================================================
  // AUDIT LOG HELPER
  // ============================================================

  func addAuditEntry(actorEmail : Text, actorRole : Text, actionType : Text, description : Text, metadata : Text) {
    let id = nextActivityId;
    nextActivityId += 1;
    // Cap at 10000 — drop oldest if exceeded
    if (activityLog.size() >= 10000) {
      activityLog.truncate(9999);
    };
    activityLog.add({
      id = id;
      timestamp = Time.now();
      actorEmail = actorEmail;
      actorRole = actorRole;
      actionType = actionType;
      description = description;
      metadata = metadata;
    });
  };

  // Resolve email from principal (check patients, nurses; fallback to principal text)
  func principalToEmail(p : Principal) : Text {
    switch (patients.find(func(pat : PatientProfile) : Bool { Principal.equal(pat.principal, p) })) {
      case (?pat) { switch (pat.email) { case (?e) e; case null p.toText() } };
      case null {
        switch (nurses.find(func(n : NurseProfile) : Bool { Principal.equal(n.principal, p) })) {
          case (?n) { switch (n.email) { case (?e) e; case null p.toText() } };
          case null { p.toText() };
        };
      };
    };
  };

  func roleText(p : Principal) : Text {
    switch (getRole(p)) {
      case (? #admin)   "admin";
      case (? #nurse)   "nurse";
      case (? #patient) "patient";
      case null         "anonymous";
    };
  };

  // ============================================================
  // SEED PERMANENT ACCOUNTS
  // ============================================================

  func seedPermanentAccounts() {
    if (accountsSeedDone) { return };
    accountsSeedDone := true;
    let now = Time.now();
    let hAdmin   = hashPassword("Admin123@");
    let hMedis   = hashPassword("Medis123@");
    let hPasien  = hashPassword("Pasien123@");
    // We store seed accounts as synthetic principal-less entries using a sentinel approach:
    // Use a dedicated seedAccounts list keyed by email.
    // Since the existing architecture ties profiles to Internet Identity Principals,
    // we store them with anonymous principal and a seeded flag so verifyEmailPassword
    // can find them by email.
    // Seed admin patient record (used only for login lookup)
    patients.add({
      principal                = Principal.fromText("aaaaa-aa");
      name                     = "Administrator";
      nik                      = ?"0000000000000001";
      birthDate                = ?"1990-01-01";
      age                      = 34;
      gender                   = ?"Laki-laki";
      address                  = ?"Jl. Admin No. 1, Jakarta";
      phoneNumber              = ?"+62811111111";
      emergencyContactName     = ?"Admin";
      emergencyContactRelation = ?"Self";
      emergencyContactPhone    = ?"+62811111111";
      ktpPhotoUrl              = null;
      selfieWithKtpUrl         = null;
      email                    = ?"limafaktaislam@gmail.com";
      passwordHash             = ?hAdmin;
      verificationStatus       = "verified";
      conditions               = "";
      allergies                = "";
      bloodType                = "";
      createdAt                = now;
      updatedAt                = now;
    });
    // Seed nurse (medis) account
    nurses.add({
      principal              = Principal.fromText("2vxsx-fae");
      name                   = "Endang Hulaepi (Medis)";
      specialization         = "Perawat Umum";
      profession             = ?"Perawat";
      email                  = ?"endanghulaepi06@gmail.com";
      passwordHash           = ?hMedis;
      status                 = #verified;
      strNumber              = "STR-SEED-001";
      strExpiry              = ?"2026-12-31";
      strDocumentUrl         = null;
      university             = ?"Universitas Indonesia";
      graduationYear         = ?2015;
      ijazahDocumentUrl      = null;
      professionalOrg        = ?"PPNI";
      previousWorkHistory    = ?"RSUP Dr. Cipto Mangunkusumo";
      totalExperienceYears   = ?9;
      previousFacilityType   = ?"Rumah Sakit";
      currentWorkplace       = ?"Healio Medika";
      currentWorkDuration    = ?1;
      currentFacilityType    = ?"Klinik";
      emergencyCertification = ?"BTCLS";
      emergencyCertExpiry    = ?"2026-06-30";
      additionalCertificates = null;
      medicalCompetencies    = ?"Perawatan Luka, Injeksi, Pemasangan NGT";
      employeeIdCardUrl      = null;
      ktpPhotoUrl            = null;
      selfieWithKtpUrl       = null;
      experienceYears        = 9;
      strDocUrl              = "";
      ktpDocUrl              = "";
      latitude               = null;
      longitude              = null;
      locationUpdatedAt      = null;
      createdAt              = now;
      updatedAt              = now;
    });
    // Seed patient account for endanghulaepi14
    patients.add({
      principal                = Principal.fromText("6fyp7-jaaa-aaaaa-aaaap-4ai");
      name                     = "Endang Hulaepi (Pasien)";
      nik                      = ?"0000000000000002";
      birthDate                = ?"1985-05-15";
      age                      = 39;
      gender                   = ?"Perempuan";
      address                  = ?"Jl. Pasien No. 2, Bandung";
      phoneNumber              = ?"+62822222222";
      emergencyContactName     = ?"Keluarga";
      emergencyContactRelation = ?"Saudara";
      emergencyContactPhone    = ?"+62822222222";
      ktpPhotoUrl              = null;
      selfieWithKtpUrl         = null;
      email                    = ?"endanghulaepi14@gmail.com";
      passwordHash             = ?hPasien;
      verificationStatus       = "verified";
      conditions               = "";
      allergies                = "";
      bloodType                = "";
      createdAt                = now;
      updatedAt                = now;
    });
  };

  // ============================================================
  // HELPERS
  // ============================================================

  func getRole(p : Principal) : ?UserRole {
    switch (roles.find(func(r : (Principal, UserRole)) : Bool { Principal.equal(r.0, p) })) {
      case (?(_, role)) { ?role };
      case null { null };
    };
  };

  func isAdmin(p : Principal) : Bool {
    switch (getRole(p)) { case (? #admin) true; case _ false };
  };

  func isNurse(p : Principal) : Bool {
    switch (getRole(p)) { case (? #nurse) true; case _ false };
  };

  func isPatient(p : Principal) : Bool {
    switch (getRole(p)) { case (? #patient) true; case _ false };
  };

  func haversineKm(lat1 : Float, lon1 : Float, lat2 : Float, lon2 : Float) : Float {
    let r = 6371.0;
    let dLat = (lat2 - lat1) * Float.pi / 180.0;
    let dLon = (lon2 - lon1) * Float.pi / 180.0;
    let a = Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0)
          + Float.cos(lat1 * Float.pi / 180.0) * Float.cos(lat2 * Float.pi / 180.0)
          * Float.sin(dLon / 2.0) * Float.sin(dLon / 2.0);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    r * c
  };

  // Hour from nanoseconds timestamp: returns 0-23
  func hourFromNs(ns : Int) : Nat {
    let seconds = ns / 1_000_000_000;
    let secInDay = seconds % 86400;
    let hr = secInDay / 3600;
    if (hr >= 0) { hr.toNat() } else { 0 };
  };

  func _isNightTime(ns : Int) : Bool {
    let h = hourFromNs(ns);
    h >= 18 or h < 6
  };

  func calcFee(baseFee : Nat, distanceKm : Float, nightTime : Bool, holiday : Bool) : Nat {
    let cfg = state.pricingConfig;
    let transportCost = Int.abs((distanceKm * cfg.perKmRateIdr.toFloat()).toInt()).toNat();
    var total = baseFee + transportCost;
    if (nightTime) {
      total := total + (total * cfg.nightSurchargePct / 100);
    };
    if (holiday) {
      total := total + (total * cfg.holidaySurchargePct / 100);
    };
    total
  };

  // ============================================================
  // AUTH
  // ============================================================

  // Simple hash for password — XOR-fold of UTF-8 bytes represented as hex text
  func hashPassword(pw : Text) : Text {
    var h : Nat32 = 2166136261;
    for (c in pw.chars()) {
      h := (h ^ Nat32.fromNat(c.toNat32().toNat() % 256)) *% 16777619;
    };
    h.toText()
  };

  public shared ({ caller }) func registerAsPatient() : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #patient));
    addAuditEntry(caller.toText(), "patient", "REGISTER", "New patient registered", "");
    "ok"
  };

  public shared ({ caller }) func registerAsNurse(
    name : Text,
    strNumber : Text,
    strExpiry : Text,
    strDocumentUrl : ?Text,
    specialization : Text,
    profession : Text,
    university : Text,
    graduationYear : Nat,
    ijazahDocumentUrl : ?Text,
    professionalOrg : Text,
    previousWorkHistory : Text,
    totalExperienceYears : Nat,
    previousFacilityType : Text,
    currentWorkplace : Text,
    currentWorkDuration : Nat,
    currentFacilityType : Text,
    emergencyCertification : Text,
    emergencyCertExpiry : Text,
    additionalCertificates : Text,
    medicalCompetencies : Text,
    employeeIdCardUrl : ?Text,
    ktpPhotoUrl : ?Text,
    selfieWithKtpUrl : ?Text,
  ) : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #nurse));
    addAuditEntry(caller.toText(), "nurse", "REGISTER", "New nurse registered", "");
    let now = Time.now();
    nurses.add({
      principal             = caller;
      name                  = name;
      specialization        = specialization;
      profession            = ?profession;
      email                 = null;
      passwordHash          = null;
      status                = #pending_verification;
      strNumber             = strNumber;
      strExpiry             = ?strExpiry;
      strDocumentUrl        = strDocumentUrl;
      university            = ?university;
      graduationYear        = ?graduationYear;
      ijazahDocumentUrl     = ijazahDocumentUrl;
      professionalOrg       = ?professionalOrg;
      previousWorkHistory   = ?previousWorkHistory;
      totalExperienceYears  = ?totalExperienceYears;
      previousFacilityType  = ?previousFacilityType;
      currentWorkplace      = ?currentWorkplace;
      currentWorkDuration   = ?currentWorkDuration;
      currentFacilityType   = ?currentFacilityType;
      emergencyCertification = ?emergencyCertification;
      emergencyCertExpiry   = ?emergencyCertExpiry;
      additionalCertificates = ?additionalCertificates;
      medicalCompetencies   = ?medicalCompetencies;
      employeeIdCardUrl     = employeeIdCardUrl;
      ktpPhotoUrl           = ktpPhotoUrl;
      selfieWithKtpUrl      = selfieWithKtpUrl;
      experienceYears       = totalExperienceYears;
      strDocUrl             = (switch (strDocumentUrl) { case (?u) u; case null "" });
      ktpDocUrl             = (switch (ktpPhotoUrl) { case (?u) u; case null "" });
      latitude              = null;
      longitude             = null;
      locationUpdatedAt     = null;
      createdAt             = now;
      updatedAt             = now;
    });
    "ok"
  };

  // Register with email and password (saves credentials to caller's profile)
  public shared ({ caller }) func saveEmailPassword(email : Text, password : Text) : async Result<Text, Text> {
    if (caller.isAnonymous()) { return #err("not authenticated") };
    let h = hashPassword(password);
    switch (getRole(caller)) {
      case (? #patient) {
        switch (patients.findIndex(func(p : PatientProfile) : Bool { Principal.equal(p.principal, caller) })) {
          case (?idx) {
            let existing = patients.at(idx);
            patients.put(idx, { existing with email = ?email; passwordHash = ?h; updatedAt = Time.now() });
            #ok("ok")
          };
          case null { #err("profile not found, save patient profile first") };
        };
      };
      case (? #nurse) {
        switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })) {
          case (?idx) {
            let existing = nurses.at(idx);
            nurses.put(idx, { existing with email = ?email; passwordHash = ?h; updatedAt = Time.now() });
            #ok("ok")
          };
          case null { #err("profile not found, save nurse profile first") };
        };
      };
      case _ { #err("role not registered") };
    };
  };

  // Verify email+password — checks stored accounts (permanent seed + registered users)
  // Works with anonymous callers (no auth required)
  public shared func verifyEmailPassword(email : Text, password : Text) : async Result<Text, Text> {
    // Ensure seed accounts exist
    seedPermanentAccounts();
    let h = hashPassword(password);
    // Check admin seed first (hardcoded email)
    if (email == "limafaktaislam@gmail.com") {
      let hAdmin = hashPassword("Admin123@");
      if (h == hAdmin) {
        addAuditEntry(email, "admin", "LOGIN", "Admin login via email", "");
        return #ok("admin");
      } else {
        return #err("invalid credentials");
      };
    };
    // Check nurse accounts
    switch (nurses.find(func(n : NurseProfile) : Bool { n.email == ?email })) {
      case (?n) {
        if (n.passwordHash == ?h) {
          addAuditEntry(email, "nurse", "LOGIN", "Nurse login via email", "");
          return #ok("nurse");
        } else {
          return #err("invalid credentials");
        };
      };
      case null {};
    };
    // Check patient accounts
    switch (patients.find(func(p : PatientProfile) : Bool { p.email == ?email })) {
      case (?p) {
        if (p.passwordHash == ?h) {
          addAuditEntry(email, "patient", "LOGIN", "Patient login via email", "");
          return #ok("patient");
        } else {
          return #err("invalid credentials");
        };
      };
      case null {};
    };
    #err("not registered");
  };

  // Login with email/password — returns role on success (callable anonymously)
  public shared func loginWithEmail(email : Text, password : Text) : async Result<{ role : Text }, Text> {
    seedPermanentAccounts();
    let h = hashPassword(password);
    // Admin (hardcoded)
    if (email == "limafaktaislam@gmail.com") {
      let hAdmin = hashPassword("Admin123@");
      if (h == hAdmin) {
        addAuditEntry(email, "admin", "LOGIN", "Admin login", "");
        return #ok({ role = "admin" });
      } else {
        return #err("invalid credentials");
      };
    };
    // Nurse accounts
    switch (nurses.find(func(n : NurseProfile) : Bool { n.email == ?email })) {
      case (?n) {
        if (n.passwordHash == ?h) {
          addAuditEntry(email, "nurse", "LOGIN", "Nurse login", "");
          return #ok({ role = "nurse" });
        } else {
          return #err("invalid credentials");
        };
      };
      case null {};
    };
    // Patient accounts
    switch (patients.find(func(p : PatientProfile) : Bool { p.email == ?email })) {
      case (?p) {
        if (p.passwordHash == ?h) {
          addAuditEntry(email, "patient", "LOGIN", "Patient login", "");
          return #ok({ role = "patient" });
        } else {
          return #err("invalid credentials");
        };
      };
      case null {};
    };
    #err("not registered");
  };

  public shared ({ caller }) func registerAsAdmin() : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #admin));
    addAuditEntry(caller.toText(), "admin", "REGISTER", "New admin registered", "");
    "ok"
  };

  public shared query ({ caller }) func getMyRole() : async ?Text {
    switch (getRole(caller)) {
      case (? #patient) { ?"patient" };
      case (? #nurse)   { ?"nurse"   };
      case (? #admin)   { ?"admin"   };
      case null         { null       };
    };
  };

  // ============================================================
  // PATIENT PROFILE
  // ============================================================

  public shared ({ caller }) func savePatientProfile(
    name : Text,
    nik : Text,
    birthDate : Text,
    age : Nat,
    gender : Text,
    address : Text,
    phoneNumber : Text,
    emergencyContactName : Text,
    emergencyContactRelation : Text,
    emergencyContactPhone : Text,
    ktpPhotoUrl : ?Text,
    selfieWithKtpUrl : ?Text,
    // Legacy fields
    conditions : Text,
    allergies : Text,
    bloodType : Text,
  ) : async Text {
    if (not isPatient(caller)) { return "error: not a patient" };
    let now = Time.now();
    switch (patients.findIndex(func(p : PatientProfile) : Bool { Principal.equal(p.principal, caller) })) {
      case (?idx) {
        let existing = patients.at(idx);
        patients.put(idx, {
          existing with
          name                     = name;
          nik                      = ?nik;
          birthDate                = ?birthDate;
          age                      = age;
          gender                   = ?gender;
          address                  = ?address;
          phoneNumber              = ?phoneNumber;
          emergencyContactName     = ?emergencyContactName;
          emergencyContactRelation = ?emergencyContactRelation;
          emergencyContactPhone    = ?emergencyContactPhone;
          ktpPhotoUrl              = ktpPhotoUrl;
          selfieWithKtpUrl         = selfieWithKtpUrl;
          conditions               = conditions;
          allergies                = allergies;
          bloodType                = bloodType;
          verificationStatus       = existing.verificationStatus;
          updatedAt                = now;
        });
      };
      case null {
        patients.add({
          principal                = caller;
          name                     = name;
          nik                      = ?nik;
          birthDate                = ?birthDate;
          age                      = age;
          gender                   = ?gender;
          address                  = ?address;
          phoneNumber              = ?phoneNumber;
          emergencyContactName     = ?emergencyContactName;
          emergencyContactRelation = ?emergencyContactRelation;
          emergencyContactPhone    = ?emergencyContactPhone;
          ktpPhotoUrl              = ktpPhotoUrl;
          selfieWithKtpUrl         = selfieWithKtpUrl;
          email                    = null;
          passwordHash             = null;
          verificationStatus       = "pending_verification";
          conditions               = conditions;
          allergies                = allergies;
          bloodType                = bloodType;
          createdAt                = now;
          updatedAt                = now;
        });
      };
    };
    "ok"
  };

  public shared query ({ caller }) func getMyPatientProfile() : async ?PatientProfile {
    patients.find(func(p : PatientProfile) : Bool { Principal.equal(p.principal, caller) })
  };

  // ============================================================
  // NURSE PROFILE
  // ============================================================

  public shared ({ caller }) func saveNurseProfile(
    name : Text,
    strNumber : Text,
    strExpiry : Text,
    strDocumentUrl : ?Text,
    specialization : Text,
    profession : Text,
    university : Text,
    graduationYear : Nat,
    ijazahDocumentUrl : ?Text,
    professionalOrg : Text,
    previousWorkHistory : Text,
    totalExperienceYears : Nat,
    previousFacilityType : Text,
    currentWorkplace : Text,
    currentWorkDuration : Nat,
    currentFacilityType : Text,
    emergencyCertification : Text,
    emergencyCertExpiry : Text,
    additionalCertificates : Text,
    medicalCompetencies : Text,
    employeeIdCardUrl : ?Text,
    ktpPhotoUrl : ?Text,
    selfieWithKtpUrl : ?Text,
  ) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    let now = Time.now();
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })) {
      case (?idx) {
        let existing = nurses.at(idx);
        nurses.put(idx, {
          existing with
          name                   = name;
          specialization         = specialization;
          profession             = ?profession;
          strNumber              = strNumber;
          strExpiry              = ?strExpiry;
          strDocumentUrl         = strDocumentUrl;
          university             = ?university;
          graduationYear         = ?graduationYear;
          ijazahDocumentUrl      = ijazahDocumentUrl;
          professionalOrg        = ?professionalOrg;
          previousWorkHistory    = ?previousWorkHistory;
          totalExperienceYears   = ?totalExperienceYears;
          previousFacilityType   = ?previousFacilityType;
          currentWorkplace       = ?currentWorkplace;
          currentWorkDuration    = ?currentWorkDuration;
          currentFacilityType    = ?currentFacilityType;
          emergencyCertification = ?emergencyCertification;
          emergencyCertExpiry    = ?emergencyCertExpiry;
          additionalCertificates = ?additionalCertificates;
          medicalCompetencies    = ?medicalCompetencies;
          employeeIdCardUrl      = employeeIdCardUrl;
          ktpPhotoUrl            = ktpPhotoUrl;
          selfieWithKtpUrl       = selfieWithKtpUrl;
          experienceYears        = totalExperienceYears;
          strDocUrl              = (switch (strDocumentUrl) { case (?u) u; case null "" });
          ktpDocUrl              = (switch (ktpPhotoUrl) { case (?u) u; case null "" });
          updatedAt              = now;
        });
      };
      case null {
        nurses.add({
          principal              = caller;
          name                   = name;
          specialization         = specialization;
          profession             = ?profession;
          email                  = null;
          passwordHash           = null;
          status                 = #pending_verification;
          strNumber              = strNumber;
          strExpiry              = ?strExpiry;
          strDocumentUrl         = strDocumentUrl;
          university             = ?university;
          graduationYear         = ?graduationYear;
          ijazahDocumentUrl      = ijazahDocumentUrl;
          professionalOrg        = ?professionalOrg;
          previousWorkHistory    = ?previousWorkHistory;
          totalExperienceYears   = ?totalExperienceYears;
          previousFacilityType   = ?previousFacilityType;
          currentWorkplace       = ?currentWorkplace;
          currentWorkDuration    = ?currentWorkDuration;
          currentFacilityType    = ?currentFacilityType;
          emergencyCertification = ?emergencyCertification;
          emergencyCertExpiry    = ?emergencyCertExpiry;
          additionalCertificates = ?additionalCertificates;
          medicalCompetencies    = ?medicalCompetencies;
          employeeIdCardUrl      = employeeIdCardUrl;
          ktpPhotoUrl            = ktpPhotoUrl;
          selfieWithKtpUrl       = selfieWithKtpUrl;
          experienceYears        = totalExperienceYears;
          strDocUrl              = (switch (strDocumentUrl) { case (?u) u; case null "" });
          ktpDocUrl              = (switch (ktpPhotoUrl) { case (?u) u; case null "" });
          latitude               = null;
          longitude              = null;
          locationUpdatedAt      = null;
          createdAt              = now;
          updatedAt              = now;
        });
      };
    };
    "ok"
  };

  public shared query ({ caller }) func getMyNurseProfile() : async ?NurseProfile {
    nurses.find(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })
  };

  public shared query func getNurseProfile(p : Principal) : async ?NurseProfile {
    nurses.find(func(n : NurseProfile) : Bool { Principal.equal(n.principal, p) })
  };

  public shared ({ caller }) func updateNurseLocation(lat : Float, lon : Float) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    let now = Time.now();
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })) {
      case (?idx) {
        let existing = nurses.at(idx);
        nurses.put(idx, {
          existing with
          latitude = ?lat; longitude = ?lon;
          locationUpdatedAt = ?now;
          updatedAt = now;
        });
        "ok"
      };
      case null { "error: nurse profile not found" };
    };
  };

  public shared query func getNearbyNurses(lat : Float, lon : Float, radiusKm : Float) : async [NurseProfile] {
    nurses.toArray().filter(func(n : NurseProfile) : Bool {
      switch (n.latitude, n.longitude) {
        case (?nLat, ?nLon) {
          n.status == #verified and haversineKm(lat, lon, nLat, nLon) <= radiusKm
        };
        case _ { false };
      };
    })
  };

  // ============================================================
  // SERVICES
  // ============================================================

  public shared query func listServices() : async [Service] {
    services.toArray().filter(func(s : Service) : Bool { s.isActive })
  };

  public shared query ({ caller }) func listAllServices() : async [Service] {
    if (not isAdmin(caller)) { return [] };
    services.toArray()
  };

  public shared ({ caller }) func adminCreateService(
    name : Text,
    description : Text,
    category : ServiceCategory,
    baseFeeIdr : Nat,
  ) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    let id = state.nextServiceId;
    state.nextServiceId += 1;
    services.add({
      id = id; name = name; description = description;
      category = category; baseFeeIdr = baseFeeIdr;
      isActive = true; createdAt = now; updatedAt = now;
    });
    "ok"
  };

  public shared ({ caller }) func adminUpdateService(
    id : Nat,
    name : Text,
    description : Text,
    baseFeeIdr : Nat,
  ) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    switch (services.findIndex(func(s : Service) : Bool { s.id == id })) {
      case (?idx) {
        let existing = services.at(idx);
        services.put(idx, {
          existing with
          name = name; description = description;
          baseFeeIdr = baseFeeIdr; updatedAt = now;
        });
        "ok"
      };
      case null { "error: service not found" };
    };
  };

  public shared ({ caller }) func adminDeleteService(id : Nat) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    switch (services.findIndex(func(s : Service) : Bool { s.id == id })) {
      case (?idx) {
        let existing = services.at(idx);
        services.put(idx, { existing with isActive = false; updatedAt = now });
        "ok"
      };
      case null { "error: service not found" };
    };
  };

  // ============================================================
  // BOOKINGS
  // ============================================================

  public shared ({ caller }) func createBooking(
    serviceId : Nat,
    scheduledDate : Text,
    scheduledTime : Text,
    latitude : Float,
    longitude : Float,
    notes : Text,
  ) : async Text {
    if (not isPatient(caller)) { return "error: not a patient" };
    switch (services.find(func(s : Service) : Bool { s.id == serviceId and s.isActive })) {
      case null { return "error: service not found" };
      case (?_) {};
    };
    let now = Time.now();
    let id = state.nextBookingId;
    addAuditEntry(principalToEmail(caller), "patient", "CREATE_BOOKING",
      "Created booking for service " # serviceId.toText(), "bookingId=" # id.toText());
    state.nextBookingId += 1;
    bookings.add({
      id = id;
      patientPrincipal = caller;
      nursePrincipal = null;
      serviceId = serviceId;
      scheduledDate = scheduledDate;
      scheduledTime = scheduledTime;
      latitude = latitude;
      longitude = longitude;
      notes = notes;
      status = #pending;
      visitReport = null;
      estimatedFeeIdr = 0;
      createdAt = now;
      updatedAt = now;
    });
    "ok"
  };

  public shared ({ caller }) func acceptBooking(bookingId : Nat) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    switch (nurses.find(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })) {
      case (?nurse) {
        if (nurse.status != #verified) { return "error: nurse not verified" };
      };
      case null { return "error: nurse profile not found" };
    };
    let now = Time.now();
    switch (bookings.findIndex(func(b : Booking) : Bool { b.id == bookingId and b.status == #pending })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, {
          existing with
          nursePrincipal = ?caller;
          status = #accepted;
          updatedAt = now;
        });
        addAuditEntry(principalToEmail(caller), "nurse", "ACCEPT_BOOKING",
          "Accepted booking " # bookingId.toText(), "");
        "ok"
      };
      case null { "error: booking not found or not pending" };
    };
  };

  public shared ({ caller }) func rejectBooking(bookingId : Nat) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    let now = Time.now();
    switch (bookings.findIndex(func(b : Booking) : Bool {
      b.id == bookingId and b.status == #pending
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, { existing with status = #rejected; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "nurse", "REJECT_BOOKING",
          "Rejected booking " # bookingId.toText(), "");
        "ok"
      };
      case null { "error: booking not found or not pending" };
    };
  };

  public shared ({ caller }) func cancelBooking(bookingId : Nat) : async Text {
    if (not isPatient(caller)) { return "error: not a patient" };
    let now = Time.now();
    switch (bookings.findIndex(func(b : Booking) : Bool {
      b.id == bookingId
      and Principal.equal(b.patientPrincipal, caller)
      and (b.status == #pending or b.status == #accepted)
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, { existing with status = #cancelled; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "patient", "CANCEL_BOOKING",
          "Cancelled booking " # bookingId.toText(), "");
        "ok"
      };
      case null { "error: booking not found or cannot be cancelled" };
    };
  };

  public shared ({ caller }) func submitVisitReport(bookingId : Nat, reportText : Text) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    let now = Time.now();
    switch (bookings.findIndex(func(b : Booking) : Bool {
      b.id == bookingId
      and (switch (b.nursePrincipal) { case (?np) Principal.equal(np, caller); case null false })
      and b.status == #accepted
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, {
          existing with
          visitReport = ?reportText;
          status = #completed;
          updatedAt = now;
        });
        addAuditEntry(principalToEmail(caller), "nurse", "COMPLETE_BOOKING",
          "Submitted visit report for booking " # bookingId.toText(), "");
        "ok"
      };
      case null { "error: booking not found or not accepted" };
    };
  };

  public shared query ({ caller }) func getMyBookings() : async [Booking] {
    bookings.toArray().filter(func(b : Booking) : Bool {
      Principal.equal(b.patientPrincipal, caller)
    })
  };

  public shared query ({ caller }) func getNurseSchedule() : async [Booking] {
    bookings.toArray().filter(func(b : Booking) : Bool {
      (switch (b.nursePrincipal) { case (?np) Principal.equal(np, caller); case null false })
      and (b.status == #accepted or b.status == #in_progress)
    })
  };

  public shared query ({ caller }) func getIncomingBookings() : async [Booking] {
    if (not isNurse(caller)) { return [] };
    bookings.toArray().filter(func(b : Booking) : Bool { b.status == #pending })
  };

  public shared query ({ caller }) func getAllBookings() : async [Booking] {
    if (not isAdmin(caller)) { return [] };
    bookings.toArray()
  };

  public shared query ({ caller }) func getBookingStats() : async ?BookingStats {
    if (not isAdmin(caller)) { return null };
    let all = bookings.toArray();
    var total = 0;
    var pending = 0;
    var accepted = 0;
    var in_progress = 0;
    var completed = 0;
    var cancelled = 0;
    var rejected = 0;
    for (b in all.values()) {
      total += 1;
      switch (b.status) {
        case (#pending)     { pending += 1     };
        case (#accepted)    { accepted += 1    };
        case (#in_progress) { in_progress += 1 };
        case (#completed)   { completed += 1   };
        case (#cancelled)   { cancelled += 1   };
        case (#rejected)    { rejected += 1    };
      };
    };
    ?{ total; pending; accepted; in_progress; completed; cancelled; rejected }
  };

  // ============================================================
  // ADMIN — PATIENT MANAGEMENT
  // ============================================================

  public shared ({ caller }) func adminApprovePatient(patientPrincipal : Principal) : async Result<Text, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    let now = Time.now();
    switch (patients.findIndex(func(p : PatientProfile) : Bool { Principal.equal(p.principal, patientPrincipal) })) {
      case (?idx) {
        let existing = patients.at(idx);
        patients.put(idx, { existing with verificationStatus = "verified"; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "admin", "APPROVE_PATIENT", "Approved patient: " # patientPrincipal.toText(), "");
        #ok("ok")
      };
      case null { #err("patient not found") };
    };
  };

  public shared ({ caller }) func adminRejectPatient(patientPrincipal : Principal) : async Result<Text, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    let now = Time.now();
    switch (patients.findIndex(func(p : PatientProfile) : Bool { Principal.equal(p.principal, patientPrincipal) })) {
      case (?idx) {
        let existing = patients.at(idx);
        patients.put(idx, { existing with verificationStatus = "rejected"; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "admin", "REJECT_PATIENT", "Rejected patient: " # patientPrincipal.toText(), "");
        #ok("ok")
      };
      case null { #err("patient not found") };
    };
  };

  public shared query ({ caller }) func getPendingPatients() : async [PatientSummary] {
    if (not isAdmin(caller)) { return [] };
    patients.toArray()
      .filter(func(p : PatientProfile) : Bool { p.verificationStatus == "pending_verification" })
      .map<PatientProfile, PatientSummary>(func(p) {
        {
          principal         = p.principal;
          fullName          = p.name;
          nik               = (switch (p.nik) { case (?v) v; case null "" });
          submittedAt       = p.updatedAt;
          ktpPhotoUrl       = (switch (p.ktpPhotoUrl) { case (?v) v; case null "" });
          selfieUrl         = (switch (p.selfieWithKtpUrl) { case (?v) v; case null "" });
          verificationStatus = p.verificationStatus;
        }
      })
  };

  public shared query ({ caller }) func getAllPatients() : async [PatientProfile] {
    if (not isAdmin(caller)) { return [] };
    patients.toArray()
  };

  // ============================================================
  // ADMIN — NURSE MANAGEMENT
  // ============================================================

  public shared query ({ caller }) func getPendingNurses() : async [NurseProfile] {
    if (not isAdmin(caller)) { return [] };
    nurses.toArray().filter(func(n : NurseProfile) : Bool { n.status == #pending_verification })
  };

  public shared query ({ caller }) func getAllNurses() : async [NurseProfile] {
    if (not isAdmin(caller)) { return [] };
    nurses.toArray()
  };

  public shared ({ caller }) func approveNurse(nursePrincipal : Principal) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, nursePrincipal) })) {
      case (?idx) {
        let existing = nurses.at(idx);
        nurses.put(idx, { existing with status = #verified; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "admin", "APPROVE_NURSE", "Approved nurse: " # nursePrincipal.toText(), "");
        "ok"
      };
      case null { "error: nurse not found" };
    };
  };

  public shared ({ caller }) func rejectNurse(nursePrincipal : Principal) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, nursePrincipal) })) {
      case (?idx) {
        let existing = nurses.at(idx);
        nurses.put(idx, { existing with status = #rejected; updatedAt = now });
        addAuditEntry(principalToEmail(caller), "admin", "REJECT_NURSE", "Rejected nurse: " # nursePrincipal.toText(), "");
        "ok"
      };
      case null { "error: nurse not found" };
    };
  };

  // ============================================================
  // PRICING
  // ============================================================

  public shared query func getPricingConfig() : async PricingConfig {
    state.pricingConfig
  };

  public shared ({ caller }) func adminUpdatePricing(
    perKmRateIdr : Nat,
    nightSurchargePct : Nat,
    holidaySurchargePct : Nat,
  ) : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    let now = Time.now();
    state.pricingConfig := {
      perKmRateIdr = perKmRateIdr;
      nightSurchargePct = nightSurchargePct;
      holidaySurchargePct = holidaySurchargePct;
      updatedAt = now;
    };
    let id = state.nextAuditId;
    state.nextAuditId += 1;
    auditLog.add({
      id = id;
      adminPrincipal = caller;
      changeDescription = "Updated pricing: perKm=" # perKmRateIdr.toText()
        # " nightPct=" # nightSurchargePct.toText()
        # " holidayPct=" # holidaySurchargePct.toText();
      changedAt = now;
    });
    addAuditEntry(principalToEmail(caller), "admin", "UPDATE_PRICING",
      "Updated pricing config",
      "perKm=" # perKmRateIdr.toText() # " nightPct=" # nightSurchargePct.toText() # " holidayPct=" # holidaySurchargePct.toText());
    "ok"
  };

  public shared query ({ caller }) func getPricingAuditLog() : async [PricingAuditEntry] {
    if (not isAdmin(caller)) { return [] };
    auditLog.toArray()
  };

  public shared query func estimateCost(
    serviceId : Nat,
    distanceKm : Float,
    nightTime : Bool,
    holiday : Bool,
  ) : async ?Nat {
    switch (services.find(func(s : Service) : Bool { s.id == serviceId and s.isActive })) {
      case (?svc) {
        ?calcFee(svc.baseFeeIdr, distanceKm, nightTime, holiday)
      };
      case null { null };
    };
  };

  // ============================================================
  // ARTICLES
  // ============================================================

  public shared query func listArticles(page : Nat, pageSize : Nat) : async { items : [Article]; total : Nat } {
    let all = articles.toArray();
    let total = all.size();
    let start = page * pageSize;
    if (start >= total) { return { items = []; total } };
    let end = if (start + pageSize > total) { total } else { start + pageSize };
    let items = Array.tabulate(end - start, func(i) { all[start + i] });
    { items; total }
  };

  public shared query func getArticleBySlug(slug : Text) : async ?Article {
    articles.find(func(a : Article) : Bool { a.slug == slug })
  };

  public shared query func searchArticles(searchQuery : Text, page : Nat, pageSize : Nat) : async { items : [Article]; total : Nat } {
    let q = searchQuery.toLower();
    let matched = articles.toArray().filter(func(a : Article) : Bool {
      a.title.toLower().contains(#text q) or a.content.toLower().contains(#text q) or a.category.toLower().contains(#text q)
    });
    let total = matched.size();
    let start = page * pageSize;
    if (start >= total) { return { items = []; total } };
    let end = if (start + pageSize > total) { total } else { start + pageSize };
    let items = Array.tabulate(end - start, func(i) { matched[start + i] });
    { items; total }
  };

  public shared ({ caller }) func adminCreateArticle(
    slug : Text,
    title : Text,
    metaDescription : Text,
    content : Text,
    imagePrompt : Text,
    references : [Text],
    category : Text,
  ) : async Result<Nat, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    let now = Time.now();
    let id = state.nextArticleId;
    state.nextArticleId += 1;
    articles.add({ id; slug; title; metaDescription; content; imagePrompt; references; category; createdAt = now; updatedAt = now });
    #ok(id)
  };

  public shared ({ caller }) func adminUpdateArticle(
    id : Nat,
    title : Text,
    metaDescription : Text,
    content : Text,
    imagePrompt : Text,
    references : [Text],
    category : Text,
  ) : async Result<Text, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    let now = Time.now();
    switch (articles.findIndex(func(a : Article) : Bool { a.id == id })) {
      case (?idx) {
        let existing = articles.at(idx);
        articles.put(idx, { existing with title; metaDescription; content; imagePrompt; references; category; updatedAt = now });
        #ok("ok")
      };
      case null { #err("article not found") };
    };
  };

  // ============================================================
  // WALLET API
  // ============================================================

  public query ({ caller }) func getMyBalance() : async WalletTypes.WalletBalance {
    WalletLib.getBalance(caller, wallet_balances);
  };

  public shared ({ caller }) func deposit(
    amount : Nat,
    method : WalletTypes.DepositMethod,
  ) : async { #ok : WalletTypes.WalletBalance; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    let updated = WalletLib.addBalance(caller, amount, wallet_balances);
    let txId = wallet_state.nextTxId;
    wallet_state.nextTxId += 1;
    WalletLib.recordTransaction({
      id = txId;
      userId = caller;
      transactionType = #deposit;
      amount = amount;
      currency = "IDR";
      description = "Deposit via " # WalletLib.depositMethodToText(method);
      status = #completed;
      createdAt = Time.now();
    }, wallet_transactions);
    addAuditEntry(principalToEmail(caller), roleText(caller), "DEPOSIT_WALLET",
      "Deposit IDR " # amount.toText(), "method=" # WalletLib.depositMethodToText(method));
    #ok(updated);
  };

  public shared ({ caller }) func requestWithdrawal(
    amount : Nat,
    method : WalletTypes.WithdrawalMethod,
    accountNumber : Text,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    switch (WalletLib.deductBalance(caller, amount, wallet_balances)) {
      case (#err(e)) { #err(e) };
      case (#ok(_)) {
        let txId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txId;
          userId = caller;
          transactionType = #withdrawal;
          amount = amount;
          currency = "IDR";
          description = "Penarikan dana ke " # WalletLib.withdrawalMethodToText(method) # " (" # accountNumber # ")";
          status = #pending;
          createdAt = Time.now();
        }, wallet_transactions);
        addAuditEntry(principalToEmail(caller), roleText(caller), "WITHDRAW_WALLET",
          "Withdrawal IDR " # amount.toText(), "method=" # WalletLib.withdrawalMethodToText(method));
        #ok("permintaan penarikan dana berhasil diproses");
      };
    };
  };

  public shared ({ caller }) func transferBalance(
    toUserId : Principal,
    amount : Nat,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) { return #err("tidak terautentikasi") };
    if (amount == 0) { return #err("jumlah harus lebih dari 0") };
    if (Principal.equal(caller, toUserId)) { return #err("tidak bisa transfer ke diri sendiri") };
    switch (WalletLib.transfer(caller, toUserId, amount, wallet_balances)) {
      case (#err(e)) { #err(e) };
      case (#ok(msg)) {
        let now = Time.now();
        let txOutId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txOutId;
          userId = caller;
          transactionType = #transfer_out;
          amount = amount;
          currency = "IDR";
          description = "Transfer ke " # toUserId.toText();
          status = #completed;
          createdAt = now;
        }, wallet_transactions);
        let txInId = wallet_state.nextTxId;
        wallet_state.nextTxId += 1;
        WalletLib.recordTransaction({
          id = txInId;
          userId = toUserId;
          transactionType = #transfer_in;
          amount = amount;
          currency = "IDR";
          description = "Transfer dari " # caller.toText();
          status = #completed;
          createdAt = now;
        }, wallet_transactions);
        addAuditEntry(principalToEmail(caller), roleText(caller), "TRANSFER_WALLET",
          "Transfer IDR " # amount.toText() # " to " # toUserId.toText(), "");
        #ok(msg);
      };
    };
  };

  public query ({ caller }) func getMyTransactionHistory() : async [WalletTypes.WalletTransaction] {
    WalletLib.getTransactionHistory(caller, wallet_transactions);
  };

  public query ({ caller }) func adminGetAllWalletStats() : async {
    totalVolume : Nat;
    pendingWithdrawals : Nat;
    totalUsers : Nat;
  } {
    if (not isAdmin(caller)) {
      return { totalVolume = 0; pendingWithdrawals = 0; totalUsers = 0 };
    };
    let allTxs = wallet_transactions.toArray();
    var totalVolume = 0;
    var pendingWithdrawals = 0;
    for (tx in allTxs.values()) {
      if (tx.transactionType == #deposit) { totalVolume += tx.amount };
      if (tx.transactionType == #withdrawal and tx.status == #pending) {
        pendingWithdrawals += 1;
      };
    };
    let totalUsers = wallet_balances.size();
    { totalVolume; pendingWithdrawals; totalUsers };
  };

  // ============================================================
  // PHARMACY
  // ============================================================

  public shared query func getPharmacies() : async [Pharmacy] {
    pharmacies.toArray()
  };

  public shared query func getPharmacyDrugs(pharmacyId : Nat) : async [DrugStock] {
    switch (pharmacies.find(func(p : Pharmacy) : Bool { p.id == pharmacyId })) {
      case (?p) { p.drugs };
      case null { [] };
    };
  };

  public shared ({ caller }) func adminAddPharmacy(
    name : Text,
    address : Text,
    lat : Float,
    lon : Float,
    openTime : Text,
    closeTime : Text,
    phone : Text,
  ) : async Result<Nat, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    let id = pharmacies.size() + 1;
    pharmacies.add({
      id = id;
      name = name;
      address = address;
      phone = phone;
      lat = lat;
      lon = lon;
      openTime = openTime;
      closeTime = closeTime;
      drugs = [];
    });
    addAuditEntry(principalToEmail(caller), "admin", "ADD_PHARMACY",
      "Added pharmacy: " # name, "id=" # id.toText());
    #ok(id)
  };

  public shared ({ caller }) func adminUpdatePharmacyStock(
    pharmacyId : Nat,
    items : [DrugStock],
  ) : async Result<Text, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    switch (pharmacies.findIndex(func(p : Pharmacy) : Bool { p.id == pharmacyId })) {
      case (?idx) {
        let existing = pharmacies.at(idx);
        pharmacies.put(idx, { existing with drugs = items });
        addAuditEntry(principalToEmail(caller), "admin", "UPDATE_PHARMACY_STOCK",
          "Updated stock for pharmacy " # pharmacyId.toText(), "items=" # items.size().toText());
        #ok("ok")
      };
      case null { #err("pharmacy not found") };
    };
  };

  public shared query func getPharmacyStock(pharmacyId : Nat) : async ?[DrugStock] {
    switch (pharmacies.find(func(p : Pharmacy) : Bool { p.id == pharmacyId })) {
      case (?p) { ?p.drugs };
      case null { null };
    };
  };

  public shared ({ caller }) func seedPharmacies() : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    if (state.pharmacySeedDone) { return "already seeded" };
    state.pharmacySeedDone := true;
    let defaultDrugs : [DrugStock] = [
      { drugName = "Paracetamol 500mg"; category = "Analgesik"; priceIdr = 5_000; available = true; quantity = 200 },
      { drugName = "Amoxicillin 500mg"; category = "Antibiotik"; priceIdr = 15_000; available = true; quantity = 100 },
      { drugName = "Omeprazole 20mg"; category = "Lambung"; priceIdr = 12_000; available = true; quantity = 80 },
      { drugName = "Metformin 500mg"; category = "Diabetes"; priceIdr = 8_000; available = true; quantity = 150 },
      { drugName = "Amlodipine 5mg"; category = "Kardiovaskular"; priceIdr = 10_000; available = true; quantity = 120 },
      { drugName = "Cetirizine 10mg"; category = "Antihistamin"; priceIdr = 6_000; available = true; quantity = 90 },
      { drugName = "Vitamin C 500mg"; category = "Vitamin"; priceIdr = 4_000; available = true; quantity = 300 },
      { drugName = "ORS Rehidrasi Oral"; category = "Cairan"; priceIdr = 3_000; available = true; quantity = 250 },
    ];
    let seeds : [(Text, Text, Text, Float, Float, Text, Text)] = [
      ("Apotek Kimia Farma - Sudirman", "Jl. Jend. Sudirman No. 12, Jakarta Pusat", "021-5701234", -6.2088, 106.8456, "07:00", "22:00"),
      ("Apotek K24 - Menteng", "Jl. Cikini Raya No. 58, Menteng, Jakarta Pusat", "021-3144567", -6.1951, 106.8380, "00:00", "24:00"),
      ("Apotek Guardian - Thamrin", "Jl. MH Thamrin No. 28, Jakarta Pusat", "021-3902345", -6.1933, 106.8237, "08:00", "21:00"),
      ("Apotek Kimia Farma - Fatmawati", "Jl. RS Fatmawati No. 45, Cilandak, Jakarta Selatan", "021-7654321", -6.2894, 106.7993, "07:00", "22:00"),
      ("Apotek Alfacare - Kebayoran", "Jl. Melawai Raya No. 18, Kebayoran Baru, Jakarta Selatan", "021-7234567", -6.2441, 106.8023, "08:00", "20:00"),
      ("Apotek Kimia Farma - Rawamangun", "Jl. Pemuda No. 66, Rawamangun, Jakarta Timur", "021-4756789", -6.1971, 106.8800, "07:00", "22:00"),
      ("Apotek Medicastore - Kelapa Gading", "Jl. Raya Kelapa Nias No. 9, Kelapa Gading, Jakarta Utara", "021-4530987", -6.1578, 106.9053, "08:00", "21:00"),
      ("Apotek K24 - Grogol", "Jl. Prof. Dr. Latumeten No. 5, Grogol, Jakarta Barat", "021-5609876", -6.1674, 106.7905, "00:00", "24:00"),
      ("Apotek Kimia Farma - Tangerang", "Jl. Daan Mogot Km 19, Tangerang, Banten", "021-5501234", -6.1781, 106.6325, "07:00", "22:00"),
      ("Apotek Century - Bekasi", "Jl. Ahmad Yani No. 22, Bekasi Selatan, Jawa Barat", "021-8845678", -6.2614, 107.0032, "08:00", "21:00"),
    ];
    var id = 1;
    for ((name, address, phone, lat, lon, openTime, closeTime) in seeds.values()) {
      pharmacies.add({
        id = id;
        name = name;
        address = address;
        phone = phone;
        lat = lat;
        lon = lon;
        openTime = openTime;
        closeTime = closeTime;
        drugs = defaultDrugs;
      });
      id += 1;
    };
    "ok"
  };

  // ============================================================
  // USER MANAGEMENT (ADMIN)
  // ============================================================

  public type UserStatus = { #active; #suspended; #deleted };

  public type UserListEntry = {
    email : Text;
    name : Text;
    role : Text;
    status : Text;
    registeredAt : Int;
  };

  // We track suspended/deleted users via verificationStatus prefix convention:
  // patients verificationStatus is used for suspension. For nurses we use a helper map.
  var suspendedPrincipals = List.empty<(Principal, Text)>(); // (principal, reason)
  let deletedPrincipals   = List.empty<Principal>();

  func isSuspended(p : Principal) : Bool {
    suspendedPrincipals.find(func(e : (Principal, Text)) : Bool { Principal.equal(e.0, p) }) != null
  };

  func isDeleted(p : Principal) : Bool {
    deletedPrincipals.find(func(e : Principal) : Bool { Principal.equal(e, p) }) != null
  };

  public shared ({ caller }) func suspendUser(targetEmail : Text, reason : Text) : async { #ok; #notFound; #unauthorized } {
    if (not isAdmin(caller)) { return #unauthorized };
    // Find principal by email
    switch (patients.findIndex(func(p : PatientProfile) : Bool { p.email == ?targetEmail })) {
      case (?idx) {
        let existing = patients.at(idx);
        suspendedPrincipals.add((existing.principal, reason));
        addAuditEntry(principalToEmail(caller), "admin", "SUSPEND_USER",
          "Suspended user: " # targetEmail, "reason=" # reason);
        return #ok;
      };
      case null {};
    };
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { n.email == ?targetEmail })) {
      case (?idx) {
        let existing = nurses.at(idx);
        suspendedPrincipals.add((existing.principal, reason));
        addAuditEntry(principalToEmail(caller), "admin", "SUSPEND_USER",
          "Suspended user: " # targetEmail, "reason=" # reason);
        return #ok;
      };
      case null {};
    };
    #notFound
  };

  public shared ({ caller }) func activateUser(targetEmail : Text) : async { #ok; #notFound } {
    if (not isAdmin(caller)) { return #notFound };
    switch (suspendedPrincipals.findIndex(func(e : (Principal, Text)) : Bool {
      switch (patients.find(func(p : PatientProfile) : Bool {
        Principal.equal(p.principal, e.0) and p.email == ?targetEmail
      })) {
        case (?_) true;
        case null {
          switch (nurses.find(func(n : NurseProfile) : Bool {
            Principal.equal(n.principal, e.0) and n.email == ?targetEmail
          })) {
            case (?_) true;
            case null false;
          };
        };
      };
    })) {
      case (?idx) {
        ignore idx;
        suspendedPrincipals := suspendedPrincipals.filter(func(e : (Principal, Text)) : Bool {
          switch (patients.find(func(p : PatientProfile) : Bool {
            Principal.equal(p.principal, e.0) and p.email == ?targetEmail
          })) {
            case (?_) false;
            case null {
              switch (nurses.find(func(n : NurseProfile) : Bool {
                Principal.equal(n.principal, e.0) and n.email == ?targetEmail
              })) {
                case (?_) false;
                case null true;
              };
            };
          };
        });
        addAuditEntry(principalToEmail(caller), "admin", "ACTIVATE_USER",
          "Activated user: " # targetEmail, "");
        #ok
      };
      case null { #notFound };
    };
  };

  public shared ({ caller }) func deleteUser(targetEmail : Text) : async { #ok; #notFound; #unauthorized } {
    if (not isAdmin(caller)) { return #unauthorized };
    switch (patients.findIndex(func(p : PatientProfile) : Bool { p.email == ?targetEmail })) {
      case (?idx) {
        let existing = patients.at(idx);
        deletedPrincipals.add(existing.principal);
        // Remove role
        let targetPrincipalP = existing.principal;
        roles := roles.filter(func((p, _r) : (Principal, UserRole)) : Bool { not Principal.equal(p, targetPrincipalP) });
        addAuditEntry(principalToEmail(caller), "admin", "DELETE_USER",
          "Deleted user: " # targetEmail, "");
        return #ok;
      };
      case null {};
    };
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { n.email == ?targetEmail })) {
      case (?idx) {
        let existing = nurses.at(idx);
        deletedPrincipals.add(existing.principal);
        let targetPrincipalN = existing.principal;
        roles := roles.filter(func((p, _r) : (Principal, UserRole)) : Bool { not Principal.equal(p, targetPrincipalN) });
        addAuditEntry(principalToEmail(caller), "admin", "DELETE_USER",
          "Deleted user: " # targetEmail, "");
        return #ok;
      };
      case null {};
    };
    #notFound
  };

  public shared query ({ caller }) func getUserList(
    filterRole : ?Text,
    filterStatus : ?Text,
  ) : async [UserListEntry] {
    if (not isAdmin(caller)) { return [] };
    var result = List.empty<UserListEntry>();
    // Add patients
    for (p in patients.values()) {
      let role = "patient";
      let status = if (isDeleted(p.principal)) "deleted"
                   else if (isSuspended(p.principal)) "suspended"
                   else p.verificationStatus;
      let email = switch (p.email) { case (?e) e; case null "" };
      let matchRole = switch (filterRole) {
        case (?r) { r == role };
        case null { true };
      };
      let matchStatus = switch (filterStatus) {
        case (?s) { s == status };
        case null { true };
      };
      let shouldInclude = matchRole and matchStatus;
      if (shouldInclude) {
        result.add({ email = email; name = p.name; role = role; status = status; registeredAt = p.createdAt });
      };
    };
    // Add nurses
    for (n in nurses.values()) {
      let role = "nurse";
      let nurseStatus = switch (n.status) {
        case (#verified) "verified";
        case (#pending_verification) "pending_verification";
        case (#rejected) "rejected";
      };
      let status = if (isDeleted(n.principal)) "deleted"
                   else if (isSuspended(n.principal)) "suspended"
                   else nurseStatus;
      let email = switch (n.email) { case (?e) e; case null "" };
      let matchRole = switch (filterRole) {
        case (?r) { r == role };
        case null { true };
      };
      let matchStatus = switch (filterStatus) {
        case (?s) { s == status };
        case null { true };
      };
      let shouldInclude = matchRole and matchStatus;
      if (shouldInclude) {
        result.add({ email = email; name = n.name; role = role; status = status; registeredAt = n.createdAt });
      };
    };
    result.toArray()
  };

  // ============================================================
  // FINANCIAL REPORT
  // ============================================================

  public type TransactionEntry = {
    id : Nat;
    userId : Principal;
    transactionType : Text;
    amount : Nat;
    description : Text;
    status : Text;
    createdAt : Int;
  };

  public shared query ({ caller }) func getAdminFinancialReport() : async {
    totalRevenue : Nat;
    totalWithdrawals : Nat;
    pendingWithdrawals : Nat;
    transactionCount : Nat;
    recentTransactions : [TransactionEntry];
  } {
    if (not isAdmin(caller)) {
      return { totalRevenue = 0; totalWithdrawals = 0; pendingWithdrawals = 0; transactionCount = 0; recentTransactions = [] };
    };
    let allTxs = wallet_transactions.toArray();
    var totalRevenue : Nat = 0;
    var totalWithdrawals : Nat = 0;
    var pendingWithdrawals : Nat = 0;
    for (tx in allTxs.values()) {
      switch (tx.transactionType) {
        case (#deposit) { totalRevenue += tx.amount };
        case (#withdrawal) {
          if (tx.status == #completed) { totalWithdrawals += tx.amount };
          if (tx.status == #pending) { pendingWithdrawals += 1 };
        };
        case (#service_payment) { totalRevenue += tx.amount };
        case _ {};
      };
    };
    let transactionCount = allTxs.size();
    // Last 20 transactions
    let start = if (transactionCount > 20) { transactionCount - 20 } else { 0 };
    let recentTxs = Array.tabulate(transactionCount - start, func(i) {
      let tx = allTxs[start + i];
      let typeText = switch (tx.transactionType) {
        case (#deposit)         "deposit";
        case (#withdrawal)      "withdrawal";
        case (#transfer_in)     "transfer_in";
        case (#transfer_out)    "transfer_out";
        case (#service_payment) "service_payment";
        case (#service_income)  "service_income";
      };
      let statusText = switch (tx.status) {
        case (#pending)   "pending";
        case (#completed) "completed";
        case (#failed)    "failed";
      };
      {
        id = tx.id;
        userId = tx.userId;
        transactionType = typeText;
        amount = tx.amount;
        description = tx.description;
        status = statusText;
        createdAt = tx.createdAt;
      }
    });
    { totalRevenue; totalWithdrawals; pendingWithdrawals; transactionCount; recentTransactions = recentTxs };
  };

  // ============================================================
  // ACTIVITY LOG QUERIES
  // ============================================================

  public shared query ({ caller }) func getActivityLog(limit : Nat, offset : Nat) : async [ActivityEntry] {
    if (not isAdmin(caller)) { return [] };
    let all = activityLog.toArray();
    let total = all.size();
    if (offset >= total) { return [] };
    let end = if (offset + limit > total) { total } else { offset + limit };
    Array.tabulate(end - offset, func(i) { all[offset + i] })
  };

  // ============================================================
  // PLATFORM SETTINGS
  // ============================================================

  public shared ({ caller }) func updatePlatformSettings(settings : PlatformSettings) : async Result<Text, Text> {
    if (not isAdmin(caller)) { return #err("not admin") };
    platformSettings := settings;
    addAuditEntry(principalToEmail(caller), "admin", "UPDATE_PLATFORM_SETTINGS",
      "Updated platform settings", "appName=" # settings.appName);
    #ok("ok")
  };

  public shared query func getPlatformSettings() : async PlatformSettings {
    platformSettings
  };

  // ============================================================
  // SEED DATA
  // ============================================================

  public shared ({ caller }) func seedDefaultServices() : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    if (services.size() > 0) { return "already seeded" };
    let now = Time.now();
    let defaults : [(Text, Text, ServiceCategory, Nat)] = [
      ("Perawatan Lansia", "Layanan perawatan harian untuk lansia di rumah", #elderlycare, 150_000),
      ("Perawatan Luka", "Perawatan dan pembalutan luka oleh perawat profesional", #woundcare, 120_000),
      ("Pasca Operasi", "Pendampingan dan perawatan pasca operasi di rumah", #postopcare, 200_000),
      ("Fisioterapi", "Sesi fisioterapi oleh terapis berlisensi", #physiotherapy, 180_000),
      ("Ambulans Transport", "Layanan ambulans transportasi non-darurat", #ambulance, 300_000),
    ];
    for ((name, desc, cat, fee) in defaults.values()) {
      let id = state.nextServiceId;
      state.nextServiceId += 1;
      services.add({
        id = id; name = name; description = desc;
        category = cat; baseFeeIdr = fee;
        isActive = true; createdAt = now; updatedAt = now;
      });
    };
    "ok"
  };

  public shared ({ caller }) func seedArticles() : async Text {
    if (not isAdmin(caller)) { return "error: not admin" };
    if (state.articlesSeedDone) { return "already seeded" };
    state.articlesSeedDone := true;
    let now = Time.now();
    let seeds : [(Text, Text, Text, Text, Text, [Text], Text)] = [
      (
        "diabetes-melitus-tipe-2",
        "Diabetes Melitus Tipe 2: Penyebab, Gejala, dan Cara Mencegahnya",
        "Kenali penyebab, gejala, dan cara mencegah diabetes melitus tipe 2 agar Anda bisa hidup lebih sehat dan berkualitas.",
        "## Apa Itu Diabetes Melitus Tipe 2?\n\nDiabetes melitus tipe 2 adalah kondisi kronis di mana tubuh tidak dapat menggunakan insulin secara efektif. Insulin adalah hormon yang diproduksi pankreas untuk membantu sel-sel tubuh menyerap glukosa dari darah.\n\n## Penyebab Diabetes Tipe 2\n\n### Faktor Gaya Hidup\n\nPola makan tinggi gula dan lemak jenuh, kurang aktivitas fisik, dan kelebihan berat badan adalah faktor utama.\n\n### Faktor Genetik\n\nRiwayat keluarga dengan diabetes meningkatkan risiko secara signifikan.\n\n## Gejala yang Perlu Diwaspadai\n\n- Sering buang air kecil terutama malam hari\n- Mudah haus dan lapar\n- Penglihatan kabur\n- Luka sulit sembuh\n- Kesemutan pada tangan dan kaki\n\n## Diagnosis dan Pemeriksaan\n\nDokter akan melakukan tes gula darah puasa, HbA1c, dan tes toleransi glukosa oral untuk mendiagnosis kondisi ini.\n\n## Pencegahan dan Pengelolaan\n\n### Perubahan Gaya Hidup\n\nMengonsumsi makanan bergizi seimbang, rutin berolahraga minimal 30 menit sehari, dan menjaga berat badan ideal adalah langkah utama pencegahan.\n\n### Pengobatan Medis\n\nJika sudah terdiagnosis, dokter dapat meresepkan metformin atau obat lain. Monitoring gula darah rutin sangat penting untuk mencegah komplikasi.",
        "Foto klinis modern: pasien lansia sedang memeriksa kadar gula darah dengan glucometer di rumah, pencahayaan terang dan bersih, logo Healio Medika di sudut kanan bawah.",
        ["WHO - Diabetes, https://www.who.int/news-room/fact-sheets/detail/diabetes", "Kemenkes RI - Pedoman Pengendalian Diabetes Melitus"],
        "Penyakit Metabolik"
      ),
      (
        "hipertensi-tekanan-darah-tinggi",
        "Hipertensi: Penyebab, Bahaya, dan Cara Mengontrol Tekanan Darah",
        "Hipertensi atau tekanan darah tinggi sering disebut silent killer. Pelajari cara mencegah dan mengontrolnya di sini.",
        "## Apa Itu Hipertensi?\n\nHipertensi adalah kondisi di mana tekanan darah dalam arteri secara konsisten berada di atas 130/80 mmHg. Kondisi ini sering disebut 'silent killer' karena jarang menunjukkan gejala namun dapat menyebabkan kerusakan organ.\n\n## Penyebab Hipertensi\n\n### Hipertensi Primer\n\nSebagian besar kasus tidak memiliki penyebab tunggal yang jelas, namun berkaitan dengan pola makan tinggi garam, stres, dan gaya hidup tidak sehat.\n\n### Hipertensi Sekunder\n\nDisebabkan oleh kondisi medis lain seperti penyakit ginjal, gangguan tiroid, atau efek samping obat.\n\n## Gejala Hipertensi\n\n- Sakit kepala berat terutama di bagian belakang\n- Pusing mendadak\n- Mimisan\n- Sesak napas\n- Nyeri dada\n\n## Bahaya Komplikasi\n\nHipertensi yang tidak terkontrol dapat menyebabkan stroke, serangan jantung, gagal ginjal, dan kebutaan.\n\n## Cara Mengontrol Tekanan Darah\n\n### Diet DASH\n\nPerbanyak konsumsi buah, sayur, biji-bijian, kurangi garam maksimal 2 gram per hari.\n\n### Olahraga Teratur\n\nAktivitas aerobik 30-60 menit setiap hari dapat menurunkan tekanan darah secara bermakna.\n\n### Obat-obatan\n\nDokter dapat meresepkan ACE inhibitor, ARB, beta-blocker, atau diuretik sesuai kondisi pasien.",
        "Foto klinis: dokter mengukur tekanan darah pasien dengan tensimeter digital, ruangan klinik bersih berwarna putih, logo Healio Medika di sudut foto.",
        ["WHO - Hypertension, https://www.who.int/news-room/fact-sheets/detail/hypertension", "Kemenkes RI - Pedoman Tatalaksana Hipertensi pada Penyakit Kardiovaskular"],
        "Penyakit Kardiovaskular"
      ),
      (
        "stroke-penyebab-gejala-penanganan",
        "Stroke: Kenali FAST, Penyebab, dan Cara Pemulihannya",
        "Stroke adalah darurat medis. Kenali gejala FAST dan penyebabnya agar penanganan dapat dilakukan lebih cepat untuk menyelamatkan jiwa.",
        "## Apa Itu Stroke?\n\nStroke terjadi ketika pasokan darah ke bagian otak terganggu, menyebabkan sel-sel otak mati dalam hitungan menit. Ada dua jenis utama: stroke iskemik (karena sumbatan) dan stroke hemoragik (karena perdarahan).\n\n## Kenali Gejala FAST\n\n### F - Face (Wajah)\n\nApakah satu sisi wajah turun atau terasa mati rasa?\n\n### A - Arms (Lengan)\n\nApakah satu lengan lemah atau tidak bisa diangkat?\n\n### S - Speech (Bicara)\n\nApakah bicara tidak jelas atau sulit dimengerti?\n\n### T - Time (Waktu)\n\nSegera hubungi layanan darurat. Setiap menit sangat berharga.\n\n## Faktor Risiko Stroke\n\n- Hipertensi tidak terkontrol\n- Diabetes melitus\n- Merokok dan konsumsi alkohol\n- Kolesterol tinggi\n- Riwayat stroke sebelumnya\n\n## Penanganan dan Pemulihan\n\n### Fase Akut\n\nStroke iskemik dapat ditangani dengan tPA (tissue plasminogen activator) dalam 4,5 jam pertama.\n\n### Rehabilitasi\n\nFisioterapi, terapi wicara, dan terapi okupasi sangat penting dalam proses pemulihan jangka panjang.",
        "Foto klinis: tim medis merawat pasien stroke di ICU, peralatan modern, suasana profesional, logo Healio Medika tertera.",
        ["WHO - Stroke, https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death", "Kemenkes RI - Pedoman Nasional Pelayanan Kedokteran Stroke"],
        "Penyakit Saraf"
      ),
      (
        "serangan-jantung-infark-miokard",
        "Serangan Jantung: Gejala, Pertolongan Pertama, dan Pencegahan",
        "Pelajari gejala serangan jantung, cara memberikan pertolongan pertama yang benar, dan langkah pencegahan efektif.",
        "## Apa Itu Serangan Jantung?\n\nSerangan jantung atau infark miokard terjadi ketika aliran darah ke bagian otot jantung tersumbat, menyebabkan kerusakan permanen pada jaringan jantung.\n\n## Gejala Serangan Jantung\n\n### Gejala Klasik\n\n- Nyeri dada seperti ditekan, diremas, atau ditimpa berat\n- Nyeri menjalar ke lengan kiri, rahang, atau punggung\n- Sesak napas\n- Keringat dingin dan mual\n\n### Gejala pada Wanita\n\nWanita sering mengalami gejala tidak khas seperti kelelahan ekstrem, nyeri ulu hati, dan mual tanpa nyeri dada.\n\n## Pertolongan Pertama\n\n1. Segera hubungi ambulans darurat\n2. Minta pasien duduk atau berbaring dengan posisi nyaman\n3. Longgarkan pakaian ketat\n4. Jika tersedia dan pasien tidak alergi, berikan aspirin 160-325 mg untuk dikunyah\n5. Siapkan CPR jika pasien tidak sadar\n\n## Pencegahan\n\n### Gaya Hidup Sehat\n\nBerhenti merokok, diet rendah lemak jenuh, olahraga rutin, dan manajemen stres adalah pilar pencegahan.\n\n### Kontrol Faktor Risiko\n\nPantau tekanan darah, gula darah, dan kolesterol secara rutin bersama dokter.",
        "Foto klinis: paramedis melakukan EKG pada pasien di ambulans, peralatan medis modern, logo Healio Medika tampak di seragam.",
        ["American Heart Association - Heart Attack, https://www.heart.org", "Kemenkes RI - Pedoman Tatalaksana Sindrom Koroner Akut"],
        "Penyakit Kardiovaskular"
      ),
      (
        "asma-penyebab-dan-penanganan",
        "Asma: Penyebab, Pencetus, dan Cara Mengelola Penyakit Pernapasan Ini",
        "Asma dapat dikontrol dengan baik. Kenali pemicunya dan pelajari cara mengelola asma agar kualitas hidup tetap optimal.",
        "## Apa Itu Asma?\n\nAsma adalah penyakit peradangan kronis saluran napas yang menyebabkan episode berulang sesak napas, mengi, batuk, dan rasa berat di dada.\n\n## Faktor Pencetus Asma\n\n### Pencetus Lingkungan\n\n- Debu rumah dan tungau\n- Bulu hewan peliharaan\n- Serbuk sari tanaman\n- Asap rokok dan polusi udara\n\n### Pencetus Internal\n\n- Infeksi saluran napas atas\n- Olahraga intens\n- Stres emosional\n- Perubahan cuaca\n\n## Gejala Asma\n\n- Mengi (suara 'ngik' saat bernapas)\n- Batuk terutama malam dan dini hari\n- Sesak napas\n- Dada terasa berat\n\n## Pengelolaan Asma\n\n### Pengobatan Jangka Panjang\n\nKortikosteroid inhalasi adalah terapi utama untuk mencegah peradangan saluran napas.\n\n### Bronkodilator Kerja Cepat\n\nInhaler salbutamol digunakan saat serangan untuk melebarkan saluran napas dengan cepat.\n\n### Hindari Pemicu\n\nIdentifikasi dan hindari pemicu pribadi adalah kunci pengelolaan asma yang efektif.",
        "Foto klinis: anak menggunakan inhaler dengan spacer didampingi orang tua, latar belakang ruang klinik bersih, logo Healio Medika.",
        ["WHO - Asthma, https://www.who.int/news-room/fact-sheets/detail/asthma", "Global Initiative for Asthma (GINA) - Global Strategy for Asthma Management"],
        "Penyakit Pernapasan"
      ),
      (
        "tuberkulosis-tbc-paru",
        "TBC (Tuberkulosis): Gejala, Penularan, dan Pengobatan Tuntas",
        "TBC masih menjadi masalah kesehatan utama di Indonesia. Ketahui cara penularan, gejala, dan pentingnya menyelesaikan pengobatan.",
        "## Apa Itu Tuberkulosis (TBC)?\n\nTuberkulosis adalah penyakit infeksi bakteri yang disebabkan oleh Mycobacterium tuberculosis. Meskipun umumnya menyerang paru-paru, TBC juga dapat menyerang organ lain.\n\n## Cara Penularan TBC\n\nTBC menular melalui udara ketika penderita batuk, bersin, atau berbicara. Percikan dahak yang mengandung bakteri dapat terhirup oleh orang di sekitarnya.\n\n## Gejala TBC Paru\n\n- Batuk lebih dari 2 minggu\n- Batuk berdahak, kadang berdarah\n- Demam dan keringat malam\n- Penurunan berat badan tanpa sebab jelas\n- Kelelahan dan lemas berkepanjangan\n- Nyeri dada\n\n## Diagnosis TBC\n\n### Pemeriksaan Dahak\n\nTes BTA (Basil Tahan Asam) pada dahak adalah pemeriksaan standar. TCM (Tes Cepat Molekuler) lebih akurat dan juga mendeteksi resistensi obat.\n\n### Foto Rontgen Dada\n\nMenunjukkan gambaran infiltrat atau kavitas khas TBC pada paru.\n\n## Pengobatan TBC\n\n### Panduan OAT\n\nPengobatan menggunakan Obat Anti Tuberkulosis (OAT) selama minimal 6 bulan. Kepatuhan minum obat sangat penting untuk mencegah resistensi.\n\n### Program DOTS\n\nProgram pengawasan menelan obat secara langsung memastikan pasien menyelesaikan pengobatan penuh.",
        "Foto klinis: petugas kesehatan menjelaskan regimen pengobatan TBC kepada pasien di Puskesmas, suasana edukatif dan ramah, logo Healio Medika.",
        ["WHO - Tuberculosis, https://www.who.int/news-room/fact-sheets/detail/tuberculosis", "Kemenkes RI - Pedoman Nasional Pengendalian Tuberkulosis"],
        "Penyakit Infeksi"
      ),
      (
        "demam-berdarah-dengue-dbd",
        "Demam Berdarah Dengue (DBD): Gejala, Bahaya, dan Cara Pencegahannya",
        "DBD masih endemis di Indonesia. Pelajari gejala, fase kritis, dan cara pencegahan DBD dengan 3M Plus.",
        "## Apa Itu Demam Berdarah Dengue?\n\nDBD adalah penyakit infeksi virus dengue yang ditularkan melalui gigitan nyamuk Aedes aegypti dan Aedes albopictus.\n\n## Fase-fase DBD\n\n### Fase Demam (Hari 1-3)\n\nDemam tinggi mendadak hingga 40°C, nyeri kepala, nyeri di belakang mata, dan nyeri sendi.\n\n### Fase Kritis (Hari 4-6)\n\nDemam turun namun ini adalah fase paling berbahaya. Risiko kebocoran plasma tinggi yang dapat menyebabkan syok dengue.\n\n### Fase Pemulihan (Hari 7-10)\n\nCairan kembali ke pembuluh darah, kondisi membaik.\n\n## Tanda Bahaya DBD\n\n- Nyeri perut hebat\n- Muntah terus-menerus\n- Perdarahan dari gusi atau hidung\n- Muntah atau BAB berdarah\n- Kulit lembab dan dingin\n- Gelisah atau lemah mendadak\n\n## Pencegahan 3M Plus\n\n### 3M\n\n1. Menguras tempat penampungan air\n2. Menutup rapat tempat penampungan air\n3. Mendaur ulang barang bekas\n\n### Plus\n\nMenggunakan lotion anti nyamuk, kelambu, dan menanam tanaman pengusir nyamuk.",
        "Foto klinis: petugas fogging di lingkungan pemukiman, suasana preventif komunitas, logo Healio Medika pada pakaian petugas.",
        ["WHO - Dengue and Severe Dengue, https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue", "Kemenkes RI - Pedoman Pencegahan dan Pengendalian Demam Berdarah Dengue"],
        "Penyakit Infeksi"
      ),
      (
        "tifus-demam-tifoid",
        "Tifus (Demam Tifoid): Penyebab, Gejala, dan Cara Penyembuhan",
        "Demam tifoid disebabkan bakteri Salmonella typhi. Kenali gejalanya dan cara pencegahan melalui kebersihan makanan dan minuman.",
        "## Apa Itu Demam Tifoid?\n\nDemam tifoid atau tifus adalah infeksi sistemik yang disebabkan oleh bakteri Salmonella typhi yang masuk melalui makanan atau minuman yang terkontaminasi.\n\n## Gejala Demam Tifoid\n\n### Minggu Pertama\n\n- Demam yang meningkat bertahap, tertinggi sore-malam\n- Sakit kepala dan nyeri otot\n- Batuk kering\n- Gangguan pencernaan (konstipasi atau diare)\n\n### Minggu Kedua\n\n- Demam tinggi menetap\n- Perut kembung dan nyeri\n- Bercak merah pada perut (rose spots)\n- Limpa membesar\n\n## Komplikasi Berbahaya\n\nPerforasi usus dan perdarahan saluran cerna adalah komplikasi paling serius yang dapat mengancam jiwa.\n\n## Pengobatan\n\n### Antibiotik\n\nSiprofloksasin, azitomisin, atau sefiksim adalah pilihan antibiotik utama tergantung resistensi lokal.\n\n### Perawatan Suportif\n\nIstirahat total, asupan cairan cukup, dan diet lunak selama sakit.\n\n## Pencegahan\n\nCuci tangan dengan sabun, konsumsi air matang, pilih makanan yang dimasak sampai matang, dan vaksinasi tifoid.",
        "Foto klinis: dokter memeriksa pasien anak dengan termometer di klinik bersih, orang tua duduk mendampingi, logo Healio Medika.",
        ["WHO - Typhoid, https://www.who.int/news-room/fact-sheets/detail/typhoid", "Kemenkes RI - Pedoman Tatalaksana Demam Tifoid"],
        "Penyakit Infeksi"
      ),
      (
        "malaria-pencegahan-pengobatan",
        "Malaria: Cara Penularan, Gejala, dan Pencegahan di Daerah Endemis",
        "Malaria masih menjadi ancaman di beberapa wilayah Indonesia. Pelajari cara pencegahan dan pengobatan yang tepat.",
        "## Apa Itu Malaria?\n\nMalaria adalah penyakit yang disebabkan oleh parasit Plasmodium yang ditularkan melalui gigitan nyamuk Anopheles betina.\n\n## Jenis Plasmodium di Indonesia\n\n- Plasmodium falciparum — paling berbahaya\n- Plasmodium vivax — paling sering\n- Plasmodium malariae dan Plasmodium knowlesi — lebih jarang\n\n## Gejala Malaria\n\n### Gejala Klasik (Trias Malaria)\n\n1. Menggigil\n2. Demam tinggi\n3. Berkeringat banyak\n\n### Malaria Berat\n\nGangguan kesadaran, kejang, anemia berat, dan gagal organ menandakan malaria berat yang membutuhkan rawat inap.\n\n## Diagnosis\n\nPemeriksaan darah tepi (sediaan darah tipis dan tebal) atau Rapid Diagnostic Test (RDT) adalah standar diagnosis.\n\n## Pengobatan\n\n### ACT (Artemisinin-based Combination Therapy)\n\nArtesunat-amodiakuin atau DHP adalah lini pertama untuk malaria tanpa komplikasi di Indonesia.\n\n## Pencegahan\n\n- Tidur menggunakan kelambu berinsektisida\n- Menggunakan repelan nyamuk\n- Minum obat profilaksis saat berkunjung ke daerah endemis\n- Pengobatan segera jika terdeteksi positif",
        "Foto klinis: tenaga kesehatan melakukan pemeriksaan darah malaria dengan RDT di daerah terpencil, suasana lapangan, logo Healio Medika.",
        ["WHO - Malaria, https://www.who.int/news-room/fact-sheets/detail/malaria", "Kemenkes RI - Pedoman Tatalaksana Malaria"],
        "Penyakit Infeksi"
      ),
      (
        "hepatitis-b-pencegahan-vaksinasi",
        "Hepatitis B: Cara Penularan, Gejala, dan Pentingnya Vaksinasi",
        "Hepatitis B dapat dicegah dengan vaksin. Pelajari cara penularan, gejala, dan pengelolaan hepatitis B kronis.",
        "## Apa Itu Hepatitis B?\n\nHepatitis B adalah infeksi hati yang disebabkan oleh Virus Hepatitis B (HBV). Infeksi ini dapat bersifat akut atau berkembang menjadi kronis.\n\n## Cara Penularan\n\n- Kontak dengan darah atau cairan tubuh penderita\n- Hubungan seksual tanpa pelindung\n- Penularan dari ibu ke bayi saat persalinan\n- Penggunaan jarum suntik bersama\n\n## Gejala Hepatitis B\n\n### Fase Akut\n\n- Kelelahan ekstrem\n- Mual, muntah, nyeri perut\n- Kulit dan mata kuning (ikterus)\n- Urine berwarna gelap\n\n### Hepatitis B Kronis\n\nSebagian besar kasus kronis tidak bergejala hingga terjadi kerusakan hati yang signifikan.\n\n## Komplikasi Jangka Panjang\n\nSirosis hati dan kanker hati (hepatoselular karsinoma) adalah komplikasi utama hepatitis B kronis.\n\n## Pencegahan\n\n### Vaksinasi\n\nVaksin hepatitis B sangat efektif dan aman. Diberikan 3 dosis: saat lahir, usia 1 bulan, dan 6 bulan.\n\n### Universal Precaution\n\nPenggunaan APD, jarum suntik sekali pakai, dan skrining darah donor mencegah penularan di fasilitas kesehatan.",
        "Foto klinis: bayi baru lahir menerima vaksinasi hepatitis B dari bidan, suasana kamar bersalin bersih, logo Healio Medika.",
        ["WHO - Hepatitis B, https://www.who.int/news-room/fact-sheets/detail/hepatitis-b", "Kemenkes RI - Pedoman Pengendalian Hepatitis Virus"],
        "Penyakit Hati"
      ),
      (
        "covid-19-gejala-pencegahan",
        "COVID-19: Gejala, Pencegahan, dan Kapan Harus ke Dokter",
        "COVID-19 masih ada di sekitar kita. Kenali gejala, cara pencegahan terkini, dan tanda-tanda yang memerlukan penanganan medis segera.",
        "## Apa Itu COVID-19?\n\nCOVID-19 adalah penyakit yang disebabkan oleh virus SARS-CoV-2. Virus ini menyerang terutama sistem pernapasan dan dapat menimbulkan berbagai komplikasi.\n\n## Gejala COVID-19\n\n### Gejala Ringan-Sedang\n\n- Demam atau menggigil\n- Batuk kering\n- Kelelahan\n- Kehilangan indera penciuman atau perasa\n- Nyeri otot dan sendi\n- Sakit tenggorokan\n\n### Gejala Berat\n\n- Sesak napas atau kesulitan bernapas\n- Saturasi oksigen di bawah 94%\n- Nyeri atau tekanan di dada\n- Kesulitan berbicara atau bergerak\n\n## Kapan Harus ke Dokter\n\nSegera cari pertolongan medis jika mengalami sesak napas, nyeri dada, atau kebingungan mendadak.\n\n## Pencegahan\n\n### Protokol Kesehatan\n\n- Rajin cuci tangan dengan sabun dan air mengalir minimal 20 detik\n- Gunakan masker di tempat keramaian\n- Jaga jarak 1-2 meter dari orang sakit\n- Ventilasi ruangan yang baik\n\n### Vaksinasi\n\nVaksinasi COVID-19 sangat efektif mencegah keparahan penyakit dan kematian. Booster direkomendasikan untuk kelompok risiko tinggi.",
        "Foto klinis: tenaga medis berpakaian APD lengkap merawat pasien COVID-19 di ruang isolasi rumah sakit, suasana profesional, logo Healio Medika.",
        ["WHO - COVID-19, https://www.who.int/emergencies/diseases/novel-coronavirus-2019", "Kemenkes RI - Pedoman Pencegahan dan Pengendalian COVID-19"],
        "Penyakit Infeksi"
      ),
      (
        "pneumonia-radang-paru-paru",
        "Pneumonia: Penyebab, Gejala, dan Cara Perawatan di Rumah",
        "Pneumonia atau radang paru-paru bisa menyerang siapa saja. Pelajari penyebab, gejala, dan kapan perlu dirawat di rumah sakit.",
        "## Apa Itu Pneumonia?\n\nPneumonia adalah infeksi yang menyebabkan peradangan pada kantung udara (alveoli) di satu atau kedua paru-paru, yang dapat terisi cairan atau nanah.\n\n## Penyebab Pneumonia\n\n### Bakteri\n\nStreptococcus pneumoniae adalah penyebab paling umum pneumonia bakteri pada orang dewasa.\n\n### Virus\n\nVirus influenza, RSV, dan SARS-CoV-2 dapat menyebabkan pneumonia viral.\n\n### Jamur\n\nPneumonia jamur umumnya menyerang orang dengan sistem imun lemah.\n\n## Gejala Pneumonia\n\n- Batuk dengan dahak berwarna kuning, hijau, atau berdarah\n- Demam tinggi dan menggigil\n- Sesak napas saat aktivitas biasa\n- Nyeri dada yang memburuk saat bernapas atau batuk\n- Kelelahan\n\n## Kelompok Berisiko Tinggi\n\nBalita, lansia di atas 65 tahun, perokok, dan penderita penyakit kronis memiliki risiko pneumonia lebih tinggi.\n\n## Penanganan\n\n### Rawat Jalan\n\nPneumonia ringan pada orang dewasa sehat dapat diobati dengan antibiotik oral di rumah.\n\n### Rawat Inap\n\nDiperlukan jika saturasi oksigen rendah, sesak napas berat, atau tidak ada respons terhadap antibiotik oral.",
        "Foto klinis: dokter meninjau hasil rontgen dada pasien pneumonia di lightbox, ruang radiologi rumah sakit modern, logo Healio Medika.",
        ["WHO - Pneumonia, https://www.who.int/news-room/fact-sheets/detail/pneumonia", "Kemenkes RI - Pedoman Tatalaksana Pneumonia Komunitas"],
        "Penyakit Pernapasan"
      ),
      (
        "gagal-ginjal-kronis",
        "Gagal Ginjal Kronis: Penyebab, Gejala Awal, dan Cara Memperlambat Perkembangannya",
        "Gagal ginjal kronis seringkali tidak bergejala di tahap awal. Ketahui faktor risiko dan cara menjaga kesehatan ginjal Anda.",
        "## Apa Itu Gagal Ginjal Kronis?\n\nGagal ginjal kronis (GGK) adalah kondisi penurunan fungsi ginjal secara bertahap dan permanen selama lebih dari 3 bulan.\n\n## Penyebab Utama\n\n- Diabetes melitus (penyebab nomor 1)\n- Hipertensi (penyebab nomor 2)\n- Glomerulonefritis\n- Penyakit ginjal polikistik\n\n## Gejala GGK\n\n### Stadium Awal (Stadium 1-2)\n\nBiasanya tanpa gejala. Terdeteksi hanya melalui pemeriksaan darah (kreatinin) dan urine (proteinuria).\n\n### Stadium Lanjut (Stadium 4-5)\n\n- Kelelahan ekstrem\n- Mual dan muntah\n- Pembengkakan kaki dan pergelangan kaki\n- Sesak napas\n- Gatal di seluruh tubuh\n- Urine berbuih\n\n## Pencegahan dan Pengelolaan\n\n### Kontrol Penyakit Dasar\n\nPengelolaan diabetes dan hipertensi yang ketat adalah cara paling efektif mencegah progresivitas GGK.\n\n### Diet Renal\n\nPembatasan protein, kalium, fosfor, dan garam sesuai panduan ahli gizi renal.\n\n### Terapi Pengganti Ginjal\n\nPada stadium akhir, hemodialisis, dialisis peritoneal, atau transplantasi ginjal diperlukan.",
        "Foto klinis: pasien menjalani hemodialisis di unit dialisis rumah sakit, mesin dialisis modern, staf medis memantau, logo Healio Medika.",
        ["National Kidney Foundation - CKD, https://www.kidney.org/atoz/content/about-chronic-kidney-disease", "Kemenkes RI - Panduan Pengelolaan Penyakit Ginjal Kronis"],
        "Penyakit Ginjal"
      ),
      (
        "kanker-serviks-pencegahan-deteksi",
        "Kanker Serviks: Pencegahan dengan Vaksin HPV dan Deteksi Dini",
        "Kanker serviks dapat dicegah. Pelajari peran vaksin HPV dan pentingnya Pap smear rutin untuk deteksi dini.",
        "## Apa Itu Kanker Serviks?\n\nKanker serviks adalah kanker yang berkembang di sel-sel leher rahim (serviks), bagian bawah rahim yang terhubung ke vagina.\n\n## Penyebab Utama\n\nInfeksi Human Papillomavirus (HPV) tipe 16 dan 18 bertanggung jawab atas sekitar 70% kasus kanker serviks.\n\n## Faktor Risiko\n\n- Memulai aktivitas seksual di usia muda\n- Berganti-ganti pasangan seksual\n- Sistem imun lemah\n- Merokok\n- Tidak melakukan skrining rutin\n\n## Gejala Kanker Serviks\n\n### Stadium Awal\n\nSeringkali tanpa gejala. Ini mengapa skrining sangat penting.\n\n### Stadium Lanjut\n\n- Perdarahan vagina di luar menstruasi\n- Perdarahan setelah hubungan seksual\n- Keputihan tidak normal\n- Nyeri panggul\n\n## Pencegahan\n\n### Vaksin HPV\n\nVaksin HPV bivalent, quadrivalent, atau nonavalent sangat efektif mencegah infeksi HPV penyebab kanker. Diberikan pada anak perempuan usia 9-14 tahun.\n\n### Skrining Berkala\n\nPap smear setiap 3 tahun atau IVA (Inspeksi Visual Asam Asetat) setiap tahun di Puskesmas terdekat.",
        "Foto klinis: dokter spesialis kandungan menjelaskan hasil pap smear kepada pasien wanita muda, ruang konsultasi modern, logo Healio Medika.",
        ["WHO - Cervical Cancer, https://www.who.int/news-room/fact-sheets/detail/cervical-cancer", "Kemenkes RI - Pedoman Program Deteksi Dini Kanker Serviks dan Kanker Payudara"],
        "Kanker"
      ),
      (
        "kanker-payudara-deteksi-sadari",
        "Kanker Payudara: SADARI, Deteksi Dini, dan Pilihan Pengobatan",
        "Deteksi dini kanker payudara meningkatkan peluang kesembuhan. Pelajari teknik SADARI dan kapan harus mammografi.",
        "## Apa Itu Kanker Payudara?\n\nKanker payudara terjadi ketika sel-sel di jaringan payudara tumbuh secara tidak terkendali. Ini adalah kanker paling umum pada wanita di Indonesia dan dunia.\n\n## Faktor Risiko\n\n- Jenis kelamin wanita dan usia di atas 50 tahun\n- Riwayat keluarga dengan kanker payudara\n- Mutasi gen BRCA1/BRCA2\n- Menstruasi pertama sebelum usia 12 tahun\n- Tidak pernah menyusui\n- Obesitas dan konsumsi alkohol\n\n## Teknik SADARI\n\n### Langkah SADARI (Pemeriksaan Payudara Sendiri)\n\n1. Berdiri di depan cermin, lihat perubahan bentuk payudara\n2. Angkat kedua tangan ke atas, periksa perubahan\n3. Baring, raba payudara dengan gerakan melingkar\n4. Periksa area ketiak\n5. Tekan puting untuk memeriksa keluar cairan\n\n## Gejala yang Perlu Diwaspadai\n\n- Benjolan di payudara atau ketiak\n- Perubahan ukuran atau bentuk payudara\n- Kulit payudara seperti kulit jeruk\n- Puting masuk ke dalam\n- Keluar cairan dari puting\n\n## Deteksi dan Pengobatan\n\n### Mammografi\n\nDirekomendasikan setiap 1-2 tahun untuk wanita di atas 40-50 tahun. USG payudara untuk wanita muda.\n\n### Pilihan Pengobatan\n\nOperasi, kemoterapi, radioterapi, terapi hormonal, dan imunoterapi tergantung stadium dan jenis kanker.",
        "Foto klinis: dokter spesialis onkologi menjelaskan hasil mammografi kepada pasien wanita, ruang konsultasi terang dan profesional, logo Healio Medika.",
        ["WHO - Breast Cancer, https://www.who.int/news-room/fact-sheets/detail/breast-cancer", "Kemenkes RI - Pedoman Program Deteksi Dini Kanker Serviks dan Kanker Payudara"],
        "Kanker"
      ),
      (
        "osteoporosis-tulang-keropos",
        "Osteoporosis: Mencegah Tulang Rapuh Sebelum Terlambat",
        "Osteoporosis membuat tulang rapuh dan mudah patah. Pelajari cara mencegahnya sejak muda dengan nutrisi dan olahraga yang tepat.",
        "## Apa Itu Osteoporosis?\n\nOsteoporosis adalah kondisi di mana kepadatan dan kualitas tulang berkurang, membuat tulang menjadi rapuh dan mudah patah bahkan akibat jatuh ringan.\n\n## Siapa yang Berisiko?\n\n- Wanita pascamenopause (estrogen melindungi tulang)\n- Pria di atas usia 70 tahun\n- Penderita kekurangan kalsium dan vitamin D kronis\n- Perokok dan peminum alkohol\n- Pengguna kortikosteroid jangka panjang\n\n## Gejala Osteoporosis\n\nOsteoporosis sering disebut 'silent disease' karena tidak bergejala sampai terjadi fraktur.\n\n- Nyeri punggung mendadak (fraktur vertebra)\n- Postur tubuh bungkuk progresif\n- Penurunan tinggi badan\n- Patah tulang akibat benturan ringan\n\n## Diagnosis\n\nDXA scan (Dual-energy X-ray Absorptiometry) mengukur kepadatan mineral tulang. Hasilnya disebut T-score.\n\n## Pencegahan\n\n### Asupan Kalsium dan Vitamin D\n\nAsupan kalsium 1000-1200 mg/hari dari susu, ikan, dan sayuran hijau. Vitamin D dari paparan sinar matahari pagi.\n\n### Latihan Beban\n\nJalan kaki, joging, senam, dan latihan beban merangsang pembentukan tulang baru.\n\n### Hindari Faktor Risiko\n\nBerhenti merokok, batasi alkohol, dan hati-hati terhadap risiko jatuh di rumah.",
        "Foto klinis: lansia wanita melakukan senam osteoporosis dipandu fisioterapis, suasana terang dan aktif, logo Healio Medika tampak di dinding.",
        ["International Osteoporosis Foundation - https://www.osteoporosis.foundation", "Kemenkes RI - Pedoman Pengelolaan Osteoporosis"],
        "Penyakit Tulang"
      ),
      (
        "anemia-kurang-darah",
        "Anemia: Penyebab Kurang Darah, Gejala, dan Cara Mengatasinya",
        "Anemia atau kurang darah sering membuat tubuh lemas. Kenali penyebab, gejala, dan cara mengatasinya dengan nutrisi yang tepat.",
        "## Apa Itu Anemia?\n\nAnemia adalah kondisi di mana jumlah sel darah merah atau hemoglobin dalam darah berada di bawah nilai normal. Akibatnya, organ-organ tubuh tidak mendapat cukup oksigen.\n\n## Jenis-jenis Anemia\n\n### Anemia Defisiensi Besi\n\nPaling umum. Disebabkan kurang asupan zat besi, perdarahan kronis (menstruasi berlebihan, wasir, ulkus peptik), atau gangguan penyerapan.\n\n### Anemia Defisiensi B12 dan Folat\n\nMenyebabkan anemia megaloblastik. Sering terjadi pada vegetarian ketat atau gangguan penyerapan usus.\n\n### Anemia Hemolitik\n\nSel darah merah hancur lebih cepat dari yang diproduksi. Dapat disebabkan penyakit autoimun atau herediter.\n\n## Gejala Anemia\n\n- Kelelahan dan kelemahan\n- Pucat pada kulit, bibir, dan kelopak mata\n- Sesak napas saat aktivitas\n- Pusing dan sakit kepala\n- Jantung berdebar-debar\n- Konsentrasi menurun\n\n## Pencegahan dan Pengobatan\n\n### Sumber Zat Besi\n\nDaging merah, hati ayam, kacang-kacangan, sayuran hijau gelap. Konsumsi bersama vitamin C meningkatkan penyerapan.\n\n### Suplementasi\n\nTablet zat besi direkomendasikan untuk ibu hamil, remaja putri, dan penderita anemia defisiensi besi.",
        "Foto klinis: ibu hamil berkonsultasi dengan dokter kandungan tentang suplementasi zat besi, ruang antenatal care klinik modern, logo Healio Medika.",
        ["WHO - Anaemia, https://www.who.int/health-topics/anaemia", "Kemenkes RI - Pedoman Pemberian Tablet Tambah Darah"],
        "Penyakit Darah"
      ),
      (
        "vertigo-pusing-berputar",
        "Vertigo: Penyebab Pusing Berputar dan Cara Mengatasi dengan Manuver Epley",
        "Vertigo membuat penderitanya merasa dunia berputar. Kenali penyebabnya dan cara penanganan sederhana di rumah.",
        "## Apa Itu Vertigo?\n\nVertigo adalah sensasi pusing di mana penderita merasa dirinya atau lingkungan sekitarnya berputar atau bergerak, padahal keduanya diam.\n\n## Jenis Vertigo\n\n### BPPV (Benign Paroxysmal Positional Vertigo)\n\nPaling umum. Disebabkan perpindahan kristal kalsium (otolith) di telinga dalam. Dipicu perubahan posisi kepala.\n\n### Penyakit Meniere\n\nDisertai tinnitus (telinga berdenging), gangguan pendengaran, dan rasa penuh di telinga.\n\n### Neuritis Vestibular\n\nInflamasi saraf vestibular, biasanya setelah infeksi virus.\n\n## Gejala Vertigo\n\n- Sensasi berputar mendadak\n- Mual dan muntah\n- Gangguan keseimbangan\n- Nistagmus (gerakan mata tidak terkontrol)\n- Keringat dingin\n\n## Penanganan\n\n### Manuver Epley\n\nEfektif untuk BPPV. Serangkaian gerakan kepala untuk memindahkan kristal kalsium ke posisi yang tidak menimbulkan gejala. Sebaiknya dilakukan oleh dokter atau fisioterapis pertama kalinya.\n\n### Obat-obatan\n\nBetahistin, dimenhidrinat, atau prometazin untuk mengurangi gejala akut.\n\n### Latihan Vestibular\n\nLatihanBrandt-Daroff membantu otak beradaptasi dan mengurangi frekuensi kambuh.",
        "Foto klinis: fisioterapis melakukan manuver Epley pada pasien vertigo berbaring di meja periksa, posisi profesional, logo Healio Medika.",
        ["American Academy of Otolaryngology - BPPV Guidelines", "Kemenkes RI - Panduan Penatalaksanaan Vertigo"],
        "Penyakit THT dan Saraf"
      ),
      (
        "maag-gastritis-radang-lambung",
        "Maag (Gastritis): Penyebab, Gejala, dan Diet yang Tepat untuk Penderita",
        "Maag atau gastritis menyebabkan nyeri ulu hati yang mengganggu. Pelajari penyebabnya dan pola makan yang dianjurkan.",
        "## Apa Itu Gastritis (Maag)?\n\nGastritis adalah peradangan pada lapisan lambung yang dapat bersifat akut (tiba-tiba) atau kronis (berlangsung lama).\n\n## Penyebab Gastritis\n\n### Infeksi H. pylori\n\nHelicobacter pylori adalah bakteri yang menginfeksi lapisan lambung dan menjadi penyebab utama gastritis kronis dan tukak lambung.\n\n### Penggunaan NSAID\n\nObat anti-nyeri seperti ibuprofen dan aspirin dapat merusak lapisan pelindung lambung.\n\n### Gaya Hidup\n\nStres berlebih, konsumsi alkohol, makan tidak teratur, dan makanan pedas/asam berlebihan.\n\n## Gejala Gastritis\n\n- Nyeri atau perih di ulu hati\n- Mual dan muntah\n- Perut terasa penuh atau kembung\n- Kehilangan nafsu makan\n- Mual yang memburuk saat perut kosong\n\n## Diet untuk Penderita Maag\n\n### Makanan yang Dianjurkan\n\n- Nasi, roti gandum, pisang, apel\n- Sayuran tidak bergas (kentang, wortel, bayam)\n- Protein tanpa lemak (ikan, ayam rebus)\n- Yoghurt (probiotik membantu H. pylori)\n\n### Makanan yang Dihindari\n\n- Kopi, coklat, dan minuman berkarbonasi\n- Makanan pedas, asam, dan berlemak tinggi\n- Alkohol dan rokok\n\n## Pengobatan\n\nAntasida, PPI (omeprazol), H2-blocker, dan antibiotik (jika H. pylori positif) sesuai resep dokter.",
        "Foto klinis: pasien berkonsultasi dengan dokter tentang pola makan yang tepat untuk penderita gastritis, meja konsultasi dengan model lambung, logo Healio Medika.",
        ["Mayo Clinic - Gastritis, https://www.mayoclinic.org/diseases-conditions/gastritis", "Kemenkes RI - Pedoman Pengelolaan Penyakit Saluran Cerna"],
        "Penyakit Pencernaan"
      ),
      (
        "wasir-hemoroid-pengobatan",
        "Wasir (Hemoroid): Penyebab, Gejala, dan Cara Mengobati secara Alami",
        "Wasir atau hemoroid menyebabkan ketidaknyamanan saat BAB. Kenali penyebabnya dan cara penanganan konservatif yang efektif.",
        "## Apa Itu Wasir (Hemoroid)?\n\nHemoroid adalah pembengkakan pembuluh darah di rektum bagian bawah atau anus, mirip varises tetapi di area anus.\n\n## Jenis Hemoroid\n\n### Hemoroid Internal\n\nTerletak di dalam rektum. Biasanya tidak terasa nyeri namun dapat menyebabkan perdarahan saat BAB.\n\n### Hemoroid Eksternal\n\nTerletak di luar anus. Dapat terasa nyeri, gatal, dan membengkak.\n\n## Penyebab Hemoroid\n\n- Mengejan berlebihan saat BAB\n- Konstipasi atau diare kronis\n- Kurang konsumsi serat\n- Kehamilan (tekanan janin pada pembuluh darah)\n- Duduk terlalu lama\n- Kelebihan berat badan\n\n## Gejala Hemoroid\n\n- Perdarahan merah segar saat atau setelah BAB\n- Gatal dan iritasi di sekitar anus\n- Rasa tidak nyaman atau nyeri\n- Benjolan di sekitar anus\n\n## Pengobatan Konservatif\n\n### Diet Tinggi Serat\n\nKonsumsi 25-30 gram serat per hari dari buah, sayur, dan biji-bijian mencegah konstipasi.\n\n### Sitz Bath\n\nMerendam area anus dalam air hangat 15-20 menit beberapa kali sehari mengurangi peradangan dan nyeri.\n\n### Obat Topikal\n\nKrim atau supositoria yang mengandung hidrokortison untuk mengurangi peradangan dan gatal.\n\n## Kapan Harus ke Dokter\n\nJika perdarahan hebat, sangat nyeri, atau tidak membaik dengan pengobatan mandiri dalam 1 minggu.",
        "Foto klinis: dokter spesialis bedah menjelaskan prosedur penanganan hemoroid kepada pasien menggunakan model anatomi, ruang konsultasi profesional, logo Healio Medika.",
        ["Mayo Clinic - Hemorrhoids, https://www.mayoclinic.org/diseases-conditions/hemorrhoids", "Kemenkes RI - Panduan Pengelolaan Penyakit Anorektal"],
        "Penyakit Pencernaan"
      ),
    ];
    for ((slug, title, meta, content, imgPrompt, refs, cat) in seeds.values()) {
      let id = state.nextArticleId;
      state.nextArticleId += 1;
      let now2 = Time.now();
      articles.add({
        id = id;
        slug = slug;
        title = title;
        metaDescription = meta;
        content = content;
        imagePrompt = imgPrompt;
        references = refs;
        category = cat;
        createdAt = now2;
        updatedAt = now2;
      });
    };
    "ok"
  };

};
