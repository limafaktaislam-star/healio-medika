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
    if (!isLoggedIn) {
      navigate({ to: "/login" });
      return;
    }
    if (role && role !== allowedRole) {
      // Redirect to correct dashboard
      if (role === "patient") navigate({ to: "/patient/dashboard" });
      else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
      else if (role === "admin") navigate({ to: "/admin/dashboard" });
    }
    if (!role && isLoggedIn) {
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

  if (!isLoggedIn || role !== allowedRole) return null;

  return <>{children}</>;
}
