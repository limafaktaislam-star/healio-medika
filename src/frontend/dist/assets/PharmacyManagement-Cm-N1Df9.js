import { b as useActor, r as reactExports, j as jsxRuntimeExports, d as createActor } from "./index-CogN6nIg.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { u as ue } from "./index-DjiNClVB.js";
import { P as Package } from "./package-nWSI2ZDW.js";
import { P as Plus } from "./plus-DMhLdqV8.js";
import { M as MapPin } from "./map-pin-B_SUbVCQ.js";
import { P as Phone } from "./phone-BcGg51s1.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { T as Trash2 } from "./trash-2-cnJNmeXL.js";
import { X } from "./x-C_WyrZk7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const INITIAL_PHARMACIES = [
  {
    id: "P001",
    name: "Apotek Healio Medika — Cabang Utama",
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    city: "Jakarta",
    phone: "021-5555-0101",
    openHour: "07:00",
    closeHour: "22:00",
    lat: "-6.2088",
    lng: "106.8456",
    drugs: [
      {
        id: "D001",
        name: "Paracetamol 500mg",
        stock: 200,
        unit: "Tablet",
        price: 2500
      },
      {
        id: "D002",
        name: "Amoxicillin 500mg",
        stock: 80,
        unit: "Kapsul",
        price: 5500
      },
      {
        id: "D003",
        name: "Antasida DOEN",
        stock: 50,
        unit: "Tablet",
        price: 1500
      }
    ]
  },
  {
    id: "P002",
    name: "Apotek Healio Medika — Cabang Selatan",
    address: "Jl. TB Simatupang No. 12, Jakarta Selatan",
    city: "Jakarta",
    phone: "021-7777-0202",
    openHour: "08:00",
    closeHour: "21:00",
    lat: "-6.3018",
    lng: "106.8233",
    drugs: [
      {
        id: "D004",
        name: "Ibuprofen 400mg",
        stock: 120,
        unit: "Tablet",
        price: 3500
      },
      {
        id: "D005",
        name: "Vitamin C 500mg",
        stock: 300,
        unit: "Tablet",
        price: 1200
      }
    ]
  },
  {
    id: "P003",
    name: "Apotek Healio Medika — Cabang Bekasi",
    address: "Jl. Ahmad Yani No. 88, Bekasi",
    city: "Bekasi",
    phone: "021-9999-0303",
    openHour: "07:00",
    closeHour: "23:00",
    lat: "-6.2383",
    lng: "106.9756",
    drugs: [
      {
        id: "D006",
        name: "ORS (Oralit)",
        stock: 400,
        unit: "Sachet",
        price: 800
      },
      {
        id: "D007",
        name: "Salep Betametason",
        stock: 60,
        unit: "Tube",
        price: 18e3
      }
    ]
  }
];
function isOpen(openHour, closeHour) {
  const now = /* @__PURE__ */ new Date();
  const [oh, om] = openHour.split(":").map(Number);
  const [ch, cm] = closeHour.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= oh * 60 + om && cur <= ch * 60 + cm;
}
const EMPTY_FORM = () => ({
  name: "",
  address: "",
  city: "",
  phone: "",
  openHour: "07:00",
  closeHour: "21:00",
  lat: "",
  lng: ""
});
function PharmacyManagement() {
  const { actor } = useActor(createActor);
  const [pharmacies, setPharmacies] = reactExports.useState(INITIAL_PHARMACIES);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [stockTarget, setStockTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM());
  const [newDrug, setNewDrug] = reactExports.useState({
    name: "",
    stock: 0,
    unit: "",
    price: 0
  });
  reactExports.useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const list = await actor.getPharmacies();
        if (list && list.length > 0) {
          setPharmacies(
            list.map((p) => ({
              id: Number(p.id),
              name: p.name,
              address: p.address,
              city: p.city || "",
              phone: p.phone,
              openHour: p.openTime,
              closeHour: p.closeTime,
              lat: String(p.lat),
              lng: String(p.lon),
              drugs: []
            }))
          );
        }
      } catch {
      }
    })();
  }, [actor]);
  const openAdd = () => {
    setForm(EMPTY_FORM());
    setEditTarget(null);
    setShowAddModal(true);
  };
  const openEdit = (p) => {
    setForm({
      name: p.name,
      address: p.address,
      city: p.city,
      phone: p.phone,
      openHour: p.openHour,
      closeHour: p.closeHour,
      lat: p.lat,
      lng: p.lng
    });
    setEditTarget(p);
    setShowAddModal(true);
  };
  const handleSave = async () => {
    if (!form.name || !form.address) {
      ue.error("Nama apotek dan alamat wajib diisi");
      return;
    }
    if (editTarget) {
      setPharmacies(
        (prev) => prev.map((p) => p.id === editTarget.id ? { ...p, ...form } : p)
      );
      ue.success("Data apotek berhasil diperbarui");
    } else {
      await actor.adminAddPharmacy(
        form.name,
        form.address,
        Number.parseFloat(form.lat || "0"),
        Number.parseFloat(form.lng || "0"),
        form.openHour,
        form.closeHour,
        form.phone,
        ""
      ).catch(() => {
      });
      const newP = { ...form, id: `P${Date.now()}`, drugs: [] };
      setPharmacies((prev) => [...prev, newP]);
      ue.success("Apotek baru berhasil ditambahkan");
    }
    setShowAddModal(false);
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    setPharmacies((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    ue.success(`Apotek ${deleteTarget.name} dihapus`);
    setDeleteTarget(null);
  };
  const handleAddDrug = () => {
    if (!newDrug.name || !stockTarget) return;
    const drug = { id: `D${Date.now()}`, ...newDrug };
    setPharmacies(
      (prev) => prev.map(
        (p) => p.id === stockTarget.id ? { ...p, drugs: [...p.drugs, drug] } : p
      )
    );
    setStockTarget(
      (prev) => prev ? { ...prev, drugs: [...prev.drugs, drug] } : null
    );
    setNewDrug({ name: "", stock: 0, unit: "", price: 0 });
    ue.success("Obat berhasil ditambahkan");
  };
  const handleDeleteDrug = (pharmacyId, drugId) => {
    setPharmacies(
      (prev) => prev.map(
        (p) => p.id === pharmacyId ? { ...p, drugs: p.drugs.filter((d) => d.id !== drugId) } : p
      )
    );
    setStockTarget(
      (prev) => prev ? { ...prev, drugs: prev.drugs.filter((d) => d.id !== drugId) } : null
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 28 }),
          " Manajemen Apotek"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-base", children: "Kelola apotek mitra dan stok obat" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openAdd,
          className: "bg-amber-500 hover:bg-amber-600 text-white gap-2",
          "data-ocid": "pharmacy.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Tambah Apotek"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          style: { background: "#0a4d3c" },
          className: "text-white text-xs uppercase tracking-wider",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Nama Apotek" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Alamat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Telepon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Jam" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Aksi" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pharmacies.map((p, idx) => {
        const open = isOpen(p.openHour, p.closeHour);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-t border-border transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`,
            "data-ocid": `pharmacy.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[200px]", children: p.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                p.phone
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: [
                p.openHour,
                " – ",
                p.closeHour
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: open ? "bg-emerald-100 text-emerald-700 border-emerald-300" : "bg-red-100 text-red-700 border-red-300",
                  children: open ? "Buka" : "Tutup"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "gap-1 text-xs",
                    onClick: () => openEdit(p),
                    "data-ocid": `pharmacy.edit_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12 }),
                      " Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "gap-1 text-xs border-blue-300 text-blue-600 hover:bg-blue-50",
                    onClick: () => setStockTarget(p),
                    "data-ocid": `pharmacy.stock_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 12 }),
                      " Kelola Stok"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "destructive",
                    className: "gap-1 text-xs",
                    onClick: () => setDeleteTarget(p),
                    "data-ocid": `pharmacy.delete_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }),
                      " Hapus"
                    ]
                  }
                )
              ] }) })
            ]
          },
          p.id
        );
      }) })
    ] }) }) }) }),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.5)" },
        "data-ocid": "pharmacy.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: editTarget ? "Edit Apotek" : "Tambah Apotek Baru" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowAddModal(false),
                className: "text-muted-foreground hover:text-foreground",
                "data-ocid": "pharmacy.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
            [
              {
                label: "Nama Apotek",
                key: "name",
                placeholder: "Apotek Healio Medika — Cabang ..."
              },
              { label: "Alamat", key: "address", placeholder: "Jl. ..." },
              { label: "Kota", key: "city", placeholder: "Jakarta" },
              {
                label: "Telepon/WA",
                key: "phone",
                placeholder: "021-xxxx-xxxx"
              },
              {
                label: "Koordinat Latitude",
                key: "lat",
                placeholder: "-6.2088"
              },
              {
                label: "Koordinat Longitude",
                key: "lng",
                placeholder: "106.8456"
              }
            ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: `pharmacy-${f.key}`,
                  className: "block text-sm font-semibold text-foreground mb-1",
                  children: f.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: `pharmacy-${f.key}`,
                  type: "text",
                  value: form[f.key],
                  onChange: (e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value })),
                  placeholder: f.placeholder,
                  className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                }
              )
            ] }, f.key)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "pharmacy-open-hour",
                    className: "block text-sm font-semibold text-foreground mb-1",
                    children: "Jam Buka"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pharmacy-open-hour",
                    type: "time",
                    value: form.openHour,
                    onChange: (e) => setForm((prev) => ({ ...prev, openHour: e.target.value })),
                    className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "pharmacy-close-hour",
                    className: "block text-sm font-semibold text-foreground mb-1",
                    children: "Jam Tutup"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pharmacy-close-hour",
                    type: "time",
                    value: form.closeHour,
                    onChange: (e) => setForm((prev) => ({
                      ...prev,
                      closeHour: e.target.value
                    })),
                    className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-6 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowAddModal(false),
                "data-ocid": "pharmacy.cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "flex-1 bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white",
                onClick: handleSave,
                "data-ocid": "pharmacy.confirm_button",
                children: editTarget ? "Simpan Perubahan" : "Tambah Apotek"
              }
            )
          ] })
        ] })
      }
    ),
    stockTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.5)" },
        "data-ocid": "pharmacy.stock_dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-foreground", children: [
              "Kelola Stok — ",
              stockTarget.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStockTarget(null),
                className: "text-muted-foreground hover:text-foreground",
                "data-ocid": "pharmacy.stock_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "pharmacy-drug-name",
                    className: "text-xs font-semibold text-muted-foreground mb-1 block",
                    children: "Nama Obat"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pharmacy-drug-name",
                    type: "text",
                    value: newDrug.name,
                    onChange: (e) => setNewDrug((p) => ({ ...p, name: e.target.value })),
                    placeholder: "Paracetamol ...",
                    className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "pharmacy-drug-stock",
                    className: "text-xs font-semibold text-muted-foreground mb-1 block",
                    children: "Stok"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pharmacy-drug-stock",
                    type: "number",
                    min: 0,
                    value: newDrug.stock,
                    onChange: (e) => setNewDrug((p) => ({
                      ...p,
                      stock: Number(e.target.value)
                    })),
                    className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "pharmacy-drug-unit",
                    className: "text-xs font-semibold text-muted-foreground mb-1 block",
                    children: "Satuan"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pharmacy-drug-unit",
                    type: "text",
                    value: newDrug.unit,
                    onChange: (e) => setNewDrug((p) => ({ ...p, unit: e.target.value })),
                    placeholder: "Tablet",
                    className: "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: handleAddDrug,
                  className: "bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white gap-1 text-sm",
                  "data-ocid": "pharmacy.add_drug_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                    " Tambah"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  style: { background: "#0a4d3c" },
                  className: "text-white text-xs uppercase",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left", children: "Nama Obat" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right", children: "Stok" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left", children: "Satuan" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right", children: "Harga" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stockTarget.drugs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 5,
                  className: "text-center py-8 text-muted-foreground",
                  children: "Belum ada obat — tambahkan di atas"
                }
              ) }) : stockTarget.drugs.map((d, di) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: `border-t border-border ${di % 2 === 0 ? "bg-background" : "bg-muted/20"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-foreground", children: d.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-foreground", children: d.stock }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground", children: d.unit }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right font-mono text-foreground", children: [
                      "Rp",
                      d.price.toLocaleString("id-ID")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleDeleteDrug(stockTarget.id, d.id),
                        className: "text-destructive hover:opacity-70 transition-opacity",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                      }
                    ) })
                  ]
                },
                d.id
              )) })
            ] }) })
          ] })
        ] })
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.55)" },
        "data-ocid": "pharmacy.delete_dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 24, className: "text-red-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "Hapus Apotek?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget.name }),
            " dan seluruh data stok obatnya akan dihapus secara permanen."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteTarget(null),
                "data-ocid": "pharmacy.delete_cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                className: "flex-1",
                onClick: handleDelete,
                "data-ocid": "pharmacy.delete_confirm_button",
                children: "Ya, Hapus"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  PharmacyManagement as default
};
