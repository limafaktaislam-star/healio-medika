import { type NurseProfile, NurseStatus, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NurseStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  FileText,
  RotateCcw,
  Trash2,
  User,
  UserX,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminNurses() {
  const [tab, setTab] = useState<"pending" | "all" | "suspended">("pending");
  const [deleteConfirm, setDeleteConfirm] = useState<NurseProfile | null>(null);
  const [suspendConfirm, setSuspendConfirm] = useState<NurseProfile | null>(
    null,
  );
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: pendingNurses = [], isLoading: pendingLoading } = useQuery<
    NurseProfile[]
  >({
    queryKey: ["admin", "pendingNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNurses();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: allNurses = [], isLoading: allLoading } = useQuery<
    NurseProfile[]
  >({
    queryKey: ["admin", "allNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNurses();
    },
    enabled: !!actor && !isFetching && tab === "all",
  });

  const approveMutation = useMutation({
    mutationFn: (nurse: NurseProfile) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.approveNurse(nurse.principal);
    },
    onSuccess: () => {
      toast.success("Perawat berhasil disetujui");
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: () => toast.error("Gagal menyetujui perawat"),
  });

  const rejectMutation = useMutation({
    mutationFn: (nurse: NurseProfile) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.rejectNurse(nurse.principal);
    },
    onSuccess: () => {
      toast.success("Perawat ditolak");
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: () => toast.error("Gagal menolak perawat"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await (actor as any).deleteUser(email);
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal menghapus");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Tenaga medis berhasil dihapus");
      setDeleteConfirm(null);
    },
    onError: () => toast.error("Gagal menghapus tenaga medis"),
  });

  const suspendMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await (actor as any).suspendUser(
        email,
        "Ditangguhkan oleh admin",
      );
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal menangguhkan");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Tenaga medis berhasil ditangguhkan");
      setSuspendConfirm(null);
    },
    onError: () => toast.error("Gagal menangguhkan tenaga medis"),
  });

  const activateMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("actor tidak siap");
      const result = await (actor as any).activateUser(email);
      if (result && ("err" in result || "notFound" in result))
        throw new Error("Gagal mengaktifkan");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurses"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Tenaga medis berhasil diaktifkan");
    },
    onError: () => toast.error("Gagal mengaktifkan tenaga medis"),
  });

  const isLoading = tab === "pending" ? pendingLoading : allLoading;
  const allFiltered =
    tab === "suspended"
      ? allNurses.filter((n) => n.status === NurseStatus.rejected)
      : allNurses;
  const nurses = tab === "pending" ? pendingNurses : allFiltered;

  return (
    <div className="space-y-6 p-6" data-ocid="admin.nurses.page">
      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="text-xl font-bold">Hapus Tenaga Medis?</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Akun <strong>{deleteConfirm.name}</strong> akan dihapus permanen.
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteMutation.mutate(deleteConfirm.email ?? "")}
                disabled={deleteMutation.isPending}
                data-ocid="admin.nurses.confirm_delete_button"
              >
                Ya, Hapus
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteConfirm(null)}
                data-ocid="admin.nurses.cancel_delete_button"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend confirmation modal */}
      {suspendConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <UserX className="w-8 h-8 text-amber-600" />
              <h2 className="text-xl font-bold">Tangguhkan Akun?</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Akun <strong>{suspendConfirm.name}</strong> akan ditangguhkan.
              Tenaga medis tidak bisa menerima order hingga diaktifkan kembali.
            </p>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() =>
                  suspendMutation.mutate(suspendConfirm.email ?? "")
                }
                disabled={suspendMutation.isPending}
                data-ocid="admin.nurses.confirm_suspend_button"
              >
                Ya, Tangguhkan
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSuspendConfirm(null)}
                data-ocid="admin.nurses.cancel_suspend_button"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-foreground font-display">
          Manajemen Tenaga Medis
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Verifikasi dan kelola tenaga medis terdaftar
        </p>
      </div>

      <div className="flex gap-2 flex-wrap" data-ocid="admin.nurses.tab">
        <Button
          size="lg"
          variant={tab === "pending" ? "default" : "outline"}
          onClick={() => setTab("pending")}
          data-ocid="admin.nurses.pending_tab"
        >
          Menunggu Verifikasi
          {pendingNurses.length > 0 && (
            <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
              {pendingNurses.length}
            </span>
          )}
        </Button>
        <Button
          size="lg"
          variant={tab === "all" ? "default" : "outline"}
          onClick={() => setTab("all")}
          data-ocid="admin.nurses.all_tab"
        >
          Semua Tenaga Medis
        </Button>
        <Button
          size="lg"
          variant={tab === "suspended" ? "default" : "outline"}
          onClick={() => setTab("suspended")}
          data-ocid="admin.nurses.suspended_tab"
        >
          Ditangguhkan
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : nurses.length === 0 ? (
        <Card>
          <CardContent
            className="py-16 text-center"
            data-ocid="admin.nurses.empty_state"
          >
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              {tab === "pending"
                ? "Tidak ada perawat menunggu verifikasi"
                : "Belum ada perawat terdaftar"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {nurses.map((nurse, i) => {
            const strUrl = nurse.strDocUrl || null;
            const ktpUrl = nurse.ktpDocUrl || null;
            const isPending = tab === "pending";
            const isApproving = approveMutation.isPending;
            const isRejecting = rejectMutation.isPending;
            return (
              <Card
                key={nurse.principal.toString()}
                className="shadow-sm"
                data-ocid={`admin.nurses.item.${i + 1}`}
              >
                <CardContent className="pt-5 pb-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-bold text-foreground">
                          {nurse.name}
                        </p>
                        <p className="text-muted-foreground">
                          STR:{" "}
                          <span className="font-mono text-sm">
                            {nurse.strNumber}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          Spesialisasi:{" "}
                          <span className="font-medium text-foreground">
                            {nurse.specialization}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          Pengalaman:{" "}
                          <span className="font-medium text-foreground">
                            {nurse.experienceYears} tahun
                          </span>
                        </p>
                        {!isPending &&
                          nurse.status !== NurseStatus.pending_verification && (
                            <NurseStatusBadge status={nurse.status} />
                          )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 flex-wrap">
                        {strUrl && (
                          <a
                            href={strUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary border border-primary/40 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
                            data-ocid={`admin.nurses.str_doc.${i + 1}`}
                          >
                            <FileText className="w-4 h-4" /> Dokumen STR{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {ktpUrl && (
                          <a
                            href={ktpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary border border-primary/40 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
                            data-ocid={`admin.nurses.ktp_doc.${i + 1}`}
                          >
                            <FileText className="w-4 h-4" /> Dokumen KTP{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {isPending && (
                        <div className="flex gap-2">
                          <Button
                            size="lg"
                            onClick={() => approveMutation.mutate(nurse)}
                            disabled={isApproving || isRejecting}
                            data-ocid={`admin.nurses.approve_button.${i + 1}`}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" /> Setujui
                          </Button>
                          <Button
                            size="lg"
                            variant="destructive"
                            onClick={() => rejectMutation.mutate(nurse)}
                            disabled={isApproving || isRejecting}
                            data-ocid={`admin.nurses.reject_button.${i + 1}`}
                          >
                            <XCircle className="w-5 h-5 mr-2" /> Tolak
                          </Button>
                        </div>
                      )}
                      {!isPending && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-amber-600 border-amber-300 hover:bg-amber-50"
                            onClick={() => setSuspendConfirm(nurse)}
                            data-ocid={`admin.nurses.suspend_button.${i + 1}`}
                          >
                            <UserX className="w-4 h-4 mr-1" /> Tangguhkan
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                            onClick={() =>
                              activateMutation.mutate(nurse.email ?? "")
                            }
                            disabled={activateMutation.isPending}
                            data-ocid={`admin.nurses.activate_button.${i + 1}`}
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Aktifkan
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteConfirm(nurse)}
                            data-ocid={`admin.nurses.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Hapus
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
