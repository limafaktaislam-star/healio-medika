import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";
import ServiceTypes "../types/service";
import ServiceLib "../lib/service";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
  state : { var nextServiceId : Nat },
) {
  public query func listServices() : async [ServiceTypes.Service] {
    Debug.todo()
  };

  public query func getService(id : Common.ServiceId) : async ?ServiceTypes.Service {
    Debug.todo()
  };

  public shared ({ caller }) func adminCreateService(
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : async ServiceTypes.Service {
    Debug.todo()
  };

  public shared ({ caller }) func adminUpdateService(
    id : Common.ServiceId,
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : async () {
    Debug.todo()
  };

  public shared ({ caller }) func adminDeleteService(id : Common.ServiceId) : async () {
    Debug.todo()
  };
}
