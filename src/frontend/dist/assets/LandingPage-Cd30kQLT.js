import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BMCDcUtm.js";
import { u as useAuth, L as Layout, S as Stethoscope, a as Shield } from "./Layout-Cy_f-yyM.js";
import { B as Button } from "./button-Dgh0anEC.js";
import { F as FRONTEND_CATEGORY_ICONS, a as FRONTEND_CATEGORY_LABELS, C as CONSULTATION_ONLY_CATEGORIES, L as LOCATION_BASED_CATEGORIES, b as FRONTEND_CATEGORY_DESCS } from "./types-Bf0oF2PP.js";
import { c as createLucideIcon } from "./createLucideIcon-BGQG7qVG.js";
import { A as ArrowRight } from "./arrow-right-Cop4AxUk.js";
import { C as CircleCheck } from "./circle-check-nmm9i2XG.js";
import { P as Phone, H as Heart } from "./phone-DwE9C414.js";
import { M as MapPin } from "./map-pin-kXgV3Eib.js";
import { A as ArrowLeft } from "./arrow-left-e78FHiku.js";
import { S as ShieldCheck } from "./shield-check-CctHuPnw.js";
import { U as User } from "./user-BGBq1kLk.js";
import "./backend-wp3yap7s.js";
import "./clipboard-list-BEaON99x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const SLIDES = [
  { src: "/assets/slide1.png", alt: "Perawat homecare profesional" },
  { src: "/assets/slide2.png", alt: "Layanan kesehatan di rumah" },
  { src: "/assets/slide3.png", alt: "Tim medis Healio Medika" },
  { src: "/assets/slide4.png", alt: "Ambulans dan tenaga medis siap" }
];
const SERVICES = [
  { category: "dokter" },
  { category: "perawat" },
  { category: "bidan" },
  { category: "fisioterapi" },
  { category: "ambulans" },
  { category: "apotek" }
];
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 28 }),
    title: "Tenaga Medis Terverifikasi",
    desc: "Seluruh tenaga medis kami telah melalui proses verifikasi STR dan kredensial profesional."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 28 }),
    title: "Layanan Berbasis Lokasi",
    desc: "Temukan dokter, perawat, atau apotek terdekat di sekitar Anda dengan teknologi GPS."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 28 }),
    title: "Biaya Transparan",
    desc: "Estimasi biaya otomatis berdasarkan jarak — tidak ada biaya tersembunyi."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 28 }),
    title: "Ramah Lansia",
    desc: "Tampilan besar, mudah digunakan, dan dirancang khusus untuk pengguna lansia."
  }
];
const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Pasien Lansia, Jakarta",
    text: "Perawat yang datang sangat profesional dan penuh perhatian. Ibu saya merasa sangat nyaman.",
    rating: 5
  },
  {
    name: "Siti Rahma",
    role: "Keluarga Pasien, Bandung",
    text: "Proses pemesanan sangat mudah. Dalam 30 menit perawat sudah tiba di rumah kami.",
    rating: 5
  },
  {
    name: "Dr. Hendra Wijaya",
    role: "Dokter Rujukan",
    text: "Sistem verifikasi STR yang ketat membuat saya percaya merujuk pasien ke Healio Medika.",
    rating: 5
  }
];
const LOGIN_PORTALS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 32 }),
    title: "Portal Pasien",
    label: "PASIEN",
    colorAccent: "#c9a227",
    colorBg: "rgba(201,162,39,0.08)",
    colorBorder: "rgba(201,162,39,0.25)",
    steps: [
      "1. Klik tombol Daftar atau Masuk di atas",
      "2. Login dengan Internet Identity",
      "3. Pilih peran sebagai Pasien"
    ],
    note: null,
    buttonLabel: "Masuk sebagai Pasien",
    buttonStyle: {
      background: "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
      color: "#1a3a2a",
      border: "none"
    },
    ocid: "landing.portal_pasien_button"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 32 }),
    title: "Portal Tenaga Medis",
    label: "TENAGA MEDIS",
    colorAccent: "#2d6a4f",
    colorBg: "rgba(45,106,79,0.07)",
    colorBorder: "rgba(45,106,79,0.25)",
    steps: [
      "1. Klik tombol Daftar Tenaga Medis di atas",
      "2. Login dengan Internet Identity",
      "3. Pilih peran sebagai Tenaga Medis",
      "4. Lengkapi profil dan dokumen STR/KTP"
    ],
    note: null,
    buttonLabel: "Masuk sebagai Tenaga Medis",
    buttonStyle: {
      background: "transparent",
      color: "#1a3a2a",
      border: "2px solid #2d6a4f"
    },
    ocid: "landing.portal_medis_button"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 32 }),
    title: "Portal Admin",
    label: "ADMIN",
    colorAccent: "#5a6a7a",
    colorBg: "rgba(90,106,122,0.06)",
    colorBorder: "rgba(90,106,122,0.2)",
    steps: [
      "1. Gunakan akun Internet Identity yang terdaftar sebagai Admin",
      "2. Login di halaman yang sama",
      "3. Sistem otomatis mengarahkan ke Dashboard Admin"
    ],
    note: "Akses Admin hanya untuk pengelola sistem HEALIO MEDIKA",
    buttonLabel: "Masuk sebagai Admin",
    buttonStyle: {
      background: "rgba(90,106,122,0.1)",
      color: "#3a4a5a",
      border: "1.5px solid rgba(90,106,122,0.3)"
    },
    ocid: "landing.portal_admin_button"
  }
];
function HeroSlideshow() {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const goTo = reactExports.useCallback(
    (idx) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning]
  );
  const next = reactExports.useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);
  const prev = reactExports.useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);
  reactExports.useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const manualNav = reactExports.useCallback((fn) => {
    if (timerRef.current) clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5e3);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
    SLIDES.map((slide, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute inset-0 transition-opacity duration-700",
        style: { opacity: idx === current && !isTransitioning ? 1 : 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: slide.src,
              alt: slide.alt,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: { background: "rgba(0,0,0,0.50)" }
            }
          )
        ]
      },
      slide.src
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Slide sebelumnya",
        onClick: () => manualNav(prev),
        "data-ocid": "landing.slideshow_prev",
        className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110",
        style: {
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#ffffff"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Slide berikutnya",
        onClick: () => manualNav(next),
        "data-ocid": "landing.slideshow_next",
        className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110",
        style: {
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#ffffff"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2", children: SLIDES.map((slide, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Pergi ke slide ${idx + 1}`,
        onClick: () => manualNav(() => goTo(idx)),
        "data-ocid": `landing.slideshow_dot.${idx + 1}`,
        className: "rounded-full transition-all duration-300",
        style: {
          width: idx === current ? "28px" : "10px",
          height: "10px",
          background: idx === current ? "#c9a227" : "rgba(255,255,255,0.5)",
          border: idx === current ? "none" : "1.5px solid rgba(255,255,255,0.6)"
        }
      },
      slide.alt
    )) })
  ] });
}
function LoginInfoSection() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-24",
      style: { background: "#f0faf5" },
      "data-ocid": "landing.login_info_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-extrabold text-3xl md:text-4xl mb-3",
              style: { color: "#1a3a2a" },
              children: "Cara Masuk ke Akun Anda"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", style: { color: "#5a7a68" }, children: "Akses portal sesuai peran Anda" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-1 mx-auto mt-4 rounded-full",
              style: { background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: LOGIN_PORTALS.map((portal) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-7 flex flex-col",
            style: {
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: `1.5px solid ${portal.colorBorder}`,
              boxShadow: "0 8px 32px rgba(45,106,79,0.10)"
            },
            "data-ocid": `landing.portal_card.${portal.label.toLowerCase().replace(" ", "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                    style: {
                      background: portal.colorBg,
                      border: `1.5px solid ${portal.colorBorder}`,
                      color: portal.colorAccent
                    },
                    children: portal.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-bold tracking-widest uppercase",
                      style: { color: portal.colorAccent },
                      children: portal.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-display font-extrabold text-lg leading-tight",
                      style: { color: "#1a3a2a" },
                      children: portal.title
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2 mb-5 flex-1", children: portal.steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "li",
                {
                  className: "text-sm leading-snug",
                  style: { color: "#3a5c48" },
                  children: step
                },
                step
              )) }),
              portal.note && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs italic mb-4 px-3 py-2 rounded-lg",
                  style: {
                    color: "#6a7a8a",
                    background: "rgba(90,106,122,0.07)",
                    border: "1px solid rgba(90,106,122,0.12)"
                  },
                  children: portal.note
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/login" }),
                  className: "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-md",
                  style: portal.buttonStyle,
                  "data-ocid": portal.ocid,
                  children: portal.buttonLabel
                }
              )
            ]
          },
          portal.label
        )) })
      ] })
    }
  );
}
function LandingPage() {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isLoggedIn && role) {
      if (role === "patient") navigate({ to: "/patient/dashboard" });
      else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
      else if (role === "admin") navigate({ to: "/admin/dashboard" });
    }
  }, [isLoggedIn, role, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { showSidebar: false, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden min-h-[90vh] flex items-center",
        "data-ocid": "landing.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlideshow, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6",
                  style: {
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.35)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, fill: "#c9a227", style: { color: "#c9a227" } }),
                    "Layanan Homecare Terpercaya #1 di Indonesia"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h1",
                {
                  className: "font-display font-black leading-tight mb-6",
                  style: {
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "#ffffff",
                    textShadow: "0 2px 16px rgba(0,0,0,0.45)"
                  },
                  children: [
                    "KESEHATAN ANDA,",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f5d76a" }, children: "PRIORITAS KAMI" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-lg md:text-xl mb-8 leading-relaxed",
                  style: {
                    color: "rgba(255,255,255,0.90)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.3)"
                  },
                  children: "Layanan perawatan profesional langsung ke rumah Anda — Dokter, Perawat, Bidan, Fisioterapis, Ambulans, dan Apotek terdekat siap membantu kapan pun Anda butuhkan."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("layanan")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    "data-ocid": "landing.cta_pasien_button",
                    className: "font-bold text-base px-8 py-4 rounded-xl",
                    style: {
                      background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
                      color: "#ffffff",
                      border: "none",
                      boxShadow: "0 4px 16px rgba(45,106,79,0.4)"
                    },
                    children: [
                      "Pilih Layanan Sekarang ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "lg",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("layanan")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    "data-ocid": "landing.cta_pelajari_button",
                    className: "font-semibold text-base px-8 py-4 rounded-xl",
                    style: {
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: "#ffffff",
                      border: "1.5px solid rgba(255,255,255,0.45)"
                    },
                    children: "Pelajari Lebih Lanjut"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, style: { color: "#86e8b0" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-medium",
                      style: { color: "rgba(255,255,255,0.9)" },
                      children: "500+ Tenaga Medis Terverifikasi"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, style: { color: "#f5d76a" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-medium",
                      style: { color: "rgba(255,255,255,0.9)" },
                      children: "10.000+ Pasien Dilayani"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl overflow-hidden",
                style: {
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 p-4 rounded-xl",
                      style: {
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-10 h-10 rounded-full flex items-center justify-center",
                            style: { background: "rgba(45,106,79,0.35)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18, style: { color: "#86e8b0" } })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-xs font-medium",
                              style: { color: "rgba(255,255,255,0.7)" },
                              children: "Butuh bantuan?"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "font-bold text-sm",
                              style: { color: "#ffffff" },
                              children: "Hubungi kami 24/7"
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-3", children: SERVICES.slice(0, 4).map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 p-3 rounded-xl",
                      style: {
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.2)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: FRONTEND_CATEGORY_ICONS[svc.category] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold",
                            style: { color: "rgba(255,255,255,0.9)" },
                            children: FRONTEND_CATEGORY_LABELS[svc.category]
                          }
                        )
                      ]
                    },
                    svc.category
                  )) })
                ] })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "layanan",
        className: "py-16 md:py-24 relative overflow-hidden",
        style: { background: "#ffffff" },
        "data-ocid": "landing.services_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.04] blur-3xl",
              style: {
                background: "radial-gradient(circle, #2d6a4f 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display font-extrabold mb-3",
                  style: {
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#1a3a2a"
                  },
                  children: "LAYANAN UNGGULAN KAMI"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-lg max-w-2xl mx-auto",
                  style: { color: "#5a7a68" },
                  children: "Pilih layanan kesehatan profesional yang sesuai dengan kebutuhan Anda"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-20 h-1 mx-auto mt-4 rounded-full",
                  style: { background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: SERVICES.map((svc, idx) => {
              const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(
                svc.category
              );
              const isLocationBased = LOCATION_BASED_CATEGORIES.includes(
                svc.category
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "group rounded-2xl p-6 transition-smooth hover:translate-y-[-4px] bg-white",
                  style: {
                    border: "1.5px solid rgba(45,106,79,0.12)",
                    boxShadow: "0 4px 20px rgba(45,106,79,0.07)"
                  },
                  "data-ocid": `landing.service_card.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4",
                        style: {
                          background: "rgba(45,106,79,0.08)",
                          border: "1px solid rgba(45,106,79,0.15)"
                        },
                        children: FRONTEND_CATEGORY_ICONS[svc.category]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-display font-extrabold uppercase tracking-wide",
                          style: { color: "#1a3a2a", fontSize: "1.1rem" },
                          children: FRONTEND_CATEGORY_LABELS[svc.category]
                        }
                      ),
                      isConsultOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-2 py-0.5 rounded-full font-semibold",
                          style: {
                            background: "rgba(201,162,39,0.12)",
                            color: "#7a6218"
                          },
                          children: "Konsultasi"
                        }
                      ),
                      isLocationBased && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1",
                          style: {
                            background: "rgba(45,106,79,0.1)",
                            color: "#1a5c38"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
                            " GPS"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base leading-relaxed mb-5",
                        style: { color: "#5a7a68" },
                        children: FRONTEND_CATEGORY_DESCS[svc.category]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => navigate({
                          to: "/services/$category",
                          params: { category: svc.category }
                        }),
                        className: "flex items-center gap-2 text-sm font-bold transition-smooth",
                        style: { color: "#2d6a4f" },
                        "data-ocid": `landing.service_order_button.${idx + 1}`,
                        children: [
                          isConsultOnly ? "Konsultasi Sekarang" : "Cari Terdekat",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
                        ]
                      }
                    )
                  ]
                },
                svc.category
              );
            }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 md:py-24",
        style: { background: "#f5fdf8" },
        "data-ocid": "landing.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-extrabold text-3xl md:text-4xl mb-3",
                style: { color: "#1a3a2a" },
                children: "MENGAPA MEMILIH HEALIO MEDIKA?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-1 mx-auto rounded-full",
                style: { background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: FEATURES.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-6 rounded-2xl hover:shadow-lg transition-smooth bg-white",
              style: { border: "1px solid rgba(45,106,79,0.12)" },
              "data-ocid": `landing.feature_card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    style: {
                      background: "linear-gradient(135deg, rgba(45,106,79,0.08) 0%, rgba(201,162,39,0.06) 100%)",
                      border: "1px solid rgba(45,106,79,0.12)",
                      color: "#2d6a4f"
                    },
                    children: f.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-extrabold text-lg mb-2 uppercase tracking-wide",
                    style: { color: "#1a3a2a" },
                    children: f.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: f.desc })
              ]
            },
            f.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 md:py-24",
        style: { background: "#ffffff" },
        "data-ocid": "landing.testimonials_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-extrabold text-3xl md:text-4xl mb-3",
                style: { color: "#1a3a2a" },
                children: "APA KATA MEREKA?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-1 mx-auto rounded-full",
                style: { background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-6 bg-white",
              style: {
                border: "1.5px solid rgba(45,106,79,0.12)",
                boxShadow: "0 4px 24px rgba(45,106,79,0.07)"
              },
              "data-ocid": `landing.testimonial_card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-3", children: Array.from({ length: t.rating }).map((_s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 16,
                    style: { color: "#c9a227" },
                    fill: "#c9a227"
                  },
                  `star-${t.name}-${i}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-base italic leading-relaxed mb-4",
                    style: { color: "#2d4a38" },
                    children: [
                      "“",
                      t.text,
                      "”"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-full flex items-center justify-center font-bold font-display",
                      style: {
                        background: "linear-gradient(135deg, #1a3a2a, #2d6a4f)",
                        color: "#c9a227"
                      },
                      children: t.name[0]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-bold text-sm",
                        style: { color: "#1a3a2a" },
                        children: t.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.role })
                  ] })
                ] })
              ]
            },
            t.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoginInfoSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-16 md:py-24 relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 60%, #1a4a2e 100%)"
        },
        "data-ocid": "landing.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-20",
              style: {
                backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,162,39,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-black mb-4",
                style: {
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#ffffff"
                },
                children: "MULAI PERJALANAN SEHAT ANDA"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-lg mb-8",
                style: { color: "rgba(255,255,255,0.8)" },
                children: "Daftarkan diri sebagai pasien atau bergabung sebagai tenaga medis profesional hari ini."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "inline-block p-1 mb-2",
                style: {
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "1rem"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      onClick: () => navigate({ to: "/login" }),
                      "data-ocid": "landing.bottom_cta_pasien_button",
                      className: "font-bold text-base px-8 rounded-xl",
                      style: {
                        background: "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
                        color: "#1a3a2a",
                        border: "none"
                      },
                      children: [
                        "Daftar sebagai Pasien ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20 })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "lg",
                      onClick: () => navigate({ to: "/login" }),
                      "data-ocid": "landing.bottom_cta_perawat_button",
                      className: "font-semibold text-base px-8 rounded-xl",
                      style: {
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.3)"
                      },
                      children: "Daftar sebagai Tenaga Medis"
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-6 text-sm font-semibold uppercase tracking-widest",
                style: { color: "rgba(201,162,39,0.9)" },
                children: "MELAYANI DENGAN SEPENUH HATI"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  LandingPage as default
};
