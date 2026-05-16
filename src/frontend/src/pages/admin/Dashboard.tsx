import { type BookingStats, type NurseProfile, createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle,
  ClipboardList,
  Clock,
  DollarSign,
  Settings,
  Users,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { actor, isFetching } = useActor(createActor);

  const { data: stats, isLoading: statsLoading } =
    useQuery<BookingStats | null>({
      queryKey: ["admin", "bookingStats"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getBookingStats();
      },
      enabled: !!actor && !isFetching,
    });

  const { data: pendingNurses, isLoading: nursesLoading } = useQuery<
    NurseProfile[]
  >({
    queryKey: ["admin", "pendingNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNurses();
    },
    enabled: !!actor && !isFetching,
  });
  const isLoading = statsLoading || nursesLoading;

  const statCards = [
    {
      label: "Total Pesanan",
      value: stats ? Number(stats.total) : 0,
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Menunggu Konfirmasi",
      value: stats ? Number(stats.pending) : 0,
      icon: Clock,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Pesanan Aktif",
      value: stats ? Number(stats.accepted) + Number(stats.in_progress) : 0,
      icon: Activity,
      color: "text-secondary-foreground",
      bg: "bg-secondary",
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      icon: CheckCircle,
      color: "text-primary",
      bg: "bg-accent",
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) + Number(stats.rejected) : 0,
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Perawat Menunggu Verifikasi",
      value: pendingNurses?.length ?? 0,
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  const navCards = [
    {
      to: "/admin/nurses",
      label: "Verifikasi Perawat",
      desc: "Review & setujui dokumen tenaga medis baru",
      icon: Users,
      color: "border-l-primary",
    },
    {
      to: "/admin/bookings",
      label: "Kelola Pesanan",
      desc: "Pantau semua pesanan layanan homecare",
      icon: ClipboardList,
      color: "border-l-secondary",
    },
    {
      to: "/admin/services",
      label: "Katalog Layanan",
      desc: "Tambah, edit, dan kelola layanan tersedia",
      icon: Settings,
      color: "border-l-accent",
    },
    {
      to: "/admin/pricing",
      label: "Pengaturan Harga",
      desc: "Atur tarif dasar, per-km, dan surcharge",
      icon: DollarSign,
      color: "border-l-primary",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 p-6" data-ocid="admin.dashboard.page">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Selamat datang di panel kontrol HEALIO MEDIKA
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {statCards.map((s) => (
            <Card
              key={s.label}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6 pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${s.bg}`}>
                    <s.icon className={`w-7 h-7 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Menu Utama
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {navCards.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                data-ocid={`admin.nav.${n.label.toLowerCase().replace(/ /g, "_")}`}
              >
                <Card
                  className={`border-l-4 ${n.color} hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5`}
                >
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-4">
                      <n.icon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {n.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {n.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
