import { r as reactExports, c as useQueryClient, b as useActor, h as useQuery, N as NurseStatus, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { N as NurseStatusBadge } from "./StatusBadge-DGxNJ-Ri.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, c as CardContent } from "./card-DEkAxztn.js";
import { u as useMutation } from "./useMutation-CzdLgPbW.js";
import { u as ue } from "./index-DjiNClVB.js";
import { T as TriangleAlert } from "./triangle-alert-CjMzrDOX.js";
import { U as UserX } from "./user-x-etedcXoK.js";
import { U as User } from "./user-Dr0P04w_.js";
import { F as FileText } from "./file-text-DNsP0kT1.js";
import { E as ExternalLink } from "./external-link-DWim1nuq.js";
import { C as CircleCheckBig } from "./circle-check-big-MXtBHnv7.js";
import { C as CircleX } from "./circle-x-CaRAT8uj.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { T as Trash2 } from "./trash-2-cnJNmeXL.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function AdminNurses() {
  const [tab, setTab] = reactExports.useState("pending");
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const [suspendConfirm, setSuspendConfirm] = reactExports.useState(
    null
  );
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: pendingNurses = [], isLoading: pendingLoading } = useQuery({
    queryKey: ["admin", "pendingNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNurses();
    },
    enabled: !!actor && !isFetching
  });
  const { data: allNurses = [], isLoading: allLoading } = useQuery({
    queryKey: ["admin", "allNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNurses();
    },
    enabled: !!actor && !isFetching && tab === "all"
  });
  const approveMutation = useMutation({
    mutationFn: (nurse) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.approveNurse(nurse.principal);
    },
    onSuccess: () => {
      ue.success("Perawat berhasil disetujui");
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: () => ue.error("Gagal menyetujui perawat")
  });
  const rejectMutation = useMutation({
    mutationFn: (nurse) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.rejectNurse(nurse.principal);
    },
    onSuccess: () => {
      ue.success("Perawat ditolak");
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: () => ue.error("Gagal menolak perawat")
  });
  const deleteMutation = useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await actor.deleteUser(email);
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal menghapus");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      ue.success("Tenaga medis berhasil dihapus");
      setDeleteConfirm(null);
    },
    onError: () => ue.error("Gagal menghapus tenaga medis")
  });
  const suspendMutation = useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await actor.suspendUser(
        email,
        "Ditangguhkan oleh admin"
      );
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal menangguhkan");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      ue.success("Tenaga medis berhasil ditangguhkan");
      setSuspendConfirm(null);
    },
    onError: () => ue.error("Gagal menangguhkan tenaga medis")
  });
  const activateMutation = useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await actor.activateUser(email);
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal mengaktifkan");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      ue.success("Tenaga medis berhasil diaktifkan");
    },
    onError: () => ue.error("Gagal mengaktifkan tenaga medis")
  });
  const isLoading = tab === "pending" ? pendingLoading : allLoading;
  const allFiltered = tab === "suspended" ? allNurses.filter((n) => n.status === NurseStatus.rejected) : allNurses;
  const nurses = tab === "pending" ? pendingNurses : allFiltered;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", "data-ocid": "admin.nurses.page", children: [
    deleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Hapus Tenaga Medis?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
        "Akun ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteConfirm.name }),
        " akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "flex-1",
            onClick: () => deleteMutation.mutate(deleteConfirm.email ?? ""),
            disabled: deleteMutation.isPending,
            "data-ocid": "admin.nurses.confirm_delete_button",
            children: "Ya, Hapus"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setDeleteConfirm(null),
            "data-ocid": "admin.nurses.cancel_delete_button",
            children: "Batal"
          }
        )
      ] })
    ] }) }),
    suspendConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-8 h-8 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Tangguhkan Akun?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
        "Akun ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: suspendConfirm.name }),
        " akan ditangguhkan. Tenaga medis tidak bisa menerima order hingga diaktifkan kembali."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white",
            onClick: () => suspendMutation.mutate(suspendConfirm.email ?? ""),
            disabled: suspendMutation.isPending,
            "data-ocid": "admin.nurses.confirm_suspend_button",
            children: "Ya, Tangguhkan"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setSuspendConfirm(null),
            "data-ocid": "admin.nurses.cancel_suspend_button",
            children: "Batal"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Manajemen Tenaga Medis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Verifikasi dan kelola tenaga medis terdaftar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", "data-ocid": "admin.nurses.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: tab === "pending" ? "default" : "outline",
          onClick: () => setTab("pending"),
          "data-ocid": "admin.nurses.pending_tab",
          children: [
            "Menunggu Verifikasi",
            pendingNurses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5", children: pendingNurses.length })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: tab === "all" ? "default" : "outline",
          onClick: () => setTab("all"),
          "data-ocid": "admin.nurses.all_tab",
          children: "Semua Tenaga Medis"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: tab === "suspended" ? "default" : "outline",
          onClick: () => setTab("suspended"),
          "data-ocid": "admin.nurses.suspended_tab",
          children: "Ditangguhkan"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : nurses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "py-16 text-center",
        "data-ocid": "admin.nurses.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: tab === "pending" ? "Tidak ada perawat menunggu verifikasi" : "Belum ada perawat terdaftar" })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: nurses.map((nurse, i) => {
      const strUrl = nurse.strDocUrl || null;
      const ktpUrl = nurse.ktpDocUrl || null;
      const isPending = tab === "pending";
      const isApproving = approveMutation.isPending;
      const isRejecting = rejectMutation.isPending;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-sm",
          "data-ocid": `admin.nurses.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 p-3 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: nurse.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "STR:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: nurse.strNumber })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "Spesialisasi:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: nurse.specialization })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "Pengalaman:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    nurse.experienceYears,
                    " tahun"
                  ] })
                ] }),
                !isPending && nurse.status !== NurseStatus.pending_verification && /* @__PURE__ */ jsxRuntimeExports.jsx(NurseStatusBadge, { status: nurse.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                strUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: strUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1 text-sm text-primary border border-primary/40 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors",
                    "data-ocid": `admin.nurses.str_doc.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                      " Dokumen STR",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                    ]
                  }
                ),
                ktpUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: ktpUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1 text-sm text-primary border border-primary/40 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors",
                    "data-ocid": `admin.nurses.ktp_doc.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                      " Dokumen KTP",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] }),
              isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    onClick: () => approveMutation.mutate(nurse),
                    disabled: isApproving || isRejecting,
                    "data-ocid": `admin.nurses.approve_button.${i + 1}`,
                    className: "bg-green-600 hover:bg-green-700 text-white",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 mr-2" }),
                      " Setujui"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    variant: "destructive",
                    onClick: () => rejectMutation.mutate(nurse),
                    disabled: isApproving || isRejecting,
                    "data-ocid": `admin.nurses.reject_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 mr-2" }),
                      " Tolak"
                    ]
                  }
                )
              ] }),
              !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-amber-600 border-amber-300 hover:bg-amber-50",
                    onClick: () => setSuspendConfirm(nurse),
                    "data-ocid": `admin.nurses.suspend_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-4 h-4 mr-1" }),
                      " Tangguhkan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-emerald-600 border-emerald-300 hover:bg-emerald-50",
                    onClick: () => activateMutation.mutate(nurse.email ?? ""),
                    disabled: activateMutation.isPending,
                    "data-ocid": `admin.nurses.activate_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-1" }),
                      " Aktifkan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-destructive hover:bg-destructive/10",
                    onClick: () => setDeleteConfirm(nurse),
                    "data-ocid": `admin.nurses.delete_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-1" }),
                      " Hapus"
                    ]
                  }
                )
              ] })
            ] })
          ] }) })
        },
        nurse.principal.toString()
      );
    }) })
  ] });
}
export {
  AdminNurses as default
};
