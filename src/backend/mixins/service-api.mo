import Map "mo:core/Map";
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
    ServiceLib.listActive(services)
  };

  public query func getService(id : Common.ServiceId) : async ?ServiceTypes.Service {
    ServiceLib.getById(services, id)
  };

  public shared ({ caller }) func adminCreateService(
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : async ServiceTypes.Service {
    if (roles.get(caller) != ?(#admin)) {
      return { id = 0; name = ""; description = ""; category = category;
               base_fee = 0; ambulans_type = null; is_active = false; created_at = 0 };
    };
    ServiceLib.createService(services, state, name, description, category, base_fee, ambulans_type)
  };

  public shared ({ caller }) func adminUpdateService(
    id : Common.ServiceId,
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : async () {
    if (roles.get(caller) != ?(#admin)) { return };
    ServiceLib.updateService(services, id, name, description, category, base_fee, ambulans_type)
  };

  public shared ({ caller }) func adminDeleteService(id : Common.ServiceId) : async () {
    if (roles.get(caller) != ?(#admin)) { return };
    ServiceLib.deleteService(services, id)
  };
}
