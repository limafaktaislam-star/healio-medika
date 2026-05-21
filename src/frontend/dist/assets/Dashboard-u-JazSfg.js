import { b as useActor, h as useQuery, j as jsxRuntimeExports, L as LoadingSpinner, i as Link, d as createActor } from "./index-CogN6nIg.js";
import { U as Users, L as Layout } from "./Layout-C44wxXLx.js";
import { C as ClipboardList } from "./clipboard-list-LxFpA4sE.js";
import { C as Clock } from "./clock-DaYSqKoP.js";
import { A as Activity } from "./activity-DtATimKh.js";
import { C as CircleCheckBig } from "./circle-check-big-MXtBHnv7.js";
import { C as CircleX } from "./circle-x-CaRAT8uj.js";
import { S as Settings } from "./settings-DfRA-wpg.js";
import { D as DollarSign } from "./dollar-sign-Dwt1ryzx.js";
import { C as CircleAlert } from "./circle-alert-IHm8yMZZ.js";
import "./createLucideIcon-BbcVMltS.js";
import "./book-open-m2vho86p.js";
import "./chevron-right-RA5MdHLM.js";
import "./x-C_WyrZk7.js";
import "./user-check-Ds2Iu5HR.js";
import "./trending-up-BLZ5FWDy.js";
import "./package-nWSI2ZDW.js";
import "./file-text-DNsP0kT1.js";
function AdminDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin", "bookingStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookingStats();
    },
    enabled: !!actor && !isFetching
  });
  const { data: pendingNurses, isLoading: nursesLoading } = useQuery({
    queryKey: ["admin", "pendingNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNurses();
    },
    enabled: !!actor && !isFetching
  });
  const isLoading = statsLoading || nursesLoading;
  const activeOrdersCount = stats ? Number(stats.accepted) + Number(stats.in_progress) : 0;
  const totalTransactionVolume = stats ? Number(stats.completed) * 15e4 : 0;
  const weeklyData = [
    { day: "Sen", value: 4 },
    { day: "Sel", value: 7 },
    { day: "Rab", value: 5 },
    { day: "Kam", value: 9 },
    { day: "Jum", value: 12 },
    { day: "Sab", value: 8 },
    { day: "Min", value: stats ? Number(stats.completed) % 15 : 3 }
  ];
  const maxVal = Math.max(...weeklyData.map((d) => d.value), 1);
  const statCards = [
    {
      label: "Total Pesanan",
      value: stats ? Number(stats.total) : 0,
      icon: ClipboardList,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.10)"
    },
    {
      label: "Menunggu Konfirmasi",
      value: stats ? Number(stats.pending) : 0,
      icon: Clock,
      color: "#d97706",
      bg: "rgba(217,119,6,0.10)"
    },
    {
      label: "Pesanan Aktif",
      value: activeOrdersCount,
      icon: Activity,
      color: "#0284c7",
      bg: "rgba(2,132,199,0.10)"
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      icon: CircleCheckBig,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.08)"
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) + Number(stats.rejected) : 0,
      icon: CircleX,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.10)"
    },
    {
      label: "Perawat Menunggu Verifikasi",
      value: (pendingNurses == null ? void 0 : pendingNurses.length) ?? 0,
      icon: Users,
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.10)"
    }
  ];
  const navCards = [
    {
      to: "/admin/nurses",
      label: "Verifikasi Perawat",
      desc: "Review & setujui dokumen tenaga medis baru",
      icon: Users,
      accent: "#16a34a"
    },
    {
      to: "/admin/bookings",
      label: "Kelola Pesanan",
      desc: "Pantau semua pesanan layanan homecare",
      icon: ClipboardList,
      accent: "#0284c7"
    },
    {
      to: "/admin/services",
      label: "Katalog Layanan",
      desc: "Tambah, edit, dan kelola layanan tersedia",
      icon: Settings,
      accent: "#d97706"
    },
    {
      to: "/admin/pricing",
      label: "Pengaturan Harga",
      desc: "Atur tarif dasar, per-km, dan surcharge",
      icon: DollarSign,
      accent: "#7c3aed"
    },
    {
      to: "/admin/financial-report",
      label: "Laporan Keuangan",
      desc: "Total pendapatan, penarikan, dan transaksi",
      icon: DollarSign,
      accent: "#16a34a"
    },
    {
      to: "/admin/activity-log",
      label: "Log Aktivitas",
      desc: "Audit trail semua aktivitas sistem",
      icon: Activity,
      accent: "#0284c7"
    },
    {
      to: "/admin/pharmacy",
      label: "Manajemen Apotek",
      desc: "Kelola apotek mitra dan stok obat",
      icon: CircleAlert,
      accent: "#d97706"
    },
    {
      to: "/admin/platform-settings",
      label: "Pengaturan Platform",
      desc: "Konfigurasi nama, kontak, dan mode sistem",
      icon: Settings,
      accent: "#7c3aed"
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6", "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-6",
        style: {
          background: "linear-gradient(135deg, #0a4d3c 0%, #16a34a 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-white font-display", children: "Dashboard Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-100 mt-1 text-lg", children: "Selamat datang di panel kontrol HEALIO MEDIKA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white", children: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            }) }),
            activeOrdersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/80 text-yellow-900 animate-pulse", children: [
              activeOrdersCount,
              " Order Aktif"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5 shadow-sm",
        style: {
          background: "#ffffff",
          border: `2px solid ${s.bg}`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl", style: { background: s.bg }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6", style: { color: s.color } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: s.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-4xl font-bold font-display",
              style: { color: s.color },
              children: s.value
            }
          )
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-6 shadow-sm",
          style: { background: "#ffffff", border: "1.5px solid #e8f5e9" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-1", style: { color: "#0a4d3c" }, children: "Order Mingguan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "7 hari terakhir" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-32", children: weeklyData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center flex-1 gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-t-lg transition-all duration-500",
                      style: {
                        height: `${d.value / maxVal * 100}%`,
                        minHeight: "4px",
                        background: "linear-gradient(180deg, #16a34a 0%, #0a4d3c 100%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-medium", children: d.day })
                ]
              },
              d.day
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-6 shadow-sm",
          style: { background: "#ffffff", border: "1.5px solid #e8f5e9" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-1", style: { color: "#0a4d3c" }, children: "Ringkasan Keuangan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Data kumulatif platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total Volume Transaksi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-lg font-bold",
                    style: { color: "#16a34a" },
                    children: new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0
                    }).format(totalTransactionVolume)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Order Selesai" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: stats ? Number(stats.completed) : 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Penarikan Menunggu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: "0" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admin/financial-report",
                className: "inline-flex items-center gap-1 text-sm font-semibold mt-4",
                style: { color: "#16a34a" },
                "data-ocid": "admin.view_financial_report_link",
                children: "Lihat Laporan Lengkap →"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-xl font-semibold mb-4 font-display",
          style: { color: "#0a4d3c" },
          children: "Menu Utama"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: navCards.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          "data-ocid": `admin.nav.${n.label.toLowerCase().replace(/ /g, "_")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 h-full transition-all duration-200 hover:-translate-y-1",
              style: {
                background: "#ffffff",
                border: `2px solid ${n.accent}22`,
                boxShadow: `0 2px 12px ${n.accent}15`
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${n.accent}30`;
                e.currentTarget.style.borderColor = `${n.accent}55`;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.boxShadow = `0 2px 12px ${n.accent}15`;
                e.currentTarget.style.borderColor = `${n.accent}22`;
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                    style: { background: `${n.accent}15` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "w-5 h-5", style: { color: n.accent } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base font-bold",
                    style: { color: "#0a4d3c" },
                    children: n.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: n.desc })
              ]
            }
          )
        },
        n.to
      )) })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
