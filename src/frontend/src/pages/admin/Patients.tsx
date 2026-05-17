import { type PatientSummary, createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, ExternalLink, User, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function AdminPatients() {
  const [tab, setTab] = useState<"pending" | "all">("pending");
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
      // getAllPatients returns PatientProfile[], map to PatientSummary shape
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
    enabled: !!actor && !isFetching && tab === "all",
  });

  const approveMutation = useMutation({
    mutationFn: (patient: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminApprovePatient(patient.principal);
    },
    onSuccess: (_, patient) => {
      toast.success(`Pasien ${patient.fullName} berhasil diverifikasi.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => toast.error("Gagal memverifikasi pasien. Coba lagi."),
  });

  const rejectMutation = useMutation({
    mutationFn: (patient: PatientSummary) => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminRejectPatient(patient.principal);
    },
    onSuccess: (_, patient) => {
      toast.success(`Pendaftaran ${patient.fullName} telah ditolak.`);
      qc.invalidateQueries({ queryKey: ["admin", "pendingPatients"] });
      qc.invalidateQueries({ queryKey: ["admin", "allPatients"] });
    },
    onError: () => toast.error("Gagal menolak pasien. Coba lagi."),
  });

  const isActionLoading = approveMutation.isPending || rejectMutation.isPending;

  const currentList = tab === "pending" ? pendingPatients : allPatients;
  const isLoading = tab === "pending" ? pendingLoading : allLoading;

  function statusBadge(status: string) {
    if (status === "verified")
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
          ✅ Terverifikasi
        </Badge>
      );
    if (status === "rejected")
      return (
        <Badge className="bg-red-100 text-red-700 border-red-300">
          ❌ Ditolak
        </Badge>
      );
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-300">
        ⏳ Menunggu
      </Badge>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Verifikasi Data Pasien</h1>
          <p className="text-white/80 text-lg">
            Tinjau dan verifikasi pendaftaran pasien baru
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab */}
        <div
          className="flex rounded-xl border border-border overflow-hidden mb-8"
          data-ocid="admin.patients.tab"
        >
          {(["pending", "all"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-base font-semibold transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
              data-ocid={`admin.patients.${t}_tab`}
            >
              {t === "pending" ? (
                <span className="flex items-center justify-center gap-2">
                  Menunggu Verifikasi
                  {pendingPatients.length > 0 && (
                    <span className="bg-destructive text-white text-xs rounded-full px-2 py-0.5">
                      {pendingPatients.length}
                    </span>
                  )}
                </span>
              ) : (
                "Semua Pasien"
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="admin.patients.loading_state"
          >
            <LoadingSpinner size="lg" label="Memuat data pasien..." />
          </div>
        ) : currentList.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="admin.patients.empty_state"
          >
            <User size={56} className="mx-auto mb-4 opacity-30" />
            <p className="text-xl font-semibold mb-1">
              {tab === "pending"
                ? "Tidak ada pasien yang menunggu verifikasi"
                : "Belum ada data pasien"}
            </p>
            <p className="text-base">
              {tab === "pending"
                ? "Semua pendaftaran sudah diproses"
                : "Pasien yang mendaftar akan muncul di sini"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((patient, idx) => (
              <Card
                key={patient.principal.toString()}
                data-ocid={`admin.patients.item.${idx + 1}`}
              >
                <CardContent className="pt-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-foreground truncate">
                          {patient.fullName}
                        </h3>
                        {statusBadge(patient.verificationStatus)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          NIK:{" "}
                          <span className="font-mono text-foreground">
                            {patient.nik}
                          </span>
                        </p>
                        <p>
                          Didaftarkan:{" "}
                          <span className="text-foreground">
                            {formatDate(patient.submittedAt)}
                          </span>
                        </p>
                        <p className="break-all text-xs opacity-70">
                          Principal: {patient.principal.toString()}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-3 flex-wrap">
                        {patient.ktpPhotoUrl && (
                          <a
                            href={patient.ktpPhotoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary underline hover:opacity-80"
                            data-ocid={`admin.patients.ktp_link.${idx + 1}`}
                          >
                            <ExternalLink size={14} /> Lihat KTP
                          </a>
                        )}
                        {patient.selfieUrl && (
                          <a
                            href={patient.selfieUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary underline hover:opacity-80"
                            data-ocid={`admin.patients.selfie_link.${idx + 1}`}
                          >
                            <ExternalLink size={14} /> Lihat Selfie+KTP
                          </a>
                        )}
                      </div>
                    </div>

                    {tab === "pending" && (
                      <div className="flex gap-3 shrink-0">
                        <Button
                          type="button"
                          size="lg"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                          disabled={isActionLoading}
                          onClick={() => approveMutation.mutate(patient)}
                          data-ocid={`admin.patients.verify_button.${idx + 1}`}
                        >
                          <CheckCircle size={18} /> Verifikasi
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="destructive"
                          className="gap-2"
                          disabled={isActionLoading}
                          onClick={() => rejectMutation.mutate(patient)}
                          data-ocid={`admin.patients.reject_button.${idx + 1}`}
                        >
                          <XCircle size={18} /> Tolak
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
