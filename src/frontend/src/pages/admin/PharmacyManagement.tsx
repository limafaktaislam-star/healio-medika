import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { Edit2, MapPin, Package, Phone, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DrugStock {
  id: string;
  name: string;
  stock: number;
  unit: string;
  price: number;
}

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  openHour: string;
  closeHour: string;
  lat: string;
  lng: string;
  drugs: DrugStock[];
}

const INITIAL_PHARMACIES: Pharmacy[] = [
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
        price: 2500,
      },
      {
        id: "D002",
        name: "Amoxicillin 500mg",
        stock: 80,
        unit: "Kapsul",
        price: 5500,
      },
      {
        id: "D003",
        name: "Antasida DOEN",
        stock: 50,
        unit: "Tablet",
        price: 1500,
      },
    ],
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
        price: 3500,
      },
      {
        id: "D005",
        name: "Vitamin C 500mg",
        stock: 300,
        unit: "Tablet",
        price: 1200,
      },
    ],
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
        price: 800,
      },
      {
        id: "D007",
        name: "Salep Betametason",
        stock: 60,
        unit: "Tube",
        price: 18000,
      },
    ],
  },
];

function isOpen(openHour: string, closeHour: string): boolean {
  const now = new Date();
  const [oh, om] = openHour.split(":").map(Number);
  const [ch, cm] = closeHour.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= oh * 60 + om && cur <= ch * 60 + cm;
}

const EMPTY_FORM = (): Omit<Pharmacy, "id" | "drugs"> => ({
  name: "",
  address: "",
  city: "",
  phone: "",
  openHour: "07:00",
  closeHour: "21:00",
  lat: "",
  lng: "",
});

