import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NurseStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;

export default function NurseProfile() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const [name, setName] = useState("");
  const [strNumber, setStrNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [strFile, setStrFile] = useState<File | null>(null);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setStrNumber(profile.strNumber);
      setSpecialization(profile.specialization);
      setExperienceYears(Number(profile.experienceYears));
    }
  }, [profile]);

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await window.fetch(`${STORAGE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload gagal");
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("actor tidak siap");
      const strUrl = strFile
        ? await uploadFile(strFile)
        : (profile?.strDocUrl ?? "");
      const ktpUrl = ktpFile
        ? await uploadFile(ktpFile)
        : (profile?.ktpDocUrl ?? "");
      return actor.saveNurseProfile(
        name,
        strNumber,
        specialization,
        BigInt(experienceYears),
        strUrl,
        ktpUrl,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurseProfile"] });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <p className="text-xl text-muted-foreground">
          Profil tidak ditemukan. Harap daftar terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profil Saya</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Perbarui data profesional Anda
          </p>
        </div>
        <NurseStatusBadge status={profile.status} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Data Profesional</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="profile-name"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Nama Lengkap
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="nurse.profile.name_input"
              />
            </div>
            <div>
              <label
                htmlFor="profile-str"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Nomor STR
              </label>
              <input
                id="profile-str"
                type="text"
                value={strNumber}
                onChange={(e) => setStrNumber(e.target.value)}
                required
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="nurse.profile.str_input"
              />
            </div>
            <div>
              <label
                htmlFor="profile-specialization"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Spesialisasi
              </label>
              <select
                id="profile-specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="nurse.profile.specialization_select"
              >
                <option value="">Pilih Spesialisasi</option>
                <option value="Perawat Umum">Perawat Umum</option>
                <option value="Perawat Lansia">Perawat Lansia</option>
                <option value="Bidan">Bidan</option>
                <option value="Fisioterapis">Fisioterapis</option>
                <option value="Perawat Luka">Perawat Luka</option>
                <option value="Perawat Pasca Operasi">
                  Perawat Pasca Operasi
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="profile-experience"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Pengalaman (Tahun)
              </label>
              <input
                id="profile-experience"
                type="number"
                min={0}
                max={50}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                required
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="nurse.profile.experience_input"
              />
            </div>
            <div>
              <label
                htmlFor="str-update"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Perbarui Dokumen STR (opsional)
              </label>
              {profile.strDocUrl && (
                <p className="text-sm text-muted-foreground mb-2">
                  Dokumen saat ini:{" "}
                  <a
                    href={profile.strDocUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat STR
                  </a>
                </p>
              )}
              <input
                id="str-update"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setStrFile(e.target.files?.[0] ?? null)}
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
                data-ocid="nurse.profile.str_upload"
              />
            </div>
            <div>
              <label
                htmlFor="ktp-update"
                className="block text-base font-semibold text-foreground mb-2"
              >
                Perbarui Dokumen KTP (opsional)
              </label>
              {profile.ktpDocUrl && (
                <p className="text-sm text-muted-foreground mb-2">
                  Dokumen saat ini:{" "}
                  <a
                    href={profile.ktpDocUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat KTP
                  </a>
                </p>
              )}
              <input
                id="ktp-update"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setKtpFile(e.target.files?.[0] ?? null)}
                className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
                data-ocid="nurse.profile.ktp_upload"
              />
            </div>
            {saveMutation.isError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base">
                Terjadi kesalahan saat menyimpan. Silakan coba lagi.
              </div>
            )}
            {saveSuccess && (
              <div
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-base"
                data-ocid="nurse.profile.success_state"
              >
                ✅ Profil berhasil diperbarui!
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={saveMutation.isPending}
              className="w-full text-lg py-4"
              data-ocid="nurse.profile.save_button"
            >
              {saveMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "💾 Simpan Perubahan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
