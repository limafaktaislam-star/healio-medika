import Common "common";

module {
  public type PricingConfig = {
    id : Nat;
    service_category : Common.ServiceCategory;
    ambulans_type : ?Common.AmbulansType;
    base_fee : Nat;
    per_km_transport_rate : Nat;
    night_surcharge_percentage : Nat;
    holiday_surcharge_percentage : Nat;
    updated_by : Common.UserId;
    updated_at : Common.Timestamp;
  };

  public type PricingKey = {
    category : Common.ServiceCategory;
    ambulans_type : ?Common.AmbulansType;
  };

  public type PricingAuditEntry = {
    id : Nat;
    changed_by : Common.UserId;
    category : Common.ServiceCategory;
    ambulans_type : ?Common.AmbulansType;
    old_base_fee : Nat;
    new_base_fee : Nat;
    old_per_km_rate : Nat;
    new_per_km_rate : Nat;
    old_night_surcharge_pct : Nat;
    new_night_surcharge_pct : Nat;
    old_holiday_surcharge_pct : Nat;
    new_holiday_surcharge_pct : Nat;
    changed_at : Common.Timestamp;
  };

  public type UpdatePricingRequest = {
    category : Common.ServiceCategory;
    ambulans_type : ?Common.AmbulansType;
    base_fee : Nat;
    per_km_transport_rate : Nat;
    night_surcharge_percentage : Nat;
    holiday_surcharge_percentage : Nat;
  };

  public type CostEstimate = {
    base_fee : Nat;
    transport_fee : Nat;
    night_surcharge : Nat;
    holiday_surcharge : Nat;
    total_fee : Nat;
  };
}
