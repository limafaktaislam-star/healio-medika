import { j as jsxRuntimeExports, L as LoadingSpinner, d as Link } from "./index-BxBE-1lv.js";
import { u as useActor, a as useQuery, N as NurseStatus, c as createActor } from "./backend-RmgEpc2b.js";
import { L as Layout } from "./Layout-BaOPEDvI.js";
import { N as NurseStatusBadge } from "./StatusBadge-jnZ5yjip.js";
import { B as Button } from "./button-E3tW3HbR.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-B7cpt6Aw.js";
import "./useAuth-CVbw7B2D.js";
import "./createLucideIcon-C_thIQe7.js";
import "./book-open-DYprvAsb.js";
import "./chevron-right-BfAisa3Z.js";
import "./clipboard-list-Djhnxy2y.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
function NurseDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching
  });
  const { data: incomingBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching
  });
  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching
  });
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const todayCount = (schedule == null ? void 0 : schedule.filter((b) => b.scheduledDate === today).length) ?? 0;
  const pendingCount = (incomingBookings == null ? void 0 : incomingBookings.filter((b) => b.status === "pending").length) ?? 0;
  if (profileLoading || bookingsLoading || scheduleLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto py-16 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-3", children: "Belum Terdaftar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Anda belum mendaftarkan diri sebagai tenaga medis." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "text-lg px-8",
          "data-ocid": "nurse.dashboard.register_button",
          children: "Daftar Sekarang"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Selamat Datang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mt-1", children: profile.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NurseStatusBadge, { status: profile.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Status Verifikasi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        profile.status === NurseStatus.pending_verification && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground", children: "📋 Dokumen Anda sedang ditinjau oleh admin. Proses verifikasi memakan waktu 1-2 hari kerja." }),
        profile.status === NurseStatus.verified && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-green-700", children: "✅ Akun Anda telah terverifikasi. Anda dapat menerima pesanan." }),
        profile.status === NurseStatus.rejected && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-destructive", children: "❌ Verifikasi ditolak. Harap perbarui dokumen Anda dan hubungi admin." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.dashboard.pending_count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-bold text-primary", children: pendingCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mt-2", children: "Pesanan Masuk" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.dashboard.today_count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-bold text-primary", children: todayCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mt-2", children: "Jadwal Hari Ini" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/bookings", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.bookings_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📥" }),
            " Pesanan Masuk",
            pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto bg-white/20 text-white rounded-full px-2 py-0.5 text-sm font-bold", children: pendingCount })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/schedule", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.schedule_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📅" }),
            " Jadwal Harian"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/profile", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.profile_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "👤" }),
            " Edit Profil"
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  NurseDashboard as default
};
