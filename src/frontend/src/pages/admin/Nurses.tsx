import { type NurseProfile, NurseStatus, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NurseStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  ExternalLink,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminNurses() {
  const [tab, setTab] = useState<"pending" | "all">("pending");
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

  const isLoading = tab === "pending" ? pendingLoading : allLoading;
  const nurses = tab === "pending" ? pendingNurses : allNurses;

  return (
    <div className="space-y-6 p-6" data-ocid="admin.nurses.page">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-display">
          Manajemen Perawat
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Verifikasi dan kelola tenaga medis terdaftar
        </p>
      </div>

      <div className="flex gap-2" data-ocid="admin.nurses.tab">
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
          Semua Perawat
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
