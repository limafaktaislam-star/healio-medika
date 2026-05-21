import { j as jsxRuntimeExports, f as cn, r as reactExports, D as DepositMethod, W as WithdrawalMethod, P as Principal, u as useAuth, g as useRouter, L as LoadingSpinner } from "./index-CogN6nIg.js";
import { B as BookingStatus } from "./backend.d-DmUMkdSC.js";
import { L as Layout, C as CalendarDays } from "./Layout-C44wxXLx.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BkoeXY8l.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { L as Label } from "./label-BDFZiK9Y.js";
import { a as useMyBalance, b as useDeposit, c as useRequestWithdrawal, d as useTransferBalance, e as useMyPatientProfile, f as useMyBookings, g as useListServices } from "./useQueries-BuxrTd_z.js";
import { u as ue } from "./index-DjiNClVB.js";
import { W as Wallet } from "./wallet-BOIcpAiu.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
import { A as ArrowDownToLine } from "./arrow-down-to-line-agz_SI9N.js";
import { S as SERVICE_CATEGORY_ICONS, c as SERVICE_CATEGORY_LABELS } from "./types-Bf0oF2PP.js";
import { U as User } from "./user-Dr0P04w_.js";
import { C as ClipboardList } from "./clipboard-list-LxFpA4sE.js";
import { S as Stethoscope } from "./user-check-Ds2Iu5HR.js";
import { M as MapPin } from "./map-pin-B_SUbVCQ.js";
import "./book-open-m2vho86p.js";
import "./chevron-right-RA5MdHLM.js";
import "./x-C_WyrZk7.js";
import "./activity-DtATimKh.js";
import "./settings-DfRA-wpg.js";
import "./trending-up-BLZ5FWDy.js";
import "./package-nWSI2ZDW.js";
import "./file-text-DNsP0kT1.js";
import "./index-DwWczsLF.js";
import "./useMutation-CzdLgPbW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
const BadgeDollarSign = createLucideIcon("badge-dollar-sign", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const DEPOSIT_METHODS = [
  { id: DepositMethod.dana, label: "DANA", icon: "💙" },
  { id: DepositMethod.ovo, label: "OVO", icon: "💜" },
  { id: DepositMethod.va_bca, label: "Virtual Account BCA", icon: "🏦" },
  {
    id: DepositMethod.va_mandiri,
    label: "Virtual Account Mandiri",
    icon: "🏦"
  },
  { id: DepositMethod.va_bri, label: "Virtual Account BRI", icon: "🏦" },
  { id: DepositMethod.va_bni, label: "Virtual Account BNI", icon: "🏦" }
];
const WITHDRAW_METHODS = [
  {
    id: WithdrawalMethod.dana,
    label: "DANA",
    placeholder: "Nomor DANA (08xxxxxxxx)",
    icon: "💙"
  },
  {
    id: WithdrawalMethod.ovo,
    label: "OVO",
    placeholder: "Nomor OVO (08xxxxxxxx)",
    icon: "💜"
  },
  {
    id: WithdrawalMethod.bank_bca,
    label: "Bank BCA",
    placeholder: "Nomor Rekening BCA",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_mandiri,
    label: "Bank Mandiri",
    placeholder: "Nomor Rekening Mandiri",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_bri,
    label: "Bank BRI",
    placeholder: "Nomor Rekening BRI",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_bni,
    label: "Bank BNI",
    placeholder: "Nomor Rekening BNI",
    icon: "🏦"
  }
];
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(Number(amount));
}
function EWalletWidget() {
  var _a, _b;
  const { data: walletData, isLoading: balanceLoading } = useMyBalance();
  const depositMutation = useDeposit();
  const withdrawMutation = useRequestWithdrawal();
  const transferMutation = useTransferBalance();
  const balance = walletData ? Number(walletData.balanceIdr) : 0;
  const [modal, setModal] = reactExports.useState(null);
  const [depositAmount, setDepositAmount] = reactExports.useState("");
  const [depositMethod, setDepositMethod] = reactExports.useState("");
  const [transferRecipient, setTransferRecipient] = reactExports.useState("");
  const [transferAmount, setTransferAmount] = reactExports.useState("");
  const [withdrawMethod, setWithdrawMethod] = reactExports.useState(
    ""
  );
  const [withdrawAccount, setWithdrawAccount] = reactExports.useState("");
  const [withdrawAmount, setWithdrawAmount] = reactExports.useState("");
  const closeModal = () => {
    setModal(null);
    setDepositAmount("");
    setDepositMethod("");
    setTransferRecipient("");
    setTransferAmount("");
    setWithdrawMethod("");
    setWithdrawAccount("");
    setWithdrawAmount("");
  };
  const handleDeposit = async () => {
    const amt = Number.parseInt(depositAmount.replace(/\D/g, ""));
    if (!amt || !depositMethod) return;
    const result = await depositMutation.mutateAsync({
      amount: BigInt(amt),
      method: depositMethod
    });
    if (result.__kind__ === "ok") {
      ue.success(`Deposit berhasil! Saldo bertambah ${formatRupiah(amt)}`);
      closeModal();
    } else {
      ue.error(`Deposit gagal: ${result.err}`);
    }
  };
  const handleTransfer = async () => {
    const amt = Number.parseInt(transferAmount.replace(/\D/g, ""));
    if (!amt || !transferRecipient) return;
    if (amt > balance) {
      ue.error("Saldo tidak mencukupi");
      return;
    }
    let recipientPrincipal;
    try {
      recipientPrincipal = Principal.fromText(transferRecipient.trim());
    } catch {
      ue.error("ID Pengguna tidak valid. Gunakan Principal ID.");
      return;
    }
    const result = await transferMutation.mutateAsync({
      toUserId: recipientPrincipal,
      amount: BigInt(amt)
    });
    if (result.__kind__ === "ok") {
      ue.success(
        `Transfer ${formatRupiah(amt)} berhasil ke ${transferRecipient}`
      );
      closeModal();
    } else {
      ue.error(`Transfer gagal: ${result.err}`);
    }
  };
  const handleWithdraw = async () => {
    var _a2;
    const amt = Number.parseInt(withdrawAmount.replace(/\D/g, ""));
    if (!amt || !withdrawMethod || !withdrawAccount) return;
    if (amt > balance) {
      ue.error("Saldo tidak mencukupi");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: BigInt(amt),
      method: withdrawMethod,
      accountNumber: withdrawAccount
    });
    if (result.__kind__ === "ok") {
      ue.success(
        `Penarikan ${formatRupiah(amt)} sedang diproses ke ${(_a2 = WITHDRAW_METHODS.find((m) => m.id === withdrawMethod)) == null ? void 0 : _a2.label}`
      );
      closeModal();
    } else {
      ue.error(`Penarikan gagal: ${result.err}`);
    }
  };
  const isDepositPending = depositMutation.isPending;
  const isTransferPending = transferMutation.isPending;
  const isWithdrawPending = withdrawMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "rounded-2xl overflow-hidden shadow-lg",
        style: {
          background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 60%, #40916c 100%)"
        },
        "data-ocid": "ewallet.widget",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/70 text-sm font-medium mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 16 }),
            "Saldo E-Wallet Anda"
          ] }),
          balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40 mb-5 bg-white/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-4xl font-display font-bold text-white mb-5",
              "data-ocid": "ewallet.balance_display",
              children: formatRupiah(balance)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setModal("deposit"),
                className: "flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20",
                "data-ocid": "ewallet.deposit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeDollarSign, { size: 22 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Deposit" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setModal("transfer"),
                className: "flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20",
                "data-ocid": "ewallet.transfer_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { size: 22 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Transfer" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setModal("withdraw"),
                className: "flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20",
                "data-ocid": "ewallet.withdraw_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { size: 22 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Tarik Dana" })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal === "deposit",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "ewallet.deposit_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Deposit (Top Up)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Nominal Top Up (Rp)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Contoh: 100000",
                  value: depositAmount,
                  onChange: (e) => setDepositAmount(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "ewallet.deposit_amount_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["50000", "100000", "250000", "500000"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDepositAmount(v),
                  className: "text-xs px-3 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 font-medium transition-colors",
                  children: [
                    "Rp ",
                    Number.parseInt(v).toLocaleString("id-ID")
                  ]
                },
                v
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Metode Pembayaran" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: DEPOSIT_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDepositMethod(m.id),
                  className: `flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${depositMethod === m.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40 text-foreground"}`,
                  "data-ocid": `ewallet.deposit_method_${m.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: m.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: m.label })
                  ]
                },
                m.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleDeposit,
                disabled: !depositAmount || !depositMethod || isDepositPending,
                className: "w-full h-12 text-base",
                "data-ocid": "ewallet.deposit_confirm_button",
                children: isDepositPending ? "Memproses..." : "Konfirmasi Deposit"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal === "transfer",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "ewallet.transfer_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Transfer Saldo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Saldo tersedia: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: formatRupiah(balance) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800", children: [
              "ℹ️ Masukkan ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Principal ID" }),
              " penerima (bisa dilihat di halaman profil pengguna)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Principal ID Penerima" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Contoh: aaaaa-bbbbb-ccccc-ddddd-eee",
                  value: transferRecipient,
                  onChange: (e) => setTransferRecipient(e.target.value),
                  className: "h-12 text-base font-mono text-sm",
                  "data-ocid": "ewallet.transfer_recipient_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Nominal Transfer (Rp)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Masukkan jumlah",
                  value: transferAmount,
                  onChange: (e) => setTransferAmount(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "ewallet.transfer_amount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleTransfer,
                disabled: !transferAmount || !transferRecipient || Number.parseInt(transferAmount || "0") > balance || isTransferPending,
                className: "w-full h-12 text-base",
                "data-ocid": "ewallet.transfer_confirm_button",
                children: isTransferPending ? "Memproses..." : "Kirim Transfer"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal === "withdraw",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "ewallet.withdraw_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Tarik Dana" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Saldo tersedia: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: formatRupiah(balance) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Tujuan Penarikan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: WITHDRAW_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setWithdrawMethod(m.id);
                    setWithdrawAccount("");
                  },
                  className: `flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${withdrawMethod === m.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40 text-foreground"}`,
                  "data-ocid": `ewallet.withdraw_method_${m.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: m.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: m.label })
                  ]
                },
                m.id
              )) })
            ] }),
            withdrawMethod && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: (_a = WITHDRAW_METHODS.find(
                (m) => m.id === withdrawMethod
              )) == null ? void 0 : _a.placeholder.split(" (")[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: (_b = WITHDRAW_METHODS.find((m) => m.id === withdrawMethod)) == null ? void 0 : _b.placeholder,
                  value: withdrawAccount,
                  onChange: (e) => setWithdrawAccount(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "ewallet.withdraw_account_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Nominal Penarikan (Rp)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Masukkan jumlah",
                  value: withdrawAmount,
                  onChange: (e) => setWithdrawAmount(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "ewallet.withdraw_amount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleWithdraw,
                disabled: !withdrawAmount || !withdrawMethod || !withdrawAccount || Number.parseInt(withdrawAmount || "0") > balance || isWithdrawPending,
                className: "w-full h-12 text-base",
                "data-ocid": "ewallet.withdraw_confirm_button",
                children: isWithdrawPending ? "Memproses..." : "Proses Penarikan"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function StatCard({
  label,
  value,
  icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-5 flex items-center gap-4 border ${color}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-muted-foreground mt-0.5", children: label })
    ] })
  ] });
}
function PatientDashboard() {
  const { principal } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyPatientProfile();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: services, isLoading: servicesLoading } = useListServices();
  const router = useRouter();
  const isLoading = profileLoading || bookingsLoading;
  const totalBookings = (bookings == null ? void 0 : bookings.length) ?? 0;
  const activeBookings = (bookings == null ? void 0 : bookings.filter(
    (b) => b.status === BookingStatus.pending || b.status === BookingStatus.accepted || b.status === BookingStatus.in_progress
  ).length) ?? 0;
  const recentBookings = [...bookings ?? []].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 3);
  const patientName = (profile == null ? void 0 : profile.name) ?? (principal ? `${principal.toText().slice(0, 10)}...` : "Pasien");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Memuat dashboard..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EWalletWidget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-primary rounded-3xl px-7 py-8 text-primary-foreground shadow-lg",
        "data-ocid": "dashboard.greeting_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium opacity-80 mb-1 uppercase tracking-widest", children: "Selamat Datang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-1", children: patientName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-base", children: "Semoga Anda selalu sehat dan bahagia hari ini." }),
          !profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => router.navigate({ to: "/patient/profile" }),
              className: "mt-4 inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl transition-smooth border border-primary-foreground/30",
              "data-ocid": "dashboard.complete_profile_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
                " Lengkapi Profil Saya"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.stats_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-4", children: "Ringkasan Pesanan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Pesanan",
            value: totalBookings,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "text-primary", size: 28 }),
            color: "bg-primary/8 border-primary/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Pesanan Aktif",
            value: activeBookings,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "text-secondary", size: 28 }),
            color: "bg-secondary/10 border-secondary/20"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quick_actions_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-4", children: "Aksi Cepat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/services" }),
            className: "flex flex-col items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-smooth",
            "data-ocid": "dashboard.book_service_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pesan Layanan" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/bookings" }),
            className: "flex flex-col items-center gap-3 bg-card border-2 border-primary/30 text-primary rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-primary/5 transition-smooth",
            "data-ocid": "dashboard.view_bookings_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Riwayat Pesanan" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/profile" }),
            className: "flex flex-col items-center gap-3 bg-card border-2 border-secondary/30 text-secondary-foreground rounded-2xl px-6 py-6 text-lg font-semibold shadow-sm hover:bg-secondary/5 transition-smooth",
            "data-ocid": "dashboard.edit_profile_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Edit Profil" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.recent_bookings_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Pesanan Terbaru" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/bookings" }),
            className: "text-primary text-base font-medium hover:underline",
            "data-ocid": "dashboard.view_all_bookings_link",
            children: "Lihat Semua"
          }
        )
      ] }),
      recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-muted/40 rounded-2xl py-12 flex flex-col items-center gap-3 text-muted-foreground",
          "data-ocid": "dashboard.bookings_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 40, className: "opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "Belum ada pesanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => router.navigate({ to: "/patient/services" }),
                className: "mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-smooth",
                "data-ocid": "dashboard.book_now_button",
                children: "Pesan Sekarang"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl p-5 border border-border flex items-center justify-between gap-4",
          "data-ocid": `dashboard.recent_booking.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "text-primary shrink-0", size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-base text-foreground truncate", children: [
                  "Layanan #",
                  booking.serviceId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-sm", children: [
                  booking.scheduledDate,
                  " · ",
                  booking.scheduledTime
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `shrink-0 text-sm font-semibold px-3 py-1 rounded-full border ${booking.status === BookingStatus.pending ? "bg-secondary/20 text-secondary-foreground border-secondary/40" : booking.status === BookingStatus.accepted ? "bg-primary/15 text-primary border-primary/30" : booking.status === BookingStatus.completed ? "bg-primary/20 text-primary border-primary/40" : booking.status === BookingStatus.cancelled ? "bg-muted text-muted-foreground border-border" : booking.status === BookingStatus.rejected ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-chart-4/20 text-chart-4 border-chart-4/40"}`,
                children: booking.status === BookingStatus.pending ? "Menunggu" : booking.status === BookingStatus.accepted ? "Diterima" : booking.status === BookingStatus.in_progress ? "Berlangsung" : booking.status === BookingStatus.completed ? "Selesai" : booking.status === BookingStatus.cancelled ? "Dibatalkan" : "Ditolak"
              }
            )
          ]
        },
        booking.id.toString()
      )) })
    ] }),
    !servicesLoading && services && services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.services_overview_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Layanan Tersedia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => router.navigate({ to: "/patient/services" }),
            className: "text-primary text-base font-medium hover:underline",
            "data-ocid": "dashboard.view_all_services_link",
            children: "Lihat Semua"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: services.slice(0, 6).map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => router.navigate({ to: "/patient/services" }),
          className: "bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-smooth text-center",
          "data-ocid": `dashboard.service_card.${service.id.toString()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: SERVICE_CATEGORY_ICONS[service.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground leading-tight", children: service.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: SERVICE_CATEGORY_LABELS[service.category] })
          ]
        },
        service.id.toString()
      )) })
    ] })
  ] }) });
}
export {
  PatientDashboard as default
};
