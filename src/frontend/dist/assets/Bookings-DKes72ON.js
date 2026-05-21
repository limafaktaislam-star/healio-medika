import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-CogN6nIg.js";
import { B as BookingStatus } from "./backend.d-DmUMkdSC.js";
import { L as Layout, C as CalendarDays } from "./Layout-C44wxXLx.js";
import { B as BookingStatusBadge } from "./StatusBadge-DGxNJ-Ri.js";
import { f as useMyBookings, g as useListServices, j as useCancelBooking } from "./useQueries-BuxrTd_z.js";
import { u as ue } from "./index-DjiNClVB.js";
import { C as Clock } from "./clock-DaYSqKoP.js";
import { M as MapPin } from "./map-pin-B_SUbVCQ.js";
import { F as FileText } from "./file-text-DNsP0kT1.js";
import { X } from "./x-C_WyrZk7.js";
import "./createLucideIcon-BbcVMltS.js";
import "./book-open-m2vho86p.js";
import "./chevron-right-RA5MdHLM.js";
import "./user-check-Ds2Iu5HR.js";
import "./clipboard-list-LxFpA4sE.js";
import "./activity-DtATimKh.js";
import "./settings-DfRA-wpg.js";
import "./trending-up-BLZ5FWDy.js";
import "./package-nWSI2ZDW.js";
import "./types-Bf0oF2PP.js";
import "./useMutation-CzdLgPbW.js";
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value));
}
const STATUS_FILTERS = [
  { value: "all", label: "Semua" },
  { value: BookingStatus.pending, label: "Menunggu" },
  { value: BookingStatus.accepted, label: "Diterima" },
  { value: BookingStatus.in_progress, label: "Berlangsung" },
  { value: BookingStatus.completed, label: "Selesai" },
  { value: BookingStatus.cancelled, label: "Dibatalkan" },
  { value: BookingStatus.rejected, label: "Ditolak" }
];
function CancelDialog({
  booking,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "cancel.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/50 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Batalkan"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card rounded-3xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "⚠️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Batalkan Pesanan?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base mt-2", children: [
              "Pesanan layanan pada ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: booking.scheduledDate }),
              " pukul",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: booking.scheduledTime }),
              " akan dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "flex-1 py-3.5 rounded-2xl border-2 border-border text-base font-semibold text-muted-foreground hover:bg-muted transition-smooth",
                "data-ocid": "cancel.cancel_button",
                children: "Tidak"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onConfirm,
                disabled: isPending,
                className: "flex-1 py-3.5 rounded-2xl bg-destructive text-destructive-foreground text-base font-semibold hover:opacity-90 disabled:opacity-50 transition-smooth",
                "data-ocid": "cancel.confirm_button",
                children: isPending ? "Memproses..." : "Ya, Batalkan"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PatientBookings() {
  const { data: bookings, isLoading } = useMyBookings();
  const { data: services } = useListServices();
  const cancelBooking = useCancelBooking();
  const [filter, setFilter] = reactExports.useState("all");
  const [cancelTarget, setCancelTarget] = reactExports.useState(null);
  const serviceMap = new Map(
    (services == null ? void 0 : services.map((s) => [s.id.toString(), s.name])) ?? []
  );
  const sorted = [...bookings ?? []].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  const filtered = filter === "all" ? sorted : sorted.filter((b) => b.status === filter);
  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      await cancelBooking.mutateAsync(cancelTarget.id);
      ue.success("Pesanan berhasil dibatalkan.");
    } catch {
      ue.error("Gagal membatalkan pesanan.");
    } finally {
      setCancelTarget(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Riwayat Pesanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mt-1", children: "Semua pesanan layanan Anda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-2 mb-6",
          "data-ocid": "bookings.filter_tabs",
          children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(f.value),
              className: `shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-smooth border ${filter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"}`,
              "data-ocid": `bookings.filter.${f.value}`,
              children: f.label
            },
            f.value
          ))
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-20",
          "data-ocid": "bookings.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat pesanan..." })
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-muted/30 rounded-3xl",
          "data-ocid": "bookings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CalendarDays,
              {
                size: 48,
                className: "mx-auto text-muted-foreground/40 mb-4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-foreground", children: "Tidak ada pesanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-base", children: "Pesanan Anda akan muncul di sini" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "bookings.list", children: filtered.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-smooth",
          "data-ocid": `bookings.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-foreground", children: serviceMap.get(booking.serviceId.toString()) ?? `Layanan #${booking.serviceId}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground mt-0.5", children: [
                  "Pesanan #",
                  booking.id.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-base text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 18, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.scheduledDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-base text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.scheduledTime })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-base text-foreground col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-sm", children: [
                  booking.latitude.toFixed(4),
                  ",",
                  " ",
                  booking.longitude.toFixed(4)
                ] })
              ] }),
              booking.nursePrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-base text-foreground col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "👩‍⚕️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm truncate", children: [
                  booking.nursePrincipal.toText().slice(0, 20),
                  "..."
                ] })
              ] }),
              booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileText,
                  {
                    size: 16,
                    className: "text-muted-foreground shrink-0 mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: booking.notes })
              ] }),
              booking.visitReport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary mb-1", children: "Laporan Kunjungan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: booking.visitReport })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Estimasi Biaya" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-primary", children: formatRupiah(booking.estimatedFeeIdr) })
              ] }),
              booking.status === BookingStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setCancelTarget(booking),
                  className: "flex items-center gap-2 px-5 py-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/30 text-base font-semibold hover:bg-destructive/20 transition-smooth",
                  "data-ocid": `bookings.cancel_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }),
                    " Batalkan Pesanan"
                  ]
                }
              )
            ] })
          ]
        },
        booking.id.toString()
      )) })
    ] }),
    cancelTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CancelDialog,
      {
        booking: cancelTarget,
        onConfirm: handleCancel,
        onCancel: () => setCancelTarget(null),
        isPending: cancelBooking.isPending
      }
    )
  ] });
}
export {
  PatientBookings as default
};
