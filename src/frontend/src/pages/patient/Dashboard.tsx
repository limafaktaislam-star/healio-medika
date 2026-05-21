import { BookingStatus } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { EWalletWidget } from "@/components/patient/EWalletWidget";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import {
  useListServices,
  useMyBookings,
  useMyPatientProfile,
} from "@/hooks/useQueries";
import { SERVICE_CATEGORY_ICONS, SERVICE_CATEGORY_LABELS } from "@/types";
import { useRouter } from "@tanstack/react-router";
import {
  CalendarDays,
  ClipboardList,
  MapPin,
  Stethoscope,
  User,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`rounded-2xl p-5 flex items-center gap-4 border ${color}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-3xl font-display font-bold">{value}</div>
        <div className="text-base text-muted-foreground mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  const { principal } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyPatientProfile();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: services, isLoading: servicesLoading } = useListServices();
  const router = useRouter();

  const isLoading = profileLoading || bookingsLoading;

  const totalBookings = bookings?.length ?? 0;
  const activeBookings =
    bookings?.filter(
      (b) =>
        b.status === BookingStatus.pending ||
        b.status === BookingStatus.accepted ||
        b.status === BookingStatus.in_progress,
    ).length ?? 0;

  const recentBookings = [...(bookings ?? [])]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 3);

  const patientName =
    profile?.name ??
    (principal ? `${principal.toText().slice(0, 10)}...` : "Pasien");

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Memuat dashboard..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* E-Wallet Widget — top priority, especially on mobile */}
        <EWalletWidget />

        {/* Greeting */}
        <section
          className="bg-primary rounded-3xl px-7 py-8 text-primary-foreground shadow-lg"
          data-ocid="dashboard.greeting_section"
        >
          <div className="text-sm font-medium opacity-80 mb-1 uppercase tracking-widest">
            Selamat Datang
          </div>
          <h1 className="font-display text-3xl font-bold mb-1">
            {patientName}
          </h1>
          <p className="text-primary-foreground/75 text-base">
            Semoga Anda selalu sehat dan bahagia hari ini.
          </p>
          {!profile && (
            <button
              type="button"
              onClick={() => router.navigate({ to: "/patient/profile" })}
              className="mt-4 inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl transition-smooth border border-primary-foreground/30"
              data-ocid="dashboard.complete_profile_button"
            >
              <User size={16} /> Lengkapi Profil Saya
            </button>
          )}
        </section>

        {/* Stats */}
        <section data-ocid="dashboard.stats_section">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">
            Ringkasan Pesanan
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Total Pesanan"
              value={totalBookings}
              icon={<ClipboardList className="text-primary" size={28} />}
              color="bg-primary/8 border-primary/20"
            />
            <StatCard
              label="Pesanan Aktif"
              value={activeBookings}
              icon={<CalendarDays className="text-secondary" size={28} />}
              color="bg-secondary/10 border-secondary/20"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section data-ocid="dashboard.quick_actions_section">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => router.navigate({ to: "/patient/services" })}
              className="flex flex-col items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-smooth"
              data-ocid="dashboard.book_service_button"
            >
              <Stethoscope size={32} />
              <span>Pesan Layanan</span>
            </button>
            <button
              type="button"
              onClick={() => router.navigate({ to: "/patient/bookings" })}
              className="flex flex-col items-center gap-3 bg-card border-2 border-primary/30 text-primary rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-primary/5 transition-smooth"
              data-ocid="dashboard.view_bookings_button"
            >
              <ClipboardList size={32} />
              <span>Riwayat Pesanan</span>
            </button>
            <button
              type="button"
              onClick={() => router.navigate({ to: "/patient/profile" })}
              className="flex flex-col items-center gap-3 bg-card border-2 border-secondary/30 text-secondary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-secondary/5 transition-smooth"
              data-ocid="dashboard.edit_profile_button"
            >
              <User size={32} />
              <span>Edit Profil</span>
            </button>
          </div>
        </section>

        {/* Recent Bookings */}
        <section data-ocid="dashboard.recent_bookings_section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Pesanan Terbaru
            </h2>
            <button
              type="button"
              onClick={() => router.navigate({ to: "/patient/bookings" })}
              className="text-primary text-base font-medium hover:underline"
              data-ocid="dashboard.view_all_bookings_link"
            >
              Lihat Semua
            </button>
          </div>
          {recentBookings.length === 0 ? (
            <div
              className="bg-muted/40 rounded-2xl py-12 flex flex-col items-center gap-3 text-muted-foreground"
              data-ocid="dashboard.bookings_empty_state"
            >
              <CalendarDays size={40} className="opacity-40" />
              <p className="text-lg font-medium">Belum ada pesanan</p>
              <button
                type="button"
                onClick={() => router.navigate({ to: "/patient/services" })}
                className="mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-smooth"
                data-ocid="dashboard.book_now_button"
              >
                Pesan Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking, idx) => (
                <div
                  key={booking.id.toString()}
                  className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between gap-4"
                  data-ocid={`dashboard.recent_booking.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MapPin className="text-primary shrink-0" size={20} />
                    <div className="min-w-0">
                      <div className="font-semibold text-base text-foreground truncate">
                        Layanan #{booking.serviceId.toString()}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {booking.scheduledDate} · {booking.scheduledTime}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full border ${
                      booking.status === BookingStatus.pending
                        ? "bg-secondary/20 text-secondary-foreground border-secondary/40"
                        : booking.status === BookingStatus.accepted
                          ? "bg-primary/15 text-primary border-primary/30"
                          : booking.status === BookingStatus.completed
                            ? "bg-primary/20 text-primary border-primary/40"
                            : booking.status === BookingStatus.cancelled
                              ? "bg-muted text-muted-foreground border-border"
                              : booking.status === BookingStatus.rejected
                                ? "bg-destructive/15 text-destructive border-destructive/30"
                                : "bg-chart-4/20 text-chart-4 border-chart-4/40"
                    }`}
                  >
                    {booking.status === BookingStatus.pending
                      ? "Menunggu"
                      : booking.status === BookingStatus.accepted
                        ? "Diterima"
                        : booking.status === BookingStatus.in_progress
                          ? "Berlangsung"
                          : booking.status === BookingStatus.completed
                            ? "Selesai"
                            : booking.status === BookingStatus.cancelled
                              ? "Dibatalkan"
                              : "Ditolak"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Services Overview */}
        {!servicesLoading && services && services.length > 0 && (
          <section data-ocid="dashboard.services_overview_section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Layanan Tersedia
              </h2>
              <button
                type="button"
                onClick={() => router.navigate({ to: "/patient/services" })}
                className="text-primary text-base font-medium hover:underline"
                data-ocid="dashboard.view_all_services_link"
              >
                Lihat Semua
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.slice(0, 6).map((service) => (
                <button
                  key={service.id.toString()}
                  type="button"
                  onClick={() => router.navigate({ to: "/patient/services" })}
                  className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-smooth text-center"
                  data-ocid={`dashboard.service_card.${service.id.toString()}`}
                >
                  <span className="text-3xl">
                    {SERVICE_CATEGORY_ICONS[service.category]}
                  </span>
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {service.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {SERVICE_CATEGORY_LABELS[service.category]}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
