import Principal "mo:core/Principal";

module {
  public type BookingStatus = {
    #pending; #accepted; #in_progress; #completed; #cancelled; #rejected
  };

  public type Booking = {
    id : Nat;
    patient_id : Principal;
    nurse_id : ?Principal;
    service_id : Nat;
    booking_date : Text;
    booking_time : Text;
    patient_lat : Float;
    patient_lng : Float;
    notes : Text;
    status : BookingStatus;
    distance_km : ?Float;
    base_fee : Nat;
    transport_fee : Nat;
    night_surcharge : Nat;
    holiday_surcharge : Nat;
    total_fee : Nat;
    visit_report : ?Text;
    created_at : Int;
    updated_at : Int;
  };

  public type CreateBookingRequest = {
    service_id : Nat;
    booking_date : Text;
    booking_time : Text;
    patient_lat : Float;
    patient_lng : Float;
    notes : Text;
    distance_km : ?Float;
  };
}
