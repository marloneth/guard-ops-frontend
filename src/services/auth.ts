import { API_ENDPOINTS } from '@/config/endpoints';

import type { LoginFormState } from '@/types/loginForm';

import { apiClient } from './apiClient';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'ADMIN' | 'SUPERVISOR' | 'GUARD';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const authApi = {
  async login(credentials: LoginFormState): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async logout(): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  async register(
    userData: Omit<LoginFormState, 'password'> & { password: string }
  ): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  async forgotPassword(email: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
  },
};
