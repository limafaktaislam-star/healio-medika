import {
  type Booking,
  type BookingStats,
  BookingStatus,
  createActor,
} from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList } from "lucide-react";
import { useState } from "react";

function formatRupiah(amount: bigint | undefined): string {
  if (!amount) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

const STATUS_OPTIONS = [
  { value: "all", label: "Semua Status" },
  { value: "pending", label: "Menunggu" },
  { value: "accepted", label: "Diterima" },
  { value: "in_progress", label: "Sedang Berjalan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
  { value: "rejected", label: "Ditolak" },
];

export default function AdminBookings() {
  const [filterStatus, setFilterStatus] = useState("all");
  const { actor, isFetching } = useActor(createActor);

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<
    Booking[]
  >({
    queryKey: ["admin", "allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: stats } = useQuery<BookingStats | null>({
    queryKey: ["admin", "bookingStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookingStats();
    },
    enabled: !!actor && !isFetching,
  });

  const filtered =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => (b.status as string) === filterStatus);

  const statBar = [
    {
      label: "Total",
      value: stats ? Number(stats.total) : 0,
      color: "text-foreground",
    },
    {
      label: "Menunggu",
      value: stats ? Number(stats.pending) : 0,
      color: "text-yellow-600",
    },
    {
      label: "Diterima",
      value: stats ? Number(stats.accepted) : 0,
      color: "text-blue-600",
    },
    {
      label: "Berjalan",
      value: stats ? Number(stats.in_progress) : 0,
      color: "text-indigo-600",
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      color: "text-green-600",
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) : 0,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6 p-6" data-ocid="admin.bookings.page">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-display">
          Kelola Pesanan
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Monitor semua pesanan layanan homecare
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {statBar.map((s) => (
          <Card key={s.label} className="text-center shadow-sm">
            <CardContent className="py-4">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label
          htmlFor="bookings-status-filter"
          className="text-sm font-medium text-foreground"
        >
          Filter Status:
        </label>
        <select
          id="bookings-status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-input rounded-lg px-3 py-2 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          data-ocid="admin.bookings.status_filter"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} pesanan ditemukan
        </span>
      </div>

      {bookingsLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent
            className="py-16 text-center"
            data-ocid="admin.bookings.empty_state"
          >
            <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Tidak ada pesanan ditemukan
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  ID Pesanan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  ID Layanan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Tanggal
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Jam
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Est. Biaya
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((booking, i) => (
                <tr
                  key={booking.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.bookings.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    #{booking.id.toString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {booking.serviceId.toString()}
                  </td>
                  <td className="px-4 py-3">{booking.scheduledDate}</td>
                  <td className="px-4 py-3">{booking.scheduledTime}</td>
                  <td className="px-4 py-3">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatRupiah(booking.estimatedFeeIdr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
