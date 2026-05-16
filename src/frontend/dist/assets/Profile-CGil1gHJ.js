import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-rLbxkppD.js";
import { L as Layout, A as Activity } from "./Layout-Dfx5-xPX.js";
import { a as useMyPatientProfile, g as useSavePatientProfile } from "./useQueries-B3x3TyHM.js";
import { u as ue } from "./index-DoX9CciY.js";
import { U as User } from "./user-CMoDdmFu.js";
import { c as createLucideIcon } from "./createLucideIcon-DLXihIFy.js";
import { H as Heart, P as Phone } from "./phone-DAkiWPWN.js";
import { M as MapPin } from "./map-pin-ChxPa4WB.js";
import "./backend-BPbwYxH1.js";
import "./clipboard-list-BB7PgJHk.js";
import "./useMutation-C7CqhDIx.js";
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
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
  "O-"
];
function FormField({
  label,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-base font-semibold text-foreground", children: [
      icon,
      label
    ] }),
    children
  ] });
}
function PatientProfile() {
  const { data: profile, isLoading } = useMyPatientProfile();
  const saveProfile = useSavePatientProfile();
  const [name, setName] = reactExports.useState("");
  const [age, setAge] = reactExports.useState("");
  const [conditions, setConditions] = reactExports.useState("");
  const [allergies, setAllergies] = reactExports.useState("");
  const [bloodType, setBloodType] = reactExports.useState("A");
  const [emergencyContact, setEmergencyContact] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState(
    null
  );
  const [locationError, setLocationError] = reactExports.useState(null);
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(profile.age.toString());
      setConditions(profile.conditions);
      setAllergies(profile.allergies);
      setBloodType(profile.bloodType || "A");
      setEmergencyContact(profile.emergencyContact);
    }
  }, [profile]);
  const requestLocation = reactExports.useCallback(() => {
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
      }
    );
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      ue.error("Usia tidak valid.");
      return;
    }
    if (!name.trim()) {
      ue.error("Nama lengkap harus diisi.");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        age: BigInt(ageNum),
        conditions: conditions.trim(),
        allergies: allergies.trim(),
        bloodType,
        emergencyContact: emergencyContact.trim()
      });
      ue.success("Profil berhasil disimpan!");
    } catch {
      ue.error("Gagal menyimpan profil. Silakan coba lagi.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat profil..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Profil Saya" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mt-1", children: "Lengkapi data diri untuk membantu perawat kami" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 22, className: "text-primary" }),
          " Data Pribadi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Nama Lengkap",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Masukkan nama lengkap Anda",
                className: "w-full border border-input rounded-xl px-4 py-3.5 text-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                required: true,
                "data-ocid": "profile.name_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Usia",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🎂" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: age,
                onChange: (e) => setAge(e.target.value),
                placeholder: "Contoh: 65",
                min: "1",
                max: "150",
                className: "w-full border border-input rounded-xl px-4 py-3.5 text-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                required: true,
                "data-ocid": "profile.age_input"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Golongan Darah",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 18, className: "text-primary" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-2",
                "data-ocid": "profile.blood_type_select",
                children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setBloodType(bt),
                    className: `px-4 py-2.5 rounded-xl text-base font-semibold transition-smooth border ${bloodType === bt ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/50"}`,
                    "data-ocid": `profile.blood_type.${bt}`,
                    children: bt
                  },
                  bt
                ))
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 22, className: "text-primary" }),
          " Riwayat Medis"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Kondisi Kesehatan",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: conditions,
                onChange: (e) => setConditions(e.target.value),
                rows: 3,
                placeholder: "Contoh: Diabetes tipe 2, Hipertensi, Osteoporosis...",
                className: "w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none",
                "data-ocid": "profile.conditions_textarea"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Alergi",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "⚠️" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: allergies,
                onChange: (e) => setAllergies(e.target.value),
                rows: 2,
                placeholder: "Contoh: Penisilin, Ibuprofen, Kacang-kacangan...",
                className: "w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none",
                "data-ocid": "profile.allergies_textarea"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 22, className: "text-primary" }),
          " Kontak Darurat"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormField,
          {
            label: "Nama dan Nomor Telepon",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18, className: "text-primary" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: emergencyContact,
                onChange: (e) => setEmergencyContact(e.target.value),
                placeholder: "Contoh: Budi (Anak) - 0812-3456-7890",
                className: "w-full border border-input rounded-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                "data-ocid": "profile.emergency_contact_input"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 22, className: "text-primary" }),
          " Lokasi Rumah"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-4", children: "Lokasi rumah Anda digunakan untuk menghitung jarak dan biaya kunjungan." }),
        location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "profile.location_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-2", children: "Lokasi Terdeteksi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base text-foreground font-mono", children: [
              location.lat.toFixed(6),
              ", ",
              location.lon.toFixed(6)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border bg-muted/30 h-48 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=14&size=600x200&markers=${location.lat},${location.lon},red`,
              alt: "Peta lokasi rumah",
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: requestLocation,
              className: "flex items-center gap-2 text-sm text-primary font-medium hover:underline",
              "data-ocid": "profile.refresh_location_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
                " Perbarui Lokasi"
              ]
            }
          )
        ] }) : locationLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 py-4 text-muted-foreground",
            "data-ocid": "profile.location_loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              " Mendeteksi lokasi GPS..."
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          locationError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3",
              "data-ocid": "profile.location_error_state",
              children: locationError
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: requestLocation,
              className: "flex items-center gap-2 px-5 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl text-base font-semibold hover:bg-primary/15 transition-smooth",
              "data-ocid": "profile.get_location_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18 }),
                " Deteksi Lokasi Saya"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: saveProfile.isPending,
          className: "w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-bold hover:opacity-90 disabled:opacity-50 transition-smooth shadow-lg",
          "data-ocid": "profile.save_button",
          children: saveProfile.isPending ? "Menyimpan..." : "Simpan Profil"
        }
      ),
      saveProfile.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-primary/10 border border-primary/30 rounded-2xl px-5 py-4 text-center text-primary font-semibold text-base",
          "data-ocid": "profile.success_state",
          children: "Profil berhasil disimpan!"
        }
      )
    ] })
  ] }) });
}
export {
  PatientProfile as default
};
