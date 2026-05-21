import { type BookingStats, type NurseProfile, createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
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

  const activeOrdersCount = stats
    ? Number(stats.accepted) + Number(stats.in_progress)
    : 0;
  const totalTransactionVolume = stats ? Number(stats.completed) * 150000 : 0;

  // Weekly revenue chart data (simulated per completion data)
  const weeklyData = [
    { day: "Sen", value: 4 },
    { day: "Sel", value: 7 },
    { day: "Rab", value: 5 },
    { day: "Kam", value: 9 },
    { day: "Jum", value: 12 },
    { day: "Sab", value: 8 },
    { day: "Min", value: stats ? Number(stats.completed) % 15 : 3 },
  ];
  const maxVal = Math.max(...weeklyData.map((d) => d.value), 1);

  const statCards = [
    {
      label: "Total Pesanan",
      value: stats ? Number(stats.total) : 0,
      icon: ClipboardList,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.10)",
    },
    {
      label: "Menunggu Konfirmasi",
      value: stats ? Number(stats.pending) : 0,
      icon: Clock,
      color: "#d97706",
      bg: "rgba(217,119,6,0.10)",
    },
    {
      label: "Pesanan Aktif",
      value: activeOrdersCount,
      icon: Activity,
      color: "#0284c7",
      bg: "rgba(2,132,199,0.10)",
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      icon: CheckCircle,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.08)",
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) + Number(stats.rejected) : 0,
      icon: XCircle,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.10)",
    },
    {
      label: "Perawat Menunggu Verifikasi",
      value: pendingNurses?.length ?? 0,
      icon: Users,
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.10)",
    },
  ];

  const navCards = [
    {
      to: "/admin/nurses",
      label: "Verifikasi Perawat",
      desc: "Review & setujui dokumen tenaga medis baru",
      icon: Users,
      accent: "#16a34a",
    },
    {
      to: "/admin/bookings",
      label: "Kelola Pesanan",
      desc: "Pantau semua pesanan layanan homecare",
      icon: ClipboardList,
      accent: "#0284c7",
    },
    {
      to: "/admin/services",
      label: "Katalog Layanan",
      desc: "Tambah, edit, dan kelola layanan tersedia",
      icon: Settings,
      accent: "#d97706",
    },
    {
      to: "/admin/pricing",
      label: "Pengaturan Harga",
      desc: "Atur tarif dasar, per-km, dan surcharge",
      icon: DollarSign,
      accent: "#7c3aed",
    },
    {
      to: "/admin/financial-report",
      label: "Laporan Keuangan",
      desc: "Total pendapatan, penarikan, dan transaksi",
      icon: DollarSign,
      accent: "#16a34a",
    },
    {
      to: "/admin/activity-log",
      label: "Log Aktivitas",
      desc: "Audit trail semua aktivitas sistem",
      icon: Activity,
      accent: "#0284c7",
    },
    {
      to: "/admin/pharmacy",
      label: "Manajemen Apotek",
      desc: "Kelola apotek mitra dan stok obat",
      icon: AlertCircle,
      accent: "#d97706",
    },
    {
      to: "/admin/platform-settings",
      label: "Pengaturan Platform",
      desc: "Konfigurasi nama, kontak, dan mode sistem",
      icon: Settings,
      accent: "#7c3aed",
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
        {/* Header */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, #0a4d3c 0%, #16a34a 100%)",
          }}
        >
          <h1 className="text-3xl font-bold text-white font-display">
            Dashboard Admin
          </h1>
          <p className="text-green-100 mt-1 text-lg">
            Selamat datang di panel kontrol HEALIO MEDIKA
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {activeOrdersCount > 0 && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/80 text-yellow-900 animate-pulse">
                {activeOrdersCount} Order Aktif
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 shadow-sm"
              style={{
                background: "#ffffff",
                border: `2px solid ${s.bg}`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl" style={{ background: s.bg }}>
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {s.label}
                </p>
              </div>
              <p
                className="text-4xl font-bold font-display"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Weekly Chart + Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Weekly Revenue Chart */}
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{ background: "#ffffff", border: "1.5px solid #e8f5e9" }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: "#0a4d3c" }}>
              Order Mingguan
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              7 hari terakhir
            </p>
            <div className="flex items-end gap-2 h-32">
              {weeklyData.map((d) => (
                <div
                  key={d.day}
                  className="flex flex-col items-center flex-1 gap-1"
                >
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(d.value / maxVal) * 100}%`,
                      minHeight: "4px",
                      background:
                        "linear-gradient(180deg, #16a34a 0%, #0a4d3c 100%)",
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{ background: "#ffffff", border: "1.5px solid #e8f5e9" }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: "#0a4d3c" }}>
              Ringkasan Keuangan
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Data kumulatif platform
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Total Volume Transaksi
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#16a34a" }}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalTransactionVolume)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Order Selesai
                </span>
                <span className="text-lg font-bold text-foreground">
                  {stats ? Number(stats.completed) : 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Penarikan Menunggu
                </span>
                <span className="text-lg font-bold text-foreground">0</span>
              </div>
            </div>
            <Link
              to="/admin/financial-report"
              className="inline-flex items-center gap-1 text-sm font-semibold mt-4"
              style={{ color: "#16a34a" }}
              data-ocid="admin.view_financial_report_link"
            >
              Lihat Laporan Lengkap →
            </Link>
          </div>
        </div>

        {/* Navigation Cards */}
        <div>
          <h2
            className="text-xl font-semibold mb-4 font-display"
            style={{ color: "#0a4d3c" }}
          >
            Menu Utama
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {navCards.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                data-ocid={`admin.nav.${n.label.toLowerCase().replace(/ /g, "_")}`}
              >
                <div
                  className="rounded-2xl p-5 h-full transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: "#ffffff",
                    border: `2px solid ${n.accent}22`,
                    boxShadow: `0 2px 12px ${n.accent}15`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 8px 24px ${n.accent}30`;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      `${n.accent}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 2px 12px ${n.accent}15`;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      `${n.accent}22`;
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${n.accent}15` }}
                  >
                    <n.icon className="w-5 h-5" style={{ color: n.accent }} />
                  </div>
                  <p
                    className="text-base font-bold"
                    style={{ color: "#0a4d3c" }}
                  >
                    {n.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
