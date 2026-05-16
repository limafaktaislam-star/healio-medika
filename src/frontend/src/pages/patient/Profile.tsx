import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMyPatientProfile, useSavePatientProfile } from "@/hooks/useQueries";
import {
  Activity,
  Droplets,
  Heart,
  MapPin,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const BLOOD_TYPES = [
  "A",
  "B",
  "AB",
  "O",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 text-base font-semibold text-foreground">
        {icon}
        {label}
      </p>
      {children}
    </div>
  );
}

export default function PatientProfile() {
  const { data: profile, isLoading } = useMyPatientProfile();
  const saveProfile = useSavePatientProfile();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [bloodType, setBloodType] = useState("A");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(profile.age.toString());
      setConditions(profile.conditions);
      setAllergies(profile.allergies);
      setBloodType(profile.bloodType || "A");
      setEmergencyContact(profile.emergencyContact);
    }
  }, [profile]);

  const requestLocation = useCallback(() => {
    setLocationError(null);
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Browser tidak mendukung geolokasi.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLocationLoading(false);
      },
      () => {
        setLocationError("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
        setLocationLoading(false);
      },
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      toast.error("Usia tidak valid.");
      return;
    }
    if (!name.trim()) {
      toast.error("Nama lengkap harus diisi.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        age: BigInt(ageNum),
        conditions: conditions.trim(),
        allergies: allergies.trim(),
        bloodType,
        emergencyContact: emergencyContact.trim(),
      });
      toast.success("Profil berhasil disimpan!");
    } catch {
      toast.error("Gagal menyimpan profil. Silakan coba lagi.");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Memuat profil..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Profil Saya
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Lengkapi data diri untuk membantu perawat kami
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info Card */}
          <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <User size={22} className="text-primary" /> Data Pribadi
            </h2>

            <FormField
              label="Nama Lengkap"
              icon={<User size={18} className="text-primary" />}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full border border-input rounded-xl px-4 py-3.5 text-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
                data-ocid="profile.name_input"
              />
            </FormField>

            <FormField
              label="Usia"
              icon={<span className="text-base">🎂</span>}
            >
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Contoh: 65"
                min="1"
                max="150"
                className="w-full border border-input rounded-xl px-4 py-3.5 text-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
                data-ocid="profile.age_input"
              />
            </FormField>

            <FormField
              label="Golongan Darah"
              icon={<Droplets size={18} className="text-primary" />}
            >
              <div
                className="flex flex-wrap gap-2"
                data-ocid="profile.blood_type_select"
              >
                {BLOOD_TYPES.map((bt) => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setBloodType(bt)}
                    className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-smooth border ${
                      bloodType === bt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                    data-ocid={`profile.blood_type.${bt}`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {/* Medical Info Card */}
          <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <Heart size={22} className="text-primary" /> Riwayat Medis
            </h2>

            <FormField
              label="Kondisi Kesehatan"
              icon={<Activity size={18} className="text-primary" />}
            >
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                rows={3}
                placeholder="Contoh: Diabetes tipe 2, Hipertensi, Osteoporosis..."
                className="w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                data-ocid="profile.conditions_textarea"
              />
            </FormField>

            <FormField
              label="Alergi"
              icon={<span className="text-base">⚠️</span>}
            >
              <textarea
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                rows={2}
                placeholder="Contoh: Penisilin, Ibuprofen, Kacang-kacangan..."
                className="w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                data-ocid="profile.allergies_textarea"
              />
            </FormField>
          </div>

          {/* Emergency Contact */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-5">
              <Phone size={22} className="text-primary" /> Kontak Darurat
            </h2>
            <FormField
              label="Nama dan Nomor Telepon"
              icon={<Phone size={18} className="text-primary" />}
            >
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Contoh: Budi (Anak) - 0812-3456-7890"
                className="w-full border border-input rounded-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="profile.emergency_contact_input"
              />
            </FormField>
          </div>

          {/* Location Card */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
              <MapPin size={22} className="text-primary" /> Lokasi Rumah
            </h2>
            <p className="text-muted-foreground text-base mb-4">
              Lokasi rumah Anda digunakan untuk menghitung jarak dan biaya
              kunjungan.
            </p>
            {location ? (
              <div className="space-y-3" data-ocid="profile.location_section">
                <div className="bg-primary/8 border border-primary/20 rounded-2xl p-4">
                  <div className="text-sm font-semibold text-primary mb-2">
                    Lokasi Terdeteksi
                  </div>
                  <div className="text-base text-foreground font-mono">
                    {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 h-48 flex items-center justify-center">
                  <img
                    src={`https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=14&size=600x200&markers=${location.lat},${location.lon},red`}
                    alt="Peta lokasi rumah"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={requestLocation}
                  className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                  data-ocid="profile.refresh_location_button"
                >
                  <RefreshCw size={14} /> Perbarui Lokasi
                </button>
              </div>
            ) : locationLoading ? (
              <div
                className="flex items-center gap-3 py-4 text-muted-foreground"
                data-ocid="profile.location_loading_state"
              >
                <LoadingSpinner size="sm" /> Mendeteksi lokasi GPS...
              </div>
            ) : (
              <div className="space-y-3">
                {locationError && (
                  <p
                    className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                    data-ocid="profile.location_error_state"
                  >
                    {locationError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={requestLocation}
                  className="flex items-center gap-2 px-5 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl text-base font-semibold hover:bg-primary/15 transition-smooth"
                  data-ocid="profile.get_location_button"
                >
                  <MapPin size={18} /> Deteksi Lokasi Saya
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-bold hover:opacity-90 disabled:opacity-50 transition-smooth shadow-lg"
            data-ocid="profile.save_button"
          >
            {saveProfile.isPending ? "Menyimpan..." : "Simpan Profil"}
          </button>

          {saveProfile.isSuccess && (
            <div
              className="bg-primary/10 border border-primary/30 rounded-2xl px-5 py-4 text-center text-primary font-semibold text-base"
              data-ocid="profile.success_state"
            >
              Profil berhasil disimpan!
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
