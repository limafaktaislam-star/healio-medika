import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  CONSULTATION_ONLY_CATEGORIES,
  FRONTEND_CATEGORY_DESCS,
  FRONTEND_CATEGORY_ICONS,
  FRONTEND_CATEGORY_LABELS,
  type FrontendCategory,
  LOCATION_BASED_CATEGORIES,
} from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useEffect } from "react";

const SERVICES: Array<{ category: FrontendCategory }> = [
  { category: "dokter" },
  { category: "perawat" },
  { category: "bidan" },
  { category: "fisioterapi" },
  { category: "ambulans" },
  { category: "apotek" },
];

const FEATURES = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Tenaga Medis Terverifikasi",
    desc: "Seluruh tenaga medis kami telah melalui proses verifikasi STR dan kredensial profesional.",
  },
  {
    icon: <MapPin size={28} />,
    title: "Layanan Berbasis Lokasi",
    desc: "Temukan dokter, perawat, atau apotek terdekat di sekitar Anda dengan teknologi GPS.",
  },
  {
    icon: <Award size={28} />,
    title: "Biaya Transparan",
    desc: "Estimasi biaya otomatis berdasarkan jarak — tidak ada biaya tersembunyi.",
  },
  {
    icon: <Heart size={28} />,
    title: "Ramah Lansia",
    desc: "Tampilan besar, mudah digunakan, dan dirancang khusus untuk pengguna lansia.",
  },
];

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Pasien Lansia, Jakarta",
    text: "Perawat yang datang sangat profesional dan penuh perhatian. Ibu saya merasa sangat nyaman.",
    rating: 5,
  },
  {
    name: "Siti Rahma",
    role: "Keluarga Pasien, Bandung",
    text: "Proses pemesanan sangat mudah. Dalam 30 menit perawat sudah tiba di rumah kami.",
    rating: 5,
  },
  {
    name: "Dr. Hendra Wijaya",
    role: "Dokter Rujukan",
    text: "Sistem verifikasi STR yang ketat membuat saya percaya merujuk pasien ke Healio Medika.",
    rating: 5,
  },
];

