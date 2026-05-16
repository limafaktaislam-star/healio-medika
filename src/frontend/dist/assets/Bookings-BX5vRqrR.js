import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BMCDcUtm.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-wp3yap7s.js";
import { B as BookingStatusBadge } from "./StatusBadge-Cg08N2S-.js";
import { C as Card, c as CardContent } from "./card-D1BeUdJQ.js";
import { C as ClipboardList } from "./clipboard-list-BEaON99x.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
import "./createLucideIcon-BGQG7qVG.js";
function formatRupiah(amount) {
  if (!amount) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(amount));
}
const STATUS_OPTIONS = [
  { value: "all", label: "Semua Status" },
  { value: "pending", label: "Menunggu" },
  { value: "accepted", label: "Diterima" },
  { value: "in_progress", label: "Sedang Berjalan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
  { value: "rejected", label: "Ditolak" }
];
function AdminBookings() {
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const { actor, isFetching } = useActor(createActor);
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["admin", "allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching
  });
  const { data: stats } = useQuery({
    queryKey: ["admin", "bookingStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookingStats();
    },
    enabled: !!actor && !isFetching
  });
  const filtered = filterStatus === "all" ? bookings : bookings.filter((b) => b.status === filterStatus);
  const statBar = [
    {
      label: "Total",
      value: stats ? Number(stats.total) : 0,
      color: "text-foreground"
    },
    {
      label: "Menunggu",
      value: stats ? Number(stats.pending) : 0,
      color: "text-yellow-600"
    },
    {
      label: "Diterima",
      value: stats ? Number(stats.accepted) : 0,
      color: "text-blue-600"
    },
    {
      label: "Berjalan",
      value: stats ? Number(stats.in_progress) : 0,
      color: "text-indigo-600"
    },
    {
      label: "Selesai",
      value: stats ? Number(stats.completed) : 0,
      color: "text-green-600"
    },
    {
      label: "Dibatalkan",
      value: stats ? Number(stats.cancelled) : 0,
      color: "text-red-500"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", "data-ocid": "admin.bookings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Kelola Pesanan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Monitor semua pesanan layanan homecare" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 md:grid-cols-6", children: statBar.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.label })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "bookings-status-filter",
          className: "text-sm font-medium text-foreground",
          children: "Filter Status:"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "bookings-status-filter",
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "border border-input rounded-lg px-3 py-2 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50",
          "data-ocid": "admin.bookings.status_filter",
          children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        filtered.length,
        " pesanan ditemukan"
      ] })
    ] }),
    bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "py-16 text-center",
        "data-ocid": "admin.bookings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Tidak ada pesanan ditemukan" })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "ID Pesanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "ID Layanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Jam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Est. Biaya" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.bookings.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
              "#",
              booking.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: booking.serviceId.toString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: booking.scheduledDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: booking.scheduledTime }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium", children: formatRupiah(booking.estimatedFeeIdr) })
          ]
        },
        booking.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  AdminBookings as default
};
