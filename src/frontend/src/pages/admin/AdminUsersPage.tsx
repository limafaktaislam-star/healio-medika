import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Search,
  Shield,
  Stethoscope,
  Trash2,
  User,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";

type Role = "admin" | "nurse" | "patient";
type Status = "active" | "inactive";

interface UserEntry {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  registeredAt: string;
}

const SEED_USERS: UserEntry[] = [
  {
    id: 1,
    name: "Lima Fakta Islam",
    email: "limafaktaislam@gmail.com",
    role: "admin",
    status: "active",
    registeredAt: "2026-01-01",
  },
  {
    id: 2,
    name: "Endang Hulaepi",
    email: "endanghulaepi06@gmail.com",
    role: "nurse",
    status: "active",
    registeredAt: "2026-01-05",
  },
  {
    id: 3,
    name: "Endang Hulaepi",
    email: "endanghulaepi14@gmail.com",
    role: "patient",
    status: "active",
    registeredAt: "2026-01-10",
  },
];

const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  nurse: "Tenaga Medis",
  patient: "Pasien",
};

const ROLE_ICONS: Record<Role, React.ReactNode> = {
  admin: <Shield size={12} />,
  nurse: <Stethoscope size={12} />,
  patient: <User size={12} />,
};

const ROLE_COLORS: Record<Role, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  nurse: "bg-green-100 text-green-700 border-green-200",
  patient: "bg-blue-100 text-blue-700 border-blue-200",
};

type TabFilter = "all" | Role;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserEntry[]>(SEED_USERS);
  const [tab, setTab] = useState<TabFilter>("all");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = users.filter((u) => {
    const matchTab = tab === "all" || u.role === tab;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  function toggleStatus(id: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  }

  function deleteUser(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#1a3a2a" }}>
          Manajemen Pengguna
        </h1>
        <p className="text-sm mt-1" style={{ color: "#5a7a68" }}>
          Kelola semua akun pengguna platform HEALIO MEDIKA
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {(
          [
            { label: "Total Pengguna", count: users.length, color: "#1a3a2a" },
            {
              label: "Admin",
              count: users.filter((u) => u.role === "admin").length,
              color: "#7c3aed",
            },
            {
              label: "Tenaga Medis",
              count: users.filter((u) => u.role === "nurse").length,
              color: "#16a34a",
            },
            {
              label: "Pasien",
              count: users.filter((u) => u.role === "patient").length,
              color: "#2563eb",
            },
          ] as const
        ).map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center border"
            style={{ background: "#f0faf5", borderColor: "#d1f0e0" }}
          >
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.count}
            </div>
            <div
              className="text-xs font-medium mt-1"
              style={{ color: "#5a7a68" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#5a7a68" }}
          />
          <Input
            placeholder="Cari nama atau email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.users.search_input"
          />
        </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabFilter)}>
          <TabsList className="h-10">
            <TabsTrigger value="all" data-ocid="admin.users.tab.all">
              Semua
            </TabsTrigger>
            <TabsTrigger value="patient" data-ocid="admin.users.tab.patient">
              Pasien
            </TabsTrigger>
            <TabsTrigger value="nurse" data-ocid="admin.users.tab.nurse">
              Tenaga Medis
            </TabsTrigger>
            <TabsTrigger value="admin" data-ocid="admin.users.tab.admin">
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: "#d1f0e0", background: "#ffffff" }}
      >
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  background: "#f0faf5",
                  borderBottom: "1px solid #d1f0e0",
                }}
              >
                <th
                  className="text-left px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Nama
                </th>
                <th
                  className="text-left px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Email
                </th>
                <th
                  className="text-left px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Role
                </th>
                <th
                  className="text-left px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Status
                </th>
                <th
                  className="text-left px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Terdaftar
                </th>
                <th
                  className="text-right px-5 py-3 font-semibold"
                  style={{ color: "#1a3a2a" }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12"
                    style={{ color: "#5a7a68" }}
                  >
                    Tidak ada pengguna ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr
                    key={user.id}
                    data-ocid={`admin.users.item.${idx + 1}`}
                    className="transition-colors hover:bg-green-50"
                    style={{ borderBottom: "1px solid #f0f4f8" }}
                  >
                    <td
                      className="px-5 py-4 font-medium"
                      style={{ color: "#1a3a2a" }}
                    >
                      {user.name}
                    </td>
                    <td className="px-5 py-4" style={{ color: "#3a5c48" }}>
                      {user.email}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_COLORS[user.role]}`}
                      >
                        {ROLE_ICONS[user.role]}
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "secondary"
                        }
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-600 border-red-200"
                        }
                      >
                        {user.status === "active" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </td>
                    <td
                      className="px-5 py-4 text-xs"
                      style={{ color: "#5a7a68" }}
                    >
                      {user.registeredAt}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {deleteConfirm === user.id ? (
                          <>
                            <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                              <AlertTriangle size={12} /> Hapus?
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="h-7 text-xs px-2"
                              onClick={() => deleteUser(user.id)}
                              data-ocid={`admin.users.confirm_button.${idx + 1}`}
                            >
                              Ya
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2"
                              onClick={() => setDeleteConfirm(null)}
                              data-ocid={`admin.users.cancel_button.${idx + 1}`}
                            >
                              Batal
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2 gap-1"
                              style={{
                                color:
                                  user.status === "active"
                                    ? "#dc2626"
                                    : "#16a34a",
                                borderColor:
                                  user.status === "active"
                                    ? "#fca5a5"
                                    : "#86efac",
                              }}
                              onClick={() => toggleStatus(user.id)}
                              data-ocid={`admin.users.toggle.${idx + 1}`}
                            >
                              {user.status === "active" ? (
                                <>
                                  <UserX size={12} /> Nonaktifkan
                                </>
                              ) : (
                                <>
                                  <UserCheck size={12} /> Aktifkan
                                </>
                              )}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2 gap-1 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => setDeleteConfirm(user.id)}
                              data-ocid={`admin.users.delete_button.${idx + 1}`}
                            >
                              <Trash2 size={12} /> Hapus
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y" style={{ borderColor: "#f0f4f8" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12" style={{ color: "#5a7a68" }}>
              Tidak ada pengguna ditemukan
            </div>
          ) : (
            filtered.map((user, idx) => (
              <div
                key={user.id}
                className="p-4"
                data-ocid={`admin.users.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold" style={{ color: "#1a3a2a" }}>
                      {user.name}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#5a7a68" }}
                    >
                      {user.email}
                    </div>
                  </div>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-600 border-red-200"
                    }
                  >
                    {user.status === "active" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${ROLE_COLORS[user.role]}`}
                  >
                    {ROLE_ICONS[user.role]}
                    {ROLE_LABELS[user.role]}
                  </span>
                  <span className="text-xs" style={{ color: "#5a7a68" }}>
                    Daftar: {user.registeredAt}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs gap-1"
                    style={{
                      color: user.status === "active" ? "#dc2626" : "#16a34a",
                      borderColor:
                        user.status === "active" ? "#fca5a5" : "#86efac",
                    }}
                    onClick={() => toggleStatus(user.id)}
                    data-ocid={`admin.users.toggle.mobile.${idx + 1}`}
                  >
                    {user.status === "active" ? (
                      <>
                        <UserX size={12} /> Nonaktifkan
                      </>
                    ) : (
                      <>
                        <UserCheck size={12} /> Aktifkan
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => deleteUser(user.id)}
                    data-ocid={`admin.users.delete_button.mobile.${idx + 1}`}
                  >
                    <Trash2 size={12} /> Hapus
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
