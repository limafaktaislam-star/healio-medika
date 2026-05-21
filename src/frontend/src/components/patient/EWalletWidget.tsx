import { DepositMethod, WithdrawalMethod } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeposit,
  useMyBalance,
  useRequestWithdrawal,
  useTransferBalance,
} from "@/hooks/useQueries";
import { Principal } from "@icp-sdk/core/principal";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  BadgeDollarSign,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ModalType = "deposit" | "transfer" | "withdraw" | null;

const DEPOSIT_METHODS: { id: DepositMethod; label: string; icon: string }[] = [
  { id: DepositMethod.dana, label: "DANA", icon: "💙" },
  { id: DepositMethod.ovo, label: "OVO", icon: "💜" },
  { id: DepositMethod.va_bca, label: "Virtual Account BCA", icon: "🏦" },
  {
    id: DepositMethod.va_mandiri,
    label: "Virtual Account Mandiri",
    icon: "🏦",
  },
  { id: DepositMethod.va_bri, label: "Virtual Account BRI", icon: "🏦" },
  { id: DepositMethod.va_bni, label: "Virtual Account BNI", icon: "🏦" },
];

const WITHDRAW_METHODS: {
  id: WithdrawalMethod;
  label: string;
  placeholder: string;
  icon: string;
}[] = [
  {
    id: WithdrawalMethod.dana,
    label: "DANA",
    placeholder: "Nomor DANA (08xxxxxxxx)",
    icon: "💙",
  },
  {
    id: WithdrawalMethod.ovo,
    label: "OVO",
    placeholder: "Nomor OVO (08xxxxxxxx)",
    icon: "💜",
  },
  {
    id: WithdrawalMethod.bank_bca,
    label: "Bank BCA",
    placeholder: "Nomor Rekening BCA",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_mandiri,
    label: "Bank Mandiri",
    placeholder: "Nomor Rekening Mandiri",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_bri,
    label: "Bank BRI",
    placeholder: "Nomor Rekening BRI",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_bni,
    label: "Bank BNI",
    placeholder: "Nomor Rekening BNI",
    icon: "🏦",
  },
];

function formatRupiah(amount: number | bigint) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
}

