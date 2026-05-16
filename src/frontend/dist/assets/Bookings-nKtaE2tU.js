import { a as useQueryClient, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-rLbxkppD.js";
import { u as useActor, a as useQuery, B as BookingStatus, c as createActor } from "./backend-BPbwYxH1.js";
import { B as BookingStatusBadge } from "./StatusBadge-JEsMUvJ7.js";
import { B as Button } from "./button-Dd7iJqhP.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DLDeT03F.js";
import { u as useMutation } from "./useMutation-C7CqhDIx.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
function formatRp(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(amount));
}
function NurseBookings() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching
  });
  const accept = useMutation({
    mutationFn: (id) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.acceptBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incomingBookings"] })
  });
  const reject = useMutation({
    mutationFn: (id) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.rejectBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incomingBookings"] })
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  }
  const pendingBookings = (bookings == null ? void 0 : bookings.filter((b) => b.status === BookingStatus.pending)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Pesanan Masuk" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg mb-8", children: [
      pendingBookings.length,
      " pesanan menunggu konfirmasi"
    ] }),
    pendingBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.bookings.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-12 pb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Tidak ada pesanan masuk saat ini" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: pendingBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        "data-ocid": `nurse.bookings.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
              "Pesanan #",
              String(booking.id)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tanggal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: booking.scheduledDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Waktu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: booking.scheduledTime })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ID Layanan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold text-foreground", children: [
                "Layanan #",
                String(booking.serviceId)
              ] })
            ] }),
            booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Catatan Pasien" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground bg-muted/40 rounded-lg p-3", children: booking.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Estimasi Biaya" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-primary", children: formatRp(booking.estimatedFeeIdr) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "flex-1 text-base",
                  onClick: () => accept.mutate(booking.id),
                  disabled: accept.isPending || reject.isPending,
                  "data-ocid": `nurse.bookings.accept_button.${idx + 1}`,
                  children: accept.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "✅ Terima Pesanan"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "destructive",
                  className: "flex-1 text-base",
                  onClick: () => reject.mutate(booking.id),
                  disabled: accept.isPending || reject.isPending,
                  "data-ocid": `nurse.bookings.reject_button.${idx + 1}`,
                  children: reject.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "❌ Tolak"
                }
              )
            ] })
          ] })
        ]
      },
      String(booking.id)
    )) })
  ] });
}
export {
  NurseBookings as default
};
