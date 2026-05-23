'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  tertiary: 'btn-tertiary',
};

const SIZE_CLASS: Record<Size, string> = {
  sm: 'text-[13px] px-4 py-2',
  md: 'text-[14px] px-6 py-3',
  lg: 'text-[15px] px-7 py-3.5',
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  fullWidth?: boolean;
  'aria-label'?: string;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  type = 'button',
  onClick,
  fullWidth,
  'aria-label': ariaLabel,
}: Props) {
  const cls = cn('btn', VARIANT_CLASS[variant], SIZE_CLASS[size], fullWidth && 'w-full', className);

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
