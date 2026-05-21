import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const { isLoggedIn, role, isLoading, login, loginStatus } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  // Keep a ref so the retry loop inside handleEmailLogin can read the latest actor
  const actorRef = useRef(actor);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  const isActorReady = !!actor;

  // Redirect if already logged in and has role
  useEffect(() => {
    if (!isLoggedIn || isLoading) return;
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [isLoggedIn, role, isLoading, navigate]);

  const handleEmailLogin = useCallback(async () => {
    setLoginError("");
    if (!email || !password) {
      setLoginError("Email dan password harus diisi.");
      return;
    }

    setIsEmailLoading(true);
    try {
      // Wait up to 5 seconds for the actor to become ready
      let resolvedActor = actor;
      if (!resolvedActor) {
        const deadline = Date.now() + 5000;
        while (!resolvedActor && Date.now() < deadline) {
          await new Promise((r) => setTimeout(r, 200));
          resolvedActor = actorRef.current;
        }
      }

      if (!resolvedActor) {
        setLoginError("Koneksi ke server belum siap. Silakan coba lagi.");
        return;
      }

      const result = await resolvedActor.verifyEmailPassword(
        email.trim(),
        password,
      );
      if ("ok" in result) {
        const detectedRole = result.ok;
        localStorage.setItem("userRole", detectedRole);
        localStorage.setItem("userEmail", email.trim());
        await qc.invalidateQueries({ queryKey: ["myRole"] });
        if (detectedRole === "admin") {
          navigate({ to: "/admin/dashboard" });
        } else if (detectedRole === "nurse") {
          navigate({ to: "/nurse/dashboard" });
        } else {
          navigate({ to: "/patient/dashboard" });
        }
      } else {
        setLoginError(
          "Email atau password salah. Periksa kembali dan coba lagi.",
        );
      }
    } catch (e) {
      console.error("Login error:", e);
      setLoginError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsEmailLoading(false);
    }
  }, [actor, email, password, navigate, qc]);

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

  // Not logged in — show email/password login
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
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Masuk ke Healio Medika
              </h1>
              <p className="text-muted-foreground text-base">
                Masukkan email dan password Anda
              </p>
            </div>

            <Card className="shadow-lg">
              <div className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
                    autoComplete="email"
                    className="h-12 text-base"
                    data-ocid="login.email_input"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
                      autoComplete="current-password"
                      className="h-12 text-base pr-12"
                      data-ocid="login.password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {loginError && (
                  <p
                    className="text-destructive text-sm font-medium"
                    data-ocid="login.error_state"
                  >
                    {loginError}
                  </p>
                )}

                {/* Login Button */}
                <Button
                  variant="primary"
                  size="xl"
                  onClick={handleEmailLogin}
                  isLoading={isEmailLoading}
                  disabled={isEmailLoading}
                  rightIcon={
                    !isEmailLoading ? <ArrowRight size={18} /> : undefined
                  }
                  className="w-full"
                  data-ocid="login.submit_button"
                >
                  {isEmailLoading
                    ? isActorReady
                      ? "Memverifikasi..."
                      : "Menghubungkan..."
                    : "Masuk"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">atau</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Internet Identity fallback */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={login}
                  isLoading={loginStatus === "logging-in"}
                  leftIcon={<Fingerprint size={18} />}
                  className="w-full"
                  data-ocid="login.internet_identity_button"
                >
                  {loginStatus === "logging-in"
                    ? "Menghubungkan..."
                    : "Masuk dengan Internet Identity"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/patient/register" })}
                    className="text-primary font-semibold hover:underline"
                    data-ocid="login.register_link"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </Card>
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
