import { r as reactExports, a as useQueryClient, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-rLbxkppD.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BPbwYxH1.js";
import { B as Button } from "./button-Dd7iJqhP.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DLDeT03F.js";
import { u as useMutation } from "./useMutation-C7CqhDIx.js";
import { u as ue } from "./index-DoX9CciY.js";
import { c as createLucideIcon } from "./createLucideIcon-DLXihIFy.js";
import { C as CircleCheckBig } from "./circle-check-big-BVXe4Uph.js";
import { C as CircleX } from "./circle-x-All0adyx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 16h6", key: "100bgy" }],
  ["path", { d: "M19 13v6", key: "85cyf1" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackagePlus = createLucideIcon("package-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const CATEGORY_OPTIONS = [
  { value: "dokter", label: "Dokter" },
  { value: "perawat", label: "Perawat" },
  { value: "bidan", label: "Bidan" },
  { value: "fisioterapi", label: "Fisioterapi" },
  { value: "ambulans", label: "Ambulans" },
  { value: "apotek", label: "Apotek" }
];
function getCategoryLabel(cat) {
  var _a;
  return ((_a = CATEGORY_OPTIONS.find((o) => o.value === cat)) == null ? void 0 : _a.label) ?? cat;
}
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(amount));
}
function buildCategory(value) {
  return value;
}
const EMPTY_FORM = {
  name: "",
  description: "",
  category: "dokter",
  baseFee: ""
};
function AdminServices() {
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllServices();
    },
    enabled: !!actor && !isFetching
  });
  const createMutation = useMutation({
    mutationFn: (f) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminCreateService(
        f.name,
        f.description,
        buildCategory(f.category),
        BigInt(f.baseFee || "0")
      );
    },
    onSuccess: () => {
      ue.success("Layanan berhasil ditambahkan");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      setShowAdd(false);
      setForm(EMPTY_FORM);
    },
    onError: () => ue.error("Gagal menambahkan layanan")
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, f }) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminUpdateService(
        id,
        f.name,
        f.description,
        BigInt(f.baseFee || "0")
      );
    },
    onSuccess: () => {
      ue.success("Layanan berhasil diperbarui");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      setEditingId(null);
      setForm(EMPTY_FORM);
    },
    onError: () => ue.error("Gagal memperbarui layanan")
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminDeleteService(id);
    },
    onSuccess: () => {
      ue.success("Layanan dihapus");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: () => ue.error("Gagal menghapus layanan")
  });
  const seedMutation = useMutation({
    mutationFn: () => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.seedDefaultServices();
    },
    onSuccess: () => {
      ue.success("Layanan default berhasil ditambahkan");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: () => ue.error("Gagal menambah layanan default")
  });
  function startEdit(s) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description,
      category: s.category,
      baseFee: s.baseFeeIdr.toString()
    });
    setShowAdd(false);
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowAdd(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", "data-ocid": "admin.services.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Katalog Layanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Kelola layanan homecare yang tersedia" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            variant: "outline",
            onClick: () => seedMutation.mutate(),
            disabled: seedMutation.isPending,
            "data-ocid": "admin.services.seed_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "w-5 h-5 mr-2" }),
              " Tambahkan Layanan Default"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: () => {
              setShowAdd(true);
              setEditingId(null);
              setForm(EMPTY_FORM);
            },
            "data-ocid": "admin.services.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 mr-2" }),
              " Tambah Layanan"
            ]
          }
        )
      ] })
    ] }),
    (showAdd || editingId !== null) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-2 border-primary/30 shadow-md",
        "data-ocid": "admin.services.form_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: editingId !== null ? "Edit Layanan" : "Tambah Layanan Baru" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "svc-name",
                    className: "block text-sm font-medium text-foreground mb-1",
                    children: "Nama Layanan"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "svc-name",
                    value: form.name,
                    onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
                    placeholder: "Nama layanan",
                    className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "data-ocid": "admin.services.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "svc-category",
                    className: "block text-sm font-medium text-foreground mb-1",
                    children: "Kategori"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "svc-category",
                    value: form.category,
                    onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })),
                    className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "data-ocid": "admin.services.category_select",
                    children: CATEGORY_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "svc-description",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Deskripsi"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "svc-description",
                  value: form.description,
                  onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
                  placeholder: "Deskripsi layanan",
                  rows: 3,
                  className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "data-ocid": "admin.services.description_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "svc-basefee",
                  className: "block text-sm font-medium text-foreground mb-1",
                  children: "Biaya Dasar (Rupiah)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "svc-basefee",
                  type: "number",
                  value: form.baseFee,
                  onChange: (e) => setForm((p) => ({ ...p, baseFee: e.target.value })),
                  placeholder: "Contoh: 150000",
                  className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "data-ocid": "admin.services.basefee_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  onClick: () => editingId !== null ? updateMutation.mutate({ id: editingId, f: form }) : createMutation.mutate(form),
                  disabled: createMutation.isPending || updateMutation.isPending || !form.name,
                  "data-ocid": "admin.services.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 mr-2" }),
                    editingId !== null ? "Simpan Perubahan" : "Tambahkan Layanan"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  onClick: cancelEdit,
                  "data-ocid": "admin.services.cancel_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 mr-2" }),
                    " Batal"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardContent,
      {
        className: "py-16 text-center",
        "data-ocid": "admin.services.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: 'Belum ada layanan. Klik "Tambahkan Layanan Default" untuk memulai.' })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `shadow-sm transition-all ${!s.isActive ? "opacity-60" : ""}`,
        "data-ocid": `admin.services.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${s.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`,
                  children: s.isActive ? "Aktif" : "Nonaktif"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/10 text-primary px-2 py-1 rounded-full", children: getCategoryLabel(s.category) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold text-primary", children: formatRupiah(s.baseFeeIdr) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => startEdit(s),
                "data-ocid": `admin.services.edit_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: () => deleteMutation.mutate(s.id),
                disabled: deleteMutation.isPending,
                "data-ocid": `admin.services.delete_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) })
      },
      s.id.toString()
    )) })
  ] });
}
export {
  AdminServices as default
};
