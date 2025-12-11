import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { authApi } from '@/services/auth';

import { tokenStorage } from '../utils/tokenStorage';

interface UseLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useLogout(options: UseLogoutOptions = {}) {
  const { logout: logoutFromContext } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      // Clear tokens from storage
      tokenStorage.clearAuthData();

      // Update auth context to clear user state
      logoutFromContext();

      // Call custom success callback
      options.onSuccess?.();
    },
    onError: (error) => {
      // Even if API call fails, we should still clear local auth data
      tokenStorage.clearAuthData();
      logoutFromContext();

      // Call custom error callback
      options.onError?.(error);
    },
  });

  return {
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending,
    isSuccess: logoutMutation.isSuccess,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
    reset: logoutMutation.reset,
  };
}
