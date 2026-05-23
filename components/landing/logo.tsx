import Link from 'next/link';
import { Slice } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  showIcon?: boolean;
};

const SIZES = {
  sm: { text: 'text-[14px]', icon: 14 },
  md: { text: 'text-[18px]', icon: 18 },
  lg: { text: 'text-[22px]', icon: 22 },
} as const;

export default function Logo({ size = 'md', href = '/', className, showIcon = true }: Props) {
  const s = SIZES[size];
  const content = (
    <span
      className={cn('inline-flex items-center gap-2 select-none', className)}
      style={{ fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
    >
      {showIcon && (
        <Slice
          size={s.icon}
          strokeWidth={2.2}
          style={{ color: 'var(--text-primary)', opacity: 0.85 }}
        />
      )}
      <span className={s.text}>
        knives<span style={{ color: 'var(--text-tertiary)' }}>.lol</span>
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  );
}
