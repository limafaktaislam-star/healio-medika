import { b as useActor, r as reactExports, j as jsxRuntimeExports, d as createActor } from "./index-CogN6nIg.js";
import { B as Badge } from "./badge-DUhY4khR.js";
import { B as Button } from "./button-BDIEiZ83.js";
import { A as Activity } from "./activity-DtATimKh.js";
import { R as RefreshCw } from "./refresh-cw-Cm9repjd.js";
import { D as Download } from "./download-CdKIvBIq.js";
import { C as ChevronLeft } from "./chevron-left-CLMvFXXX.js";
import { C as ChevronRight } from "./chevron-right-RA5MdHLM.js";
import "./createLucideIcon-BbcVMltS.js";
const MOCK_LOGS = [
  {
    id: "1",
    timestamp: "2026-05-20T08:15:23",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "verifikasi",
    description: "Verifikasi tenaga medis disetujui",
    detail: "Perawat Sari Dewi (STR: 12345678) telah diverifikasi"
  },
  {
    id: "2",
    timestamp: "2026-05-20T09:32:10",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "login",
    description: "Login berhasil",
    detail: "IP: 202.123.45.67 — Browser: Chrome 124"
  },
  {
    id: "3",
    timestamp: "2026-05-20T10:05:44",
    actor: "endanghulaepi14@gmail.com",
    role: "patient",
    type: "pesanan",
    description: "Pesanan layanan baru dibuat",
    detail: "Layanan: Perawatan Luka — Tenaga medis: Sari Dewi"
  },
  {
    id: "4",
    timestamp: "2026-05-20T11:20:00",
    actor: "endanghulaepi14@gmail.com",
    role: "patient",
    type: "pembayaran",
    description: "Deposit saldo berhasil",
    detail: "Nominal: Rp250.000 — Metode: DANA"
  },
  {
    id: "5",
    timestamp: "2026-05-20T12:00:01",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "pengaturan",
    description: "Tarif layanan diperbarui",
    detail: "Perawat: Rp150.000 → Rp175.000 per kunjungan"
  },
  {
    id: "6",
    timestamp: "2026-05-20T13:45:11",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "pesanan",
    description: "Pesanan diterima oleh tenaga medis",
    detail: "Order ID: ORD-20260520-003 — Pasien: Budi Santoso"
  },
  {
    id: "7",
    timestamp: "2026-05-20T15:10:30",
    actor: "limafaktaislam@gmail.com",
    role: "admin",
    type: "verifikasi",
    description: "Verifikasi pasien disetujui",
    detail: "Pasien: Ani Rahayu (NIK: 3271020304050001)"
  },
  {
    id: "8",
    timestamp: "2026-05-20T16:22:55",
    actor: "endanghulaepi06@gmail.com",
    role: "nurse",
    type: "logout",
    description: "Logout dari sistem",
    detail: "Sesi aktif: 6 jam 50 menit"
  }
];
const PAGE_SIZE = 50;
const ROLE_LABELS = {
  admin: "Admin",
  nurse: "Tenaga Medis",
  patient: "Pasien"
};
const ROLE_COLORS = {
  admin: "bg-purple-100 text-purple-700 border-purple-300",
  nurse: "bg-emerald-100 text-emerald-700 border-emerald-300",
  patient: "bg-blue-100 text-blue-700 border-blue-300"
};
const TYPE_LABELS = {
  semua: "Semua Jenis",
  login: "Login",
  logout: "Logout",
  verifikasi: "Verifikasi",
  pesanan: "Pesanan",
  pembayaran: "Pembayaran",
  pengaturan: "Pengaturan"
};
function formatDateTime(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function ActivityLog() {
  const { actor } = useActor(createActor);
  const [roleFilter, setRoleFilter] = reactExports.useState("semua");
  const [typeFilter, setTypeFilter] = reactExports.useState("semua");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [lastRefresh, setLastRefresh] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [logs, setLogs] = reactExports.useState(MOCK_LOGS);
  reactExports.useEffect(() => {
    if (!actor) return;
    (async () => {
      try {
        const entries = await actor.getActivityLog(BigInt(100), BigInt(0));
        const mapped = entries.map((e) => ({
          id: String(Number(e.id)),
          timestamp: new Date(Number(e.timestamp / 1000000n)).toISOString(),
          actor: e.actorEmail,
          role: e.actorRole,
          type: e.actionType,
          description: e.description,
          detail: e.metadata
        }));
        if (mapped.length > 0) setLogs(mapped);
      } catch {
      }
    })();
  }, [actor]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(/* @__PURE__ */ new Date());
    }, 3e4);
    return () => clearInterval(interval);
  }, []);
  const handleManualRefresh = reactExports.useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 500));
    setLastRefresh(/* @__PURE__ */ new Date());
    setIsRefreshing(false);
  }, []);
  const filtered = logs.filter((entry) => {
    if (roleFilter !== "semua" && entry.role !== roleFilter) return false;
    if (typeFilter !== "semua" && entry.type !== typeFilter) return false;
    if (dateFrom && entry.timestamp < dateFrom) return false;
    if (dateTo && entry.timestamp > `${dateTo}T23:59:59`) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleExportCsv = reactExports.useCallback(() => {
    const header = ["Waktu", "Aktor", "Role", "Jenis", "Deskripsi", "Detail"];
    const rows = filtered.map((e) => [
      formatDateTime(e.timestamp),
      e.actor,
      ROLE_LABELS[e.role],
      TYPE_LABELS[e.type],
      e.description,
      e.detail
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healio-activity-log-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#1a3a2a] to-[#2d6a4f] text-white py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 28 }),
          " Log Aktivitas Sistem"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/75 text-base", children: [
          "Terakhir diperbarui: ",
          lastRefresh.toLocaleTimeString("id-ID")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: handleManualRefresh,
            disabled: isRefreshing,
            className: "bg-white/20 hover:bg-white/30 text-white border border-white/40 gap-2",
            "data-ocid": "activity.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  size: 16,
                  className: isRefreshing ? "animate-spin" : ""
                }
              ),
              "Segarkan"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: handleExportCsv,
            className: "bg-amber-500 hover:bg-amber-600 text-white gap-2",
            "data-ocid": "activity.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
              " Export CSV"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 mb-6 flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "activity-role-filter",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Filter Role"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "activity-role-filter",
              value: roleFilter,
              onChange: (e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "activity.role_filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "semua", children: "Semua Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nurse", children: "Tenaga Medis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "patient", children: "Pasien" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "activity-type-filter",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Jenis Aktivitas"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "activity-type-filter",
              value: typeFilter,
              onChange: (e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "activity.type_filter",
              children: Object.keys(TYPE_LABELS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: TYPE_LABELS[k] }, k))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "activity-date-from",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Dari Tanggal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "activity-date-from",
              type: "date",
              value: dateFrom,
              onChange: (e) => {
                setDateFrom(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "activity.date_from_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "activity-date-to",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
              children: "Sampai Tanggal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "activity-date-to",
              type: "date",
              value: dateTo,
              onChange: (e) => {
                setDateTo(e.target.value);
                setPage(1);
              },
              className: "border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
              "data-ocid": "activity.date_to_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: { background: "#0a4d3c" },
              className: "text-white text-xs uppercase tracking-wider",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Waktu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Aktor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Jenis Aktivitas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Deskripsi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Detail" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 6,
              className: "text-center py-16 text-muted-foreground",
              "data-ocid": "activity.empty_state",
              children: "Tidak ada data aktivitas sesuai filter"
            }
          ) }) : paginated.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-t border-border transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`,
              "data-ocid": `activity.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: formatDateTime(entry.timestamp) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-[180px] truncate", children: entry.actor }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: ROLE_COLORS[entry.role], children: ROLE_LABELS[entry.role] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-foreground font-medium", children: TYPE_LABELS[entry.type] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: entry.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs max-w-[240px] truncate", children: entry.detail })
              ]
            },
            entry.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Menampilkan ",
            paginated.length,
            " dari ",
            filtered.length,
            " entri"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: page <= 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                "data-ocid": "activity.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
              "Hal. ",
              page,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                "data-ocid": "activity.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ActivityLog as default
};
