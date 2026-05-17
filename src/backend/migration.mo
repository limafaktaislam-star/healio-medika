import Principal "mo:core/Principal";
import List "mo:core/List";

module {

  // ============================================================
  // OLD TYPES (before migration)
  // ============================================================

  public type OldPatientProfile = {
    principal : Principal;
    name : Text;
    nik : ?Text;
    birthDate : ?Text;
    age : Nat;
    gender : ?Text;
    address : ?Text;
    phoneNumber : ?Text;
    emergencyContactName : ?Text;
    emergencyContactRelation : ?Text;
    emergencyContactPhone : ?Text;
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    conditions : Text;
    allergies : Text;
    bloodType : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OldNurseStatus = { #pending_verification; #verified; #rejected };

  public type OldNurseProfile = {
    principal : Principal;
    name : Text;
    specialization : Text;
    status : OldNurseStatus;
    strNumber : Text;
    strExpiry : ?Text;
    strDocumentUrl : ?Text;
    university : ?Text;
    graduationYear : ?Nat;
    ijazahDocumentUrl : ?Text;
    professionalOrg : ?Text;
    previousWorkHistory : ?Text;
    totalExperienceYears : ?Nat;
    previousFacilityType : ?Text;
    currentWorkplace : ?Text;
    currentWorkDuration : ?Nat;
    currentFacilityType : ?Text;
    emergencyCertification : ?Text;
    emergencyCertExpiry : ?Text;
    additionalCertificates : ?Text;
    medicalCompetencies : ?Text;
    employeeIdCardUrl : ?Text;
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    experienceYears : Nat;
    strDocUrl : Text;
    ktpDocUrl : Text;
    latitude : ?Float;
    longitude : ?Float;
    locationUpdatedAt : ?Int;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OldServiceCategory = {
    #elderlycare; #woundcare; #postopcare; #physiotherapy; #ambulance
  };

  public type OldService = {
    id : Nat;
    name : Text;
    description : Text;
    category : OldServiceCategory;
    baseFeeIdr : Nat;
    isActive : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OldBookingStatus = {
    #pending; #accepted; #in_progress; #completed; #cancelled; #rejected
  };

  public type OldBooking = {
    id : Nat;
    patientPrincipal : Principal;
    nursePrincipal : ?Principal;
    serviceId : Nat;
    scheduledDate : Text;
    scheduledTime : Text;
    latitude : Float;
    longitude : Float;
    notes : Text;
    status : OldBookingStatus;
    visitReport : ?Text;
    estimatedFeeIdr : Nat;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OldPricingConfig = {
    perKmRateIdr : Nat;
    nightSurchargePct : Nat;
    holidaySurchargePct : Nat;
    updatedAt : Int;
  };

  public type OldPricingAuditEntry = {
    id : Nat;
    adminPrincipal : Principal;
    changeDescription : Text;
    changedAt : Int;
  };

  public type OldArticle = {
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

  public type OldUserRole = { #patient; #nurse; #admin };

  public type OldPricingState = {
    var pricingConfig : OldPricingConfig;
    var nextServiceId : Nat;
    var nextBookingId : Nat;
    var nextAuditId   : Nat;
  };

  public type OldState = {
    roles        : List.List<(Principal, OldUserRole)>;
    patients     : List.List<OldPatientProfile>;
    nurses       : List.List<OldNurseProfile>;
    services     : List.List<OldService>;
    bookings     : List.List<OldBooking>;
    auditLog     : List.List<OldPricingAuditEntry>;
    state        : OldPricingState;
  };

  // ============================================================
  // NEW TYPES (after migration) — must exactly match main.mo
  // ============================================================

  public type UserRole = { #patient; #nurse; #admin };

  public type ServiceCategory = {
    #elderlycare; #woundcare; #postopcare; #physiotherapy; #ambulance
  };

  public type BookingStatus = {
    #pending; #accepted; #in_progress; #completed; #cancelled; #rejected
  };

  public type NurseStatus = { #pending_verification; #verified; #rejected };

  public type PatientProfile = {
    principal : Principal;
    name : Text;
    nik : ?Text;
    birthDate : ?Text;
    age : Nat;
    gender : ?Text;
    address : ?Text;
    phoneNumber : ?Text;
    emergencyContactName : ?Text;
    emergencyContactRelation : ?Text;
    emergencyContactPhone : ?Text;
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    email : ?Text;
    passwordHash : ?Text;
    verificationStatus : Text;
    conditions : Text;
    allergies : Text;
    bloodType : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type NurseProfile = {
    principal : Principal;
    name : Text;
    specialization : Text;
    profession : ?Text;
    email : ?Text;
    passwordHash : ?Text;
    status : NurseStatus;
    strNumber : Text;
    strExpiry : ?Text;
    strDocumentUrl : ?Text;
    university : ?Text;
    graduationYear : ?Nat;
    ijazahDocumentUrl : ?Text;
    professionalOrg : ?Text;
    previousWorkHistory : ?Text;
    totalExperienceYears : ?Nat;
    previousFacilityType : ?Text;
    currentWorkplace : ?Text;
    currentWorkDuration : ?Nat;
    currentFacilityType : ?Text;
    emergencyCertification : ?Text;
    emergencyCertExpiry : ?Text;
    additionalCertificates : ?Text;
    medicalCompetencies : ?Text;
    employeeIdCardUrl : ?Text;
    ktpPhotoUrl : ?Text;
    selfieWithKtpUrl : ?Text;
    experienceYears : Nat;
    strDocUrl : Text;
    ktpDocUrl : Text;
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

  public type NewPricingState = {
    var pricingConfig    : PricingConfig;
    var nextServiceId    : Nat;
    var nextBookingId    : Nat;
    var nextAuditId      : Nat;
    var nextArticleId    : Nat;
    var articlesSeedDone : Bool;
  };

  public type NewState = {
    roles    : List.List<(Principal, UserRole)>;
    patients : List.List<PatientProfile>;
    nurses   : List.List<NurseProfile>;
    services : List.List<Service>;
    bookings : List.List<Booking>;
    auditLog : List.List<PricingAuditEntry>;
    articles : List.List<Article>;
    state    : NewPricingState;
  };

  // ============================================================
  // MIGRATION FUNCTION
  // ============================================================

  public func run(old : OldState) : NewState {
    let newPatients = old.patients.map<OldPatientProfile, PatientProfile>(
      func(p : OldPatientProfile) : PatientProfile {
        {
          principal                = p.principal;
          name                     = p.name;
          nik                      = p.nik;
          birthDate                = p.birthDate;
          age                      = p.age;
          gender                   = p.gender;
          address                  = p.address;
          phoneNumber              = p.phoneNumber;
          emergencyContactName     = p.emergencyContactName;
          emergencyContactRelation = p.emergencyContactRelation;
          emergencyContactPhone    = p.emergencyContactPhone;
          ktpPhotoUrl              = p.ktpPhotoUrl;
          selfieWithKtpUrl         = p.selfieWithKtpUrl;
          email                    = null;
          passwordHash             = null;
          verificationStatus       = "pending_verification";
          conditions               = p.conditions;
          allergies                = p.allergies;
          bloodType                = p.bloodType;
          createdAt                = p.createdAt;
          updatedAt                = p.updatedAt;
        }
      }
    );

    let newNurses = old.nurses.map<OldNurseProfile, NurseProfile>(
      func(n : OldNurseProfile) : NurseProfile {
        {
          principal              = n.principal;
          name                   = n.name;
          specialization         = n.specialization;
          profession             = null;
          email                  = null;
          passwordHash           = null;
          status                 = n.status;
          strNumber              = n.strNumber;
          strExpiry              = n.strExpiry;
          strDocumentUrl         = n.strDocumentUrl;
          university             = n.university;
          graduationYear         = n.graduationYear;
          ijazahDocumentUrl      = n.ijazahDocumentUrl;
          professionalOrg        = n.professionalOrg;
          previousWorkHistory    = n.previousWorkHistory;
          totalExperienceYears   = n.totalExperienceYears;
          previousFacilityType   = n.previousFacilityType;
          currentWorkplace       = n.currentWorkplace;
          currentWorkDuration    = n.currentWorkDuration;
          currentFacilityType    = n.currentFacilityType;
          emergencyCertification = n.emergencyCertification;
          emergencyCertExpiry    = n.emergencyCertExpiry;
          additionalCertificates = n.additionalCertificates;
          medicalCompetencies    = n.medicalCompetencies;
          employeeIdCardUrl      = n.employeeIdCardUrl;
          ktpPhotoUrl            = n.ktpPhotoUrl;
          selfieWithKtpUrl       = n.selfieWithKtpUrl;
          experienceYears        = n.experienceYears;
          strDocUrl              = n.strDocUrl;
          ktpDocUrl              = n.ktpDocUrl;
          latitude               = n.latitude;
          longitude              = n.longitude;
          locationUpdatedAt      = n.locationUpdatedAt;
          createdAt              = n.createdAt;
          updatedAt              = n.updatedAt;
        }
      }
    );

    let newState : NewPricingState = {
      var pricingConfig    = old.state.pricingConfig;
      var nextServiceId    = old.state.nextServiceId;
      var nextBookingId    = old.state.nextBookingId;
      var nextAuditId      = old.state.nextAuditId;
      var nextArticleId    = 1;
      var articlesSeedDone = false;
    };

    {
      roles    = old.roles;
      patients = newPatients;
      nurses   = newNurses;
      services = old.services;
      bookings = old.bookings;
      auditLog = old.auditLog;
      articles = List.empty<Article>();
      state    = newState;
    }
  };
};
