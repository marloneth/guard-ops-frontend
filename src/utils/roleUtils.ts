import type { RoleName } from '@/constants/roles';

export const ROLE_HIERARCHY: Record<RoleName, number> = {
  GUARD: 1,
  SUPERVISOR: 2,
  ADMIN: 3,
} as const;

export function hasRequiredRole(userRole: string | null, requiredRoles: RoleName[]): boolean {
  if (!userRole) return false;
  
  const userRoleLevel = ROLE_HIERARCHY[userRole as RoleName];
  
  return requiredRoles.some(role => {
    const requiredLevel = ROLE_HIERARCHY[role];
    return userRoleLevel >= requiredLevel;
  });
}