import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

type TxType = "semua" | "deposit" | "penarikan" | "pembayaran";
type TxStatus = "berhasil" | "diproses" | "gagal";

interface Transaction {
  id: string;
  date: string;
  type: Exclude<TxType, "semua">;
  user: string;
  amount: number;
  status: TxStatus;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "T001",
    date: "2026-05-20",
    type: "deposit",
    user: "Budi Santoso",
    amount: 250000,
    status: "berhasil",
  },
  {
    id: "T002",
    date: "2026-05-20",
    type: "pembayaran",
    user: "Siti Rahayu",
    amount: 185000,
    status: "berhasil",
  },
  {
    id: "T003",
    date: "2026-05-19",
    type: "penarikan",
    user: "Sari Dewi (Perawat)",
    amount: 400000,
    status: "berhasil",
  },
  {
    id: "T004",
    date: "2026-05-19",
    type: "deposit",
    user: "Ahmad Fauzi",
    amount: 500000,
    status: "berhasil",
  },
  {
    id: "T005",
    date: "2026-05-18",
    type: "pembayaran",
    user: "Dewi Lestari",
    amount: 350000,
    status: "berhasil",
  },
  {
    id: "T006",
    date: "2026-05-18",
    type: "penarikan",
    user: "Budi Hartono (Perawat)",
    amount: 600000,
    status: "diproses",
  },
  {
    id: "T007",
    date: "2026-05-17",
    type: "pembayaran",
    user: "Rini Wulandari",
    amount: 200000,
    status: "berhasil",
  },
  {
    id: "T008",
    date: "2026-05-17",
    type: "deposit",
    user: "Hendra Kusuma",
    amount: 150000,
    status: "berhasil",
  },
  {
    id: "T009",
    date: "2026-05-16",
    type: "pembayaran",
    user: "Yanti Putri",
    amount: 420000,
    status: "berhasil",
  },
  {
    id: "T010",
    date: "2026-05-16",
    type: "penarikan",
    user: "Fitri Liana (Bidan)",
    amount: 325000,
    status: "gagal",
  },
];

const MONTHLY_DATA = [
  { bulan: "Des", pendapatan: 8_500_000 },
  { bulan: "Jan", pendapatan: 12_200_000 },
  { bulan: "Feb", pendapatan: 9_800_000 },
  { bulan: "Mar", pendapatan: 14_500_000 },
  { bulan: "Apr", pendapatan: 16_100_000 },
  { bulan: "Mei", pendapatan: 11_300_000 },
];

const PAGE_SIZE = 10;

const TYPE_LABELS: Record<TxType, string> = {
  semua: "Semua Tipe",
  deposit: "Deposit",
  penarikan: "Penarikan",
  pembayaran: "Pembayaran Layanan",
};

const TYPE_COLORS: Record<Exclude<TxType, "semua">, string> = {
  deposit: "bg-blue-100 text-blue-700 border-blue-300",
  penarikan: "bg-orange-100 text-orange-700 border-orange-300",
  pembayaran: "bg-emerald-100 text-emerald-700 border-emerald-300",
};

const STATUS_COLORS: Record<TxStatus, string> = {
  berhasil: "bg-emerald-100 text-emerald-700 border-emerald-300",
  diproses: "bg-amber-100 text-amber-700 border-amber-300",
  gagal: "bg-red-100 text-red-700 border-red-300",
};

function formatRupiah(n: number): string {
  return `Rp${n.toLocaleString("id-ID")}`;
}

const maxVal = Math.max(...MONTHLY_DATA.map((d) => d.pendapatan));

