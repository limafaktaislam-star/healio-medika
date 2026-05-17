import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-BxBE-1lv.js";
import { L as Layout, S as Stethoscope } from "./Layout-BaOPEDvI.js";
import { B as Badge } from "./badge-CD4gHaqU.js";
import { B as Button } from "./button-E3tW3HbR.js";
import { u as useNearbyNurses } from "./useQueries-DOOnbajp.js";
import { F as FRONTEND_CATEGORY_ICONS, a as FRONTEND_CATEGORY_LABELS, b as FRONTEND_CATEGORY_DESCS, C as CONSULTATION_ONLY_CATEGORIES, L as LOCATION_BASED_CATEGORIES } from "./types-Bf0oF2PP.js";
import { C as CircleAlert } from "./circle-alert-C38bba3f.js";
import { A as ArrowLeft } from "./arrow-left-D2NqBB97.js";
import { M as MapPin } from "./map-pin-BvVnQF7V.js";
import { C as ChevronRight } from "./chevron-right-BfAisa3Z.js";
import { c as createLucideIcon } from "./createLucideIcon-C_thIQe7.js";
import { S as Search } from "./search-7SUC3XFY.js";
import { U as User } from "./user-Dtb7gKwj.js";
import { A as ArrowRight } from "./arrow-right-DQ5fwTRJ.js";
import { C as Clock } from "./clock-BZtvRGtZ.js";
import "./useAuth-CVbw7B2D.js";
import "./backend-RmgEpc2b.js";
import "./book-open-DYprvAsb.js";
import "./clipboard-list-Djhnxy2y.js";
import "./useMutation-DO_kterx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode);
const SUB_SERVICES = {
  dokter: [
    {
      id: "konsultasi_umum",
      name: "Konsultasi Umum",
      desc: "Konsultasi dokter umum untuk keluhan sehari-hari",
      icon: "🩺",
      baseFee: "Rp 150.000"
    },
    {
      id: "konsultasi_anak",
      name: "Konsultasi Anak",
      desc: "Dokter anak berpengalaman untuk buah hati Anda",
      icon: "👶",
      baseFee: "Rp 175.000"
    },
    {
      id: "konsultasi_lansia",
      name: "Konsultasi Lansia",
      desc: "Konsultasi khusus untuk kesehatan usia lanjut",
      icon: "👴",
      baseFee: "Rp 175.000"
    },
    {
      id: "konsultasi_gizi",
      name: "Konsultasi Gizi",
      desc: "Panduan nutrisi dan diet sehat dari ahli gizi",
      icon: "🥗",
      baseFee: "Rp 150.000"
    }
  ],
  perawat: [
    {
      id: "perawatan_lansia",
      name: "Perawatan Lansia",
      desc: "Pendampingan dan perawatan harian untuk lansia",
      icon: "🧓",
      baseFee: "Rp 200.000"
    },
    {
      id: "perawatan_luka",
      name: "Perawatan Luka",
      desc: "Ganti balut dan perawatan luka profesional",
      icon: "🩹",
      baseFee: "Rp 150.000"
    },
    {
      id: "pasca_operasi",
      name: "Pasca Operasi",
      desc: "Perawatan dan pemantauan kondisi pasca operasi",
      icon: "🏥",
      baseFee: "Rp 250.000"
    },
    {
      id: "injeksi",
      name: "Injeksi & Infus",
      desc: "Layanan injeksi dan pemasangan infus di rumah",
      icon: "💉",
      baseFee: "Rp 175.000"
    }
  ],
  bidan: [
    {
      id: "antenatal",
      name: "Perawatan Antenatal",
      desc: "Pemeriksaan kehamilan rutin oleh bidan profesional",
      icon: "🤰",
      baseFee: "Rp 200.000"
    },
    {
      id: "postnatal",
      name: "Perawatan Pasca Lahir",
      desc: "Perawatan ibu dan bayi setelah persalinan",
      icon: "🤱",
      baseFee: "Rp 225.000"
    },
    {
      id: "kb",
      name: "Konsultasi KB",
      desc: "Konsultasi program keluarga berencana",
      icon: "🌸",
      baseFee: "Rp 150.000"
    },
    {
      id: "laktasi",
      name: "Konsultasi Laktasi",
      desc: "Panduan menyusui dan konsultasi ASI eksklusif",
      icon: "🍼",
      baseFee: "Rp 175.000"
    }
  ],
  fisioterapi: [
    {
      id: "rehabilitasi",
      name: "Rehabilitasi Pasca Stroke",
      desc: "Program pemulihan gerak setelah stroke",
      icon: "🏃",
      baseFee: "Rp 300.000"
    },
    {
      id: "nyeri_punggung",
      name: "Terapi Nyeri Punggung",
      desc: "Penanganan nyeri punggung dan tulang belakang",
      icon: "🦴",
      baseFee: "Rp 250.000"
    },
    {
      id: "fisio_anak",
      name: "Fisioterapi Anak",
      desc: "Terapi gerak dan tumbuh kembang anak",
      icon: "🧒",
      baseFee: "Rp 275.000"
    },
    {
      id: "fisio_olahraga",
      name: "Cedera Olahraga",
      desc: "Pemulihan cedera otot dan sendi akibat olahraga",
      icon: "⚽",
      baseFee: "Rp 250.000"
    }
  ],
  ambulans: [
    {
      id: "ambulans_transport",
      name: "Ambulans Transport",
      desc: "Antar-jemput pasien ke fasilitas kesehatan",
      icon: "🚐",
      baseFee: "Rp 300.000"
    },
    {
      id: "ambulans_ugd",
      name: "Ambulans Gawat Darurat",
      desc: "Ambulans lengkap untuk penanganan darurat medis",
      icon: "🚑",
      baseFee: "Rp 500.000"
    },
    {
      id: "ambulans_jenazah",
      name: "Ambulans Jenazah",
      desc: "Layanan ambulans jenazah dengan penghormatan",
      icon: "🕊️",
      baseFee: "Rp 400.000"
    }
  ],
  apotek: [
    {
      id: "apotek_resep",
      name: "Tebus Resep",
      desc: "Tebus resep dokter — diantar ke rumah",
      icon: "📋",
      baseFee: "Sesuai resep"
    },
    {
      id: "apotek_obat_bebas",
      name: "Obat Bebas",
      desc: "Obat-obatan bebas tanpa resep untuk kebutuhan sehari-hari",
      icon: "💊",
      baseFee: "Sesuai harga"
    },
    {
      id: "apotek_vitamin",
      name: "Vitamin & Suplemen",
      desc: "Vitamin, suplemen, dan produk kesehatan",
      icon: "🌿",
      baseFee: "Sesuai harga"
    },
    {
      id: "apotek_alkes",
      name: "Alat Kesehatan",
      desc: "Tensimeter, termometer, dan alat kesehatan lainnya",
      icon: "🩺",
      baseFee: "Sesuai harga"
    }
  ]
};
function isNightTime() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  return hour >= 18 || hour < 6;
}
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function ServiceCategoryPage() {
  const { category } = useParams({ strict: false });
  const navigate = useNavigate();
  const cat = category;
  const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(cat);
  const isLocationBased = LOCATION_BASED_CATEGORIES.includes(cat);
  const [step, setStep] = reactExports.useState("select_subservice");
  const [selectedSub, setSelectedSub] = reactExports.useState(null);
  const [geoPos, setGeoPos] = reactExports.useState(null);
  const [geoError, setGeoError] = reactExports.useState(null);
  const [geoLoading, setGeoLoading] = reactExports.useState(false);
  const subServices = SUB_SERVICES[cat] ?? [];
  const { data: nearbyNurses, isLoading: nursesLoading } = useNearbyNurses(
    (geoPos == null ? void 0 : geoPos.lat) ?? 0,
    (geoPos == null ? void 0 : geoPos.lon) ?? 0
  );
  reactExports.useEffect(() => {
    if (step !== "search_providers" || isConsultOnly || geoPos) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoPos({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (_err) => {
        setGeoError(
          "Tidak dapat mendeteksi lokasi. Pastikan izin lokasi diaktifkan."
        );
        setGeoLoading(false);
      },
      { timeout: 1e4 }
    );
  }, [step, isConsultOnly, geoPos]);
  const nightTime = isNightTime();
  const validCategories = [
    "dokter",
    "perawat",
    "bidan",
    "fisioterapi",
    "ambulans",
    "apotek"
  ];
  if (!validCategories.includes(cat)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CircleAlert,
        {
          size: 48,
          style: { color: "#2d6a4f" },
          className: "mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", style: { color: "#1a3a2a" }, children: "Kategori Tidak Valid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Kategori layanan yang diminta tidak ditemukan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          "data-ocid": "service_category.back_home_button",
          children: "Kembali ke Beranda"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "#ffffff" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sticky top-0 z-30 border-b",
        style: {
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(45,106,79,0.15)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => step === "search_providers" ? setStep("select_subservice") : navigate({ to: "/" }),
              className: "flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70",
              style: { color: "#2d6a4f" },
              "data-ocid": "service_category.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 }),
                step === "search_providers" ? "Ganti Layanan" : "Beranda"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: FRONTEND_CATEGORY_ICONS[cat] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", style: { color: "#1a3a2a" }, children: FRONTEND_CATEGORY_LABELS[cat] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", children: [
      step === "select_subservice" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "service_category.subservice_step", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-base mb-1 font-semibold uppercase tracking-widest",
              style: { color: "#2d6a4f", fontSize: "0.78rem" },
              children: "Pilih Jenis Layanan"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-extrabold mb-2",
              style: {
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                color: "#1a3a2a"
              },
              children: FRONTEND_CATEGORY_LABELS[cat]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "#5a7a68" }, children: FRONTEND_CATEGORY_DESCS[cat] }),
          isConsultOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-sm font-semibold",
              style: {
                background: "rgba(201,162,39,0.1)",
                color: "#7a6218",
                border: "1px solid rgba(201,162,39,0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 14 }),
                " Konsultasi Online — Tanpa Perjalanan"
              ]
            }
          ),
          isLocationBased && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-sm font-semibold",
              style: {
                background: "rgba(45,106,79,0.08)",
                color: "#1a5c38",
                border: "1px solid rgba(45,106,79,0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
                " Berbasis Lokasi — Cari Provider Terdekat"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid sm:grid-cols-2 gap-4",
            "data-ocid": "service_category.subservice_list",
            children: subServices.map((sub, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedSub(sub.id);
                  setStep("search_providers");
                },
                className: "group text-left p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1",
                style: {
                  background: selectedSub === sub.id ? "rgba(45,106,79,0.06)" : "rgba(255,255,255,0.9)",
                  border: selectedSub === sub.id ? "2px solid #2d6a4f" : "1.5px solid rgba(45,106,79,0.15)",
                  boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                },
                "data-ocid": `service_category.subservice_item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: sub.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        size: 18,
                        className: "opacity-0 group-hover:opacity-100 transition-opacity",
                        style: { color: "#2d6a4f", marginTop: "4px" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display font-bold text-lg mb-1",
                      style: { color: "#1a3a2a" },
                      children: sub.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed mb-3",
                      style: { color: "#5a7a68" },
                      children: sub.desc
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "inline-block text-xs font-bold px-2.5 py-1 rounded-full",
                      style: {
                        background: "rgba(45,106,79,0.08)",
                        color: "#1a5c38"
                      },
                      children: [
                        "Mulai ",
                        sub.baseFee
                      ]
                    }
                  )
                ]
              },
              sub.id
            ))
          }
        )
      ] }),
      step === "search_providers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "service_category.provider_step", children: [
        selectedSub && (() => {
          const sub = subServices.find((s) => s.id === selectedSub);
          if (!sub) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-4 rounded-xl mb-8",
              style: {
                background: "rgba(45,106,79,0.05)",
                border: "1.5px solid rgba(45,106,79,0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: sub.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", style: { color: "#1a3a2a" }, children: sub.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", style: { color: "#5a7a68" }, children: [
                    "Mulai ",
                    sub.baseFee
                  ] })
                ] }),
                nightTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                    style: {
                      background: "rgba(100,60,200,0.1)",
                      color: "#4a1a9a"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 12 }),
                      " Tarif Malam"
                    ]
                  }
                )
              ]
            }
          );
        })(),
        isConsultOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-extrabold text-2xl mb-2",
                style: { color: "#1a3a2a" },
                children: "Dokter Tersedia"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "#5a7a68" }, children: "Pilih dokter untuk memulai konsultasi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-4",
              "data-ocid": "service_category.provider_list",
              children: [
                {
                  name: "dr. Andi Priyatno, Sp.U",
                  spec: "Dokter Umum",
                  exp: "10 tahun",
                  status: "ready",
                  fee: "Rp 150.000"
                },
                {
                  name: "dr. Rina Kusuma",
                  spec: "Dokter Anak",
                  exp: "8 tahun",
                  status: "ready",
                  fee: "Rp 175.000"
                },
                {
                  name: "dr. Hendra Wijaya",
                  spec: "Dokter Umum",
                  exp: "12 tahun",
                  status: "busy",
                  fee: "Rp 150.000"
                }
              ].map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProviderCard,
                {
                  idx,
                  name: doc.name,
                  specialization: doc.spec,
                  experience: doc.exp,
                  status: doc.status,
                  fee: doc.fee,
                  distance: null,
                  nightTime,
                  onBook: () => navigate({ to: "/login" })
                },
                doc.name
              ))
            }
          )
        ] }),
        isLocationBased && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-extrabold text-2xl mb-2",
                style: { color: "#1a3a2a" },
                children: "Provider Terdekat"
              }
            ),
            geoPos ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-sm",
                style: { color: "#5a7a68" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, style: { color: "#2d6a4f" } }),
                  "Lokasi Anda terdeteksi — Menampilkan provider dalam 20 km"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#5a7a68" }, children: "Mengambil lokasi Anda..." })
          ] }),
          geoLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 rounded-2xl",
              style: {
                background: "rgba(45,106,79,0.04)",
                border: "1.5px solid rgba(45,106,79,0.12)"
              },
              "data-ocid": "service_category.geo_loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-full flex items-center justify-center mb-4 animate-pulse",
                    style: { background: "rgba(45,106,79,0.1)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 28, style: { color: "#2d6a4f" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-lg",
                    style: { color: "#1a3a2a" },
                    children: "Mendeteksi Lokasi Anda..."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "#5a7a68" }, children: "Izinkan akses lokasi di browser Anda" })
              ]
            }
          ),
          geoError && !geoLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center text-center py-10 rounded-2xl px-6",
              style: {
                background: "rgba(220,50,50,0.04)",
                border: "1.5px solid rgba(220,50,50,0.15)"
              },
              "data-ocid": "service_category.geo_error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleAlert,
                  {
                    size: 36,
                    className: "mb-3",
                    style: { color: "#dc3232" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: "#1a3a2a" }, children: geoError }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "mt-4 text-sm font-bold underline",
                    style: { color: "#2d6a4f" },
                    onClick: () => {
                      setGeoError(null);
                      setGeoLoading(true);
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          setGeoPos({
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude
                          });
                          setGeoLoading(false);
                        },
                        () => {
                          setGeoError("Tidak dapat mendeteksi lokasi.");
                          setGeoLoading(false);
                        }
                      );
                    },
                    "data-ocid": "service_category.retry_geo_button",
                    children: "Coba Lagi"
                  }
                )
              ]
            }
          ),
          geoPos && nursesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-3",
              "data-ocid": "service_category.providers_loading_state",
              children: [
                [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-28 rounded-2xl animate-pulse",
                    style: { background: "rgba(45,106,79,0.06)" }
                  },
                  i
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-center text-sm",
                    style: { color: "#5a7a68" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 14, className: "inline mr-1" }),
                      "Mencari provider di sekitar Anda..."
                    ]
                  }
                )
              ]
            }
          ),
          geoPos && !nursesLoading && (!nearbyNurses || nearbyNurses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center text-center py-16 rounded-2xl",
              style: {
                background: "rgba(45,106,79,0.03)",
                border: "1.5px solid rgba(45,106,79,0.1)"
              },
              "data-ocid": "service_category.no_providers_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: FRONTEND_CATEGORY_ICONS[cat] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-xl mb-2",
                    style: { color: "#1a3a2a" },
                    children: "Belum Ada Provider di Area Anda"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "#5a7a68" }, children: "Coba lagi nanti atau perluas radius pencarian Anda." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "mt-6 text-sm font-bold underline",
                    style: { color: "#2d6a4f" },
                    onClick: () => setStep("select_subservice"),
                    "data-ocid": "service_category.change_service_button",
                    children: "Ganti Jenis Layanan"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-4",
              "data-ocid": "service_category.provider_list",
              children: nearbyNurses.map((nurse, idx) => {
                const distKm = nurse.latitude !== void 0 && nurse.longitude !== void 0 && geoPos ? haversineKm(
                  geoPos.lat,
                  geoPos.lon,
                  nurse.latitude,
                  nurse.longitude
                ) : null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProviderCard,
                  {
                    idx,
                    name: nurse.name,
                    specialization: nurse.specialization,
                    experience: `${Number(nurse.experienceYears)} tahun`,
                    status: nurse.status === "verified" ? "ready" : "busy",
                    fee: null,
                    distance: distKm,
                    nightTime,
                    onBook: () => navigate({ to: "/login" })
                  },
                  nurse.principal.toString()
                );
              })
            }
          ))
        ] })
      ] })
    ] })
  ] }) });
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
  onBook
}) {
  const isReady = status === "ready";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-4 p-5 rounded-2xl",
      style: {
        background: "rgba(255,255,255,0.95)",
        border: "1.5px solid rgba(45,106,79,0.12)",
        boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      },
      "data-ocid": `service_category.provider_card.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl font-display",
            style: {
              background: isReady ? "linear-gradient(135deg, #1a3a2a, #2d6a4f)" : "rgba(160,160,160,0.15)",
              color: isReady ? "#c9a227" : "#9a9a9a"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "font-display font-bold text-lg truncate",
                style: { color: "#1a3a2a" },
                children: name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "shrink-0 text-xs font-bold px-2 py-0.5 rounded-full",
                style: {
                  background: isReady ? "rgba(45,106,79,0.12)" : "rgba(160,160,160,0.15)",
                  color: isReady ? "#1a5c38" : "#6a6a6a",
                  border: isReady ? "1px solid rgba(45,106,79,0.25)" : "1px solid rgba(160,160,160,0.25)"
                },
                children: isReady ? "● Siap" : "○ Tidak Tersedia"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm mb-2", style: { color: "#5a7a68" }, children: [
            specialization,
            " · ",
            experience,
            " pengalaman"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            distance !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1 text-sm font-semibold",
                style: { color: "#2d6a4f" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
                  distance.toFixed(1),
                  " km dari lokasi Anda"
                ]
              }
            ),
            fee !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "flex items-center gap-1 text-sm font-semibold",
                style: { color: "#1a3a2a" },
                children: fee
              }
            ),
            distance !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs px-2 py-0.5 rounded-full",
                style: { background: "rgba(45,106,79,0.07)", color: "#3a6a52" },
                children: [
                  "+ Rp ",
                  (distance * 5e3).toLocaleString("id-ID"),
                  " transport"
                ]
              }
            ),
            nightTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                style: { background: "rgba(100,60,200,0.08)", color: "#4a1a9a" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 11 }),
                  " Tarif malam +20%"
                ]
              }
            )
          ] })
        ] }),
        isReady && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: onBook,
              className: "font-bold whitespace-nowrap",
              style: {
                background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
                color: "#ffffff",
                border: "none",
                boxShadow: "0 2px 8px rgba(45,106,79,0.3)"
              },
              "data-ocid": `service_category.book_button.${idx + 1}`,
              children: [
                "Pesan ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ]
            }
          ),
          distance !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-0.5 justify-center mt-1.5 text-xs",
              style: { color: "#8a9a8a" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "~",
                  Math.round(distance * 3 + 5),
                  " mnt"
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ServiceCategoryPage as default
};
