import { b as useActor, r as reactExports, j as jsxRuntimeExports, d as createActor } from "./index-CogN6nIg.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { T as TrendingUp } from "./trending-up-BLZ5FWDy.js";
import { D as Download } from "./download-CdKIvBIq.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { W as Wallet } from "./wallet-BOIcpAiu.js";
import { C as ChevronLeft } from "./chevron-left-CLMvFXXX.js";
import { C as ChevronRight } from "./chevron-right-RA5MdHLM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "m8 12 4 4 4-4", key: "k98ssh" }]
];
const CircleArrowDown = createLucideIcon("circle-arrow-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
];
const CircleArrowUp = createLucideIcon("circle-arrow-up", __iconNode);
const MOCK_TRANSACTIONS = [
  {
    id: "T001",
    date: "2026-05-20",
    type: "deposit",
    user: "Budi Santoso",
    amount: 25e4,
    status: "berhasil"
  },
  {
    id: "T002",
    date: "2026-05-20",
    type: "pembayaran",
    user: "Siti Rahayu",
    amount: 185e3,
    status: "berhasil"
  },
  {
    id: "T003",
    date: "2026-05-19",
    type: "penarikan",
    user: "Sari Dewi (Perawat)",
    amount: 4e5,
    status: "berhasil"
  },
  {
    id: "T004",
    date: "2026-05-19",
    type: "deposit",
    user: "Ahmad Fauzi",
    amount: 5e5,
    status: "berhasil"
  },
  {
    id: "T005",
    date: "2026-05-18",
    type: "pembayaran",
    user: "Dewi Lestari",
    amount: 35e4,
    status: "berhasil"
  },
  {
    id: "T006",
    date: "2026-05-18",
    type: "penarikan",
    user: "Budi Hartono (Perawat)",
    amount: 6e5,
    status: "diproses"
  },
  {
    id: "T007",
    date: "2026-05-17",
    type: "pembayaran",
    user: "Rini Wulandari",
    amount: 2e5,
    status: "berhasil"
  },
  {
    id: "T008",
    date: "2026-05-17",
    type: "deposit",
    user: "Hendra Kusuma",
    amount: 15e4,
    status: "berhasil"
  },
  {
    id: "T009",
    date: "2026-05-16",
    type: "pembayaran",
    user: "Yanti Putri",
    amount: 42e4,
    status: "berhasil"
  },
  {
    id: "T010",
    date: "2026-05-16",
    type: "penarikan",
    user: "Fitri Liana (Bidan)",
    amount: 325e3,
    status: "gagal"
  }
];
const MONTHLY_DATA = [
  { bulan: "Des", pendapatan: 85e5 },
  { bulan: "Jan", pendapatan: 122e5 },
  { bulan: "Feb", pendapatan: 98e5 },
  { bulan: "Mar", pendapatan: 145e5 },
  { bulan: "Apr", pendapatan: 161e5 },
  { bulan: "Mei", pendapatan: 113e5 }
];
const PAGE_SIZE = 10;
const TYPE_LABELS = {
  semua: "Semua Tipe",
  deposit: "Deposit",
  penarikan: "Penarikan",
  pembayaran: "Pembayaran Layanan"
};
const TYPE_COLORS = {
  deposit: "bg-blue-100 text-blue-700 border-blue-300",
  penarikan: "bg-orange-100 text-orange-700 border-orange-300",
  pembayaran: "bg-emerald-100 text-emerald-700 border-emerald-300"
};
const STATUS_COLORS = {
  berhasil: "bg-emerald-100 text-emerald-700 border-emerald-300",
  diproses: "bg-amber-100 text-amber-700 border-amber-300",
  gagal: "bg-red-100 text-red-700 border-red-300"
};
function formatRupiah(n) {
  return `Rp${n.toLocaleString("id-ID")}`;
}
const maxVal = Math.max(...MONTHLY_DATA.map((d) => d.pendapatan));
function FinancialReport() {
  const { actor } = useActor(createActor);
  const [typeFilter, setTypeFilter] = reactExports.useState("semua");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [transactions, setTransactions] = reactExports.useState(MOCK_TRANSACTIONS);
  const [summary, setSummary] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const report = await actor.getAdminFinancialReport();
        setSummary({
          totalRevenue: Number(report.totalRevenue),
          totalWithdrawals: Number(report.totalWithdrawals),
          pendingWithdrawals: Number(report.pendingWithdrawals),
          transactionCount: Number(report.transactionCount)
        });
        if (report.recentTransactions.length > 0) {
          setTransactions(
            report.recentTransactions.map((t) => ({
              id: String(Number(t.id)),
              date: new Date(
                Number(t.createdAt / 1000000n)
              ).toLocaleDateString("id-ID"),
              type: t.transactionType,
              user: t.userId,
              amount: Number(t.amount),
              status: t.status,
              description: t.description
            }))
          );
        }
      } catch {
      }
    })();
  }, [actor]);
  const filtered = transactions.filter((tx) => {
    if (typeFilter !== "semua" && tx.type !== typeFilter) return false;
    if (dateFrom && tx.date < dateFrom) return false;
    if (dateTo && tx.date > dateTo) return false;
    return true;
  });
  const totalPendapatan = (summary == null ? void 0 : summary.totalRevenue) ?? transactions.filter((t) => t.type === "pembayaran" && t.status === "berhasil").reduce((s, t) => s + t.amount, 0);
  const totalPenarikan = (summary == null ? void 0 : summary.totalWithdrawals) ?? transactions.filter((t) => t.type === "penarikan" && t.status === "berhasil").reduce((s, t) => s + t.amount, 0);
  const totalDeposit = transactions.filter((t) => t.type === "deposit" && t.status === "berhasil").reduce((s, t) => s + t.amount, 0);
  const saldoTertahan = (summary == null ? void 0 : summary.pendingWithdrawals) ?? totalDeposit - totalPenarikan;
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
      t.status
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healio-financial-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 28 }),
          " Laporan Keuangan"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-base", children: "Ringkasan transaksi dan pendapatan platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleExportCsv,
          className: "bg-amber-500 hover:bg-amber-600 text-white gap-2",
          "data-ocid": "finance.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
            " Export CSV"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        {
          label: "Total Pendapatan Platform",
          value: formatRupiah(totalPendapatan),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 22, className: "text-emerald-500" }),
          bg: "bg-emerald-50 border-emerald-200",
          ocid: "finance.total_revenue_card"
        },
        {
          label: "Total Penarikan",
          value: formatRupiah(totalPenarikan),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { size: 22, className: "text-orange-500" }),
          bg: "bg-orange-50 border-orange-200",
          ocid: "finance.total_withdrawal_card"
        },
        {
          label: "Saldo Tertahan",
          value: formatRupiah(saldoTertahan),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 22, className: "text-blue-500" }),
          bg: "bg-blue-50 border-blue-200",
          ocid: "finance.balance_card"
        },
        {
          label: "Jumlah Transaksi",
          value: ((summary == null ? void 0 : summary.transactionCount) ?? transactions.length).toString(),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { size: 22, className: "text-purple-500" }),
          bg: "bg-purple-50 border-purple-200",
          ocid: "finance.tx_count_card"
        }
      ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border p-5 ${card.bg}`,
          "data-ocid": card.ocid,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: card.label }),
              card.icon
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold text-foreground", children: card.value })
          ]
        },
        card.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-5", children: "Pendapatan Bulanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-4 h-48", children: MONTHLY_DATA.map((d) => {
          const heightPct = d.pendapatan / maxVal * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: formatRupiah(d.pendapatan).replace("Rp", "") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full relative", style: { height: "140px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 w-full rounded-t-lg transition-all duration-500",
                    style: {
                      height: `${heightPct}%`,
                      background: "linear-gradient(to top, #0a4d3c, #2d6a4f)"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: d.bulan })
              ]
            },
            d.bulan
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "finance-type-filter",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Tipe Transaksi"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "finance-type-filter",
              value: typeFilter,
              onChange: (e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "finance.type_filter",
              children: Object.keys(TYPE_LABELS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: TYPE_LABELS[k] }, k))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "finance-date-from",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Dari Tanggal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "finance-date-from",
              type: "date",
              value: dateFrom,
              onChange: (e) => {
                setDateFrom(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "finance.date_from_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "finance-date-to",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Sampai Tanggal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "finance-date-to",
              type: "date",
              value: dateTo,
              onChange: (e) => {
                setDateTo(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "finance.date_to_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: { background: "#0a4d3c" },
              className: "text-white text-xs uppercase tracking-wider",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tanggal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tipe" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Pengguna" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Status" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 5,
              className: "text-center py-16 text-muted-foreground",
              "data-ocid": "finance.empty_state",
              children: "Tidak ada transaksi sesuai filter"
            }
          ) }) : paginated.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-t border-border transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`,
              "data-ocid": `finance.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: tx.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: TYPE_COLORS[tx.type], children: TYPE_LABELS[tx.type] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: tx.user }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-bold text-foreground", children: formatRupiah(tx.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: STATUS_COLORS[tx.status], children: `${tx.status.charAt(0).toUpperCase()}${tx.status.slice(1)}` }) })
              ]
            },
            tx.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            filtered.length,
            " transaksi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: page <= 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                "data-ocid": "finance.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
              "Hal. ",
              page,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                "data-ocid": "finance.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  FinancialReport as default
};
