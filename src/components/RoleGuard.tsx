import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import { hasRequiredRole } from '@/utils/roleUtils';

import type { RoleName } from '@/constants/roles';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: RoleName[];
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) {
  const auth = useContext(AuthContext);

  if (!auth?.user?.role) {
    return fallback;
  }

  if (!hasRequiredRole(auth.user.role, allowedRoles)) {
    return fallback;
  }

  return <>{children}</>;
}

// Exports are handled in index.ts
