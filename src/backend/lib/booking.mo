import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Common "../types/common";
import BookingTypes "../types/booking";
import PricingTypes "../types/pricing";
import Char "mo:core/Char";
import Nat "mo:core/Nat";

module {

  func calcFee(
    baseFee : Nat,
    distanceKm : Float,
    perKmRate : Nat,
    nightSurchargePct : Nat,
    holidaySurchargePct : Nat,
    nightTime : Bool,
    holiday : Bool,
  ) : { transport_fee : Nat; night_surcharge : Nat; holiday_surcharge : Nat; total : Nat } {
    let transport_fee = Int.abs((distanceKm * perKmRate.toFloat()).toInt()).toNat();
    var subtotal = baseFee + transport_fee;
    let night_surcharge = if (nightTime) { subtotal * nightSurchargePct / 100 } else { 0 };
    subtotal := subtotal + night_surcharge;
    let holiday_surcharge = if (holiday) { subtotal * holidaySurchargePct / 100 } else { 0 };
    let total = subtotal + holiday_surcharge;
    { transport_fee; night_surcharge; holiday_surcharge; total };
  };

  func isNightTime(timeText : Text) : Bool {
    // timeText expected format "HH:MM"
    if (timeText.size() < 5) { return false };
    let chars = timeText.chars();
    var hourStr = "";
    var colonSeen = false;
    for (c in chars) {
      if (not colonSeen) {
        if (c == ':') { colonSeen := true }
        else { hourStr := hourStr # Char.toText(c) };
      };
    };
    switch (Nat.fromText(hourStr)) {
      case (?h) { h >= 18 or h < 6 };
      case null { false };
    };
  };

  public func createBooking(
    bookings : List.List<BookingTypes.Booking>,
    state : { var nextBookingId : Nat },
    caller : Principal,
    serviceId : Nat,
    scheduledDate : Text,
    scheduledTime : Text,
    latitude : Float,
    longitude : Float,
    notes : Text,
    baseFee : Nat,
    distanceKm : ?Float,
    pricing : ?PricingTypes.PricingConfig,
  ) : BookingTypes.Booking {
    let now = Time.now();
    let id = state.nextBookingId;
    state.nextBookingId += 1;
    let dkm = switch (distanceKm) { case (?d) d; case null 0.0 };
    let fees = switch (pricing) {
      case (?cfg) {
        let night = isNightTime(scheduledTime);
        calcFee(baseFee, dkm, cfg.perKmRateIdr, cfg.nightSurchargePct, cfg.holidaySurchargePct, night, false);
      };
      case null { { transport_fee = 0; night_surcharge = 0; holiday_surcharge = 0; total = baseFee } };
    };
    let booking : BookingTypes.Booking = {
      id = id;
      patient_id = caller;
      nurse_id = null;
      service_id = serviceId;
      booking_date = scheduledDate;
      booking_time = scheduledTime;
      patient_lat = latitude;
      patient_lng = longitude;
      notes = notes;
      status = #pending;
      distance_km = distanceKm;
      base_fee = baseFee;
      transport_fee = fees.transport_fee;
      night_surcharge = fees.night_surcharge;
      holiday_surcharge = fees.holiday_surcharge;
      total_fee = fees.total;
      visit_report = null;
      created_at = now;
      updated_at = now;
    };
    bookings.add(booking);
    booking;
  };

  public func getBookingById(
    bookings : List.List<BookingTypes.Booking>,
    id : Nat,
  ) : ?BookingTypes.Booking {
    bookings.find(func(b : BookingTypes.Booking) : Bool { b.id == id });
  };

  public func getPatientBookings(
    bookings : List.List<BookingTypes.Booking>,
    patient_id : Principal,
  ) : [BookingTypes.Booking] {
    bookings.toArray().filter(func(b : BookingTypes.Booking) : Bool {
      Principal.equal(b.patient_id, patient_id)
    });
  };

  public func getIncomingBookingsForNurse(
    bookings : List.List<BookingTypes.Booking>,
  ) : [BookingTypes.Booking] {
    bookings.toArray().filter(func(b : BookingTypes.Booking) : Bool {
      b.status == #pending
    });
  };

  public func getNurseSchedule(
    bookings : List.List<BookingTypes.Booking>,
    nurse_id : Principal,
  ) : [BookingTypes.Booking] {
    bookings.toArray().filter(func(b : BookingTypes.Booking) : Bool {
      switch (b.nurse_id) {
        case (?nid) {
          Principal.equal(nid, nurse_id)
          and (b.status == #accepted or b.status == #in_progress)
        };
        case null { false };
      }
    });
  };

  public func acceptBooking(
    bookings : List.List<BookingTypes.Booking>,
    booking_id : Nat,
    nurse_id : Principal,
  ) : { #ok; #err : Text } {
    switch (bookings.findIndex(func(b : BookingTypes.Booking) : Bool {
      b.id == booking_id and b.status == #pending
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, {
          existing with
          nurse_id = ?nurse_id;
          status = #accepted;
          updated_at = Time.now();
        });
        #ok;
      };
      case null { #err("booking tidak ditemukan atau bukan status pending") };
    };
  };

  public func rejectBooking(
    bookings : List.List<BookingTypes.Booking>,
    booking_id : Nat,
    nurse_id : Principal,
  ) : { #ok; #err : Text } {
    ignore nurse_id;
    switch (bookings.findIndex(func(b : BookingTypes.Booking) : Bool {
      b.id == booking_id and b.status == #pending
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, { existing with status = #rejected; updated_at = Time.now() });
        #ok;
      };
      case null { #err("booking tidak ditemukan atau bukan status pending") };
    };
  };

  public func submitVisitReport(
    bookings : List.List<BookingTypes.Booking>,
    booking_id : Nat,
    nurse_id : Principal,
    report : Text,
  ) : { #ok; #err : Text } {
    switch (bookings.findIndex(func(b : BookingTypes.Booking) : Bool {
      b.id == booking_id
      and (switch (b.nurse_id) { case (?nid) Principal.equal(nid, nurse_id); case null false })
      and b.status == #accepted
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, {
          existing with
          visit_report = ?report;
          status = #completed;
          updated_at = Time.now();
        });
        #ok;
      };
      case null { #err("booking tidak ditemukan atau belum diterima") };
    };
  };

  public func cancelBooking(
    bookings : List.List<BookingTypes.Booking>,
    booking_id : Nat,
    caller : Principal,
  ) : { #ok; #err : Text } {
    switch (bookings.findIndex(func(b : BookingTypes.Booking) : Bool {
      b.id == booking_id
      and Principal.equal(b.patient_id, caller)
      and (b.status == #pending or b.status == #accepted)
    })) {
      case (?idx) {
        let existing = bookings.at(idx);
        bookings.put(idx, { existing with status = #cancelled; updated_at = Time.now() });
        #ok;
      };
      case null { #err("booking tidak ditemukan atau tidak bisa dibatalkan") };
    };
  };

  public func getAllBookings(
    bookings : List.List<BookingTypes.Booking>,
  ) : [BookingTypes.Booking] {
    bookings.toArray();
  };
}
