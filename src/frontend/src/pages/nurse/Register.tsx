import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useState } from "react";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;

export default function NurseRegister() {
  const { actor } = useActor(createActor);
  const [name, setName] = useState("");
  const [strNumber, setStrNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [strFile, setStrFile] = useState<File | null>(null);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!strFile || !ktpFile) {
      setError("Harap unggah dokumen STR dan KTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (!actor) {
        setError("Koneksi belum siap. Coba lagi.");
        setLoading(false);
        return;
      }
      const [strUrl, ktpUrl] = await Promise.all([
        uploadFile(strFile),
        uploadFile(ktpFile),
      ]);
      await actor.registerAsNurse(
        name,
        strNumber,
        specialization,
        BigInt(experienceYears),
        strUrl,
        ktpUrl,
      );
      setSuccess(true);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-10">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-lg text-muted-foreground">
              Pendaftaran berhasil! Menunggu verifikasi admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Daftar Sebagai Tenaga Medis
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Lengkapi data diri dan dokumen Anda
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Data Profesional</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Dr. Siti Rahayu, S.Kep"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-str"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Nomor STR
                </label>
                <input
                  id="reg-str"
                  type="text"
                  value={strNumber}
                  onChange={(e) => setStrNumber(e.target.value)}
                  required
                  placeholder="STR-2024-XXXXX"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-specialization"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Spesialisasi
                </label>
                <select
                  id="reg-specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  htmlFor="reg-experience"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Pengalaman (Tahun)
                </label>
                <input
                  id="reg-experience"
                  type="number"
                  min={0}
                  max={50}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  required
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-str-file"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Dokumen STR (PDF/JPG)
                </label>
                <input
                  id="reg-str-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setStrFile(e.target.files?.[0] ?? null)}
                  required
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-ktp-file"
                  className="block text-base font-semibold text-foreground mb-2"
                >
                  Dokumen KTP (JPG/PNG)
                </label>
                <input
                  id="reg-ktp-file"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setKtpFile(e.target.files?.[0] ?? null)}
                  required
                  className="w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
                />
              </div>
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full text-lg py-4"
                data-ocid="nurse.register.submit_button"
              >
                {loading ? <LoadingSpinner /> : "Daftar Sekarang"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
