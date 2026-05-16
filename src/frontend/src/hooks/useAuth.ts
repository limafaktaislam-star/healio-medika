import { createActor } from "@/backend";
import type { UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();
  const { actor, isFetching: isActorFetching } = useActor(createActor);

  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal();

  const {
    data: role,
    isLoading: isRoleLoading,
    refetch: refetchRole,
  } = useQuery<UserRole>({
    queryKey: ["myRole", principal?.toText()],
    queryFn: async () => {
      if (!actor) return null;
      const r = await actor.getMyRole();
      if (r === null || r === undefined) return null;
      if (r === "patient" || r === "nurse" || r === "admin") return r;
      return null;
    },
    enabled: isLoggedIn && !!actor && !isActorFetching,
    staleTime: 30_000,
  });

  // Only block public routes during active login flow, NOT on initial idle state
  const isLoading =
    loginStatus === "logging-in" ||
    (isLoggedIn && (isActorFetching || isRoleLoading));

  return {
    identity,
    principal,
    role: role ?? null,
    isLoggedIn,
    isLoading,
    loginStatus,
    login,
    logout: clear,
    refetchRole,
  };
}
