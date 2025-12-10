export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    REGISTER: '/api/auth/register',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },

  // User management endpoints
  USERS: {
    LIST: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    PROFILE: '/api/users/profile',
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    RECENT_ACTIVITY: '/api/dashboard/activity',
    CHARTS: {
      USERS: '/api/dashboard/charts/users',
      REVENUE: '/api/dashboard/charts/revenue',
      PERFORMANCE: '/api/dashboard/charts/performance',
    },
  },

  // Settings endpoints
  SETTINGS: {
    GENERAL: '/api/settings/general',
    SECURITY: '/api/settings/security',
    NOTIFICATIONS: '/api/settings/notifications',
    PREFERENCES: '/api/settings/preferences',
  },

  // Logs endpoints
  LOGS: {
    LIST: '/api/logs',
    SEARCH: '/api/logs/search',
    EXPORT: '/api/logs/export',
    DETAILS: (id: string) => `/api/logs/${id}`,
  },

  // System endpoints
  SYSTEM: {
    HEALTH: '/api/system/health',
    INFO: '/api/system/info',
    METRICS: '/api/system/metrics',
  },
} as const;

// Type helpers for endpoint paths
export type AuthEndpoint = keyof typeof API_ENDPOINTS.AUTH;
export type UsersEndpoint = keyof typeof API_ENDPOINTS.USERS;
export type DashboardEndpoint = keyof typeof API_ENDPOINTS.DASHBOARD;
export type SettingsEndpoint = keyof typeof API_ENDPOINTS.SETTINGS;
export type LogsEndpoint = keyof typeof API_ENDPOINTS.LOGS;
export type SystemEndpoint = keyof typeof API_ENDPOINTS.SYSTEM;
