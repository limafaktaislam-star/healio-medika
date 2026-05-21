import { b as useActor, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DEkAxztn.js";
import { l as useSaveEmailPassword } from "./useQueries-BuxrTd_z.js";
import "./useMutation-CzdLgPbW.js";
const STORAGE_URL = void 0;
const inputCls = "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
function SectionTitle({ number, title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0", children: number }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground", children: title })
  ] });
}
function FieldGroup({
  label,
  htmlFor,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor,
        className: "block text-base font-semibold text-foreground mb-2",
        children: label
      }
    ),
    children
  ] });
}
function NurseRegister() {
  const { actor } = useActor(createActor);
  const saveEmailPassword = useSaveEmailPassword();
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [profession, setProfession] = reactExports.useState("Perawat");
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
  const [specialization, setSpecialization] = reactExports.useState("");
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
  async function handleSubmit(e) {
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
        selfieUrl
      );
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md w-full text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Pendaftaran Berhasil!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Data Anda telah diterima. Menunggu verifikasi oleh admin." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground mb-1", children: "Daftar Sebagai Tenaga Medis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Lengkapi semua data untuk proses verifikasi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 0, title: "Data Akun (Email & Password)" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Profesi *", htmlFor: "reg-profession", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reg-profession",
              value: profession,
              onChange: (e) => setProfession(e.target.value),
              className: inputCls,
              "data-ocid": "nurse.register.profession_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Dokter", children: "Dokter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat", children: "Perawat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bidan", children: "Bidan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fisioterapis", children: "Fisioterapis" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { label: "Email", htmlFor: "reg-email", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "Contoh: nama@email.com",
                className: inputCls,
                "data-ocid": "nurse.register.email_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Email digunakan untuk login ke aplikasi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Password", htmlFor: "reg-password", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Minimal 8 karakter",
              className: inputCls,
              "data-ocid": "nurse.register.password_input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Konfirmasi Password",
              htmlFor: "reg-confirm-password",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-confirm-password",
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Ulangi password",
                  className: inputCls,
                  "data-ocid": "nurse.register.confirm_password_input"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 1, title: "Data Pribadi & STR" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Nama Lengkap (sesuai Ijazah & STR) *",
              htmlFor: "reg-name",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-name",
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true,
                  placeholder: "Contoh: Ns. Siti Rahayu, S.Kep",
                  className: inputCls,
                  "data-ocid": "nurse.register.name_input"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Nomor STR (Surat Tanda Registrasi) *",
              htmlFor: "reg-str",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-str",
                  type: "text",
                  value: strNumber,
                  onChange: (e) => setStrNumber(e.target.value),
                  required: true,
                  placeholder: "Contoh: 19-2024-XXXXX",
                  className: inputCls,
                  "data-ocid": "nurse.register.str_input"
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
              "data-ocid": "nurse.register.str_expiry_input"
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
                    "data-ocid": "nurse.register.str_upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldGroup, { label: "Spesialisasi", htmlFor: "reg-specialization", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reg-specialization",
              value: specialization,
              onChange: (e) => setSpecialization(e.target.value),
              className: inputCls,
              "data-ocid": "nurse.register.specialization_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih Spesialisasi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Umum", children: "Perawat Umum" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Lansia", children: "Perawat Lansia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bidan", children: "Bidan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fisioterapis", children: "Fisioterapis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Luka", children: "Perawat Luka" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Pasca Operasi", children: "Perawat Pasca Operasi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Dokter Umum", children: "Dokter Umum" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 2, title: "Latar Belakang Pendidikan" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Asal Universitas / Institusi Pendidikan",
              htmlFor: "reg-university",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-university",
                  type: "text",
                  value: university,
                  onChange: (e) => setUniversity(e.target.value),
                  placeholder: "Contoh: Universitas Indonesia",
                  className: inputCls,
                  "data-ocid": "nurse.register.university_input"
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
              "data-ocid": "nurse.register.graduation_year_input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            FieldGroup,
            {
              label: "Unggah Berkas Ijazah & Transkrip Nilai (Format PDF/Foto)",
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
                    "data-ocid": "nurse.register.ijazah_upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 3, title: "Keanggotaan & Pengalaman" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Keanggotaan Organisasi Profesi (IDI / PPNI / IAI / dll.)",
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
                  "data-ocid": "nurse.register.org_input"
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
                  "data-ocid": "nurse.register.prev_work_textarea"
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
                  "data-ocid": "nurse.register.total_exp_input"
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
                  "data-ocid": "nurse.register.prev_facility_select",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 4, title: "Pekerjaan Saat Ini" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Riwayat Tempat Praktik / Kerja Saat Ini",
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
                  "data-ocid": "nurse.register.current_workplace_input"
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
                  "data-ocid": "nurse.register.current_duration_input"
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
                  "data-ocid": "nurse.register.current_facility_select",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 5, title: "Sertifikasi Kegawatdaruratan" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Sertifikasi Kegawatdaruratan (ACLS / ATLS / BTCLS)",
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
                  "data-ocid": "nurse.register.emergency_cert_input"
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
                  "data-ocid": "nurse.register.emergency_cert_expiry_input"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldGroup,
            {
              label: "Sertifikat Pelatihan Tambahan (Hiperkes / Phlebotomy / Perawatan Luka / dll.)",
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
                  "data-ocid": "nurse.register.additional_certs_textarea"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 6, title: "Kompetensi Medis" }) }) }),
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
                "data-ocid": "nurse.register.competencies_textarea"
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { number: 7, title: "Dokumen Verifikasi" }) }) }),
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
                    "data-ocid": "nurse.register.employee_id_upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: PDF, JPG, atau PNG" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { label: "Unggah Foto KTP", htmlFor: "reg-ktp", children: [
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
                "data-ocid": "nurse.register.ktp_upload"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Format: JPG, PNG, atau PDF" })
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
                    accept: ".jpg,.jpeg,.png",
                    onChange: (e) => {
                      var _a;
                      return setSelfieFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                    },
                    className: inputCls,
                    "data-ocid": "nurse.register.selfie_upload"
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
          "data-ocid": "nurse.register.error_state",
          children: error
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          disabled: loading,
          className: "w-full text-lg py-5",
          "data-ocid": "nurse.register.submit_button",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "Daftar Sekarang"
        }
      )
    ] })
  ] }) });
}
export {
  NurseRegister as default
};
