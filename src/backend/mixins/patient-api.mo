import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";
import PatientTypes "../types/patient";
import PatientLib "../lib/patient";

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
    Debug.todo()
  };

  public query ({ caller }) func getMyPatientProfile() : async ?PatientTypes.PatientProfile {
    Debug.todo()
  };

  public query ({ caller }) func getPatientProfile(user : Common.UserId) : async ?PatientTypes.PatientProfile {
    Debug.todo()
  };
}
