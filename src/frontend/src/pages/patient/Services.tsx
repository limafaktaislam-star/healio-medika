import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  useCreateBooking,
  useEstimateCost,
  useListServices,
} from "@/hooks/useQueries";
import {
  CONSULTATION_ONLY_CATEGORIES,
  FRONTEND_CATEGORY_ICONS,
  FRONTEND_CATEGORY_LABELS,
  type FrontendCategory,
  LOCATION_BASED_CATEGORIES,
  SERVICE_CATEGORY_ICONS,
  SERVICE_CATEGORY_LABELS,
} from "@/types";
import type { Service } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Stethoscope,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Constants ───────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "18:00",
  "19:00",
  "19:30",
  "20:00",
];

const ALL_FRONTEND_CATEGORIES: FrontendCategory[] = [
  "dokter",
  "perawat",
  "bidan",
  "fisioterapi",
  "ambulans",
  "apotek",
];

interface SubServiceOption {
  label: string;
  desc: string;
  icon: string;
}

const SUB_SERVICE_OPTIONS: Record<FrontendCategory, SubServiceOption[]> = {
  dokter: [
    {
      label: "Konsultasi Umum",
      desc: "Keluhan kesehatan sehari-hari, cek kondisi umum",
      icon: "🩺",
    },
    {
      label: "Konsultasi Spesialis",
      desc: "Jantung, paru, saraf, dan spesialisasi lainnya",
      icon: "🫀",
    },
    {
      label: "Konsultasi Online",
      desc: "Video call dengan dokter berpengalaman",
      icon: "💻",
    },
  ],
  perawat: [
    {
      label: "Perawatan Lansia",
      desc: "Pendampingan dan perawatan harian untuk lansia",
      icon: "👴",
    },
    {
      label: "Perawatan Luka",
      desc: "Ganti balut, perawatan luka operasi dan kronik",
      icon: "🩹",
    },
    {
      label: "Perawatan Pasca Operasi",
      desc: "Pemantauan kondisi dan perawatan pasca bedah",
      icon: "🏥",
    },
    {
      label: "Perawatan Bayi",
      desc: "Perawatan bayi baru lahir dan anak kecil",
      icon: "👶",
    },
  ],
  bidan: [
    {
      label: "Pemeriksaan Kehamilan",
      desc: "ANC terpadu, USG, dan pantau tumbuh kembang janin",
      icon: "🤰",
    },
    {
      label: "Persalinan Rumah",
      desc: "Pendampingan persalinan normal di rumah",
      icon: "🏠",
    },
    {
      label: "Perawatan Nifas",
      desc: "Perawatan ibu dan bayi setelah melahirkan",
      icon: "🤱",
    },
    {
      label: "Imunisasi Bayi",
      desc: "Vaksinasi lengkap sesuai jadwal Kemenkes",
      icon: "💉",
    },
  ],
  fisioterapi: [
    {
      label: "Fisioterapi Umum",
      desc: "Nyeri otot, sendi, dan gangguan gerak umum",
      icon: "💪",
    },
    {
      label: "Fisioterapi Stroke",
      desc: "Pemulihan gerak pasca stroke dan trauma otak",
      icon: "🧠",
    },
    {
      label: "Fisioterapi Ortopedi",
      desc: "Pasca operasi tulang, patah tulang, sendi",
      icon: "🦴",
    },
    {
      label: "Fisioterapi Pediatri",
      desc: "Terapi tumbuh kembang anak, CP, keterlambatan",
      icon: "🧒",
    },
  ],
  ambulans: [
    {
      label: "Ambulans Transport",
      desc: "Antar jemput pasien rawat inap atau rujukan",
      icon: "🚗",
    },
    {
      label: "Ambulans Gawat Darurat",
      desc: "Respons cepat kondisi darurat, dilengkapi ALS",
      icon: "🚨",
    },
    {
      label: "Ambulans Jenazah",
      desc: "Transportasi jenazah dengan penanganan khusus",
      icon: "🕯️",
    },
  ],
  apotek: [
    {
      label: "Antar Obat Resep",
      desc: "Obat dengan resep dokter diantar ke rumah Anda",
      icon: "📋",
    },
    {
      label: "Obat Bebas & Vitamin",
      desc: "Suplemen, vitamin, dan obat tanpa resep",
      icon: "💊",
    },
    {
      label: "Alat Kesehatan",
      desc: "Tensimeter, glukometer, nebulizer, dan lainnya",
      icon: "🩺",
    },
    {
      label: "Konsultasi Apoteker",
      desc: "Tanya dosis, efek samping, dan interaksi obat",
      icon: "💬",
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRupiah(value: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function isNightTime(time: string): boolean {
  const hour = Number.parseInt(time.split(":")[0]);
  return hour >= 18 || hour < 6;
}

function isApotekOpen(): boolean {
  const hour = new Date().getHours();
  return hour >= 8 && hour < 22;
}

function mapFrontendToBackendCategory(cat: FrontendCategory): string {
  const mapping: Record<FrontendCategory, string> = {
    dokter: "physiotherapy",
    perawat: "elderlycare",
    bidan: "woundcare",
    fisioterapi: "physiotherapy",
    ambulans: "ambulance",
    apotek: "postopcare",
  };
  return mapping[cat];
}

// ─── SubServiceSelectionModal ─────────────────────────────────────────────────

interface SubServiceSelectionModalProps {
  category: FrontendCategory;
  isOpen: boolean;
  onClose: () => void;
  onSelectSubService: (subService: string) => void;
}

function SubServiceSelectionModal({
  category,
  isOpen,
  onClose,
  onSelectSubService,
}: SubServiceSelectionModalProps) {
  if (!isOpen) return null;
  const options = SUB_SERVICE_OPTIONS[category];
  const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      data-ocid="subservice.dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Tutup"
      />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-5 flex items-start justify-between"
          style={{
            background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)",
          }}
        >
          <div>
            <div className="text-3xl mb-1">
              {FRONTEND_CATEGORY_ICONS[category]}
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              {FRONTEND_CATEGORY_LABELS[category]}
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              {isConsultOnly
                ? "Pilih jenis konsultasi"
                : "Pilih jenis layanan yang Anda butuhkan"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white"
            aria-label="Tutup"
            data-ocid="subservice.close_button"
          >
            <X size={22} />
          </button>
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {options.map((opt, idx) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelectSubService(opt.label)}
              className="w-full text-left p-4 rounded-2xl bg-white border transition-all duration-200 hover:shadow-md hover:border-green-300 group"
              style={{ borderColor: "rgba(26,92,58,0.15)" }}
              data-ocid={`subservice.option.${idx + 1}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(26,92,58,0.08)" }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-base"
                    style={{ color: "#0d2b1e" }}
                  >
                    {opt.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5 leading-snug">
                    {opt.desc}
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-gray-300 group-hover:text-green-600 transition-colors"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="px-5 pb-5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl text-base font-semibold border-2 transition-colors"
            style={{ borderColor: "rgba(26,92,58,0.2)", color: "#1a5c3a" }}
            data-ocid="subservice.cancel_button"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NearbyProvidersModal ─────────────────────────────────────────────────────

interface MockProvider {
  id: number;
  name: string;
  subService: string;
  distanceKm: number;
  baseFee: bigint;
  isAvailable: boolean;
  rating: number;
  experience: string;
}

function generateMockProviders(
  category: FrontendCategory,
  subService: string,
): MockProvider[] {
  const names: Record<FrontendCategory, string[]> = {
    perawat: [
      "Ns. Sari Dewi, S.Kep",
      "Ns. Budi Santoso, S.Kep",
      "Ns. Ayu Pertiwi, S.Kep",
      "Ns. Rina Kusuma, S.Kep",
    ],
    bidan: [
      "Bd. Wulandari, S.Tr.Keb",
      "Bd. Fitri Handayani, S.Tr.Keb",
      "Bd. Nurul Hidayah, S.Tr.Keb",
    ],
    fisioterapi: [
      "Ft. Ahmad Fauzi, S.Ft",
      "Ft. Dewi Rahayu, S.Ft",
      "Ft. Hendra Wijaya, S.Ft",
    ],
    ambulans: [
      "Unit AMB-001 — RS Medika",
      "Unit AMB-002 — Klinik Sehat",
      "Unit AMB-003 — PMI Kota",
    ],
    apotek: [
      "Apotek Kimia Farma 24",
      "Apotek Guardian Raya",
      "Apotek K24 Sejahtera",
      "Apotek Sehat Abadi",
    ],
    dokter: ["dr. Budi Santoso, SpPD"],
  };
  const fees: Record<FrontendCategory, bigint> = {
    perawat: BigInt(150_000),
    bidan: BigInt(200_000),
    fisioterapi: BigInt(180_000),
    ambulans: BigInt(500_000),
    apotek: BigInt(0),
    dokter: BigInt(100_000),
  };
  return (names[category] ?? []).map((name, i) => ({
    id: i + 1,
    name,
    subService,
    distanceKm: Number(((i + 1) * 1.3 + 0.7).toFixed(1)),
    baseFee: fees[category],
    isAvailable: i % 3 !== 2, // 2 out of 3 available
    rating: 4.5 - i * 0.1,
    experience: `${3 + i * 2} tahun pengalaman`,
  }));
}

interface NearbyProvidersModalProps {
  category: FrontendCategory;
  subService: string;
  services: Service[];
  onClose: () => void;
  onBook: (provider: MockProvider, service: Service | null) => void;
}

function NearbyProvidersModal({
  category,
  subService,
  services,
  onClose,
  onBook,
}: NearbyProvidersModalProps) {
  const [searching, setSearching] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [providers, setProviders] = useState<MockProvider[]>([]);

  const perKmRate = BigInt(5_000);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Browser tidak mendukung geolokasi.");
      setSearching(false);
      setProviders(generateMockProviders(category, subService));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setSearching(false);
        setProviders(generateMockProviders(category, subService));
      },
      () => {
        setLocationError(
          "Gagal mendapatkan lokasi. Menampilkan provider terdekat.",
        );
        setSearching(false);
        setProviders(generateMockProviders(category, subService));
      },
    );
  }, [category, subService]);

  const mappedBackend = mapFrontendToBackendCategory(category);
  const matchedService =
    services.find((s) => (s.category as string) === mappedBackend) ?? null;

  function getStatusBadge(provider: MockProvider) {
    if (category === "apotek") {
      const open = isApotekOpen();
      return (
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={
            open
              ? { background: "rgba(22,163,74,0.12)", color: "#15803d" }
              : { background: "rgba(220,38,38,0.1)", color: "#dc2626" }
          }
        >
          {open ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
          {open ? "Buka" : "Tutup"}
        </span>
      );
    }
    if (category === "ambulans") {
      return (
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={
            provider.isAvailable
              ? { background: "rgba(22,163,74,0.12)", color: "#15803d" }
              : { background: "rgba(148,163,184,0.2)", color: "#64748b" }
          }
        >
          {provider.isAvailable ? (
            <CheckCircle2 size={12} />
          ) : (
            <XCircle size={12} />
          )}
          {provider.isAvailable ? "Siaga" : "Tidak Tersedia"}
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
        style={
          provider.isAvailable
            ? { background: "rgba(22,163,74,0.12)", color: "#15803d" }
            : { background: "rgba(148,163,184,0.2)", color: "#64748b" }
        }
      >
        {provider.isAvailable ? (
          <CheckCircle2 size={12} />
        ) : (
          <XCircle size={12} />
        )}
        {provider.isAvailable ? "Tersedia" : "Tidak Tersedia"}
      </span>
    );
  }

  function calcTotalFee(provider: MockProvider): string {
    const transport = perKmRate * BigInt(Math.round(provider.distanceKm));
    const total = provider.baseFee + transport;
    return formatRupiah(total);
  }

  function isProviderActive(provider: MockProvider): boolean {
    if (category === "apotek") return isApotekOpen();
    return provider.isAvailable;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      data-ocid="nearby.dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Tutup"
      />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-5 flex items-start justify-between"
          style={{
            background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)",
          }}
        >
          <div>
            <div className="text-2xl mb-1">
              {FRONTEND_CATEGORY_ICONS[category]}
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              {subService}
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              {FRONTEND_CATEGORY_LABELS[category]} · Radius 20 km
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white"
            aria-label="Tutup"
            data-ocid="nearby.close_button"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {/* Location status */}
          {searching ? (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(26,92,58,0.06)",
                border: "1px solid rgba(26,92,58,0.15)",
              }}
              data-ocid="nearby.location_loading_state"
            >
              <Loader2
                size={20}
                className="animate-spin"
                style={{ color: "#1a5c3a" }}
              />
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#0d2b1e" }}
                >
                  Mendeteksi Lokasi GPS
                </div>
                <div className="text-xs text-gray-400">
                  Mohon izinkan akses lokasi Anda
                </div>
              </div>
            </div>
          ) : location ? (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(26,92,58,0.06)",
                border: "1px solid rgba(26,92,58,0.18)",
              }}
              data-ocid="nearby.location_found"
            >
              <MapPin size={18} style={{ color: "#1a5c3a" }} />
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#0d2b1e" }}
                >
                  Lokasi Terdeteksi
                </div>
                <div className="text-xs text-gray-400">
                  {location.lat.toFixed(4)}, {location.lon.toFixed(4)} ·
                  Menampilkan dalam 20 km
                </div>
              </div>
            </div>
          ) : locationError ? (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
              data-ocid="nearby.location_error"
            >
              <AlertCircle size={18} className="text-yellow-500" />
              <div className="text-sm text-yellow-700">{locationError}</div>
            </div>
          ) : null}

          {/* Provider list */}
          {!searching && (
            <>
              <div className="flex items-center justify-between">
                <h3
                  className="font-bold text-base"
                  style={{ color: "#0d2b1e" }}
                >
                  {providers.length} Provider Ditemukan
                </h3>
                <span className="text-xs text-gray-400">
                  Diurutkan berdasarkan jarak
                </span>
              </div>
              {providers.length === 0 ? (
                <div
                  className="text-center py-12 rounded-2xl"
                  style={{
                    background: "rgba(26,92,58,0.04)",
                    border: "1px dashed rgba(26,92,58,0.2)",
                  }}
                  data-ocid="nearby.empty_state"
                >
                  <div className="text-4xl mb-3">
                    {FRONTEND_CATEGORY_ICONS[category]}
                  </div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#0d2b1e" }}
                  >
                    Tidak ada provider tersedia di area Anda
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Coba perluas radius atau hubungi admin
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {providers.slice(0, 10).map((provider, idx) => {
                    const active = isProviderActive(provider);
                    return (
                      <div
                        key={provider.id}
                        className="bg-white rounded-2xl p-4 border transition-all duration-200"
                        style={{
                          borderColor: active
                            ? "rgba(26,92,58,0.18)"
                            : "rgba(148,163,184,0.2)",
                        }}
                        data-ocid={`nearby.provider.${idx + 1}`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold text-white"
                            style={{
                              background: active
                                ? "linear-gradient(135deg,#1a5c3a,#2d8a5e)"
                                : "#94a3b8",
                            }}
                          >
                            {FRONTEND_CATEGORY_ICONS[category]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div
                                  className="font-bold text-sm truncate"
                                  style={{ color: "#0d2b1e" }}
                                >
                                  {provider.name}
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5">
                                  {provider.experience}
                                </div>
                              </div>
                              {getStatusBadge(provider)}
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin size={12} />
                                {provider.distanceKm} km
                              </span>
                              <span
                                className="text-xs font-semibold"
                                style={{ color: "#1a5c3a" }}
                              >
                                {category === "apotek"
                                  ? "Gratis ongkir"
                                  : calcTotalFee(provider)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={!active}
                          onClick={() => onBook(provider, matchedService)}
                          className="w-full mt-3 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background: active
                              ? "linear-gradient(135deg,#1a5c3a,#2d8a5e)"
                              : "#94a3b8",
                          }}
                          data-ocid={`nearby.book_button.${idx + 1}`}
                        >
                          {active
                            ? category === "apotek"
                              ? "Pesan Sekarang"
                              : "Pesan Sekarang"
                            : "Tidak Tersedia"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DoctorConsultationModal ──────────────────────────────────────────────────

interface DoctorConsultationModalProps {
  consultationType: string;
  services: Service[];
  onClose: () => void;
}

function DoctorConsultationModal({
  consultationType,
  services,
  onClose,
}: DoctorConsultationModalProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState(getTodayDate());
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const createBooking = useCreateBooking();

  const docService =
    services.find((s) => (s.category as string) === "physiotherapy") ?? null;
  const baseFee = docService?.baseFeeIdr ?? BigInt(150_000);

  const { data: estimatedCost } = useEstimateCost(
    docService?.id ?? BigInt(0),
    0,
    isNightTime(time),
    false,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking.mutateAsync({
        serviceId: docService?.id ?? BigInt(1),
        scheduledDate: date,
        scheduledTime: time,
        latitude: 0,
        longitude: 0,
        notes: `[${consultationType}] ${notes}`,
      });
      toast.success(
        "Konsultasi berhasil dijadwalkan! Menunggu konfirmasi dokter.",
      );
      navigate({ to: "/patient/bookings" });
      onClose();
    } catch {
      toast.error("Gagal menjadwalkan konsultasi. Silakan coba lagi.");
    }
  };

  const CONSULT_SLOTS = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "19:00",
    "20:00",
  ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      data-ocid="doctor.dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Tutup"
      />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        <div
          className="px-6 py-5 flex items-start justify-between"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          }}
        >
          <div>
            <div className="text-2xl mb-1">👨‍⚕️</div>
            <h2 className="font-display text-xl font-bold text-white">
              Jadwalkan Konsultasi
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              {consultationType} · Tanpa Kunjungan Fisik
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white"
            aria-label="Tutup"
            data-ocid="doctor.close_button"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">
            {/* Consultation type display */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(37,99,235,0.06)",
                border: "1px solid rgba(37,99,235,0.15)",
              }}
            >
              <Stethoscope size={20} style={{ color: "#2563eb" }} />
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#1e3a5f" }}
                >
                  Jenis Konsultasi
                </div>
                <div
                  className="text-base font-bold"
                  style={{ color: "#2563eb" }}
                >
                  {consultationType}
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="doc-date"
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <CalendarDays size={18} style={{ color: "#1a5c3a" }} /> Tanggal
                Konsultasi
              </label>
              <input
                id="doc-date"
                type="date"
                value={date}
                min={getTodayDate()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#1a5c3a" } as React.CSSProperties}
                required
                data-ocid="doctor.date_input"
              />
            </div>

            {/* Time slots */}
            <div>
              <p
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <Clock size={18} style={{ color: "#1a5c3a" }} /> Jam Konsultasi
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {CONSULT_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className="py-2.5 rounded-xl text-sm font-semibold transition-all border"
                    style={
                      time === slot
                        ? {
                            background: "#1a5c3a",
                            color: "#fff",
                            borderColor: "#1a5c3a",
                          }
                        : {
                            background: "#fff",
                            color: "#374151",
                            borderColor: "#e5e7eb",
                          }
                    }
                    data-ocid={`doctor.time_slot.${slot.replace(":", "")}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="doc-notes"
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <FileText size={18} style={{ color: "#1a5c3a" }} /> Keluhan /
                Catatan
              </label>
              <textarea
                id="doc-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Ceritakan keluhan atau pertanyaan Anda secara singkat..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none resize-none"
                data-ocid="doctor.notes_textarea"
              />
            </div>

            {/* Cost */}
            <div
              className="rounded-2xl px-5 py-4 border"
              style={{
                background: "rgba(37,99,235,0.04)",
                borderColor: "rgba(37,99,235,0.15)",
              }}
            >
              <div className="text-sm font-semibold text-gray-400 mb-1">
                Estimasi Biaya Konsultasi
              </div>
              <div
                className="text-2xl font-display font-bold"
                style={{ color: "#2563eb" }}
              >
                {formatRupiah(estimatedCost ?? baseFee)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Biaya sudah termasuk konsultasi online
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              data-ocid="doctor.cancel_button"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createBooking.isPending}
              className="flex-[2] py-4 rounded-xl text-base font-bold text-white disabled:opacity-50 transition-colors"
              style={{ background: "#2563eb" }}
              data-ocid="doctor.submit_button"
            >
              {createBooking.isPending
                ? "Memproses..."
                : "Jadwalkan Konsultasi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── BookingModal (for location-based booking after provider selection) ────────

interface ProviderBookingModalProps {
  provider: MockProvider;
  category: FrontendCategory;
  service: Service | null;
  onClose: () => void;
}

function ProviderBookingModal({
  provider,
  category,
  service,
  onClose,
}: ProviderBookingModalProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState(getTodayDate());
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const createBooking = useCreateBooking();

  const perKmRate = BigInt(5_000);
  const transportFee = perKmRate * BigInt(Math.round(provider.distanceKm));
  const totalFee = provider.baseFee + transportFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking.mutateAsync({
        serviceId: service?.id ?? BigInt(1),
        scheduledDate: date,
        scheduledTime: time,
        latitude: 0,
        longitude: 0,
        notes: `[Provider: ${provider.name}] ${notes}`,
      });
      toast.success("Pesanan berhasil dibuat! Menunggu konfirmasi.");
      navigate({ to: "/patient/bookings" });
      onClose();
    } catch {
      toast.error("Gagal membuat pesanan. Silakan coba lagi.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      data-ocid="booking.dialog"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Tutup"
      />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        <div
          className="px-6 py-5 flex items-start justify-between"
          style={{
            background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)",
          }}
        >
          <div>
            <div className="text-2xl mb-1">
              {FRONTEND_CATEGORY_ICONS[category]}
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              {provider.name}
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              {provider.subService} · {provider.distanceKm} km dari lokasi Anda
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white"
            aria-label="Tutup"
            data-ocid="booking.close_button"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">
            {/* Provider info */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(26,92,58,0.06)",
                border: "1px solid rgba(26,92,58,0.15)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white shrink-0"
                style={{
                  background: "linear-gradient(135deg,#1a5c3a,#2d8a5e)",
                }}
              >
                {FRONTEND_CATEGORY_ICONS[category]}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#0d2b1e" }}>
                  {provider.name}
                </div>
                <div className="text-xs text-gray-400">
                  {provider.experience} · ⭐ {provider.rating.toFixed(1)}
                </div>
              </div>
              <span
                className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(22,163,74,0.12)", color: "#15803d" }}
              >
                <CheckCircle2 size={12} /> Tersedia
              </span>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="prov-date"
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <CalendarDays size={18} style={{ color: "#1a5c3a" }} /> Tanggal
                Kunjungan
              </label>
              <input
                id="prov-date"
                type="date"
                value={date}
                min={getTodayDate()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none"
                required
                data-ocid="booking.date_input"
              />
            </div>

            {/* Time */}
            <div>
              <p
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <Clock size={18} style={{ color: "#1a5c3a" }} /> Jam Kunjungan
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.slice(0, 12).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className="py-2.5 rounded-xl text-sm font-semibold transition-all border"
                    style={
                      time === slot
                        ? {
                            background: "#1a5c3a",
                            color: "#fff",
                            borderColor: "#1a5c3a",
                          }
                        : {
                            background: "#fff",
                            color: "#374151",
                            borderColor: "#e5e7eb",
                          }
                    }
                    data-ocid={`booking.time_slot.${slot.replace(":", "")}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="prov-notes"
                className="flex items-center gap-2 text-base font-semibold mb-2"
                style={{ color: "#0d2b1e" }}
              >
                <FileText size={18} style={{ color: "#1a5c3a" }} /> Catatan
                Tambahan
              </label>
              <textarea
                id="prov-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Kondisi khusus, alergi, atau instruksi untuk provider..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none resize-none"
                data-ocid="booking.notes_textarea"
              />
            </div>

            {/* Cost breakdown */}
            <div
              className="rounded-2xl px-5 py-4 border"
              style={{
                background: "rgba(26,92,58,0.04)",
                borderColor: "rgba(26,92,58,0.15)",
              }}
            >
              <div className="text-sm font-semibold text-gray-400 mb-3">
                Rincian Biaya
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Biaya dasar layanan</span>
                  <span className="font-semibold" style={{ color: "#0d2b1e" }}>
                    {formatRupiah(provider.baseFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Transportasi ({provider.distanceKm} km × Rp5.000)
                  </span>
                  <span className="font-semibold" style={{ color: "#0d2b1e" }}>
                    {formatRupiah(transportFee)}
                  </span>
                </div>
                {isNightTime(time) && (
                  <div className="flex justify-between text-yellow-600">
                    <span>Surcharge malam (18:00–06:00)</span>
                    <span className="font-semibold">+20%</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold" style={{ color: "#0d2b1e" }}>
                    Total Estimasi
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: "#1a5c3a" }}
                  >
                    {formatRupiah(totalFee)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              data-ocid="booking.cancel_button"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createBooking.isPending}
              className="flex-[2] py-4 rounded-xl text-base font-bold text-white disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#1a5c3a,#2d8a5e)" }}
              data-ocid="booking.submit_button"
            >
              {createBooking.isPending ? "Memproses..." : "Pesan Sekarang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PatientServices() {
  const { data: services, isLoading } = useListServices();

  // Category tile selection
  const [activeCategory, setActiveCategory] = useState<
    FrontendCategory | "all"
  >("all");

  // Sub-service selection flow
  const [subServiceCategory, setSubServiceCategory] =
    useState<FrontendCategory | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(
    null,
  );

  // Doctor consultation flow
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorConsultType, setDoctorConsultType] = useState("");

  // Nearby providers modal
  const [showNearby, setShowNearby] = useState(false);

  // Provider booking modal
  const [bookingProvider, setBookingProvider] = useState<MockProvider | null>(
    null,
  );
  const [bookingService, setBookingService] = useState<Service | null>(null);

  const navigate = useNavigate();

  const handleCategoryClick = (cat: FrontendCategory) => {
    if (cat === "apotek") {
      navigate({ to: "/apotek" });
      return;
    }
    setActiveCategory(cat);
    setSubServiceCategory(cat);
  };

  const handleSubServiceSelect = (subService: string) => {
    setSubServiceCategory(null);
    setSelectedSubService(subService);
    if (activeCategory === "dokter") {
      setDoctorConsultType(subService);
      setShowDoctorModal(true);
    } else {
      setShowNearby(true);
    }
  };

  const handleProviderBook = (provider: MockProvider, svc: Service | null) => {
    setShowNearby(false);
    setBookingProvider(provider);
    setBookingService(svc);
  };

  const _handleCloseAll = useCallback(() => {
    setSubServiceCategory(null);
    setSelectedSubService(null);
    setShowDoctorModal(false);
    setDoctorConsultType("");
    setShowNearby(false);
    setBookingProvider(null);
    setBookingService(null);
  }, []);

  const filtered =
    activeCategory === "all"
      ? (services ?? [])
      : (services?.filter(
          (s) =>
            (s.category as string) ===
            mapFrontendToBackendCategory(activeCategory),
        ) ?? []);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1
              className="font-display text-3xl font-bold"
              style={{ color: "#0d2b1e" }}
            >
              Pilih Layanan
            </h1>
            <p className="text-gray-500 text-lg mt-1">
              Klik kategori untuk mulai mencari layanan kesehatan di sekitar
              Anda
            </p>
          </div>

          {/* Category Tiles */}
          <div className="mb-8" data-ocid="services.category_filter">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {ALL_FRONTEND_CATEGORIES.map((cat) => {
                const isConsultOnly =
                  CONSULTATION_ONLY_CATEGORIES.includes(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl text-sm font-semibold transition-all duration-200 border hover:shadow-md"
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, #0d2b1e, #1a5c3a)",
                            borderColor: "transparent",
                            color: "#fff",
                            boxShadow: "0 4px 16px rgba(26,92,58,0.3)",
                          }
                        : {
                            background: "#fff",
                            borderColor: "rgba(26,92,58,0.15)",
                            color: "#374151",
                          }
                    }
                    data-ocid={`services.filter.${cat}`}
                  >
                    <span className="text-3xl">
                      {FRONTEND_CATEGORY_ICONS[cat]}
                    </span>
                    <span className="text-xs leading-tight text-center font-bold">
                      {FRONTEND_CATEGORY_LABELS[cat]}
                    </span>
                    {isConsultOnly && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={
                          isActive
                            ? {
                                background: "rgba(201,162,39,0.3)",
                                color: "#f0d060",
                              }
                            : {
                                background: "rgba(201,162,39,0.12)",
                                color: "#7a6218",
                              }
                        }
                      >
                        Konsultasi
                      </span>
                    )}
                    {LOCATION_BASED_CATEGORIES.includes(cat) && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={
                          isActive
                            ? {
                                background: "rgba(255,255,255,0.2)",
                                color: "rgba(255,255,255,0.9)",
                              }
                            : {
                                background: "rgba(26,92,58,0.08)",
                                color: "#1a5c3a",
                              }
                        }
                      >
                        📍 Terdekat
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-3 px-5 py-2 rounded-full text-sm font-semibold transition-all border"
              style={
                activeCategory === "all"
                  ? {
                      background: "#1a5c3a",
                      color: "#fff",
                      borderColor: "#1a5c3a",
                    }
                  : {
                      background: "#fff",
                      color: "#374151",
                      borderColor: "rgba(26,92,58,0.2)",
                    }
              }
              data-ocid="services.filter.all"
            >
              Semua Layanan
            </button>
          </div>

          {/* Info Banner */}
          {activeCategory !== "all" &&
            LOCATION_BASED_CATEGORIES.includes(
              activeCategory as FrontendCategory,
            ) && (
              <div
                className="mb-6 p-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: "rgba(26,92,58,0.06)",
                  border: "1px solid rgba(26,92,58,0.18)",
                }}
              >
                <MapPin size={20} style={{ color: "#1a5c3a" }} />
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#0d2b1e" }}
                  >
                    Layanan Berbasis Lokasi
                  </div>
                  <div className="text-xs text-gray-400">
                    Klik tombol di bawah atau klik kartu layanan untuk mencari{" "}
                    {
                      FRONTEND_CATEGORY_LABELS[
                        activeCategory as FrontendCategory
                      ]
                    }{" "}
                    terdekat
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCategoryClick(activeCategory as FrontendCategory)
                  }
                  className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors"
                  style={{ background: "#1a5c3a" }}
                  data-ocid="services.find_nearby_button"
                >
                  Cari Terdekat
                </button>
              </div>
            )}

          {activeCategory !== "all" &&
            CONSULTATION_ONLY_CATEGORIES.includes(
              activeCategory as FrontendCategory,
            ) && (
              <div
                className="mb-6 p-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: "rgba(37,99,235,0.06)",
                  border: "1px solid rgba(37,99,235,0.15)",
                }}
              >
                <Stethoscope size={20} style={{ color: "#2563eb" }} />
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#1e3a5f" }}
                  >
                    Layanan Konsultasi
                  </div>
                  <div className="text-xs text-gray-400">
                    Dokter tersedia untuk konsultasi online — tidak memerlukan
                    kunjungan fisik
                  </div>
                </div>
              </div>
            )}

          {/* Services Grid */}
          {isLoading ? (
            <div
              className="flex justify-center py-20"
              data-ocid="services.loading_state"
            >
              <LoadingSpinner size="lg" label="Memuat layanan..." />
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-16 rounded-3xl"
              style={{
                background: "rgba(26,92,58,0.04)",
                border: "1px dashed rgba(26,92,58,0.2)",
              }}
              data-ocid="services.empty_state"
            >
              <div className="text-5xl mb-4">
                {activeCategory !== "all"
                  ? FRONTEND_CATEGORY_ICONS[activeCategory as FrontendCategory]
                  : "🏥"}
              </div>
              <p className="text-xl font-semibold" style={{ color: "#0d2b1e" }}>
                Belum ada layanan tersedia
              </p>
              <p className="text-gray-400 mt-2">
                Coba pilih kategori lain atau hubungi admin
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              data-ocid="services.list"
            >
              {filtered.map((service, idx) => {
                const isDocCat = activeCategory === "dokter";
                return (
                  <div
                    key={service.id.toString()}
                    className="bg-white border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
                    style={{ borderColor: "rgba(26,92,58,0.15)" }}
                    data-ocid={`services.item.${idx + 1}`}
                  >
                    <div
                      className="px-6 py-5 flex items-center gap-4"
                      style={{ background: "rgba(26,92,58,0.05)" }}
                    >
                      <div className="text-4xl">
                        {SERVICE_CATEGORY_ICONS[service.category]}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="font-display text-xl font-bold leading-tight"
                          style={{ color: "#0d2b1e" }}
                        >
                          {service.name}
                        </h3>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#1a5c3a" }}
                        >
                          {SERVICE_CATEGORY_LABELS[service.category]}
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                      <p className="text-base text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-auto">
                        <div className="text-sm text-gray-400 mb-1">
                          Mulai dari
                        </div>
                        <div
                          className="font-display text-2xl font-bold"
                          style={{ color: "#1a5c3a" }}
                        >
                          {formatRupiah(service.baseFeeIdr)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCategoryClick(
                            activeCategory === "all"
                              ? "perawat"
                              : (activeCategory as FrontendCategory),
                          )
                        }
                        className="w-full py-4 text-white rounded-2xl text-lg font-bold hover:opacity-90 transition-colors shadow-md"
                        style={{
                          background:
                            "linear-gradient(135deg, #0d2b1e, #1a5c3a)",
                        }}
                        data-ocid={`services.book_button.${idx + 1}`}
                      >
                        {isDocCat ? "Konsultasi Sekarang" : "Pesan Sekarang"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Step 1: Sub-Service Selection */}
      {subServiceCategory && (
        <SubServiceSelectionModal
          category={subServiceCategory}
          isOpen={!!subServiceCategory}
          onClose={() => setSubServiceCategory(null)}
          onSelectSubService={handleSubServiceSelect}
        />
      )}

      {/* Step 2A: Nearby Providers (location-based) */}
      {showNearby &&
        selectedSubService &&
        activeCategory !== "all" &&
        LOCATION_BASED_CATEGORIES.includes(
          activeCategory as FrontendCategory,
        ) && (
          <NearbyProvidersModal
            category={activeCategory as FrontendCategory}
            subService={selectedSubService}
            services={services ?? []}
            onClose={() => {
              setShowNearby(false);
              setSelectedSubService(null);
            }}
            onBook={handleProviderBook}
          />
        )}

      {/* Step 2B: Doctor Consultation (no GPS) */}
      {showDoctorModal && (
        <DoctorConsultationModal
          consultationType={doctorConsultType}
          services={services ?? []}
          onClose={() => {
            setShowDoctorModal(false);
            setDoctorConsultType("");
            setSelectedSubService(null);
          }}
        />
      )}

      {/* Step 3: Provider Booking */}
      {bookingProvider && (
        <ProviderBookingModal
          provider={bookingProvider}
          category={
            activeCategory !== "all"
              ? (activeCategory as FrontendCategory)
              : "perawat"
          }
          service={bookingService}
          onClose={() => {
            setBookingProvider(null);
            setBookingService(null);
          }}
        />
      )}
    </Layout>
  );
}
