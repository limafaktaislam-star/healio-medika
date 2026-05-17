import { a as useQuery, u as useActor, c as createActor } from "./backend-RmgEpc2b.js";
import { a as useQueryClient } from "./index-BxBE-1lv.js";
import { u as useMutation } from "./useMutation-DO_kterx.js";
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
export {
  useMyPatientProfile as a,
  useMyBookings as b,
  useListServices as c,
  useCreateBooking as d,
  useEstimateCost as e,
  useCancelBooking as f,
  useSavePatientProfile as g,
  useSaveEmailPassword as h,
  useNearbyNurses as u
};
