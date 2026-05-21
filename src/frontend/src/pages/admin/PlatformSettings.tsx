import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { AlertTriangle, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PlatformConfig {
  appName: string;
  supportPhone: string;
  supportEmail: string;
  maintenanceMode: boolean;
}

const DEFAULT_CONFIG: PlatformConfig = {
  appName: "HEALIO MEDIKA",
  supportPhone: "+62 812-3456-7890",
  supportEmail: "support@healiomedika.id",
  maintenanceMode: false,
};

export default function PlatformSettings() {
  const { actor } = useActor(createActor);
  const [saved, setSaved] = useState<PlatformConfig>({ ...DEFAULT_CONFIG });
  const [form, setForm] = useState<PlatformConfig>({ ...DEFAULT_CONFIG });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const settings = await actor.getPlatformSettings();
        setForm({
          appName: settings.appName,
          supportPhone: settings.supportPhone,
          supportEmail: settings.supportEmail,
          maintenanceMode: settings.maintenanceMode,
        });
        setSaved({
          appName: settings.appName,
          supportPhone: settings.supportPhone,
          supportEmail: settings.supportEmail,
          maintenanceMode: settings.maintenanceMode,
        });
      } catch {}
    })();
  }, [actor]);

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await (actor as any).updatePlatformSettings(form);
    } catch {}
    await new Promise((r) => setTimeout(r, 600));
    setSaved({ ...form });
    setIsSaving(false);
    toast.success("Pengaturan platform berhasil disimpan");
  };

  const handleReset = () => {
    setForm({ ...DEFAULT_CONFIG });
    setSaved({ ...DEFAULT_CONFIG });
    setShowResetConfirm(false);
    toast.success("Pengaturan direset ke nilai default");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Settings size={28} /> Pengaturan Platform
          </h1>
          <p className="text-white/75 text-base">
            Konfigurasi umum aplikasi HEALIO MEDIKA
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Current Values Banner */}
        <div className="bg-muted/40 border border-border rounded-xl px-5 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Nilai Tersimpan Saat Ini
          </p>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <span>
              <strong>Nama Aplikasi:</strong> {saved.appName}
            </span>
            <span>
              <strong>Telepon Support:</strong> {saved.supportPhone}
            </span>
            <span>
              <strong>Email Support:</strong> {saved.supportEmail}
            </span>
            <span>
              <strong>Mode Pemeliharaan:</strong>{" "}
              {saved.maintenanceMode ? (
                <span className="text-amber-600 font-semibold">AKTIF</span>
              ) : (
                <span className="text-emerald-600 font-semibold">Nonaktif</span>
              )}
            </span>
          </div>
        </div>

        {/* Settings Form */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Pengaturan Umum</h2>

          <div className="space-y-1">
            <label
              htmlFor="settings-app-name"
              className="block text-sm font-semibold text-foreground"
            >
              Nama Aplikasi
            </label>
            <input
              id="settings-app-name"
              type="text"
              value={form.appName}
              onChange={(e) =>
                setForm((p) => ({ ...p, appName: e.target.value }))
              }
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="settings.app_name_input"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="settings-support-phone"
              className="block text-sm font-semibold text-foreground"
            >
              Nomor Telepon Support
            </label>
            <input
              id="settings-support-phone"
              type="tel"
              value={form.supportPhone}
              onChange={(e) =>
                setForm((p) => ({ ...p, supportPhone: e.target.value }))
              }
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="settings.support_phone_input"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="settings-support-email"
              className="block text-sm font-semibold text-foreground"
            >
              Email Support
            </label>
            <input
              id="settings-support-email"
              type="email"
              value={form.supportEmail}
              onChange={(e) =>
                setForm((p) => ({ ...p, supportEmail: e.target.value }))
              }
              className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="settings.support_email_input"
            />
          </div>

          {/* Maintenance Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div>
              <p className="font-semibold text-foreground">Mode Pemeliharaan</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Saat aktif, halaman utama menampilkan pesan pemeliharaan kepada
                pengguna
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.maintenanceMode}
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  maintenanceMode: !p.maintenanceMode,
                }))
              }
              className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                form.maintenanceMode ? "bg-amber-500" : "bg-muted-foreground/30"
              }`}
              data-ocid="settings.maintenance_toggle"
            >
              <span
                className={`inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  form.maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className="w-full bg-[#0a4d3c] hover:bg-[#0d5e4a] text-white gap-2 py-3"
            data-ocid="settings.save_button"
          >
            <Save size={18} />
            {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-200 rounded-xl p-6 bg-red-50">
          <h2 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-2">
            <AlertTriangle size={20} /> Zona Berbahaya
          </h2>
          <p className="text-sm text-red-600 mb-4">
            Reset semua pengaturan ke nilai default. Tindakan ini tidak dapat
            dibatalkan.
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setShowResetConfirm(true)}
            className="gap-2"
            data-ocid="settings.reset_button"
          >
            <AlertTriangle size={16} /> Reset ke Default
          </Button>
        </div>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          data-ocid="settings.reset_dialog"
        >
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Reset ke Default?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Semua pengaturan platform akan dikembalikan ke nilai awal. Apakah
              Anda yakin?
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowResetConfirm(false)}
                data-ocid="settings.reset_cancel_button"
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={handleReset}
                data-ocid="settings.reset_confirm_button"
              >
                Ya, Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
