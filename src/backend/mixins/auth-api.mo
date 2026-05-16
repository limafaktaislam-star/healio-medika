import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
) {
  public shared ({ caller }) func registerAsPatient() : async () {
    Debug.todo()
  };

  public shared ({ caller }) func registerAsNurse() : async () {
    Debug.todo()
  };

  public query ({ caller }) func getMyRole() : async ?AuthTypes.UserRole {
    Debug.todo()
  };

  public query ({ caller }) func getMyPrincipal() : async Common.UserId {
    Debug.todo()
  };
}
