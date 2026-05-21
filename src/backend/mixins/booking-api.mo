import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import AuthTypes "../types/auth";
import BookingTypes "../types/booking";

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
    if (roles.get(caller) != ?(#patient)) {
      return { id = 0; patient_id = caller; nurse_id = null; service_id = 0;
               booking_date = ""; booking_time = ""; patient_lat = 0.0; patient_lng = 0.0;
               notes = ""; status = #cancelled; distance_km = null;
               base_fee = 0; transport_fee = 0; night_surcharge = 0; holiday_surcharge = 0;
               total_fee = 0; visit_report = null; created_at = 0; updated_at = 0 };
    };
    let now = Time.now();
    let id = state.nextBookingId;
    state.nextBookingId += 1;
    let booking : BookingTypes.Booking = {
      id = id;
      patient_id = caller;
      nurse_id = null;
      service_id = req.service_id;
      booking_date = req.booking_date;
      booking_time = req.booking_time;
      patient_lat = req.patient_lat;
      patient_lng = req.patient_lng;
      notes = req.notes;
      status = #pending;
      distance_km = req.distance_km;
      base_fee = 0;
      transport_fee = 0;
      night_surcharge = 0;
      holiday_surcharge = 0;
      total_fee = 0;
      visit_report = null;
      created_at = now;
      updated_at = now;
    };
    bookings.add(id, booking);
    booking
  };

  public query ({ caller }) func getMyBookings() : async [BookingTypes.Booking] {
    var result = List.empty<BookingTypes.Booking>();
    for ((_, b) in bookings.entries()) {
      if (b.patient_id == caller) { result.add(b) };
    };
    result.toArray()
  };

  public query ({ caller }) func getBooking(id : Common.BookingId) : async ?BookingTypes.Booking {
    bookings.get(id)
  };

  public query ({ caller }) func getIncomingBookings() : async [BookingTypes.Booking] {
    if (roles.get(caller) != ?(#nurse)) { return [] };
    var result = List.empty<BookingTypes.Booking>();
    for ((_, b) in bookings.entries()) {
      if (b.status == #pending) { result.add(b) };
    };
    result.toArray()
  };

  public query ({ caller }) func getMySchedule() : async [BookingTypes.Booking] {
    if (roles.get(caller) != ?(#nurse)) { return [] };
    var result = List.empty<BookingTypes.Booking>();
    for ((_, b) in bookings.entries()) {
      switch (b.nurse_id) {
        case (?nid) {
          if (nid == caller and (b.status == #accepted or b.status == #in_progress)) {
            result.add(b);
          };
        };
        case null {};
      };
    };
    result.toArray()
  };

  public shared ({ caller }) func acceptBooking(booking_id : Common.BookingId) : async () {
    if (roles.get(caller) != ?(#nurse)) { return };
    let now = Time.now();
    switch (bookings.get(booking_id)) {
      case (?b) {
        if (b.status == #pending) {
          bookings.add(booking_id, { b with nurse_id = ?caller; status = #accepted; updated_at = now });
        };
      };
      case null {};
    };
  };

  public shared ({ caller }) func rejectBooking(booking_id : Common.BookingId) : async () {
    if (roles.get(caller) != ?(#nurse)) { return };
    let now = Time.now();
    switch (bookings.get(booking_id)) {
      case (?b) {
        if (b.status == #pending) {
          bookings.add(booking_id, { b with status = #rejected; updated_at = now });
        };
      };
      case null {};
    };
  };

  public shared ({ caller }) func submitVisitReport(
    booking_id : Common.BookingId,
    report : Text,
  ) : async () {
    let now = Time.now();
    switch (bookings.get(booking_id)) {
      case (?b) {
        let isNurse = switch (b.nurse_id) { case (?nid) nid == caller; case null false };
        if (isNurse and b.status == #accepted) {
          bookings.add(booking_id, { b with visit_report = ?report; status = #completed; updated_at = now });
        };
      };
      case null {};
    };
  };

  public shared ({ caller }) func cancelBooking(booking_id : Common.BookingId) : async () {
    if (roles.get(caller) != ?(#patient)) { return };
    let now = Time.now();
    switch (bookings.get(booking_id)) {
      case (?b) {
        if (b.patient_id == caller and (b.status == #pending or b.status == #accepted)) {
          bookings.add(booking_id, { b with status = #cancelled; updated_at = now });
        };
      };
      case null {};
    };
  };
}
