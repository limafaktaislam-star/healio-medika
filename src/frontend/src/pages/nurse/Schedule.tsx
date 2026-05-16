import { type Booking, BookingStatus, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";

function formatRp(amount: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

function ScheduleCard({
  booking,
  idx,
  reportBookingId,
  reportText,
  setReportBookingId,
  setReportText,
  onSubmitReport,
  isSubmitting,
  prefix,
}: {
  booking: Booking;
  idx: number;
  reportBookingId: bigint | null;
  reportText: string;
  setReportBookingId: (id: bigint | null) => void;
  setReportText: (t: string) => void;
  onSubmitReport: (id: bigint, text: string) => void;
  isSubmitting: boolean;
  prefix: string;
}) {
  const isOpen = reportBookingId === booking.id;
  const isAccepted =
    booking.status === BookingStatus.accepted ||
    booking.status === BookingStatus.in_progress;
  return (
    <Card data-ocid={`nurse.schedule.${prefix}.item.${idx + 1}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">
            Pesanan #{String(booking.id)}
          </CardTitle>
          <BookingStatusBadge status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Tanggal</p>
            <p className="text-base font-semibold text-foreground">
              {booking.scheduledDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Waktu</p>
            <p className="text-base font-semibold text-foreground">
              {booking.scheduledTime}
            </p>
          </div>
        </div>
        {booking.notes && (
          <div>
            <p className="text-sm text-muted-foreground">Catatan</p>
            <p className="text-base text-foreground">{booking.notes}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">Estimasi Biaya</p>
          <p className="text-base font-bold text-primary">
            {formatRp(booking.estimatedFeeIdr)}
          </p>
        </div>
        {booking.visitReport && (
          <div className="bg-muted/40 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">
              Laporan Kunjungan
            </p>
            <p className="text-base text-foreground">{booking.visitReport}</p>
          </div>
        )}
        {isAccepted &&
          !booking.visitReport &&
          (!isOpen ? (
            <Button
              size="lg"
              variant="outline"
              className="w-full text-base"
              onClick={() => setReportBookingId(booking.id)}
              data-ocid={`nurse.schedule.report_button.${idx + 1}`}
            >
              📝 Kirim Laporan Kunjungan
            </Button>
          ) : (
            <div className="space-y-3 border border-border rounded-lg p-4">
              <p className="text-base font-semibold text-foreground">
                Laporan Kunjungan
              </p>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={4}
                placeholder="Tuliskan kondisi pasien, tindakan yang dilakukan, dan rekomendasi tindak lanjut..."
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                data-ocid={`nurse.schedule.report_textarea.${idx + 1}`}
              />
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 text-base"
                  onClick={() => onSubmitReport(booking.id, reportText)}
                  disabled={!reportText.trim() || isSubmitting}
                  data-ocid={`nurse.schedule.report_submit.${idx + 1}`}
                >
                  {isSubmitting ? <LoadingSpinner /> : "Kirim Laporan"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setReportBookingId(null);
                    setReportText("");
                  }}
                  data-ocid={`nurse.schedule.report_cancel.${idx + 1}`}
                >
                  Batal
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export default function NurseSchedule() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const [gpsActive, setGpsActive] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [reportBookingId, setReportBookingId] = useState<bigint | null>(null);
  const [reportText, setReportText] = useState("");

  const { data: schedule, isLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching,
  });

  const reportMutation = useMutation({
    mutationFn: ({ id, text }: { id: bigint; text: string }) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.submitVisitReport(id, text);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurseSchedule"] });
      setReportBookingId(null);
      setReportText("");
    },
  });

  function startGps() {
    if (!navigator.geolocation) {
      setGpsError("Perangkat tidak mendukung GPS.");
      return;
    }
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          actor
            ?.updateNurseLocation(pos.coords.latitude, pos.coords.longitude)
            .catch(console.error);
        },
        () => setGpsError("Gagal mendapatkan lokasi."),
      );
    };
    sendLocation();
    intervalRef.current = setInterval(sendLocation, 5000);
    setGpsActive(true);
    setGpsError("");
  }

  function stopGps() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGpsActive(false);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );

  const today = new Date().toISOString().split("T")[0];
  const todaySchedule =
    schedule?.filter((b) => b.scheduledDate === today) ?? [];
  const otherSchedule =
    schedule?.filter((b) => b.scheduledDate !== today) ?? [];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Jadwal Kunjungan
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            {schedule?.length ?? 0} total kunjungan
          </p>
        </div>
        <Button
          size="lg"
          variant={gpsActive ? "destructive" : "outline"}
          onClick={gpsActive ? stopGps : startGps}
          className="text-base"
          data-ocid="nurse.schedule.gps_toggle"
        >
          {gpsActive ? "🔴 Matikan GPS" : "📍 Aktifkan GPS"}
        </Button>
      </div>

      {gpsActive && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-base font-medium">
            ✅ GPS aktif — lokasi Anda diperbarui setiap 5 detik
          </p>
        </div>
      )}
      {gpsError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <p className="text-destructive text-base">{gpsError}</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          📅 Jadwal Hari Ini ({today})
        </h2>
        {todaySchedule.length === 0 ? (
          <Card data-ocid="nurse.schedule.today_empty_state">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground text-lg">
                Tidak ada jadwal hari ini
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {todaySchedule.map((booking, idx) => (
              <ScheduleCard
                key={String(booking.id)}
                booking={booking}
                idx={idx}
                reportBookingId={reportBookingId}
                reportText={reportText}
                setReportBookingId={setReportBookingId}
                setReportText={setReportText}
                onSubmitReport={(id, text) =>
                  reportMutation.mutate({ id, text })
                }
                isSubmitting={reportMutation.isPending}
                prefix="today"
              />
            ))}
          </div>
        )}
      </div>

      {otherSchedule.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📋 Jadwal Mendatang
          </h2>
          <div className="space-y-4">
            {otherSchedule.map((booking, idx) => (
              <ScheduleCard
                key={String(booking.id)}
                booking={booking}
                idx={idx}
                reportBookingId={reportBookingId}
                reportText={reportText}
                setReportBookingId={setReportBookingId}
                setReportText={setReportText}
                onSubmitReport={(id, text) =>
                  reportMutation.mutate({ id, text })
                }
                isSubmitting={reportMutation.isPending}
                prefix="other"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