export default function FinancialReport() {
  const { actor } = useActor(createActor);
  const [typeFilter, setTypeFilter] = useState<TxType>("semua");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [summary, setSummary] = useState<{
    totalRevenue: number;
    totalWithdrawals: number;
    pendingWithdrawals: number;
    transactionCount: number;
  } | null>(null);

  useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const report = await actor.getAdminFinancialReport();
        setSummary({
          totalRevenue: Number(report.totalRevenue),
          totalWithdrawals: Number(report.totalWithdrawals),
          pendingWithdrawals: Number(report.pendingWithdrawals),
          transactionCount: Number(report.transactionCount),
        });
        if (report.recentTransactions.length > 0) {
          setTransactions(
            report.recentTransactions.map((t: any) => ({
              id: String(Number(t.id)),
              date: new Date(
                Number(t.createdAt / 1_000_000n),
              ).toLocaleDateString("id-ID"),
              type: t.transactionType,
              user: t.userId,
              amount: Number(t.amount),
              status: t.status,
              description: t.description,
            })),
          );
        }
      } catch {}
    })();
  }, [actor]);

  const filtered = transactions.filter((tx) => {
    if (typeFilter !== "semua" && tx.type !== typeFilter) return false;
    if (dateFrom && tx.date < dateFrom) return false;
    if (dateTo && tx.date > dateTo) return false;
    return true;
  });

  const totalPendapatan =
    summary?.totalRevenue ??
    transactions
      .filter((t) => t.type === "pembayaran" && t.status === "berhasil")
      .reduce((s, t) => s + t.amount, 0);
  const totalPenarikan =
    summary?.totalWithdrawals ??
    transactions
      .filter((t) => t.type === "penarikan" && t.status === "berhasil")
      .reduce((s, t) => s + t.amount, 0);
  const totalDeposit = transactions
    .filter((t) => t.type === "deposit" && t.status === "berhasil")
    .reduce((s, t) => s + t.amount, 0);
  const saldoTertahan =
    summary?.pendingWithdrawals ?? totalDeposit - totalPenarikan;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExportCsv = () => {
    const header = ["ID", "Tanggal", "Tipe", "Pengguna", "Nominal", "Status"];
    const rows = filtered.map((t) => [
      t.id,
      t.date,
      TYPE_LABELS[t.type],
      t.user,
      t.amount.toString(),
      t.status,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healio-financial-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
              <TrendingUp size={28} /> Laporan Keuangan
            </h1>
            <p className="text-white/75 text-base">
              Ringkasan transaksi dan pendapatan platform
            </p>
          </div>
          <Button
            type="button"
            onClick={handleExportCsv}
            className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
            data-ocid="finance.export_button"
          >
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Pendapatan Platform",
              value: formatRupiah(totalPendapatan),
              icon: <TrendingUp size={22} className="text-emerald-500" />,
              bg: "bg-emerald-50 border-emerald-200",
              ocid: "finance.total_revenue_card",
            },
            {
              label: "Total Penarikan",
              value: formatRupiah(totalPenarikan),
              icon: <ArrowUpCircle size={22} className="text-orange-500" />,
              bg: "bg-orange-50 border-orange-200",
              ocid: "finance.total_withdrawal_card",
            },
            {
              label: "Saldo Tertahan",
              value: formatRupiah(saldoTertahan),
              icon: <Wallet size={22} className="text-blue-500" />,
              bg: "bg-blue-50 border-blue-200",
              ocid: "finance.balance_card",
            },
            {
              label: "Jumlah Transaksi",
              value: (
                summary?.transactionCount ?? transactions.length
              ).toString(),
              icon: <ArrowDownCircle size={22} className="text-purple-500" />,
              bg: "bg-purple-50 border-purple-200",
              ocid: "finance.tx_count_card",
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-xl border p-5 ${card.bg}`}
              data-ocid={card.ocid}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {card.label}
                </span>
                {card.icon}
              </div>
              <p className="text-2xl font-extrabold text-foreground">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-5">
            Pendapatan Bulanan
          </h2>
          <div className="flex items-end gap-4 h-48">
            {MONTHLY_DATA.map((d) => {
              const heightPct = (d.pendapatan / maxVal) * 100;
              return (
                <div
                  key={d.bulan}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-bold text-muted-foreground">
                    {formatRupiah(d.pendapatan).replace("Rp", "")}
                  </span>
                  <div className="w-full relative" style={{ height: "140px" }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${heightPct}%`,
                        background: "linear-gradient(to top, #0a4d3c, #2d6a4f)",
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {d.bulan}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="finance-type-filter"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Tipe Transaksi
            </label>
            <select
              id="finance-type-filter"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as TxType);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="finance.type_filter"
            >
              {(Object.keys(TYPE_LABELS) as TxType[]).map((k) => (
                <option key={k} value={k}>
                  {TYPE_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="finance-date-from"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Dari Tanggal
            </label>
            <input
              id="finance-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="finance.date_from_input"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="finance-date-to"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Sampai Tanggal
            </label>
            <input
              id="finance-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="finance.date_to_input"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{ background: "#0a4d3c" }}
                  className="text-white text-xs uppercase tracking-wider"
                >
                  <th className="px-4 py-3 text-left">Tanggal</th>
                  <th className="px-4 py-3 text-left">Tipe</th>
                  <th className="px-4 py-3 text-left">Pengguna</th>
                  <th className="px-4 py-3 text-right">Nominal</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16 text-muted-foreground"
                      data-ocid="finance.empty_state"
                    >
                      Tidak ada transaksi sesuai filter
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx, idx) => (
                    <tr
                      key={tx.id}
                      className={`border-t border-border transition-colors hover:bg-muted/50 ${
                        idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                      data-ocid={`finance.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        {tx.date}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={TYPE_COLORS[tx.type]}>
                          {TYPE_LABELS[tx.type]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {tx.user}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                        {formatRupiah(tx.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={STATUS_COLORS[tx.status]}>
                          {`${tx.status.charAt(0).toUpperCase()}${tx.status.slice(1)}`}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <span className="text-sm text-muted-foreground">
              {filtered.length} transaksi
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                data-ocid="finance.pagination_prev"
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
                data-ocid="finance.pagination_next"
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
