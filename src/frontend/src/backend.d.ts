import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PricingConfig {
    nightSurchargePct: bigint;
    holidaySurchargePct: bigint;
    updatedAt: bigint;
    perKmRateIdr: bigint;
}
export interface PatientProfile {
    age: bigint;
    principal: Principal;
    bloodType: string;
    name: string;
    createdAt: bigint;
    emergencyContact: string;
    updatedAt: bigint;
    conditions: string;
    allergies: string;
}
export interface Service {
    id: bigint;
    baseFeeIdr: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    isActive: boolean;
    updatedAt: bigint;
    category: ServiceCategory;
}
export interface PricingAuditEntry {
    id: bigint;
    changedAt: bigint;
    adminPrincipal: Principal;
    changeDescription: string;
}
export interface NurseProfile {
    status: NurseStatus;
    latitude?: number;
    strNumber: string;
    principal: Principal;
    locationUpdatedAt?: bigint;
    name: string;
    createdAt: bigint;
    updatedAt: bigint;
    experienceYears: bigint;
    strDocUrl: string;
    longitude?: number;
    ktpDocUrl: string;
    specialization: string;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    latitude: number;
    scheduledDate: string;
    scheduledTime: string;
    nursePrincipal?: Principal;
    createdAt: bigint;
    estimatedFeeIdr: bigint;
    updatedAt: bigint;
    visitReport?: string;
    patientPrincipal: Principal;
    longitude: number;
    notes: string;
    serviceId: bigint;
}
export interface BookingStats {
    total: bigint;
    cancelled: bigint;
    pending: bigint;
    in_progress: bigint;
    completed: bigint;
    rejected: bigint;
    accepted: bigint;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    in_progress = "in_progress",
    completed = "completed",
    rejected = "rejected",
    accepted = "accepted"
}
export enum NurseStatus {
    verified = "verified",
    pending_verification = "pending_verification",
    rejected = "rejected"
}
export enum ServiceCategory {
    postopcare = "postopcare",
    ambulance = "ambulance",
    elderlycare = "elderlycare",
    woundcare = "woundcare",
    physiotherapy = "physiotherapy"
}
export interface backendInterface {
    acceptBooking(bookingId: bigint): Promise<string>;
    adminCreateService(name: string, description: string, category: ServiceCategory, baseFeeIdr: bigint): Promise<string>;
    adminDeleteService(id: bigint): Promise<string>;
    adminUpdatePricing(perKmRateIdr: bigint, nightSurchargePct: bigint, holidaySurchargePct: bigint): Promise<string>;
    adminUpdateService(id: bigint, name: string, description: string, baseFeeIdr: bigint): Promise<string>;
    approveNurse(nursePrincipal: Principal): Promise<string>;
    cancelBooking(bookingId: bigint): Promise<string>;
    createBooking(serviceId: bigint, scheduledDate: string, scheduledTime: string, latitude: number, longitude: number, notes: string): Promise<string>;
    estimateCost(serviceId: bigint, distanceKm: number, nightTime: boolean, holiday: boolean): Promise<bigint | null>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllNurses(): Promise<Array<NurseProfile>>;
    getBookingStats(): Promise<BookingStats | null>;
    getIncomingBookings(): Promise<Array<Booking>>;
    getMyBookings(): Promise<Array<Booking>>;
    getMyNurseProfile(): Promise<NurseProfile | null>;
    getMyPatientProfile(): Promise<PatientProfile | null>;
    getMyRole(): Promise<string | null>;
    getNearbyNurses(lat: number, lon: number, radiusKm: number): Promise<Array<NurseProfile>>;
    getNurseProfile(p: Principal): Promise<NurseProfile | null>;
    getNurseSchedule(): Promise<Array<Booking>>;
    getPendingNurses(): Promise<Array<NurseProfile>>;
    getPricingAuditLog(): Promise<Array<PricingAuditEntry>>;
    getPricingConfig(): Promise<PricingConfig>;
    listAllServices(): Promise<Array<Service>>;
    listServices(): Promise<Array<Service>>;
    registerAsAdmin(): Promise<string>;
    registerAsNurse(name: string, strNumber: string, specialization: string, experienceYears: bigint, strDocUrl: string, ktpDocUrl: string): Promise<string>;
    registerAsPatient(): Promise<string>;
    rejectBooking(bookingId: bigint): Promise<string>;
    rejectNurse(nursePrincipal: Principal): Promise<string>;
    saveNurseProfile(name: string, strNumber: string, specialization: string, experienceYears: bigint, strDocUrl: string, ktpDocUrl: string): Promise<string>;
    savePatientProfile(name: string, age: bigint, conditions: string, allergies: string, bloodType: string, emergencyContact: string): Promise<string>;
    seedDefaultServices(): Promise<string>;
    submitVisitReport(bookingId: bigint, reportText: string): Promise<string>;
    updateNurseLocation(lat: number, lon: number): Promise<string>;
}
