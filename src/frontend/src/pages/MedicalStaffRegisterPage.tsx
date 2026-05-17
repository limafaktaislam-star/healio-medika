import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useRouter } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;

type Profession = "Dokter" | "Perawat" | "Bidan" | "Fisioterapi";
type PageTab = "daftar" | "masuk";

const PROFESSIONS: {
  key: Profession;
  icon: string;
  desc: string;
}[] = [
  {
    key: "Dokter",
    icon: "👨‍⚕️",
    desc: "Dokter Umum & Spesialis — Layanan Konsultasi Online",
  },
  {
    key: "Perawat",
    icon: "👩‍⚕️",
    desc: "Perawat Profesional — Layanan Homecare & Kunjungan",
  },
  {
    key: "Bidan",
    icon: "🤱",
    desc: "Bidan Terlatih — Perawatan Ibu & Bayi",
  },
  {
    key: "Fisioterapi",
    icon: "🏃",
    desc: "Fisioterapis — Rehabilitasi & Pemulihan",
  },
];

const inputCls =
  "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
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
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-base font-semibold text-foreground mb-2"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

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

// ─── Login sub-form ─────────────────────────────────────────────────────────
function LoginForm() {
  const { login, isLoggedIn } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerify, setPendingVerify] = useState(false);

  // After II login completes, run pending email+password verification
  useEffect(() => {
    if (!pendingVerify || !isLoggedIn || !actor || isFetching) return;
    setPendingVerify(false);
    (async () => {
      setLoading(true);
      try {
        const result = await actor.verifyEmailPassword(email.trim(), password);
        if (result.__kind__ === "err") {
          setError(result.err ?? "Email atau password salah.");
          return;
        }
        const myRole = await actor.getMyRole();
        if (myRole === "nurse" || myRole === "admin") {
          router.navigate({
            to: myRole === "admin" ? "/admin/dashboard" : "/nurse/dashboard",
          });
        } else {
          setError(
            "Akun tenaga medis belum terdaftar atau belum diverifikasi.",
          );
        }
      } catch {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    })();
  }, [pendingVerify, isLoggedIn, actor, isFetching, email, password, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);

    if (!isLoggedIn) {
      // Trigger II login; effect above will run verifyEmailPassword once logged in
      setPendingVerify(true);
      login();
      setError("Silakan selesaikan proses Internet Identity untuk masuk.");
      setLoading(false);
      return;
    }

    if (!actor || isFetching) {
      setError("Koneksi belum siap.");
      setLoading(false);
      return;
    }

    try {
      const result = await actor.verifyEmailPassword(email.trim(), password);
      if (result.__kind__ === "err") {
        setError(result.err ?? "Email atau password salah.");
        return;
      }
      const myRole = await actor.getMyRole();
      if (myRole === "nurse" || myRole === "admin") {
        router.navigate({
          to: myRole === "admin" ? "/admin/dashboard" : "/nurse/dashboard",
        });
      } else {
        setError("Akun tenaga medis belum terdaftar atau belum diverifikasi.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div
          className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base"
          data-ocid="medstaff.login.error_state"
        >
          {error}
        </div>
      )}
      <FieldGroup label="Email" htmlFor="login-email" required>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dokter@email.com"
          className={inputCls}
          data-ocid="medstaff.login.email_input"
        />
      </FieldGroup>
      <FieldGroup label="Password" htmlFor="login-password" required>
        <div className="relative">
          <input
            id="login-password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password Anda"
            className={inputCls}
            data-ocid="medstaff.login.password_input"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FieldGroup>
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full text-lg py-5"
        data-ocid="medstaff.login.submit_button"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <LogIn size={18} className="mr-2" /> Masuk
          </>
        )}
      </Button>
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-2 text-muted-foreground">atau</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full text-base"
        onClick={() => login()}
        data-ocid="medstaff.login.internet_identity_button"
      >
        Masuk dengan Internet Identity
      </Button>
    </form>
  );
}

