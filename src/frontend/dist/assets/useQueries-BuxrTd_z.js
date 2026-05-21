import { h as useQuery, c as useQueryClient, b as useActor, d as createActor } from "./index-CogN6nIg.js";
import { u as useMutation } from "./useMutation-CzdLgPbW.js";
function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isReady: !!actor && !isFetching };
}
function useListServices() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: isReady,
    staleTime: 6e4
  });
}
function useMyBookings() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyBookings();
    },
    enabled: isReady
  });
}
function useMyPatientProfile() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myPatientProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPatientProfile();
    },
    enabled: isReady
  });
}
function useNearbyNurses(lat, lon) {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["nearbyNurses", lat, lon],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNearbyNurses(lat, lon, 20);
    },
    enabled: isReady && lat !== 0 && lon !== 0,
    refetchInterval: 5e3
  });
}
function useEstimateCost(serviceId, distanceKm, nightTime, holiday) {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: [
      "estimateCost",
      serviceId == null ? void 0 : serviceId.toString(),
      distanceKm,
      nightTime,
      holiday
    ],
    queryFn: async () => {
      if (!actor || !serviceId) return null;
      return actor.estimateCost(serviceId, distanceKm, nightTime, holiday);
    },
    enabled: isReady && serviceId !== null && distanceKm > 0
  });
}
function useCreateBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args) => actor.createBooking(
      args.serviceId,
      args.scheduledDate,
      args.scheduledTime,
      args.latitude,
      args.longitude,
      args.notes
    ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBookings"] })
  });
}
function useSavePatientProfile() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args) => actor.savePatientProfile(
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
      args.bloodType
    ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myPatientProfile"] })
  });
}
function useCancelBooking() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId) => actor.cancelBooking(bookingId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBookings"] })
  });
}
function useSaveEmailPassword() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: ({ email, password }) => actor.saveEmailPassword(email, password)
  });
}
function useMyBalance() {
  const { actor, isReady } = useActorReady();
  return useQuery({
    queryKey: ["myBalance"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyBalance();
    },
    enabled: isReady,
    refetchInterval: 15e3
  });
}
function useDeposit() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args) => actor.deposit(args.amount, args.method),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] })
  });
}
function useRequestWithdrawal() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args) => actor.requestWithdrawal(args.amount, args.method, args.accountNumber),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] })
  });
}
function useTransferBalance() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args) => actor.transferBalance(args.toUserId, args.amount),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBalance"] })
  });
}
function usePharmacyDrugs(pharmacyId) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["pharmacyDrugs", pharmacyId == null ? void 0 : pharmacyId.toString()],
    queryFn: async () => {
      if (!actor || pharmacyId === null) return [];
      return await actor.getPharmacyDrugs(pharmacyId);
    },
    enabled: !!actor && pharmacyId !== null
  });
}
export {
  useMyBalance as a,
  useDeposit as b,
  useRequestWithdrawal as c,
  useTransferBalance as d,
  useMyPatientProfile as e,
  useMyBookings as f,
  useListServices as g,
  useCreateBooking as h,
  useEstimateCost as i,
  useCancelBooking as j,
  useSavePatientProfile as k,
  useSaveEmailPassword as l,
  usePharmacyDrugs as m,
  useNearbyNurses as u
};
