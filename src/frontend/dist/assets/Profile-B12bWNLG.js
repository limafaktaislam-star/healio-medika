import { r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BxBE-1lv.js";
import { u as useActor, c as createActor } from "./backend-RmgEpc2b.js";
import { L as Layout, a as Shield, A as Activity } from "./Layout-BaOPEDvI.js";
import { a as useMyPatientProfile, g as useSavePatientProfile } from "./useQueries-DOOnbajp.js";
import { u as ue } from "./index-HxUaM6Ez.js";
import { U as User } from "./user-Dtb7gKwj.js";
import { M as MapPin } from "./map-pin-BvVnQF7V.js";
import { c as createLucideIcon } from "./createLucideIcon-C_thIQe7.js";
import { P as Phone, H as Heart } from "./phone-BBVU1H6E.js";
import { F as FileText } from "./file-text-Bdep-Bn1.js";
import "./useAuth-CVbw7B2D.js";
import "./book-open-DYprvAsb.js";
import "./chevron-right-BfAisa3Z.js";
import "./clipboard-list-Djhnxy2y.js";
import "./useMutation-DO_kterx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
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
const Droplets = createLucideIcon("droplets", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const STORAGE_URL = void 0;
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
function SectionCard({
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2", children: [
      icon,
      title
    ] }),
    children
  ] });
}
function FieldLabel({
  htmlFor,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "label",
    {
      htmlFor,
      className: "block text-base font-semibold text-foreground mb-2",
      children
    }
  );
}
const inputCls = "w-full border border-input rounded-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
const textareaCls = "w-full border border-input rounded-xl px-4 py-3 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none";
function calculateAge(birthDate) {
  if (!birthDate) return 0;
  const today = /* @__PURE__ */ new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || m === 0 && today.getDate() < dob.getDate()) age--;
  return age;
}
function PhotoUpload({
  id,
  label,
  existingUrl,
  previewUrl,
  onFileChange,
  dataOcid
}) {
  const inputRef = reactExports.useRef(null);
  const handleChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        var _a2;
        return onFileChange(file, (_a2 = ev.target) == null ? void 0 : _a2.result);
      };
      reader.readAsDataURL(file);
    } else {
      onFileChange(null, null);
    }
  };
  const displayUrl = previewUrl ?? existingUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: id, children: label }),
    displayUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border bg-muted/30 h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: displayUrl,
        alt: label,
        className: "w-full h-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        className: "flex items-center gap-3 w-full border-2 border-dashed border-primary/40 rounded-2xl px-5 py-4 text-base text-primary font-semibold hover:bg-primary/5 transition-smooth",
        "data-ocid": dataOcid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 20 }),
          displayUrl ? "Ganti Foto" : "Pilih Foto"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        id,
        type: "file",
        accept: "image/jpeg,image/png,image/webp",
        onChange: handleChange,
        className: "hidden"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Format: JPG, PNG, WebP" })
  ] });
}
function PatientProfile() {
  const { data: profile, isLoading } = useMyPatientProfile();
  const saveProfile = useSavePatientProfile();
  const { actor } = useActor(createActor);
  const [name, setName] = reactExports.useState("");
  const [nik, setNik] = reactExports.useState("");
  const [birthDate, setBirthDate] = reactExports.useState("");
  const [gender, setGender] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [phoneNumber, setPhoneNumber] = reactExports.useState("");
  const [emergencyContactName, setEmergencyContactName] = reactExports.useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = reactExports.useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = reactExports.useState("");
  const [ktpFile, setKtpFile] = reactExports.useState(null);
  const [ktpPreview, setKtpPreview] = reactExports.useState(null);
  const [selfieFile, setSelfieFile] = reactExports.useState(null);
  const [selfiePreview, setSelfiePreview] = reactExports.useState(null);
  const [conditions, setConditions] = reactExports.useState("");
  const [allergies, setAllergies] = reactExports.useState("");
  const [bloodType, setBloodType] = reactExports.useState("A");
  const [location, setLocation] = reactExports.useState(
    null
  );
  const [locationError, setLocationError] = reactExports.useState(null);
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const computedAge = birthDate ? calculateAge(birthDate) : null;
  reactExports.useEffect(() => {
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
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await window.fetch(`${STORAGE_URL}/upload`, {
      method: "POST",
      body: formData
    });
    if (!res.ok) throw new Error("Upload gagal");
    const data = await res.json();
    return data.url;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Nama lengkap harus diisi.");
      return;
    }
    if (nik && nik.length !== 16) {
      ue.error("NIK harus 16 digit.");
      return;
    }
    if (!actor) {
      ue.error("Koneksi tidak siap. Silakan coba lagi.");
      return;
    }
    try {
      let ktpPhotoUrl = (profile == null ? void 0 : profile.ktpPhotoUrl) ?? null;
      let selfieWithKtpUrl = (profile == null ? void 0 : profile.selfieWithKtpUrl) ?? null;
      if (ktpFile) ktpPhotoUrl = await uploadFile(ktpFile);
      if (selfieFile) selfieWithKtpUrl = await uploadFile(selfieFile);
      const age = birthDate ? BigInt(calculateAge(birthDate)) : BigInt((profile == null ? void 0 : profile.age) ?? 0);
      await saveProfile.mutateAsync({
        name: name.trim(),
        nik: nik.trim(),
        birthDate,
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
        bloodType
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Profil Pasien" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mt-1", children: "Lengkapi data diri untuk membantu perawat kami memberikan pelayanan terbaik" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 22, className: "text-primary" }),
          title: "Data Identitas",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { htmlFor: "p-name", children: [
                "Nama Lengkap Pasien ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
                " ",
                "(sesuai KTP)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "p-name",
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "Masukkan nama lengkap sesuai KTP",
                  className: inputCls,
                  required: true,
                  "data-ocid": "profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-nik", children: "Nomor Induk Kependudukan (NIK / KTP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "p-nik",
                  type: "text",
                  value: nik,
                  onChange: (e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16)),
                  placeholder: "16 digit nomor KTP",
                  maxLength: 16,
                  inputMode: "numeric",
                  className: inputCls,
                  "data-ocid": "profile.nik_input"
                }
              ),
              nik.length > 0 && nik.length !== 16 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive mt-1", children: [
                "NIK harus 16 digit (",
                nik.length,
                "/16)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-birthdate", children: "Tanggal Lahir" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "p-birthdate",
                    type: "date",
                    value: birthDate,
                    onChange: (e) => setBirthDate(e.target.value),
                    className: inputCls,
                    "data-ocid": "profile.birth_date_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "Usia (Otomatis)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center h-[54px] px-4 bg-muted/40 border border-border rounded-xl text-foreground font-semibold text-lg", children: computedAge !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  computedAge,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-base font-normal", children: "tahun" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-base font-normal", children: "—" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "Jenis Kelamin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", "data-ocid": "profile.gender_select", children: ["Laki-laki", "Perempuan"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setGender(g),
                  className: `flex-1 py-3.5 rounded-xl text-base font-semibold border transition-smooth ${gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/50"}`,
                  "data-ocid": `profile.gender.${g === "Laki-laki" ? "male" : "female"}`,
                  children: g === "Laki-laki" ? "👨 Laki-laki" : "👩 Perempuan"
                },
                g
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 22, className: "text-primary" }),
          title: "Kontak & Alamat",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-address", children: "Alamat Domisili Saat Ini" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "p-address",
                  value: address,
                  onChange: (e) => setAddress(e.target.value),
                  rows: 3,
                  placeholder: "Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Provinsi",
                  className: textareaCls,
                  "data-ocid": "profile.address_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-phone", children: "Nomor Telepon Aktif (WhatsApp)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center px-4 bg-muted/40 border border-r-0 border-input rounded-l-xl text-foreground font-semibold text-base select-none", children: "+62" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "p-phone",
                    type: "tel",
                    value: phoneNumber,
                    onChange: (e) => setPhoneNumber(e.target.value.replace(/\D/g, "")),
                    placeholder: "812 3456 7890",
                    inputMode: "numeric",
                    className: "flex-1 border border-input rounded-r-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                    "data-ocid": "profile.phone_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold text-foreground mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }),
                " Lokasi Rumah (GPS)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Digunakan untuk menghitung jarak dan estimasi biaya kunjungan." }),
              location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "profile.location_section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-2xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-primary mb-1", children: "Lokasi Terdeteksi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground font-mono", children: [
                    location.lat.toFixed(6),
                    ", ",
                    location.lon.toFixed(6)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border bg-muted/30 h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: `https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=14&size=600x200&markers=${location.lat},${location.lon},red`,
                    alt: "Peta lokasi",
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
                  className: "flex items-center gap-3 py-3 text-muted-foreground",
                  "data-ocid": "profile.location_loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                    " Mendeteksi lokasi GPS..."
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
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
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 22, className: "text-primary" }),
          title: "Kontak Darurat",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm -mt-2", children: "Akan dihubungi jika terjadi kondisi darurat saat kunjungan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-ec-name", children: "Nama Kontak Darurat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "p-ec-name",
                  type: "text",
                  value: emergencyContactName,
                  onChange: (e) => setEmergencyContactName(e.target.value),
                  placeholder: "Contoh: Budi Santoso",
                  className: inputCls,
                  "data-ocid": "profile.emergency_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-ec-relation", children: "Hubungan dengan Pasien" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "p-ec-relation",
                  type: "text",
                  value: emergencyContactRelation,
                  onChange: (e) => setEmergencyContactRelation(e.target.value),
                  placeholder: "Contoh: Ayah, Ibu, Suami, Istri, Anak",
                  className: inputCls,
                  "data-ocid": "profile.emergency_relation_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "p-ec-phone", children: "Nomor Telepon Kontak Darurat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center px-4 bg-muted/40 border border-r-0 border-input rounded-l-xl text-foreground font-semibold text-base select-none", children: "+62" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "p-ec-phone",
                    type: "tel",
                    value: emergencyContactPhone,
                    onChange: (e) => setEmergencyContactPhone(e.target.value.replace(/\D/g, "")),
                    placeholder: "812 3456 7890",
                    inputMode: "numeric",
                    className: "flex-1 border border-input rounded-r-xl px-4 py-3.5 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                    "data-ocid": "profile.emergency_phone_input"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 22, className: "text-primary" }),
          title: "Dokumen Verifikasi",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm -mt-2", children: "Foto KTP dan selfie diperlukan untuk verifikasi identitas pasien" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PhotoUpload,
              {
                id: "ktp-photo",
                label: "Foto KTP",
                existingUrl: profile == null ? void 0 : profile.ktpPhotoUrl,
                previewUrl: ktpPreview,
                onFileChange: (file, preview) => {
                  setKtpFile(file);
                  setKtpPreview(preview);
                },
                dataOcid: "profile.ktp_upload_button"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PhotoUpload,
              {
                id: "selfie-ktp-photo",
                label: "Foto Swafoto (Selfie) Memegang KTP",
                existingUrl: profile == null ? void 0 : profile.selfieWithKtpUrl,
                previewUrl: selfiePreview,
                onFileChange: (file, preview) => {
                  setSelfieFile(file);
                  setSelfiePreview(preview);
                },
                dataOcid: "profile.selfie_upload_button"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 22, className: "text-primary" }),
          title: "Riwayat Medis",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "Golongan Darah" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-wrap gap-2",
                  "data-ocid": "profile.blood_type_select",
                  children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setBloodType(bt),
                      className: `px-4 py-2.5 rounded-xl text-base font-semibold transition-smooth border ${bloodType === bt ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/50"}`,
                      "data-ocid": `profile.blood_type.${bt}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 14, className: "inline mr-1 opacity-70" }),
                        bt
                      ]
                    },
                    bt
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { htmlFor: "p-conditions", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, className: "inline mr-1" }),
                "Kondisi Kesehatan"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "p-conditions",
                  value: conditions,
                  onChange: (e) => setConditions(e.target.value),
                  rows: 3,
                  placeholder: "Contoh: Diabetes tipe 2, Hipertensi, Osteoporosis...",
                  className: textareaCls,
                  "data-ocid": "profile.conditions_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { htmlFor: "p-allergies", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: "⚠️" }),
                "Alergi"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "p-allergies",
                  value: allergies,
                  onChange: (e) => setAllergies(e.target.value),
                  rows: 2,
                  placeholder: "Contoh: Penisilin, Ibuprofen, Kacang-kacangan...",
                  className: textareaCls,
                  "data-ocid": "profile.allergies_textarea"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          disabled: saveProfile.isPending,
          className: "w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-bold hover:opacity-90 disabled:opacity-50 transition-smooth shadow-lg flex items-center justify-center gap-3",
          "data-ocid": "profile.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 22 }),
            saveProfile.isPending ? "Menyimpan..." : "Simpan Profil"
          ]
        }
      ),
      saveProfile.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-primary/10 border border-primary/30 rounded-2xl px-5 py-4 text-center text-primary font-semibold text-base",
          "data-ocid": "profile.success_state",
          children: "✅ Profil berhasil disimpan!"
        }
      )
    ] })
  ] }) });
}
export {
  PatientProfile as default
};
