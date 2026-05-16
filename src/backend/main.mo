import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

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
    name : Text;
    age : Nat;
    conditions : Text;
    allergies : Text;
    bloodType : Text;
    emergencyContact : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type NurseProfile = {
    principal : Principal;
    name : Text;
    strNumber : Text;
    specialization : Text;
    experienceYears : Nat;
    strDocUrl : Text;
    ktpDocUrl : Text;
    status : NurseStatus;
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

  public type BookingStats = {
    total : Nat;
    pending : Nat;
    accepted : Nat;
    in_progress : Nat;
    completed : Nat;
    cancelled : Nat;
    rejected : Nat;
  };

  // ============================================================
  // STATE
  // ============================================================

  let roles        = List.empty<(Principal, UserRole)>();
  let patients     = List.empty<PatientProfile>();
  let nurses       = List.empty<NurseProfile>();
  let services     = List.empty<Service>();
  let bookings     = List.empty<Booking>();
  let auditLog     = List.empty<PricingAuditEntry>();

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

  public shared ({ caller }) func registerAsPatient() : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #patient));
    "ok"
  };

  public shared ({ caller }) func registerAsNurse(
    name : Text,
    strNumber : Text,
    specialization : Text,
    experienceYears : Nat,
    strDocUrl : Text,
    ktpDocUrl : Text,
  ) : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #nurse));
    let now = Time.now();
    nurses.add({
      principal        = caller;
      name             = name;
      strNumber        = strNumber;
      specialization   = specialization;
      experienceYears  = experienceYears;
      strDocUrl        = strDocUrl;
      ktpDocUrl        = ktpDocUrl;
      status           = #pending_verification;
      latitude         = null;
      longitude        = null;
      locationUpdatedAt = null;
      createdAt        = now;
      updatedAt        = now;
    });
    "ok"
  };

  public shared ({ caller }) func registerAsAdmin() : async Text {
    if (caller.isAnonymous()) { return "error: not authenticated" };
    switch (getRole(caller)) {
      case (?_) { return "error: already registered" };
      case null {};
    };
    roles.add((caller, #admin));
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
    age : Nat,
    conditions : Text,
    allergies : Text,
    bloodType : Text,
    emergencyContact : Text,
  ) : async Text {
    if (not isPatient(caller)) { return "error: not a patient" };
    let now = Time.now();
    switch (patients.findIndex(func(p : PatientProfile) : Bool { Principal.equal(p.principal, caller) })) {
      case (?idx) {
        patients.put(idx, {
          principal = caller; name = name; age = age;
          conditions = conditions; allergies = allergies;
          bloodType = bloodType; emergencyContact = emergencyContact;
          createdAt = (patients.at(idx)).createdAt;
          updatedAt = now;
        });
      };
      case null {
        patients.add({
          principal = caller; name = name; age = age;
          conditions = conditions; allergies = allergies;
          bloodType = bloodType; emergencyContact = emergencyContact;
          createdAt = now; updatedAt = now;
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
    specialization : Text,
    experienceYears : Nat,
    strDocUrl : Text,
    ktpDocUrl : Text,
  ) : async Text {
    if (not isNurse(caller)) { return "error: not a nurse" };
    let now = Time.now();
    switch (nurses.findIndex(func(n : NurseProfile) : Bool { Principal.equal(n.principal, caller) })) {
      case (?idx) {
        let existing = nurses.at(idx);
        nurses.put(idx, {
          existing with
          name = name; strNumber = strNumber;
          specialization = specialization; experienceYears = experienceYears;
          strDocUrl = strDocUrl; ktpDocUrl = ktpDocUrl;
          updatedAt = now;
        });
      };
      case null {
        nurses.add({
          principal = caller; name = name; strNumber = strNumber;
          specialization = specialization; experienceYears = experienceYears;
          strDocUrl = strDocUrl; ktpDocUrl = ktpDocUrl;
          status = #pending_verification;
          latitude = null; longitude = null; locationUpdatedAt = null;
          createdAt = now; updatedAt = now;
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

};
