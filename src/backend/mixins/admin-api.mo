import Map "mo:core/Map";
import List "mo:core/List";
import Debug "mo:core/Debug";
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
    Debug.todo()
  };

  public shared ({ caller }) func adminApproveNurse(nurse_id : Common.UserId) : async () {
    Debug.todo()
  };

  public shared ({ caller }) func adminRejectNurse(nurse_id : Common.UserId) : async () {
    Debug.todo()
  };

  public query ({ caller }) func adminGetAllBookings() : async [BookingTypes.Booking] {
    Debug.todo()
  };

  public query ({ caller }) func adminGetBookingStats() : async {
    total : Nat;
    pending : Nat;
    accepted : Nat;
    completed : Nat;
    cancelled : Nat;
  } {
    Debug.todo()
  };

  public query ({ caller }) func listPricingConfigs() : async [PricingTypes.PricingConfig] {
    Debug.todo()
  };

  public shared ({ caller }) func adminUpdatePricing(
    req : PricingTypes.UpdatePricingRequest,
  ) : async PricingTypes.PricingConfig {
    Debug.todo()
  };

  public query ({ caller }) func getPricingAuditLog() : async [PricingTypes.PricingAuditEntry] {
    Debug.todo()
  };

  public query func estimateCost(
    category : Common.ServiceCategory,
    ambulans_type : ?Common.AmbulansType,
    distance_km : Float,
    booking_hour : Nat,
    is_holiday : Bool,
  ) : async PricingTypes.CostEstimate {
    Debug.todo()
  };
}
