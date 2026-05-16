import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const PATIENT_NAV: NavItem[] = [
  { to: "/patient/dashboard", label: "Beranda", icon: <Home size={20} /> },
  {
    to: "/patient/services",
    label: "Cari Layanan",
    icon: <Stethoscope size={20} />,
  },
  {
    to: "/patient/bookings",
    label: "Pesanan Saya",
    icon: <ClipboardList size={20} />,
  },
  { to: "/patient/profile", label: "Profil Saya", icon: <Users size={20} /> },
];

const NURSE_NAV: NavItem[] = [
  { to: "/nurse/dashboard", label: "Beranda", icon: <Home size={20} /> },
  {
    to: "/nurse/schedule",
    label: "Jadwal Saya",
    icon: <CalendarDays size={20} />,
  },
  {
    to: "/nurse/bookings",
    label: "Pesanan Masuk",
    icon: <ClipboardList size={20} />,
  },
  { to: "/nurse/profile", label: "Profil Saya", icon: <Users size={20} /> },
];

const ADMIN_NAV: NavItem[] = [
  { to: "/admin/dashboard", label: "Beranda", icon: <Home size={20} /> },
  {
    to: "/admin/nurses",
    label: "Verifikasi Perawat",
    icon: <Shield size={20} />,
  },
  {
    to: "/admin/bookings",
    label: "Semua Pesanan",
    icon: <ClipboardList size={20} />,
  },
  {
    to: "/admin/services",
    label: "Katalog Layanan",
    icon: <Activity size={20} />,
  },
  {
    to: "/admin/pricing",
    label: "Pengaturan Harga",
    icon: <Settings size={20} />,
  },
];

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { role, isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navItems =
    role === "patient"
      ? PATIENT_NAV
      : role === "nurse"
        ? NURSE_NAV
        : role === "admin"
          ? ADMIN_NAV
          : [];

  const roleLabel =
    role === "patient"
      ? "Pasien"
      : role === "nurse"
        ? "Perawat"
        : role === "admin"
          ? "Admin"
          : "";

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - keep green branding */}
      <header
        className="sticky top-0 z-40 shadow-md"
        style={{
          background:
            "linear-gradient(135deg, #1a3a2a 0%, #1a4a2e 60%, #2d6a4f 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoggedIn && showSidebar && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-smooth text-white lg:hidden"
                aria-label="Buka menu navigasi"
                data-ocid="layout.menu_button"
              >
                <Menu size={24} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-3">
              {/* Inline SVG Logo */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-gold"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.05) 100%)",
                  border: "1.5px solid rgba(201,162,39,0.5)",
                }}
              >
                <svg
                  viewBox="0 0 48 48"
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Healio Medika Logo"
                >
                  <path
                    d="M12 34c0 0 2-8 4-10s4-2 4-2l4-8c1-2 3-2 4-1s1 3 0 5l-2 4h8c2 0 3 1.5 3 3s-1 3-3 3h-2c1 0 2 1 2 2.5s-1 2.5-2 2.5h-1c1 0 1.5 1 1.5 2s-0.5 2-2 2H18c-2 0-4-1-6-3z"
                    fill="#1a4a2e"
                    stroke="#2d6a4f"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M22 20c-1-4 0-8 3-10 3 2 4 6 3 10-1 2-2 3-3 3s-2-1-3-3z"
                    fill="#c9a227"
                    opacity="0.95"
                  />
                  <path
                    d="M17 22c-3-3-3-8 0-11 3 1 5 5 4 9-0.5 2-1.5 3-2.5 3s-1-0.5-1.5-1z"
                    fill="#d4af37"
                    opacity="0.8"
                  />
                  <path
                    d="M29 22c3-3 3-8 0-11-3 1-5 5-4 9 0.5 2 1.5 3 2.5 3s1-0.5 1.5-1z"
                    fill="#d4af37"
                    opacity="0.8"
                  />
                  <circle cx="25" cy="20" r="2" fill="#f0c040" opacity="0.9" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-lg tracking-wide text-white">
                  HEALIO MEDIKA
                </div>
                <div
                  className="text-xs tracking-widest uppercase font-semibold"
                  style={{ color: "#c9a227" }}
                >
                  MELAYANI DENGAN SEPENUH HATI
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && roleLabel && (
              <span
                className="hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(201,162,39,0.2)",
                  color: "#d4af37",
                  border: "1px solid rgba(201,162,39,0.4)",
                }}
              >
                {roleLabel}
              </span>
            )}
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-smooth text-white/90 hover:text-white"
                data-ocid="layout.logout_button"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar - white background */}
        {isLoggedIn && showSidebar && navItems.length > 0 && (
          <aside
            className="hidden lg:flex flex-col w-64 shrink-0 border-r bg-white"
            style={{ borderColor: "rgba(45,106,79,0.15)" }}
          >
            <nav className="flex-1 py-6 px-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth",
                    "text-foreground/70 hover:bg-primary/5 hover:text-foreground",
                    "[&.active]:bg-primary/10 [&.active]:text-primary [&.active]:font-semibold",
                  )}
                  data-ocid={`layout.nav.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                  <ChevronRight size={14} className="ml-auto opacity-30" />
                </Link>
              ))}
            </nav>
            <div
              className="p-4"
              style={{ borderTop: "1px solid rgba(45,106,79,0.12)" }}
            >
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-smooth"
                data-ocid="layout.sidebar_logout_button"
              >
                <LogOut size={20} />
                Keluar
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar Overlay - white */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Tutup menu"
            />
            <aside className="absolute left-0 top-0 bottom-0 w-72 shadow-xl flex flex-col bg-white">
              <div
                className="flex items-center justify-between p-4"
                style={{
                  borderBottom: "1px solid rgba(45,106,79,0.15)",
                  background: "linear-gradient(135deg, #1a3a2a, #2d6a4f)",
                }}
              >
                <div className="font-display font-bold text-base text-white">
                  Menu Navigasi
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-smooth text-white"
                  aria-label="Tutup menu"
                  data-ocid="layout.close_menu_button"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-lg text-lg font-medium transition-smooth",
                      "text-foreground/70 hover:bg-primary/5 hover:text-foreground",
                      "[&.active]:bg-primary/10 [&.active]:text-primary [&.active]:font-semibold",
                    )}
                    data-ocid={`layout.mobile_nav.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div
                className="p-4"
                style={{ borderTop: "1px solid rgba(45,106,79,0.12)" }}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-4 rounded-lg text-lg font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-smooth"
                  data-ocid="layout.mobile_logout_button"
                >
                  <LogOut size={20} />
                  Keluar dari Akun
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 bg-background">{children}</main>
      </div>

      {/* Footer */}
      <footer
        className="py-5 text-center text-sm border-t"
        style={{
          background: "#f5fdf8",
          borderColor: "rgba(45,106,79,0.15)",
          color: "#5a7a68",
        }}
      >
        © {new Date().getFullYear()} HEALIO MEDIKA. Dibangun dengan ❤️
        menggunakan{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2d6a4f" }}
          className="hover:underline font-medium"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
