import { BookingStatus, NurseStatus } from "@/backend.d";
import { cn } from "@/lib/utils";
import { BOOKING_STATUS_LABELS, NURSE_STATUS_LABELS } from "@/types";

const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  [BookingStatus.pending]:
    "bg-secondary/20 text-secondary-foreground border-secondary/40",
  [BookingStatus.accepted]: "bg-primary/15 text-primary border-primary/30",
  [BookingStatus.in_progress]: "bg-chart-4/20 text-chart-4 border-chart-4/40",
  [BookingStatus.completed]: "bg-primary/20 text-primary border-primary/40",
  [BookingStatus.cancelled]: "bg-muted text-muted-foreground border-border",
  [BookingStatus.rejected]:
    "bg-destructive/15 text-destructive border-destructive/30",
};

const NURSE_STATUS_STYLES: Record<NurseStatus, string> = {
  [NurseStatus.pending_verification]:
    "bg-secondary/20 text-secondary-foreground border-secondary/40",
  [NurseStatus.verified]: "bg-primary/15 text-primary border-primary/30",
  [NurseStatus.rejected]:
    "bg-destructive/15 text-destructive border-destructive/30",
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

interface NurseStatusBadgeProps {
  status: NurseStatus;
  className?: string;
}

export function BookingStatusBadge({
  status,
  className,
}: BookingStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        BOOKING_STATUS_STYLES[status],
        className,
      )}
    >
      {BOOKING_STATUS_LABELS[status]}
    </span>
  );
}

export function NurseStatusBadge({ status, className }: NurseStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        NURSE_STATUS_STYLES[status],
        className,
      )}
    >
      {NURSE_STATUS_LABELS[status]}
    </span>
  );
}
