import { API_ENDPOINTS } from '@/config/endpoints';

import { apiClient } from './apiClient';

export interface Role {
  id: number;
  name: 'ADMIN' | 'SUPERVISOR' | 'GUARD';
  createdAt: string;
}

export const rolesService = {
  async getAll() {
    return apiClient.get<Role[]>(API_ENDPOINTS.ROLES.LIST);
  },

  async getById(id: number) {
    return apiClient.get<Role>(API_ENDPOINTS.ROLES.GET(id));
  },

  async create(data: Omit<Role, 'id' | 'createdAt'>) {
    return apiClient.post<Role>(API_ENDPOINTS.ROLES.CREATE, data);
  },

  async update(id: number, data: Partial<Omit<Role, 'id' | 'createdAt'>>) {
    return apiClient.put<Role>(API_ENDPOINTS.ROLES.UPDATE(id), data);
  },

  async delete(id: number) {
    return apiClient.delete(API_ENDPOINTS.ROLES.DELETE(id));
  },
};
