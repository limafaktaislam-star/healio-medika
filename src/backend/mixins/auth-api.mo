import Map "mo:core/Map";
import Common "../types/common";
import AuthTypes "../types/auth";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
) {
  public shared ({ caller }) func registerAsPatient() : async () {
    if (not caller.isAnonymous() and roles.get(caller) == null) {
      roles.add(caller, #patient);
    };
  };

  public shared ({ caller }) func registerAsNurse() : async () {
    if (not caller.isAnonymous() and roles.get(caller) == null) {
      roles.add(caller, #nurse);
    };
  };

  public query ({ caller }) func getMyRole() : async ?AuthTypes.UserRole {
    roles.get(caller)
  };

  public query ({ caller }) func getMyPrincipal() : async Common.UserId {
    caller
  };
}
