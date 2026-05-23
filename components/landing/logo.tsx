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
      style={{ fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}
    >
      {showIcon && (
        <Slice
          size={s.icon}
          strokeWidth={2.4}
          style={{
            color: '#ff0033',
            filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.7))',
          }}
        />
      )}
      <span className={s.text} style={{ textShadow: '0 0 14px rgba(255,0,51,0.28)' }}>
        knives<span style={{ color: '#ff0033', textShadow: '0 0 12px #ff0033' }}>.lol</span>
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
