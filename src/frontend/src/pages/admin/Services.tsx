import { type Service, type ServiceCategory, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  PackagePlus,
  Pencil,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS = [
  { value: "dokter", label: "Dokter" },
  { value: "perawat", label: "Perawat" },
  { value: "bidan", label: "Bidan" },
  { value: "fisioterapi", label: "Fisioterapi" },
  { value: "ambulans", label: "Ambulans" },
  { value: "apotek", label: "Apotek" },
];

function getCategoryLabel(cat: ServiceCategory): string {
  return (
    CATEGORY_OPTIONS.find((o) => o.value === (cat as string))?.label ??
    (cat as string)
  );
}

function formatRupiah(amount: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

function buildCategory(value: string): ServiceCategory {
  return value as ServiceCategory;
}

type FormState = {
  name: string;
  description: string;
  category: string;
  baseFee: string;
};
const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "dokter",
  baseFee: "",
};

export default function AdminServices() {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllServices();
    },
    enabled: !!actor && !isFetching,
  });

  const createMutation = useMutation({
    mutationFn: (f: FormState) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminCreateService(
        f.name,
        f.description,
        buildCategory(f.category),
        BigInt(f.baseFee || "0"),
      );
    },
    onSuccess: () => {
      toast.success("Layanan berhasil ditambahkan");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      setShowAdd(false);
      setForm(EMPTY_FORM);
    },
    onError: () => toast.error("Gagal menambahkan layanan"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, f }: { id: bigint; f: FormState }) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminUpdateService(
        id,
        f.name,
        f.description,
        BigInt(f.baseFee || "0"),
      );
    },
    onSuccess: () => {
      toast.success("Layanan berhasil diperbarui");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      setEditingId(null);
      setForm(EMPTY_FORM);
    },
    onError: () => toast.error("Gagal memperbarui layanan"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminDeleteService(id);
    },
    onSuccess: () => {
      toast.success("Layanan dihapus");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: () => toast.error("Gagal menghapus layanan"),
  });

  const seedMutation = useMutation({
    mutationFn: () => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.seedDefaultServices();
    },
    onSuccess: () => {
      toast.success("Layanan default berhasil ditambahkan");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: () => toast.error("Gagal menambah layanan default"),
  });

  function startEdit(s: Service) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description,
      category: s.category as string,
      baseFee: s.baseFeeIdr.toString(),
    });
    setShowAdd(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowAdd(false);
  }

  return (
    <div className="space-y-6 p-6" data-ocid="admin.services.page">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">
            Katalog Layanan
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Kelola layanan homecare yang tersedia
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="lg"
            variant="outline"
            onClick={() => seedMutation.mutate()}
            disabled={seedMutation.isPending}
            data-ocid="admin.services.seed_button"
          >
            <PackagePlus className="w-5 h-5 mr-2" /> Tambahkan Layanan Default
          </Button>
          <Button
            size="lg"
            onClick={() => {
              setShowAdd(true);
              setEditingId(null);
              setForm(EMPTY_FORM);
            }}
            data-ocid="admin.services.add_button"
          >
            <Plus className="w-5 h-5 mr-2" /> Tambah Layanan
          </Button>
        </div>
      </div>

      {(showAdd || editingId !== null) && (
        <Card
          className="border-2 border-primary/30 shadow-md"
          data-ocid="admin.services.form_card"
        >
          <CardHeader>
            <CardTitle>
              {editingId !== null ? "Edit Layanan" : "Tambah Layanan Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="svc-name"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Nama Layanan
                </label>
                <input
                  id="svc-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Nama layanan"
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  data-ocid="admin.services.name_input"
                />
              </div>
              <div>
                <label
                  htmlFor="svc-category"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Kategori
                </label>
                <select
                  id="svc-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  data-ocid="admin.services.category_select"
                >
                  {CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="svc-description"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Deskripsi
              </label>
              <textarea
                id="svc-description"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Deskripsi layanan"
                rows={3}
                className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                data-ocid="admin.services.description_textarea"
              />
            </div>
            <div>
              <label
                htmlFor="svc-basefee"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Biaya Dasar (Rupiah)
              </label>
              <input
                id="svc-basefee"
                type="number"
                value={form.baseFee}
                onChange={(e) =>
                  setForm((p) => ({ ...p, baseFee: e.target.value }))
                }
                placeholder="Contoh: 150000"
                className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                data-ocid="admin.services.basefee_input"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                onClick={() =>
                  editingId !== null
                    ? updateMutation.mutate({ id: editingId, f: form })
                    : createMutation.mutate(form)
                }
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  !form.name
                }
                data-ocid="admin.services.save_button"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {editingId !== null ? "Simpan Perubahan" : "Tambahkan Layanan"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={cancelEdit}
                data-ocid="admin.services.cancel_button"
              >
                <XCircle className="w-5 h-5 mr-2" /> Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent
            className="py-16 text-center"
            data-ocid="admin.services.empty_state"
          >
            <PackagePlus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Belum ada layanan. Klik "Tambahkan Layanan Default" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Card
              key={s.id.toString()}
              className={`shadow-sm transition-all ${!s.isActive ? "opacity-60" : ""}`}
              data-ocid={`admin.services.item.${i + 1}`}
            >
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-foreground">
                        {s.name}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {getCategoryLabel(s.category)}
                      </span>
                      <span className="text-base font-semibold text-primary">
                        {formatRupiah(s.baseFeeIdr)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(s)}
                      data-ocid={`admin.services.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(s.id)}
                      disabled={deleteMutation.isPending}
                      data-ocid={`admin.services.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
