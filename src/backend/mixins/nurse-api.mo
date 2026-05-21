import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Common "../types/common";
import AuthTypes "../types/auth";
import NurseTypes "../types/nurse";

mixin (
  roles : Map.Map<Common.UserId, AuthTypes.UserRole>,
  nurse_profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
) {
  func haversineKm(lat1 : Float, lon1 : Float, lat2 : Float, lon2 : Float) : Float {
    let r = 6371.0;
    let dLat = (lat2 - lat1) * Float.pi / 180.0;
    let dLon = (lon2 - lon1) * Float.pi / 180.0;
    let a = Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0)
          + Float.cos(lat1 * Float.pi / 180.0) * Float.cos(lat2 * Float.pi / 180.0)
          * Float.sin(dLon / 2.0) * Float.sin(dLon / 2.0);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    r * c
  };

  public shared ({ caller }) func saveNurseProfile(
    name : Text,
    str_number : Text,
    specialization : Text,
    experience_years : Nat,
    str_document_url : Text,
    ktp_document_url : Text,
  ) : async NurseTypes.NurseProfile {
    if (roles.get(caller) != ?(#nurse)) {
      return { id = caller; name = ""; str_number = ""; specialization = "";
               experience_years = 0; str_document_url = ""; ktp_document_url = "";
               status = #pending_verification; current_lat = null; current_lng = null;
               last_location_update = null; created_at = 0 };
    };
    let now = Time.now();
    let profile : NurseTypes.NurseProfile = {
      id = caller;
      name = name;
      str_number = str_number;
      specialization = specialization;
      experience_years = experience_years;
      str_document_url = str_document_url;
      ktp_document_url = ktp_document_url;
      status = #pending_verification;
      current_lat = null;
      current_lng = null;
      last_location_update = null;
      created_at = now;
    };
    nurse_profiles.add(caller, profile);
    profile
  };

  public query ({ caller }) func getMyNurseProfile() : async ?NurseTypes.NurseProfile {
    nurse_profiles.get(caller)
  };

  public shared ({ caller }) func updateNurseLocation(lat : Float, lng : Float) : async () {
    if (roles.get(caller) != ?(#nurse)) { return };
    let now = Time.now();
    switch (nurse_profiles.get(caller)) {
      case (?np) {
        nurse_profiles.add(caller, { np with current_lat = ?lat; current_lng = ?lng; last_location_update = ?now });
      };
      case null {};
    };
  };

  public query ({ caller }) func getNearbyNurses(
    patient_lat : Float,
    patient_lng : Float,
  ) : async [NurseTypes.NurseProfile] {
    var result = List.empty<NurseTypes.NurseProfile>();
    for ((_, np) in nurse_profiles.entries()) {
      if (np.status == #verified) {
        switch (np.current_lat, np.current_lng) {
          case (?nLat, ?nLng) {
            if (haversineKm(patient_lat, patient_lng, nLat, nLng) <= 20.0) {
              result.add(np);
            };
          };
          case _ {};
        };
      };
    };
    result.toArray()
  };
}
