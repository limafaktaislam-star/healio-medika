import { u as useNavigate, a as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner } from "./index-BMCDcUtm.js";
import { u as useActor, c as createActor } from "./backend-wp3yap7s.js";
import { u as useAuth, L as Layout, S as Stethoscope } from "./Layout-Cy_f-yyM.js";
import { B as Button } from "./button-Dgh0anEC.js";
import { C as Card } from "./card-D1BeUdJQ.js";
import { u as useMutation } from "./useMutation-VSVpIFXH.js";
import { c as createLucideIcon } from "./createLucideIcon-BGQG7qVG.js";
import { S as ShieldCheck } from "./shield-check-CctHuPnw.js";
import { A as ArrowRight } from "./arrow-right-Cop4AxUk.js";
import "./clipboard-list-BEaON99x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
function LoginPage() {
  const { isLoggedIn, role, isLoading, login, loginStatus } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  const [registering, setRegistering] = reactExports.useState(false);
  const registerPatient = useMutation({
    mutationFn: () => actor.registerAsPatient(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myRole"] });
    }
  });
  const registerNurse = useMutation({
    mutationFn: () => actor.registerAsNurse("", "", "", 0n, "", ""),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myRole"] });
    }
  });
  reactExports.useEffect(() => {
    if (!isLoggedIn || isLoading) return;
    if (role === "patient") navigate({ to: "/patient/dashboard" });
    else if (role === "nurse") navigate({ to: "/nurse/dashboard" });
    else if (role === "admin") navigate({ to: "/admin/dashboard" });
  }, [isLoggedIn, role, isLoading, navigate]);
  const handleRoleRegister = async () => {
    if (!selectedRole || !actor) return;
    setRegistering(true);
    try {
      if (selectedRole === "patient") {
        await registerPatient.mutateAsync();
        navigate({ to: "/patient/dashboard" });
      } else {
        navigate({ to: "/nurse/register" });
      }
    } catch (_e) {
    } finally {
      setRegistering(false);
    }
  };
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 40, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Masuk ke Healio Medika" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Gunakan Internet Identity untuk masuk dengan aman" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShieldCheck,
                {
                  size: 20,
                  className: "text-primary mt-0.5 shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Login Aman dengan Internet Identity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Data Anda dilindungi oleh teknologi blockchain Internet Computer. Tidak perlu kata sandi." })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "xl",
                onClick: login,
                isLoading: loginStatus === "logging-in",
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 22 }),
                className: "w-full",
                "data-ocid": "login.internet_identity_button",
                children: loginStatus === "logging-in" ? "Menghubungkan..." : "Masuk dengan Internet Identity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Belum punya Internet Identity?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://identity.ic0.app/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-primary font-medium hover:underline",
                  "data-ocid": "login.create_identity_link",
                  children: "Buat sekarang"
                }
              )
            ] }) })
          ] }) })
        ] })
      }
    ) });
  }
  if (isLoggedIn && !role) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[80vh] flex items-center justify-center py-12 px-4",
        "data-ocid": "login.role_selection_page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Pilih Peran Anda" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Bagaimana Anda ingin menggunakan Healio Medika?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedRole("patient"),
                className: `p-6 rounded-xl border-2 text-left transition-smooth hover:-translate-y-0.5 ${selectedRole === "patient" ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:border-primary/50"}`,
                "data-ocid": "login.role_patient_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 36, className: "text-primary mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-foreground", children: "Pasien" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Cari dan pesan layanan homecare" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedRole("nurse"),
                className: `p-6 rounded-xl border-2 text-left transition-smooth hover:-translate-y-0.5 ${selectedRole === "nurse" ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:border-primary/50"}`,
                "data-ocid": "login.role_nurse_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 36, className: "text-primary mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-foreground", children: "Perawat" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Bergabung sebagai tenaga medis" })
                ]
              }
            )
          ] }),
          selectedRole && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "xl",
              onClick: handleRoleRegister,
              isLoading: registering || registerPatient.isPending,
              rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20 }),
              className: "w-full",
              "data-ocid": "login.confirm_role_button",
              children: selectedRole === "patient" ? "Lanjut sebagai Pasien" : "Daftar sebagai Perawat"
            }
          ),
          (registerPatient.isError || registerNurse.isError) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-sm text-center mt-3",
              "data-ocid": "login.error_state",
              children: "Terjadi kesalahan. Silakan coba lagi."
            }
          )
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Mengarahkan..." }) }) });
}
export {
  LoginPage as default
};
