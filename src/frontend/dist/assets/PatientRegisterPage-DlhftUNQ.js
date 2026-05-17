import { u as useNavigate, a as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BxBE-1lv.js";
import { u as useActor, c as createActor } from "./backend-RmgEpc2b.js";
import { L as Layout } from "./Layout-BaOPEDvI.js";
import { B as Button } from "./button-E3tW3HbR.js";
import { C as Card, c as CardContent } from "./card-B7cpt6Aw.js";
import { u as useAuth } from "./useAuth-CVbw7B2D.js";
import { u as useMutation } from "./useMutation-DO_kterx.js";
import { C as CircleCheckBig } from "./circle-check-big-CqWPiKXZ.js";
import { S as ShieldCheck } from "./shield-check-CaavSl9L.js";
import { U as UserRound, F as Fingerprint } from "./user-round--dih1pEX.js";
import "./createLucideIcon-C_thIQe7.js";
import "./book-open-DYprvAsb.js";
import "./chevron-right-BfAisa3Z.js";
import "./clipboard-list-Djhnxy2y.js";
const STORAGE_URL = void 0;
const inputCls = "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/60";
function SectionTitle({ number, title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white",
        style: { background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" },
        children: number
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground", children: title })
  ] });
}
function FieldGroup({
  label,
  htmlFor,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor,
        className: "block text-sm font-semibold text-foreground mb-1.5",
        children: [
          label,
          required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ]
      }
    ),
    children
  ] });
}
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await window.fetch(`${STORAGE_URL}/upload`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error("Upload gagal");
  const data = await res.json();
  return data.url;
}
function PatientRegisterPage() {
  const { isLoggedIn, login, loginStatus, role } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("register");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [formError, setFormError] = reactExports.useState("");
  const [loginEmail, setLoginEmail] = reactExports.useState("");
  const [loginPassword, setLoginPassword] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState("");
  const [loginLoading, setLoginLoading] = reactExports.useState(false);
  const [pendingLoginVerify, setPendingLoginVerify] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [namaLengkap, setNamaLengkap] = reactExports.useState("");
  const [nik, setNik] = reactExports.useState("");
  const [tanggalLahir, setTanggalLahir] = reactExports.useState("");
  const [jenisKelamin, setJenisKelamin] = reactExports.useState("");
  const [alamat, setAlamat] = reactExports.useState("");
  const [noTelepon, setNoTelepon] = reactExports.useState("");
  const [kontakNama, setKontakNama] = reactExports.useState("");
  const [kontakHubungan, setKontakHubungan] = reactExports.useState("");
  const [kontakTelepon, setKontakTelepon] = reactExports.useState("");
  const [ktpFile, setKtpFile] = reactExports.useState(null);
  const [selfieFile, setSelfieFile] = reactExports.useState(null);
  const registerPatient = useMutation({
    mutationFn: () => actor.registerAsPatient(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myRole"] })
  });
  const saveEmailPassword = useMutation({
    mutationFn: ({ em, pw }) => actor.saveEmailPassword(em, pw)
  });
  const saveProfile = useMutation({
    mutationFn: (args) => actor.savePatientProfile(...args),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myPatientProfile"] })
  });
  reactExports.useEffect(() => {
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [role, navigate]);
  reactExports.useEffect(() => {
    if (!pendingLoginVerify || !isLoggedIn || !actor || isFetching) return;
    setPendingLoginVerify(false);
    (async () => {
      setLoginLoading(true);
      try {
        const result = await actor.verifyEmailPassword(
          loginEmail.trim(),
          loginPassword
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
          setLoginError(
            "Akun belum terdaftar. Silakan daftar terlebih dahulu."
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
    navigate
  ]);
  function validateRegister() {
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
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const err = validateRegister();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      if (!isLoggedIn) {
        login();
        setFormError(
          "Silakan selesaikan proses Internet Identity, lalu klik Daftar Sekarang lagi."
        );
        setSubmitting(false);
        return;
      }
      if (!actor || isFetching) {
        setFormError("Koneksi belum siap. Coba lagi sebentar.");
        setSubmitting(false);
        return;
      }
      await registerPatient.mutateAsync();
      await saveEmailPassword.mutateAsync({ em: email, pw: password });
      const [ktpUrl, selfieUrl] = await Promise.all([
        ktpFile ? uploadFile(ktpFile) : Promise.resolve(null),
        selfieFile ? uploadFile(selfieFile) : Promise.resolve(null)
      ]);
      const birthYear = new Date(tanggalLahir).getFullYear();
      const age = BigInt((/* @__PURE__ */ new Date()).getFullYear() - birthYear);
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
        ""
      ]);
      setSuccess(true);
      setTimeout(() => navigate({ to: "/patient/dashboard" }), 3e3);
    } catch (_err) {
      setFormError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Email dan password wajib diisi.");
      return;
    }
    setLoginLoading(true);
    if (!isLoggedIn) {
      setPendingLoginVerify(true);
      login();
      setLoginError("Silakan selesaikan proses Internet Identity untuk masuk.");
      setLoginLoading(false);
      return;
    }
    if (!actor || isFetching) {
      setLoginError("Koneksi belum siap. Coba lagi sebentar.");
      setLoginLoading(false);
      return;
    }
    try {
      const result = await actor.verifyEmailPassword(
        loginEmail.trim(),
        loginPassword
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-md w-full text-center p-10 rounded-2xl shadow-lg",
        style: { background: "#fff" },
        "data-ocid": "patient.register.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 64, style: { color: "#2d6a4f" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-3", children: "Pendaftaran Berhasil!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed", children: "Data Anda sedang diverifikasi oleh admin. Anda akan menerima notifikasi setelah verifikasi selesai." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "Mengarahkan ke dashboard..." })
        ]
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] py-10 px-4",
      style: { background: "#f8fdf9" },
      "data-ocid": "patient.register.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 mb-6 text-white text-center",
            style: {
              background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/logo-healio-new.png",
                  alt: "Healio Medika",
                  style: { height: 52 }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold mb-1", children: "HEALIO MEDIKA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-80", children: "Portal Pasien — Daftar & Masuk" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex mb-6 rounded-xl overflow-hidden border border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("register"),
              className: `flex-1 py-3 text-base font-semibold transition-colors ${activeTab === "register" ? "text-white shadow-md" : "text-muted-foreground hover:text-foreground bg-transparent"}`,
              style: activeTab === "register" ? { background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" } : {},
              "data-ocid": "patient.register.tab_register",
              children: "Daftar Akun Baru"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("login"),
              className: `flex-1 py-3 text-base font-semibold transition-colors ${activeTab === "login" ? "text-white shadow-md" : "text-muted-foreground hover:text-foreground bg-transparent"}`,
              style: activeTab === "login" ? { background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)" } : {},
              "data-ocid": "patient.register.tab_login",
              children: "Sudah Punya Akun? Masuk"
            }
          )
        ] }),
        activeTab === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegisterSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionTitle,
              {
                number: 1,
                title: "Buat Akun (Email & Password)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Alamat Email", htmlFor: "reg-email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                placeholder: "contoh@email.com",
                className: inputCls,
                "data-ocid": "patient.register.email_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "reg-password", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true,
                minLength: 8,
                placeholder: "Minimal 8 karakter",
                className: inputCls,
                "data-ocid": "patient.register.password_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              FieldGroup,
              {
                label: "Konfirmasi Password",
                htmlFor: "reg-confirm-password",
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "reg-confirm-password",
                      type: "password",
                      value: confirmPassword,
                      onChange: (e) => setConfirmPassword(e.target.value),
                      required: true,
                      placeholder: "Ulangi password Anda",
                      className: inputCls,
                      "data-ocid": "patient.register.confirm_password_input"
                    }
                  ),
                  confirmPassword && confirmPassword !== password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive mt-1",
                      "data-ocid": "patient.register.password_mismatch_error",
                      children: "Password tidak cocok"
                    }
                  )
                ]
              }
            ),
            !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 p-3 rounded-lg",
                style: {
                  background: "rgba(45,106,79,0.06)",
                  border: "1px solid rgba(45,106,79,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShieldCheck,
                    {
                      size: 18,
                      style: {
                        color: "#2d6a4f",
                        marginTop: 2,
                        flexShrink: 0
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Saat mendaftar, Anda akan diminta login via",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Internet Identity" }),
                    " untuk keamanan akun."
                  ] })
                ]
              }
            ),
            isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 p-3 rounded-lg",
                style: {
                  background: "rgba(45,106,79,0.08)",
                  border: "1px solid rgba(45,106,79,0.25)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      size: 16,
                      style: { color: "#2d6a4f", flexShrink: 0 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-medium",
                      style: { color: "#2d6a4f" },
                      children: "Internet Identity terverifikasi ✓"
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 2, title: "Data Pribadi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldGroup,
              {
                label: "Nama Lengkap (sesuai KTP)",
                htmlFor: "reg-nama",
                required: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-nama",
                    type: "text",
                    value: namaLengkap,
                    onChange: (e) => setNamaLengkap(e.target.value),
                    required: true,
                    placeholder: "Nama sesuai KTP",
                    className: inputCls,
                    "data-ocid": "patient.register.name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              FieldGroup,
              {
                label: "NIK (Nomor Induk Kependudukan)",
                htmlFor: "reg-nik",
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "reg-nik",
                      type: "text",
                      value: nik,
                      onChange: (e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16)),
                      required: true,
                      maxLength: 16,
                      placeholder: "16 digit NIK",
                      className: inputCls,
                      "data-ocid": "patient.register.nik_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    nik.length,
                    "/16 digit"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldGroup,
                {
                  label: "Tanggal Lahir",
                  htmlFor: "reg-tgl-lahir",
                  required: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "reg-tgl-lahir",
                      type: "date",
                      value: tanggalLahir,
                      onChange: (e) => setTanggalLahir(e.target.value),
                      required: true,
                      max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                      className: inputCls,
                      "data-ocid": "patient.register.birth_date_input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Jenis Kelamin", htmlFor: "reg-jk", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "reg-jk",
                  value: jenisKelamin,
                  onChange: (e) => setJenisKelamin(e.target.value),
                  required: true,
                  className: inputCls,
                  "data-ocid": "patient.register.gender_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih..." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Laki-laki", children: "Laki-laki" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perempuan", children: "Perempuan" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldGroup,
              {
                label: "Alamat Domisili Saat Ini",
                htmlFor: "reg-alamat",
                required: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "reg-alamat",
                    value: alamat,
                    onChange: (e) => setAlamat(e.target.value),
                    required: true,
                    rows: 3,
                    placeholder: "Jalan, Kelurahan, Kecamatan, Kota, Provinsi",
                    className: inputCls,
                    "data-ocid": "patient.register.address_textarea"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldGroup,
              {
                label: "Nomor Telepon Aktif (WhatsApp)",
                htmlFor: "reg-telepon",
                required: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-telepon",
                    type: "tel",
                    value: noTelepon,
                    onChange: (e) => setNoTelepon(e.target.value),
                    required: true,
                    placeholder: "Contoh: 08123456789",
                    className: inputCls,
                    "data-ocid": "patient.register.phone_input"
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 3, title: "Kontak Darurat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldGroup,
              {
                label: "Nama Kontak Darurat",
                htmlFor: "reg-kontak-nama",
                required: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-kontak-nama",
                    type: "text",
                    value: kontakNama,
                    onChange: (e) => setKontakNama(e.target.value),
                    required: true,
                    placeholder: "Nama lengkap kontak darurat",
                    className: inputCls,
                    "data-ocid": "patient.register.emergency_name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Hubungan", htmlFor: "reg-kontak-hub", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "reg-kontak-hub",
                value: kontakHubungan,
                onChange: (e) => setKontakHubungan(e.target.value),
                className: inputCls,
                "data-ocid": "patient.register.emergency_relation_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih Hubungan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Suami/Istri", children: "Suami/Istri" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Orang Tua", children: "Orang Tua" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Anak", children: "Anak" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Saudara", children: "Saudara" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Teman", children: "Teman" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Lainnya", children: "Lainnya" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldGroup,
              {
                label: "Nomor Telepon Kontak Darurat",
                htmlFor: "reg-kontak-telepon",
                required: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-kontak-telepon",
                    type: "tel",
                    value: kontakTelepon,
                    onChange: (e) => setKontakTelepon(e.target.value),
                    required: true,
                    placeholder: "Contoh: 08198765432",
                    className: inputCls,
                    "data-ocid": "patient.register.emergency_phone_input"
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 4, title: "Dokumen Identitas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { label: "Unggah Foto KTP", htmlFor: "reg-ktp", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-ktp",
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a;
                    return setKtpFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: inputCls,
                  "data-ocid": "patient.register.ktp_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: JPG, PNG (maks. 5 MB)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              FieldGroup,
              {
                label: "Unggah Foto Swafoto (Selfie) Memegang KTP",
                htmlFor: "reg-selfie",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "reg-selfie",
                      type: "file",
                      accept: "image/*",
                      onChange: (e) => {
                        var _a;
                        return setSelfieFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                      },
                      className: inputCls,
                      "data-ocid": "patient.register.selfie_upload"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Pastikan wajah & teks KTP terlihat jelas" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 p-3 rounded-lg",
                style: {
                  background: "rgba(201,162,39,0.07)",
                  border: "1px solid rgba(201,162,39,0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UserRound,
                    {
                      size: 16,
                      style: { color: "#c9a227", marginTop: 2, flexShrink: 0 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Dokumen identitas akan diverifikasi oleh admin. Setelah terverifikasi, profil Anda akan mendapatkan badge",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Terverifikasi ✓" })
                  ] })
                ]
              }
            )
          ] }) }),
          formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-lg p-4 text-sm",
              style: {
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#dc2626"
              },
              "data-ocid": "patient.register.error_state",
              children: formError
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "w-full py-4 rounded-xl text-lg font-bold text-white transition-all disabled:opacity-60",
              style: {
                background: submitting ? "#6b9e87" : "linear-gradient(135deg, #2d6a4f, #1a3a2a)",
                boxShadow: "0 4px 15px rgba(45,106,79,0.3)"
              },
              "data-ocid": "patient.register.submit_button",
              children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                "Mendaftarkan..."
              ] }) : "Daftar Sekarang"
            }
          )
        ] }),
        activeTab === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLoginSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Masuk sebagai Pasien" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Masukkan email dan password yang sudah Anda daftarkan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Email", htmlFor: "login-email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "login-email",
                type: "email",
                value: loginEmail,
                onChange: (e) => setLoginEmail(e.target.value),
                placeholder: "Email yang didaftarkan",
                className: inputCls,
                "data-ocid": "patient.login.email_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "login-password", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "login-password",
                type: "password",
                value: loginPassword,
                onChange: (e) => setLoginPassword(e.target.value),
                placeholder: "Password Anda",
                className: inputCls,
                "data-ocid": "patient.login.password_input"
              }
            ) }),
            loginError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "patient.login.error_state",
                children: loginError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: loginLoading,
                className: "w-full py-3 text-base font-bold",
                style: {
                  background: "linear-gradient(135deg, #2d6a4f, #1a3a2a)",
                  color: "#fff",
                  border: "none"
                },
                "data-ocid": "patient.login.submit_button",
                children: loginLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                  "Memeriksa..."
                ] }) : "Masuk"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3 text-sm text-muted-foreground", children: "atau" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                login();
              },
              disabled: loginStatus === "logging-in",
              className: "w-full py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-3 border border-primary/30 hover:bg-primary/5 transition-colors text-foreground",
              "data-ocid": "patient.login.internet_identity_button",
              children: [
                loginStatus === "logging-in" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 20, style: { color: "#2d6a4f" } }),
                "Masuk dengan Internet Identity"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
            "Belum punya akun?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("register"),
                className: "font-semibold hover:underline",
                style: { color: "#2d6a4f" },
                "data-ocid": "patient.login.go_register_link",
                children: "Daftar Sekarang"
              }
            )
          ] })
        ] }) })
      ] })
    }
  ) });
}
export {
  PatientRegisterPage as default
};