export default function LandingPage() {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && role) {
      if (role === "patient") navigate({ to: "/patient/dashboard" });
      else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
      else if (role === "admin") navigate({ to: "/admin/dashboard" });
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <Layout showSidebar={false}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center bg-background"
        style={{
          background:
            "linear-gradient(135deg, #f0faf5 0%, #e8f5ee 35%, #f5fdf8 65%, #ffffff 100%)",
        }}
        data-ocid="landing.hero_section"
      >
        {/* Background hero image with soft overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-homecare-green.dim_1200x700.jpg"
            alt=""
            className="w-full h-full object-cover opacity-8"
            style={{ opacity: 0.08 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(240,250,245,0.92) 0%, rgba(232,245,238,0.88) 50%, rgba(255,255,255,0.82) 100%)",
            }}
          />
        </div>

        {/* Decorative green orbs */}
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #2d6a4f 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #c9a227 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Hero Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(45,106,79,0.08)",
                color: "#1a3a2a",
                border: "1px solid rgba(45,106,79,0.2)",
              }}
            >
              <Star size={14} fill="#c9a227" style={{ color: "#c9a227" }} />
              Layanan Homecare Terpercaya #1 di Indonesia
            </div>

            <h1
              className="font-display font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#1a3a2a",
              }}
            >
              KESEHATAN ANDA,
              <br />
              <span style={{ color: "#2d6a4f" }}>PRIORITAS KAMI</span>
            </h1>

            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: "#3a5c48" }}
            >
              Layanan perawatan profesional langsung ke rumah Anda — Dokter,
              Perawat, Bidan, Fisioterapis, Ambulans, dan Apotek terdekat siap
              membantu kapan pun Anda butuhkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("layanan")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="landing.cta_pasien_button"
                className="font-bold text-base px-8 py-4 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
                  color: "#ffffff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(45,106,79,0.35)",
                }}
              >
                Pilih Layanan Sekarang <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("layanan")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="landing.cta_pelajari_button"
                className="font-semibold text-base px-8 py-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  color: "#1a3a2a",
                  border: "1.5px solid rgba(45,106,79,0.35)",
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div
              className="flex items-center gap-6"
              style={{ color: "#4a7a5e" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "#2d6a4f" }} />
                <span className="text-sm font-medium">
                  500+ Tenaga Medis Terverifikasi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "#c9a227" }} />
                <span className="text-sm font-medium">
                  10.000+ Pasien Dilayani
                </span>
              </div>
            </div>
          </div>

          {/* Hero Glass Card */}
          <div className="relative hidden md:block">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(45,106,79,0.2)",
                boxShadow:
                  "0 20px 60px rgba(45,106,79,0.12), 0 0 0 1px rgba(45,106,79,0.05)",
              }}
            >
              <img
                src="/assets/generated/hero-homecare-green.dim_1200x700.jpg"
                alt="Perawat profesional Healio Medika"
                className="w-full aspect-[4/3] object-cover"
                style={{ opacity: 0.9 }}
              />
              <div className="p-5">
                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(45,106,79,0.06)",
                    border: "1px solid rgba(45,106,79,0.15)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(45,106,79,0.12)" }}
                  >
                    <Phone size={18} style={{ color: "#2d6a4f" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: "#6a9a7e" }}
                    >
                      Butuh bantuan?
                    </div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#1a3a2a" }}
                    >
                      Hubungi kami 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="layanan"
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ background: "#ffffff" }}
        data-ocid="landing.services_section"
      >
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
          style={{
            background: "radial-gradient(circle, #2d6a4f 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2
              className="font-display font-extrabold mb-3"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1a3a2a",
              }}
            >
              LAYANAN UNGGULAN KAMI
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#5a7a68" }}
            >
              Pilih layanan kesehatan profesional yang sesuai dengan kebutuhan
              Anda
            </p>
            <div
              className="w-20 h-1 mx-auto mt-4 rounded-full"
              style={{ background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }}
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, idx) => {
              const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(
                svc.category,
              );
              const isLocationBased = LOCATION_BASED_CATEGORIES.includes(
                svc.category,
              );
              return (
                <div
                  key={svc.category}
                  className="group rounded-2xl p-6 transition-smooth hover:translate-y-[-4px] bg-white"
                  style={{
                    border: "1.5px solid rgba(45,106,79,0.12)",
                    boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
                  }}
                  data-ocid={`landing.service_card.${idx + 1}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                    style={{
                      background: "rgba(45,106,79,0.08)",
                      border: "1px solid rgba(45,106,79,0.15)",
                    }}
                  >
                    {FRONTEND_CATEGORY_ICONS[svc.category]}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className="font-display font-extrabold uppercase tracking-wide"
                      style={{ color: "#1a3a2a", fontSize: "1.1rem" }}
                    >
                      {FRONTEND_CATEGORY_LABELS[svc.category]}
                    </h3>
                    {isConsultOnly && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "rgba(201,162,39,0.12)",
                          color: "#7a6218",
                        }}
                      >
                        Konsultasi
                      </span>
                    )}
                    {isLocationBased && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                        style={{
                          background: "rgba(45,106,79,0.1)",
                          color: "#1a5c38",
                        }}
                      >
                        <MapPin size={10} /> GPS
                      </span>
                    )}
                  </div>
                  <p
                    className="text-base leading-relaxed mb-5"
                    style={{ color: "#5a7a68" }}
                  >
                    {FRONTEND_CATEGORY_DESCS[svc.category]}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/services/$category",
                        params: { category: svc.category },
                      })
                    }
                    className="flex items-center gap-2 text-sm font-bold transition-smooth"
                    style={{ color: "#2d6a4f" }}
                    data-ocid={`landing.service_order_button.${idx + 1}`}
                  >
                    {isConsultOnly ? "Konsultasi Sekarang" : "Cari Terdekat"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-16 md:py-24"
        style={{ background: "#f5fdf8" }}
        data-ocid="landing.features_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              className="font-display font-extrabold text-3xl md:text-4xl mb-3"
              style={{ color: "#1a3a2a" }}
            >
              MENGAPA MEMILIH HEALIO MEDIKA?
            </h2>
            <div
              className="w-20 h-1 mx-auto rounded-full"
              style={{ background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }}
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, idx) => (
              <div
                key={f.title}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-smooth bg-white"
                style={{ border: "1px solid rgba(45,106,79,0.12)" }}
                data-ocid={`landing.feature_card.${idx + 1}`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(45,106,79,0.08) 0%, rgba(201,162,39,0.06) 100%)",
                    border: "1px solid rgba(45,106,79,0.12)",
                    color: "#2d6a4f",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-display font-extrabold text-lg mb-2 uppercase tracking-wide"
                  style={{ color: "#1a3a2a" }}
                >
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 md:py-24"
        style={{ background: "#ffffff" }}
        data-ocid="landing.testimonials_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              className="font-display font-extrabold text-3xl md:text-4xl mb-3"
              style={{ color: "#1a3a2a" }}
            >
              APA KATA MEREKA?
            </h2>
            <div
              className="w-20 h-1 mx-auto rounded-full"
              style={{ background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className="rounded-2xl p-6 bg-white"
                style={{
                  border: "1.5px solid rgba(45,106,79,0.12)",
                  boxShadow: "0 4px 24px rgba(45,106,79,0.07)",
                }}
                data-ocid={`landing.testimonial_card.${idx + 1}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_s, i) => (
                    <Star
                      key={`star-${t.name}-${i}`}
                      size={16}
                      style={{ color: "#c9a227" }}
                      fill="#c9a227"
                    />
                  ))}
                </div>
                <p
                  className="text-base italic leading-relaxed mb-4"
                  style={{ color: "#2d4a38" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-display"
                    style={{
                      background: "linear-gradient(135deg, #1a3a2a, #2d6a4f)",
                      color: "#c9a227",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#1a3a2a" }}
                    >
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 60%, #1a4a2e 100%)",
        }}
        data-ocid="landing.cta_section"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(201,162,39,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2
            className="font-display font-black mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#ffffff",
            }}
          >
            MULAI PERJALANAN SEHAT ANDA
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Daftarkan diri sebagai pasien atau bergabung sebagai tenaga medis
            profesional hari ini.
          </p>
          <div
            className="inline-block p-1 mb-2"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "1rem",
            }}
          >
            <div className="flex flex-col sm:flex-row gap-3 p-2">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/login" })}
                data-ocid="landing.bottom_cta_pasien_button"
                className="font-bold text-base px-8 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
                  color: "#1a3a2a",
                  border: "none",
                }}
              >
                Daftar sebagai Pasien <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate({ to: "/login" })}
                data-ocid="landing.bottom_cta_perawat_button"
                className="font-semibold text-base px-8 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Daftar sebagai Tenaga Medis
              </Button>
            </div>
          </div>
          <div
            className="mt-6 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "rgba(201,162,39,0.9)" }}
          >
            MELAYANI DENGAN SEPENUH HATI
          </div>
        </div>
      </section>
    </Layout>
  );
}
