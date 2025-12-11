import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

import { type ReactNode } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      danger: 'text-danger',
      success: 'text-green-600',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    as: {
      p: '',
      span: '',
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
    as: 'span',
  },
});

export interface TextProps extends VariantProps<typeof textVariants> {
  className?: string;
  children: ReactNode;
}

export function Text({
  variant,
  size,
  weight,
  as: Tag = 'span',
  className,
  children,
}: TextProps) {
  if (!Tag) return null;

  return (
    <Tag className={clsx(textVariants({ variant, size, weight }), className)}>
      {children}
    </Tag>
  );
}
