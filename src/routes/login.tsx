import { useEffect } from 'react';

import { useRouter } from '@tanstack/react-router';

import { useAuth } from '@/hooks/useAuth';

import LoginView from '../views/LoginView';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLoggedIn = () => {
    router.navigate({ to: '/dashboard' });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <LoginView onLoggedIn={handleLoggedIn} />;
}
