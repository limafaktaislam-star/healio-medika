import Map "mo:core/Map";
import Common "../types/common";
import PatientTypes "../types/patient";
import Time "mo:core/Time";

module {
  public func registerProfile(
    profiles : Map.Map<Common.UserId, PatientTypes.PatientProfile>,
    caller : Common.UserId,
    name : Text,
    age : Nat,
    health_conditions : [Text],
    allergies : [Text],
    blood_type : Text,
    emergency_contact_name : Text,
    emergency_contact_phone : Text,
  ) : PatientTypes.PatientProfile {
    let profile : PatientTypes.PatientProfile = {
      id = caller;
      name;
      age;
      health_conditions;
      allergies;
      blood_type;
      emergency_contact_name;
      emergency_contact_phone;
      created_at = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, PatientTypes.PatientProfile>,
    user : Common.UserId,
  ) : ?PatientTypes.PatientProfile {
    profiles.get(user);
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, PatientTypes.PatientProfile>,
    caller : Common.UserId,
    updated : PatientTypes.PatientProfile,
  ) : () {
    profiles.add(caller, updated);
  };
}
