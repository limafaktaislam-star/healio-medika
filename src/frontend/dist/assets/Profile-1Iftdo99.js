import { c as useQueryClient, b as useActor, h as useQuery, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { N as NurseStatusBadge } from "./StatusBadge-DGxNJ-Ri.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkAxztn.js";
import { u as useMutation } from "./useMutation-CzdLgPbW.js";
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
const STORAGE_URL = void 0;
function NurseProfile() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching
  });
  const [name, setName] = reactExports.useState("");
  const [strNumber, setStrNumber] = reactExports.useState("");
  const [specialization, setSpecialization] = reactExports.useState("");
  const [experienceYears, setExperienceYears] = reactExports.useState(0);
  const [strFile, setStrFile] = reactExports.useState(null);
  const [ktpFile, setKtpFile] = reactExports.useState(null);
  const [saveSuccess, setSaveSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setStrNumber(profile.strNumber);
      setSpecialization(profile.specialization);
      setExperienceYears(Number(profile.experienceYears));
    }
  }, [profile]);
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
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("actor tidak siap");
      const strUrl = strFile ? await uploadFile(strFile) : (profile == null ? void 0 : profile.strDocumentUrl) ?? (profile == null ? void 0 : profile.strDocUrl) ?? null;
      const ktpUrl = ktpFile ? await uploadFile(ktpFile) : (profile == null ? void 0 : profile.ktpPhotoUrl) ?? (profile == null ? void 0 : profile.ktpDocUrl) ?? null;
      return actor.saveNurseProfile(
        name,
        strNumber,
        (profile == null ? void 0 : profile.strExpiry) ?? "",
        strUrl,
        specialization,
        (profile == null ? void 0 : profile.profession) ?? "perawat",
        (profile == null ? void 0 : profile.university) ?? "",
        (profile == null ? void 0 : profile.graduationYear) ?? 0n,
        (profile == null ? void 0 : profile.ijazahDocumentUrl) ?? null,
        (profile == null ? void 0 : profile.professionalOrg) ?? "",
        (profile == null ? void 0 : profile.previousWorkHistory) ?? "",
        (profile == null ? void 0 : profile.totalExperienceYears) ?? 0n,
        (profile == null ? void 0 : profile.previousFacilityType) ?? "",
        (profile == null ? void 0 : profile.currentWorkplace) ?? "",
        (profile == null ? void 0 : profile.currentWorkDuration) ?? 0n,
        (profile == null ? void 0 : profile.currentFacilityType) ?? "",
        (profile == null ? void 0 : profile.emergencyCertification) ?? "",
        (profile == null ? void 0 : profile.emergencyCertExpiry) ?? "",
        (profile == null ? void 0 : profile.additionalCertificates) ?? "",
        (profile == null ? void 0 : profile.medicalCompetencies) ?? "",
        (profile == null ? void 0 : profile.employeeIdCardUrl) ?? null,
        ktpUrl,
        (profile == null ? void 0 : profile.selfieWithKtpUrl) ?? null
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nurseProfile"] });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4e3);
    }
  });
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto py-16 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Profil tidak ditemukan. Harap daftar terlebih dahulu." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Profil Saya" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mt-1", children: "Perbarui data profesional Anda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NurseStatusBadge, { status: profile.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Data Profesional" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            saveMutation.mutate();
          },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "profile-name",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Nama Lengkap"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "profile-name",
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true,
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "nurse.profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "profile-str",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Nomor STR"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "profile-str",
                  type: "text",
                  value: strNumber,
                  onChange: (e) => setStrNumber(e.target.value),
                  required: true,
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "nurse.profile.str_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "profile-specialization",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Spesialisasi"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "profile-specialization",
                  value: specialization,
                  onChange: (e) => setSpecialization(e.target.value),
                  required: true,
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "nurse.profile.specialization_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Pilih Spesialisasi" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Umum", children: "Perawat Umum" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Lansia", children: "Perawat Lansia" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bidan", children: "Bidan" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fisioterapis", children: "Fisioterapis" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Luka", children: "Perawat Luka" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perawat Pasca Operasi", children: "Perawat Pasca Operasi" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "profile-experience",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Pengalaman (Tahun)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "profile-experience",
                  type: "number",
                  min: 0,
                  max: 50,
                  value: experienceYears,
                  onChange: (e) => setExperienceYears(Number(e.target.value)),
                  required: true,
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  "data-ocid": "nurse.profile.experience_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "str-update",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Perbarui Dokumen STR (opsional)"
                }
              ),
              profile.strDocUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                "Dokumen saat ini:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: profile.strDocUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-primary underline",
                    children: "Lihat STR"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "str-update",
                  type: "file",
                  accept: ".pdf,.jpg,.jpeg,.png",
                  onChange: (e) => {
                    var _a;
                    return setStrFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground",
                  "data-ocid": "nurse.profile.str_upload"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "ktp-update",
                  className: "block text-base font-semibold text-foreground mb-2",
                  children: "Perbarui Dokumen KTP (opsional)"
                }
              ),
              profile.ktpDocUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                "Dokumen saat ini:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: profile.ktpDocUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-primary underline",
                    children: "Lihat KTP"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "ktp-update",
                  type: "file",
                  accept: ".jpg,.jpeg,.png,.pdf",
                  onChange: (e) => {
                    var _a;
                    return setKtpFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                  },
                  className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground",
                  "data-ocid": "nurse.profile.ktp_upload"
                }
              )
            ] }),
            saveMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base", children: "Terjadi kesalahan saat menyimpan. Silakan coba lagi." }),
            saveSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-base",
                "data-ocid": "nurse.profile.success_state",
                children: "✅ Profil berhasil diperbarui!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                disabled: saveMutation.isPending,
                className: "w-full text-lg py-4",
                "data-ocid": "nurse.profile.save_button",
                children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "💾 Simpan Perubahan"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  NurseProfile as default
};
