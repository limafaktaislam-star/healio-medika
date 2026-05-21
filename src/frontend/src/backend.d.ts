import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Result_2 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface PatientSummary {
    nik: string;
    principal: Principal;
    fullName: string;
    submittedAt: bigint;
    selfieUrl: string;
    ktpPhotoUrl: string;
    verificationStatus: string;
}
export interface WalletBalance {
    userId: Principal;
    lastUpdated: bigint;
    balanceIdr: bigint;
}
export interface UserListEntry {
    status: string;
    name: string;
    role: string;
    email: string;
    registeredAt: bigint;
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
export interface WalletTransaction {
    id: bigint;
    status: TransactionStatus;
    transactionType: TransactionType;
    userId: Principal;
    createdAt: bigint;
    description: string;
    currency: string;
    amount: bigint;
}
export interface PricingAuditEntry {
    id: bigint;
    changedAt: bigint;
    adminPrincipal: Principal;
    changeDescription: string;
}
export type Result_1 = {
    __kind__: "ok";
    ok: {
        role: string;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface PlatformSettings {
    appName: string;
    maintenanceMode: boolean;
    supportEmail: string;
    supportPhone: string;
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
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Pharmacy {
    id: bigint;
    lat: number;
    lon: number;
    closeTime: string;
    name: string;
    address: string;
    phone: string;
    drugs: Array<DrugStock>;
    openTime: string;
}
export interface TransactionEntry {
    id: bigint;
    status: string;
    transactionType: string;
    userId: Principal;
    createdAt: bigint;
    description: string;
    amount: bigint;
}
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
export interface DrugStock {
    drugName: string;
    available: boolean;
    quantity: bigint;
    category: string;
    priceIdr: bigint;
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
export interface ActivityEntry {
    id: bigint;
    actorRole: string;
    metadata: string;
    actionType: string;
    description: string;
    timestamp: bigint;
    actorEmail: string;
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
export enum DepositMethod {
    ovo = "ovo",
    dana = "dana",
    va_bca = "va_bca",
    va_bni = "va_bni",
    va_bri = "va_bri",
    va_mandiri = "va_mandiri"
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
export enum TransactionStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum TransactionType {
    transfer_out = "transfer_out",
    deposit = "deposit",
    transfer_in = "transfer_in",
    withdrawal = "withdrawal",
    service_income = "service_income",
    service_payment = "service_payment"
}
export enum Variant_ok_notFound {
    ok = "ok",
    notFound = "notFound"
}
export enum Variant_ok_notFound_unauthorized {
    ok = "ok",
    notFound = "notFound",
    unauthorized = "unauthorized"
}
export enum WithdrawalMethod {
    ovo = "ovo",
    bank_mandiri = "bank_mandiri",
    dana = "dana",
    bank_bca = "bank_bca",
    bank_bni = "bank_bni",
    bank_bri = "bank_bri"
}
export interface backendInterface {
    acceptBooking(bookingId: bigint): Promise<string>;
    activateUser(targetEmail: string): Promise<Variant_ok_notFound>;
    adminAddPharmacy(name: string, address: string, lat: number, lon: number, openTime: string, closeTime: string, phone: string): Promise<Result_2>;
    adminApprovePatient(patientPrincipal: Principal): Promise<Result>;
    adminCreateArticle(slug: string, title: string, metaDescription: string, content: string, imagePrompt: string, references: Array<string>, category: string): Promise<Result_2>;
    adminCreateService(name: string, description: string, category: ServiceCategory, baseFeeIdr: bigint): Promise<string>;
    adminDeleteService(id: bigint): Promise<string>;
    adminGetAllWalletStats(): Promise<{
        totalVolume: bigint;
        pendingWithdrawals: bigint;
        totalUsers: bigint;
    }>;
    adminRejectPatient(patientPrincipal: Principal): Promise<Result>;
    adminUpdateArticle(id: bigint, title: string, metaDescription: string, content: string, imagePrompt: string, references: Array<string>, category: string): Promise<Result>;
    adminUpdatePharmacyStock(pharmacyId: bigint, items: Array<DrugStock>): Promise<Result>;
    adminUpdatePricing(perKmRateIdr: bigint, nightSurchargePct: bigint, holidaySurchargePct: bigint): Promise<string>;
    adminUpdateService(id: bigint, name: string, description: string, baseFeeIdr: bigint): Promise<string>;
    approveNurse(nursePrincipal: Principal): Promise<string>;
    cancelBooking(bookingId: bigint): Promise<string>;
    createBooking(serviceId: bigint, scheduledDate: string, scheduledTime: string, latitude: number, longitude: number, notes: string): Promise<string>;
    deleteUser(targetEmail: string): Promise<Variant_ok_notFound_unauthorized>;
    deposit(amount: bigint, method: DepositMethod): Promise<{
        __kind__: "ok";
        ok: WalletBalance;
    } | {
        __kind__: "err";
        err: string;
    }>;
    estimateCost(serviceId: bigint, distanceKm: number, nightTime: boolean, holiday: boolean): Promise<bigint | null>;
    getActivityLog(limit: bigint, offset: bigint): Promise<Array<ActivityEntry>>;
    getAdminFinancialReport(): Promise<{
        pendingWithdrawals: bigint;
        recentTransactions: Array<TransactionEntry>;
        totalWithdrawals: bigint;
        totalRevenue: bigint;
        transactionCount: bigint;
    }>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllNurses(): Promise<Array<NurseProfile>>;
    getAllPatients(): Promise<Array<PatientProfile>>;
    getArticleBySlug(slug: string): Promise<Article | null>;
    getBookingStats(): Promise<BookingStats | null>;
    getIncomingBookings(): Promise<Array<Booking>>;
    getMyBalance(): Promise<WalletBalance>;
    getMyBookings(): Promise<Array<Booking>>;
    getMyNurseProfile(): Promise<NurseProfile | null>;
    getMyPatientProfile(): Promise<PatientProfile | null>;
    getMyRole(): Promise<string | null>;
    getMyTransactionHistory(): Promise<Array<WalletTransaction>>;
    getNearbyNurses(lat: number, lon: number, radiusKm: number): Promise<Array<NurseProfile>>;
    getNurseProfile(p: Principal): Promise<NurseProfile | null>;
    getNurseSchedule(): Promise<Array<Booking>>;
    getPendingNurses(): Promise<Array<NurseProfile>>;
    getPendingPatients(): Promise<Array<PatientSummary>>;
    getPharmacies(): Promise<Array<Pharmacy>>;
    getPharmacyDrugs(pharmacyId: bigint): Promise<Array<DrugStock>>;
    getPharmacyStock(pharmacyId: bigint): Promise<Array<DrugStock> | null>;
    getPlatformSettings(): Promise<PlatformSettings>;
    getPricingAuditLog(): Promise<Array<PricingAuditEntry>>;
    getPricingConfig(): Promise<PricingConfig>;
    getUserList(filterRole: string | null, filterStatus: string | null): Promise<Array<UserListEntry>>;
    listAllServices(): Promise<Array<Service>>;
    listArticles(page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        items: Array<Article>;
    }>;
    listServices(): Promise<Array<Service>>;
    loginWithEmail(email: string, password: string): Promise<Result_1>;
    registerAsAdmin(): Promise<string>;
    registerAsNurse(name: string, strNumber: string, strExpiry: string, strDocumentUrl: string | null, specialization: string, profession: string, university: string, graduationYear: bigint, ijazahDocumentUrl: string | null, professionalOrg: string, previousWorkHistory: string, totalExperienceYears: bigint, previousFacilityType: string, currentWorkplace: string, currentWorkDuration: bigint, currentFacilityType: string, emergencyCertification: string, emergencyCertExpiry: string, additionalCertificates: string, medicalCompetencies: string, employeeIdCardUrl: string | null, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null): Promise<string>;
    registerAsPatient(): Promise<string>;
    rejectBooking(bookingId: bigint): Promise<string>;
    rejectNurse(nursePrincipal: Principal): Promise<string>;
    requestWithdrawal(amount: bigint, method: WithdrawalMethod, accountNumber: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveEmailPassword(email: string, password: string): Promise<Result>;
    saveNurseProfile(name: string, strNumber: string, strExpiry: string, strDocumentUrl: string | null, specialization: string, profession: string, university: string, graduationYear: bigint, ijazahDocumentUrl: string | null, professionalOrg: string, previousWorkHistory: string, totalExperienceYears: bigint, previousFacilityType: string, currentWorkplace: string, currentWorkDuration: bigint, currentFacilityType: string, emergencyCertification: string, emergencyCertExpiry: string, additionalCertificates: string, medicalCompetencies: string, employeeIdCardUrl: string | null, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null): Promise<string>;
    savePatientProfile(name: string, nik: string, birthDate: string, age: bigint, gender: string, address: string, phoneNumber: string, emergencyContactName: string, emergencyContactRelation: string, emergencyContactPhone: string, ktpPhotoUrl: string | null, selfieWithKtpUrl: string | null, conditions: string, allergies: string, bloodType: string): Promise<string>;
    searchArticles(searchQuery: string, page: bigint, pageSize: bigint): Promise<{
        total: bigint;
        items: Array<Article>;
    }>;
    seedArticles(): Promise<string>;
    seedDefaultServices(): Promise<string>;
    seedPharmacies(): Promise<string>;
    submitVisitReport(bookingId: bigint, reportText: string): Promise<string>;
    suspendUser(targetEmail: string, reason: string): Promise<Variant_ok_notFound_unauthorized>;
    transferBalance(toUserId: Principal, amount: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateNurseLocation(lat: number, lon: number): Promise<string>;
    updatePlatformSettings(settings: PlatformSettings): Promise<Result>;
    verifyEmailPassword(email: string, password: string): Promise<Result>;
}
