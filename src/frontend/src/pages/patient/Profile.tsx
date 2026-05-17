import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMyPatientProfile, useSavePatientProfile } from "@/hooks/useQueries";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Activity,
  Droplets,
  FileText,
  Heart,
  MapPin,
  Phone,
  RefreshCw,
  Shield,
  Upload,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const STORAGE_URL = import.meta.env.VITE_STORAGE_GATEWAY_URL as string;
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

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
      <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-base font-semibold text-foreground mb-2"
    >
      {children}
    </label>
  );
}

const inputCls =
  "w-full border border-input rounded-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
const textareaCls =
  "w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none";

function calculateAge(birthDate: string): number {
  if (!birthDate) return 0;
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

interface PhotoUploadProps {
  id: string;
  label: string;
  existingUrl?: string;
  previewUrl: string | null;
  onFileChange: (file: File | null, preview: string | null) => void;
  dataOcid: string;
}

function PhotoUpload({
  id,
  label,
  existingUrl,
  previewUrl,
  onFileChange,
  dataOcid,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onFileChange(file, ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      onFileChange(null, null);
    }
  };

  const displayUrl = previewUrl ?? existingUrl;

  return (
    <div className="space-y-3">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {displayUrl && (
        <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 h-40">
          <img
            src={displayUrl}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-3 w-full border-2 border-dashed border-primary/40 rounded-2xl px-5 py-4 text-base text-primary font-semibold hover:bg-primary/5 transition-smooth"
        data-ocid={dataOcid}
      >
        <Upload size={20} />
        {displayUrl ? "Ganti Foto" : "Pilih Foto"}
      </button>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
      <p className="text-sm text-muted-foreground">Format: JPG, PNG, WebP</p>
    </div>
  );
}

export default function PatientProfile() {
  const { data: profile, isLoading } = useMyPatientProfile();
  const saveProfile = useSavePatientProfile();
  const { actor } = useActor(createActor);

  // Section 1 — Identitas
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  // Section 2 — Kontak & Alamat
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Section 3 — Kontak Darurat
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  // Section 4 — Dokumen
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  // Legacy medis
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [bloodType, setBloodType] = useState("A");

  // Lokasi
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const computedAge = birthDate ? calculateAge(birthDate) : null;

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setNik(profile.nik ?? "");
      setBirthDate(profile.birthDate ?? "");
      setGender(profile.gender ?? "");
      setAddress(profile.address ?? "");
      setPhoneNumber(profile.phoneNumber ?? "");
      setEmergencyContactName(profile.emergencyContactName ?? "");
      setEmergencyContactRelation(profile.emergencyContactRelation ?? "");
      setEmergencyContactPhone(profile.emergencyContactPhone ?? "");
      setConditions(profile.conditions);
      setAllergies(profile.allergies);
      setBloodType(profile.bloodType || "A");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama lengkap harus diisi.");
      return;
    }
    if (nik && nik.length !== 16) {
      toast.error("NIK harus 16 digit.");
      return;
    }
    if (!actor) {
      toast.error("Koneksi tidak siap. Silakan coba lagi.");
      return;
    }

    try {
      let ktpPhotoUrl: string | null = profile?.ktpPhotoUrl ?? null;
      let selfieWithKtpUrl: string | null = profile?.selfieWithKtpUrl ?? null;

      if (ktpFile) ktpPhotoUrl = await uploadFile(ktpFile);
      if (selfieFile) selfieWithKtpUrl = await uploadFile(selfieFile);

      const age = birthDate
        ? BigInt(calculateAge(birthDate))
        : BigInt(profile?.age ?? 0);

      await saveProfile.mutateAsync({
        name: name.trim(),
        nik: nik.trim(),
        birthDate: birthDate,
        age,
        gender,
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
        emergencyContactName: emergencyContactName.trim(),
        emergencyContactRelation: emergencyContactRelation.trim(),
        emergencyContactPhone: emergencyContactPhone.trim(),
        ktpPhotoUrl,
        selfieWithKtpUrl,
        conditions: conditions.trim(),
        allergies: allergies.trim(),
        bloodType,
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
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Profil Pasien
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Lengkapi data diri untuk membantu perawat kami memberikan pelayanan
            terbaik
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1 — Data Identitas */}
          <SectionCard
            icon={<User size={22} className="text-primary" />}
            title="Data Identitas"
          >
            <div>
              <FieldLabel htmlFor="p-name">
                Nama Lengkap Pasien <span className="text-destructive">*</span>{" "}
                (sesuai KTP)
              </FieldLabel>
              <input
                id="p-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap sesuai KTP"
                className={inputCls}
                required
                data-ocid="profile.name_input"
              />
            </div>

            <div>
              <FieldLabel htmlFor="p-nik">
                Nomor Induk Kependudukan (NIK / KTP)
              </FieldLabel>
              <input
                id="p-nik"
                type="text"
                value={nik}
                onChange={(e) =>
                  setNik(e.target.value.replace(/\D/g, "").slice(0, 16))
                }
                placeholder="16 digit nomor KTP"
                maxLength={16}
                inputMode="numeric"
                className={inputCls}
                data-ocid="profile.nik_input"
              />
              {nik.length > 0 && nik.length !== 16 && (
                <p className="text-sm text-destructive mt-1">
                  NIK harus 16 digit ({nik.length}/16)
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="p-birthdate">Tanggal Lahir</FieldLabel>
                <input
                  id="p-birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={inputCls}
                  data-ocid="profile.birth_date_input"
                />
              </div>
              <div>
                <FieldLabel>Usia (Otomatis)</FieldLabel>
                <div className="flex items-center h-[54px] px-4 bg-muted/40 border border-border rounded-xl text-foreground font-semibold text-lg">
                  {computedAge !== null ? (
                    <span>
                      {computedAge}{" "}
                      <span className="text-muted-foreground text-base font-normal">
                        tahun
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-base font-normal">
                      —
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <FieldLabel>Jenis Kelamin</FieldLabel>
              <div className="flex gap-3" data-ocid="profile.gender_select">
                {["Laki-laki", "Perempuan"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-3.5 rounded-xl text-base font-semibold border transition-smooth ${
                      gender === g
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                    data-ocid={`profile.gender.${g === "Laki-laki" ? "male" : "female"}`}
                  >
                    {g === "Laki-laki" ? "👨 Laki-laki" : "👩 Perempuan"}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* SECTION 2 — Kontak & Alamat */}
          <SectionCard
            icon={<MapPin size={22} className="text-primary" />}
            title="Kontak & Alamat"
          >
            <div>
              <FieldLabel htmlFor="p-address">
                Alamat Domisili Saat Ini
              </FieldLabel>
              <textarea
                id="p-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Provinsi"
                className={textareaCls}
                data-ocid="profile.address_textarea"
              />
            </div>

            <div>
              <FieldLabel htmlFor="p-phone">
                Nomor Telepon Aktif (WhatsApp)
              </FieldLabel>
              <div className="flex">
                <span className="flex items-center px-4 bg-muted/40 border border-r-0 border-input rounded-l-xl text-foreground font-semibold text-base select-none">
                  +62
                </span>
                <input
                  id="p-phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="812 3456 7890"
                  inputMode="numeric"
                  className="flex-1 border border-input rounded-r-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.phone_input"
                />
              </div>
            </div>

            {/* Lokasi GPS */}
            <div className="pt-2">
              <p className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> Lokasi Rumah (GPS)
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Digunakan untuk menghitung jarak dan estimasi biaya kunjungan.
              </p>
              {location ? (
                <div className="space-y-3" data-ocid="profile.location_section">
                  <div className="bg-primary/8 border border-primary/20 rounded-2xl p-4">
                    <div className="text-sm font-semibold text-primary mb-1">
                      Lokasi Terdeteksi
                    </div>
                    <div className="text-sm text-foreground font-mono">
                      {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 h-40">
                    <img
                      src={`https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=14&size=600x200&markers=${location.lat},${location.lon},red`}
                      alt="Peta lokasi"
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
                  className="flex items-center gap-3 py-3 text-muted-foreground"
                  data-ocid="profile.location_loading_state"
                >
                  <LoadingSpinner size="sm" /> Mendeteksi lokasi GPS...
                </div>
              ) : (
                <div className="space-y-2">
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
          </SectionCard>

          {/* SECTION 3 — Kontak Darurat */}
          <SectionCard
            icon={<Phone size={22} className="text-primary" />}
            title="Kontak Darurat"
          >
            <p className="text-muted-foreground text-sm -mt-2">
              Akan dihubungi jika terjadi kondisi darurat saat kunjungan
            </p>

            <div>
              <FieldLabel htmlFor="p-ec-name">Nama Kontak Darurat</FieldLabel>
              <input
                id="p-ec-name"
                type="text"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className={inputCls}
                data-ocid="profile.emergency_name_input"
              />
            </div>

            <div>
              <FieldLabel htmlFor="p-ec-relation">
                Hubungan dengan Pasien
              </FieldLabel>
              <input
                id="p-ec-relation"
                type="text"
                value={emergencyContactRelation}
                onChange={(e) => setEmergencyContactRelation(e.target.value)}
                placeholder="Contoh: Ayah, Ibu, Suami, Istri, Anak"
                className={inputCls}
                data-ocid="profile.emergency_relation_input"
              />
            </div>

            <div>
              <FieldLabel htmlFor="p-ec-phone">
                Nomor Telepon Kontak Darurat
              </FieldLabel>
              <div className="flex">
                <span className="flex items-center px-4 bg-muted/40 border border-r-0 border-input rounded-l-xl text-foreground font-semibold text-base select-none">
                  +62
                </span>
                <input
                  id="p-ec-phone"
                  type="tel"
                  value={emergencyContactPhone}
                  onChange={(e) =>
                    setEmergencyContactPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="812 3456 7890"
                  inputMode="numeric"
                  className="flex-1 border border-input rounded-r-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.emergency_phone_input"
                />
              </div>
            </div>
          </SectionCard>

          {/* SECTION 4 — Dokumen Verifikasi */}
          <SectionCard
            icon={<Shield size={22} className="text-primary" />}
            title="Dokumen Verifikasi"
          >
            <p className="text-muted-foreground text-sm -mt-2">
              Foto KTP dan selfie diperlukan untuk verifikasi identitas pasien
            </p>

            <PhotoUpload
              id="ktp-photo"
              label="Foto KTP"
              existingUrl={profile?.ktpPhotoUrl}
              previewUrl={ktpPreview}
              onFileChange={(file, preview) => {
                setKtpFile(file);
                setKtpPreview(preview);
              }}
              dataOcid="profile.ktp_upload_button"
            />

            <PhotoUpload
              id="selfie-ktp-photo"
              label="Foto Swafoto (Selfie) Memegang KTP"
              existingUrl={profile?.selfieWithKtpUrl}
              previewUrl={selfiePreview}
              onFileChange={(file, preview) => {
                setSelfieFile(file);
                setSelfiePreview(preview);
              }}
              dataOcid="profile.selfie_upload_button"
            />
          </SectionCard>

          {/* Riwayat Medis */}
          <SectionCard
            icon={<Heart size={22} className="text-primary" />}
            title="Riwayat Medis"
          >
            <div>
              <FieldLabel>Golongan Darah</FieldLabel>
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
                    <Droplets size={14} className="inline mr-1 opacity-70" />
                    {bt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="p-conditions">
                <Activity size={16} className="inline mr-1" />
                Kondisi Kesehatan
              </FieldLabel>
              <textarea
                id="p-conditions"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                rows={3}
                placeholder="Contoh: Diabetes tipe 2, Hipertensi, Osteoporosis..."
                className={textareaCls}
                data-ocid="profile.conditions_textarea"
              />
            </div>

            <div>
              <FieldLabel htmlFor="p-allergies">
                <span className="mr-1">⚠️</span>
                Alergi
              </FieldLabel>
              <textarea
                id="p-allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                rows={2}
                placeholder="Contoh: Penisilin, Ibuprofen, Kacang-kacangan..."
                className={textareaCls}
                data-ocid="profile.allergies_textarea"
              />
            </div>
          </SectionCard>

          {/* Submit */}
          <button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-bold hover:opacity-90 disabled:opacity-50 transition-smooth shadow-lg flex items-center justify-center gap-3"
            data-ocid="profile.save_button"
          >
            <FileText size={22} />
            {saveProfile.isPending ? "Menyimpan..." : "Simpan Profil"}
          </button>

          {saveProfile.isSuccess && (
            <div
              className="bg-primary/10 border border-primary/30 rounded-2xl px-5 py-4 text-center text-primary font-semibold text-base"
              data-ocid="profile.success_state"
            >
              ✅ Profil berhasil disimpan!
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
