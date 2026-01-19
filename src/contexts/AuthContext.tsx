import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { type User, authApi } from '@/services/auth';
import { logout } from '@/utils/authUtils';
import { tokenStorage } from '@/utils/tokenStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const refreshAuth = useCallback(async () => {
    try {
      const authState = tokenStorage.getAuthState();
      if (authState.isAuthenticated && authState.user) {
        setUser(authState.user);
      } else if (authState.accessToken && authState.refreshToken) {
        // We have tokens but no user data, fetch it
        const userData = await authApi.getCurrentUser();
        tokenStorage.saveAuthData(
          authState.accessToken,
          authState.refreshToken,
          userData
        );
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to refresh auth:', error);
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    logout: logoutUser,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
