import { r as reactExports, a as useQueryClient, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BxBE-1lv.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-RmgEpc2b.js";
import { B as Badge } from "./badge-CD4gHaqU.js";
import { B as Button } from "./button-E3tW3HbR.js";
import { C as Card, c as CardContent } from "./card-B7cpt6Aw.js";
import { u as useMutation } from "./useMutation-DO_kterx.js";
import { u as ue } from "./index-HxUaM6Ez.js";
import { U as User } from "./user-Dtb7gKwj.js";
import { E as ExternalLink } from "./external-link-2oZCbr-W.js";
import { C as CircleCheckBig } from "./circle-check-big-CqWPiKXZ.js";
import { C as CircleX } from "./circle-x-BVBPvvj7.js";
import "./createLucideIcon-C_thIQe7.js";
function formatDate(ns) {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function AdminPatients() {
  const [tab, setTab] = reactExports.useState("pending");
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: pendingPatients = [], isLoading: pendingLoading } = useQuery({
    queryKey: ["admin", "pendingPatients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingPatients();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
  const { data: allPatients = [], isLoading: allLoading } = useQuery({
    queryKey: ["admin", "allPatients"],
    queryFn: async () => {
      if (!actor) return [];
      const profiles = await actor.getAllPatients();
      return profiles.map((p) => ({
        principal: p.principal,
        fullName: p.name,
        nik: p.nik ?? "-",
        submittedAt: p.createdAt,
        ktpPhotoUrl: p.ktpPhotoUrl ?? "",
        selfieUrl: p.selfieWithKtpUrl ?? "",
        verificationStatus: p.verificationStatus
      }));
    },
    enabled: !!actor && !isFetching && tab === "all"
  });
  const approveMutation = useMutation({
    mutationFn: (patient) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminApprovePatient(patient.principal);
    },
    onSuccess: (_, patient) => {
      ue.success(`Pasien ${patient.fullName} berhasil diverifikasi.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => ue.error("Gagal memverifikasi pasien. Coba lagi.")
  });
  const rejectMutation = useMutation({
    mutationFn: (patient) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminRejectPatient(patient.principal);
    },
    onSuccess: (_, patient) => {
      ue.success(`Pendaftaran ${patient.fullName} telah ditolak.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => ue.error("Gagal menolak pasien. Coba lagi.")
  });
  const isActionLoading = approveMutation.isPending || rejectMutation.isPending;
  const currentList = tab === "pending" ? pendingPatients : allPatients;
  const isLoading = tab === "pending" ? pendingLoading : allLoading;
  function statusBadge(status) {
    if (status === "verified")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-100 text-emerald-700 border-emerald-300", children: "✅ Terverifikasi" });
    if (status === "rejected")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-red-300", children: "❌ Ditolak" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 border-amber-300", children: "⏳ Menunggu" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-1", children: "Verifikasi Data Pasien" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg", children: "Tinjau dan verifikasi pendaftaran pasien baru" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex rounded-xl border border-border overflow-hidden mb-8",
          "data-ocid": "admin.patients.tab",
          children: ["pending", "all"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTab(t),
              className: `flex-1 py-3 text-base font-semibold transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
              "data-ocid": `admin.patients.${t}_tab`,
              children: t === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                "Menunggu Verifikasi",
                pendingPatients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-destructive text-white text-xs rounded-full px-2 py-0.5", children: pendingPatients.length })
              ] }) : "Semua Pasien"
            },
            t
          ))
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-20",
          "data-ocid": "admin.patients.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat data pasien..." })
        }
      ) : currentList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 text-muted-foreground",
          "data-ocid": "admin.patients.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 56, className: "mx-auto mb-4 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold mb-1", children: tab === "pending" ? "Tidak ada pasien yang menunggu verifikasi" : "Belum ada data pasien" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: tab === "pending" ? "Semua pendaftaran sudah diproses" : "Pasien yang mendaftar akan muncul di sini" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: currentList.map((patient, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `admin.patients.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground truncate", children: patient.fullName }),
                statusBadge(patient.verificationStatus)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "NIK:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: patient.nik })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Didaftarkan:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatDate(patient.submittedAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "break-all text-xs opacity-70", children: [
                  "Principal: ",
                  patient.principal.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-3 flex-wrap", children: [
                patient.ktpPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: patient.ktpPhotoUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1 text-sm text-primary underline hover:opacity-80",
                    "data-ocid": `admin.patients.ktp_link.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
                      " Lihat KTP"
                    ]
                  }
                ),
                patient.selfieUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: patient.selfieUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1 text-sm text-primary underline hover:opacity-80",
                    "data-ocid": `admin.patients.selfie_link.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
                      " Lihat Selfie+KTP"
                    ]
                  }
                )
              ] })
            ] }),
            tab === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white gap-2",
                  disabled: isActionLoading,
                  onClick: () => approveMutation.mutate(patient),
                  "data-ocid": `admin.patients.verify_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 }),
                    " Verifikasi"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  variant: "destructive",
                  className: "gap-2",
                  disabled: isActionLoading,
                  onClick: () => rejectMutation.mutate(patient),
                  "data-ocid": `admin.patients.reject_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18 }),
                    " Tolak"
                  ]
                }
              )
            ] })
          ] }) })
        },
        patient.principal.toString()
      )) })
    ] })
  ] });
}
export {
  AdminPatients as default
};
