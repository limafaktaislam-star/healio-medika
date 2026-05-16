import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BMCDcUtm.js";
import { u as useActor, c as createActor } from "./backend-wp3yap7s.js";
import { B as Button } from "./button-Dgh0anEC.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-D1BeUdJQ.js";
const STORAGE_URL = void 0;
function NurseRegister() {
  const { actor } = useActor(createActor);
  const [name, setName] = reactExports.useState("");
  const [strNumber, setStrNumber] = reactExports.useState("");
  const [specialization, setSpecialization] = reactExports.useState("");
  const [experienceYears, setExperienceYears] = reactExports.useState(0);
  const [strFile, setStrFile] = reactExports.useState(null);
  const [ktpFile, setKtpFile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
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
        uploadFile(ktpFile)
      ]);
      await actor.registerAsNurse(
        name,
        strNumber,
        specialization,
        BigInt(experienceYears),
        strUrl,
        ktpUrl
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md w-full text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Pendaftaran Berhasil!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Pendaftaran berhasil! Menunggu verifikasi admin." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Daftar Sebagai Tenaga Medis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Lengkapi data diri dan dokumen Anda" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Data Profesional" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reg-name",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Nama Lengkap"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              placeholder: "Dr. Siti Rahayu, S.Kep",
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reg-str",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Nomor STR"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-str",
              type: "text",
              value: strNumber,
              onChange: (e) => setStrNumber(e.target.value),
              required: true,
              placeholder: "STR-2024-XXXXX",
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reg-specialization",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Spesialisasi"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "reg-specialization",
              value: specialization,
              onChange: (e) => setSpecialization(e.target.value),
              required: true,
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
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
              htmlFor: "reg-experience",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Pengalaman (Tahun)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-experience",
              type: "number",
              min: 0,
              max: 50,
              value: experienceYears,
              onChange: (e) => setExperienceYears(Number(e.target.value)),
              required: true,
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reg-str-file",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Dokumen STR (PDF/JPG)"
            }
          ),
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
              required: true,
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "reg-ktp-file",
              className: "block text-base font-semibold text-foreground mb-2",
              children: "Dokumen KTP (JPG/PNG)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "reg-ktp-file",
              type: "file",
              accept: ".jpg,.jpeg,.png,.pdf",
              onChange: (e) => {
                var _a;
                return setKtpFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
              },
              required: true,
              className: "w-full border border-input rounded-lg px-4 py-3 text-base bg-background text-foreground"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-base", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: loading,
            className: "w-full text-lg py-4",
            "data-ocid": "nurse.register.submit_button",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : "Daftar Sekarang"
          }
        )
      ] }) })
    ] })
  ] }) });
}
export {
  NurseRegister as default
};
