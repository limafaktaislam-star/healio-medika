import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  Stethoscope,
  UserCheck,
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
    to: "/admin/patients",
    label: "Verifikasi Pasien",
    icon: <UserCheck size={20} />,
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
  const navigate = useNavigate();

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
              {/* Logo Image */}
              <img
                src="/assets/logo-healio-new.png"
                alt="Healio Medika Logo"
                style={{ height: "48px", width: "auto" }}
                className="drop-shadow-md"
              />
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
            {/* Informasi Kesehatan link — visible to all */}
            <Link
              to="/articles"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-smooth hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.85)" }}
              data-ocid="layout.articles_link"
            >
              <BookOpen size={15} />
              Informasi Kesehatan
            </Link>
            {!isLoggedIn && (
              <>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/patient/register" })}
                  data-ocid="layout.daftar_pasien_button"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-smooth"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
                    color: "#1a3a2a",
                    border: "none",
                  }}
                >
                  Daftar Pasien
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/medical-staff/register" })}
                  data-ocid="layout.daftar_medis_button"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-smooth"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  Daftar Tenaga Medis
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/login" })}
                  data-ocid="layout.masuk_button"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-smooth text-white/90 hover:text-white"
                >
                  Masuk
                </button>
              </>
            )}
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
