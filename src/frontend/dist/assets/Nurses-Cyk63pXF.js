import { r as reactExports, a as useQueryClient, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-rLbxkppD.js";
import { u as useActor, a as useQuery, N as NurseStatus, c as createActor } from "./backend-BPbwYxH1.js";
import { N as NurseStatusBadge } from "./StatusBadge-JEsMUvJ7.js";
import { B as Button } from "./button-Dd7iJqhP.js";
import { C as Card, c as CardContent } from "./card-DLDeT03F.js";
import { u as useMutation } from "./useMutation-C7CqhDIx.js";
import { u as ue } from "./index-DoX9CciY.js";
import { U as User } from "./user-CMoDdmFu.js";
import { F as FileText } from "./file-text-BPoxEuFX.js";
import { c as createLucideIcon } from "./createLucideIcon-DLXihIFy.js";
import { C as CircleCheckBig } from "./circle-check-big-BVXe4Uph.js";
import { C as CircleX } from "./circle-x-All0adyx.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function AdminNurses() {
  const [tab, setTab] = reactExports.useState("pending");
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
  const isLoading = tab === "pending" ? pendingLoading : allLoading;
  const nurses = tab === "pending" ? pendingNurses : allNurses;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", "data-ocid": "admin.nurses.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Manajemen Perawat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Verifikasi dan kelola tenaga medis terdaftar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "admin.nurses.tab", children: [
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
          children: "Semua Perawat"
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
