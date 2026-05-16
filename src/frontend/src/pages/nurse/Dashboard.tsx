import { NurseStatus, createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NurseStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React from "react";

export default function NurseDashboard() {
  const { actor, isFetching } = useActor(createActor);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: incomingBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching,
  });

  const today = new Date().toISOString().split("T")[0];
  const todayCount =
    schedule?.filter((b) => b.scheduledDate === today).length ?? 0;
  const pendingCount =
    incomingBookings?.filter((b) => b.status === "pending").length ?? 0;

  if (profileLoading || bookingsLoading || scheduleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="text-5xl mb-4">🏥</div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Belum Terdaftar
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Anda belum mendaftarkan diri sebagai tenaga medis.
        </p>
        <Link to="/nurse/register">
          <Button
            size="lg"
            className="text-lg px-8"
            data-ocid="nurse.dashboard.register_button"
          >
            Daftar Sekarang
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Selamat Datang
            </h1>
            <p className="text-xl text-muted-foreground mt-1">{profile.name}</p>
          </div>
          <NurseStatusBadge status={profile.status} />
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Status Verifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.status === NurseStatus.pending_verification && (
              <p className="text-base text-muted-foreground">
                📋 Dokumen Anda sedang ditinjau oleh admin. Proses verifikasi
                memakan waktu 1-2 hari kerja.
              </p>
            )}
            {profile.status === NurseStatus.verified && (
              <p className="text-base text-green-700">
                ✅ Akun Anda telah terverifikasi. Anda dapat menerima pesanan.
              </p>
            )}
            {profile.status === NurseStatus.rejected && (
              <p className="text-base text-destructive">
                ❌ Verifikasi ditolak. Harap perbarui dokumen Anda dan hubungi
                admin.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card data-ocid="nurse.dashboard.pending_count">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-5xl font-bold text-primary">{pendingCount}</p>
              <p className="text-base text-muted-foreground mt-2">
                Pesanan Masuk
              </p>
            </CardContent>
          </Card>
          <Card data-ocid="nurse.dashboard.today_count">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-5xl font-bold text-primary">{todayCount}</p>
              <p className="text-base text-muted-foreground mt-2">
                Jadwal Hari Ini
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Link to="/nurse/bookings" className="block">
            <Button
              size="lg"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.bookings_link"
            >
              <span>📥</span> Pesanan Masuk
              {pendingCount > 0 && (
                <span className="ml-auto bg-white/20 text-white rounded-full px-2 py-0.5 text-sm font-bold">
                  {pendingCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/nurse/schedule" className="block">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.schedule_link"
            >
              <span>📅</span> Jadwal Harian
            </Button>
          </Link>
          <Link to="/nurse/profile" className="block">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.profile_link"
            >
              <span>👤</span> Edit Profil
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
