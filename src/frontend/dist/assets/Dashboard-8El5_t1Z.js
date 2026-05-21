import { b as useActor, h as useQuery, j as jsxRuntimeExports, L as LoadingSpinner, i as Link, N as NurseStatus, r as reactExports, W as WithdrawalMethod, d as createActor } from "./index-CogN6nIg.js";
import { L as Layout } from "./Layout-C44wxXLx.js";
import { N as NurseStatusBadge } from "./StatusBadge-DGxNJ-Ri.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DEkAxztn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BkoeXY8l.js";
import { I as Input } from "./input-l1Uj-_jw.js";
import { L as Label } from "./label-BDFZiK9Y.js";
import { a as useMyBalance, c as useRequestWithdrawal } from "./useQueries-BuxrTd_z.js";
import { u as ue } from "./index-DjiNClVB.js";
import { W as Wallet } from "./wallet-BOIcpAiu.js";
import { A as ArrowDownToLine } from "./arrow-down-to-line-agz_SI9N.js";
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
import "./backend.d-DmUMkdSC.js";
import "./types-Bf0oF2PP.js";
import "./index-DwWczsLF.js";
import "./useMutation-CzdLgPbW.js";
const WITHDRAW_DESTINATIONS = [
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
    placeholder: "No. Rekening BCA",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_mandiri,
    label: "Bank Mandiri",
    placeholder: "No. Rekening Mandiri",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_bri,
    label: "Bank BRI",
    placeholder: "No. Rekening BRI",
    icon: "🏦"
  },
  {
    id: WithdrawalMethod.bank_bni,
    label: "Bank BNI",
    placeholder: "No. Rekening BNI",
    icon: "🏦"
  }
];
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
}
function MedicalWalletWidget() {
  var _a, _b;
  const { data: walletData, isLoading: balanceLoading } = useMyBalance();
  const withdrawMutation = useRequestWithdrawal();
  const earnings = walletData ? Number(walletData.balanceIdr) : 0;
  const [showModal, setShowModal] = reactExports.useState(false);
  const [withdrawDest, setWithdrawDest] = reactExports.useState("");
  const [withdrawAccount, setWithdrawAccount] = reactExports.useState("");
  const [withdrawAmount, setWithdrawAmount] = reactExports.useState("");
  const closeModal = () => {
    setShowModal(false);
    setWithdrawDest("");
    setWithdrawAccount("");
    setWithdrawAmount("");
  };
  const handleWithdraw = async () => {
    var _a2;
    const amt = Number.parseInt(withdrawAmount.replace(/\D/g, ""));
    if (!amt || !withdrawDest || !withdrawAccount) return;
    if (amt > earnings) {
      ue.error("Saldo tidak mencukupi");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: BigInt(amt),
      method: withdrawDest,
      accountNumber: withdrawAccount
    });
    if (result.__kind__ === "ok") {
      ue.success(
        `Penarikan ${formatRupiah(amt)} berhasil diproses ke ${(_a2 = WITHDRAW_DESTINATIONS.find((d) => d.id === withdrawDest)) == null ? void 0 : _a2.label}`
      );
      closeModal();
    } else {
      ue.error(`Penarikan gagal: ${result.err}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "rounded-2xl overflow-hidden shadow-lg",
        style: {
          background: "linear-gradient(135deg, #0d2b1e 0%, #1a4a2e 55%, #2d6a4f 100%)"
        },
        "data-ocid": "nurse.wallet.widget",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/60 text-xs font-medium mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 14 }),
              "Dompet Pendapatan Medis"
            ] }),
            balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-36 rounded-lg bg-white/20 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-3xl font-display font-bold text-white",
                "data-ocid": "nurse.wallet.balance_display",
                children: formatRupiah(earnings)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/50 text-xs mt-0.5", children: "dari layanan yang diselesaikan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowModal(true),
              className: "flex flex-col items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-3 text-white transition-all",
              "data-ocid": "nurse.wallet.withdraw_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { size: 20 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Tarik Dana" })
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: (open) => !open && closeModal(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md",
        "data-ocid": "nurse.wallet.withdraw_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Tarik Pendapatan" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Saldo pendapatan: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: formatRupiah(earnings) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Tujuan Penarikan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: WITHDRAW_DESTINATIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setWithdrawDest(d.id);
                    setWithdrawAccount("");
                  },
                  className: `flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${withdrawDest === d.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40 text-foreground"}`,
                  "data-ocid": `nurse.wallet.dest_${d.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: d.label })
                  ]
                },
                d.id
              )) })
            ] }),
            withdrawDest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: (_a = WITHDRAW_DESTINATIONS.find(
                (d) => d.id === withdrawDest
              )) == null ? void 0 : _a.placeholder.split(" (")[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: (_b = WITHDRAW_DESTINATIONS.find((d) => d.id === withdrawDest)) == null ? void 0 : _b.placeholder,
                  value: withdrawAccount,
                  onChange: (e) => setWithdrawAccount(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "nurse.wallet.account_input"
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
                  "data-ocid": "nurse.wallet.amount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleWithdraw,
                disabled: !withdrawAmount || !withdrawDest || !withdrawAccount || Number.parseInt(withdrawAmount || "0") > earnings || withdrawMutation.isPending,
                className: "w-full h-12 text-base",
                "data-ocid": "nurse.wallet.confirm_button",
                children: withdrawMutation.isPending ? "Memproses..." : "Cairkan Pendapatan"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function NurseDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching
  });
  const { data: incomingBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching
  });
  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching
  });
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const todayCount = (schedule == null ? void 0 : schedule.filter((b) => b.scheduledDate === today).length) ?? 0;
  const pendingCount = (incomingBookings == null ? void 0 : incomingBookings.filter((b) => b.status === "pending").length) ?? 0;
  const completedCount = (incomingBookings == null ? void 0 : incomingBookings.filter((b) => b.status === "completed").length) ?? 0;
  if (profileLoading || bookingsLoading || scheduleLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto py-16 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-3", children: "Belum Terdaftar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Anda belum mendaftarkan diri sebagai tenaga medis." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "text-lg px-8",
          "data-ocid": "nurse.dashboard.register_button",
          children: "Daftar Sekarang"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto py-8 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalWalletWidget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Selamat Datang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mt-1", children: profile.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NurseStatusBadge, { status: profile.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Status Verifikasi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        profile.status === NurseStatus.pending_verification && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground", children: "📋 Dokumen Anda sedang ditinjau oleh admin. Proses verifikasi memakan waktu 1-2 hari kerja." }),
        profile.status === NurseStatus.verified && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-primary", children: "✅ Akun Anda telah terverifikasi. Anda dapat menerima pesanan." }),
        profile.status === NurseStatus.rejected && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-destructive", children: "❌ Verifikasi ditolak. Harap perbarui dokumen Anda dan hubungi admin." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.dashboard.pending_count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: pendingCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Pesanan Masuk" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.dashboard.today_count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: todayCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Jadwal Hari Ini" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "nurse.dashboard.completed_count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: completedCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Selesai" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/bookings", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.bookings_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📥" }),
            " Pesanan Masuk",
            pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto bg-white/20 text-white rounded-full px-2 py-0.5 text-sm font-bold", children: pendingCount })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/schedule", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.schedule_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📅" }),
            " Jadwal Harian"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nurse/profile", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "w-full text-lg py-5 justify-start gap-3",
          "data-ocid": "nurse.dashboard.profile_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "👤" }),
            " Edit Profil"
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  NurseDashboard as default
};
