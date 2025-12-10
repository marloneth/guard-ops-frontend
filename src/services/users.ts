import { API_ENDPOINTS } from '@/config/endpoints';

import { apiClient } from './apiClient';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  name?: string;
  password: string;
  role?: string;
}

export interface UpdateUserData {
  name?: string;
  role?: string;
}

export const usersApi = {
  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>(API_ENDPOINTS.USERS.LIST);
  },

  async getUser(id: string): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.GET(id));
  },

  async createUser(userData: CreateUserData): Promise<User> {
    return apiClient.post<User>(API_ENDPOINTS.USERS.CREATE, userData);
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    return apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE(id), userData);
  },

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.USERS.DELETE(id));
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
  },
};
