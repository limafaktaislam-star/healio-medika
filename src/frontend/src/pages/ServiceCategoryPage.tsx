import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNearbyNurses } from "@/hooks/useQueries";
import {
  CONSULTATION_ONLY_CATEGORIES,
  FRONTEND_CATEGORY_DESCS,
  FRONTEND_CATEGORY_ICONS,
  FRONTEND_CATEGORY_LABELS,
  type FrontendCategory,
  LOCATION_BASED_CATEGORIES,
} from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  Moon,
  Search,
  Stethoscope,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Sub-service definitions per category
const SUB_SERVICES: Record<
  FrontendCategory,
  Array<{
    id: string;
    name: string;
    desc: string;
    icon: string;
    baseFee: string;
  }>
> = {
  dokter: [
    {
      id: "konsultasi_umum",
      name: "Konsultasi Umum",
      desc: "Konsultasi dokter umum untuk keluhan sehari-hari",
      icon: "🩺",
      baseFee: "Rp 150.000",
    },
    {
      id: "konsultasi_anak",
      name: "Konsultasi Anak",
      desc: "Dokter anak berpengalaman untuk buah hati Anda",
      icon: "👶",
      baseFee: "Rp 175.000",
    },
    {
      id: "konsultasi_lansia",
      name: "Konsultasi Lansia",
      desc: "Konsultasi khusus untuk kesehatan usia lanjut",
      icon: "👴",
      baseFee: "Rp 175.000",
    },
    {
      id: "konsultasi_gizi",
      name: "Konsultasi Gizi",
      desc: "Panduan nutrisi dan diet sehat dari ahli gizi",
      icon: "🥗",
      baseFee: "Rp 150.000",
    },
  ],
  perawat: [
    {
      id: "perawatan_lansia",
      name: "Perawatan Lansia",
      desc: "Pendampingan dan perawatan harian untuk lansia",
      icon: "🧓",
      baseFee: "Rp 200.000",
    },
    {
      id: "perawatan_luka",
      name: "Perawatan Luka",
      desc: "Ganti balut dan perawatan luka profesional",
      icon: "🩹",
      baseFee: "Rp 150.000",
    },
    {
      id: "pasca_operasi",
      name: "Pasca Operasi",
      desc: "Perawatan dan pemantauan kondisi pasca operasi",
      icon: "🏥",
      baseFee: "Rp 250.000",
    },
    {
      id: "injeksi",
      name: "Injeksi & Infus",
      desc: "Layanan injeksi dan pemasangan infus di rumah",
      icon: "💉",
      baseFee: "Rp 175.000",
    },
  ],
  bidan: [
    {
      id: "antenatal",
      name: "Perawatan Antenatal",
      desc: "Pemeriksaan kehamilan rutin oleh bidan profesional",
      icon: "🤰",
      baseFee: "Rp 200.000",
    },
    {
      id: "postnatal",
      name: "Perawatan Pasca Lahir",
      desc: "Perawatan ibu dan bayi setelah persalinan",
      icon: "🤱",
      baseFee: "Rp 225.000",
    },
    {
      id: "kb",
      name: "Konsultasi KB",
      desc: "Konsultasi program keluarga berencana",
      icon: "🌸",
      baseFee: "Rp 150.000",
    },
    {
      id: "laktasi",
      name: "Konsultasi Laktasi",
      desc: "Panduan menyusui dan konsultasi ASI eksklusif",
      icon: "🍼",
      baseFee: "Rp 175.000",
    },
  ],
  fisioterapi: [
    {
      id: "rehabilitasi",
      name: "Rehabilitasi Pasca Stroke",
      desc: "Program pemulihan gerak setelah stroke",
      icon: "🏃",
      baseFee: "Rp 300.000",
    },
    {
      id: "nyeri_punggung",
      name: "Terapi Nyeri Punggung",
      desc: "Penanganan nyeri punggung dan tulang belakang",
      icon: "🦴",
      baseFee: "Rp 250.000",
    },
    {
      id: "fisio_anak",
      name: "Fisioterapi Anak",
      desc: "Terapi gerak dan tumbuh kembang anak",
      icon: "🧒",
      baseFee: "Rp 275.000",
    },
    {
      id: "fisio_olahraga",
      name: "Cedera Olahraga",
      desc: "Pemulihan cedera otot dan sendi akibat olahraga",
      icon: "⚽",
      baseFee: "Rp 250.000",
    },
  ],
  ambulans: [
    {
      id: "ambulans_transport",
      name: "Ambulans Transport",
      desc: "Antar-jemput pasien ke fasilitas kesehatan",
      icon: "🚐",
      baseFee: "Rp 300.000",
    },
    {
      id: "ambulans_ugd",
      name: "Ambulans Gawat Darurat",
      desc: "Ambulans lengkap untuk penanganan darurat medis",
      icon: "🚑",
      baseFee: "Rp 500.000",
    },
    {
      id: "ambulans_jenazah",
      name: "Ambulans Jenazah",
      desc: "Layanan ambulans jenazah dengan penghormatan",
      icon: "🕊️",
      baseFee: "Rp 400.000",
    },
  ],
  apotek: [
    {
      id: "apotek_resep",
      name: "Tebus Resep",
      desc: "Tebus resep dokter — diantar ke rumah",
      icon: "📋",
      baseFee: "Sesuai resep",
    },
    {
      id: "apotek_obat_bebas",
      name: "Obat Bebas",
      desc: "Obat-obatan bebas tanpa resep untuk kebutuhan sehari-hari",
      icon: "💊",
      baseFee: "Sesuai harga",
    },
    {
      id: "apotek_vitamin",
      name: "Vitamin & Suplemen",
      desc: "Vitamin, suplemen, dan produk kesehatan",
      icon: "🌿",
      baseFee: "Sesuai harga",
    },
    {
      id: "apotek_alkes",
      name: "Alat Kesehatan",
      desc: "Tensimeter, termometer, dan alat kesehatan lainnya",
      icon: "🩺",
      baseFee: "Sesuai harga",
    },
  ],
};

