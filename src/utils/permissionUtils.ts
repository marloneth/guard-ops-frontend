import { type Permission } from '@/constants/roles';

export function hasPermission(userPermissions: (string | Permission)[], requiredPermission: Permission): boolean {
  return userPermissions.includes('*') || userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(userPermissions: (string | Permission)[], requiredPermissions: Permission[]): boolean {
  return userPermissions.includes('*') || requiredPermissions.some(permission => userPermissions.includes(permission));
}

export function hasAllPermissions(userPermissions: (string | Permission)[], requiredPermissions: Permission[]): boolean {
  return userPermissions.includes('*') || requiredPermissions.every(permission => userPermissions.includes(permission));
}