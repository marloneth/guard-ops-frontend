import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { type LoginResponse, authApi } from '@/services/auth';

import { tokenStorage } from '@/utils/tokenStorage';

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: Error) => void;
}

export function useLogin(options: UseLoginOptions = {}) {
  const { refreshAuth } = useAuth();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      // Save tokens to storage
      tokenStorage.saveAuthData(data.accessToken, data.refreshToken);

      // Optionally fetch user data if needed
      try {
        const user = await authApi.getCurrentUser();
        tokenStorage.saveAuthData(data.accessToken, data.refreshToken, user);
      } catch (error) {
        console.warn('Could not fetch user data:', error);
      }

      // Refresh auth context to update global state
      await refreshAuth();

      // Call custom success callback
      options.onSuccess?.(data);
    },
    onError: (error) => {
      // Call custom error callback
      options.onError?.(error);
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    error: loginMutation.error,
    data: loginMutation.data,
    reset: loginMutation.reset,
  };
}
