import { type PatientSummary, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  ExternalLink,
  Search,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type TabKey = "semua" | "aktif" | "ditangguhkan" | "menunggu";
const TABS: {
  key: TabKey;
  label: string;
  filter: (p: PatientSummary) => boolean;
}[] = [
  { key: "semua", label: "Semua", filter: () => true },
  {
    key: "aktif",
    label: "Aktif",
    filter: (p) =>
      p.verificationStatus === "verified" || p.verificationStatus === "active",
  },
  {
    key: "ditangguhkan",
    label: "Ditangguhkan",
    filter: (p) => p.verificationStatus === "suspended",
  },
  {
    key: "menunggu",
    label: "Menunggu Verifikasi",
    filter: (p) =>
      p.verificationStatus === "pending" ||
      p.verificationStatus === "pending_verification",
  },
];

type ConfirmAction =
  | { type: "suspend"; patient: PatientSummary }
  | { type: "delete"; patient: PatientSummary }
  | null;

type ActorExt = {
  suspendUser?: (p: unknown) => Promise<unknown>;
  activateUser?: (p: unknown) => Promise<unknown>;
  deleteUser?: (p: unknown) => Promise<unknown>;
};

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  if (status === "verified" || status === "active")
    return (
      <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
        ✅ Aktif
      </Badge>
    );
  if (status === "suspended")
    return (
      <Badge className="bg-red-100 text-red-700 border border-red-300 font-semibold">
        🚫 Ditangguhkan
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge className="bg-red-100 text-red-700 border border-red-300 font-semibold">
        ❌ Ditolak
      </Badge>
    );
  return (
    <Badge className="bg-amber-100 text-amber-700 border border-amber-300 font-semibold">
      ⏳ Menunggu Verifikasi
    </Badge>
  );
}

