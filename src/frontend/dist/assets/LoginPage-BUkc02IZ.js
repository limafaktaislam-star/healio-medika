import { u as useAuth, b as useActor, a as useNavigate, c as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { L as Layout } from "./Layout-C44wxXLx.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card } from "./card-DEkAxztn.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { L as Label } from "./label-BDFZiK9Y.js";
import { S as ShieldCheck } from "./shield-check-2K-AQ7hp.js";
import { E as EyeOff, a as Eye } from "./eye-DD0NOOJ9.js";
import { A as ArrowRight } from "./arrow-right-DjMNMAFv.js";
import { F as Fingerprint } from "./fingerprint-DBFeA3qN.js";
import "./createLucideIcon-BbcVMltS.js";
import "./book-open-m2vho86p.js";
import "./chevron-right-RA5MdHLM.js";
import "./x-C_WyrZk7.js";
import "./user-check-Ds2Iu5HR.js";
import "./clipboard-list-LxFpA4sE.js";
import "./activity-DtATimKh.js";
import "./settings-DfRA-wpg.js";
import "./trending-up-BLZ5FWDy.js";
import "./package-nWSI2ZDW.js";
import "./file-text-DNsP0kT1.js";
function LoginPage() {
  const { isLoggedIn, role, isLoading, login, loginStatus } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loginError, setLoginError] = reactExports.useState("");
  const [isEmailLoading, setIsEmailLoading] = reactExports.useState(false);
  const actorRef = reactExports.useRef(actor);
  reactExports.useEffect(() => {
    actorRef.current = actor;
  }, [actor]);
  const isActorReady = !!actor;
  reactExports.useEffect(() => {
    if (!isLoggedIn || isLoading) return;
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [isLoggedIn, role, isLoading, navigate]);
  const handleEmailLogin = reactExports.useCallback(async () => {
    setLoginError("");
    if (!email || !password) {
      setLoginError("Email dan password harus diisi.");
      return;
    }
    setIsEmailLoading(true);
    try {
      let resolvedActor = actor;
      if (!resolvedActor) {
        const deadline = Date.now() + 5e3;
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
        password
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
          "Email atau password salah. Periksa kembali dan coba lagi."
        );
      }
    } catch (e) {
      console.error("Login error:", e);
      setLoginError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsEmailLoading(false);
    }
  }, [actor, email, password, navigate, qc]);
  if (isLoading && loginStatus === "logging-in") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memeriksa sesi..." }) }) });
  }
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[80vh] flex items-center justify-center py-12 px-4",
        "data-ocid": "login.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 40, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Masuk ke Healio Medika" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Masukkan email dan password Anda" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", className: "text-sm font-medium", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "login-email",
                  type: "email",
                  placeholder: "contoh@email.com",
                  value: email,
                  onChange: (e) => {
                    setEmail(e.target.value);
                    setLoginError("");
                  },
                  onKeyDown: (e) => e.key === "Enter" && handleEmailLogin(),
                  autoComplete: "email",
                  className: "h-12 text-base",
                  "data-ocid": "login.email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "login-password",
                  className: "text-sm font-medium",
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "login-password",
                    type: showPassword ? "text" : "password",
                    placeholder: "Masukkan password",
                    value: password,
                    onChange: (e) => {
                      setPassword(e.target.value);
                      setLoginError("");
                    },
                    onKeyDown: (e) => e.key === "Enter" && handleEmailLogin(),
                    autoComplete: "current-password",
                    className: "h-12 text-base pr-12",
                    "data-ocid": "login.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword((v) => !v),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    "aria-label": showPassword ? "Sembunyikan password" : "Tampilkan password",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 })
                  }
                )
              ] })
            ] }),
            loginError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-sm font-medium",
                "data-ocid": "login.error_state",
                children: loginError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "xl",
                onClick: handleEmailLogin,
                isLoading: isEmailLoading,
                disabled: isEmailLoading,
                rightIcon: !isEmailLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 }) : void 0,
                className: "w-full",
                "data-ocid": "login.submit_button",
                children: isEmailLoading ? isActorReady ? "Memverifikasi..." : "Menghubungkan..." : "Masuk"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "atau" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                onClick: login,
                isLoading: loginStatus === "logging-in",
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 18 }),
                className: "w-full",
                "data-ocid": "login.internet_identity_button",
                children: loginStatus === "logging-in" ? "Menghubungkan..." : "Masuk dengan Internet Identity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
              "Belum punya akun?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/patient/register" }),
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "login.register_link",
                  children: "Daftar di sini"
                }
              )
            ] })
          ] }) })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Mengarahkan..." }) }) });
}
export {
  LoginPage as default
};
