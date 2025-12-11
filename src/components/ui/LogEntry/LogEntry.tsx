import clsx from 'clsx';

interface LogEntryProps {
  timestamp: string;
  level: 'info' | 'warning' | 'danger';
  message: string;
}

const LEVEL_COLORS = {
  info: 'text-info',
  warning: 'text-warning',
  danger: 'text-danger',
};

export function LogEntry({ timestamp, level, message }: LogEntryProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 border-b border-slate-700 py-2">
      <span className="font-mono text-xs text-slate-400">{timestamp}</span>
      <span className={clsx('font-mono text-sm', LEVEL_COLORS[level])}>
        [{level.toUpperCase()}] {message}
      </span>
    </div>
  );
}
