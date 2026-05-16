import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BMCDcUtm.js";
import { L as Layout, S as Stethoscope, X, C as ChevronRight, b as CalendarDays } from "./Layout-Cy_f-yyM.js";
import { c as useListServices, d as useCreateBooking, e as useEstimateCost } from "./useQueries-BxlisRyi.js";
import { F as FRONTEND_CATEGORY_ICONS, a as FRONTEND_CATEGORY_LABELS, L as LOCATION_BASED_CATEGORIES, C as CONSULTATION_ONLY_CATEGORIES, S as SERVICE_CATEGORY_ICONS, c as SERVICE_CATEGORY_LABELS } from "./types-Bf0oF2PP.js";
import { u as ue } from "./index-g5sDzu5o.js";
import { M as MapPin } from "./map-pin-kXgV3Eib.js";
import { c as createLucideIcon } from "./createLucideIcon-BGQG7qVG.js";
import { C as CircleAlert } from "./circle-alert-Dsej9Y-r.js";
import { C as Clock } from "./clock-e-lcE8W6.js";
import { F as FileText } from "./file-text-CzL7cQC8.js";
import { C as CircleCheck } from "./circle-check-nmm9i2XG.js";
import { C as CircleX } from "./circle-x-CZtuRZNr.js";
import "./backend-wp3yap7s.js";
import "./clipboard-list-BEaON99x.js";
import "./useMutation-VSVpIFXH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
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
  "20:00"
];
const ALL_FRONTEND_CATEGORIES = [
  "dokter",
  "perawat",
  "bidan",
  "fisioterapi",
  "ambulans",
  "apotek"
];
const SUB_SERVICE_OPTIONS = {
  dokter: [
    {
      label: "Konsultasi Umum",
      desc: "Keluhan kesehatan sehari-hari, cek kondisi umum",
      icon: "🩺"
    },
    {
      label: "Konsultasi Spesialis",
      desc: "Jantung, paru, saraf, dan spesialisasi lainnya",
      icon: "🫀"
    },
    {
      label: "Konsultasi Online",
      desc: "Video call dengan dokter berpengalaman",
      icon: "💻"
    }
  ],
  perawat: [
    {
      label: "Perawatan Lansia",
      desc: "Pendampingan dan perawatan harian untuk lansia",
      icon: "👴"
    },
    {
      label: "Perawatan Luka",
      desc: "Ganti balut, perawatan luka operasi dan kronik",
      icon: "🩹"
    },
    {
      label: "Perawatan Pasca Operasi",
      desc: "Pemantauan kondisi dan perawatan pasca bedah",
      icon: "🏥"
    },
    {
      label: "Perawatan Bayi",
      desc: "Perawatan bayi baru lahir dan anak kecil",
      icon: "👶"
    }
  ],
  bidan: [
    {
      label: "Pemeriksaan Kehamilan",
      desc: "ANC terpadu, USG, dan pantau tumbuh kembang janin",
      icon: "🤰"
    },
    {
      label: "Persalinan Rumah",
      desc: "Pendampingan persalinan normal di rumah",
      icon: "🏠"
    },
    {
      label: "Perawatan Nifas",
      desc: "Perawatan ibu dan bayi setelah melahirkan",
      icon: "🤱"
    },
    {
      label: "Imunisasi Bayi",
      desc: "Vaksinasi lengkap sesuai jadwal Kemenkes",
      icon: "💉"
    }
  ],
  fisioterapi: [
    {
      label: "Fisioterapi Umum",
      desc: "Nyeri otot, sendi, dan gangguan gerak umum",
      icon: "💪"
    },
    {
      label: "Fisioterapi Stroke",
      desc: "Pemulihan gerak pasca stroke dan trauma otak",
      icon: "🧠"
    },
    {
      label: "Fisioterapi Ortopedi",
      desc: "Pasca operasi tulang, patah tulang, sendi",
      icon: "🦴"
    },
    {
      label: "Fisioterapi Pediatri",
      desc: "Terapi tumbuh kembang anak, CP, keterlambatan",
      icon: "🧒"
    }
  ],
  ambulans: [
    {
      label: "Ambulans Transport",
      desc: "Antar jemput pasien rawat inap atau rujukan",
      icon: "🚗"
    },
    {
      label: "Ambulans Gawat Darurat",
      desc: "Respons cepat kondisi darurat, dilengkapi ALS",
      icon: "🚨"
    },
    {
      label: "Ambulans Jenazah",
      desc: "Transportasi jenazah dengan penanganan khusus",
      icon: "🕯️"
    }
  ],
  apotek: [
    {
      label: "Antar Obat Resep",
      desc: "Obat dengan resep dokter diantar ke rumah Anda",
      icon: "📋"
    },
    {
      label: "Obat Bebas & Vitamin",
      desc: "Suplemen, vitamin, dan obat tanpa resep",
      icon: "💊"
    },
    {
      label: "Alat Kesehatan",
      desc: "Tensimeter, glukometer, nebulizer, dan lainnya",
      icon: "🩺"
    },
    {
      label: "Konsultasi Apoteker",
      desc: "Tanya dosis, efek samping, dan interaksi obat",
      icon: "💬"
    }
  ]
};
function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value));
}
function getTodayDate() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function isNightTime(time) {
  const hour = Number.parseInt(time.split(":")[0]);
  return hour >= 18 || hour < 6;
}
function isApotekOpen() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  return hour >= 8 && hour < 22;
}
function mapFrontendToBackendCategory(cat) {
  const mapping = {
    dokter: "physiotherapy",
    perawat: "elderlycare",
    bidan: "woundcare",
    fisioterapi: "physiotherapy",
    ambulans: "ambulance",
    apotek: "postopcare"
  };
  return mapping[cat];
}
function SubServiceSelectionModal({
  category,
  isOpen,
  onClose,
  onSelectSubService
}) {
  if (!isOpen) return null;
  const options = SUB_SERVICE_OPTIONS[category];
  const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "data-ocid": "subservice.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Tutup"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-6 py-5 flex items-start justify-between",
              style: {
                background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: FRONTEND_CATEGORY_ICONS[category] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white", children: FRONTEND_CATEGORY_LABELS[category] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mt-0.5", children: isConsultOnly ? "Pilih jenis konsultasi" : "Pilih jenis layanan yang Anda butuhkan" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white",
                    "aria-label": "Tutup",
                    "data-ocid": "subservice.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-3", children: options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSelectSubService(opt.label),
              className: "w-full text-left p-4 rounded-2xl bg-white border transition-all duration-200 hover:shadow-md hover:border-green-300 group",
              style: { borderColor: "rgba(26,92,58,0.15)" },
              "data-ocid": `subservice.option.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
                    style: { background: "rgba(26,92,58,0.08)" },
                    children: opt.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-bold text-base",
                      style: { color: "#0d2b1e" },
                      children: opt.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 mt-0.5 leading-snug", children: opt.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: 18,
                    className: "shrink-0 text-gray-300 group-hover:text-green-600 transition-colors"
                  }
                )
              ] })
            },
            opt.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-full py-3.5 rounded-2xl text-base font-semibold border-2 transition-colors",
              style: { borderColor: "rgba(26,92,58,0.2)", color: "#1a5c3a" },
              "data-ocid": "subservice.cancel_button",
              children: "Kembali"
            }
          ) })
        ] })
      ]
    }
  );
}
function generateMockProviders(category, subService) {
  const names = {
    perawat: [
      "Ns. Sari Dewi, S.Kep",
      "Ns. Budi Santoso, S.Kep",
      "Ns. Ayu Pertiwi, S.Kep",
      "Ns. Rina Kusuma, S.Kep"
    ],
    bidan: [
      "Bd. Wulandari, S.Tr.Keb",
      "Bd. Fitri Handayani, S.Tr.Keb",
      "Bd. Nurul Hidayah, S.Tr.Keb"
    ],
    fisioterapi: [
      "Ft. Ahmad Fauzi, S.Ft",
      "Ft. Dewi Rahayu, S.Ft",
      "Ft. Hendra Wijaya, S.Ft"
    ],
    ambulans: [
      "Unit AMB-001 — RS Medika",
      "Unit AMB-002 — Klinik Sehat",
      "Unit AMB-003 — PMI Kota"
    ],
    apotek: [
      "Apotek Kimia Farma 24",
      "Apotek Guardian Raya",
      "Apotek K24 Sejahtera",
      "Apotek Sehat Abadi"
    ],
    dokter: ["dr. Budi Santoso, SpPD"]
  };
  const fees = {
    perawat: BigInt(15e4),
    bidan: BigInt(2e5),
    fisioterapi: BigInt(18e4),
    ambulans: BigInt(5e5),
    apotek: BigInt(0),
    dokter: BigInt(1e5)
  };
  return (names[category] ?? []).map((name, i) => ({
    id: i + 1,
    name,
    subService,
    distanceKm: Number(((i + 1) * 1.3 + 0.7).toFixed(1)),
    baseFee: fees[category],
    isAvailable: i % 3 !== 2,
    // 2 out of 3 available
    rating: 4.5 - i * 0.1,
    experience: `${3 + i * 2} tahun pengalaman`
  }));
}
function NearbyProvidersModal({
  category,
  subService,
  services,
  onClose,
  onBook
}) {
  const [searching, setSearching] = reactExports.useState(true);
  const [location, setLocation] = reactExports.useState(
    null
  );
  const [locationError, setLocationError] = reactExports.useState(null);
  const [providers, setProviders] = reactExports.useState([]);
  const perKmRate = BigInt(5e3);
  reactExports.useEffect(() => {
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
          "Gagal mendapatkan lokasi. Menampilkan provider terdekat."
        );
        setSearching(false);
        setProviders(generateMockProviders(category, subService));
      }
    );
  }, [category, subService]);
  const mappedBackend = mapFrontendToBackendCategory(category);
  const matchedService = services.find((s) => s.category === mappedBackend) ?? null;
  function getStatusBadge(provider) {
    if (category === "apotek") {
      const open = isApotekOpen();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
          style: open ? { background: "rgba(22,163,74,0.12)", color: "#15803d" } : { background: "rgba(220,38,38,0.1)", color: "#dc2626" },
          children: [
            open ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
            open ? "Buka" : "Tutup"
          ]
        }
      );
    }
    if (category === "ambulans") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
          style: provider.isAvailable ? { background: "rgba(22,163,74,0.12)", color: "#15803d" } : { background: "rgba(148,163,184,0.2)", color: "#64748b" },
          children: [
            provider.isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
            provider.isAvailable ? "Siaga" : "Tidak Tersedia"
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
        style: provider.isAvailable ? { background: "rgba(22,163,74,0.12)", color: "#15803d" } : { background: "rgba(148,163,184,0.2)", color: "#64748b" },
        children: [
          provider.isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
          provider.isAvailable ? "Tersedia" : "Tidak Tersedia"
        ]
      }
    );
  }
  function calcTotalFee(provider) {
    const transport = perKmRate * BigInt(Math.round(provider.distanceKm));
    const total = provider.baseFee + transport;
    return formatRupiah(total);
  }
  function isProviderActive(provider) {
    if (category === "apotek") return isApotekOpen();
    return provider.isAvailable;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "data-ocid": "nearby.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Tutup"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-6 py-5 flex items-start justify-between",
              style: {
                background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: FRONTEND_CATEGORY_ICONS[category] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white", children: subService }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm mt-0.5", children: [
                    FRONTEND_CATEGORY_LABELS[category],
                    " · Radius 20 km"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white",
                    "aria-label": "Tutup",
                    "data-ocid": "nearby.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-5 space-y-4", children: [
            searching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-4 rounded-2xl",
                style: {
                  background: "rgba(26,92,58,0.06)",
                  border: "1px solid rgba(26,92,58,0.15)"
                },
                "data-ocid": "nearby.location_loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LoaderCircle,
                    {
                      size: 20,
                      className: "animate-spin",
                      style: { color: "#1a5c3a" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-semibold text-sm",
                        style: { color: "#0d2b1e" },
                        children: "Mendeteksi Lokasi GPS"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Mohon izinkan akses lokasi Anda" })
                  ] })
                ]
              }
            ) : location ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-4 rounded-2xl",
                style: {
                  background: "rgba(26,92,58,0.06)",
                  border: "1px solid rgba(26,92,58,0.18)"
                },
                "data-ocid": "nearby.location_found",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, style: { color: "#1a5c3a" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-semibold text-sm",
                        style: { color: "#0d2b1e" },
                        children: "Lokasi Terdeteksi"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400", children: [
                      location.lat.toFixed(4),
                      ", ",
                      location.lon.toFixed(4),
                      " · Menampilkan dalam 20 km"
                    ] })
                  ] })
                ]
              }
            ) : locationError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-4 rounded-2xl",
                style: {
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.2)"
                },
                "data-ocid": "nearby.location_error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, className: "text-yellow-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-yellow-700", children: locationError })
                ]
              }
            ) : null,
            !searching && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h3",
                  {
                    className: "font-bold text-base",
                    style: { color: "#0d2b1e" },
                    children: [
                      providers.length,
                      " Provider Ditemukan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Diurutkan berdasarkan jarak" })
              ] }),
              providers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-12 rounded-2xl",
                  style: {
                    background: "rgba(26,92,58,0.04)",
                    border: "1px dashed rgba(26,92,58,0.2)"
                  },
                  "data-ocid": "nearby.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: FRONTEND_CATEGORY_ICONS[category] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-semibold text-sm",
                        style: { color: "#0d2b1e" },
                        children: "Tidak ada provider tersedia di area Anda"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Coba perluas radius atau hubungi admin" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: providers.slice(0, 10).map((provider, idx) => {
                const active = isProviderActive(provider);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-white rounded-2xl p-4 border transition-all duration-200",
                    style: {
                      borderColor: active ? "rgba(26,92,58,0.18)" : "rgba(148,163,184,0.2)"
                    },
                    "data-ocid": `nearby.provider.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold text-white",
                            style: {
                              background: active ? "linear-gradient(135deg,#1a5c3a,#2d8a5e)" : "#94a3b8"
                            },
                            children: FRONTEND_CATEGORY_ICONS[category]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "font-bold text-sm truncate",
                                  style: { color: "#0d2b1e" },
                                  children: provider.name
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mt-0.5", children: provider.experience })
                            ] }),
                            getStatusBadge(provider)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-400", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
                              provider.distanceKm,
                              " km"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-xs font-semibold",
                                style: { color: "#1a5c3a" },
                                children: category === "apotek" ? "Gratis ongkir" : calcTotalFee(provider)
                              }
                            )
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          disabled: !active,
                          onClick: () => onBook(provider, matchedService),
                          className: "w-full mt-3 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                          style: {
                            background: active ? "linear-gradient(135deg,#1a5c3a,#2d8a5e)" : "#94a3b8"
                          },
                          "data-ocid": `nearby.book_button.${idx + 1}`,
                          children: active ? category === "apotek" ? "Pesan Sekarang" : "Pesan Sekarang" : "Tidak Tersedia"
                        }
                      )
                    ]
                  },
                  provider.id
                );
              }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function DoctorConsultationModal({
  consultationType,
  services,
  onClose
}) {
  const [date, setDate] = reactExports.useState(getTodayDate());
  const [time, setTime] = reactExports.useState("09:00");
  const [notes, setNotes] = reactExports.useState("");
  const createBooking = useCreateBooking();
  const docService = services.find((s) => s.category === "physiotherapy") ?? null;
  const baseFee = (docService == null ? void 0 : docService.baseFeeIdr) ?? BigInt(15e4);
  const { data: estimatedCost } = useEstimateCost(
    (docService == null ? void 0 : docService.id) ?? BigInt(0),
    0,
    isNightTime(time),
    false
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking.mutateAsync({
        serviceId: (docService == null ? void 0 : docService.id) ?? BigInt(1),
        scheduledDate: date,
        scheduledTime: time,
        latitude: 0,
        longitude: 0,
        notes: `[${consultationType}] ${notes}`
      });
      ue.success(
        "Konsultasi berhasil dijadwalkan! Menunggu konfirmasi dokter."
      );
      onClose();
    } catch {
      ue.error("Gagal menjadwalkan konsultasi. Silakan coba lagi.");
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
    "20:00"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4",
      "data-ocid": "doctor.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Tutup"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-6 py-5 flex items-start justify-between",
              style: {
                background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: "👨‍⚕️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white", children: "Jadwalkan Konsultasi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm mt-0.5", children: [
                    consultationType,
                    " · Tanpa Kunjungan Fisik"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white",
                    "aria-label": "Tutup",
                    "data-ocid": "doctor.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex-1 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-4 rounded-2xl",
                  style: {
                    background: "rgba(37,99,235,0.06)",
                    border: "1px solid rgba(37,99,235,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 20, style: { color: "#2563eb" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-semibold text-sm",
                          style: { color: "#1e3a5f" },
                          children: "Jenis Konsultasi"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-base font-bold",
                          style: { color: "#2563eb" },
                          children: consultationType
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "doc-date",
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 18, style: { color: "#1a5c3a" } }),
                      " Tanggal Konsultasi"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "doc-date",
                    type: "date",
                    value: date,
                    min: getTodayDate(),
                    onChange: (e) => setDate(e.target.value),
                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2",
                    style: { "--tw-ring-color": "#1a5c3a" },
                    required: true,
                    "data-ocid": "doctor.date_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, style: { color: "#1a5c3a" } }),
                      " Jam Konsultasi"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-5 gap-2", children: CONSULT_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTime(slot),
                    className: "py-2.5 rounded-xl text-sm font-semibold transition-all border",
                    style: time === slot ? {
                      background: "#1a5c3a",
                      color: "#fff",
                      borderColor: "#1a5c3a"
                    } : {
                      background: "#fff",
                      color: "#374151",
                      borderColor: "#e5e7eb"
                    },
                    "data-ocid": `doctor.time_slot.${slot.replace(":", "")}`,
                    children: slot
                  },
                  slot
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "doc-notes",
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, style: { color: "#1a5c3a" } }),
                      " Keluhan / Catatan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "doc-notes",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    rows: 3,
                    placeholder: "Ceritakan keluhan atau pertanyaan Anda secara singkat...",
                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none resize-none",
                    "data-ocid": "doctor.notes_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl px-5 py-4 border",
                  style: {
                    background: "rgba(37,99,235,0.04)",
                    borderColor: "rgba(37,99,235,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-gray-400 mb-1", children: "Estimasi Biaya Konsultasi" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-2xl font-display font-bold",
                        style: { color: "#2563eb" },
                        children: formatRupiah(estimatedCost ?? baseFee)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mt-1", children: "Biaya sudah termasuk konsultasi online" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-2 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 py-4 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors",
                  "data-ocid": "doctor.cancel_button",
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: createBooking.isPending,
                  className: "flex-[2] py-4 rounded-xl text-base font-bold text-white disabled:opacity-50 transition-colors",
                  style: { background: "#2563eb" },
                  "data-ocid": "doctor.submit_button",
                  children: createBooking.isPending ? "Memproses..." : "Jadwalkan Konsultasi"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ProviderBookingModal({
  provider,
  category,
  service,
  onClose
}) {
  const [date, setDate] = reactExports.useState(getTodayDate());
  const [time, setTime] = reactExports.useState("09:00");
  const [notes, setNotes] = reactExports.useState("");
  const createBooking = useCreateBooking();
  const perKmRate = BigInt(5e3);
  const transportFee = perKmRate * BigInt(Math.round(provider.distanceKm));
  const totalFee = provider.baseFee + transportFee;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking.mutateAsync({
        serviceId: (service == null ? void 0 : service.id) ?? BigInt(1),
        scheduledDate: date,
        scheduledTime: time,
        latitude: 0,
        longitude: 0,
        notes: `[Provider: ${provider.name}] ${notes}`
      });
      ue.success("Pesanan berhasil dibuat! Menunggu konfirmasi.");
      onClose();
    } catch {
      ue.error("Gagal membuat pesanan. Silakan coba lagi.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4",
      "data-ocid": "booking.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Tutup"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-6 py-5 flex items-start justify-between",
              style: {
                background: "linear-gradient(135deg, #0d2b1e 0%, #1a5c3a 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: FRONTEND_CATEGORY_ICONS[category] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white", children: provider.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm mt-0.5", children: [
                    provider.subService,
                    " · ",
                    provider.distanceKm,
                    " km dari lokasi Anda"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-xl hover:bg-white/20 transition-colors mt-1 text-white",
                    "aria-label": "Tutup",
                    "data-ocid": "booking.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex-1 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-4 rounded-2xl",
                  style: {
                    background: "rgba(26,92,58,0.06)",
                    border: "1px solid rgba(26,92,58,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white shrink-0",
                        style: {
                          background: "linear-gradient(135deg,#1a5c3a,#2d8a5e)"
                        },
                        children: FRONTEND_CATEGORY_ICONS[category]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", style: { color: "#0d2b1e" }, children: provider.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400", children: [
                        provider.experience,
                        " · ⭐ ",
                        provider.rating.toFixed(1)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                        style: { background: "rgba(22,163,74,0.12)", color: "#15803d" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                          " Tersedia"
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "prov-date",
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 18, style: { color: "#1a5c3a" } }),
                      " Tanggal Kunjungan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "prov-date",
                    type: "date",
                    value: date,
                    min: getTodayDate(),
                    onChange: (e) => setDate(e.target.value),
                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none",
                    required: true,
                    "data-ocid": "booking.date_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, style: { color: "#1a5c3a" } }),
                      " Jam Kunjungan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-5 gap-2", children: TIME_SLOTS.slice(0, 12).map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTime(slot),
                    className: "py-2.5 rounded-xl text-sm font-semibold transition-all border",
                    style: time === slot ? {
                      background: "#1a5c3a",
                      color: "#fff",
                      borderColor: "#1a5c3a"
                    } : {
                      background: "#fff",
                      color: "#374151",
                      borderColor: "#e5e7eb"
                    },
                    "data-ocid": `booking.time_slot.${slot.replace(":", "")}`,
                    children: slot
                  },
                  slot
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "prov-notes",
                    className: "flex items-center gap-2 text-base font-semibold mb-2",
                    style: { color: "#0d2b1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, style: { color: "#1a5c3a" } }),
                      " Catatan Tambahan"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "prov-notes",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    rows: 3,
                    placeholder: "Kondisi khusus, alergi, atau instruksi untuk provider...",
                    className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none resize-none",
                    "data-ocid": "booking.notes_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl px-5 py-4 border",
                  style: {
                    background: "rgba(26,92,58,0.04)",
                    borderColor: "rgba(26,92,58,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-gray-400 mb-3", children: "Rincian Biaya" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Biaya dasar layanan" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#0d2b1e" }, children: formatRupiah(provider.baseFee) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                          "Transportasi (",
                          provider.distanceKm,
                          " km × Rp5.000)"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#0d2b1e" }, children: formatRupiah(transportFee) })
                      ] }),
                      isNightTime(time) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-yellow-600", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Surcharge malam (18:00–06:00)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "+20%" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-gray-100", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: "#0d2b1e" }, children: "Total Estimasi" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-bold text-lg",
                            style: { color: "#1a5c3a" },
                            children: formatRupiah(totalFee)
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-2 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 py-4 rounded-xl text-base font-semibold border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors",
                  "data-ocid": "booking.cancel_button",
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: createBooking.isPending,
                  className: "flex-[2] py-4 rounded-xl text-base font-bold text-white disabled:opacity-50",
                  style: { background: "linear-gradient(135deg,#1a5c3a,#2d8a5e)" },
                  "data-ocid": "booking.submit_button",
                  children: createBooking.isPending ? "Memproses..." : "Pesan Sekarang"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function PatientServices() {
  const { data: services, isLoading } = useListServices();
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [subServiceCategory, setSubServiceCategory] = reactExports.useState(null);
  const [selectedSubService, setSelectedSubService] = reactExports.useState(
    null
  );
  const [showDoctorModal, setShowDoctorModal] = reactExports.useState(false);
  const [doctorConsultType, setDoctorConsultType] = reactExports.useState("");
  const [showNearby, setShowNearby] = reactExports.useState(false);
  const [bookingProvider, setBookingProvider] = reactExports.useState(
    null
  );
  const [bookingService, setBookingService] = reactExports.useState(null);
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSubServiceCategory(cat);
  };
  const handleSubServiceSelect = (subService) => {
    setSubServiceCategory(null);
    setSelectedSubService(subService);
    if (activeCategory === "dokter") {
      setDoctorConsultType(subService);
      setShowDoctorModal(true);
    } else {
      setShowNearby(true);
    }
  };
  const handleProviderBook = (provider, svc) => {
    setShowNearby(false);
    setBookingProvider(provider);
    setBookingService(svc);
  };
  reactExports.useCallback(() => {
    setSubServiceCategory(null);
    setSelectedSubService(null);
    setShowDoctorModal(false);
    setDoctorConsultType("");
    setShowNearby(false);
    setBookingProvider(null);
    setBookingService(null);
  }, []);
  const filtered = activeCategory === "all" ? services ?? [] : (services == null ? void 0 : services.filter(
    (s) => s.category === mapFrontendToBackendCategory(activeCategory)
  )) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display text-3xl font-bold",
            style: { color: "#0d2b1e" },
            children: "Pilih Layanan"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-lg mt-1", children: "Klik kategori untuk mulai mencari layanan kesehatan di sekitar Anda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", "data-ocid": "services.category_filter", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-3", children: ALL_FRONTEND_CATEGORIES.map((cat) => {
          const isConsultOnly = CONSULTATION_ONLY_CATEGORIES.includes(cat);
          const isActive = activeCategory === cat;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryClick(cat),
              className: "flex flex-col items-center gap-2 p-4 rounded-2xl text-sm font-semibold transition-all duration-200 border hover:shadow-md",
              style: isActive ? {
                background: "linear-gradient(135deg, #0d2b1e, #1a5c3a)",
                borderColor: "transparent",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(26,92,58,0.3)"
              } : {
                background: "#fff",
                borderColor: "rgba(26,92,58,0.15)",
                color: "#374151"
              },
              "data-ocid": `services.filter.${cat}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: FRONTEND_CATEGORY_ICONS[cat] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs leading-tight text-center font-bold", children: FRONTEND_CATEGORY_LABELS[cat] }),
                isConsultOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] px-2 py-0.5 rounded-full font-bold",
                    style: isActive ? {
                      background: "rgba(201,162,39,0.3)",
                      color: "#f0d060"
                    } : {
                      background: "rgba(201,162,39,0.12)",
                      color: "#7a6218"
                    },
                    children: "Konsultasi"
                  }
                ),
                LOCATION_BASED_CATEGORIES.includes(cat) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] px-2 py-0.5 rounded-full font-bold",
                    style: isActive ? {
                      background: "rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.9)"
                    } : {
                      background: "rgba(26,92,58,0.08)",
                      color: "#1a5c3a"
                    },
                    children: "📍 Terdekat"
                  }
                )
              ]
            },
            cat
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveCategory("all"),
            className: "mt-3 px-5 py-2 rounded-full text-sm font-semibold transition-all border",
            style: activeCategory === "all" ? {
              background: "#1a5c3a",
              color: "#fff",
              borderColor: "#1a5c3a"
            } : {
              background: "#fff",
              color: "#374151",
              borderColor: "rgba(26,92,58,0.2)"
            },
            "data-ocid": "services.filter.all",
            children: "Semua Layanan"
          }
        )
      ] }),
      activeCategory !== "all" && LOCATION_BASED_CATEGORIES.includes(
        activeCategory
      ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 p-4 rounded-2xl flex items-center gap-3",
          style: {
            background: "rgba(26,92,58,0.06)",
            border: "1px solid rgba(26,92,58,0.18)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 20, style: { color: "#1a5c3a" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-semibold text-sm",
                  style: { color: "#0d2b1e" },
                  children: "Layanan Berbasis Lokasi"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400", children: [
                "Klik tombol di bawah atau klik kartu layanan untuk mencari",
                " ",
                FRONTEND_CATEGORY_LABELS[activeCategory],
                " ",
                "terdekat"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleCategoryClick(activeCategory),
                className: "shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors",
                style: { background: "#1a5c3a" },
                "data-ocid": "services.find_nearby_button",
                children: "Cari Terdekat"
              }
            )
          ]
        }
      ),
      activeCategory !== "all" && CONSULTATION_ONLY_CATEGORIES.includes(
        activeCategory
      ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 p-4 rounded-2xl flex items-center gap-3",
          style: {
            background: "rgba(37,99,235,0.06)",
            border: "1px solid rgba(37,99,235,0.15)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 20, style: { color: "#2563eb" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-semibold text-sm",
                  style: { color: "#1e3a5f" },
                  children: "Layanan Konsultasi"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "Dokter tersedia untuk konsultasi online — tidak memerlukan kunjungan fisik" })
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-20",
          "data-ocid": "services.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat layanan..." })
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 rounded-3xl",
          style: {
            background: "rgba(26,92,58,0.04)",
            border: "1px dashed rgba(26,92,58,0.2)"
          },
          "data-ocid": "services.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: activeCategory !== "all" ? FRONTEND_CATEGORY_ICONS[activeCategory] : "🏥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold", style: { color: "#0d2b1e" }, children: "Belum ada layanan tersedia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mt-2", children: "Coba pilih kategori lain atau hubungi admin" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
          "data-ocid": "services.list",
          children: filtered.map((service, idx) => {
            const isDocCat = activeCategory === "dokter";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col",
                style: { borderColor: "rgba(26,92,58,0.15)" },
                "data-ocid": `services.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-6 py-5 flex items-center gap-4",
                      style: { background: "rgba(26,92,58,0.05)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: SERVICE_CATEGORY_ICONS[service.category] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h3",
                            {
                              className: "font-display text-xl font-bold leading-tight",
                              style: { color: "#0d2b1e" },
                              children: service.name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-sm font-medium",
                              style: { color: "#1a5c3a" },
                              children: SERVICE_CATEGORY_LABELS[service.category]
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 flex-1 flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-400 leading-relaxed", children: service.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Mulai dari" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-display text-2xl font-bold",
                          style: { color: "#1a5c3a" },
                          children: formatRupiah(service.baseFeeIdr)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleCategoryClick(
                          activeCategory === "all" ? "perawat" : activeCategory
                        ),
                        className: "w-full py-4 text-white rounded-2xl text-lg font-bold hover:opacity-90 transition-colors shadow-md",
                        style: {
                          background: "linear-gradient(135deg, #0d2b1e, #1a5c3a)"
                        },
                        "data-ocid": `services.book_button.${idx + 1}`,
                        children: isDocCat ? "Konsultasi Sekarang" : "Pesan Sekarang"
                      }
                    )
                  ] })
                ]
              },
              service.id.toString()
            );
          })
        }
      )
    ] }) }),
    subServiceCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubServiceSelectionModal,
      {
        category: subServiceCategory,
        isOpen: !!subServiceCategory,
        onClose: () => setSubServiceCategory(null),
        onSelectSubService: handleSubServiceSelect
      }
    ),
    showNearby && selectedSubService && activeCategory !== "all" && LOCATION_BASED_CATEGORIES.includes(
      activeCategory
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      NearbyProvidersModal,
      {
        category: activeCategory,
        subService: selectedSubService,
        services: services ?? [],
        onClose: () => {
          setShowNearby(false);
          setSelectedSubService(null);
        },
        onBook: handleProviderBook
      }
    ),
    showDoctorModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorConsultationModal,
      {
        consultationType: doctorConsultType,
        services: services ?? [],
        onClose: () => {
          setShowDoctorModal(false);
          setDoctorConsultType("");
          setSelectedSubService(null);
        }
      }
    ),
    bookingProvider && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProviderBookingModal,
      {
        provider: bookingProvider,
        category: activeCategory !== "all" ? activeCategory : "perawat",
        service: bookingService,
        onClose: () => {
          setBookingProvider(null);
          setBookingService(null);
        }
      }
    )
  ] });
}
export {
  PatientServices as default
};
