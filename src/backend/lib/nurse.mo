import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import NurseTypes "../types/nurse";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public func registerProfile(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
    caller : Common.UserId,
    name : Text,
    str_number : Text,
    specialization : Text,
    experience_years : Nat,
    str_document_url : Text,
    ktp_document_url : Text,
  ) : NurseTypes.NurseProfile {
    let profile : NurseTypes.NurseProfile = {
      id = caller;
      name;
      str_number;
      specialization;
      experience_years;
      str_document_url;
      ktp_document_url;
      status = #pending_verification;
      current_lat = null;
      current_lng = null;
      last_location_update = null;
      created_at = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
    user : Common.UserId,
  ) : ?NurseTypes.NurseProfile {
    profiles.get(user);
  };

  public func updateLocation(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
    caller : Common.UserId,
    lat : Float,
    lng : Float,
  ) : () {
    switch (profiles.get(caller)) {
      case (?p) {
        profiles.add(caller, { p with current_lat = ?lat; current_lng = ?lng; last_location_update = ?Time.now() });
      };
      case null {};
    };
  };

  public func setVerificationStatus(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
    nurse_id : Common.UserId,
    status : Common.NurseStatus,
  ) : () {
    switch (profiles.get(nurse_id)) {
      case (?p) {
        profiles.add(nurse_id, { p with status });
      };
      case null {};
    };
  };

  public func getPendingVerification(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
  ) : [NurseTypes.NurseProfile] {
    profiles.values().filter(func(p) { p.status == #pending_verification }).toArray();
  };

  public func getNearby(
    profiles : Map.Map<Common.UserId, NurseTypes.NurseProfile>,
    patient_lat : Float,
    patient_lng : Float,
    radius_km : Float,
  ) : [NurseTypes.NurseProfile] {
    profiles.values().filter(func(p) {
      p.status == #verified and
      (switch (p.current_lat, p.current_lng) {
        case (?nlat, ?nlng) {
          let dlat = nlat - patient_lat;
          let dlng = nlng - patient_lng;
          let dist = Float.sqrt(dlat * dlat + dlng * dlng) * 111.0;
          dist <= radius_km;
        };
        case (_) { false };
      })
    }).toArray();
  };
}
