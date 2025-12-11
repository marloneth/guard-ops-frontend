import clsx from 'clsx';

import { Text } from '../Text/Text';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  className,
  label = '',
  error = '',
  id,
  ...props
}: InputProps) {
  return (
    <div>
      {!!label && (
        <label htmlFor={id} className="mb-1 block">
          <Text>{label}</Text>
        </label>
      )}

      <input
        id={id}
        className={clsx(
          'border border-slate-700 bg-slate-900 text-slate-200 placeholder-slate-500',
          'rounded-md px-3 py-2 text-sm outline-none',
          'focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
          className
        )}
        {...props}
      />

      {!!error && (
        <Text variant="danger" size="sm">
          {error}
        </Text>
      )}
    </div>
  );
}
