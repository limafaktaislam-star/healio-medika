import { j as jsxRuntimeExports, L as LoadingSpinner, e as Link } from "./index-BMCDcUtm.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-wp3yap7s.js";
import { A as Activity, U as Users, L as Layout, c as Settings } from "./Layout-Cy_f-yyM.js";
import { C as Card, c as CardContent } from "./card-D1BeUdJQ.js";
import { C as ClipboardList } from "./clipboard-list-BEaON99x.js";
import { C as Clock } from "./clock-e-lcE8W6.js";
import { C as CircleCheckBig } from "./circle-check-big-CnXIYwOL.js";
import { C as CircleX } from "./circle-x-CZtuRZNr.js";
import { D as DollarSign } from "./dollar-sign-BdKISJRk.js";
import "./createLucideIcon-BGQG7qVG.js";
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
  const statCards = [
    {
      label: "Total Pesanan",
      value: stats ? Number(stats.total) : 0,
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Menunggu Konfirmasi",
      value: stats ? Number(stats.pending) : 0,
      icon: Clock,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Pesanan Aktif",
      value: stats ? Number(stats.accepted) + Number(stats.in_progress) : 0,
      icon: Activity,
      color: "text-secondary-foreground",
      bg: "bg-secondary"
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      icon: CircleCheckBig,
      color: "text-primary",
      bg: "bg-accent"
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) + Number(stats.rejected) : 0,
      icon: CircleX,
      color: "text-destructive",
      bg: "bg-destructive/10"
    },
    {
      label: "Perawat Menunggu Verifikasi",
      value: (pendingNurses == null ? void 0 : pendingNurses.length) ?? 0,
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-muted"
    }
  ];
  const navCards = [
    {
      to: "/admin/nurses",
      label: "Verifikasi Perawat",
      desc: "Review & setujui dokumen tenaga medis baru",
      icon: Users,
      color: "border-l-primary"
    },
    {
      to: "/admin/bookings",
      label: "Kelola Pesanan",
      desc: "Pantau semua pesanan layanan homecare",
      icon: ClipboardList,
      color: "border-l-secondary"
    },
    {
      to: "/admin/services",
      label: "Katalog Layanan",
      desc: "Tambah, edit, dan kelola layanan tersedia",
      icon: Settings,
      color: "border-l-accent"
    },
    {
      to: "/admin/pricing",
      label: "Pengaturan Harga",
      desc: "Atur tarif dasar, per-km, dan surcharge",
      icon: DollarSign,
      color: "border-l-primary"
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6", "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Dashboard Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Selamat datang di panel kontrol HEALIO MEDIKA" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-sm hover:shadow-md transition-shadow",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl ${s.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-7 h-7 ${s.color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-4xl font-bold ${s.color}`, children: s.value })
          ] })
        ] }) })
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-4", children: "Menu Utama" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: navCards.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          "data-ocid": `admin.nav.${n.label.toLowerCase().replace(/ /g, "_")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: `border-l-4 ${n.color} hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "w-8 h-8 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: n.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: n.desc })
                ] })
              ] }) })
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
