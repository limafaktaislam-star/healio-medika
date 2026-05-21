import { r as reactExports, j as jsxRuntimeExports } from "./index-CogN6nIg.js";
import { L as Layout } from "./Layout-C44wxXLx.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { m as usePharmacyDrugs } from "./useQueries-BuxrTd_z.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { X } from "./x-C_WyrZk7.js";
import { S as Search } from "./search-C03IfKeY.js";
import { M as MapPin } from "./map-pin-B_SUbVCQ.js";
import { P as Phone } from "./phone-BcGg51s1.js";
import "./book-open-m2vho86p.js";
import "./chevron-right-RA5MdHLM.js";
import "./user-check-Ds2Iu5HR.js";
import "./clipboard-list-LxFpA4sE.js";
import "./activity-DtATimKh.js";
import "./settings-DfRA-wpg.js";
import "./trending-up-BLZ5FWDy.js";
import "./package-nWSI2ZDW.js";
import "./file-text-DNsP0kT1.js";
import "./useMutation-CzdLgPbW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
];
const Pill = createLucideIcon("pill", __iconNode);
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const PHARMACIES = [
  {
    id: 1,
    name: "Apotek Healio Medika – Cabang Utama",
    address: "Jl. Sudirman No. 12, Menteng, Jakarta Pusat",
    phone: "+6221-555-0101",
    openHour: 7,
    closeHour: 22,
    lat: -6.2088,
    lng: 106.8456
  },
  {
    id: 2,
    name: "Apotek Healio Medika – Cabang Kebon Jeruk",
    address: "Jl. Raya Kebon Jeruk No. 45, Jakarta Barat",
    phone: "+6221-555-0202",
    openHour: 8,
    closeHour: 21,
    lat: -6.1947,
    lng: 106.7756
  },
  {
    id: 3,
    name: "Apotek Mitra Sehat Surabaya",
    address: "Jl. Pemuda No. 78, Genteng, Surabaya",
    phone: "+6231-555-0303",
    openHour: 7,
    closeHour: 22,
    lat: -7.2575,
    lng: 112.7521
  },
  {
    id: 4,
    name: "Apotek Farma Plus – Bandung",
    address: "Jl. Asia Afrika No. 31, Sumur Bandung, Bandung",
    phone: "+6222-555-0404",
    openHour: 8,
    closeHour: 20,
    lat: -6.9175,
    lng: 107.6191
  },
  {
    id: 5,
    name: "Apotek Kimia Farma – Yogyakarta",
    address: "Jl. Malioboro No. 60, Gedongtengen, Yogyakarta",
    phone: "+62274-555-0505",
    openHour: 7,
    closeHour: 23,
    lat: -7.7956,
    lng: 110.3695
  },
  {
    id: 6,
    name: "Apotek Sehat Medika – Medan",
    address: "Jl. Gatot Subroto No. 22, Medan Barat, Medan",
    phone: "+6261-555-0606",
    openHour: 8,
    closeHour: 21,
    lat: 3.5952,
    lng: 98.6722
  },
  {
    id: 7,
    name: "Apotek Guardian – Makassar",
    address: "Jl. Sam Ratulangi No. 90, Makassar Tengah, Makassar",
    phone: "+62411-555-0707",
    openHour: 9,
    closeHour: 21,
    lat: -5.1477,
    lng: 119.4328
  },
  {
    id: 8,
    name: "Apotek K-24 – Semarang",
    address: "Jl. Pandanaran No. 55, Semarang Tengah, Semarang",
    phone: "+6224-555-0808",
    openHour: 0,
    closeHour: 24,
    lat: -6.9667,
    lng: 110.4167
  },
  {
    id: 9,
    name: "Apotek Farmaplus – Bekasi",
    address: "Jl. Ahmad Yani No. 17, Bekasi Timur, Bekasi",
    phone: "+6221-555-0909",
    openHour: 7,
    closeHour: 22,
    lat: -6.2349,
    lng: 107.0004
  },
  {
    id: 10,
    name: "Apotek Anugrah Sehat – Depok",
    address: "Jl. Margonda Raya No. 120, Beji, Depok",
    phone: "+6221-555-1010",
    openHour: 8,
    closeHour: 21,
    lat: -6.3797,
    lng: 106.8227
  }
];
const RADIUS_OPTIONS = [1, 3, 5, 20];
function ApotekPage() {
  const [userLat, setUserLat] = reactExports.useState(null);
  const [userLng, setUserLng] = reactExports.useState(null);
  const [geoStatus, setGeoStatus] = reactExports.useState("idle");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedRadius, setSelectedRadius] = reactExports.useState(20);
  const [selectedPharmacyId, setSelectedPharmacyId] = reactExports.useState(
    null
  );
  const { data: drugs = [], isLoading: drugsLoading } = usePharmacyDrugs(
    selectedPharmacyId !== null ? BigInt(selectedPharmacyId) : null
  );
  reactExports.useEffect(() => {
    requestLocation();
  }, []);
  function requestLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setGeoStatus("granted");
      },
      () => {
        setGeoStatus("denied");
      },
      { timeout: 1e4, enableHighAccuracy: true }
    );
  }
  const currentHour = (/* @__PURE__ */ new Date()).getHours();
  const pharmaciesWithData = reactExports.useMemo(() => {
    return PHARMACIES.map((p) => {
      const isOpen = p.closeHour === 24 ? true : currentHour >= p.openHour && currentHour < p.closeHour;
      const distance = userLat !== null && userLng !== null ? calculateDistance(userLat, userLng, p.lat, p.lng) : null;
      return { ...p, isOpen, distance };
    });
  }, [userLat, userLng, currentHour]);
  const filteredPharmacies = reactExports.useMemo(() => {
    let list = [...pharmaciesWithData];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
      );
    }
    if (userLat !== null && userLng !== null) {
      list = list.filter(
        (p) => p.distance !== null && p.distance <= selectedRadius
      );
    }
    if (userLat !== null) {
      list.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }
    return list;
  }, [pharmaciesWithData, searchQuery, selectedRadius, userLat, userLng]);
  function handleDirections(pharmacy) {
    const origin = userLat !== null && userLng !== null ? `${userLat},${userLng}` : "";
    const dest = `${pharmacy.lat},${pharmacy.lng}`;
    const url = origin ? `https://www.google.com/maps/dir/?api=1&destination=${dest}&origin=${origin}` : `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    window.open(url, "_blank");
  }
  const mapCenter = userLat !== null && userLng !== null ? `${userLat},${userLng}` : "-6.2088,106.8456";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary-foreground/20 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Apotek Terdekat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm", children: "Temukan apotek mitra Healio Medika di sekitar Anda" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 space-y-5", children: [
      geoStatus === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "apotek.loading_state",
          className: "flex items-center gap-2 p-3 bg-muted rounded-lg text-muted-foreground text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
            "Mendeteksi lokasi Anda..."
          ]
        }
      ),
      geoStatus === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "apotek.error_state",
          className: "flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm", children: "Aktifkan lokasi untuk melihat apotek terdekat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setGeoStatus("idle"),
                className: "text-destructive/60 hover:text-destructive",
                "aria-label": "Tutup pesan",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "apotek.search_input",
                className: "pl-9",
                placeholder: "Cari Apotek atau Kota...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "apotek.location_button",
              variant: "outline",
              className: "gap-2 shrink-0 border-primary text-primary hover:bg-primary/10",
              onClick: requestLocation,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Gunakan Lokasi Saya Saat Ini" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Lokasi Saya" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Radius:" }),
          RADIUS_OPTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `apotek.radius_${r}km`,
              onClick: () => setSelectedRadius(r),
              className: `px-3 py-1 rounded-full text-sm font-medium border transition-colors ${selectedRadius === r ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary hover:text-primary"}`,
              children: [
                r,
                " km"
              ]
            },
            r
          )),
          userLat === null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(Aktifkan lokasi untuk filter radius)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 space-y-4", children: filteredPharmacies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "apotek.empty_state",
            className: "text-center py-16 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Tidak ada apotek ditemukan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Coba perluas radius atau ubah kata pencarian" })
            ]
          }
        ) : filteredPharmacies.map((pharmacy, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `apotek.item.${idx + 1}`,
            className: "bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground leading-tight", children: pharmacy.name }),
                pharmacy.distance !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm whitespace-nowrap", children: [
                  pharmacy.distance < 1 ? `${Math.round(pharmacy.distance * 1e3)} m` : `${pharmacy.distance.toFixed(1)} km`,
                  " ",
                  "dari lokasi Anda"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs font-semibold ${pharmacy.isOpen ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`,
                    variant: "outline",
                    children: pharmacy.isOpen ? "● Buka" : "● Tutup"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: pharmacy.closeHour === 24 ? "Buka 24 jam" : `${String(pharmacy.openHour).padStart(2, "0")}.00 – ${String(pharmacy.closeHour).padStart(2, "0")}.00` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2 flex items-start gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: pharmacy.address })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `https://wa.me/${pharmacy.phone.replace(/[^0-9]/g, "")}`,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "hover:text-primary hover:underline transition-colors",
                    "data-ocid": `apotek.whatsapp_link.${idx + 1}`,
                    children: [
                      pharmacy.phone,
                      " (WhatsApp)"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    "data-ocid": `apotek.stok_button.${idx + 1}`,
                    className: "text-xs",
                    onClick: () => setSelectedPharmacyId(pharmacy.id),
                    children: "Lihat Stok Obat"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    "data-ocid": `apotek.directions_button.${idx + 1}`,
                    className: "gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90",
                    onClick: () => handleDirections(pharmacy),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5" }),
                      "Arahkan ke Lokasi"
                    ]
                  }
                )
              ] })
            ]
          },
          pharmacy.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block w-[40%] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 rounded-xl overflow-hidden border border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              title: "Peta Apotek Terdekat",
              width: "100%",
              height: "480",
              style: { border: 0 },
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              src: `https://maps.google.com/maps?q=${mapCenter}&z=13&output=embed`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Peta menunjukkan area sekitar lokasi Anda" }) })
        ] }) })
      ] })
    ] }),
    selectedPharmacyId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground", children: "Stok Obat Apotek" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedPharmacyId(null),
            className: "text-muted-foreground hover:text-foreground text-2xl leading-none",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto p-6", children: drugsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Memuat data obat..." }) : drugs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Data stok obat belum tersedia" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground border-b", children: "Nama Obat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground border-b", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground border-b", children: "Harga" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground border-b", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground border-b", children: "Jumlah" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: drugs.map((drug) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b hover:bg-muted/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: drug.drugName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: drug.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              }).format(Number(drug.priceIdr)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `px-2 py-1 rounded-full text-xs font-semibold ${drug.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
                  children: drug.available ? "Tersedia" : "Habis"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: Number(drug.quantity) })
            ]
          },
          drug.drugName
        )) })
      ] }) })
    ] }) })
  ] });
}
export {
  ApotekPage as default
};
