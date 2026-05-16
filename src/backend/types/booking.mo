import Common "common";

module {
  public type Booking = {
    id : Common.BookingId;
    patient_id : Common.UserId;
    nurse_id : ?Common.UserId;
    service_id : Common.ServiceId;
    booking_date : Text;
    booking_time : Text;
    patient_lat : Float;
    patient_lng : Float;
    notes : Text;
    status : Common.BookingStatus;
    distance_km : ?Float;
    base_fee : Nat;
    transport_fee : Nat;
    night_surcharge : Nat;
    holiday_surcharge : Nat;
    total_fee : Nat;
    visit_report : ?Text;
    created_at : Common.Timestamp;
    updated_at : Common.Timestamp;
  };

  public type CreateBookingRequest = {
    service_id : Common.ServiceId;
    booking_date : Text;
    booking_time : Text;
    patient_lat : Float;
    patient_lng : Float;
    notes : Text;
    distance_km : ?Float;
  };
}
