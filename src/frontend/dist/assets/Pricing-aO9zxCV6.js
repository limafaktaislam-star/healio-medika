import { c as useQueryClient, b as useActor, h as useQuery, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, d as createActor } from "./index-CogN6nIg.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-DEkAxztn.js";
import { u as useMutation } from "./useMutation-CzdLgPbW.js";
import { u as ue } from "./index-DjiNClVB.js";
import { D as DollarSign } from "./dollar-sign-Dwt1ryzx.js";
import { S as Save } from "./save-DI1isqPK.js";
import { c as createLucideIcon } from "./createLucideIcon-BbcVMltS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(amount));
}
function formatDate(nanoTs) {
  const ms = Number(nanoTs / 1000000n);
  return new Date(ms).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
function abbrevPrincipal(p) {
  const s = p.toString();
  if (s.length <= 12) return s;
  return `${s.slice(0, 5)}...${s.slice(-5)}`;
}
function AdminPricing() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);
  const { data: config, isLoading: configLoading } = useQuery({
    queryKey: ["admin", "pricingConfig"],
    queryFn: async () => {
      if (!actor) return void 0;
      return actor.getPricingConfig();
    },
    enabled: !!actor && !isFetching
  });
  const { data: auditLog = [], isLoading: auditLoading } = useQuery({
    queryKey: ["admin", "pricingAuditLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPricingAuditLog();
    },
    enabled: !!actor && !isFetching
  });
  const [perKm, setPerKm] = reactExports.useState("");
  const [nightPct, setNightPct] = reactExports.useState("");
  const [holidayPct, setHolidayPct] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        BigInt(holidayPct || "0")
      );
    },
    onSuccess: () => {
      ue.success("Pengaturan harga berhasil disimpan");
      qc.invalidateQueries({ queryKey: ["admin", "pricingConfig"] });
      qc.invalidateQueries({ queryKey: ["admin", "pricingAuditLog"] });
    },
    onError: () => ue.error("Gagal menyimpan pengaturan harga")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6", "data-ocid": "admin.pricing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display", children: "Pengaturan Harga" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Atur tarif layanan, biaya perjalanan, dan surcharge" })
    ] }),
    configLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 p-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Tarif per Kilometer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: config ? formatRupiah(config.perKmRateIdr) : "-" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-orange-50 border-orange-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-100 p-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-6 h-6 text-orange-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Surcharge Malam (18:00-06:00)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-orange-600", children: config ? `${Number(config.nightSurchargePct)}%` : "-" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-blue-50 border-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-100 p-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Surcharge Hari Libur" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-600", children: config ? `${Number(config.holidaySurchargePct)}%` : "-" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/20 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Edit Pengaturan Harga" }),
          config && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Terakhir diperbarui: ",
            formatDate(config.updatedAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "pricing-perkm",
                  className: "block text-sm font-medium text-foreground mb-1.5",
                  children: "Tarif per Kilometer (Rp)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "pricing-perkm",
                  type: "number",
                  value: perKm,
                  onChange: (e) => setPerKm(e.target.value),
                  placeholder: "Contoh: 5000",
                  className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "data-ocid": "admin.pricing.perkm_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Biaya transportasi per kilometer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "pricing-night",
                  className: "block text-sm font-medium text-foreground mb-1.5",
                  children: "Surcharge Malam (%)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "pricing-night",
                  type: "number",
                  value: nightPct,
                  onChange: (e) => setNightPct(e.target.value),
                  placeholder: "Contoh: 20",
                  className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "data-ocid": "admin.pricing.night_pct_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Berlaku pukul 18:00 – 06:00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "pricing-holiday",
                  className: "block text-sm font-medium text-foreground mb-1.5",
                  children: "Surcharge Hari Libur (%)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "pricing-holiday",
                  type: "number",
                  value: holidayPct,
                  onChange: (e) => setHolidayPct(e.target.value),
                  placeholder: "Contoh: 30",
                  className: "w-full border border-input rounded-lg px-3 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "data-ocid": "admin.pricing.holiday_pct_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Hari libur nasional & akhir pekan" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Contoh Kalkulasi Harga" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Biaya Dasar Layanan + (",
              perKm || "0",
              " × Jarak KM) + Surcharge"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Surcharge malam: ",
              nightPct || "0",
              "% dari total · Surcharge hari libur: ",
              holidayPct || "0",
              "% dari total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => updateMutation.mutate(),
              disabled: updateMutation.isPending,
              className: "w-full md:w-auto",
              "data-ocid": "admin.pricing.save_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5 mr-2" }),
                updateMutation.isPending ? "Menyimpan..." : "Simpan Pengaturan Harga"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-6 h-6 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Log Perubahan Harga" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: auditLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : auditLog.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-muted-foreground py-8",
            "data-ocid": "admin.pricing.audit_empty_state",
            children: "Belum ada riwayat perubahan harga"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-2 font-semibold text-foreground", children: "Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-2 font-semibold text-foreground", children: "Keterangan Perubahan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-2 font-semibold text-foreground", children: "Waktu" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: auditLog.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20",
              "data-ocid": `admin.pricing.audit_item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 font-mono text-xs text-muted-foreground", children: abbrevPrincipal(entry.adminPrincipal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-foreground", children: entry.changeDescription }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-right text-muted-foreground whitespace-nowrap", children: formatDate(entry.changedAt) })
              ]
            },
            entry.id.toString()
          )) })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  AdminPricing as default
};
