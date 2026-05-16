import Common "common";

module {
  public type PatientProfile = {
    id : Common.UserId;
    name : Text;
    age : Nat;
    health_conditions : [Text];
    allergies : [Text];
    blood_type : Text;
    emergency_contact_name : Text;
    emergency_contact_phone : Text;
    created_at : Common.Timestamp;
  };
}
