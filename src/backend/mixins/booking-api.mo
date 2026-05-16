import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import AuthTypes "../types/auth";
import BookingTypes "../types/booking";
import BookingLib "../lib/booking";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  services : Map.Map<Common.ServiceId, { base_fee : Nat; category : Common.ServiceCategory }>,
  pricing_state : {
    configs : Map.Map<Text, { base_fee : Nat; per_km_transport_rate : Nat; night_surcharge_percentage : Nat; holiday_surcharge_percentage : Nat }>;
  },
  state : { var nextBookingId : Nat },
) {
  public shared ({ caller }) func createBooking(
    req : BookingTypes.CreateBookingRequest,
  ) : async BookingTypes.Booking {
    Debug.todo()
  };

  public query ({ caller }) func getMyBookings() : async [BookingTypes.Booking] {
    Debug.todo()
  };

  public query ({ caller }) func getBooking(id : Common.BookingId) : async ?BookingTypes.Booking {
    Debug.todo()
  };

  public query ({ caller }) func getIncomingBookings() : async [BookingTypes.Booking] {
    Debug.todo()
  };

  public query ({ caller }) func getMySchedule() : async [BookingTypes.Booking] {
    Debug.todo()
  };

  public shared ({ caller }) func acceptBooking(booking_id : Common.BookingId) : async () {
    Debug.todo()
  };

  public shared ({ caller }) func rejectBooking(booking_id : Common.BookingId) : async () {
    Debug.todo()
  };

  public shared ({ caller }) func submitVisitReport(
    booking_id : Common.BookingId,
    report : Text,
  ) : async () {
    Debug.todo()
  };

  public shared ({ caller }) func cancelBooking(booking_id : Common.BookingId) : async () {
    Debug.todo()
  };
}
