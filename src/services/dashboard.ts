import { API_ENDPOINTS } from '@/config/endpoints';

import { apiClient } from './apiClient';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalLogs: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export interface ActivityItem {
  id: string;
  type: 'login' | 'logout' | 'user_created' | 'system_event';
  message: string;
  timestamp: string;
  userId?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export const dashboardApi = {
  async getStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    return apiClient.get<ActivityItem[]>(
      API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITY
    );
  },

  async getUsersChart(): Promise<ChartData> {
    return apiClient.get<ChartData>(API_ENDPOINTS.DASHBOARD.CHARTS.USERS);
  },

  async getRevenueChart(): Promise<ChartData> {
    return apiClient.get<ChartData>(API_ENDPOINTS.DASHBOARD.CHARTS.REVENUE);
  },

  async getPerformanceChart(): Promise<ChartData> {
    return apiClient.get<ChartData>(API_ENDPOINTS.DASHBOARD.CHARTS.PERFORMANCE);
  },
};