type FlowStep = "select_subservice" | "search_providers";

interface GeoPosition {
  lat: number;
  lon: number;
}

function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

function _formatCurrency(amount: bigint): string {
  return `Rp ${Number(amount).toLocaleString("id-ID")}`;
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ServiceCategoryPage() {
  const { category } = useParams({ strict: false }) as { category: string };
  const navigate = useNavigate();
  const cat = category as FrontendCategory;

  const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(cat);
  const isLocationBased = LOCATION_BASED_CATEGORIES.includes(cat);

  const [step, setStep] = useState<FlowStep>("select_subservice");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [geoPos, setGeoPos] = useState<GeoPosition | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const subServices = SUB_SERVICES[cat] ?? [];

  const { data: nearbyNurses, isLoading: nursesLoading } = useNearbyNurses(
    geoPos?.lat ?? 0,
    geoPos?.lon ?? 0,
  );

  // Auto-fetch geolocation when entering provider search step
  useEffect(() => {
    if (step !== "search_providers" || isConsultOnly || geoPos) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoPos({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (_err) => {
        setGeoError(
          "Tidak dapat mendeteksi lokasi. Pastikan izin lokasi diaktifkan.",
        );
        setGeoLoading(false);
      },
      { timeout: 10000 },
    );
  }, [step, isConsultOnly, geoPos]);

  const nightTime = isNightTime();

  // Validate category
  const validCategories: FrontendCategory[] = [
    "dokter",
    "perawat",
    "bidan",
    "fisioterapi",
    "ambulans",
    "apotek",
  ];
  if (!validCategories.includes(cat)) {
    return (
      <Layout showSidebar={false}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <AlertCircle
            size={48}
            style={{ color: "#2d6a4f" }}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1a3a2a" }}>
            Kategori Tidak Valid
          </h2>
          <p className="text-muted-foreground mb-6">
            Kategori layanan yang diminta tidak ditemukan.
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            data-ocid="service_category.back_home_button"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen" style={{ background: "#ffffff" }}>
        {/* Header bar */}
        <div
          className="sticky top-0 z-30 border-b"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderColor: "rgba(45,106,79,0.15)",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                step === "search_providers"
                  ? setStep("select_subservice")
                  : navigate({ to: "/" })
              }
              className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: "#2d6a4f" }}
              data-ocid="service_category.back_button"
            >
              <ArrowLeft size={18} />
              {step === "search_providers" ? "Ganti Layanan" : "Beranda"}
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-2xl">{FRONTEND_CATEGORY_ICONS[cat]}</span>
              <span className="font-bold text-lg" style={{ color: "#1a3a2a" }}>
                {FRONTEND_CATEGORY_LABELS[cat]}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Step 1 — Sub-service selection */}
          {step === "select_subservice" && (
            <div data-ocid="service_category.subservice_step">
              <div className="mb-8">
                <p
                  className="text-base mb-1 font-semibold uppercase tracking-widest"
                  style={{ color: "#2d6a4f", fontSize: "0.78rem" }}
                >
                  Pilih Jenis Layanan
                </p>
                <h1
                  className="font-display font-extrabold mb-2"
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                    color: "#1a3a2a",
                  }}
                >
                  {FRONTEND_CATEGORY_LABELS[cat]}
                </h1>
                <p className="text-base" style={{ color: "#5a7a68" }}>
                  {FRONTEND_CATEGORY_DESCS[cat]}
                </p>
                {isConsultOnly && (
                  <div
                    className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-sm font-semibold"
                    style={{
                      background: "rgba(201,162,39,0.1)",
                      color: "#7a6218",
                      border: "1px solid rgba(201,162,39,0.25)",
                    }}
                  >
                    <Stethoscope size={14} /> Konsultasi Online — Tanpa
                    Perjalanan
                  </div>
                )}
                {isLocationBased && (
                  <div
                    className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-sm font-semibold"
                    style={{
                      background: "rgba(45,106,79,0.08)",
                      color: "#1a5c38",
                      border: "1px solid rgba(45,106,79,0.2)",
                    }}
                  >
                    <MapPin size={14} /> Berbasis Lokasi — Cari Provider
                    Terdekat
                  </div>
                )}
              </div>

              <div
                className="grid sm:grid-cols-2 gap-4"
                data-ocid="service_category.subservice_list"
              >
                {subServices.map((sub, idx) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedSub(sub.id);
                      setStep("search_providers");
                    }}
                    className="group text-left p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background:
                        selectedSub === sub.id
                          ? "rgba(45,106,79,0.06)"
                          : "rgba(255,255,255,0.9)",
                      border:
                        selectedSub === sub.id
                          ? "2px solid #2d6a4f"
                          : "1.5px solid rgba(45,106,79,0.15)",
                      boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                    data-ocid={`service_category.subservice_item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{sub.icon}</span>
                      <ChevronRight
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#2d6a4f", marginTop: "4px" }}
                      />
                    </div>
                    <div
                      className="font-display font-bold text-lg mb-1"
                      style={{ color: "#1a3a2a" }}
                    >
                      {sub.name}
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "#5a7a68" }}
                    >
                      {sub.desc}
                    </p>
                    <div
                      className="inline-block text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(45,106,79,0.08)",
                        color: "#1a5c38",
                      }}
                    >
                      Mulai {sub.baseFee}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Provider Search */}
          {step === "search_providers" && (
            <div data-ocid="service_category.provider_step">
              {/* Selected sub-service info */}
              {selectedSub &&
                (() => {
                  const sub = subServices.find((s) => s.id === selectedSub);
                  if (!sub) return null;
                  return (
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl mb-8"
                      style={{
                        background: "rgba(45,106,79,0.05)",
                        border: "1.5px solid rgba(45,106,79,0.2)",
                      }}
                    >
                      <span className="text-2xl">{sub.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold" style={{ color: "#1a3a2a" }}>
                          {sub.name}
                        </div>
                        <div className="text-sm" style={{ color: "#5a7a68" }}>
                          Mulai {sub.baseFee}
                        </div>
                      </div>
                      {nightTime && (
                        <div
                          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                          style={{
                            background: "rgba(100,60,200,0.1)",
                            color: "#4a1a9a",
                          }}
                        >
                          <Moon size={12} /> Tarif Malam
                        </div>
                      )}
                    </div>
                  );
                })()}

              {/* Konsultasi (dokter) — no geolocation */}
              {isConsultOnly && (
                <div>
                  <div className="mb-6">
                    <h2
                      className="font-display font-extrabold text-2xl mb-2"
                      style={{ color: "#1a3a2a" }}
                    >
                      Dokter Tersedia
                    </h2>
                    <p className="text-base" style={{ color: "#5a7a68" }}>
                      Pilih dokter untuk memulai konsultasi
                    </p>
                  </div>

                  {/* Mock doctor list for consultation */}
                  <div
                    className="space-y-4"
                    data-ocid="service_category.provider_list"
                  >
                    {[
                      {
                        name: "dr. Andi Priyatno, Sp.U",
                        spec: "Dokter Umum",
                        exp: "10 tahun",
                        status: "ready" as const,
                        fee: "Rp 150.000",
                      },
                      {
                        name: "dr. Rina Kusuma",
                        spec: "Dokter Anak",
                        exp: "8 tahun",
                        status: "ready" as const,
                        fee: "Rp 175.000",
                      },
                      {
                        name: "dr. Hendra Wijaya",
                        spec: "Dokter Umum",
                        exp: "12 tahun",
                        status: "busy" as const,
                        fee: "Rp 150.000",
                      },
                    ].map((doc, idx) => (
                      <ProviderCard
                        key={doc.name}
                        idx={idx}
                        name={doc.name}
                        specialization={doc.spec}
                        experience={doc.exp}
                        status={doc.status}
                        fee={doc.fee}
                        distance={null}
                        nightTime={nightTime}
                        onBook={() => {
                          const isLoggedIn =
                            localStorage.getItem("healio_role");
                          if (!isLoggedIn) {
                            toast.error(
                              "Silahkan login terlebih dahulu untuk memesan layanan",
                            );
                            navigate({ to: "/login" });
                            return;
                          }
                          navigate({ to: "/patient/services" });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Location-based providers */}
              {isLocationBased && (
                <div>
                  <div className="mb-6">
                    <h2
                      className="font-display font-extrabold text-2xl mb-2"
                      style={{ color: "#1a3a2a" }}
                    >
                      Provider Terdekat
                    </h2>
                    {geoPos ? (
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "#5a7a68" }}
                      >
                        <MapPin size={14} style={{ color: "#2d6a4f" }} />
                        Lokasi Anda terdeteksi — Menampilkan provider dalam 20
                        km
                      </div>
                    ) : (
                      <p className="text-sm" style={{ color: "#5a7a68" }}>
                        Mengambil lokasi Anda...
                      </p>
                    )}
                  </div>

                  {/* Geo loading */}
                  {geoLoading && (
                    <div
                      className="flex flex-col items-center justify-center py-16 rounded-2xl"
                      style={{
                        background: "rgba(45,106,79,0.04)",
                        border: "1.5px solid rgba(45,106,79,0.12)",
                      }}
                      data-ocid="service_category.geo_loading_state"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 animate-pulse"
                        style={{ background: "rgba(45,106,79,0.1)" }}
                      >
                        <MapPin size={28} style={{ color: "#2d6a4f" }} />
                      </div>
                      <p
                        className="font-semibold text-lg"
                        style={{ color: "#1a3a2a" }}
                      >
                        Mendeteksi Lokasi Anda...
                      </p>
                      <p className="text-sm mt-1" style={{ color: "#5a7a68" }}>
                        Izinkan akses lokasi di browser Anda
                      </p>
                    </div>
                  )}

                  {/* Geo error */}
                  {geoError && !geoLoading && (
                    <div
                      className="flex flex-col items-center text-center py-10 rounded-2xl px-6"
                      style={{
                        background: "rgba(220,50,50,0.04)",
                        border: "1.5px solid rgba(220,50,50,0.15)",
                      }}
                      data-ocid="service_category.geo_error_state"
                    >
                      <AlertCircle
                        size={36}
                        className="mb-3"
                        style={{ color: "#dc3232" }}
                      />
                      <p className="font-semibold" style={{ color: "#1a3a2a" }}>
                        {geoError}
                      </p>
                      <button
                        type="button"
                        className="mt-4 text-sm font-bold underline"
                        style={{ color: "#2d6a4f" }}
                        onClick={() => {
                          setGeoError(null);
                          setGeoLoading(true);
                          navigator.geolocation.getCurrentPosition(
                            (pos) => {
                              setGeoPos({
                                lat: pos.coords.latitude,
                                lon: pos.coords.longitude,
                              });
                              setGeoLoading(false);
                            },
                            () => {
                              setGeoError("Tidak dapat mendeteksi lokasi.");
                              setGeoLoading(false);
                            },
                          );
                        }}
                        data-ocid="service_category.retry_geo_button"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  )}

                  {/* Providers loading */}
                  {geoPos && nursesLoading && (
                    <div
                      className="space-y-3"
                      data-ocid="service_category.providers_loading_state"
                    >
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-28 rounded-2xl animate-pulse"
                          style={{ background: "rgba(45,106,79,0.06)" }}
                        />
                      ))}
                      <p
                        className="text-center text-sm"
                        style={{ color: "#5a7a68" }}
                      >
                        <Search size={14} className="inline mr-1" />
                        Mencari provider di sekitar Anda...
                      </p>
                    </div>
                  )}

                  {/* Providers list */}
                  {geoPos &&
                    !nursesLoading &&
                    (!nearbyNurses || nearbyNurses.length === 0 ? (
                      <div
                        className="flex flex-col items-center text-center py-16 rounded-2xl"
                        style={{
                          background: "rgba(45,106,79,0.03)",
                          border: "1.5px solid rgba(45,106,79,0.1)",
                        }}
                        data-ocid="service_category.no_providers_empty_state"
                      >
                        <span className="text-5xl mb-4">
                          {FRONTEND_CATEGORY_ICONS[cat]}
                        </span>
                        <p
                          className="font-semibold text-xl mb-2"
                          style={{ color: "#1a3a2a" }}
                        >
                          Belum Ada Provider di Area Anda
                        </p>
                        <p className="text-base" style={{ color: "#5a7a68" }}>
                          Coba lagi nanti atau perluas radius pencarian Anda.
                        </p>
                        <button
                          type="button"
                          className="mt-6 text-sm font-bold underline"
                          style={{ color: "#2d6a4f" }}
                          onClick={() => setStep("select_subservice")}
                          data-ocid="service_category.change_service_button"
                        >
                          Ganti Jenis Layanan
                        </button>
                      </div>
                    ) : (
                      <div
                        className="space-y-4"
                        data-ocid="service_category.provider_list"
                      >
                        {nearbyNurses.map((nurse, idx) => {
                          const distKm =
                            nurse.latitude !== undefined &&
                            nurse.longitude !== undefined &&
                            geoPos
                              ? haversineKm(
                                  geoPos.lat,
                                  geoPos.lon,
                                  nurse.latitude,
                                  nurse.longitude,
                                )
                              : null;
                          return (
                            <ProviderCard
                              key={nurse.principal.toString()}
                              idx={idx}
                              name={nurse.name}
                              specialization={nurse.specialization}
                              experience={`${Number(nurse.experienceYears)} tahun`}
                              status={
                                nurse.status === "verified" ? "ready" : "busy"
                              }
                              fee={null}
                              distance={distKm}
                              nightTime={nightTime}
                              onBook={() => {
                                const isLoggedIn =
                                  localStorage.getItem("healio_role");
                                if (!isLoggedIn) {
                                  toast.error(
                                    "Silahkan login terlebih dahulu untuk memesan layanan",
                                  );
                                  navigate({ to: "/login" });
                                  return;
                                }
                                navigate({ to: "/patient/services" });
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

interface ProviderCardProps {
  idx: number;
  name: string;
  specialization: string;
  experience: string;
  status: "ready" | "busy";
  fee: string | null;
  distance: number | null;
  nightTime: boolean;
  onBook: () => void;
}

function ProviderCard({
  idx,
  name,
  specialization,
  experience,
  status,
  fee,
  distance,
  nightTime,
  onBook,
}: ProviderCardProps) {
  const isReady = status === "ready";
  return (
    <div
      className="flex gap-4 p-5 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1.5px solid rgba(45,106,79,0.12)",
        boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      data-ocid={`service_category.provider_card.${idx + 1}`}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl font-display"
        style={{
          background: isReady
            ? "linear-gradient(135deg, #1a3a2a, #2d6a4f)"
            : "rgba(160,160,160,0.15)",
          color: isReady ? "#c9a227" : "#9a9a9a",
        }}
      >
        <User size={24} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div
            className="font-display font-bold text-lg truncate"
            style={{ color: "#1a3a2a" }}
          >
            {name}
          </div>
          <Badge
            className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: isReady
                ? "rgba(45,106,79,0.12)"
                : "rgba(160,160,160,0.15)",
              color: isReady ? "#1a5c38" : "#6a6a6a",
              border: isReady
                ? "1px solid rgba(45,106,79,0.25)"
                : "1px solid rgba(160,160,160,0.25)",
            }}
          >
            {isReady ? "● Siap" : "○ Tidak Tersedia"}
          </Badge>
        </div>

        <div className="text-sm mb-2" style={{ color: "#5a7a68" }}>
          {specialization} · {experience} pengalaman
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {distance !== null && (
            <span
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: "#2d6a4f" }}
            >
              <MapPin size={13} />
              {distance.toFixed(1)} km dari lokasi Anda
            </span>
          )}
          {fee !== null && (
            <span
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: "#1a3a2a" }}
            >
              {fee}
            </span>
          )}
          {distance !== null && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(45,106,79,0.07)", color: "#3a6a52" }}
            >
              + Rp {(distance * 5000).toLocaleString("id-ID")} transport
            </span>
          )}
          {nightTime && (
            <span
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(100,60,200,0.08)", color: "#4a1a9a" }}
            >
              <Moon size={11} /> Tarif malam +20%
            </span>
          )}
        </div>
      </div>

      {isReady && (
        <div className="shrink-0 flex flex-col justify-center">
          <Button
            size="sm"
            onClick={onBook}
            className="font-bold whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 2px 8px rgba(45,106,79,0.3)",
            }}
            data-ocid={`service_category.book_button.${idx + 1}`}
          >
            Pesan <ArrowRight size={14} />
          </Button>
          {distance !== null && (
            <div
              className="flex items-center gap-0.5 justify-center mt-1.5 text-xs"
              style={{ color: "#8a9a8a" }}
            >
              <Clock size={10} />
              <span>~{Math.round(distance * 3 + 5)} mnt</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
