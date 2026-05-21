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
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Stethoscope,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// --- Data ---

const SLIDES = [
  {
    src: "/assets/healio-slide1.png",
    alt: "Perawat homecare profesional Healio Medika",
  },
  { src: "/assets/healio-slide2.png", alt: "Ruang konsultasi Healio Medika" },
  { src: "/assets/healio-slide3.png", alt: "Apotek Healio Medika" },
];

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

const LOGIN_PORTALS = [
  {
    icon: <User size={32} />,
    title: "Portal Pasien",
    label: "PASIEN",
    colorAccent: "#c9a227",
    colorBg: "rgba(201,162,39,0.08)",
    colorBorder: "rgba(201,162,39,0.25)",
    steps: [
      "1. Klik tombol Daftar atau Masuk di atas",
      "2. Login menggunakan Email & Password",
      "3. Pilih peran sebagai Pasien",
    ],
    note: null,
    buttonLabel: "Masuk sebagai Pasien",
    buttonStyle: {
      background: "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
      color: "#1a3a2a",
      border: "none",
    },
    ocid: "landing.portal_pasien_button",
  },
  {
    icon: <Stethoscope size={32} />,
    title: "Portal Tenaga Medis",
    label: "TENAGA MEDIS",
    colorAccent: "#2d6a4f",
    colorBg: "rgba(45,106,79,0.07)",
    colorBorder: "rgba(45,106,79,0.25)",
    steps: [
      "1. Klik tombol Daftar Tenaga Medis di atas",
      "2. Login menggunakan Email & Password",
      "3. Pilih peran sebagai Tenaga Medis",
      "4. Lengkapi profil dan dokumen STR/KTP",
    ],
    note: null,
    buttonLabel: "Masuk sebagai Tenaga Medis",
    buttonStyle: {
      background: "transparent",
      color: "#1a3a2a",
      border: "2px solid #2d6a4f",
    },
    ocid: "landing.portal_medis_button",
  },
  {
    icon: <Shield size={32} />,
    title: "Portal Admin",
    label: "ADMIN",
    colorAccent: "#5a6a7a",
    colorBg: "rgba(90,106,122,0.06)",
    colorBorder: "rgba(90,106,122,0.2)",
    steps: [
      "1. Masuk dengan email admin terdaftar",
      "2. Masukkan email & password di halaman login",
      "3. Sistem otomatis mengarahkan ke Dashboard Admin",
    ],
    note: "Akses Admin hanya untuk pengelola sistem HEALIO MEDIKA",
    buttonLabel: "Masuk sebagai Admin",
    buttonStyle: {
      background: "rgba(90,106,122,0.1)",
      color: "#3a4a5a",
      border: "1.5px solid rgba(90,106,122,0.3)",
    },
    ocid: "landing.portal_admin_button",
  },
];

