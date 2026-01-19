# Backend JWT Token Enhancement Guide

## Issue
Currently the frontend only receives `roleId` from the JWT token, but needs `roleName` for:
- Role-based UI components
- Permission checking
- Navigation visibility
- Better user experience

## Recommended Backend Changes

### 1. Update JWT Token Payload
When creating access tokens, include the role name:

```typescript
// In your auth service (e.g., authService.ts)
import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';

export function generateAccessToken(user: User & { role: Role }): string {
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    roleId: user.roleId,
    roleName: user.role.name, // ✅ ADD THIS
    permissions: ROLE_PERMISSIONS[user.role.name], // Optional: include permissions
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (15 * 60), // 15 minutes
    type: 'access'
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
  });
}
```

### 2. Update JWT Payload Type

```typescript
// In types/auth.ts or similar
export interface JwtPayload {
  sub: string; // user id
  email: string;
  roleId: number;
  roleName: 'ADMIN' | 'SUPERVISOR' | 'GUARD'; // ✅ ADD THIS
  permissions?: string[]; // Optional
  iat: number;
  exp: number;
  type: 'access' | 'refresh';
}
```

### 3. Update Auth Endpoint Response
The login/refresh endpoints should return user data with role information:

```typescript
// In auth.controller.ts
@Post('login')
async login(@Body() loginDto: LoginDto) {
  const { user, accessToken, refreshToken } = await this.authService.login(loginDto);
  
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      roleName: user.role.name, // ✅ ADD THIS
    },
    accessToken,
    refreshToken,
  };
}
```

### 4. Update Auth Service Login Method
```typescript
// In auth.service.ts
async login(loginDto: LoginDto) {
  const user = await this.validateUser(loginDto.email, loginDto.password);
  
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const accessToken = this.generateAccessToken(user);
  const refreshToken = this.generateRefreshToken(user);

  // Remove sensitive data
  const { passwordHash, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
}
```

### 5. Update User Queries to Include Role
Make sure your user queries include the role information:

```typescript
// In your auth service or repository
async findById(id: string): Promise<User | null> {
  return this.prisma.user.findUnique({
    where: { id },
    include: {
      role: true, // ✅ IMPORTANT: Include role
    },
  });
}
```

## Benefits of This Approach

1. **Immediate Role Access** - Frontend has role info immediately after login
2. **No Extra API Calls** - No need for separate user data fetch just to get role name
3. **Better Performance** - Faster UI rendering, no loading states for role-based components
4. **Security** - Role-based authorization happens client-side with same token
5. **User Experience** - Immediate navigation updates and proper UI visibility
6. **Consistency** - Backend and frontend use same role names (ADMIN, SUPERVISOR, GUARD)

## Testing
After implementing these changes:

1. Frontend should have `user.roleName` populated immediately after login
2. Role-based navigation should work without API calls
3. Permission guards should function correctly
4. Token payload should include: `sub`, `email`, `roleId`, `roleName`, `permissions`

## Migration Path
1. Update backend JWT generation first
2. Test token payload contains roleName
3. Verify frontend receives and uses roleName correctly
4. Remove any API calls that were just fetching user role data

This is the standard practice for JWT-based authentication and authorization.