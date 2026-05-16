import { BookingStatus } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import {
  useCancelBooking,
  useListServices,
  useMyBookings,
} from "@/hooks/useQueries";
import type { Booking } from "@/types";
import { CalendarDays, Clock, FileText, MapPin, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatRupiah(value: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

const STATUS_FILTERS = [
  { value: "all", label: "Semua" },
  { value: BookingStatus.pending, label: "Menunggu" },
  { value: BookingStatus.accepted, label: "Diterima" },
  { value: BookingStatus.in_progress, label: "Berlangsung" },
  { value: BookingStatus.completed, label: "Selesai" },
  { value: BookingStatus.cancelled, label: "Dibatalkan" },
  { value: BookingStatus.rejected, label: "Ditolak" },
];

interface CancelDialogProps {
  booking: Booking;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function CancelDialog({
  booking,
  onConfirm,
  onCancel,
  isPending,
}: CancelDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="cancel.dialog"
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        role="button"
        tabIndex={0}
        aria-label="Batalkan"
      />
      <div className="relative bg-card rounded-3xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-5">
        <div className="text-center">
          <div className="text-5xl mb-3">⚠️</div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Batalkan Pesanan?
          </h2>
          <p className="text-muted-foreground text-base mt-2">
            Pesanan layanan pada <strong>{booking.scheduledDate}</strong> pukul{" "}
            <strong>{booking.scheduledTime}</strong> akan dibatalkan.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-2xl border-2 border-border text-base font-semibold text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="cancel.cancel_button"
          >
            Tidak
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 py-3.5 rounded-2xl bg-destructive text-destructive-foreground text-base font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth"
            data-ocid="cancel.confirm_button"
          >
            {isPending ? "Memproses..." : "Ya, Batalkan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PatientBookings() {
  const { data: bookings, isLoading } = useMyBookings();
  const { data: services } = useListServices();
  const cancelBooking = useCancelBooking();
  const [filter, setFilter] = useState<string>("all");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);

  const serviceMap = new Map(
    services?.map((s) => [s.id.toString(), s.name]) ?? [],
  );

  const sorted = [...(bookings ?? [])].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
  const filtered =
    filter === "all" ? sorted : sorted.filter((b) => b.status === filter);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      await cancelBooking.mutateAsync(cancelTarget.id);
      toast.success("Pesanan berhasil dibatalkan.");
    } catch {
      toast.error("Gagal membatalkan pesanan.");
    } finally {
      setCancelTarget(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Riwayat Pesanan
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Semua pesanan layanan Anda
          </p>
        </div>

        {/* Status Filter */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-6"
          data-ocid="bookings.filter_tabs"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-smooth border ${
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
              data-ocid={`bookings.filter.${f.value}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        {isLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="bookings.loading_state"
          >
            <LoadingSpinner size="lg" label="Memuat pesanan..." />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 bg-muted/30 rounded-3xl"
            data-ocid="bookings.empty_state"
          >
            <CalendarDays
              size={48}
              className="mx-auto text-muted-foreground/40 mb-4"
            />
            <p className="text-xl font-semibold text-foreground">
              Tidak ada pesanan
            </p>
            <p className="text-muted-foreground mt-2 text-base">
              Pesanan Anda akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="bookings.list">
            {filtered.map((booking, idx) => (
              <div
                key={booking.id.toString()}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-smooth"
                data-ocid={`bookings.item.${idx + 1}`}
              >
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold text-foreground">
                      {serviceMap.get(booking.serviceId.toString()) ??
                        `Layanan #${booking.serviceId}`}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      Pesanan #{booking.id.toString()}
                    </div>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>

                {/* Card Body */}
                <div className="px-6 py-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-base text-foreground">
                    <CalendarDays size={18} className="text-primary shrink-0" />
                    <span>{booking.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-foreground">
                    <Clock size={18} className="text-primary shrink-0" />
                    <span>{booking.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-foreground col-span-2">
                    <MapPin size={18} className="text-primary shrink-0" />
                    <span className="truncate text-sm">
                      {booking.latitude.toFixed(4)},{" "}
                      {booking.longitude.toFixed(4)}
                    </span>
                  </div>
                  {booking.nursePrincipal && (
                    <div className="flex items-center gap-2 text-base text-foreground col-span-2">
                      <span className="text-base">👩‍⚕️</span>
                      <span className="text-sm truncate">
                        {booking.nursePrincipal.toText().slice(0, 20)}...
                      </span>
                    </div>
                  )}
                  {booking.notes && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground col-span-2">
                      <FileText
                        size={16}
                        className="text-muted-foreground shrink-0 mt-0.5"
                      />
                      <span className="line-clamp-2">{booking.notes}</span>
                    </div>
                  )}
                  {booking.visitReport && (
                    <div className="col-span-2 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3">
                      <div className="text-xs font-semibold text-primary mb-1">
                        Laporan Kunjungan
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {booking.visitReport}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Estimasi Biaya
                    </div>
                    <div className="font-display text-xl font-bold text-primary">
                      {formatRupiah(booking.estimatedFeeIdr)}
                    </div>
                  </div>
                  {booking.status === BookingStatus.pending && (
                    <button
                      type="button"
                      onClick={() => setCancelTarget(booking)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/30 text-base font-semibold hover:bg-destructive/20 transition-smooth"
                      data-ocid={`bookings.cancel_button.${idx + 1}`}
                    >
                      <X size={16} /> Batalkan Pesanan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cancelTarget && (
        <CancelDialog
          booking={cancelTarget}
          onConfirm={handleCancel}
          onCancel={() => setCancelTarget(null)}
          isPending={cancelBooking.isPending}
        />
      )}
    </Layout>
  );
}
