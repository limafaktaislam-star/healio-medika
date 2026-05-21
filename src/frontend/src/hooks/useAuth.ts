import { createActor } from "@/backend";
import type { UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();
  const { actor, isFetching: isActorFetching } = useActor(createActor);

  const iiLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal();

  // Check localStorage for email/password session
  const localRole = (
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null
  ) as UserRole | null;
  const localEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  const isLoggedIn = iiLoggedIn || !!localRole;

  const {
    data: iiRole,
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
    enabled: iiLoggedIn && !!actor && !isActorFetching,
    staleTime: 30_000,
  });

  // Prefer II role; fall back to localStorage role
  const role: UserRole = iiRole ?? localRole ?? null;

  // Only block public routes during active login flow, NOT on initial idle state
  const isLoading =
    loginStatus === "logging-in" ||
    (iiLoggedIn && (isActorFetching || isRoleLoading));

  const logout = () => {
    clear();
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
    }
  };

  return {
    identity,
    principal,
    role,
    isLoggedIn,
    isLoading,
    loginStatus,
    login,
    logout,
    localEmail,
    refetchRole,
  };
}
