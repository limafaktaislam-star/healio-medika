import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

type RoleSelection = "patient" | "nurse" | null;

export default function LoginPage() {
  const { isLoggedIn, role, isLoading, login, loginStatus } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<RoleSelection>(null);

  const registerPatient = useMutation({
    mutationFn: () => actor!.registerAsPatient(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myRole"] });
    },
  });

  // Nurse registration navigates to the full form — no direct mutation here

  // Redirect if already logged in and has role
  useEffect(() => {
    if (!isLoggedIn || isLoading) return;
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [isLoggedIn, role, isLoading, navigate]);

  const handleRoleRegister = () => {
    if (!selectedRole) return;
    if (selectedRole === "patient") {
      navigate({ to: "/patient/register" });
    } else {
      // For tenaga medis, navigate to medical staff registration form
      navigate({ to: "/medical-staff/register" });
    }
  };

  // Only block the LOGIN page itself during active login-in-progress, not on first load
  if (isLoading && loginStatus === "logging-in") {
    return (
      <Layout showSidebar={false}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Memeriksa sesi..." />
        </div>
      </Layout>
    );
  }

  // Step 1: Not logged in — show Internet Identity login
  if (!isLoggedIn) {
    return (
      <Layout showSidebar={false}>
        <div
          className="min-h-[80vh] flex items-center justify-center py-12 px-4"
          data-ocid="login.page"
        >
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-5">
                <Fingerprint size={40} className="text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Masuk ke Healio Medika
              </h1>
              <p className="text-muted-foreground text-lg">
                Gunakan Internet Identity untuk masuk dengan aman
              </p>
            </div>

            <Card className="shadow-lg">
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={20}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Login Aman dengan Internet Identity
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Data Anda dilindungi oleh teknologi blockchain Internet
                        Computer. Tidak perlu kata sandi.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="xl"
                  onClick={login}
                  isLoading={loginStatus === "logging-in"}
                  leftIcon={<Fingerprint size={22} />}
                  className="w-full"
                  data-ocid="login.internet_identity_button"
                >
                  {loginStatus === "logging-in"
                    ? "Menghubungkan..."
                    : "Masuk dengan Internet Identity"}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Belum punya Internet Identity?{" "}
                    <a
                      href="https://identity.ic0.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                      data-ocid="login.create_identity_link"
                    >
                      Buat sekarang
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Step 2: Logged in but no role — show role selection
  if (isLoggedIn && !role) {
    return (
      <Layout showSidebar={false}>
        <div
          className="min-h-[80vh] flex items-center justify-center py-12 px-4"
          data-ocid="login.role_selection_page"
        >
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Pilih Peran Anda
              </h1>
              <p className="text-muted-foreground text-lg">
                Bagaimana Anda ingin menggunakan Healio Medika?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole("patient")}
                className={`p-6 rounded-xl border-2 text-left transition-smooth hover:-translate-y-0.5 ${
                  selectedRole === "patient"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                }`}
                data-ocid="login.role_patient_button"
              >
                <UserRound size={36} className="text-primary mb-3" />
                <div className="font-display text-xl font-bold text-foreground">
                  Pasien
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Cari dan pesan layanan homecare
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("nurse")}
                className={`p-6 rounded-xl border-2 text-left transition-smooth hover:-translate-y-0.5 ${
                  selectedRole === "nurse"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                }`}
                data-ocid="login.role_nurse_button"
              >
                <Stethoscope size={36} className="text-primary mb-3" />
                <div className="font-display text-xl font-bold text-foreground">
                  Tenaga Medis
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Bergabung sebagai tenaga medis
                </div>
              </button>
            </div>

            {selectedRole && (
              <Button
                variant="primary"
                size="xl"
                onClick={handleRoleRegister}
                isLoading={registerPatient.isPending}
                rightIcon={<ArrowRight size={20} />}
                className="w-full"
                data-ocid="login.confirm_role_button"
              >
                {selectedRole === "patient"
                  ? "Lanjut sebagai Pasien"
                  : "Daftar sebagai Tenaga Medis"}
              </Button>
            )}

            {registerPatient.isError && (
              <p
                className="text-destructive text-sm text-center mt-3"
                data-ocid="login.error_state"
              >
                Terjadi kesalahan. Silakan coba lagi.
              </p>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar={false}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" label="Mengarahkan..." />
      </div>
    </Layout>
  );
}