export default function AdminPatients() {
  const [tab, setTab] = useState<TabKey>("semua");
  const [search, setSearch] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: pendingPatients = [], isLoading: pendingLoading } = useQuery<
    PatientSummary[]
  >({
    queryKey: ["admin", "pendingPatients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingPatients();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });

  const { data: allPatients = [], isLoading: allLoading } = useQuery<
    PatientSummary[]
  >({
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
        verificationStatus: p.verificationStatus,
      }));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });

  const allPatientsWithPending = useMemo(() => {
    const pendingSet = new Set(
      pendingPatients.map((p) => p.principal.toString()),
    );
    return [
      ...pendingPatients,
      ...allPatients.filter((p) => !pendingSet.has(p.principal.toString())),
    ];
  }, [allPatients, pendingPatients]);

  const filteredByTab = useMemo(() => {
    const def = TABS.find((t) => t.key === tab);
    return def
      ? allPatientsWithPending.filter(def.filter)
      : allPatientsWithPending;
  }, [tab, allPatientsWithPending]);

  const filteredList = useMemo(() => {
    if (!search.trim()) return filteredByTab;
    const q = search.toLowerCase();
    return filteredByTab.filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.nik.toLowerCase().includes(q) ||
        p.principal.toString().toLowerCase().includes(q),
    );
  }, [filteredByTab, search]);

  const tabCounts = useMemo(() => {
    const c: Record<TabKey, number> = {
      semua: 0,
      aktif: 0,
      ditangguhkan: 0,
      menunggu: 0,
    };
    for (const p of allPatientsWithPending) {
      c.semua++;
      if (
        p.verificationStatus === "verified" ||
        p.verificationStatus === "active"
      )
        c.aktif++;
      else if (p.verificationStatus === "suspended") c.ditangguhkan++;
      else if (
        p.verificationStatus === "pending" ||
        p.verificationStatus === "pending_verification"
      )
        c.menunggu++;
    }
    return c;
  }, [allPatientsWithPending]);

  const approveMutation = useMutation({
    mutationFn: (p: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminApprovePatient(p.principal);
    },
    onSuccess: (_, p) => {
      toast.success(`Pasien ${p.fullName} berhasil diverifikasi.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => toast.error("Gagal memverifikasi pasien."),
  });

  const rejectMutation = useMutation({
    mutationFn: (p: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminRejectPatient(p.principal);
    },
    onSuccess: (_, p) => {
      toast.success(`Pendaftaran ${p.fullName} telah ditolak.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => toast.error("Gagal menolak pasien."),
  });

  const suspendMutation = useMutation({
    mutationFn: async (p: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor as unknown as ActorExt;
      if (typeof ext.suspendUser === "function")
        return ext.suspendUser(p.principal);
      throw new Error("suspendUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      toast.success(`Akun ${p.fullName} telah ditangguhkan.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) =>
      toast.error(
        `Gagal menangguhkan: ${err instanceof Error ? err.message : "Coba lagi."}`,
      ),
  });

  const activateMutation = useMutation({
    mutationFn: async (p: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor as unknown as ActorExt;
      if (typeof ext.activateUser === "function")
        return ext.activateUser(p.principal);
      throw new Error("activateUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      toast.success(`Akun ${p.fullName} telah diaktifkan kembali.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) =>
      toast.error(
        `Gagal mengaktifkan: ${err instanceof Error ? err.message : "Coba lagi."}`,
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: async (p: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      const ext = actor as unknown as ActorExt;
      if (typeof ext.deleteUser === "function")
        return ext.deleteUser(p.principal);
      throw new Error("deleteUser belum tersedia di backend");
    },
    onSuccess: (_, p) => {
      toast.success(`Akun ${p.fullName} telah dihapus.`);
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
    },
    onError: (err) =>
      toast.error(
        `Gagal menghapus: ${err instanceof Error ? err.message : "Coba lagi."}`,
      ),
  });

  const isActionLoading =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    suspendMutation.isPending ||
    activateMutation.isPending ||
    deleteMutation.isPending;

  function handleConfirm() {
    if (!confirmAction) return;
    if (confirmAction.type === "suspend")
      suspendMutation.mutate(confirmAction.patient);
    else if (confirmAction.type === "delete")
      deleteMutation.mutate(confirmAction.patient);
    setConfirmAction(null);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="text-white py-10 px-4"
        style={{ background: "linear-gradient(to right, #0a4d3c, #1a7a5e)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Manajemen Pasien</h1>
          <p className="text-white/80 text-lg">
            Kelola, verifikasi, dan pantau seluruh akun pasien
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="Cari nama, NIK, atau principal pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 text-base"
            data-ocid="admin.patients.search_input"
          />
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl border border-border overflow-hidden mb-8"
          data-ocid="admin.patients.tab"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                tab === t.key
                  ? "text-white"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
              style={tab === t.key ? { background: "#0a4d3c" } : undefined}
              data-ocid={`admin.patients.${t.key}_tab`}
            >
              {t.label}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                  tab === t.key
                    ? "bg-white/20 text-white"
                    : t.key === "menunggu" && tabCounts.menunggu > 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {tabCounts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {pendingLoading || allLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="admin.patients.loading_state"
          >
            <LoadingSpinner size="lg" label="Memuat data pasien..." />
          </div>
        ) : filteredList.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="admin.patients.empty_state"
          >
            <User size={56} className="mx-auto mb-4 opacity-30" />
            <p className="text-xl font-semibold mb-1">
              {search ? "Tidak ada hasil pencarian" : "Tidak ada data pasien"}
            </p>
            <p className="text-base">
              {search
                ? "Coba kata kunci lain"
                : "Pasien yang mendaftar akan muncul di sini"}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden shadow-sm">
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-sm font-semibold text-white"
              style={{ background: "#0a4d3c" }}
            >
              <span>Nama Pasien</span>
              <span>NIK</span>
              <span>Status</span>
              <span className="text-right">Aksi</span>
            </div>

            {filteredList.map((patient, idx) => {
              const isPending =
                patient.verificationStatus === "pending" ||
                patient.verificationStatus === "pending_verification";
              const isActive =
                patient.verificationStatus === "verified" ||
                patient.verificationStatus === "active";
              const isSuspended = patient.verificationStatus === "suspended";

              return (
                <div
                  key={patient.principal.toString()}
                  className={`grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center border-t border-border text-sm ${
                    idx % 2 === 0 ? "bg-card" : "bg-background"
                  }`}
                  data-ocid={`admin.patients.item.${idx + 1}`}
                >
                  {/* Name */}
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {patient.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(patient.submittedAt)}
                    </p>
                    <div className="flex gap-2 mt-1">
                      {patient.ktpPhotoUrl && (
                        <a
                          href={patient.ktpPhotoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-xs text-primary underline hover:opacity-80"
                          data-ocid={`admin.patients.ktp_link.${idx + 1}`}
                        >
                          <ExternalLink size={11} /> KTP
                        </a>
                      )}
                      {patient.selfieUrl && (
                        <a
                          href={patient.selfieUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-xs text-primary underline hover:opacity-80"
                          data-ocid={`admin.patients.selfie_link.${idx + 1}`}
                        >
                          <ExternalLink size={11} /> Selfie
                        </a>
                      )}
                    </div>
                  </div>

                  {/* NIK */}
                  <div className="font-mono text-foreground text-xs truncate">
                    {patient.nik}
                  </div>

                  {/* Status */}
                  <StatusBadge status={patient.verificationStatus} />

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end flex-wrap">
                    {isPending && (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5 text-xs"
                          disabled={isActionLoading}
                          onClick={() => approveMutation.mutate(patient)}
                          data-ocid={`admin.patients.verify_button.${idx + 1}`}
                        >
                          <CheckCircle size={14} /> Verifikasi
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 gap-1.5 text-xs"
                          disabled={isActionLoading}
                          onClick={() => rejectMutation.mutate(patient)}
                          data-ocid={`admin.patients.reject_button.${idx + 1}`}
                        >
                          <XCircle size={14} /> Tolak
                        </Button>
                      </>
                    )}

                    {isActive && (
                      <Button
                        type="button"
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
                        disabled={isActionLoading}
                        onClick={() =>
                          setConfirmAction({ type: "suspend", patient })
                        }
                        data-ocid={`admin.patients.suspend_button.${idx + 1}`}
                      >
                        Nonaktifkan
                      </Button>
                    )}

                    {isSuspended && (
                      <Button
                        type="button"
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs"
                        disabled={isActionLoading}
                        onClick={() => activateMutation.mutate(patient)}
                        data-ocid={`admin.patients.activate_button.${idx + 1}`}
                      >
                        <CheckCircle size={14} /> Aktifkan
                      </Button>
                    )}

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 text-xs"
                      disabled={isActionLoading}
                      onClick={() =>
                        setConfirmAction({ type: "delete", patient })
                      }
                      data-ocid={`admin.patients.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal — Suspend */}
      <Dialog
        open={confirmAction?.type === "suspend"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <DialogContent data-ocid="admin.patients.suspend.dialog">
          <DialogHeader>
            <DialogTitle>Nonaktifkan Akun Pasien?</DialogTitle>
            <DialogDescription>
              Akun{" "}
              <strong>
                {confirmAction?.type === "suspend"
                  ? confirmAction.patient.fullName
                  : ""}
              </strong>{" "}
              akan ditangguhkan. Pasien tidak dapat login hingga diaktifkan
              kembali.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmAction(null)}
              data-ocid="admin.patients.suspend.cancel_button"
            >
              Batal
            </Button>
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleConfirm}
              disabled={suspendMutation.isPending}
              data-ocid="admin.patients.suspend.confirm_button"
            >
              Ya, Nonaktifkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal — Delete */}
      <Dialog
        open={confirmAction?.type === "delete"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <DialogContent data-ocid="admin.patients.delete.dialog">
          <DialogHeader>
            <DialogTitle>Hapus Akun Pasien?</DialogTitle>
            <DialogDescription>
              Akun{" "}
              <strong>
                {confirmAction?.type === "delete"
                  ? confirmAction.patient.fullName
                  : ""}
              </strong>{" "}
              akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmAction(null)}
              data-ocid="admin.patients.delete.cancel_button"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={deleteMutation.isPending}
              data-ocid="admin.patients.delete.confirm_button"
            >
              <Trash2 size={15} className="mr-1" /> Ya, Hapus Permanen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
