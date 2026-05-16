import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";
import NurseTypes "../types/nurse";
import NurseLib "../lib/nurse";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  nurse_profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
) {
  public shared ({ caller }) func saveNurseProfile(
    name : Text,
    str_number : Text,
    specialization : Text,
    experience_years : Nat,
    str_document_url : Text,
    ktp_document_url : Text,
  ) : async NurseTypes.NurseProfile {
    Debug.todo()
  };

  public query ({ caller }) func getMyNurseProfile() : async ?NurseTypes.NurseProfile {
    Debug.todo()
  };

  public shared ({ caller }) func updateNurseLocation(lat : Float, lng : Float) : async () {
    Debug.todo()
  };

  public query ({ caller }) func getNearbyNurses(
    patient_lat : Float,
    patient_lng : Float,
  ) : async [NurseTypes.NurseProfile] {
    Debug.todo()
  };
}
