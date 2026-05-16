import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import ServiceTypes "../types/service";

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
    Debug.todo()
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
    Debug.todo()
  };

  public func deleteService(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    id : Common.ServiceId,
  ) : () {
    Debug.todo()
  };

  public func listActive(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
  ) : [ServiceTypes.Service] {
    Debug.todo()
  };

  public func getById(
    services : Map.Map<Common.ServiceId, ServiceTypes.Service>,
    id : Common.ServiceId,
  ) : ?ServiceTypes.Service {
    Debug.todo()
  };
}
