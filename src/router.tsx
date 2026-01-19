import { RootRoute, Route, Router } from '@tanstack/react-router';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/ProtectedRoute';
import { PermissionGuard } from '@/components/PermissionGuard/index';
import { PERMISSIONS } from '@/constants/roles';

import Home from './routes/_authenticated';
import AuthenticatedLayout from './routes/_authenticated/_layout';
import DashboardLayout from './routes/_authenticated/dashboard/_layout';
import UsersIndex from './routes/_authenticated/dashboard/users';
import UserDetail from './routes/_authenticated/dashboard/users/$userId';
import RolesIndex from './routes/_authenticated/dashboard/roles';
import RootLayout from './routes/_layout';
import Login from './routes/login';

// 1. Root route
const rootRoute = new RootRoute({
  component: RootLayout,
});

// 2. Route tree
const routeTree = rootRoute.addChildren([
  new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: () => (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <Home />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <DashboardLayout />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard/users',
    component: () => (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <UsersIndex />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard/users/$userId',
    component: () => (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <UserDetail />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard/roles',
    component: () => (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <PermissionGuard permissions={[PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE]} requireAll={false}>
            <RolesIndex />
          </PermissionGuard>
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  }),
]);

// 3. Router
export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
