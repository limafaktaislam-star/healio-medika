import { b as useActor, r as reactExports, j as jsxRuntimeExports, d as createActor } from "./index-CogN6nIg.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { u as ue } from "./index-DjiNClVB.js";
import { S as Settings } from "./settings-DfRA-wpg.js";
import { S as Save } from "./save-DI1isqPK.js";
import { T as TriangleAlert } from "./triangle-alert-CjMzrDOX.js";
import "./createLucideIcon-BbcVMltS.js";
const DEFAULT_CONFIG = {
  appName: "HEALIO MEDIKA",
  supportPhone: "+62 812-3456-7890",
  supportEmail: "support@healiomedika.id",
  maintenanceMode: false
};
function PlatformSettings() {
  const { actor } = useActor(createActor);
  const [saved, setSaved] = reactExports.useState({ ...DEFAULT_CONFIG });
  const [form, setForm] = reactExports.useState({ ...DEFAULT_CONFIG });
  const [showResetConfirm, setShowResetConfirm] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const settings = await actor.getPlatformSettings();
        setForm({
          appName: settings.appName,
          supportPhone: settings.supportPhone,
          supportEmail: settings.supportEmail,
          maintenanceMode: settings.maintenanceMode
        });
        setSaved({
          appName: settings.appName,
          supportPhone: settings.supportPhone,
          supportEmail: settings.supportEmail,
          maintenanceMode: settings.maintenanceMode
        });
      } catch {
      }
    })();
  }, [actor]);
  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await actor.updatePlatformSettings(form);
    } catch {
    }
    await new Promise((r) => setTimeout(r, 600));
    setSaved({ ...form });
    setIsSaving(false);
    ue.success("Pengaturan platform berhasil disimpan");
  };
  const handleReset = () => {
    setForm({ ...DEFAULT_CONFIG });
    setSaved({ ...DEFAULT_CONFIG });
    setShowResetConfirm(false);
    ue.success("Pengaturan direset ke nilai default");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 28 }),
        " Pengaturan Platform"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-base", children: "Konfigurasi umum aplikasi HEALIO MEDIKA" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-xl px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Nilai Tersimpan Saat Ini" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nama Aplikasi:" }),
            " ",
            saved.appName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Telepon Support:" }),
            " ",
            saved.supportPhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email Support:" }),
            " ",
            saved.supportEmail
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Mode Pemeliharaan:" }),
            " ",
            saved.maintenanceMode ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 font-semibold", children: "AKTIF" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 font-semibold", children: "Nonaktif" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Pengaturan Umum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settings-app-name",
              className: "block text-sm font-semibold text-foreground",
              children: "Nama Aplikasi"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "settings-app-name",
              type: "text",
              value: form.appName,
              onChange: (e) => setForm((p) => ({ ...p, appName: e.target.value })),
              className: "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "settings.app_name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settings-support-phone",
              className: "block text-sm font-semibold text-foreground",
              children: "Nomor Telepon Support"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "settings-support-phone",
              type: "tel",
              value: form.supportPhone,
              onChange: (e) => setForm((p) => ({ ...p, supportPhone: e.target.value })),
              className: "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "settings.support_phone_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settings-support-email",
              className: "block text-sm font-semibold text-foreground",
              children: "Email Support"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "settings-support-email",
              type: "email",
              value: form.supportEmail,
              onChange: (e) => setForm((p) => ({ ...p, supportEmail: e.target.value })),
              className: "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "settings.support_email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Mode Pemeliharaan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Saat aktif, halaman utama menampilkan pesan pemeliharaan kepada pengguna" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": form.maintenanceMode,
              onClick: () => setForm((p) => ({
                ...p,
                maintenanceMode: !p.maintenanceMode
              })),
              className: `relative inline-flex w-12 h-6 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${form.maintenanceMode ? "bg-amber-500" : "bg-muted-foreground/30"}`,
              "data-ocid": "settings.maintenance_toggle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${form.maintenanceMode ? "translate-x-6" : "translate-x-1"}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: handleSave,
            disabled: !isDirty || isSaving,
            className: "w-full bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white gap-2 py-3",
            "data-ocid": "settings.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18 }),
              isSaving ? "Menyimpan..." : "Simpan Pengaturan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-red-200 rounded-xl p-6 bg-red-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-red-700 flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20 }),
          " Zona Berbahaya"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 mb-4", children: "Reset semua pengaturan ke nilai default. Tindakan ini tidak dapat dibatalkan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            onClick: () => setShowResetConfirm(true),
            className: "gap-2",
            "data-ocid": "settings.reset_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 }),
              " Reset ke Default"
            ]
          }
        )
      ] })
    ] }),
    showResetConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.5)" },
        "data-ocid": "settings.reset_dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 24, className: "text-red-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "Reset ke Default?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Semua pengaturan platform akan dikembalikan ke nilai awal. Apakah Anda yakin?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowResetConfirm(false),
                "data-ocid": "settings.reset_cancel_button",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                className: "flex-1",
                onClick: handleReset,
                "data-ocid": "settings.reset_confirm_button",
                children: "Ya, Reset"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  PlatformSettings as default
};
