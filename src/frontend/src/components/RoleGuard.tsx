import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface RoleGuardProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const { isLoggedIn, role, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    // Check localStorage as fallback
    const localRole =
      typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    const effectiveLoggedIn = isLoggedIn || !!localRole;
    const effectiveRole = role || localRole;

    if (!effectiveLoggedIn) {
      navigate({ to: "/login" });
      return;
    }
    if (effectiveRole && effectiveRole !== allowedRole) {
      // Redirect to correct dashboard
      if (effectiveRole === "patient") navigate({ to: "/patient/dashboard" });
      else if (effectiveRole === "nurse") navigate({ to: "/nurse/dashboard" });
      else if (effectiveRole === "admin") navigate({ to: "/admin/dashboard" });
    }
    if (!effectiveRole && effectiveLoggedIn) {
      // Logged in but no role yet — go to login for role selection
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, role, isLoading, allowedRole, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner size="lg" label="Memuat..." />
      </div>
    );
  }

  const localRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  const effectiveRole = role || localRole;

  if (!isLoggedIn && !localRole) return null;
  if (effectiveRole !== allowedRole) return null;

  return <>{children}</>;
}
