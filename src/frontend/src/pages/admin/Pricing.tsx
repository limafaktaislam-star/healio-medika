import {
  type PricingAuditEntry,
  type PricingConfig,
  createActor,
} from "@/backend";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DollarSign, History, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatRupiah(amount: bigint): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

function formatDate(nanoTs: bigint): string {
  const ms = Number(nanoTs / 1_000_000n);
  return new Date(ms).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function abbrevPrincipal(p: { toString(): string }): string {
  const s = p.toString();
  if (s.length <= 12) return s;
  return `${s.slice(0, 5)}...${s.slice(-5)}`;
}

export default function AdminPricing() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: config, isLoading: configLoading } = useQuery<
    PricingConfig | undefined
  >({
    queryKey: ["admin", "pricingConfig"],
    queryFn: async () => {
      if (!actor) return undefined;
      return actor.getPricingConfig();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: auditLog = [], isLoading: auditLoading } = useQuery<
    PricingAuditEntry[]
  >({
    queryKey: ["admin", "pricingAuditLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPricingAuditLog();
    },
    enabled: !!actor && !isFetching,
  });

  const [perKm, setPerKm] = useState("");
  const [nightPct, setNightPct] = useState("");
  const [holidayPct, setHolidayPct] = useState("");

  useEffect(() => {
    if (config) {
      setPerKm(config.perKmRateIdr.toString());
      setNightPct(config.nightSurchargePct.toString());
      setHolidayPct(config.holidaySurchargePct.toString());
    }
  }, [config]);

  const updateMutation = useMutation({
    mutationFn: () => {
      if (!actor) throw new Error("actor tidak siap");
      return actor.adminUpdatePricing(
        BigInt(perKm || "0"),
        BigInt(nightPct || "0"),
        BigInt(holidayPct || "0"),
      );
    },
    onSuccess: () => {
      toast.success("Pengaturan harga berhasil disimpan");
      qc.invalidateQueries({ queryKey: ["admin", "pricingConfig"] });
      qc.invalidateQueries({ queryKey: ["admin", "pricingAuditLog"] });
    },
    onError: () => toast.error("Gagal menyimpan pengaturan harga"),
  });

  return (
    <div className="space-y-8 p-6" data-ocid="admin.pricing.page">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-display">
          Pengaturan Harga
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Atur tarif layanan, biaya perjalanan, dan surcharge
        </p>
      </div>

      {configLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tarif per Kilometer
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {config ? formatRupiah(config.perKmRateIdr) : "-"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Surcharge Malam (18:00-06:00)
                  </p>
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  {config ? `${Number(config.nightSurchargePct)}%` : "-"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Surcharge Hari Libur
                  </p>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {config ? `${Number(config.holidaySurchargePct)}%` : "-"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Edit Pengaturan Harga</CardTitle>
              {config && (
                <p className="text-sm text-muted-foreground">
                  Terakhir diperbarui: {formatDate(config.updatedAt)}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="pricing-perkm"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Tarif per Kilometer (Rp)
                  </label>
                  <input
                    id="pricing-perkm"
                    type="number"
                    value={perKm}
                    onChange={(e) => setPerKm(e.target.value)}
                    placeholder="Contoh: 5000"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    data-ocid="admin.pricing.perkm_input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Biaya transportasi per kilometer
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="pricing-night"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Surcharge Malam (%)
                  </label>
                  <input
                    id="pricing-night"
                    type="number"
                    value={nightPct}
                    onChange={(e) => setNightPct(e.target.value)}
                    placeholder="Contoh: 20"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    data-ocid="admin.pricing.night_pct_input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Berlaku pukul 18:00 – 06:00
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="pricing-holiday"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Surcharge Hari Libur (%)
                  </label>
                  <input
                    id="pricing-holiday"
                    type="number"
                    value={holidayPct}
                    onChange={(e) => setHolidayPct(e.target.value)}
                    placeholder="Contoh: 30"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    data-ocid="admin.pricing.holiday_pct_input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hari libur nasional &amp; akhir pekan
                  </p>
                </div>
              </div>

              <div className="bg-muted/40 rounded-xl p-4">
                <p className="text-sm font-medium text-foreground mb-1">
                  Contoh Kalkulasi Harga
                </p>
                <p className="text-sm text-muted-foreground">
                  Biaya Dasar Layanan + ({perKm || "0"} &times; Jarak KM) +
                  Surcharge
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Surcharge malam: {nightPct || "0"}% dari total &middot;
                  Surcharge hari libur: {holidayPct || "0"}% dari total
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending}
                className="w-full md:w-auto"
                data-ocid="admin.pricing.save_button"
              >
                <Save className="w-5 h-5 mr-2" />
                {updateMutation.isPending
                  ? "Menyimpan..."
                  : "Simpan Pengaturan Harga"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">Log Perubahan Harga</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {auditLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : auditLog.length === 0 ? (
                <p
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.pricing.audit_empty_state"
                >
                  Belum ada riwayat perubahan harga
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-semibold text-foreground">
                          Admin
                        </th>
                        <th className="text-left py-3 px-2 font-semibold text-foreground">
                          Keterangan Perubahan
                        </th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">
                          Waktu
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {auditLog.map((entry, i) => (
                        <tr
                          key={entry.id.toString()}
                          className="hover:bg-muted/20"
                          data-ocid={`admin.pricing.audit_item.${i + 1}`}
                        >
                          <td className="py-3 px-2 font-mono text-xs text-muted-foreground">
                            {abbrevPrincipal(entry.adminPrincipal)}
                          </td>
                          <td className="py-3 px-2 text-foreground">
                            {entry.changeDescription}
                          </td>
                          <td className="py-3 px-2 text-right text-muted-foreground whitespace-nowrap">
                            {formatDate(entry.changedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
