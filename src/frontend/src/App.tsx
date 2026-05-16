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

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminNurses = lazy(() => import("@/pages/admin/Nurses"));
const AdminBookings = lazy(() => import("@/pages/admin/Bookings"));
const AdminServices = lazy(() => import("@/pages/admin/Services"));
const AdminPricing = lazy(() => import("@/pages/admin/Pricing"));

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
      <PatientDashboard />
    </Suspense>
  ),
});

const patientServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PatientServices />
    </Suspense>
  ),
});

const patientBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PatientBookings />
    </Suspense>
  ),
});

const patientProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PatientProfile />
    </Suspense>
  ),
});

// Nurse routes
const nurseDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NurseDashboard />
    </Suspense>
  ),
});

const nurseScheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/schedule",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NurseSchedule />
    </Suspense>
  ),
});

const nurseBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NurseBookings />
    </Suspense>
  ),
});

const nurseProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nurse/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NurseProfile />
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
      <AdminDashboard />
    </Suspense>
  ),
});

const adminNursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/nurses",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminNurses />
    </Suspense>
  ),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bookings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBookings />
    </Suspense>
  ),
});

const adminServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminServices />
    </Suspense>
  ),
});

const adminPricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPricing />
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
  nurseRegisterRoute,
  adminDashboardRoute,
  adminNursesRoute,
  adminBookingsRoute,
  adminServicesRoute,
  adminPricingRoute,
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
