import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type ActivityRole = "admin" | "nurse" | "patient" | "semua";
type ActivityType =
  | "semua"
  | "login"
  | "logout"
  | "verifikasi"
  | "pesanan"
  | "pembayaran"
  | "pengaturan";

interface ActivityEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: Exclude<ActivityRole, "semua">;
  type: Exclude<ActivityType, "semua">;
  description: string;
  detail: string;
}

const MOCK_LOGS: ActivityEntry[] = [
  {
    id: "1",
    timestamp: "2026-05-20T08:15:23",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "verifikasi",
    description: "Verifikasi tenaga medis disetujui",
    detail: "Perawat Sari Dewi (STR: 12345678) telah diverifikasi",
  },
  {
    id: "2",
    timestamp: "2026-05-20T09:32:10",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "login",
    description: "Login berhasil",
    detail: "IP: 202.123.45.67 — Browser: Chrome 124",
  },
  {
    id: "3",
    timestamp: "2026-05-20T10:05:44",
    actor: "endanghulaepi14@gmail.com",
    role: "patient",
    type: "pesanan",
    description: "Pesanan layanan baru dibuat",
    detail: "Layanan: Perawatan Luka — Tenaga medis: Sari Dewi",
  },
  {
    id: "4",
    timestamp: "2026-05-20T11:20:00",
    actor: "endanghulaepi14@gmail.com",
    role: "patient",
    type: "pembayaran",
    description: "Deposit saldo berhasil",
    detail: "Nominal: Rp250.000 — Metode: DANA",
  },
  {
    id: "5",
    timestamp: "2026-05-20T12:00:01",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "pengaturan",
    description: "Tarif layanan diperbarui",
    detail: "Perawat: Rp150.000 → Rp175.000 per kunjungan",
  },
  {
    id: "6",
    timestamp: "2026-05-20T13:45:11",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "pesanan",
    description: "Pesanan diterima oleh tenaga medis",
    detail: "Order ID: ORD-20260520-003 — Pasien: Budi Santoso",
  },
  {
    id: "7",
    timestamp: "2026-05-20T15:10:30",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "verifikasi",
    description: "Verifikasi pasien disetujui",
    detail: "Pasien: Ani Rahayu (NIK: 3271020304050001)",
  },
  {
    id: "8",
    timestamp: "2026-05-20T16:22:55",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "logout",
    description: "Logout dari sistem",
    detail: "Sesi aktif: 6 jam 50 menit",
  },
];

const PAGE_SIZE = 50;

const ROLE_LABELS: Record<Exclude<ActivityRole, "semua">, string> = {
  admin: "Admin",
  nurse: "Tenaga Medis",
  patient: "Pasien",
};

const ROLE_COLORS: Record<Exclude<ActivityRole, "semua">, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-300",
  nurse: "bg-emerald-100 text-emerald-700 border-emerald-300",
  patient: "bg-blue-100 text-blue-700 border-blue-300",
};

const TYPE_LABELS: Record<ActivityType, string> = {
  semua: "Semua Jenis",
  login: "Login",
  logout: "Logout",
  verifikasi: "Verifikasi",
  pesanan: "Pesanan",
  pembayaran: "Pembayaran",
  pengaturan: "Pengaturan",
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function ActivityLog() {
  const { actor } = useActor(createActor);
  const [roleFilter, setRoleFilter] = useState<ActivityRole>("semua");
  const [typeFilter, setTypeFilter] = useState<ActivityType>("semua");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [logs, setLogs] = useState<ActivityEntry[]>(MOCK_LOGS);

  // Fetch from backend
  useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const entries = await actor.getActivityLog(BigInt(100), BigInt(0));
        const mapped = entries.map((e: any) => ({
          id: String(Number(e.id)),
          timestamp: new Date(Number(e.timestamp / 1_000_000n)).toISOString(),
          actor: e.actorEmail,
          role: e.actorRole,
          type: e.actionType,
          description: e.description,
          detail: e.metadata,
        }));
        if (mapped.length > 0) setLogs(mapped);
      } catch {}
    })();
  }, [actor]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 500));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  }, []);

  // Filter logic
  const filtered = logs.filter((entry) => {
    if (roleFilter !== "semua" && entry.role !== roleFilter) return false;
    if (typeFilter !== "semua" && entry.type !== typeFilter) return false;
    if (dateFrom && entry.timestamp < dateFrom) return false;
    if (dateTo && entry.timestamp > `${dateTo}T23:59:59`) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Export CSV
  const handleExportCsv = useCallback(() => {
    const header = ["Waktu", "Aktor", "Role", "Jenis", "Deskripsi", "Detail"];
    const rows = filtered.map((e) => [
      formatDateTime(e.timestamp),
      e.actor,
      ROLE_LABELS[e.role],
      TYPE_LABELS[e.type],
      e.description,
      e.detail,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healio-activity-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
              <Activity size={28} /> Log Aktivitas Sistem
            </h1>
            <p className="text-white/75 text-base">
              Terakhir diperbarui: {lastRefresh.toLocaleTimeString("id-ID")}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2"
              data-ocid="activity.refresh_button"
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Segarkan
            </Button>
            <Button
              type="button"
              onClick={handleExportCsv}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
              data-ocid="activity.export_button"
            >
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="activity-role-filter"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Filter Role
            </label>
            <select
              id="activity-role-filter"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as ActivityRole);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="activity.role_filter"
            >
              <option value="semua">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="nurse">Tenaga Medis</option>
              <option value="patient">Pasien</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="activity-type-filter"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Jenis Aktivitas
            </label>
            <select
              id="activity-type-filter"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as ActivityType);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="activity.type_filter"
            >
              {(Object.keys(TYPE_LABELS) as ActivityType[]).map((k) => (
                <option key={k} value={k}>
                  {TYPE_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="activity-date-from"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Dari Tanggal
            </label>
            <input
              id="activity-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="activity.date_from_input"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="activity-date-to"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Sampai Tanggal
            </label>
            <input
              id="activity-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="activity.date_to_input"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{ background: "#0a4d3c" }}
                  className="text-white text-xs uppercase tracking-wider"
                >
                  <th className="px-4 py-3 text-left">Waktu</th>
                  <th className="px-4 py-3 text-left">Aktor</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Jenis Aktivitas</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Detail</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-muted-foreground"
                      data-ocid="activity.empty_state"
                    >
                      Tidak ada data aktivitas sesuai filter
                    </td>
                  </tr>
                ) : (
                  paginated.map((entry, idx) => (
                    <tr
                      key={entry.id}
                      className={`border-t border-border transition-colors hover:bg-muted/50 ${
                        idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                      data-ocid={`activity.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {formatDateTime(entry.timestamp)}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground max-w-[180px] truncate">
                        {entry.actor}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={ROLE_COLORS[entry.role]}>
                          {ROLE_LABELS[entry.role]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="capitalize text-foreground font-medium">
                          {TYPE_LABELS[entry.type]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {entry.description}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-[240px] truncate">
                        {entry.detail}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <span className="text-sm text-muted-foreground">
              Menampilkan {paginated.length} dari {filtered.length} entri
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                data-ocid="activity.pagination_prev"
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm font-medium">
                Hal. {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                data-ocid="activity.pagination_next"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
