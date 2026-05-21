import { NurseStatus, WithdrawalMethod, createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NurseStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMyBalance, useRequestWithdrawal } from "@/hooks/useQueries";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowDownToLine, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WITHDRAW_DESTINATIONS: {
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
    placeholder: "No. Rekening BCA",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_mandiri,
    label: "Bank Mandiri",
    placeholder: "No. Rekening Mandiri",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_bri,
    label: "Bank BRI",
    placeholder: "No. Rekening BRI",
    icon: "🏦",
  },
  {
    id: WithdrawalMethod.bank_bni,
    label: "Bank BNI",
    placeholder: "No. Rekening BNI",
    icon: "🏦",
  },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function MedicalWalletWidget() {
  const { data: walletData, isLoading: balanceLoading } = useMyBalance();
  const withdrawMutation = useRequestWithdrawal();

  const earnings = walletData ? Number(walletData.balanceIdr) : 0;

  const [showModal, setShowModal] = useState(false);
  const [withdrawDest, setWithdrawDest] = useState<WithdrawalMethod | "">("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const closeModal = () => {
    setShowModal(false);
    setWithdrawDest("");
    setWithdrawAccount("");
    setWithdrawAmount("");
  };

  const handleWithdraw = async () => {
    const amt = Number.parseInt(withdrawAmount.replace(/\D/g, ""));
    if (!amt || !withdrawDest || !withdrawAccount) return;
    if (amt > earnings) {
      toast.error("Saldo tidak mencukupi");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: BigInt(amt),
      method: withdrawDest,
      accountNumber: withdrawAccount,
    });
    if (result.__kind__ === "ok") {
      toast.success(
        `Penarikan ${formatRupiah(amt)} berhasil diproses ke ${
          WITHDRAW_DESTINATIONS.find((d) => d.id === withdrawDest)?.label
        }`,
      );
      closeModal();
    } else {
      toast.error(`Penarikan gagal: ${result.err}`);
    }
  };

  return (
    <>
      <section
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #0d2b1e 0%, #1a4a2e 55%, #2d6a4f 100%)",
        }}
        data-ocid="nurse.wallet.widget"
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/60 text-xs font-medium mb-1">
                <Wallet size={14} />
                Dompet Pendapatan Medis
              </div>
              {balanceLoading ? (
                <div className="h-9 w-36 rounded-lg bg-white/20 animate-pulse" />
              ) : (
                <div
                  className="text-3xl font-display font-bold text-white"
                  data-ocid="nurse.wallet.balance_display"
                >
                  {formatRupiah(earnings)}
                </div>
              )}
              <div className="text-white/50 text-xs mt-0.5">
                dari layanan yang diselesaikan
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex flex-col items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-3 text-white transition-all"
              data-ocid="nurse.wallet.withdraw_button"
            >
              <ArrowDownToLine size={20} />
              <span className="text-xs font-semibold">Tarik Dana</span>
            </button>
          </div>
        </div>
      </section>

      <Dialog open={showModal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent
          className="max-w-md"
          data-ocid="nurse.wallet.withdraw_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Tarik Pendapatan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/40 rounded-xl p-3 text-sm">
              <span className="text-muted-foreground">Saldo pendapatan: </span>
              <span className="font-bold text-primary">
                {formatRupiah(earnings)}
              </span>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tujuan Penarikan</Label>
              <div className="grid grid-cols-2 gap-2">
                {WITHDRAW_DESTINATIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setWithdrawDest(d.id);
                      setWithdrawAccount("");
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      withdrawDest === d.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 text-foreground"
                    }`}
                    data-ocid={`nurse.wallet.dest_${d.id}`}
                  >
                    <span>{d.icon}</span>
                    <span className="truncate">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {withdrawDest && (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  {
                    WITHDRAW_DESTINATIONS.find(
                      (d) => d.id === withdrawDest,
                    )?.placeholder.split(" (")[0]
                  }
                </Label>
                <Input
                  placeholder={
                    WITHDRAW_DESTINATIONS.find((d) => d.id === withdrawDest)
                      ?.placeholder
                  }
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  className="h-12 text-base"
                  data-ocid="nurse.wallet.account_input"
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
                data-ocid="nurse.wallet.amount_input"
              />
            </div>
            <Button
              onClick={handleWithdraw}
              disabled={
                !withdrawAmount ||
                !withdrawDest ||
                !withdrawAccount ||
                Number.parseInt(withdrawAmount || "0") > earnings ||
                withdrawMutation.isPending
              }
              className="w-full h-12 text-base"
              data-ocid="nurse.wallet.confirm_button"
            >
              {withdrawMutation.isPending
                ? "Memproses..."
                : "Cairkan Pendapatan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function NurseDashboard() {
  const { actor, isFetching } = useActor(createActor);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["nurseProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyNurseProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: incomingBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["incomingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["nurseSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNurseSchedule();
    },
    enabled: !!actor && !isFetching,
  });

  const today = new Date().toISOString().split("T")[0];
  const todayCount =
    schedule?.filter((b) => b.scheduledDate === today).length ?? 0;
  const pendingCount =
    incomingBookings?.filter((b) => b.status === "pending").length ?? 0;
  const completedCount =
    incomingBookings?.filter((b) => b.status === "completed").length ?? 0;

  if (profileLoading || bookingsLoading || scheduleLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto py-16 px-4 text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Belum Terdaftar
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Anda belum mendaftarkan diri sebagai tenaga medis.
          </p>
          <Link to="/nurse/register">
            <Button
              size="lg"
              className="text-lg px-8"
              data-ocid="nurse.dashboard.register_button"
            >
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        {/* Medical Wallet — top on mobile */}
        <MedicalWalletWidget />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Selamat Datang
            </h1>
            <p className="text-xl text-muted-foreground mt-1">{profile.name}</p>
          </div>
          <NurseStatusBadge status={profile.status} />
        </div>

        {/* Verification Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Status Verifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.status === NurseStatus.pending_verification && (
              <p className="text-base text-muted-foreground">
                📋 Dokumen Anda sedang ditinjau oleh admin. Proses verifikasi
                memakan waktu 1-2 hari kerja.
              </p>
            )}
            {profile.status === NurseStatus.verified && (
              <p className="text-base text-primary">
                ✅ Akun Anda telah terverifikasi. Anda dapat menerima pesanan.
              </p>
            )}
            {profile.status === NurseStatus.rejected && (
              <p className="text-base text-destructive">
                ❌ Verifikasi ditolak. Harap perbarui dokumen Anda dan hubungi
                admin.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card data-ocid="nurse.dashboard.pending_count">
            <CardContent className="pt-5 pb-5 text-center">
              <p className="text-4xl font-bold text-primary">{pendingCount}</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Pesanan Masuk
              </p>
            </CardContent>
          </Card>
          <Card data-ocid="nurse.dashboard.today_count">
            <CardContent className="pt-5 pb-5 text-center">
              <p className="text-4xl font-bold text-primary">{todayCount}</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Jadwal Hari Ini
              </p>
            </CardContent>
          </Card>
          <Card data-ocid="nurse.dashboard.completed_count">
            <CardContent className="pt-5 pb-5 text-center">
              <p className="text-4xl font-bold text-primary">
                {completedCount}
              </p>
              <p className="text-sm text-muted-foreground mt-1.5">Selesai</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Nav */}
        <div className="space-y-3">
          <Link to="/nurse/bookings" className="block">
            <Button
              size="lg"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.bookings_link"
            >
              <span>📥</span> Pesanan Masuk
              {pendingCount > 0 && (
                <span className="ml-auto bg-white/20 text-white rounded-full px-2 py-0.5 text-sm font-bold">
                  {pendingCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/nurse/schedule" className="block">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.schedule_link"
            >
              <span>📅</span> Jadwal Harian
            </Button>
          </Link>
          <Link to="/nurse/profile" className="block">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg py-5 justify-start gap-3"
              data-ocid="nurse.dashboard.profile_link"
            >
              <span>👤</span> Edit Profil
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
