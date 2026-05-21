import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import AuthTypes "../types/auth";
import NurseTypes "../types/nurse";
import BookingTypes "../types/booking";
import PricingTypes "../types/pricing";
import PricingLib "../lib/pricing";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  nurse_profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  pricing_configs : Map.Map<Text, PricingTypes.PricingConfig>,
  pricing_audit_log : List.List<PricingTypes.PricingAuditEntry>,
  pricing_state : { var nextPricingId : Nat; var nextAuditId : Nat },
) {
  public query ({ caller }) func adminGetPendingNurses() : async [NurseTypes.NurseProfile] {
    if (roles.get(caller) != ?(#admin)) { return [] };
    var result = List.empty<NurseTypes.NurseProfile>();
    for ((_, np) in nurse_profiles.entries()) {
      if (np.status == #pending_verification) { result.add(np) };
    };
    result.toArray()
  };

  public shared ({ caller }) func adminApproveNurse(nurse_id : Common.UserId) : async () {
    if (roles.get(caller) != ?(#admin)) { return };
    let now = Time.now();
    switch (nurse_profiles.get(nurse_id)) {
      case (?np) {
        nurse_profiles.add(nurse_id, { np with status = #verified; last_location_update = np.last_location_update });
      };
      case null {};
    };
  };

  public shared ({ caller }) func adminRejectNurse(nurse_id : Common.UserId) : async () {
    if (roles.get(caller) != ?(#admin)) { return };
    switch (nurse_profiles.get(nurse_id)) {
      case (?np) {
        nurse_profiles.add(nurse_id, { np with status = #rejected });
      };
      case null {};
    };
  };

  public query ({ caller }) func adminGetAllBookings() : async [BookingTypes.Booking] {
    if (roles.get(caller) != ?(#admin)) { return [] };
    var result = List.empty<BookingTypes.Booking>();
    for ((_, b) in bookings.entries()) { result.add(b) };
    result.toArray()
  };

  public query ({ caller }) func adminGetBookingStats() : async {
    total : Nat;
    pending : Nat;
    accepted : Nat;
    completed : Nat;
    cancelled : Nat;
  } {
    if (roles.get(caller) != ?(#admin)) {
      return { total = 0; pending = 0; accepted = 0; completed = 0; cancelled = 0 };
    };
    var total = 0; var pending = 0; var accepted = 0; var completed = 0; var cancelled = 0;
    for ((_, b) in bookings.entries()) {
      total += 1;
      switch (b.status) {
        case (#pending)   { pending += 1 };
        case (#accepted)  { accepted += 1 };
        case (#completed) { completed += 1 };
        case (#cancelled) { cancelled += 1 };
        case _ {};
      };
    };
    { total; pending; accepted; completed; cancelled }
  };

  public query ({ caller }) func listPricingConfigs() : async [PricingTypes.PricingConfig] {
    if (roles.get(caller) != ?(#admin)) { return [] };
    PricingLib.listAllPricing(pricing_configs)
  };

  public shared ({ caller }) func adminUpdatePricing(
    req : PricingTypes.UpdatePricingRequest,
  ) : async PricingTypes.PricingConfig {
    if (roles.get(caller) != ?(#admin)) {
      return { id = 0; service_category = req.category; ambulans_type = req.ambulans_type;
               base_fee = 0; per_km_transport_rate = 0; night_surcharge_percentage = 0;
               holiday_surcharge_percentage = 0; updated_by = caller; updated_at = Time.now() };
    };
    PricingLib.updatePricing(pricing_configs, pricing_audit_log, pricing_state, caller, req)
  };

  public query ({ caller }) func getPricingAuditLog() : async [PricingTypes.PricingAuditEntry] {
    if (roles.get(caller) != ?(#admin)) { return [] };
    PricingLib.getAuditLog(pricing_audit_log)
  };

  public query func estimateCost(
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
    distance_km : Float,
    booking_hour : Nat,
    is_holiday : Bool,
  ) : async PricingTypes.CostEstimate {
    PricingLib.estimateCost(pricing_configs, category, ambulans_type, distance_km, booking_hour, is_holiday)
  };
}
