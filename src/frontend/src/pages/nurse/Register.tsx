import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSaveEmailPassword } from "@/hooks/useQueries";
import { useActor } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useState } from "react";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;

const inputCls =
  "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
    </div>
  );
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-base font-semibold text-foreground mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function NurseRegister() {
  const { actor } = useActor(createActor);
  const saveEmailPassword = useSaveEmailPassword();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Section 0 — Akun (Email & Password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Profession selection
  const [profession, setProfession] = useState("Perawat");

  // Section 1 — STR & Identitas
  const [name, setName] = useState("");
  const [strNumber, setStrNumber] = useState("");
  const [strExpiry, setStrExpiry] = useState("");
  const [strFile, setStrFile] = useState<File | null>(null);

  // Section 2 — Pendidikan
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [ijazahFile, setIjazahFile] = useState<File | null>(null);

  // Section 3 — Keanggotaan & Pengalaman
  const [professionalOrg, setProfessionalOrg] = useState("");
  const [previousWorkHistory, setPreviousWorkHistory] = useState("");
  const [totalExperienceYears, setTotalExperienceYears] = useState("");
  const [previousFacilityType, setPreviousFacilityType] = useState("");

  // Section 4 — Pekerjaan Saat Ini
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [currentWorkDuration, setCurrentWorkDuration] = useState("");
  const [currentFacilityType, setCurrentFacilityType] = useState("");

  // Section 5 — Sertifikasi
  const [emergencyCertification, setEmergencyCertification] = useState("");
  const [emergencyCertExpiry, setEmergencyCertExpiry] = useState("");
  const [additionalCertificates, setAdditionalCertificates] = useState("");

  // Section 6 — Kompetensi
  const [medicalCompetencies, setMedicalCompetencies] = useState("");

  // Section 7 — Dokumen
  const [employeeIdFile, setEmployeeIdFile] = useState<File | null>(null);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  // Legacy
  const [specialization, setSpecialization] = useState("");

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
    if (!name.trim() || !strNumber.trim()) {
      setError("Nama Lengkap dan Nomor STR wajib diisi.");
      return;
    }
    if (email && password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
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
      const [strUrl, ijazahUrl, empIdUrl, ktpUrl, selfieUrl] =
        await Promise.all([
          strFile ? uploadFile(strFile) : Promise.resolve(null),
          ijazahFile ? uploadFile(ijazahFile) : Promise.resolve(null),
          employeeIdFile ? uploadFile(employeeIdFile) : Promise.resolve(null),
          ktpFile ? uploadFile(ktpFile) : Promise.resolve(null),
          selfieFile ? uploadFile(selfieFile) : Promise.resolve(null),
        ]);

      await actor.registerAsNurse(
        name,
        strNumber,
        strExpiry,
        strUrl,
        specialization || profession,
        profession,
        university,
        graduationYear ? BigInt(graduationYear) : 0n,
        ijazahUrl,
        professionalOrg,
        previousWorkHistory,
        totalExperienceYears ? BigInt(totalExperienceYears) : 0n,
        previousFacilityType,
        currentWorkplace,
        currentWorkDuration ? BigInt(currentWorkDuration) : 0n,
        currentFacilityType,
        emergencyCertification,
        emergencyCertExpiry,
        additionalCertificates,
        medicalCompetencies,
        empIdUrl,
        ktpUrl,
        selfieUrl,
      );

      // Save email/password for login if provided
      if (email.trim() && password.trim()) {
        await saveEmailPassword.mutateAsync({ email: email.trim(), password });
      }

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
              Data Anda telah diterima. Menunggu verifikasi oleh admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Daftar Sebagai Tenaga Medis
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Lengkapi semua data untuk proses verifikasi
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 0 — Akun */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={0} title="Data Akun (Email & Password)" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup label="Profesi *" htmlFor="reg-profession">
                <select
                  id="reg-profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.profession_select"
                >
                  <option value="Dokter">Dokter</option>
                  <option value="Perawat">Perawat</option>
                  <option value="Bidan">Bidan</option>
                  <option value="Fisioterapis">Fisioterapis</option>
                </select>
              </FieldGroup>

              <FieldGroup label="Email" htmlFor="reg-email">
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: nama@email.com"
                  className={inputCls}
                  data-ocid="nurse.register.email_input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email digunakan untuk login ke aplikasi
                </p>
              </FieldGroup>

              <FieldGroup label="Password" htmlFor="reg-password">
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className={inputCls}
                  data-ocid="nurse.register.password_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Konfirmasi Password"
                htmlFor="reg-confirm-password"
              >
                <input
                  id="reg-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className={inputCls}
                  data-ocid="nurse.register.confirm_password_input"
                />
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={1} title="Data Pribadi & STR" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Nama Lengkap (sesuai Ijazah & STR) *"
                htmlFor="reg-name"
              >
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Ns. Siti Rahayu, S.Kep"
                  className={inputCls}
                  data-ocid="nurse.register.name_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Nomor STR (Surat Tanda Registrasi) *"
                htmlFor="reg-str"
              >
                <input
                  id="reg-str"
                  type="text"
                  value={strNumber}
                  onChange={(e) => setStrNumber(e.target.value)}
                  required
                  placeholder="Contoh: 19-2024-XXXXX"
                  className={inputCls}
                  data-ocid="nurse.register.str_input"
                />
              </FieldGroup>

              <FieldGroup label="Masa Berlaku STR" htmlFor="reg-str-expiry">
                <input
                  id="reg-str-expiry"
                  type="date"
                  value={strExpiry}
                  onChange={(e) => setStrExpiry(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.str_expiry_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Unggah Berkas STR (Format PDF/Foto)"
                htmlFor="reg-str-file"
              >
                <input
                  id="reg-str-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setStrFile(e.target.files?.[0] ?? null)}
                  className={inputCls}
                  data-ocid="nurse.register.str_upload"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: PDF, JPG, atau PNG
                </p>
              </FieldGroup>

              <FieldGroup label="Spesialisasi" htmlFor="reg-specialization">
                <select
                  id="reg-specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.specialization_select"
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
                  <option value="Dokter Umum">Dokter Umum</option>
                </select>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 2 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={2} title="Latar Belakang Pendidikan" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Asal Universitas / Institusi Pendidikan"
                htmlFor="reg-university"
              >
                <input
                  id="reg-university"
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Contoh: Universitas Indonesia"
                  className={inputCls}
                  data-ocid="nurse.register.university_input"
                />
              </FieldGroup>

              <FieldGroup label="Tahun Kelulusan" htmlFor="reg-grad-year">
                <input
                  id="reg-grad-year"
                  type="number"
                  min={1970}
                  max={2030}
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  placeholder="Contoh: 2018"
                  className={inputCls}
                  data-ocid="nurse.register.graduation_year_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Unggah Berkas Ijazah & Transkrip Nilai (Format PDF/Foto)"
                htmlFor="reg-ijazah"
              >
                <input
                  id="reg-ijazah"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setIjazahFile(e.target.files?.[0] ?? null)}
                  className={inputCls}
                  data-ocid="nurse.register.ijazah_upload"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: PDF, JPG, atau PNG
                </p>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 3 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={3} title="Keanggotaan & Pengalaman" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Keanggotaan Organisasi Profesi (IDI / PPNI / IAI / dll.)"
                htmlFor="reg-org"
              >
                <input
                  id="reg-org"
                  type="text"
                  value={professionalOrg}
                  onChange={(e) => setProfessionalOrg(e.target.value)}
                  placeholder="Contoh: PPNI No. 12345"
                  className={inputCls}
                  data-ocid="nurse.register.org_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Riwayat Tempat Praktik / Kerja Sebelumnya"
                htmlFor="reg-prev-work"
              >
                <textarea
                  id="reg-prev-work"
                  value={previousWorkHistory}
                  onChange={(e) => setPreviousWorkHistory(e.target.value)}
                  rows={3}
                  placeholder="Contoh: RS Cipto Mangunkusumo (2018–2021), Klinik Sehat Bersama (2021–2022)"
                  className={inputCls}
                  data-ocid="nurse.register.prev_work_textarea"
                />
              </FieldGroup>

              <FieldGroup
                label="Total Pengalaman Kerja (dalam Tahun)"
                htmlFor="reg-total-exp"
              >
                <input
                  id="reg-total-exp"
                  type="number"
                  min={0}
                  max={50}
                  value={totalExperienceYears}
                  onChange={(e) => setTotalExperienceYears(e.target.value)}
                  placeholder="Contoh: 5"
                  className={inputCls}
                  data-ocid="nurse.register.total_exp_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Jenis Fasilitas Kesehatan Sebelumnya"
                htmlFor="reg-prev-facility"
              >
                <select
                  id="reg-prev-facility"
                  value={previousFacilityType}
                  onChange={(e) => setPreviousFacilityType(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.prev_facility_select"
                >
                  <option value="">Pilih Jenis Fasilitas</option>
                  <option value="Klinik">Klinik</option>
                  <option value="Puskesmas">Puskesmas</option>
                  <option value="Rumah Sakit">Rumah Sakit</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 4 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={4} title="Pekerjaan Saat Ini" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Riwayat Tempat Praktik / Kerja Saat Ini"
                htmlFor="reg-cur-work"
              >
                <input
                  id="reg-cur-work"
                  type="text"
                  value={currentWorkplace}
                  onChange={(e) => setCurrentWorkplace(e.target.value)}
                  placeholder="Contoh: RS Premier Bintaro"
                  className={inputCls}
                  data-ocid="nurse.register.current_workplace_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Lama Bekerja di Tempat Saat Ini (dalam Tahun)"
                htmlFor="reg-cur-duration"
              >
                <input
                  id="reg-cur-duration"
                  type="number"
                  min={0}
                  max={50}
                  value={currentWorkDuration}
                  onChange={(e) => setCurrentWorkDuration(e.target.value)}
                  placeholder="Contoh: 2"
                  className={inputCls}
                  data-ocid="nurse.register.current_duration_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Jenis Fasilitas Kesehatan Saat Ini"
                htmlFor="reg-cur-facility"
              >
                <select
                  id="reg-cur-facility"
                  value={currentFacilityType}
                  onChange={(e) => setCurrentFacilityType(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.current_facility_select"
                >
                  <option value="">Pilih Jenis Fasilitas</option>
                  <option value="Klinik">Klinik</option>
                  <option value="Puskesmas">Puskesmas</option>
                  <option value="Rumah Sakit">Rumah Sakit</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 5 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={5} title="Sertifikasi Kegawatdaruratan" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Sertifikasi Kegawatdaruratan (ACLS / ATLS / BTCLS)"
                htmlFor="reg-emerg-cert"
              >
                <input
                  id="reg-emerg-cert"
                  type="text"
                  value={emergencyCertification}
                  onChange={(e) => setEmergencyCertification(e.target.value)}
                  placeholder="Contoh: ACLS, BTCLS"
                  className={inputCls}
                  data-ocid="nurse.register.emergency_cert_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Masa Berlaku Sertifikat Kegawatdaruratan"
                htmlFor="reg-emerg-expiry"
              >
                <input
                  id="reg-emerg-expiry"
                  type="date"
                  value={emergencyCertExpiry}
                  onChange={(e) => setEmergencyCertExpiry(e.target.value)}
                  className={inputCls}
                  data-ocid="nurse.register.emergency_cert_expiry_input"
                />
              </FieldGroup>

              <FieldGroup
                label="Sertifikat Pelatihan Tambahan (Hiperkes / Phlebotomy / Perawatan Luka / dll.)"
                htmlFor="reg-add-cert"
              >
                <textarea
                  id="reg-add-cert"
                  value={additionalCertificates}
                  onChange={(e) => setAdditionalCertificates(e.target.value)}
                  rows={3}
                  placeholder="Contoh: Hiperkes (2021), Phlebotomy (2022), Perawatan Luka Modern (2023)"
                  className={inputCls}
                  data-ocid="nurse.register.additional_certs_textarea"
                />
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 6 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={6} title="Kompetensi Medis" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup
                label="Kompetensi / Keahlian Medis yang Dikuasai"
                htmlFor="reg-competencies"
              >
                <textarea
                  id="reg-competencies"
                  value={medicalCompetencies}
                  onChange={(e) => setMedicalCompetencies(e.target.value)}
                  rows={4}
                  placeholder="Contoh: Perawatan Luka, Injeksi IV/IM, Pemasangan NGT, Pemasangan Kateter, Nebulisasi"
                  className={inputCls}
                  data-ocid="nurse.register.competencies_textarea"
                />
              </FieldGroup>
            </CardContent>
          </Card>

          {/* SECTION 7 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                <SectionTitle number={7} title="Dokumen Verifikasi" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldGroup
                label="Unggah ID Card / Kartu Karyawan Tempat Kerja Saat Ini"
                htmlFor="reg-emp-id"
              >
                <input
                  id="reg-emp-id"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setEmployeeIdFile(e.target.files?.[0] ?? null)
                  }
                  className={inputCls}
                  data-ocid="nurse.register.employee_id_upload"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: PDF, JPG, atau PNG
                </p>
              </FieldGroup>

              <FieldGroup label="Unggah Foto KTP" htmlFor="reg-ktp">
                <input
                  id="reg-ktp"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setKtpFile(e.target.files?.[0] ?? null)}
                  className={inputCls}
                  data-ocid="nurse.register.ktp_upload"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: JPG, PNG, atau PDF
                </p>
              </FieldGroup>

              <FieldGroup
                label="Unggah Foto Swafoto (Selfie) Memegang KTP"
                htmlFor="reg-selfie"
              >
                <input
                  id="reg-selfie"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)}
                  className={inputCls}
                  data-ocid="nurse.register.selfie_upload"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Foto selfie Anda sambil memegang KTP — pastikan wajah & teks
                  KTP terlihat jelas.
                </p>
              </FieldGroup>
            </CardContent>
          </Card>

          {error && (
            <div
              className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base"
              data-ocid="nurse.register.error_state"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full text-lg py-5"
            data-ocid="nurse.register.submit_button"
          >
            {loading ? <LoadingSpinner /> : "Daftar Sekarang"}
          </Button>
        </form>
      </div>
    </div>
  );
}
