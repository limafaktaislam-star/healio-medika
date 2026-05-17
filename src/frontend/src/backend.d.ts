import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PatientSummary {
    nik: string;
    principal: Principal;
    fullName: string;
    submittedAt: bigint;
    selfieUrl: string;
    ktpPhotoUrl: string;
    verificationStatus: string;
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
export type Result_1 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface BookingStats {
    total: bigint;
    cancelled: bigint;
    pending: bigint;
    in_progress: bigint;
    completed: bigint;
    rejected: bigint;
    accepted: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface PricingConfig {
    nightSurchargePct: bigint;
    holidaySurchargePct: bigint;
    updatedAt: bigint;
    perKmRateIdr: bigint;
}
export interface PatientProfile {
    age: bigint;
    nik?: string;
    principal: Principal;
    bloodType: string;
    birthDate?: string;
    name: string;
    createdAt: bigint;
    email?: string;
    emergencyContactRelation?: string;
    ktpPhotoUrl?: string;
    updatedAt: bigint;
    address?: string;
    gender?: string;
    emergencyContactPhone?: string;
    conditions: string;
    passwordHash?: string;
    emergencyContactName?: string;
    selfieWithKtpUrl?: string;
    phoneNumber?: string;
    allergies: string;
    verificationStatus: string;
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
export interface NurseProfile {
    previousWorkHistory?: string;
    status: NurseStatus;
    latitude?: number;
    strNumber: string;
    principal: Principal;
    emergencyCertExpiry?: string;
    strExpiry?: string;
    locationUpdatedAt?: bigint;
    name: string;
    createdAt: bigint;
    profession?: string;
    currentWorkDuration?: bigint;
    graduationYear?: bigint;
    strDocumentUrl?: string;
    previousFacilityType?: string;
    email?: string;
    totalExperienceYears?: bigint;
    university?: string;
    additionalCertificates?: string;
    ktpPhotoUrl?: string;
    updatedAt: bigint;
    experienceYears: bigint;
    strDocUrl: string;
    currentFacilityType?: string;
    longitude?: number;
    ijazahDocumentUrl?: string;
    ktpDocUrl: string;
    specialization: string;
    medicalCompetencies?: string;
    passwordHash?: string;
    selfieWithKtpUrl?: string;
    emergencyCertification?: string;
    employeeIdCardUrl?: string;
    currentWorkplace?: string;
    professionalOrg?: string;
}
export interface Article {
    id: bigint;
    metaDescription: string;
    title: string;
    references: Array<string>;
    content: string;
    createdAt: bigint;
    slug: string;
    updatedAt: bigint;
    category: string;
    imagePrompt: string;
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
    adminApprovePatient(patientPrincipal: Principal): Promise<Result>;
    adminCreateArticle(slug: string, title: string, metaDescription: string, content: string, imagePrompt: string, references: Array<string>, category: string): Promise<Result_1>;
    adminCreateService(name: string, description: string, category: ServiceCategory, baseFeeIdr: bigint): Promise<string>;
    adminDeleteService(id: bigint): Promise<string>;
    adminRejectPatient(patientPrincipal: Principal): Promise<Result>;
    adminUpdateArticle(id: bigint, title: string, metaDescription: string, content: string, imagePrompt: string, references: Array<string>, category: string): Promise<Result>;
    adminUpdatePricing(perKmRateIdr: bigint, nightSurchargePct: bigint, holidaySurchargePct: bigint): Promise<string>;
    adminUpdateService(id: bigint, name: string, description: string, baseFeeIdr: bigint): Promise<string>;
    approveNurse(nursePrincipal: Principal): Promise<string>;
    cancelBooking(bookingId: bigint): Promise<string>;
    createBooking(serviceId: bigint, scheduledDate: string, scheduledTime: string, latitude: number, longitude: number, notes: string): Promise<string>;
    estimateCost(serviceId: bigint, distanceKm: number, nightTime: boolean, holiday: boolean): Promise<bigint | null>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllNurses(): Promise<Array<NurseProfile>>;
    getAllPatients(): Promise<Array<PatientProfile>>;
    getArticleBySlug(slug: string): Promise<Article | null>;
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
    getPendingPatients(): Promise<Array<PatientSummary>>;
    getPricingAuditLog(): Promise<Array<PricingAuditEntry>>;
    getPricingConfig(): Promise<PricingConfig>;
    listAllServices(): Promise<Array<Service>>;
    listArticles(page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        items: Array<Article>;
    }>;
    listServices(): Promise<Array<Service>>;
    registerAsAdmin(): Promise<string>;
    registerAsNurse(name: string, strNumber: string, strExpiry: string, strDocumentUrl: string | null, specialization: string, profession: string, university: string, graduationYear: bigint, ijazahDocumentUrl: string | null, professionalOrg: string, previousWorkHistory: string, totalExperienceYears: bigint, previousFacilityType: string, currentWorkplace: string, currentWorkDuration: bigint, currentFacilityType: string, emergencyCertification: string, emergencyCertExpiry: string, additionalCertificates: string, medicalCompetencies: string, employeeIdCardUrl: string | null, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null): Promise<string>;
    registerAsPatient(): Promise<string>;
    rejectBooking(bookingId: bigint): Promise<string>;
    rejectNurse(nursePrincipal: Principal): Promise<string>;
    saveEmailPassword(email: string, password: string): Promise<Result>;
    saveNurseProfile(name: string, strNumber: string, strExpiry: string, strDocumentUrl: string | null, specialization: string, profession: string, university: string, graduationYear: bigint, ijazahDocumentUrl: string | null, professionalOrg: string, previousWorkHistory: string, totalExperienceYears: bigint, previousFacilityType: string, currentWorkplace: string, currentWorkDuration: bigint, currentFacilityType: string, emergencyCertification: string, emergencyCertExpiry: string, additionalCertificates: string, medicalCompetencies: string, employeeIdCardUrl: string | null, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null): Promise<string>;
    savePatientProfile(name: string, nik: string, birthDate: string, age: bigint, gender: string, address: string, phoneNumber: string, emergencyContactName: string, emergencyContactRelation: string, emergencyContactPhone: string, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null, conditions: string, allergies: string, bloodType: string): Promise<string>;
    searchArticles(searchQuery: string, page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        items: Array<Article>;
    }>;
    seedArticles(): Promise<string>;
    seedDefaultServices(): Promise<string>;
    submitVisitReport(bookingId: bigint, reportText: string): Promise<string>;
    updateNurseLocation(lat: number, lon: number): Promise<string>;
    verifyEmailPassword(email: string, password: string): Promise<Result>;
}
