import clsx from 'clsx';

interface StatusBadgeProps {
  status: 'critical' | 'warning' | 'secure' | 'offline';
}

const STYLES = {
  critical: 'bg-danger text-white',
  warning: 'bg-warning text-black',
  secure: 'bg-success text-white',
  offline: 'bg-slate-500 text-white',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        'rounded px-2 py-0.5 text-xs font-semibold',
        STYLES[status]
      )}
    >
      {status.toUpperCase()}
    </span>
  );
}
