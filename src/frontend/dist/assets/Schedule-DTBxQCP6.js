import { a as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BMCDcUtm.js";
import { u as useActor, a as useQuery, B as BookingStatus, c as createActor } from "./backend-wp3yap7s.js";
import { B as BookingStatusBadge } from "./StatusBadge-Cg08N2S-.js";
import { B as Button } from "./button-Dgh0anEC.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-D1BeUdJQ.js";
import { u as useMutation } from "./useMutation-VSVpIFXH.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
function formatRp(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(amount));
}
function ScheduleCard({
  booking,
  idx,
  reportBookingId,
  reportText,
  setReportBookingId,
  setReportText,
  onSubmitReport,
  isSubmitting,
  prefix
}) {
  const isOpen = reportBookingId === booking.id;
  const isAccepted = booking.status === BookingStatus.accepted || booking.status === BookingStatus.in_progress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": `nurse.schedule.${prefix}.item.${idx + 1}`, children: [
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
      booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Catatan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground", children: booking.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Estimasi Biaya" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-primary", children: formatRp(booking.estimatedFeeIdr) })
      ] }),
      booking.visitReport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Laporan Kunjungan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground", children: booking.visitReport })
      ] }),
      isAccepted && !booking.visitReport && (!isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "w-full text-base",
          onClick: () => setReportBookingId(booking.id),
          "data-ocid": `nurse.schedule.report_button.${idx + 1}`,
          children: "📝 Kirim Laporan Kunjungan"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border border-border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Laporan Kunjungan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: reportText,
            onChange: (e) => setReportText(e.target.value),
            rows: 4,
            placeholder: "Tuliskan kondisi pasien, tindakan yang dilakukan, dan rekomendasi tindak lanjut...",
            className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none",
            "data-ocid": `nurse.schedule.report_textarea.${idx + 1}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "flex-1 text-base",
              onClick: () => onSubmitReport(booking.id, reportText),
              disabled: !reportText.trim() || isSubmitting,
              "data-ocid": `nurse.schedule.report_submit.${idx + 1}`,
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "Kirim Laporan"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              onClick: () => {
                setReportBookingId(null);
                setReportText("");
              },
              "data-ocid": `nurse.schedule.report_cancel.${idx + 1}`,
              children: "Batal"
            }
          )
        ] })
      ] }))
    ] })
  ] });
}
function NurseSchedule() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const [gpsActive, setGpsActive] = reactExports.useState(false);
  const [gpsError, setGpsError] = reactExports.useState("");
  const intervalRef = reactExports.useRef(null);
  const [reportBookingId, setReportBookingId] = reactExports.useState(null);
  const [reportText, setReportText] = reactExports.useState("");
  const { data: schedule, isLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching
  });
  const reportMutation = useMutation({
    mutationFn: ({ id, text }) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.submitVisitReport(id, text);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurseSchedule"] });
      setReportBookingId(null);
      setReportText("");
    }
  });
  function startGps() {
    if (!navigator.geolocation) {
      setGpsError("Perangkat tidak mendukung GPS.");
      return;
    }
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          actor == null ? void 0 : actor.updateNurseLocation(pos.coords.latitude, pos.coords.longitude).catch(console.error);
        },
        () => setGpsError("Gagal mendapatkan lokasi.")
      );
    };
    sendLocation();
    intervalRef.current = setInterval(sendLocation, 5e3);
    setGpsActive(true);
    setGpsError("");
  }
  function stopGps() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGpsActive(false);
  }
  reactExports.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const todaySchedule = (schedule == null ? void 0 : schedule.filter((b) => b.scheduledDate === today)) ?? [];
  const otherSchedule = (schedule == null ? void 0 : schedule.filter((b) => b.scheduledDate !== today)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Jadwal Kunjungan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg mt-1", children: [
          (schedule == null ? void 0 : schedule.length) ?? 0,
          " total kunjungan"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: gpsActive ? "destructive" : "outline",
          onClick: gpsActive ? stopGps : startGps,
          className: "text-base",
          "data-ocid": "nurse.schedule.gps_toggle",
          children: gpsActive ? "🔴 Matikan GPS" : "📍 Aktifkan GPS"
        }
      )
    ] }),
    gpsActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-800 text-base font-medium", children: "✅ GPS aktif — lokasi Anda diperbarui setiap 5 detik" }) }),
    gpsError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/10 border border-destructive/30 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-base", children: gpsError }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-foreground mb-4", children: [
        "📅 Jadwal Hari Ini (",
        today,
        ")"
      ] }),
      todaySchedule.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.schedule.today_empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Tidak ada jadwal hari ini" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: todaySchedule.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScheduleCard,
        {
          booking,
          idx,
          reportBookingId,
          reportText,
          setReportBookingId,
          setReportText,
          onSubmitReport: (id, text) => reportMutation.mutate({ id, text }),
          isSubmitting: reportMutation.isPending,
          prefix: "today"
        },
        String(booking.id)
      )) })
    ] }),
    otherSchedule.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-4", children: "📋 Jadwal Mendatang" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: otherSchedule.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScheduleCard,
        {
          booking,
          idx,
          reportBookingId,
          reportText,
          setReportBookingId,
          setReportText,
          onSubmitReport: (id, text) => reportMutation.mutate({ id, text }),
          isSubmitting: reportMutation.isPending,
          prefix: "other"
        },
        String(booking.id)
      )) })
    ] })
  ] });
}
export {
  NurseSchedule as default
};
