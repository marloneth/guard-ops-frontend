import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import { type Permission, ROLE_PERMISSIONS } from '@/constants/roles';

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: Permission[];
  requireAll?: boolean; // If true, user needs ALL permissions. If false, ANY permission is enough
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const auth = useContext(AuthContext);

  console.log({ auth });
  if (!auth?.user?.role) {
    return fallback;
  }

  const userPermissions =
    ROLE_PERMISSIONS[auth.user.role as keyof typeof ROLE_PERMISSIONS];

  console.log({ userPermissions });

  if ((userPermissions as any).includes('*')) {
    return <>{children}</>;
  }

  const hasPermission = requireAll
    ? permissions.every((permission) =>
        (userPermissions as unknown as string[]).includes(permission)
      )
    : permissions.some((permission) =>
        (userPermissions as unknown as string[]).includes(permission)
      );

  if (!hasPermission) {
    return fallback;
  }

  return <>{children}</>;
}

// Exports are handled in index.ts
