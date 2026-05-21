import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import ServiceTypes "../types/service";
import List "mo:core/List";

module {
  public func createService(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    state : { var nextServiceId : Nat },
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : ServiceTypes.Service {
    let now = Time.now();
    let id = state.nextServiceId;
    state.nextServiceId += 1;
    let svc : ServiceTypes.Service = {
      id = id;
      name = name;
      description = description;
      category = category;
      base_fee = base_fee;
      ambulans_type = ambulans_type;
      is_active = true;
      created_at = now;
    };
    services.add(id, svc);
    svc
  };

  public func updateService(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    id : Common.ServiceId,
    name : Text,
    description : Text,
    category : Common.ServiceCategory,
    base_fee : Nat,
    ambulans_type : ?Common.AmbulansType,
  ) : () {
    switch (services.get(id)) {
      case (?existing) {
        services.add(id, { existing with name; description; category; base_fee; ambulans_type });
      };
      case null {};
    };
  };

  public func deleteService(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    id : Common.ServiceId,
  ) : () {
    switch (services.get(id)) {
      case (?existing) {
        services.add(id, { existing with is_active = false });
      };
      case null {};
    };
  };

  public func listActive(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
  ) : [ServiceTypes.Service] {
    var result = List.empty<ServiceTypes.Service>();
    for ((_, svc) in services.entries()) {
      if (svc.is_active) { result.add(svc) };
    };
    result.toArray()
  };

  public func getById(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    id : Common.ServiceId,
  ) : ?ServiceTypes.Service {
    services.get(id)
  };
}
