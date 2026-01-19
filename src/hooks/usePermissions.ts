import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import {
  PERMISSIONS,
  type Permission,
  ROLE_PERMISSIONS,
} from '@/constants/roles';

export function usePermissions(): Permission[] {
  const auth = useContext(AuthContext);

  if (!auth?.user?.role) return [];

  const userPermissions =
    ROLE_PERMISSIONS[auth.user.role as keyof typeof ROLE_PERMISSIONS];

  return (userPermissions as any).includes('*')
    ? (Object.values(PERMISSIONS) as Permission[])
    : (userPermissions as unknown as Permission[]);
}