export default function PharmacyManagement() {
  const { actor } = useActor(createActor);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(INITIAL_PHARMACIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Pharmacy | null>(null);
  const [stockTarget, setStockTarget] = useState<Pharmacy | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Pharmacy | null>(null);
  const [form, setForm] = useState(EMPTY_FORM());
  const [newDrug, setNewDrug] = useState({
    name: "",
    stock: 0,
    unit: "",
    price: 0,
  });

  useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const list = await (actor as any).getPharmacies();
        if (list && list.length > 0) {
          setPharmacies(
            list.map((p: any) => ({
              id: Number(p.id),
              name: p.name,
              address: p.address,
              city: p.city || "",
              phone: p.phone,
              openHour: p.openTime,
              closeHour: p.closeTime,
              lat: String(p.lat),
              lng: String(p.lon),
              drugs: [],
            })),
          );
        }
      } catch {}
    })();
  }, [actor]);

  const openAdd = () => {
    setForm(EMPTY_FORM());
    setEditTarget(null);
    setShowAddModal(true);
  };

  const openEdit = (p: Pharmacy) => {
    setForm({
      name: p.name,
      address: p.address,
      city: p.city,
      phone: p.phone,
      openHour: p.openHour,
      closeHour: p.closeHour,
      lat: p.lat,
      lng: p.lng,
    });
    setEditTarget(p);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.address) {
      toast.error("Nama apotek dan alamat wajib diisi");
      return;
    }
    if (editTarget) {
      setPharmacies((prev) =>
        prev.map((p) => (p.id === editTarget.id ? { ...p, ...form } : p)),
      );
      toast.success("Data apotek berhasil diperbarui");
    } else {
      await (actor as any)
        .adminAddPharmacy(
          form.name,
          form.address,
          Number.parseFloat(form.lat || "0"),
          Number.parseFloat(form.lng || "0"),
          form.openHour,
          form.closeHour,
          form.phone,
          "",
        )
        .catch(() => {});
      const newP: Pharmacy = { ...form, id: `P${Date.now()}`, drugs: [] };
      setPharmacies((prev) => [...prev, newP]);
      toast.success("Apotek baru berhasil ditambahkan");
    }
    setShowAddModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPharmacies((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`Apotek ${deleteTarget.name} dihapus`);
    setDeleteTarget(null);
  };

  const handleAddDrug = () => {
    if (!newDrug.name || !stockTarget) return;
    const drug: DrugStock = { id: `D${Date.now()}`, ...newDrug };
    setPharmacies((prev) =>
      prev.map((p) =>
        p.id === stockTarget.id ? { ...p, drugs: [...p.drugs, drug] } : p,
      ),
    );
    setStockTarget((prev) =>
      prev ? { ...prev, drugs: [...prev.drugs, drug] } : null,
    );
    setNewDrug({ name: "", stock: 0, unit: "", price: 0 });
    toast.success("Obat berhasil ditambahkan");
  };

  const handleDeleteDrug = (pharmacyId: string, drugId: string) => {
    setPharmacies((prev) =>
      prev.map((p) =>
        p.id === pharmacyId
          ? { ...p, drugs: p.drugs.filter((d) => d.id !== drugId) }
          : p,
      ),
    );
    setStockTarget((prev) =>
      prev
        ? { ...prev, drugs: prev.drugs.filter((d) => d.id !== drugId) }
        : null,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
              <Package size={28} /> Manajemen Apotek
            </h1>
            <p className="text-white/75 text-base">
              Kelola apotek mitra dan stok obat
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
            data-ocid="pharmacy.add_button"
          >
            <Plus size={16} /> Tambah Apotek
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{ background: "#0a4d3c" }}
                  className="text-white text-xs uppercase tracking-wider"
                >
                  <th className="px-4 py-3 text-left">Nama Apotek</th>
                  <th className="px-4 py-3 text-left">Alamat</th>
                  <th className="px-4 py-3 text-left">Telepon</th>
                  <th className="px-4 py-3 text-left">Jam</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pharmacies.map((p, idx) => {
                  const open = isOpen(p.openHour, p.closeHour);
                  return (
                    <tr
                      key={p.id}
                      className={`border-t border-border transition-colors hover:bg-muted/50 ${
                        idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                      data-ocid={`pharmacy.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-primary shrink-0" />
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[200px]">
                        {p.address}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone size={12} />
                          {p.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {p.openHour} – {p.closeHour}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            open
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                              : "bg-red-100 text-red-700 border-red-300"
                          }
                        >
                          {open ? "Buka" : "Tutup"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-1 text-xs"
                            onClick={() => openEdit(p)}
                            data-ocid={`pharmacy.edit_button.${idx + 1}`}
                          >
                            <Edit2 size={12} /> Edit
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-1 text-xs border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => setStockTarget(p)}
                            data-ocid={`pharmacy.stock_button.${idx + 1}`}
                          >
                            <Package size={12} /> Kelola Stok
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="gap-1 text-xs"
                            onClick={() => setDeleteTarget(p)}
                            data-ocid={`pharmacy.delete_button.${idx + 1}`}
                          >
                            <Trash2 size={12} /> Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Pharmacy Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          data-ocid="pharmacy.dialog"
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editTarget ? "Edit Apotek" : "Tambah Apotek Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="pharmacy.close_button"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  label: "Nama Apotek",
                  key: "name",
                  placeholder: "Apotek Healio Medika — Cabang ...",
                },
                { label: "Alamat", key: "address", placeholder: "Jl. ..." },
                { label: "Kota", key: "city", placeholder: "Jakarta" },
                {
                  label: "Telepon/WA",
                  key: "phone",
                  placeholder: "021-xxxx-xxxx",
                },
                {
                  label: "Koordinat Latitude",
                  key: "lat",
                  placeholder: "-6.2088",
                },
                {
                  label: "Koordinat Longitude",
                  key: "lng",
                  placeholder: "106.8456",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={`pharmacy-${f.key}`}
                    className="block text-sm font-semibold text-foreground mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    id={`pharmacy-${f.key}`}
                    type="text"
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    placeholder={f.placeholder}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pharmacy-open-hour"
                    className="block text-sm font-semibold text-foreground mb-1"
                  >
                    Jam Buka
                  </label>
                  <input
                    id="pharmacy-open-hour"
                    type="time"
                    value={form.openHour}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, openHour: e.target.value }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pharmacy-close-hour"
                    className="block text-sm font-semibold text-foreground mb-1"
                  >
                    Jam Tutup
                  </label>
                  <input
                    id="pharmacy-close-hour"
                    type="time"
                    value={form.closeHour}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        closeHour: e.target.value,
                      }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
                data-ocid="pharmacy.cancel_button"
              >
                Batal
              </Button>
              <Button
                type="button"
                className="flex-1 bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white"
                onClick={handleSave}
                data-ocid="pharmacy.confirm_button"
              >
                {editTarget ? "Simpan Perubahan" : "Tambah Apotek"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Stock Modal */}
      {stockTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          data-ocid="pharmacy.stock_dialog"
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                Kelola Stok — {stockTarget.name}
              </h2>
              <button
                type="button"
                onClick={() => setStockTarget(null)}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="pharmacy.stock_close_button"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Add Drug Row */}
              <div className="bg-muted/30 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
                <div>
                  <label
                    htmlFor="pharmacy-drug-name"
                    className="text-xs font-semibold text-muted-foreground mb-1 block"
                  >
                    Nama Obat
                  </label>
                  <input
                    id="pharmacy-drug-name"
                    type="text"
                    value={newDrug.name}
                    onChange={(e) =>
                      setNewDrug((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Paracetamol ..."
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pharmacy-drug-stock"
                    className="text-xs font-semibold text-muted-foreground mb-1 block"
                  >
                    Stok
                  </label>
                  <input
                    id="pharmacy-drug-stock"
                    type="number"
                    min={0}
                    value={newDrug.stock}
                    onChange={(e) =>
                      setNewDrug((p) => ({
                        ...p,
                        stock: Number(e.target.value),
                      }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pharmacy-drug-unit"
                    className="text-xs font-semibold text-muted-foreground mb-1 block"
                  >
                    Satuan
                  </label>
                  <input
                    id="pharmacy-drug-unit"
                    type="text"
                    value={newDrug.unit}
                    onChange={(e) =>
                      setNewDrug((p) => ({ ...p, unit: e.target.value }))
                    }
                    placeholder="Tablet"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddDrug}
                  className="bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white gap-1 text-sm"
                  data-ocid="pharmacy.add_drug_button"
                >
                  <Plus size={14} /> Tambah
                </Button>
              </div>

              {/* Drug Table */}
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{ background: "#0a4d3c" }}
                      className="text-white text-xs uppercase"
                    >
                      <th className="px-4 py-2 text-left">Nama Obat</th>
                      <th className="px-4 py-2 text-right">Stok</th>
                      <th className="px-4 py-2 text-left">Satuan</th>
                      <th className="px-4 py-2 text-right">Harga</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {stockTarget.drugs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Belum ada obat — tambahkan di atas
                        </td>
                      </tr>
                    ) : (
                      stockTarget.drugs.map((d, di) => (
                        <tr
                          key={d.id}
                          className={`border-t border-border ${
                            di % 2 === 0 ? "bg-background" : "bg-muted/20"
                          }`}
                        >
                          <td className="px-4 py-2 font-medium text-foreground">
                            {d.name}
                          </td>
                          <td className="px-4 py-2 text-right font-mono text-foreground">
                            {d.stock}
                          </td>
                          <td className="px-4 py-2 text-muted-foreground">
                            {d.unit}
                          </td>
                          <td className="px-4 py-2 text-right font-mono text-foreground">
                            Rp{d.price.toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteDrug(stockTarget.id, d.id)
                              }
                              className="text-destructive hover:opacity-70 transition-opacity"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          data-ocid="pharmacy.delete_dialog"
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Hapus Apotek?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              <strong>{deleteTarget.name}</strong> dan seluruh data stok obatnya
              akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteTarget(null)}
                data-ocid="pharmacy.delete_cancel_button"
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
                data-ocid="pharmacy.delete_confirm_button"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
