import type { Principal } from "@icp-sdk/core/principal";
import type {
  BookingStatus as BackendBookingStatus,
  NurseStatus as BackendNurseStatus,
  ServiceCategory as BackendServiceCategory,
} from "./backend.d";

export type { BackendBookingStatus as BookingStatus };
export type { BackendNurseStatus as NurseStatus };
export type { BackendServiceCategory as ServiceCategory };

export type UserRole = "patient" | "nurse" | "admin" | null;

export interface Service {
  id: bigint;
  name: string;
  description: string;
  category: BackendServiceCategory;
  baseFeeIdr: bigint;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Booking {
  id: bigint;
  patientPrincipal: Principal;
  nursePrincipal?: Principal;
  serviceId: bigint;
  scheduledDate: string;
  scheduledTime: string;
  latitude: number;
  longitude: number;
  notes: string;
  status: BackendBookingStatus;
  estimatedFeeIdr: bigint;
  visitReport?: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface PatientProfile {
  principal: Principal;
  name: string;
  age: bigint;
  conditions: string;
  allergies: string;
  bloodType: string;
  emergencyContact: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface NurseProfile {
  principal: Principal;
  name: string;
  strNumber: string;
  specialization: string;
  experienceYears: bigint;
  strDocUrl: string;
  ktpDocUrl: string;
  status: BackendNurseStatus;
  latitude?: number;
  longitude?: number;
  locationUpdatedAt?: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface PricingConfig {
  perKmRateIdr: bigint;
  nightSurchargePct: bigint;
  holidaySurchargePct: bigint;
  updatedAt: bigint;
}

export interface BookingStats {
  total: bigint;
  pending: bigint;
  accepted: bigint;
  in_progress: bigint;
  completed: bigint;
  cancelled: bigint;
  rejected: bigint;
}

export const BOOKING_STATUS_LABELS: Record<BackendBookingStatus, string> = {
  pending: "Menunggu",
  accepted: "Diterima",
  in_progress: "Sedang Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  rejected: "Ditolak",
};

export const NURSE_STATUS_LABELS: Record<BackendNurseStatus, string> = {
  pending_verification: "Menunggu Verifikasi",
  verified: "Terverifikasi",
  rejected: "Ditolak",
};

export const SERVICE_CATEGORY_LABELS: Record<BackendServiceCategory, string> = {
  elderlycare: "Perawatan Lansia",
  woundcare: "Perawatan Luka",
  postopcare: "Pasca Operasi",
  physiotherapy: "Fisioterapi",
  ambulance: "Ambulans",
};

export const SERVICE_CATEGORY_ICONS: Record<BackendServiceCategory, string> = {
  elderlycare: "👴",
  woundcare: "🩹",
  postopcare: "🏥",
  physiotherapy: "💪",
  ambulance: "🚑",
};

// Extended frontend service categories (UI layer)
export type FrontendCategory =
  | "dokter"
  | "perawat"
  | "bidan"
  | "fisioterapi"
  | "ambulans"
  | "apotek";

export const FRONTEND_CATEGORY_LABELS: Record<FrontendCategory, string> = {
  dokter: "Dokter",
  perawat: "Perawat",
  bidan: "Bidan",
  fisioterapi: "Fisioterapi",
  ambulans: "Ambulans",
  apotek: "Apotek",
};

export const FRONTEND_CATEGORY_ICONS: Record<FrontendCategory, string> = {
  dokter: "👨‍⚕️",
  perawat: "👩‍⚕️",
  bidan: "🤱",
  fisioterapi: "🏃",
  ambulans: "🚑",
  apotek: "💊",
};

export const FRONTEND_CATEGORY_DESCS: Record<FrontendCategory, string> = {
  dokter:
    "Konsultasi dokter umum & spesialis secara langsung dengan tenaga medis berpengalaman.",
  perawat:
    "Perawatan profesional di rumah — luka, lansia, pasca operasi, dan lebih banyak lagi.",
  bidan: "Layanan kebidanan dan kesehatan ibu hamil langsung ke rumah Anda.",
  fisioterapi:
    "Program fisioterapi personal untuk pemulihan gerak dan kekuatan tubuh optimal.",
  ambulans: "Ambulans siaga 24 jam untuk kedaruratan medis di seluruh wilayah.",
  apotek: "Temukan apotek terdekat yang sedang buka dan cek ketersediaan obat.",
};

// Categories that use consultation flow (no GPS location tracking needed)
export const CONSULTATION_ONLY_CATEGORIES: FrontendCategory[] = ["dokter"];

// Categories that use GPS location to find nearby providers
export const LOCATION_BASED_CATEGORIES: FrontendCategory[] = [
  "perawat",
  "bidan",
  "fisioterapi",
  "ambulans",
  "apotek",
];
