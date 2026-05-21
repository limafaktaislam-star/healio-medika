import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Common "../types/common";
import PricingTypes "../types/pricing";

module {
  public func pricingKey(
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
  ) : Text {
    let catKey = switch (category) {
      case (#perawatan_lansia) "perawatan_lansia";
      case (#perawatan_luka)  "perawatan_luka";
      case (#pasca_operasi)   "pasca_operasi";
      case (#fisioterapi)     "fisioterapi";
      case (#ambulans)        "ambulans";
    };
    switch (ambulans_type) {
      case null { catKey };
      case (?#transport)      { catKey # "_transport" };
      case (?#gawat_darurat)  { catKey # "_gawat_darurat" };
      case (?#jenazah)        { catKey # "_jenazah" };
    };
  };

  public func getPricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
  ) : ?PricingTypes.PricingConfig {
    configs.get(pricingKey(category, ambulans_type))
  };

  public func updatePricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    audit_log : List.List<PricingTypes.PricingAuditEntry>,
    state : { var nextPricingId : Nat; var nextAuditId : Nat },
    caller : Common.UserId,
    req : PricingTypes.UpdatePricingRequest,
  ) : PricingTypes.PricingConfig {
    let key = pricingKey(req.category, req.ambulans_type);
    let now = Time.now();
    let id = state.nextPricingId;
    state.nextPricingId += 1;
    let old = switch (configs.get(key)) {
      case (?existing) existing;
      case null {
        {
          id = id;
          service_category = req.category;
          ambulans_type = req.ambulans_type;
          base_fee = 0;
          per_km_transport_rate = 0;
          night_surcharge_percentage = 0;
          holiday_surcharge_percentage = 0;
          updated_by = caller;
          updated_at = now;
        }
      };
    };
    let updated : PricingTypes.PricingConfig = {
      id = old.id;
      service_category = req.category;
      ambulans_type = req.ambulans_type;
      base_fee = req.base_fee;
      per_km_transport_rate = req.per_km_transport_rate;
      night_surcharge_percentage = req.night_surcharge_percentage;
      holiday_surcharge_percentage = req.holiday_surcharge_percentage;
      updated_by = caller;
      updated_at = now;
    };
    configs.add(key, updated);
    let auditId = state.nextAuditId;
    state.nextAuditId += 1;
    audit_log.add({
      id = auditId;
      changed_by = caller;
      category = req.category;
      ambulans_type = req.ambulans_type;
      old_base_fee = old.base_fee;
      new_base_fee = req.base_fee;
      old_per_km_rate = old.per_km_transport_rate;
      new_per_km_rate = req.per_km_transport_rate;
      old_night_surcharge_pct = old.night_surcharge_percentage;
      new_night_surcharge_pct = req.night_surcharge_percentage;
      old_holiday_surcharge_pct = old.holiday_surcharge_percentage;
      new_holiday_surcharge_pct = req.holiday_surcharge_percentage;
      changed_at = now;
    });
    updated
  };

  public func listAllPricing(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
  ) : [PricingTypes.PricingConfig] {
    var result = List.empty<PricingTypes.PricingConfig>();
    for ((_, cfg) in configs.entries()) {
      result.add(cfg);
    };
    result.toArray()
  };

  public func getAuditLog(
    audit_log : List.List<PricingTypes.PricingAuditEntry>,
  ) : [PricingTypes.PricingAuditEntry] {
    audit_log.toArray()
  };

  public func estimateCost(
    configs : Map.Map<Text, PricingTypes.PricingConfig>,
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
    distance_km : Float,
    booking_hour : Nat,
    is_holiday : Bool,
  ) : PricingTypes.CostEstimate {
    switch (getPricing(configs, category, ambulans_type)) {
      case null {
        { base_fee = 0; transport_fee = 0; night_surcharge = 0; holiday_surcharge = 0; total_fee = 0 }
      };
      case (?cfg) {
        let base_fee = cfg.base_fee;
        let transport_fee = Int.abs((distance_km * cfg.per_km_transport_rate.toFloat()).toInt()).toNat();
        let subtotal = base_fee + transport_fee;
        let is_night = booking_hour >= 18 or booking_hour < 6;
        let night_surcharge = if (is_night) { subtotal * cfg.night_surcharge_percentage / 100 } else { 0 };
        let holiday_surcharge = if (is_holiday) { (subtotal + night_surcharge) * cfg.holiday_surcharge_percentage / 100 } else { 0 };
        let total_fee = subtotal + night_surcharge + holiday_surcharge;
        { base_fee; transport_fee; night_surcharge; holiday_surcharge; total_fee }
      };
    };
  };
}
