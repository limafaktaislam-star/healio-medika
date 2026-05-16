import Common "common";

module {
  public type Service = {
    id : Common.ServiceId;
    name : Text;
    description : Text;
    category : Common.ServiceCategory;
    base_fee : Nat;
    ambulans_type : ?Common.AmbulansType;
    is_active : Bool;
    created_at : Common.Timestamp;
  };
}
