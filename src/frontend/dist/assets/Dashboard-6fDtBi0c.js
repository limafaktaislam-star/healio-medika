import { d as useRouter, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-rLbxkppD.js";
import { B as BookingStatus } from "./backend.d-DmUMkdSC.js";
import { u as useAuth, L as Layout, a as CalendarDays, S as Stethoscope } from "./Layout-Dfx5-xPX.js";
import { a as useMyPatientProfile, b as useMyBookings, c as useListServices } from "./useQueries-B3x3TyHM.js";
import { S as SERVICE_CATEGORY_ICONS, c as SERVICE_CATEGORY_LABELS } from "./types-Bf0oF2PP.js";
import { U as User } from "./user-CMoDdmFu.js";
import { C as ClipboardList } from "./clipboard-list-BB7PgJHk.js";
import { M as MapPin } from "./map-pin-ChxPa4WB.js";
import "./backend-BPbwYxH1.js";
import "./createLucideIcon-DLXihIFy.js";
import "./useMutation-C7CqhDIx.js";
function StatCard({
  label,
  value,
  icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-5 flex items-center gap-4 border ${color}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-muted-foreground mt-0.5", children: label })
    ] })
  ] });
}
function PatientDashboard() {
  const { principal } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyPatientProfile();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: services, isLoading: servicesLoading } = useListServices();
  const router = useRouter();
  const isLoading = profileLoading || bookingsLoading;
  const totalBookings = (bookings == null ? void 0 : bookings.length) ?? 0;
  const activeBookings = (bookings == null ? void 0 : bookings.filter(
    (b) => b.status === BookingStatus.pending || b.status === BookingStatus.accepted || b.status === BookingStatus.in_progress
  ).length) ?? 0;
  const recentBookings = [...bookings ?? []].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 3);
  const patientName = (profile == null ? void 0 : profile.name) ?? (principal ? `${principal.toText().slice(0, 10)}...` : "Pasien");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat dashboard..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-primary rounded-3xl px-7 py-8 text-primary-foreground shadow-lg",
        "data-ocid": "dashboard.greeting_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium opacity-80 mb-1 uppercase tracking-widest", children: "Selamat Datang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-1", children: patientName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-base", children: "Semoga Anda selalu sehat dan bahagia hari ini." }),
          !profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => router.navigate({ to: "/patient/profile" }),
              className: "mt-4 inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl transition-smooth border border-primary-foreground/30",
              "data-ocid": "dashboard.complete_profile_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
                " Lengkapi Profil Saya"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.stats_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-4", children: "Ringkasan Pesanan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Pesanan",
            value: totalBookings,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "text-primary", size: 28 }),
            color: "bg-primary/8 border-primary/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Pesanan Aktif",
            value: activeBookings,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "text-secondary", size: 28 }),
            color: "bg-secondary/10 border-secondary/20"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quick_actions_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-4", children: "Aksi Cepat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/services" }),
            className: "flex flex-col items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-smooth",
            "data-ocid": "dashboard.book_service_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pesan Layanan" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/bookings" }),
            className: "flex flex-col items-center gap-3 bg-card border-2 border-primary/30 text-primary rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-primary/5 transition-smooth",
            "data-ocid": "dashboard.view_bookings_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Riwayat Pesanan" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/profile" }),
            className: "flex flex-col items-center gap-3 bg-card border-2 border-secondary/30 text-secondary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-secondary/5 transition-smooth",
            "data-ocid": "dashboard.edit_profile_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Edit Profil" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.recent_bookings_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Pesanan Terbaru" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/bookings" }),
            className: "text-primary text-base font-medium hover:underline",
            "data-ocid": "dashboard.view_all_bookings_link",
            children: "Lihat Semua"
          }
        )
      ] }),
      recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-muted/40 rounded-2xl py-12 flex flex-col items-center gap-3 text-muted-foreground",
          "data-ocid": "dashboard.bookings_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 40, className: "opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "Belum ada pesanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => router.navigate({ to: "/patient/services" }),
                className: "mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-smooth",
                "data-ocid": "dashboard.book_now_button",
                children: "Pesan Sekarang"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl p-5 border border-border flex items-center justify-between gap-4",
          "data-ocid": `dashboard.recent_booking.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "text-primary shrink-0", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-base text-foreground truncate", children: [
                  "Layanan #",
                  booking.serviceId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-sm", children: [
                  booking.scheduledDate,
                  " · ",
                  booking.scheduledTime
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `shrink-0 text-sm font-semibold px-3 py-1 rounded-full border ${booking.status === BookingStatus.pending ? "bg-secondary/20 text-secondary-foreground border-secondary/40" : booking.status === BookingStatus.accepted ? "bg-primary/15 text-primary border-primary/30" : booking.status === BookingStatus.completed ? "bg-primary/20 text-primary border-primary/40" : booking.status === BookingStatus.cancelled ? "bg-muted text-muted-foreground border-border" : booking.status === BookingStatus.rejected ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-chart-4/20 text-chart-4 border-chart-4/40"}`,
                children: booking.status === BookingStatus.pending ? "Menunggu" : booking.status === BookingStatus.accepted ? "Diterima" : booking.status === BookingStatus.in_progress ? "Berlangsung" : booking.status === BookingStatus.completed ? "Selesai" : booking.status === BookingStatus.cancelled ? "Dibatalkan" : "Ditolak"
              }
            )
          ]
        },
        booking.id.toString()
      )) })
    ] }),
    !servicesLoading && services && services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.services_overview_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Layanan Tersedia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/services" }),
            className: "text-primary text-base font-medium hover:underline",
            "data-ocid": "dashboard.view_all_services_link",
            children: "Lihat Semua"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: services.slice(0, 6).map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => router.navigate({ to: "/patient/services" }),
          className: "bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-smooth text-center",
          "data-ocid": `dashboard.service_card.${service.id.toString()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: SERVICE_CATEGORY_ICONS[service.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground leading-tight", children: service.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: SERVICE_CATEGORY_LABELS[service.category] })
          ]
        },
        service.id.toString()
      )) })
    ] })
  ] }) });
}
export {
  PatientDashboard as default
};
