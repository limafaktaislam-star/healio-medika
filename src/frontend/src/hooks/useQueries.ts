import { createActor } from "@/backend";
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
      specialization: string;
      experienceYears: bigint;
      strDocUrl: string;
      ktpDocUrl: string;
    }) =>
      actor!.registerAsNurse(
        args.name,
        args.strNumber,
        args.specialization,
        args.experienceYears,
        args.strDocUrl,
        args.ktpDocUrl,
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
      age: bigint;
      conditions: string;
      allergies: string;
      bloodType: string;
      emergencyContact: string;
    }) =>
      actor!.savePatientProfile(
        args.name,
        args.age,
        args.conditions,
        args.allergies,
        args.bloodType,
        args.emergencyContact,
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

export function useUpdateNurseLocation() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) =>
      actor!.updateNurseLocation(lat, lon),
  });
}

export function useSaveNurseProfile() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      strNumber: string;
      specialization: string;
      experienceYears: bigint;
      strDocUrl: string;
      ktpDocUrl: string;
    }) =>
      actor!.saveNurseProfile(
        args.name,
        args.strNumber,
        args.specialization,
        args.experienceYears,
        args.strDocUrl,
        args.ktpDocUrl,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myNurseProfile"] }),
  });
}
