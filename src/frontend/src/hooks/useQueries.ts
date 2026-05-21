import {
  type DepositMethod,
  type WithdrawalMethod,
  createActor,
} from "@/backend";
import type { ServiceCategory } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isReady: !!actor && !isFetching };
}

export function useListServices() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: isReady,
    staleTime: 60_000,
  });
}

export function useListAllServices() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllServices();
    },
    enabled: isReady,
    staleTime: 60_000,
  });
}

export function useMyBookings() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyBookings();
    },
    enabled: isReady,
  });
}

export function useMyPatientProfile() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myPatientProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPatientProfile();
    },
    enabled: isReady,
  });
}

export function useMyNurseProfile() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myNurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: isReady,
  });
}

export function useNurseSchedule() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: isReady,
  });
}

export function useIncomingBookings() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: isReady,
    refetchInterval: 10_000,
  });
}

export function useAllBookings() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: isReady,
  });
}

export function useBookingStats() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["bookingStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookingStats();
    },
    enabled: isReady,
  });
}

export function usePendingNurses() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["pendingNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingNurses();
    },
    enabled: isReady,
  });
}

export function useAllNurses() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["allNurses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNurses();
    },
    enabled: isReady,
  });
}

export function usePricingConfig() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["pricingConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPricingConfig();
    },
    enabled: isReady,
  });
}

export function usePricingAuditLog() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["pricingAuditLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPricingAuditLog();
    },
    enabled: isReady,
  });
}

export function useNearbyNurses(lat: number, lon: number) {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["nearbyNurses", lat, lon],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNearbyNurses(lat, lon, 20);
    },
    enabled: isReady && lat !== 0 && lon !== 0,
    refetchInterval: 5_000,
  });
}

export function useEstimateCost(
  serviceId: bigint | null,
  distanceKm: number,
  nightTime: boolean,
  holiday: boolean,
) {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: [
      "estimateCost",
      serviceId?.toString(),
      distanceKm,
      nightTime,
      holiday,
    ],
    queryFn: async () => {
      if (!actor || !serviceId) return null;
      return actor.estimateCost(serviceId, distanceKm, nightTime, holiday);
    },
    enabled: isReady && serviceId !== null && distanceKm > 0,
  });
}

export function useCreateBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      serviceId: bigint;
      scheduledDate: string;
      scheduledTime: string;
      latitude: number;
      longitude: number;
      notes: string;
    }) =>
      actor!.createBooking(
        args.serviceId,
        args.scheduledDate,
        args.scheduledTime,
        args.latitude,
        args.longitude,
        args.notes,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}

export function useRegisterAsPatient() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => actor!.registerAsPatient(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myRole"] }),
  });
}

export function useRegisterAsNurse() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      strNumber: string;
      strExpiry: string;
      strDocumentUrl: string | null;
      specialization: string;
      profession: string;
      university: string;
      graduationYear: bigint;
      ijazahDocumentUrl: string | null;
      professionalOrg: string;
      previousWorkHistory: string;
      totalExperienceYears: bigint;
      previousFacilityType: string;
      currentWorkplace: string;
      currentWorkDuration: bigint;
      currentFacilityType: string;
      emergencyCertification: string;
      emergencyCertExpiry: string;
      additionalCertificates: string;
      medicalCompetencies: string;
      employeeIdCardUrl: string | null;
      ktpPhotoUrl: string | null;
      selfieWithKtpUrl: string | null;
    }) =>
      actor!.registerAsNurse(
        args.name,
        args.strNumber,
        args.strExpiry,
        args.strDocumentUrl,
        args.specialization,
        args.profession,
        args.university,
        args.graduationYear,
        args.ijazahDocumentUrl,
        args.professionalOrg,
        args.previousWorkHistory,
        args.totalExperienceYears,
        args.previousFacilityType,
        args.currentWorkplace,
        args.currentWorkDuration,
        args.currentFacilityType,
        args.emergencyCertification,
        args.emergencyCertExpiry,
        args.additionalCertificates,
        args.medicalCompetencies,
        args.employeeIdCardUrl,
        args.ktpPhotoUrl,
        args.selfieWithKtpUrl,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myRole"] }),
  });
}

export function useSavePatientProfile() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      nik: string;
      birthDate: string;
      age: bigint;
      gender: string;
      address: string;
      phoneNumber: string;
      emergencyContactName: string;
      emergencyContactRelation: string;
      emergencyContactPhone: string;
      ktpPhotoUrl: string | null;
      selfieWithKtpUrl: string | null;
      conditions: string;
      allergies: string;
      bloodType: string;
    }) =>
      actor!.savePatientProfile(
        args.name,
        args.nik,
        args.birthDate,
        args.age,
        args.gender,
        args.address,
        args.phoneNumber,
        args.emergencyContactName,
        args.emergencyContactRelation,
        args.emergencyContactPhone,
        args.ktpPhotoUrl,
        args.selfieWithKtpUrl,
        args.conditions,
        args.allergies,
        args.bloodType,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myPatientProfile"] }),
  });
}

export function useAcceptBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: bigint) => actor!.acceptBooking(bookingId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["incomingBookings"] });
      qc.invalidateQueries({ queryKey: ["nurseSchedule"] });
    },
  });
}

export function useRejectBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: bigint) => actor!.rejectBooking(bookingId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["incomingBookings"] }),
  });
}

export function useCancelBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: bigint) => actor!.cancelBooking(bookingId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}

export function useSubmitVisitReport() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookingId,
      reportText,
    }: { bookingId: bigint; reportText: string }) =>
      actor!.submitVisitReport(bookingId, reportText),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nurseSchedule"] }),
  });
}

