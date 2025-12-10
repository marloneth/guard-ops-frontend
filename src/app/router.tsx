import { RootRoute, Route, Router } from '@tanstack/react-router';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/ProtectedRoute';

import Home from './routes';
import RootLayout from './routes/_layout';
import DashboardLayout from './routes/dashboard/_layout';
import UsersIndex from './routes/dashboard/users';
import UserDetail from './routes/dashboard/users/$userId';
import Login from './routes/login';

// 1. Root route
const rootRoute = new RootRoute({
  component: RootLayout,
});

// 2. Route tree
const routeTree = rootRoute.addChildren([
  new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  }),
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
    path: '/dashboard',
    component: () => (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard/users',
    component: () => (
      <ProtectedRoute>
        <UsersIndex />
      </ProtectedRoute>
    ),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard/users/$userId',
    component: () => (
      <ProtectedRoute>
        <UserDetail />
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
