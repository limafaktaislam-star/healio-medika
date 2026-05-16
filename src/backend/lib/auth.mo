import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";

module {
  public func assignRole(
    roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
    target : Common.UserId,
    role : AuthTypes.UserRole,
  ) : () {
    roles.add(target, role);
  };

  public func getRole(
    roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
    user : Common.UserId,
  ) : ?AuthTypes.UserRole {
    roles.get(user);
  };

  public func isAdmin(
    roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
    user : Common.UserId,
  ) : Bool {
    switch (roles.get(user)) {
      case (? #admin) { true };
      case (_) { false };
    };
  };

  public func isNurse(
    roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
    user : Common.UserId,
  ) : Bool {
    switch (roles.get(user)) {
      case (? #nurse) { true };
      case (_) { false };
    };
  };

  public func isPatient(
    roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
    user : Common.UserId,
  ) : Bool {
    switch (roles.get(user)) {
      case (? #patient) { true };
      case (_) { false };
    };
  };
}
