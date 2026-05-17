import { j as jsxRuntimeExports, e as cn } from "./index-BxBE-1lv.js";
import { B as BookingStatus, N as NurseStatus } from "./backend.d-DmUMkdSC.js";
import { B as BOOKING_STATUS_LABELS, N as NURSE_STATUS_LABELS } from "./types-Bf0oF2PP.js";
const BOOKING_STATUS_STYLES = {
  [BookingStatus.pending]: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  [BookingStatus.accepted]: "bg-primary/15 text-primary border-primary/30",
  [BookingStatus.in_progress]: "bg-chart-4/20 text-chart-4 border-chart-4/40",
  [BookingStatus.completed]: "bg-primary/20 text-primary border-primary/40",
  [BookingStatus.cancelled]: "bg-muted text-muted-foreground border-border",
  [BookingStatus.rejected]: "bg-destructive/15 text-destructive border-destructive/30"
};
const NURSE_STATUS_STYLES = {
  [NurseStatus.pending_verification]: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  [NurseStatus.verified]: "bg-primary/15 text-primary border-primary/30",
  [NurseStatus.rejected]: "bg-destructive/15 text-destructive border-destructive/30"
};
function BookingStatusBadge({
  status,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        BOOKING_STATUS_STYLES[status],
        className
      ),
      children: BOOKING_STATUS_LABELS[status]
    }
  );
}
function NurseStatusBadge({ status, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        NURSE_STATUS_STYLES[status],
        className
      ),
      children: NURSE_STATUS_LABELS[status]
    }
  );
}
export {
  BookingStatusBadge as B,
  NurseStatusBadge as N
};