export function useApproveNurse() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (nursePrincipal: Principal) =>
      actor!.approveNurse(nursePrincipal),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingNurses"] });
      qc.invalidateQueries({ queryKey: ["allNurses"] });
    },
  });
}

export function useRejectNurse() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (nursePrincipal: Principal) =>
      actor!.rejectNurse(nursePrincipal),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingNurses"] });
      qc.invalidateQueries({ queryKey: ["allNurses"] });
    },
  });
}

export function useAdminUpdatePricing() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      perKmRateIdr: bigint;
      nightSurchargePct: bigint;
      holidaySurchargePct: bigint;
    }) =>
      actor!.adminUpdatePricing(
        args.perKmRateIdr,
        args.nightSurchargePct,
        args.holidaySurchargePct,
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricingConfig"] });
      qc.invalidateQueries({ queryKey: ["pricingAuditLog"] });
    },
  });
}

export function useAdminCreateService() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      description: string;
      category: ServiceCategory;
      baseFeeIdr: bigint;
    }) =>
      actor!.adminCreateService(
        args.name,
        args.description,
        args.category,
        args.baseFeeIdr,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allServices"] }),
  });
}

export function useAdminUpdateService() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: bigint;
      name: string;
      description: string;
      baseFeeIdr: bigint;
    }) =>
      actor!.adminUpdateService(
        args.id,
        args.name,
        args.description,
        args.baseFeeIdr,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allServices"] }),
  });
}

export function useAdminDeleteService() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.adminDeleteService(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allServices"] }),
  });
}

export function usePendingPatients() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["pendingPatients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingPatients();
    },
    enabled: isReady,
    refetchInterval: 15_000,
  });
}

export function useAdminApprovePatient() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (principal: import("@icp-sdk/core/principal").Principal) =>
      actor!.adminApprovePatient(principal),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPatients"] });
    },
  });
}

export function useAdminRejectPatient() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (principal: import("@icp-sdk/core/principal").Principal) =>
      actor!.adminRejectPatient(principal),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPatients"] });
    },
  });
}

export function useSaveEmailPassword() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      actor!.saveEmailPassword(email, password),
  });
}

export function useVerifyEmailPassword() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      actor!.verifyEmailPassword(email, password),
  });
}

export function useUpdateNurseLocation() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) =>
      actor!.updateNurseLocation(lat, lon),
  });
}

// Article hooks (client-side data, no actor needed)
export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { articles } = await import("@/data/articles");
      return articles;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { articles } = await import("@/data/articles");
      return articles.find((a) => a.slug === slug) ?? null;
    },
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!slug,
  });
}

export function useArticlesByCategory(category: string) {
  return useQuery({
    queryKey: ["articles", "category", category],
    queryFn: async () => {
      const { articles } = await import("@/data/articles");
      if (category === "Semua") return articles;
      return articles.filter((a) => a.category === category);
    },
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!category,
  });
}

// ─── Wallet hooks ────────────────────────────────────────────────────────────

export function useMyBalance() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myBalance"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyBalance();
    },
    enabled: isReady,
    refetchInterval: 15_000,
  });
}

export function useDeposit() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { amount: bigint; method: DepositMethod }) =>
      actor!.deposit(args.amount, args.method),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] }),
  });
}

export function useRequestWithdrawal() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      amount: bigint;
      method: WithdrawalMethod;
      accountNumber: string;
    }) =>
      actor!.requestWithdrawal(args.amount, args.method, args.accountNumber),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] }),
  });
}

export function useTransferBalance() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      toUserId: import("@icp-sdk/core/principal").Principal;
      amount: bigint;
    }) => actor!.transferBalance(args.toUserId, args.amount),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] }),
  });
}

export function useMyTransactionHistory() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myTransactionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactionHistory();
    },
    enabled: isReady,
  });
}

export function useSaveNurseProfile() {
  // placeholder - keep existing function

  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      strNumber: string;
      strExpiry: string;
      strDocumentUrl: string | null;
      specialization: string;
      profession: string;
      university: string;
      graduationYear: bigint;
      ijazahDocumentUrl: string | null;
      professionalOrg: string;
      previousWorkHistory: string;
      totalExperienceYears: bigint;
      previousFacilityType: string;
      currentWorkplace: string;
      currentWorkDuration: bigint;
      currentFacilityType: string;
      emergencyCertification: string;
      emergencyCertExpiry: string;
      additionalCertificates: string;
      medicalCompetencies: string;
      employeeIdCardUrl: string | null;
      ktpPhotoUrl: string | null;
      selfieWithKtpUrl: string | null;
    }) =>
      actor!.saveNurseProfile(
        args.name,
        args.strNumber,
        args.strExpiry,
        args.strDocumentUrl,
        args.specialization,
        args.profession,
        args.university,
        args.graduationYear,
        args.ijazahDocumentUrl,
        args.professionalOrg,
        args.previousWorkHistory,
        args.totalExperienceYears,
        args.previousFacilityType,
        args.currentWorkplace,
        args.currentWorkDuration,
        args.currentFacilityType,
        args.emergencyCertification,
        args.emergencyCertExpiry,
        args.additionalCertificates,
        args.medicalCompetencies,
        args.employeeIdCardUrl,
        args.ktpPhotoUrl,
        args.selfieWithKtpUrl,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myNurseProfile"] }),
  });
}
export function usePharmacies() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["pharmacies"],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getPharmacies();
    },
    enabled: !!actor,
  });
}

export function usePharmacyDrugs(pharmacyId: bigint | null) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["pharmacyDrugs", pharmacyId?.toString()],
    queryFn: async () => {
      if (!actor || pharmacyId === null) return [];
      return await actor.getPharmacyDrugs(pharmacyId);
    },
    enabled: !!actor && pharmacyId !== null,
  });
}
