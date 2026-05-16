module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type BookingId = Nat;
  public type ServiceId = Nat;

  public type Coordinates = {
    lat : Float;
    lng : Float;
  };

  public type BookingStatus = {
    #pending;
    #accepted;
    #in_progress;
    #completed;
    #cancelled;
  };

  public type ServiceCategory = {
    #perawatan_lansia;
    #perawatan_luka;
    #pasca_operasi;
    #fisioterapi;
    #ambulans;
  };

  public type AmbulansType = {
    #transport;
    #gawat_darurat;
    #jenazah;
  };

  public type NurseStatus = {
    #pending_verification;
    #verified;
    #rejected;
  };
}
