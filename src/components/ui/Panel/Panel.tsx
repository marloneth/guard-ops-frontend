import clsx from 'clsx';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Panel({ children, className, title }: PanelProps) {
  return (
    <div
      className={clsx(
        'rounded-md border border-slate-700 bg-slate-800 p-4 shadow-card',
        className
      )}
    >
      {title && <h3 className="mb-3 font-semibold text-slate-200">{title}</h3>}
      {children}
    </div>
  );
}
