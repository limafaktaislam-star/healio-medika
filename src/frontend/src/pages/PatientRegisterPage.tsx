import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Fingerprint, ShieldCheck, UserRound } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;

const inputCls =
  "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/60";

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
        style={{ background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" }}
      >
        {number}
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
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
        className="block text-sm font-semibold text-foreground mb-1.5"
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

export default function PatientRegisterPage() {
  const { isLoggedIn, login, loginStatus, role } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Login tab state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  // Pending email/password verification after II login completes
  const [pendingLoginVerify, setPendingLoginVerify] = useState(false);

  // Section A: Akun
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Section B: Data Pribadi
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nik, setNik] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelepon, setNoTelepon] = useState("");

  // Section C: Kontak Darurat
  const [kontakNama, setKontakNama] = useState("");
  const [kontakHubungan, setKontakHubungan] = useState("");
  const [kontakTelepon, setKontakTelepon] = useState("");

  // Section D: Dokumen
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const registerPatient = useMutation({
    mutationFn: () => actor!.registerAsPatient(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myRole"] }),
  });

  const saveEmailPassword = useMutation({
    mutationFn: ({ em, pw }: { em: string; pw: string }) =>
      actor!.saveEmailPassword(em, pw),
  });

  const saveProfile = useMutation({
    mutationFn: (
      args: Parameters<NonNullable<typeof actor>["savePatientProfile"]>,
    ) => actor!.savePatientProfile(...args),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myPatientProfile"] }),
  });

  // Redirect if already has patient role
  useEffect(() => {
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [role, navigate]);

  // After II login completes, run pending email+password verification
  useEffect(() => {
    if (!pendingLoginVerify || !isLoggedIn || !actor || isFetching) return;
    setPendingLoginVerify(false);
    (async () => {
      setLoginLoading(true);
      try {
        const result = await actor.verifyEmailPassword(
          loginEmail.trim(),
          loginPassword,
        );
        if (result.__kind__ === "err") {
          setLoginError(result.err ?? "Email atau password salah.");
          return;
        }
        // Role redirect is handled by the role useEffect above
        // But trigger it by checking role from actor directly
        const myRole = await actor.getMyRole();
        if (myRole === "patient") {
          navigate({ to: "/patient/dashboard" });
        } else if (myRole === "nurse") {
          navigate({ to: "/nurse/dashboard" });
        } else if (myRole === "admin") {
          navigate({ to: "/admin/dashboard" });
        } else {
          setLoginError(
            "Akun belum terdaftar. Silakan daftar terlebih dahulu.",
          );
        }
      } catch {
        setLoginError("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        setLoginLoading(false);
      }
    })();
  }, [
    pendingLoginVerify,
    isLoggedIn,
    actor,
    isFetching,
    loginEmail,
    loginPassword,
    navigate,
  ]);

  function validateRegister(): string {
    if (!email.trim()) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Format email tidak valid.";
    if (password.length < 8) return "Password minimal 8 karakter.";
    if (password !== confirmPassword) return "Konfirmasi password tidak cocok.";
    if (!namaLengkap.trim()) return "Nama Lengkap wajib diisi.";
    if (!nik.trim() || nik.replace(/\D/g, "").length !== 16)
      return "NIK harus 16 digit angka.";
    if (!tanggalLahir) return "Tanggal Lahir wajib diisi.";
    if (!jenisKelamin) return "Jenis Kelamin wajib dipilih.";
    if (!alamat.trim()) return "Alamat Domisili wajib diisi.";
    if (!noTelepon.trim()) return "Nomor Telepon wajib diisi.";
    if (!kontakNama.trim()) return "Nama Kontak Darurat wajib diisi.";
    if (!kontakTelepon.trim())
      return "Nomor Telepon Kontak Darurat wajib diisi.";
    return "";
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateRegister();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      // Step 1: Login via Internet Identity if not already logged in
      if (!isLoggedIn) {
        login();
        // Show message — user must complete II popup, then re-submit
        setFormError(
          "Silakan selesaikan proses Internet Identity, lalu klik Daftar Sekarang lagi.",
        );
        setSubmitting(false);
        return;
      }

      if (!actor || isFetching) {
        setFormError("Koneksi belum siap. Coba lagi sebentar.");
        setSubmitting(false);
        return;
      }

      // Step 2: Register as patient role
      await registerPatient.mutateAsync();

      // Step 3: Save email + password
      await saveEmailPassword.mutateAsync({ em: email, pw: password });

      // Step 4: Upload files
      const [ktpUrl, selfieUrl] = await Promise.all([
        ktpFile ? uploadFile(ktpFile) : Promise.resolve(null),
        selfieFile ? uploadFile(selfieFile) : Promise.resolve(null),
      ]);

      // Step 5: Compute age from birthdate
      const birthYear = new Date(tanggalLahir).getFullYear();
      const age = BigInt(new Date().getFullYear() - birthYear);

      // Step 6: Save full patient profile
      await saveProfile.mutateAsync([
        namaLengkap,
        nik,
        tanggalLahir,
        age,
        jenisKelamin,
        alamat,
        noTelepon,
        kontakNama,
        kontakHubungan || "Lainnya",
        kontakTelepon,
        ktpUrl,
        selfieUrl,
        "",
        "",
        "",
      ]);

      setSuccess(true);
      setTimeout(() => navigate({ to: "/patient/dashboard" }), 3000);
    } catch (_err) {
      setFormError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Email dan password wajib diisi.");
      return;
    }

    setLoginLoading(true);

    if (!isLoggedIn) {
      // Trigger II login; pendingLoginVerify effect will run verifyEmailPassword after login completes
      setPendingLoginVerify(true);
      login();
      setLoginError("Silakan selesaikan proses Internet Identity untuk masuk.");
      setLoginLoading(false);
      return;
    }

    // Already logged in via II — verify credentials directly
    if (!actor || isFetching) {
      setLoginError("Koneksi belum siap. Coba lagi sebentar.");
      setLoginLoading(false);
      return;
    }

    try {
      const result = await actor.verifyEmailPassword(
        loginEmail.trim(),
        loginPassword,
      );
      if (result.__kind__ === "err") {
        setLoginError(result.err ?? "Email atau password salah.");
        return;
      }
      const myRole = await actor.getMyRole();
      if (myRole === "patient") {
        navigate({ to: "/patient/dashboard" });
      } else if (myRole === "nurse") {
        navigate({ to: "/nurse/dashboard" });
      } else if (myRole === "admin") {
        navigate({ to: "/admin/dashboard" });
      } else {
        setLoginError("Akun belum terdaftar. Silakan daftar terlebih dahulu.");
      }
    } catch {
      setLoginError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoginLoading(false);
    }
  }

  if (success) {
    return (
      <Layout showSidebar={false}>
        <div className="min-h-[80vh] flex items-center justify-center p-6">
          <div
            className="max-w-md w-full text-center p-10 rounded-2xl shadow-lg"
            style={{ background: "#fff" }}
            data-ocid="patient.register.success_state"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} style={{ color: "#2d6a4f" }} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Data Anda sedang diverifikasi oleh admin. Anda akan menerima
              notifikasi setelah verifikasi selesai.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Mengarahkan ke dashboard...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar={false}>
      <div
        className="min-h-[80vh] py-10 px-4"
        style={{ background: "#f8fdf9" }}
        data-ocid="patient.register.page"
      >
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div
            className="rounded-2xl p-6 mb-6 text-white text-center"
            style={{
              background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
            }}
          >
            <div className="flex justify-center mb-3">
              <img
                src="/assets/logo-healio-new.png"
                alt="Healio Medika"
                style={{ height: 52 }}
              />
            </div>
            <h1 className="font-display text-2xl font-bold mb-1">
              HEALIO MEDIKA
            </h1>
            <p className="text-sm opacity-80">Portal Pasien — Daftar & Masuk</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 rounded-xl overflow-hidden border border-border bg-muted/40">
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-base font-semibold transition-colors ${
                activeTab === "register"
                  ? "text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              }`}
              style={
                activeTab === "register"
                  ? { background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" }
                  : {}
              }
              data-ocid="patient.register.tab_register"
            >
              Daftar Akun Baru
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-base font-semibold transition-colors ${
                activeTab === "login"
                  ? "text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              }`}
              style={
                activeTab === "login"
                  ? { background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" }
                  : {}
              }
              data-ocid="patient.register.tab_login"
            >
              Sudah Punya Akun? Masuk
            </button>
          </div>

          {/* REGISTER TAB */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Section A: Akun */}
              <Card>
                <CardContent className="pt-5 space-y-4">
                  <SectionTitle
                    number={1}
                    title="Buat Akun (Email & Password)"
                  />
                  <FieldGroup label="Alamat Email" htmlFor="reg-email" required>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="contoh@email.com"
                      className={inputCls}
                      data-ocid="patient.register.email_input"
                    />
                  </FieldGroup>
                  <FieldGroup label="Password" htmlFor="reg-password" required>
                    <input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder="Minimal 8 karakter"
                      className={inputCls}
                      data-ocid="patient.register.password_input"
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Konfirmasi Password"
                    htmlFor="reg-confirm-password"
                    required
                  >
                    <input
                      id="reg-confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Ulangi password Anda"
                      className={inputCls}
                      data-ocid="patient.register.confirm_password_input"
                    />
                    {confirmPassword && confirmPassword !== password && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="patient.register.password_mismatch_error"
                      >
                        Password tidak cocok
                      </p>
                    )}
                  </FieldGroup>

                  {!isLoggedIn && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-lg"
                      style={{
                        background: "rgba(45,106,79,0.06)",
                        border: "1px solid rgba(45,106,79,0.2)",
                      }}
                    >
                      <ShieldCheck
                        size={18}
                        style={{
                          color: "#2d6a4f",
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Saat mendaftar, Anda akan diminta login via{" "}
                        <strong>Internet Identity</strong> untuk keamanan akun.
                      </p>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{
                        background: "rgba(45,106,79,0.08)",
                        border: "1px solid rgba(45,106,79,0.25)",
                      }}
                    >
                      <CheckCircle
                        size={16}
                        style={{ color: "#2d6a4f", flexShrink: 0 }}
                      />
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#2d6a4f" }}
                      >
                        Internet Identity terverifikasi ✓
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Section B: Data Pribadi */}
              <Card>
                <CardContent className="pt-5 space-y-4">
                  <SectionTitle number={2} title="Data Pribadi" />
                  <FieldGroup
                    label="Nama Lengkap (sesuai KTP)"
                    htmlFor="reg-nama"
                    required
                  >
                    <input
                      id="reg-nama"
                      type="text"
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      required
                      placeholder="Nama sesuai KTP"
                      className={inputCls}
                      data-ocid="patient.register.name_input"
                    />
                  </FieldGroup>

                  <FieldGroup
                    label="NIK (Nomor Induk Kependudukan)"
                    htmlFor="reg-nik"
                    required
                  >
                    <input
                      id="reg-nik"
                      type="text"
                      value={nik}
                      onChange={(e) =>
                        setNik(e.target.value.replace(/\D/g, "").slice(0, 16))
                      }
                      required
                      maxLength={16}
                      placeholder="16 digit NIK"
                      className={inputCls}
                      data-ocid="patient.register.nik_input"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {nik.length}/16 digit
                    </p>
                  </FieldGroup>

                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup
                      label="Tanggal Lahir"
                      htmlFor="reg-tgl-lahir"
                      required
                    >
                      <input
                        id="reg-tgl-lahir"
                        type="date"
                        value={tanggalLahir}
                        onChange={(e) => setTanggalLahir(e.target.value)}
                        required
                        max={new Date().toISOString().split("T")[0]}
                        className={inputCls}
                        data-ocid="patient.register.birth_date_input"
                      />
                    </FieldGroup>

                    <FieldGroup label="Jenis Kelamin" htmlFor="reg-jk" required>
                      <select
                        id="reg-jk"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
                        required
                        className={inputCls}
                        data-ocid="patient.register.gender_select"
                      >
                        <option value="">Pilih...</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </FieldGroup>
                  </div>

                  <FieldGroup
                    label="Alamat Domisili Saat Ini"
                    htmlFor="reg-alamat"
                    required
                  >
                    <textarea
                      id="reg-alamat"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      required
                      rows={3}
                      placeholder="Jalan, Kelurahan, Kecamatan, Kota, Provinsi"
                      className={inputCls}
                      data-ocid="patient.register.address_textarea"
                    />
                  </FieldGroup>

                  <FieldGroup
                    label="Nomor Telepon Aktif (WhatsApp)"
                    htmlFor="reg-telepon"
                    required
                  >
                    <input
                      id="reg-telepon"
                      type="tel"
                      value={noTelepon}
                      onChange={(e) => setNoTelepon(e.target.value)}
                      required
                      placeholder="Contoh: 08123456789"
                      className={inputCls}
                      data-ocid="patient.register.phone_input"
                    />
                  </FieldGroup>
                </CardContent>
              </Card>

              {/* Section C: Kontak Darurat */}
              <Card>
                <CardContent className="pt-5 space-y-4">
                  <SectionTitle number={3} title="Kontak Darurat" />
                  <FieldGroup
                    label="Nama Kontak Darurat"
                    htmlFor="reg-kontak-nama"
                    required
                  >
                    <input
                      id="reg-kontak-nama"
                      type="text"
                      value={kontakNama}
                      onChange={(e) => setKontakNama(e.target.value)}
                      required
                      placeholder="Nama lengkap kontak darurat"
                      className={inputCls}
                      data-ocid="patient.register.emergency_name_input"
                    />
                  </FieldGroup>

                  <FieldGroup label="Hubungan" htmlFor="reg-kontak-hub">
                    <select
                      id="reg-kontak-hub"
                      value={kontakHubungan}
                      onChange={(e) => setKontakHubungan(e.target.value)}
                      className={inputCls}
                      data-ocid="patient.register.emergency_relation_select"
                    >
                      <option value="">Pilih Hubungan</option>
                      <option value="Suami/Istri">Suami/Istri</option>
                      <option value="Orang Tua">Orang Tua</option>
                      <option value="Anak">Anak</option>
                      <option value="Saudara">Saudara</option>
                      <option value="Teman">Teman</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </FieldGroup>

                  <FieldGroup
                    label="Nomor Telepon Kontak Darurat"
                    htmlFor="reg-kontak-telepon"
                    required
                  >
                    <input
                      id="reg-kontak-telepon"
                      type="tel"
                      value={kontakTelepon}
                      onChange={(e) => setKontakTelepon(e.target.value)}
                      required
                      placeholder="Contoh: 08198765432"
                      className={inputCls}
                      data-ocid="patient.register.emergency_phone_input"
                    />
                  </FieldGroup>
                </CardContent>
              </Card>

              {/* Section D: Dokumen */}
              <Card>
                <CardContent className="pt-5 space-y-4">
                  <SectionTitle number={4} title="Dokumen Identitas" />
                  <FieldGroup label="Unggah Foto KTP" htmlFor="reg-ktp">
                    <input
                      id="reg-ktp"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setKtpFile(e.target.files?.[0] ?? null)}
                      className={inputCls}
                      data-ocid="patient.register.ktp_upload"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: JPG, PNG (maks. 5 MB)
                    </p>
                  </FieldGroup>

                  <FieldGroup
                    label="Unggah Foto Swafoto (Selfie) Memegang KTP"
                    htmlFor="reg-selfie"
                  >
                    <input
                      id="reg-selfie"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSelfieFile(e.target.files?.[0] ?? null)
                      }
                      className={inputCls}
                      data-ocid="patient.register.selfie_upload"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Pastikan wajah & teks KTP terlihat jelas
                    </p>
                  </FieldGroup>

                  <div
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background: "rgba(201,162,39,0.07)",
                      border: "1px solid rgba(201,162,39,0.3)",
                    }}
                  >
                    <UserRound
                      size={16}
                      style={{ color: "#c9a227", marginTop: 2, flexShrink: 0 }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Dokumen identitas akan diverifikasi oleh admin. Setelah
                      terverifikasi, profil Anda akan mendapatkan badge{" "}
                      <strong className="text-foreground">
                        Terverifikasi ✓
                      </strong>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {formError && (
                <div
                  className="rounded-lg p-4 text-sm"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#dc2626",
                  }}
                  data-ocid="patient.register.error_state"
                >
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl text-lg font-bold text-white transition-all disabled:opacity-60"
                style={{
                  background: submitting
                    ? "#6b9e87"
                    : "linear-gradient(135deg, #2d6a4f, #1a3a2a)",
                  boxShadow: "0 4px 15px rgba(45,106,79,0.3)",
                }}
                data-ocid="patient.register.submit_button"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Mendaftarkan...
                  </span>
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
            </form>
          )}

          {/* LOGIN TAB */}
          {activeTab === "login" && (
            <Card>
              <CardContent className="pt-6 space-y-5">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl font-bold text-foreground">
                      Masuk sebagai Pasien
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Masukkan email dan password yang sudah Anda daftarkan
                    </p>
                  </div>

                  <FieldGroup label="Email" htmlFor="login-email">
                    <input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Email yang didaftarkan"
                      className={inputCls}
                      data-ocid="patient.login.email_input"
                    />
                  </FieldGroup>

                  <FieldGroup label="Password" htmlFor="login-password">
                    <input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password Anda"
                      className={inputCls}
                      data-ocid="patient.login.password_input"
                    />
                  </FieldGroup>

                  {loginError && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="patient.login.error_state"
                    >
                      {loginError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 text-base font-bold"
                    style={{
                      background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)",
                      color: "#fff",
                      border: "none",
                    }}
                    data-ocid="patient.login.submit_button"
                  >
                    {loginLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        Memeriksa...
                      </span>
                    ) : (
                      "Masuk"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-3 text-sm text-muted-foreground">
                      atau
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    login();
                  }}
                  disabled={loginStatus === "logging-in"}
                  className="w-full py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-3 border border-primary/30 hover:bg-primary/5 transition-colors text-foreground"
                  data-ocid="patient.login.internet_identity_button"
                >
                  {loginStatus === "logging-in" ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Fingerprint size={20} style={{ color: "#2d6a4f" }} />
                  )}
                  Masuk dengan Internet Identity
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="font-semibold hover:underline"
                    style={{ color: "#2d6a4f" }}
                    data-ocid="patient.login.go_register_link"
                  >
                    Daftar Sekarang
                  </button>
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
