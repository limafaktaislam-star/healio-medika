import Common "common";

module {
  public type NurseProfile = {
    id : Common.UserId;
    name : Text;
    str_number : Text;
    specialization : Text;
    experience_years : Nat;
    str_document_url : Text;
    ktp_document_url : Text;
    status : Common.NurseStatus;
    current_lat : ?Float;
    current_lng : ?Float;
    last_location_update : ?Common.Timestamp;
    created_at : Common.Timestamp;
  };
}
