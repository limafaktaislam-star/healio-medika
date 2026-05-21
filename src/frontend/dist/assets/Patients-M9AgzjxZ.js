import { r as reactExports, c as useQueryClient, b as useActor, h as useQuery, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-BkoeXY8l.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { u as useMutation } from "./useMutation-CzdLgPbW.js";
import { u as ue } from "./index-DjiNClVB.js";
import { S as Search } from "./search-C03IfKeY.js";
import { U as User } from "./user-Dr0P04w_.js";
import { E as ExternalLink } from "./external-link-DWim1nuq.js";
import { C as CircleCheckBig } from "./circle-check-big-MXtBHnv7.js";
import { C as CircleX } from "./circle-x-CaRAT8uj.js";
import { T as Trash2 } from "./trash-2-cnJNmeXL.js";
import "./index-DwWczsLF.js";
import "./x-C_WyrZk7.js";
import "./createLucideIcon-BbcVMltS.js";
const TABS = [
  { key: "semua", label: "Semua", filter: () => true },
  {
    key: "aktif",
    label: "Aktif",
    filter: (p) => p.verificationStatus === "verified" || p.verificationStatus === "active"
  },
  {
    key: "ditangguhkan",
    label: "Ditangguhkan",
    filter: (p) => p.verificationStatus === "suspended"
  },
  {
    key: "menunggu",
    label: "Menunggu Verifikasi",
    filter: (p) => p.verificationStatus === "pending" || p.verificationStatus === "pending_verification"
  }
];
function formatDate(ns) {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function StatusBadge({ status }) {
  if (status === "verified" || status === "active")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold", children: "✅ Aktif" });
  if (status === "suspended")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border border-red-300 font-semibold", children: "🚫 Ditangguhkan" });
  if (status === "rejected")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border border-red-300 font-semibold", children: "❌ Ditolak" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 border border-amber-300 font-semibold", children: "⏳ Menunggu Verifikasi" });
}
function AdminPatients() {
  const [tab, setTab] = reactExports.useState("semua");
  const [search, setSearch] = reactExports.useState("");
  const [confirmAction, setConfirmAction] = reactExports.useState(null);
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
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
  const allPatientsWithPending = reactExports.useMemo(() => {
    const pendingSet = new Set(
      pendingPatients.map((p) => p.principal.toString())
    );
    return [
      ...pendingPatients,
      ...allPatients.filter((p) => !pendingSet.has(p.principal.toString()))
    ];
  }, [allPatients, pendingPatients]);
  const filteredByTab = reactExports.useMemo(() => {
    const def = TABS.find((t) => t.key === tab);
    return def ? allPatientsWithPending.filter(def.filter) : allPatientsWithPending;
  }, [tab, allPatientsWithPending]);
  const filteredList = reactExports.useMemo(() => {
    if (!search.trim()) return filteredByTab;
    const q = search.toLowerCase();
    return filteredByTab.filter(
      (p) => p.fullName.toLowerCase().includes(q) || p.nik.toLowerCase().includes(q) || p.principal.toString().toLowerCase().includes(q)
    );
  }, [filteredByTab, search]);
  const tabCounts = reactExports.useMemo(() => {
    const c = {
      semua: 0,
      aktif: 0,
      ditangguhkan: 0,
      menunggu: 0
    };
    for (const p of allPatientsWithPending) {
      c.semua++;
      if (p.verificationStatus === "verified" || p.verificationStatus === "active")
        c.aktif++;
      else if (p.verificationStatus === "suspended") c.ditangguhkan++;
      else if (p.verificationStatus === "pending" || p.verificationStatus === "pending_verification")
        c.menunggu++;
    }
    return c;
  }, [allPatientsWithPending]);
  const approveMutation = useMutation({
    mutationFn: (p) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminApprovePatient(p.principal);
    },
    onSuccess: (_, p) => {
      ue.success(`Pasien ${p.fullName} berhasil diverifikasi.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => ue.error("Gagal memverifikasi pasien.")
  });
  const rejectMutation = useMutation({
    mutationFn: (p) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminRejectPatient(p.principal);
    },
    onSuccess: (_, p) => {
      ue.success(`Pendaftaran ${p.fullName} telah ditolak.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => ue.error("Gagal menolak pasien.")
  });
  const suspendMutation = useMutation({
    mutationFn: async (p) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor;
      if (typeof ext.suspendUser === "function")
        return ext.suspendUser(p.principal);
      throw new Error("suspendUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      ue.success(`Akun ${p.fullName} telah ditangguhkan.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) => ue.error(
      `Gagal menangguhkan: ${err instanceof Error ? err.message : "Coba lagi."}`
    )
  });
  const activateMutation = useMutation({
    mutationFn: async (p) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor;
      if (typeof ext.activateUser === "function")
        return ext.activateUser(p.principal);
      throw new Error("activateUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      ue.success(`Akun ${p.fullName} telah diaktifkan kembali.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) => ue.error(
      `Gagal mengaktifkan: ${err instanceof Error ? err.message : "Coba lagi."}`
    )
  });
  const deleteMutation = useMutation({
    mutationFn: async (p) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor;
      if (typeof ext.deleteUser === "function")
        return ext.deleteUser(p.principal);
      throw new Error("deleteUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      ue.success(`Akun ${p.fullName} telah dihapus.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) => ue.error(
      `Gagal menghapus: ${err instanceof Error ? err.message : "Coba lagi."}`
    )
  });
  const isActionLoading = approveMutation.isPending || rejectMutation.isPending || suspendMutation.isPending || activateMutation.isPending || deleteMutation.isPending;
  function handleConfirm() {
    if (!confirmAction) return;
    if (confirmAction.type === "suspend")
      suspendMutation.mutate(confirmAction.patient);
    else if (confirmAction.type === "delete")
      deleteMutation.mutate(confirmAction.patient);
    setConfirmAction(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-white py-10 px-4",
        style: { background: "linear-gradient(to right, #0a4d3c, #1a7a5e)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-1", children: "Manajemen Pasien" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg", children: "Kelola, verifikasi, dan pantau seluruh akun pasien" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 18,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: "Cari nama, NIK, atau principal pasien...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-10 h-11 text-base",
            "data-ocid": "admin.patients.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex rounded-xl border border-border overflow-hidden mb-8",
          "data-ocid": "admin.patients.tab",
          children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setTab(t.key),
              className: `flex-1 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${tab === t.key ? "text-white" : "bg-card text-muted-foreground hover:bg-muted"}`,
              style: tab === t.key ? { background: "#0a4d3c" } : void 0,
              "data-ocid": `admin.patients.${t.key}_tab`,
              children: [
                t.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs rounded-full px-1.5 py-0.5 font-bold ${tab === t.key ? "bg-white/20 text-white" : t.key === "menunggu" && tabCounts.menunggu > 0 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`,
                    children: tabCounts[t.key]
                  }
                )
              ]
            },
            t.key
          ))
        }
      ),
      pendingLoading || allLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-20",
          "data-ocid": "admin.patients.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat data pasien..." })
        }
      ) : filteredList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 text-muted-foreground",
          "data-ocid": "admin.patients.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 56, className: "mx-auto mb-4 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold mb-1", children: search ? "Tidak ada hasil pencarian" : "Tidak ada data pasien" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: search ? "Coba kata kunci lain" : "Pasien yang mendaftar akan muncul di sini" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-sm font-semibold text-white",
            style: { background: "#0a4d3c" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nama Pasien" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "NIK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Aksi" })
            ]
          }
        ),
        filteredList.map((patient, idx) => {
          const isPending = patient.verificationStatus === "pending" || patient.verificationStatus === "pending_verification";
          const isActive = patient.verificationStatus === "verified" || patient.verificationStatus === "active";
          const isSuspended = patient.verificationStatus === "suspended";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center border-t border-border text-sm ${idx % 2 === 0 ? "bg-card" : "bg-background"}`,
              "data-ocid": `admin.patients.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: patient.fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(patient.submittedAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
                    patient.ktpPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: patient.ktpPhotoUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "inline-flex items-center gap-0.5 text-xs text-primary underline hover:opacity-80",
                        "data-ocid": `admin.patients.ktp_link.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 11 }),
                          " KTP"
                        ]
                      }
                    ),
                    patient.selfieUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: patient.selfieUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "inline-flex items-center gap-0.5 text-xs text-primary underline hover:opacity-80",
                        "data-ocid": `admin.patients.selfie_link.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 11 }),
                          " Selfie"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-foreground text-xs truncate", children: patient.nik }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: patient.verificationStatus }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end flex-wrap", children: [
                  isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "bg-amber-500 hover:bg-amber-600 text-white gap-1.5 text-xs",
                        disabled: isActionLoading,
                        onClick: () => approveMutation.mutate(patient),
                        "data-ocid": `admin.patients.verify_button.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }),
                          " Verifikasi"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        className: "border-red-300 text-red-600 hover:bg-red-50 gap-1.5 text-xs",
                        disabled: isActionLoading,
                        onClick: () => rejectMutation.mutate(patient),
                        "data-ocid": `admin.patients.reject_button.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14 }),
                          " Tolak"
                        ]
                      }
                    )
                  ] }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-orange-500 hover:bg-orange-600 text-white text-xs",
                      disabled: isActionLoading,
                      onClick: () => setConfirmAction({ type: "suspend", patient }),
                      "data-ocid": `admin.patients.suspend_button.${idx + 1}`,
                      children: "Nonaktifkan"
                    }
                  ),
                  isSuspended && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs",
                      disabled: isActionLoading,
                      onClick: () => activateMutation.mutate(patient),
                      "data-ocid": `admin.patients.activate_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }),
                        " Aktifkan"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      className: "border-red-300 text-red-600 hover:bg-red-50 text-xs",
                      disabled: isActionLoading,
                      onClick: () => setConfirmAction({ type: "delete", patient }),
                      "data-ocid": `admin.patients.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                    }
                  )
                ] })
              ]
            },
            patient.principal.toString()
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: (confirmAction == null ? void 0 : confirmAction.type) === "suspend",
        onOpenChange: (open) => !open && setConfirmAction(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.patients.suspend.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nonaktifkan Akun Pasien?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Akun",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (confirmAction == null ? void 0 : confirmAction.type) === "suspend" ? confirmAction.patient.fullName : "" }),
              " ",
              "akan ditangguhkan. Pasien tidak dapat login hingga diaktifkan kembali."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setConfirmAction(null),
                "data-ocid": "admin.patients.suspend.cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "bg-orange-500 hover:bg-orange-600 text-white",
                onClick: handleConfirm,
                disabled: suspendMutation.isPending,
                "data-ocid": "admin.patients.suspend.confirm_button",
                children: "Ya, Nonaktifkan"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: (confirmAction == null ? void 0 : confirmAction.type) === "delete",
        onOpenChange: (open) => !open && setConfirmAction(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.patients.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Hapus Akun Pasien?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Akun",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (confirmAction == null ? void 0 : confirmAction.type) === "delete" ? confirmAction.patient.fullName : "" }),
              " ",
              "akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setConfirmAction(null),
                "data-ocid": "admin.patients.delete.cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: handleConfirm,
                disabled: deleteMutation.isPending,
                "data-ocid": "admin.patients.delete.confirm_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15, className: "mr-1" }),
                  " Ya, Hapus Permanen"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminPatients as default
};
