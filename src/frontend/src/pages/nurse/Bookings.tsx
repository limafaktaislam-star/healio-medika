import { BookingStatus, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

function formatRp(amount: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

export default function NurseBookings() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const accept = useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.acceptBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incomingBookings"] }),
  });

  const reject = useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.rejectBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incomingBookings"] }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  const pendingBookings =
    bookings?.filter((b) => b.status === BookingStatus.pending) ?? [];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-foreground mb-2">Pesanan Masuk</h1>
      <p className="text-muted-foreground text-lg mb-8">
        {pendingBookings.length} pesanan menunggu konfirmasi
      </p>

      {pendingBookings.length === 0 ? (
        <Card data-ocid="nurse.bookings.empty_state">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-xl text-muted-foreground">
              Tidak ada pesanan masuk saat ini
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingBookings.map((booking, idx) => (
            <Card
              key={String(booking.id)}
              data-ocid={`nurse.bookings.item.${idx + 1}`}
            >
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
                <div>
                  <p className="text-sm text-muted-foreground">ID Layanan</p>
                  <p className="text-base font-semibold text-foreground">
                    Layanan #{String(booking.serviceId)}
                  </p>
                </div>
                {booking.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Catatan Pasien
                    </p>
                    <p className="text-base text-foreground bg-muted/40 rounded-lg p-3">
                      {booking.notes}
                    </p>
                  </div>
                )}
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    Estimasi Biaya
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {formatRp(booking.estimatedFeeIdr)}
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    size="lg"
                    className="flex-1 text-base"
                    onClick={() => accept.mutate(booking.id)}
                    disabled={accept.isPending || reject.isPending}
                    data-ocid={`nurse.bookings.accept_button.${idx + 1}`}
                  >
                    {accept.isPending ? (
                      <LoadingSpinner />
                    ) : (
                      "✅ Terima Pesanan"
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    className="flex-1 text-base"
                    onClick={() => reject.mutate(booking.id)}
                    disabled={accept.isPending || reject.isPending}
                    data-ocid={`nurse.bookings.reject_button.${idx + 1}`}
                  >
                    {reject.isPending ? <LoadingSpinner /> : "❌ Tolak"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
