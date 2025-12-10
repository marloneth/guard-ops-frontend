import type { AuthState, User } from '@/services/auth';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

export const tokenStorage = {
  // Save tokens and user data
  saveAuthData(accessToken: string, refreshToken: string, user?: User): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // Get user data
  getUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Get complete auth state
  getAuthState(): AuthState {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const user = this.getUser();

    return {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken && !!refreshToken,
    };
  },

  // Clear all auth data
  clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Update access token (used after refresh)
  updateAccessToken(accessToken: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  },

  // Check if tokens exist
  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  },

  // Check if access token is expired (basic check)
  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch {
      return true; // If we can't decode, assume expired
    }
  },
};
