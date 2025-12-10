import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Sensors', path: '/sensors', icon: '🛰️' },
  { label: 'Incidents', path: '/incidents', icon: '⚠️' },
  { label: 'Logs', path: '/logs', icon: '📜' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-800 bg-slate-900">
      <div className="p-4 text-xl font-bold text-primary-400">GuardOps</div>

      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm',
                'text-slate-300 transition-colors hover:bg-slate-800',
                isActive && 'bg-primary-700/20 text-primary-400'
              )
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
