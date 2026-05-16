var BookingStatus = /* @__PURE__ */ ((BookingStatus2) => {
  BookingStatus2["cancelled"] = "cancelled";
  BookingStatus2["pending"] = "pending";
  BookingStatus2["in_progress"] = "in_progress";
  BookingStatus2["completed"] = "completed";
  BookingStatus2["rejected"] = "rejected";
  BookingStatus2["accepted"] = "accepted";
  return BookingStatus2;
})(BookingStatus || {});
var NurseStatus = /* @__PURE__ */ ((NurseStatus2) => {
  NurseStatus2["verified"] = "verified";
  NurseStatus2["pending_verification"] = "pending_verification";
  NurseStatus2["rejected"] = "rejected";
  return NurseStatus2;
})(NurseStatus || {});
export {
  BookingStatus as B,
  NurseStatus as N
};