// --- HeroSlideshow ---

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Reset timer on manual navigation
  const manualNav = useCallback((fn: () => void) => {
    if (timerRef.current) clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === current && !isTransitioning ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.50)" }}
          />
        </div>
      ))}

      {/* Left arrow */}
      <button
        type="button"
        aria-label="Slide sebelumnya"
        onClick={() => manualNav(prev)}
        data-ocid="landing.slideshow_prev"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#ffffff",
        }}
      >
        <ArrowLeft size={20} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Slide berikutnya"
        onClick={() => manualNav(next)}
        data-ocid="landing.slideshow_next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#ffffff",
        }}
      >
        <ArrowRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`Pergi ke slide ${idx + 1}`}
            onClick={() => manualNav(() => goTo(idx))}
            data-ocid={`landing.slideshow_dot.${idx + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: idx === current ? "28px" : "10px",
              height: "10px",
              background: idx === current ? "#c9a227" : "rgba(255,255,255,0.5)",
              border:
                idx === current ? "none" : "1.5px solid rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// --- LoginInfoSection ---

function LoginInfoSection() {
  const navigate = useNavigate();
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#f0faf5" }}
      data-ocid="landing.login_info_section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="font-display font-extrabold text-3xl md:text-4xl mb-3"
            style={{ color: "#1a3a2a" }}
          >
            Cara Masuk ke Akun Anda
          </h2>
          <p className="text-lg" style={{ color: "#5a7a68" }}>
            Akses portal sesuai peran Anda
          </p>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOGIN_PORTALS.map((portal) => (
            <div
              key={portal.label}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: `1.5px solid ${portal.colorBorder}`,
                boxShadow: "0 8px 32px rgba(45,106,79,0.10)",
              }}
              data-ocid={`landing.portal_card.${portal.label.toLowerCase().replace(" ", "_")}`}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: portal.colorBg,
                    border: `1.5px solid ${portal.colorBorder}`,
                    color: portal.colorAccent,
                  }}
                >
                  {portal.icon}
                </div>
                <div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: portal.colorAccent }}
                  >
                    {portal.label}
                  </span>
                  <h3
                    className="font-display font-extrabold text-lg leading-tight"
                    style={{ color: "#1a3a2a" }}
                  >
                    {portal.title}
                  </h3>
                </div>
              </div>

              {/* Steps */}
              <ul className="flex flex-col gap-2 mb-5 flex-1">
                {portal.steps.map((step) => (
                  <li
                    key={step}
                    className="text-sm leading-snug"
                    style={{ color: "#3a5c48" }}
                  >
                    {step}
                  </li>
                ))}
              </ul>

              {/* Note */}
              {portal.note && (
                <p
                  className="text-xs italic mb-4 px-3 py-2 rounded-lg"
                  style={{
                    color: "#6a7a8a",
                    background: "rgba(90,106,122,0.07)",
                    border: "1px solid rgba(90,106,122,0.12)",
                  }}
                >
                  {portal.note}
                </p>
              )}

              {/* Button */}
              <button
                type="button"
                onClick={() => {
                  if (portal.label === "PASIEN")
                    navigate({ to: "/patient/register" });
                  else if (portal.label === "TENAGA MEDIS")
                    navigate({ to: "/medical-staff/register" });
                  else navigate({ to: "/login" });
                }}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
                style={portal.buttonStyle}
                data-ocid={portal.ocid}
              >
                {portal.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Main Page ---

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
      {/* ── Hero Section with Slideshow ── */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        data-ocid="landing.hero_section"
      >
        {/* Slideshow background */}
        <HeroSlideshow />

        {/* Content on top of slideshow */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Hero Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              <Star size={14} fill="#c9a227" style={{ color: "#c9a227" }} />
              Layanan Homecare Terpercaya #1 di Indonesia
            </div>

            <h1
              className="font-display font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#ffffff",
                textShadow: "0 2px 16px rgba(0,0,0,0.45)",
              }}
            >
              KESEHATAN ANDA,
              <br />
              <span style={{ color: "#f5d76a" }}>PRIORITAS KAMI</span>
            </h1>

            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.90)",
                textShadow: "0 1px 8px rgba(0,0,0,0.3)",
              }}
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
                  boxShadow: "0 4px 16px rgba(45,106,79,0.4)",
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
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#ffffff",
                  border: "1.5px solid rgba(255,255,255,0.45)",
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "#86e8b0" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  500+ Tenaga Medis Terverifikasi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: "#f5d76a" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
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
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              <div className="p-5">
                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(45,106,79,0.35)" }}
                  >
                    <Phone size={18} style={{ color: "#86e8b0" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Butuh bantuan?
                    </div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#ffffff" }}
                    >
                      Hubungi kami 24/7
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {SERVICES.slice(0, 4).map((svc) => (
                    <div
                      key={svc.category}
                      className="flex items-center gap-2 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <span className="text-xl">
                        {FRONTEND_CATEGORY_ICONS[svc.category]}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {FRONTEND_CATEGORY_LABELS[svc.category]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section
        id="layanan"
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #062b1e 0%, #0d4a35 35%, #133d2a 65%, #081f16 100%)",
        }}
        data-ocid="landing.services_section"
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #22c55e 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #c9a227 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2
              className="font-display font-extrabold mb-3"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#ffffff",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              LAYANAN UNGGULAN KAMI
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Pilih layanan kesehatan profesional yang sesuai dengan kebutuhan
              Anda
            </p>
            <div
              className="w-20 h-1 mx-auto mt-4 rounded-full"
              style={{ background: "linear-gradient(90deg, #4ade80, #c9a227)" }}
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
                  className="group rounded-[20px] p-6 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "scale(1.05) translateY(-4px)";
                    el.style.background = "rgba(255,255,255,0.18)";
                    el.style.boxShadow =
                      "0 20px 48px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "scale(1) translateY(0)";
                    el.style.background = "rgba(255,255,255,0.12)";
                    el.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)";
                  }}
                  data-ocid={`landing.service_card.${idx + 1}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    {FRONTEND_CATEGORY_ICONS[svc.category]}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className="font-display font-extrabold uppercase tracking-wide"
                      style={{
                        color: "#ffffff",
                        fontSize: "1.1rem",
                        textShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      {FRONTEND_CATEGORY_LABELS[svc.category]}
                    </h3>
                    {isConsultOnly && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "rgba(201,162,39,0.35)",
                          color: "#f5d76a",
                          border: "1px solid rgba(201,162,39,0.4)",
                        }}
                      >
                        Konsultasi
                      </span>
                    )}
                    {isLocationBased && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                        style={{
                          background: "rgba(74,222,128,0.2)",
                          color: "#86efac",
                          border: "1px solid rgba(74,222,128,0.35)",
                        }}
                      >
                        <MapPin size={10} /> GPS
                      </span>
                    )}
                  </div>
                  <p
                    className="text-base leading-relaxed mb-5"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    {FRONTEND_CATEGORY_DESCS[svc.category]}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      svc.category === "apotek"
                        ? navigate({ to: "/apotek" })
                        : navigate({
                            to: "/services/$category",
                            params: { category: svc.category },
                          })
                    }
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{
                      color: "#86efac",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#f5d76a";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#86efac";
                    }}
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

      {/* ── Features Section ── */}
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

      {/* ── Testimonials Section ── */}
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

      {/* ── Login Info Section ── */}
      <LoginInfoSection />

      {/* ── CTA Section ── */}
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
                onClick={() => navigate({ to: "/patient/register" })}
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
                onClick={() => navigate({ to: "/medical-staff/register" })}
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
