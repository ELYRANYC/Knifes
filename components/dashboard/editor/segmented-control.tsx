'use client';

import { cn } from '@/lib/utils';

export type Segment<T extends string> = {
  value: T;
  label?: string;
  icon?: React.ReactNode;
};

export default function SegmentedControl<T extends string>({
  label,
  value,
  segments,
  onChange,
  size = 'md',
}: {
  label?: string;
  value: T;
  segments: Segment<T>[];
  onChange: (v: T) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="w-full">
      {label && <label className="field-label">{label}</label>}
      <div
        className="inline-flex w-full rounded-xl p-1 gap-1"
        style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
      >
        {segments.map((seg) => {
          const active = seg.value === value;
          return (
            <button
              key={seg.value}
              type="button"
              onClick={() => onChange(seg.value)}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg transition-all duration-200',
                size === 'sm' ? 'px-2.5 py-1.5 text-[12px]' : 'px-3 py-2 text-[13px]',
              )}
              style={{
                background: active ? 'var(--surface-elevated)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: active ? '1px solid var(--hairline)' : '1px solid transparent',
                fontWeight: active ? 500 : 400,
              }}
            >
              {seg.icon}
              {seg.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
