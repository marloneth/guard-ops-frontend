import { Link } from '@tanstack/react-router';

import { useLogout } from '@/hooks/useLogout';
import { PermissionGuard } from '@/components/PermissionGuard/index';
import { PERMISSIONS } from '@/constants/roles';

const publicItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Sensors', path: '/sensors', icon: '🛰️' },
  { label: 'Incidents', path: '/incidents', icon: '⚠️' },
  { label: 'Logs', path: '/logs', icon: '📜' },
];

const adminItems = [
  { label: 'Users', path: '/dashboard/users', icon: '👥' },
  { label: 'Roles', path: '/dashboard/roles', icon: '👔' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-800 bg-slate-900">
      <div className="p-4 text-xl font-bold text-primary-400">GuardOps</div>

      <nav className="flex-1 space-y-1 px-2">
        {publicItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            activeProps={{
              className: 'bg-primary-700/20 text-primary-400',
            }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        
        <PermissionGuard 
          permissions={[
            PERMISSIONS.USER_CREATE, 
            PERMISSIONS.USER_VIEW, 
            PERMISSIONS.USER_UPDATE,
            PERMISSIONS.USER_DELETE
          ]} 
          requireAll={false}
        >
          <div className="border-t border-slate-800 my-2"></div>
          {adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              activeProps={{
                className: 'bg-primary-700/20 text-primary-400',
              }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </PermissionGuard>
      </nav>

      <div className="border-t border-slate-800 p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-red-900/20 hover:text-red-400"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
