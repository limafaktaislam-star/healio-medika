import { r as reactExports, j as jsxRuntimeExports, u as useAuth, b as useActor, g as useRouter, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkAxztn.js";
import { E as EyeOff, a as Eye } from "./eye-DD0NOOJ9.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { C as CircleCheck } from "./circle-check-D4cJl42X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const STORAGE_URL = void 0;
const PROFESSIONS = [
  {
    key: "Dokter",
    icon: "👨‍⚕️",
    desc: "Dokter Umum & Spesialis — Layanan Konsultasi Online"
  },
  {
    key: "Perawat",
    icon: "👩‍⚕️",
    desc: "Perawat Profesional — Layanan Homecare & Kunjungan"
  },
  {
    key: "Bidan",
    icon: "🤱",
    desc: "Bidan Terlatih — Perawatan Ibu & Bayi"
  },
  {
    key: "Fisioterapi",
    icon: "🏃",
    desc: "Fisioterapis — Rehabilitasi & Pemulihan"
  }
];
const inputCls = "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
function SectionTitle({ number, title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0", children: number }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground", children: title })
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
        className: "block text-base font-semibold text-foreground mb-2",
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
function LoginForm() {
  const { login, isLoggedIn } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [pendingVerify, setPendingVerify] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
            to: myRole === "admin" ? "/admin/dashboard" : "/nurse/dashboard"
          });
        } else {
          setError(
            "Akun tenaga medis belum terdaftar atau belum diverifikasi."
          );
        }
      } catch {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    })();
  }, [pendingVerify, isLoggedIn, actor, isFetching, email, password, router]);
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    if (!isLoggedIn) {
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
          to: myRole === "admin" ? "/admin/dashboard" : "/nurse/dashboard"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base",
        "data-ocid": "medstaff.login.error_state",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Email", htmlFor: "login-email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id: "login-email",
        type: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        placeholder: "dokter@email.com",
        className: inputCls,
        "data-ocid": "medstaff.login.email_input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "login-password", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "login-password",
          type: showPw ? "text" : "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          placeholder: "Masukkan password Anda",
          className: inputCls,
          "data-ocid": "medstaff.login.password_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowPw((v) => !v),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          "aria-label": showPw ? "Sembunyikan password" : "Tampilkan password",
          children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        size: "lg",
        disabled: loading,
        className: "w-full text-lg py-5",
        "data-ocid": "medstaff.login.submit_button",
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 18, className: "mr-2" }),
          " Masuk"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "atau" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "lg",
        className: "w-full text-base",
        onClick: () => login(),
        "data-ocid": "medstaff.login.internet_identity_button",
        children: "Masuk dengan Internet Identity"
      }
    )
  ] });
}
function RegisterForm({ profession }) {
  const { login, isLoggedIn } = useAuth();
  const { actor } = useActor(createActor);
  const router = useRouter();
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirmPw, setShowConfirmPw] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [strNumber, setStrNumber] = reactExports.useState("");
  const [strExpiry, setStrExpiry] = reactExports.useState("");
  const [strFile, setStrFile] = reactExports.useState(null);
  const [university, setUniversity] = reactExports.useState("");
  const [graduationYear, setGraduationYear] = reactExports.useState("");
  const [ijazahFile, setIjazahFile] = reactExports.useState(null);
  const [professionalOrg, setProfessionalOrg] = reactExports.useState("");
  const [previousWorkHistory, setPreviousWorkHistory] = reactExports.useState("");
  const [totalExperienceYears, setTotalExperienceYears] = reactExports.useState("");
  const [previousFacilityType, setPreviousFacilityType] = reactExports.useState("");
  const [currentWorkplace, setCurrentWorkplace] = reactExports.useState("");
  const [currentWorkDuration, setCurrentWorkDuration] = reactExports.useState("");
  const [currentFacilityType, setCurrentFacilityType] = reactExports.useState("");
  const [emergencyCertification, setEmergencyCertification] = reactExports.useState("");
  const [emergencyCertExpiry, setEmergencyCertExpiry] = reactExports.useState("");
  const [additionalCertificates, setAdditionalCertificates] = reactExports.useState("");
  const [medicalCompetencies, setMedicalCompetencies] = reactExports.useState("");
  const [employeeIdFile, setEmployeeIdFile] = reactExports.useState(null);
  const [ktpFile, setKtpFile] = reactExports.useState(null);
  const [selfieFile, setSelfieFile] = reactExports.useState(null);
  async function handleSubmit(e) {
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
      const [strUrl, ijazahUrl, empIdUrl, ktpUrl, selfieUrl] = await Promise.all([
        strFile ? uploadFile(strFile) : Promise.resolve(null),
        ijazahFile ? uploadFile(ijazahFile) : Promise.resolve(null),
        employeeIdFile ? uploadFile(employeeIdFile) : Promise.resolve(null),
        ktpFile ? uploadFile(ktpFile) : Promise.resolve(null),
        selfieFile ? uploadFile(selfieFile) : Promise.resolve(null)
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
        selfieUrl
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 72, className: "mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-3", children: "Pendaftaran Berhasil!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-2", children: "Dokumen Anda sedang diverifikasi oleh admin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base text-muted-foreground mb-6", children: [
        "Anda akan mendapat konfirmasi dalam ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1–3 hari kerja" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          onClick: () => router.navigate({ to: "/nurse/dashboard" }),
          "data-ocid": "medstaff.register.go_dashboard_button",
          children: "Ke Dashboard"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 1, title: "Data Akun" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Alamat Email", htmlFor: "reg-email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "reg-email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "dokter@email.com",
            className: inputCls,
            "data-ocid": "medstaff.register.email_input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "reg-password", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-password",
              type: showPw ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Minimal 8 karakter",
              className: inputCls,
              "data-ocid": "medstaff.register.password_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPw((v) => !v),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": showPw ? "Sembunyikan" : "Tampilkan",
              children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Konfirmasi Password",
            htmlFor: "reg-confirm-pw",
            required: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-confirm-pw",
                  type: showConfirmPw ? "text" : "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Ulangi password Anda",
                  className: inputCls,
                  "data-ocid": "medstaff.register.confirm_password_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowConfirmPw((v) => !v),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                  "aria-label": showConfirmPw ? "Sembunyikan" : "Tampilkan",
                  children: showConfirmPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 })
                }
              )
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 2, title: "Identitas & STR" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Nama Lengkap (sesuai Ijazah & STR)",
            htmlFor: "reg-name",
            required: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-name",
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Contoh: dr. Budi Santoso, Sp.PD",
                className: inputCls,
                "data-ocid": "medstaff.register.name_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Nomor STR (Surat Tanda Registrasi)",
            htmlFor: "reg-str",
            required: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-str",
                type: "text",
                value: strNumber,
                onChange: (e) => setStrNumber(e.target.value),
                placeholder: "Contoh: 19-2024-XXXXX",
                className: inputCls,
                "data-ocid": "medstaff.register.str_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Masa Berlaku STR", htmlFor: "reg-str-expiry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "reg-str-expiry",
            type: "date",
            value: strExpiry,
            onChange: (e) => setStrExpiry(e.target.value),
            className: inputCls,
            "data-ocid": "medstaff.register.str_expiry_input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FieldGroup,
          {
            label: "Unggah Berkas STR (Format PDF/Foto)",
            htmlFor: "reg-str-file",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-str-file",
                  type: "file",
                  accept: ".pdf,.jpg,.jpeg,.png",
                  onChange: (e) => {
                    var _a;
                    return setStrFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: inputCls,
                  "data-ocid": "medstaff.register.str_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 3, title: "Latar Belakang Pendidikan" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Asal Universitas / Institusi Pendidikan",
            htmlFor: "reg-univ",
            required: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-univ",
                type: "text",
                value: university,
                onChange: (e) => setUniversity(e.target.value),
                placeholder: "Contoh: Universitas Indonesia",
                className: inputCls,
                "data-ocid": "medstaff.register.university_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Tahun Kelulusan", htmlFor: "reg-grad-year", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "reg-grad-year",
            type: "number",
            min: 1970,
            max: 2030,
            value: graduationYear,
            onChange: (e) => setGraduationYear(e.target.value),
            placeholder: "Contoh: 2018",
            className: inputCls,
            "data-ocid": "medstaff.register.graduation_year_input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FieldGroup,
          {
            label: "Unggah Berkas Ijazah & Transkrip Nilai",
            htmlFor: "reg-ijazah",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-ijazah",
                  type: "file",
                  accept: ".pdf,.jpg,.jpeg,.png",
                  onChange: (e) => {
                    var _a;
                    return setIjazahFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: inputCls,
                  "data-ocid": "medstaff.register.ijazah_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 4, title: "Keanggotaan & Pengalaman" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Keanggotaan Organisasi Profesi (IDI / PPNI / IAI / IFI / dll.)",
            htmlFor: "reg-org",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-org",
                type: "text",
                value: professionalOrg,
                onChange: (e) => setProfessionalOrg(e.target.value),
                placeholder: "Contoh: PPNI No. 12345",
                className: inputCls,
                "data-ocid": "medstaff.register.org_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Riwayat Tempat Praktik / Kerja Sebelumnya",
            htmlFor: "reg-prev-work",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "reg-prev-work",
                value: previousWorkHistory,
                onChange: (e) => setPreviousWorkHistory(e.target.value),
                rows: 3,
                placeholder: "Contoh: RS Cipto Mangunkusumo (2018–2021), Klinik Sehat Bersama (2021–2022)",
                className: inputCls,
                "data-ocid": "medstaff.register.prev_work_textarea"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Total Pengalaman Kerja (dalam Tahun)",
            htmlFor: "reg-total-exp",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-total-exp",
                type: "number",
                min: 0,
                max: 50,
                value: totalExperienceYears,
                onChange: (e) => setTotalExperienceYears(e.target.value),
                placeholder: "Contoh: 5",
                className: inputCls,
                "data-ocid": "medstaff.register.total_exp_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Jenis Fasilitas Kesehatan Sebelumnya",
            htmlFor: "reg-prev-facility",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "reg-prev-facility",
                value: previousFacilityType,
                onChange: (e) => setPreviousFacilityType(e.target.value),
                className: inputCls,
                "data-ocid": "medstaff.register.prev_facility_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih Jenis Fasilitas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Klinik", children: "Klinik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Puskesmas", children: "Puskesmas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rumah Sakit", children: "Rumah Sakit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Lainnya", children: "Lainnya" })
                ]
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 5, title: "Tempat Kerja Saat Ini" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Nama Tempat Praktik / Kerja Saat Ini",
            htmlFor: "reg-cur-work",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-cur-work",
                type: "text",
                value: currentWorkplace,
                onChange: (e) => setCurrentWorkplace(e.target.value),
                placeholder: "Contoh: RS Premier Bintaro",
                className: inputCls,
                "data-ocid": "medstaff.register.current_workplace_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Lama Bekerja di Tempat Saat Ini (dalam Tahun)",
            htmlFor: "reg-cur-duration",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-cur-duration",
                type: "number",
                min: 0,
                max: 50,
                value: currentWorkDuration,
                onChange: (e) => setCurrentWorkDuration(e.target.value),
                placeholder: "Contoh: 2",
                className: inputCls,
                "data-ocid": "medstaff.register.current_duration_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Jenis Fasilitas Kesehatan Saat Ini",
            htmlFor: "reg-cur-facility",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "reg-cur-facility",
                value: currentFacilityType,
                onChange: (e) => setCurrentFacilityType(e.target.value),
                className: inputCls,
                "data-ocid": "medstaff.register.current_facility_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih Jenis Fasilitas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Klinik", children: "Klinik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Puskesmas", children: "Puskesmas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rumah Sakit", children: "Rumah Sakit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Lainnya", children: "Lainnya" })
                ]
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 6, title: "Sertifikasi Kegawatdaruratan" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Sertifikasi (ACLS / ATLS / BTCLS)",
            htmlFor: "reg-emerg-cert",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-emerg-cert",
                type: "text",
                value: emergencyCertification,
                onChange: (e) => setEmergencyCertification(e.target.value),
                placeholder: "Contoh: ACLS, BTCLS",
                className: inputCls,
                "data-ocid": "medstaff.register.emergency_cert_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Masa Berlaku Sertifikat Kegawatdaruratan",
            htmlFor: "reg-emerg-expiry",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-emerg-expiry",
                type: "date",
                value: emergencyCertExpiry,
                onChange: (e) => setEmergencyCertExpiry(e.target.value),
                className: inputCls,
                "data-ocid": "medstaff.register.emergency_cert_expiry_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldGroup,
          {
            label: "Sertifikat Pelatihan Tambahan (Hiperkes / Phlebotomy / dll.)",
            htmlFor: "reg-add-cert",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "reg-add-cert",
                value: additionalCertificates,
                onChange: (e) => setAdditionalCertificates(e.target.value),
                rows: 3,
                placeholder: "Contoh: Hiperkes (2021), Phlebotomy (2022), Perawatan Luka Modern (2023)",
                className: inputCls,
                "data-ocid": "medstaff.register.additional_certs_textarea"
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 7, title: "Kompetensi Medis" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldGroup,
        {
          label: "Kompetensi / Keahlian Medis yang Dikuasai",
          htmlFor: "reg-competencies",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "reg-competencies",
              value: medicalCompetencies,
              onChange: (e) => setMedicalCompetencies(e.target.value),
              rows: 4,
              placeholder: "Contoh: Perawatan Luka, Injeksi IV/IM, Pemasangan NGT, Pemasangan Kateter, Nebulisasi",
              className: inputCls,
              "data-ocid": "medstaff.register.competencies_textarea"
            }
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 8, title: "Dokumen Verifikasi" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FieldGroup,
          {
            label: "Unggah ID Card / Kartu Karyawan Tempat Kerja Saat Ini",
            htmlFor: "reg-emp-id",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-emp-id",
                  type: "file",
                  accept: ".pdf,.jpg,.jpeg,.png",
                  onChange: (e) => {
                    var _a;
                    return setEmployeeIdFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: inputCls,
                  "data-ocid": "medstaff.register.employee_id_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { label: "Unggah Foto KTP", htmlFor: "reg-ktp", required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-ktp",
              type: "file",
              accept: ".jpg,.jpeg,.png,.pdf",
              onChange: (e) => {
                var _a;
                return setKtpFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
              },
              className: inputCls,
              "data-ocid": "medstaff.register.ktp_upload"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: JPG, PNG, atau PDF" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          FieldGroup,
          {
            label: "Unggah Foto Swafoto (Selfie) Memegang KTP",
            htmlFor: "reg-selfie",
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-selfie",
                  type: "file",
                  accept: ".jpg,.jpeg,.png",
                  onChange: (e) => {
                    var _a;
                    return setSelfieFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: inputCls,
                  "data-ocid": "medstaff.register.selfie_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Foto selfie Anda sambil memegang KTP — pastikan wajah & teks KTP terlihat jelas." })
            ]
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base",
        "data-ocid": "medstaff.register.error_state",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        size: "lg",
        disabled: loading,
        className: "w-full text-lg py-6 font-bold",
        "data-ocid": "medstaff.register.submit_button",
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 20, className: "mr-2" }),
          " Daftar Sekarang"
        ] })
      }
    )
  ] });
}
function MedicalStaffRegisterPage() {
  var _a;
  const [selectedProfession, setSelectedProfession] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("daftar");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Bergabung sebagai Tenaga Medis Profesional" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-white/80", children: "Pilih profesi Anda untuk memulai pendaftaran" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex rounded-xl border border-border overflow-hidden mb-8",
          "data-ocid": "medstaff.tab",
          children: ["daftar", "masuk"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTab(t),
              className: `flex-1 py-3 text-base font-semibold transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
              "data-ocid": `medstaff.${t}_tab`,
              children: t === "daftar" ? "Daftar Sekarang" : "Sudah Terdaftar? Masuk"
            },
            t
          ))
        }
      ),
      tab === "masuk" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Masuk sebagai Tenaga Medis" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, {}) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-4", children: "Langkah 1: Pilih Profesi Anda" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: PROFESSIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedProfession(p.key),
              className: `rounded-xl border-2 p-5 text-left transition-all hover:shadow-md ${selectedProfession === p.key ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/50"}`,
              "data-ocid": `medstaff.profession.${p.key.toLowerCase()}_card`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: p.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-foreground text-lg mb-1 flex items-center gap-2", children: [
                  p.key,
                  selectedProfession === p.key && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", children: "Dipilih" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-snug", children: p.desc })
              ]
            },
            p.key
          )) })
        ] }),
        selectedProfession && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: (_a = PROFESSIONS.find((p) => p.key === selectedProfession)) == null ? void 0 : _a.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                "Profesi dipilih: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedProfession })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Lengkapi formulir pendaftaran di bawah ini" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-6", children: "Langkah 2: Isi Formulir Pendaftaran" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, { profession: selectedProfession })
        ] })
      ] })
    ] })
  ] });
}
export {
  MedicalStaffRegisterPage as default
};
