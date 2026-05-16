const BOOKING_STATUS_LABELS = {
  pending: "Menunggu",
  accepted: "Diterima",
  in_progress: "Sedang Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  rejected: "Ditolak"
};
const NURSE_STATUS_LABELS = {
  pending_verification: "Menunggu Verifikasi",
  verified: "Terverifikasi",
  rejected: "Ditolak"
};
const SERVICE_CATEGORY_LABELS = {
  elderlycare: "Perawatan Lansia",
  woundcare: "Perawatan Luka",
  postopcare: "Pasca Operasi",
  physiotherapy: "Fisioterapi",
  ambulance: "Ambulans"
};
const SERVICE_CATEGORY_ICONS = {
  elderlycare: "👴",
  woundcare: "🩹",
  postopcare: "🏥",
  physiotherapy: "💪",
  ambulance: "🚑"
};
const FRONTEND_CATEGORY_LABELS = {
  dokter: "Dokter",
  perawat: "Perawat",
  bidan: "Bidan",
  fisioterapi: "Fisioterapi",
  ambulans: "Ambulans",
  apotek: "Apotek"
};
const FRONTEND_CATEGORY_ICONS = {
  dokter: "👨‍⚕️",
  perawat: "👩‍⚕️",
  bidan: "🤱",
  fisioterapi: "🏃",
  ambulans: "🚑",
  apotek: "💊"
};
const FRONTEND_CATEGORY_DESCS = {
  dokter: "Konsultasi dokter umum & spesialis secara langsung dengan tenaga medis berpengalaman.",
  perawat: "Perawatan profesional di rumah — luka, lansia, pasca operasi, dan lebih banyak lagi.",
  bidan: "Layanan kebidanan dan kesehatan ibu hamil langsung ke rumah Anda.",
  fisioterapi: "Program fisioterapi personal untuk pemulihan gerak dan kekuatan tubuh optimal.",
  ambulans: "Ambulans siaga 24 jam untuk kedaruratan medis di seluruh wilayah.",
  apotek: "Temukan apotek terdekat yang sedang buka dan cek ketersediaan obat."
};
const CONSULTATION_ONLY_CATEGORIES = ["dokter"];
const LOCATION_BASED_CATEGORIES = [
  "perawat",
  "bidan",
  "fisioterapi",
  "ambulans",
  "apotek"
];
export {
  BOOKING_STATUS_LABELS as B,
  CONSULTATION_ONLY_CATEGORIES as C,
  FRONTEND_CATEGORY_ICONS as F,
  LOCATION_BASED_CATEGORIES as L,
  NURSE_STATUS_LABELS as N,
  SERVICE_CATEGORY_ICONS as S,
  FRONTEND_CATEGORY_LABELS as a,
  FRONTEND_CATEGORY_DESCS as b,
  SERVICE_CATEGORY_LABELS as c
};
