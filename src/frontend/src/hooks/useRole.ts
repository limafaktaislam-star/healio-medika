import type { UserRole } from "@/types";
import { useAuth } from "./useAuth";

export function useRole() {
  const { role, isLoggedIn, isLoading } = useAuth();

  return {
    role,
    isPatient: role === "patient",
    isNurse: role === "nurse",
    isAdmin: role === "admin",
    isLoggedIn,
    isLoading,
    hasRole: (r: UserRole) => role === r,
  };
}