// ─── Registration form ──────────────────────────────────────────────────────
function RegisterForm({ profession }: { profession: Profession }) {
  const { login, isLoggedIn } = useAuth();
  const { actor } = useActor(createActor);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Account fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Section 1 — STR
  const [name, setName] = useState("");
  const [strNumber, setStrNumber] = useState("");
  const [strExpiry, setStrExpiry] = useState("");
  const [strFile, setStrFile] = useState<File | null>(null);

  // Section 2 — Education
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [ijazahFile, setIjazahFile] = useState<File | null>(null);

  // Section 3 — Org & Experience
  const [professionalOrg, setProfessionalOrg] = useState("");
  const [previousWorkHistory, setPreviousWorkHistory] = useState("");
  const [totalExperienceYears, setTotalExperienceYears] = useState("");
  const [previousFacilityType, setPreviousFacilityType] = useState("");

  // Section 4 — Current workplace
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [currentWorkDuration, setCurrentWorkDuration] = useState("");
  const [currentFacilityType, setCurrentFacilityType] = useState("");

  // Section 5 — Certs
  const [emergencyCertification, setEmergencyCertification] = useState("");
  const [emergencyCertExpiry, setEmergencyCertExpiry] = useState("");
  const [additionalCertificates, setAdditionalCertificates] = useState("");

  // Section 6 — Competencies
  const [medicalCompetencies, setMedicalCompetencies] = useState("");

  // Section 7 — Documents
  const [employeeIdFile, setEmployeeIdFile] = useState<File | null>(null);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !strNumber.trim()) {
      setError("Nama Lengkap dan Nomor STR wajib diisi.");
      return;
    }
    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      if (!isLoggedIn) await login();
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
        profession,
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

      await actor.saveEmailPassword(email.trim(), password);
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
      <div className="text-center py-12">
        <CheckCircle2 size={72} className="mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-lg text-muted-foreground mb-2">
          Dokumen Anda sedang diverifikasi oleh admin.
        </p>
        <p className="text-base text-muted-foreground mb-6">
          Anda akan mendapat konfirmasi dalam <strong>1–3 hari kerja</strong>.
        </p>
        <Button
          size="lg"
          onClick={() => router.navigate({ to: "/nurse/dashboard" })}
          data-ocid="medstaff.register.go_dashboard_button"
        >
          Ke Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Data */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={1} title="Data Akun" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup label="Alamat Email" htmlFor="reg-email" required>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dokter@email.com"
              className={inputCls}
              data-ocid="medstaff.register.email_input"
            />
          </FieldGroup>
          <FieldGroup label="Password" htmlFor="reg-password" required>
            <div className="relative">
              <input
                id="reg-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className={inputCls}
                data-ocid="medstaff.register.password_input"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPw ? "Sembunyikan" : "Tampilkan"}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FieldGroup>
          <FieldGroup
            label="Konfirmasi Password"
            htmlFor="reg-confirm-pw"
            required
          >
            <div className="relative">
              <input
                id="reg-confirm-pw"
                type={showConfirmPw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password Anda"
                className={inputCls}
                data-ocid="medstaff.register.confirm_password_input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPw ? "Sembunyikan" : "Tampilkan"}
              >
                {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Section 2 — STR */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={2} title="Identitas & STR" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup
            label="Nama Lengkap (sesuai Ijazah & STR)"
            htmlFor="reg-name"
            required
          >
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: dr. Budi Santoso, Sp.PD"
              className={inputCls}
              data-ocid="medstaff.register.name_input"
            />
          </FieldGroup>
          <FieldGroup
            label="Nomor STR (Surat Tanda Registrasi)"
            htmlFor="reg-str"
            required
          >
            <input
              id="reg-str"
              type="text"
              value={strNumber}
              onChange={(e) => setStrNumber(e.target.value)}
              placeholder="Contoh: 19-2024-XXXXX"
              className={inputCls}
              data-ocid="medstaff.register.str_input"
            />
          </FieldGroup>
          <FieldGroup label="Masa Berlaku STR" htmlFor="reg-str-expiry">
            <input
              id="reg-str-expiry"
              type="date"
              value={strExpiry}
              onChange={(e) => setStrExpiry(e.target.value)}
              className={inputCls}
              data-ocid="medstaff.register.str_expiry_input"
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
              data-ocid="medstaff.register.str_upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: PDF, JPG, atau PNG
            </p>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Section 3 — Education */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={3} title="Latar Belakang Pendidikan" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup
            label="Asal Universitas / Institusi Pendidikan"
            htmlFor="reg-univ"
            required
          >
            <input
              id="reg-univ"
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="Contoh: Universitas Indonesia"
              className={inputCls}
              data-ocid="medstaff.register.university_input"
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
              data-ocid="medstaff.register.graduation_year_input"
            />
          </FieldGroup>
          <FieldGroup
            label="Unggah Berkas Ijazah & Transkrip Nilai"
            htmlFor="reg-ijazah"
          >
            <input
              id="reg-ijazah"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setIjazahFile(e.target.files?.[0] ?? null)}
              className={inputCls}
              data-ocid="medstaff.register.ijazah_upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: PDF, JPG, atau PNG
            </p>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Section 4 — Org & Experience */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={4} title="Keanggotaan & Pengalaman" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup
            label="Keanggotaan Organisasi Profesi (IDI / PPNI / IAI / IFI / dll.)"
            htmlFor="reg-org"
          >
            <input
              id="reg-org"
              type="text"
              value={professionalOrg}
              onChange={(e) => setProfessionalOrg(e.target.value)}
              placeholder="Contoh: PPNI No. 12345"
              className={inputCls}
              data-ocid="medstaff.register.org_input"
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
              data-ocid="medstaff.register.prev_work_textarea"
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
              data-ocid="medstaff.register.total_exp_input"
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
              data-ocid="medstaff.register.prev_facility_select"
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

      {/* Section 5 — Current workplace */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={5} title="Tempat Kerja Saat Ini" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup
            label="Nama Tempat Praktik / Kerja Saat Ini"
            htmlFor="reg-cur-work"
          >
            <input
              id="reg-cur-work"
              type="text"
              value={currentWorkplace}
              onChange={(e) => setCurrentWorkplace(e.target.value)}
              placeholder="Contoh: RS Premier Bintaro"
              className={inputCls}
              data-ocid="medstaff.register.current_workplace_input"
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
              data-ocid="medstaff.register.current_duration_input"
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
              data-ocid="medstaff.register.current_facility_select"
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

      {/* Section 6 — Certs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={6} title="Sertifikasi Kegawatdaruratan" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <FieldGroup
            label="Sertifikasi (ACLS / ATLS / BTCLS)"
            htmlFor="reg-emerg-cert"
          >
            <input
              id="reg-emerg-cert"
              type="text"
              value={emergencyCertification}
              onChange={(e) => setEmergencyCertification(e.target.value)}
              placeholder="Contoh: ACLS, BTCLS"
              className={inputCls}
              data-ocid="medstaff.register.emergency_cert_input"
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
              data-ocid="medstaff.register.emergency_cert_expiry_input"
            />
          </FieldGroup>
          <FieldGroup
            label="Sertifikat Pelatihan Tambahan (Hiperkes / Phlebotomy / dll.)"
            htmlFor="reg-add-cert"
          >
            <textarea
              id="reg-add-cert"
              value={additionalCertificates}
              onChange={(e) => setAdditionalCertificates(e.target.value)}
              rows={3}
              placeholder="Contoh: Hiperkes (2021), Phlebotomy (2022), Perawatan Luka Modern (2023)"
              className={inputCls}
              data-ocid="medstaff.register.additional_certs_textarea"
            />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Section 7 — Competencies */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={7} title="Kompetensi Medis" />
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
              data-ocid="medstaff.register.competencies_textarea"
            />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Section 8 — Documents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <SectionTitle number={8} title="Dokumen Verifikasi" />
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
              onChange={(e) => setEmployeeIdFile(e.target.files?.[0] ?? null)}
              className={inputCls}
              data-ocid="medstaff.register.employee_id_upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: PDF, JPG, atau PNG
            </p>
          </FieldGroup>
          <FieldGroup label="Unggah Foto KTP" htmlFor="reg-ktp" required>
            <input
              id="reg-ktp"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setKtpFile(e.target.files?.[0] ?? null)}
              className={inputCls}
              data-ocid="medstaff.register.ktp_upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: JPG, PNG, atau PDF
            </p>
          </FieldGroup>
          <FieldGroup
            label="Unggah Foto Swafoto (Selfie) Memegang KTP"
            htmlFor="reg-selfie"
            required
          >
            <input
              id="reg-selfie"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)}
              className={inputCls}
              data-ocid="medstaff.register.selfie_upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Foto selfie Anda sambil memegang KTP — pastikan wajah & teks KTP
              terlihat jelas.
            </p>
          </FieldGroup>
        </CardContent>
      </Card>

      {error && (
        <div
          className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base"
          data-ocid="medstaff.register.error_state"
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full text-lg py-6 font-bold"
        data-ocid="medstaff.register.submit_button"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserPlus size={20} className="mr-2" /> Daftar Sekarang
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function MedicalStaffRegisterPage() {
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [tab, setTab] = useState<PageTab>("daftar");

  return (
    <div className="min-h-screen bg-background">
      {/* Green gradient header */}
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Bergabung sebagai Tenaga Medis Profesional
          </h1>
          <p className="text-lg text-white/80">
            Pilih profesi Anda untuk memulai pendaftaran
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Tab switcher */}
        <div
          className="flex rounded-xl border border-border overflow-hidden mb-8"
          data-ocid="medstaff.tab"
        >
          {(["daftar", "masuk"] as PageTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-base font-semibold transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
              data-ocid={`medstaff.${t}_tab`}
            >
              {t === "daftar" ? "Daftar Sekarang" : "Sudah Terdaftar? Masuk"}
            </button>
          ))}
        </div>

        {tab === "masuk" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Masuk sebagai Tenaga Medis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Profession selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Langkah 1: Pilih Profesi Anda
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {PROFESSIONS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setSelectedProfession(p.key)}
                    className={`rounded-xl border-2 p-5 text-left transition-all hover:shadow-md ${
                      selectedProfession === p.key
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                    data-ocid={`medstaff.profession.${p.key.toLowerCase()}_card`}
                  >
                    <div className="text-3xl mb-3">{p.icon}</div>
                    <div className="font-bold text-foreground text-lg mb-1 flex items-center gap-2">
                      {p.key}
                      {selectedProfession === p.key && (
                        <Badge className="text-xs">Dipilih</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {selectedProfession && (
              <>
                <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                  <span className="text-2xl">
                    {
                      PROFESSIONS.find((p) => p.key === selectedProfession)
                        ?.icon
                    }
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      Profesi dipilih: <strong>{selectedProfession}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lengkapi formulir pendaftaran di bawah ini
                    </p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Langkah 2: Isi Formulir Pendaftaran
                </h2>
                <RegisterForm profession={selectedProfession} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
