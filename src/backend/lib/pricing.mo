import Map "mo:core/Map";
import List "mo:core/List";
import Debug "mo:core/Debug";
import Common "../types/common";
import PricingTypes "../types/pricing";

module {
  public func getPricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
  ) : ?PricingTypes.PricingConfig {
    Debug.todo()
  };

  public func updatePricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    audit_log : List.List<PricingTypes.PricingAuditEntry>,
    state : { var nextPricingId : Nat; var nextAuditId : Nat },
    caller : Common.UserId,
    req : PricingTypes.UpdatePricingRequest,
  ) : PricingTypes.PricingConfig {
    Debug.todo()
  };

  public func listAllPricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
  ) : [PricingTypes.PricingConfig] {
    Debug.todo()
  };

  public func getAuditLog(
    audit_log : List.List<PricingTypes.PricingAuditEntry>,
  ) : [PricingTypes.PricingAuditEntry] {
    Debug.todo()
  };

  public func estimateCost(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
    distance_km : Float,
    booking_hour : Nat,
    is_holiday : Bool,
  ) : PricingTypes.CostEstimate {
    Debug.todo()
  };

  public func pricingKey(
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
  ) : Text {
    Debug.todo()
  };
}
