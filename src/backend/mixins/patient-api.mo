import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import AuthTypes "../types/auth";
import PatientTypes "../types/patient";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  patient_profiles : Map.Map<Common.UserId, PatientTypes.PatientProfile>,
) {
  public shared ({ caller }) func savePatientProfile(
    name : Text,
    age : Nat,
    health_conditions : [Text],
    allergies : [Text],
    blood_type : Text,
    emergency_contact_name : Text,
    emergency_contact_phone : Text,
  ) : async PatientTypes.PatientProfile {
    if (roles.get(caller) != ?(#patient)) {
      return { id = caller; name = ""; age = 0; health_conditions = [];
               allergies = []; blood_type = "";
               emergency_contact_name = ""; emergency_contact_phone = "";
               created_at = 0 };
    };
    let now = Time.now();
    let profile : PatientTypes.PatientProfile = {
      id = caller;
      name = name;
      age = age;
      health_conditions = health_conditions;
      allergies = allergies;
      blood_type = blood_type;
      emergency_contact_name = emergency_contact_name;
      emergency_contact_phone = emergency_contact_phone;
      created_at = now;
    };
    patient_profiles.add(caller, profile);
    profile
  };

  public query ({ caller }) func getMyPatientProfile() : async ?PatientTypes.PatientProfile {
    patient_profiles.get(caller)
  };

  public query ({ caller }) func getPatientProfile(user : Common.UserId) : async ?PatientTypes.PatientProfile {
    patient_profiles.get(user)
  };
}
