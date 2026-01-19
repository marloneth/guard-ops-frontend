import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import type { RoleName } from '@/constants/roles';

export function useRole(): RoleName | null {
  const auth = useContext(AuthContext);
  return auth?.user?.role || null;
}
