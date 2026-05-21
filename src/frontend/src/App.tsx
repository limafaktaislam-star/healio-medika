import { RoleGuard } from "@/components/RoleGuard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ServiceCategoryPage = lazy(() => import("@/pages/ServiceCategoryPage"));

// Patient pages
const PatientDashboard = lazy(() => import("@/pages/patient/Dashboard"));
const PatientServices = lazy(() => import("@/pages/patient/Services"));
const PatientBookings = lazy(() => import("@/pages/patient/Bookings"));
const PatientProfile = lazy(() => import("@/pages/patient/Profile"));

// Nurse pages
const NurseDashboard = lazy(() => import("@/pages/nurse/Dashboard"));
const NurseSchedule = lazy(() => import("@/pages/nurse/Schedule"));
const NurseBookings = lazy(() => import("@/pages/nurse/Bookings"));
const NurseProfile = lazy(() => import("@/pages/nurse/Profile"));
const NurseRegister = lazy(() => import("@/pages/nurse/Register"));
const MedicalStaffRegisterPage = lazy(
  () => import("@/pages/MedicalStaffRegisterPage"),
);
const PatientRegisterPage = lazy(() => import("@/pages/PatientRegisterPage"));

// Article pages
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage"));
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetailPage"));
const ApotekPage = lazy(() => import("@/pages/ApotekPage"));

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminNurses = lazy(() => import("@/pages/admin/Nurses"));
const AdminBookings = lazy(() => import("@/pages/admin/Bookings"));
const AdminServices = lazy(() => import("@/pages/admin/Services"));
const AdminPricing = lazy(() => import("@/pages/admin/Pricing"));
const AdminPatients = lazy(() => import("@/pages/admin/Patients"));
const AdminActivityLog = lazy(() => import("@/pages/admin/ActivityLog"));
const AdminFinancialReport = lazy(
  () => import("@/pages/admin/FinancialReport"),
);
const AdminPharmacyManagement = lazy(
  () => import("@/pages/admin/PharmacyManagement"),
);
const AdminPlatformSettings = lazy(
  () => import("@/pages/admin/PlatformSettings"),
);
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <LoadingSpinner size="lg" label="Memuat halaman..." />
  </div>
);

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});
const serviceCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$category",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServiceCategoryPage />
    </Suspense>
  ),
});

// Patient routes
const patientDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="patient">
        <PatientDashboard />
      </RoleGuard>
    </Suspense>
  ),
});

const patientServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="patient">
        <PatientServices />
      </RoleGuard>
    </Suspense>
  ),
});

const patientBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="patient">
        <PatientBookings />
      </RoleGuard>
    </Suspense>
  ),
});

const patientProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="patient">
        <PatientProfile />
      </RoleGuard>
    </Suspense>
  ),
});

// Nurse routes
const nurseDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="nurse">
        <NurseDashboard />
      </RoleGuard>
    </Suspense>
  ),
});

const nurseScheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/schedule",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="nurse">
        <NurseSchedule />
      </RoleGuard>
    </Suspense>
  ),
});

const nurseBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="nurse">
        <NurseBookings />
      </RoleGuard>
    </Suspense>
  ),
});

const nurseProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="nurse">
        <NurseProfile />
      </RoleGuard>
    </Suspense>
  ),
});

const patientRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PatientRegisterPage />
    </Suspense>
  ),
});

const medicalStaffRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/medical-staff/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MedicalStaffRegisterPage />
    </Suspense>
  ),
});

const nurseRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NurseRegister />
    </Suspense>
  ),
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminDashboard />
      </RoleGuard>
    </Suspense>
  ),
});

const adminNursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/nurses",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminNurses />
      </RoleGuard>
    </Suspense>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminBookings />
      </RoleGuard>
    </Suspense>
  ),
});

const adminServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminServices />
      </RoleGuard>
    </Suspense>
  ),
});

const adminPatientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/patients",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminPatients />
      </RoleGuard>
    </Suspense>
  ),
});

const adminPricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminPricing />
      </RoleGuard>
    </Suspense>
  ),
});

const adminActivityLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/activity-log",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminActivityLog />
      </RoleGuard>
    </Suspense>
  ),
});

const adminFinancialReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/financial-report",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminFinancialReport />
      </RoleGuard>
    </Suspense>
  ),
});

const adminPharmacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/pharmacy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminPharmacyManagement />
      </RoleGuard>
    </Suspense>
  ),
});

const adminPlatformSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/platform-settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminPlatformSettings />
      </RoleGuard>
    </Suspense>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowedRole="admin">
        <AdminUsersPage />
      </RoleGuard>
    </Suspense>
  ),
});

const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ArticlesPage />
    </Suspense>
  ),
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ArticleDetailPage />
    </Suspense>
  ),
});

const apotekRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apotek",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ApotekPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  serviceCategoryRoute,
  patientDashboardRoute,
  patientServicesRoute,
  patientBookingsRoute,
  patientProfileRoute,
  nurseDashboardRoute,
  nurseScheduleRoute,
  nurseBookingsRoute,
  nurseProfileRoute,
  patientRegisterRoute,
  medicalStaffRegisterRoute,
  nurseRegisterRoute,
  adminDashboardRoute,
  adminNursesRoute,
  adminBookingsRoute,
  adminServicesRoute,
  adminPricingRoute,
  adminPatientsRoute,
  adminActivityLogRoute,
  adminFinancialReportRoute,
  adminPharmacyRoute,
  adminPlatformSettingsRoute,
  adminUsersRoute,
  articlesRoute,
  articleDetailRoute,
  apotekRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