export function EWalletWidget() {
  const { data: walletData, isLoading: balanceLoading } = useMyBalance();
  const depositMutation = useDeposit();
  const withdrawMutation = useRequestWithdrawal();
  const transferMutation = useTransferBalance();

  const balance = walletData ? Number(walletData.balanceIdr) : 0;

  const [modal, setModal] = useState<ModalType>(null);

  // Deposit state
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState<DepositMethod | "">("");

  // Transfer state
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // Withdraw state
  const [withdrawMethod, setWithdrawMethod] = useState<WithdrawalMethod | "">(
    "",
  );
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

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
      method: depositMethod,
    });
    if (result.__kind__ === "ok") {
      toast.success(`Deposit berhasil! Saldo bertambah ${formatRupiah(amt)}`);
      closeModal();
    } else {
      toast.error(`Deposit gagal: ${result.err}`);
    }
  };

  const handleTransfer = async () => {
    const amt = Number.parseInt(transferAmount.replace(/\D/g, ""));
    if (!amt || !transferRecipient) return;
    if (amt > balance) {
      toast.error("Saldo tidak mencukupi");
      return;
    }
    let recipientPrincipal: Principal;
    try {
      recipientPrincipal = Principal.fromText(transferRecipient.trim());
    } catch {
      toast.error("ID Pengguna tidak valid. Gunakan Principal ID.");
      return;
    }
    const result = await transferMutation.mutateAsync({
      toUserId: recipientPrincipal,
      amount: BigInt(amt),
    });
    if (result.__kind__ === "ok") {
      toast.success(
        `Transfer ${formatRupiah(amt)} berhasil ke ${transferRecipient}`,
      );
      closeModal();
    } else {
      toast.error(`Transfer gagal: ${result.err}`);
    }
  };

  const handleWithdraw = async () => {
    const amt = Number.parseInt(withdrawAmount.replace(/\D/g, ""));
    if (!amt || !withdrawMethod || !withdrawAccount) return;
    if (amt > balance) {
      toast.error("Saldo tidak mencukupi");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: BigInt(amt),
      method: withdrawMethod,
      accountNumber: withdrawAccount,
    });
    if (result.__kind__ === "ok") {
      toast.success(
        `Penarikan ${formatRupiah(amt)} sedang diproses ke ${
          WITHDRAW_METHODS.find((m) => m.id === withdrawMethod)?.label
        }`,
      );
      closeModal();
    } else {
      toast.error(`Penarikan gagal: ${result.err}`);
    }
  };

  const isDepositPending = depositMutation.isPending;
  const isTransferPending = transferMutation.isPending;
  const isWithdrawPending = withdrawMutation.isPending;

  return (
    <>
      {/* Widget */}
      <section
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 60%, #40916c 100%)",
        }}
        data-ocid="ewallet.widget"
      >
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium mb-1">
            <Wallet size={16} />
            Saldo E-Wallet Anda
          </div>
          {balanceLoading ? (
            <Skeleton className="h-10 w-40 mb-5 bg-white/20" />
          ) : (
            <div
              className="text-4xl font-display font-bold text-white mb-5"
              data-ocid="ewallet.balance_display"
            >
              {formatRupiah(balance)}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setModal("deposit")}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20"
              data-ocid="ewallet.deposit_button"
            >
              <BadgeDollarSign size={22} />
              <span className="text-xs font-semibold">Deposit</span>
            </button>
            <button
              type="button"
              onClick={() => setModal("transfer")}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20"
              data-ocid="ewallet.transfer_button"
            >
              <ArrowRightLeft size={22} />
              <span className="text-xs font-semibold">Transfer</span>
            </button>
            <button
              type="button"
              onClick={() => setModal("withdraw")}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-3 px-2 text-white transition-all border border-white/20"
              data-ocid="ewallet.withdraw_button"
            >
              <ArrowDownToLine size={22} />
              <span className="text-xs font-semibold">Tarik Dana</span>
            </button>
          </div>
        </div>
      </section>

      {/* Deposit Modal */}
      <Dialog
        open={modal === "deposit"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-md" data-ocid="ewallet.deposit_dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Deposit (Top Up)
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Nominal Top Up (Rp)</Label>
              <Input
                type="number"
                placeholder="Contoh: 100000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="h-12 text-base"
                data-ocid="ewallet.deposit_amount_input"
              />
              <div className="flex gap-2 flex-wrap">
                {["50000", "100000", "250000", "500000"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDepositAmount(v)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 font-medium transition-colors"
                  >
                    Rp {Number.parseInt(v).toLocaleString("id-ID")}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Metode Pembayaran</Label>
              <div className="grid grid-cols-2 gap-2">
                {DEPOSIT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDepositMethod(m.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      depositMethod === m.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 text-foreground"
                    }`}
                    data-ocid={`ewallet.deposit_method_${m.id}`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleDeposit}
              disabled={!depositAmount || !depositMethod || isDepositPending}
              className="w-full h-12 text-base"
              data-ocid="ewallet.deposit_confirm_button"
            >
              {isDepositPending ? "Memproses..." : "Konfirmasi Deposit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Modal */}
      <Dialog
        open={modal === "transfer"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-md" data-ocid="ewallet.transfer_dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Transfer Saldo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/40 rounded-xl p-3 text-sm">
              <span className="text-muted-foreground">Saldo tersedia: </span>
              <span className="font-bold text-primary">
                {formatRupiah(balance)}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              ℹ️ Masukkan <strong>Principal ID</strong> penerima (bisa dilihat di
              halaman profil pengguna).
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Principal ID Penerima
              </Label>
              <Input
                placeholder="Contoh: aaaaa-bbbbb-ccccc-ddddd-eee"
                value={transferRecipient}
                onChange={(e) => setTransferRecipient(e.target.value)}
                className="h-12 text-base font-mono text-sm"
                data-ocid="ewallet.transfer_recipient_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Nominal Transfer (Rp)
              </Label>
              <Input
                type="number"
                placeholder="Masukkan jumlah"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="h-12 text-base"
                data-ocid="ewallet.transfer_amount_input"
              />
            </div>
            <Button
              onClick={handleTransfer}
              disabled={
                !transferAmount ||
                !transferRecipient ||
                Number.parseInt(transferAmount || "0") > balance ||
                isTransferPending
              }
              className="w-full h-12 text-base"
              data-ocid="ewallet.transfer_confirm_button"
            >
              {isTransferPending ? "Memproses..." : "Kirim Transfer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog
        open={modal === "withdraw"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-md" data-ocid="ewallet.withdraw_dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Tarik Dana
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/40 rounded-xl p-3 text-sm">
              <span className="text-muted-foreground">Saldo tersedia: </span>
              <span className="font-bold text-primary">
                {formatRupiah(balance)}
              </span>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tujuan Penarikan</Label>
              <div className="grid grid-cols-2 gap-2">
                {WITHDRAW_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setWithdrawMethod(m.id);
                      setWithdrawAccount("");
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      withdrawMethod === m.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 text-foreground"
                    }`}
                    data-ocid={`ewallet.withdraw_method_${m.id}`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {withdrawMethod && (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  {
                    WITHDRAW_METHODS.find(
                      (m) => m.id === withdrawMethod,
                    )?.placeholder.split(" (")[0]
                  }
                </Label>
                <Input
                  placeholder={
                    WITHDRAW_METHODS.find((m) => m.id === withdrawMethod)
                      ?.placeholder
                  }
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  className="h-12 text-base"
                  data-ocid="ewallet.withdraw_account_input"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Nominal Penarikan (Rp)
              </Label>
              <Input
                type="number"
                placeholder="Masukkan jumlah"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="h-12 text-base"
                data-ocid="ewallet.withdraw_amount_input"
              />
            </div>
            <Button
              onClick={handleWithdraw}
              disabled={
                !withdrawAmount ||
                !withdrawMethod ||
                !withdrawAccount ||
                Number.parseInt(withdrawAmount || "0") > balance ||
                isWithdrawPending
              }
              className="w-full h-12 text-base"
              data-ocid="ewallet.withdraw_confirm_button"
            >
              {isWithdrawPending ? "Memproses..." : "Proses Penarikan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
