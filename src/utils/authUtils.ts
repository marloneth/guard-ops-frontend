import { authApi } from '@/services/auth';

import { tokenStorage } from './tokenStorage';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Add subscriber to be notified when token is refreshed
function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// Notify all subscribers that token has been refreshed
function notifyRefreshSubscribers(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// Refresh the access token
export async function refreshAccessToken(): Promise<string> {
  if (isRefreshing) {
    // If already refreshing, wait for it to complete
    return new Promise((resolve) => {
      addRefreshSubscriber(resolve);
    });
  }

  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  isRefreshing = true;

  try {
    const response = await authApi.refreshToken(refreshToken);

    // Update the access token
    tokenStorage.updateAccessToken(response.accessToken);

    // Notify all waiting subscribers
    notifyRefreshSubscribers(response.accessToken);

    return response.accessToken;
  } catch (error) {
    // Refresh failed, clear all auth data
    tokenStorage.clearAuthData();
    throw error;
  } finally {
    isRefreshing = false;
  }
}

// Logout function
export function logout() {
  tokenStorage.clearAuthData();
  // Optionally call logout endpoint
  authApi.logout().catch(console.error);
  // Redirect to login page
  window.location.href = '/login';
}
