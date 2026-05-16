import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Common "../types/common";
import BookingTypes "../types/booking";
import PricingTypes "../types/pricing";

module {
  public func createBooking(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    state : { var nextBookingId : Nat },
    caller : Common.UserId,
    req : BookingTypes.CreateBookingRequest,
    service_base_fee : Nat,
    pricing : ?PricingTypes.PricingConfig,
  ) : BookingTypes.Booking {
    Debug.todo()
  };

  public func getBooking(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    id : Common.BookingId,
  ) : ?BookingTypes.Booking {
    Debug.todo()
  };

  public func getPatientBookings(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    patient_id : Common.UserId,
  ) : [BookingTypes.Booking] {
    Debug.todo()
  };

  public func getIncomingBookingsForNurse(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  ) : [BookingTypes.Booking] {
    Debug.todo()
  };

  public func getNurseSchedule(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    nurse_id : Common.UserId,
  ) : [BookingTypes.Booking] {
    Debug.todo()
  };

  public func acceptBooking(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    booking_id : Common.BookingId,
    nurse_id : Common.UserId,
  ) : () {
    Debug.todo()
  };

  public func rejectBooking(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    booking_id : Common.BookingId,
    nurse_id : Common.UserId,
  ) : () {
    Debug.todo()
  };

  public func submitVisitReport(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    booking_id : Common.BookingId,
    nurse_id : Common.UserId,
    report : Text,
  ) : () {
    Debug.todo()
  };

  public func cancelBooking(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
    booking_id : Common.BookingId,
    caller : Common.UserId,
  ) : () {
    Debug.todo()
  };

  public func getAllBookings(
    bookings : Map.Map<Common.BookingId, BookingTypes.Booking>,
  ) : [BookingTypes.Booking] {
    Debug.todo()
  };
}
