'use client';

import type { LayoutType } from '@/lib/types';
import { cn } from '@/lib/utils';

const LAYOUTS: { value: LayoutType; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'modern', label: 'Modern' },
  { value: 'simplistic', label: 'Simplistic' },
  { value: 'sleek', label: 'Sleek' },
];

function Thumb({ layout }: { layout: LayoutType }) {
  const line = (w: string) => (
    <div className="rounded-full" style={{ height: 3, width: w, background: 'var(--hairline-strong)' }} />
  );
  return (
    <div className="w-full h-20 rounded-lg flex items-center justify-center p-2" style={{ background: 'var(--bg)' }}>
      {layout === 'default' && (
        <div className="flex flex-col items-center gap-1.5 rounded-md px-3 py-2" style={{ border: '1px solid var(--hairline)' }}>
          <div className="w-5 h-5 rounded-full" style={{ background: 'var(--hairline-strong)' }} />
          {line('28px')}
          <div className="flex gap-1">{line('10px')}{line('10px')}</div>
        </div>
      )}
      {layout === 'modern' && (
        <div className="flex flex-col items-center gap-1.5 rounded-md px-3 py-2 w-[64px]" style={{ border: '1px solid var(--hairline)' }}>
          <div className="flex gap-1 w-full">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--accent-red)', opacity: 0.6 }} />
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--hairline-strong)' }} />
          </div>
          <div className="w-5 h-5 rounded-full" style={{ background: 'var(--hairline-strong)' }} />
          {line('24px')}
        </div>
      )}
      {layout === 'simplistic' && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-5 h-5 rounded-full" style={{ background: 'var(--hairline-strong)' }} />
          {line('22px')}
          <div className="flex flex-col gap-1 mt-0.5">
            <div className="w-12 h-2 rounded" style={{ border: '1px solid var(--hairline)' }} />
            <div className="w-12 h-2 rounded" style={{ border: '1px solid var(--hairline)' }} />
          </div>
        </div>
      )}
      {layout === 'sleek' && (
        <div className="flex flex-col gap-1 rounded-md overflow-hidden w-[64px]" style={{ border: '1px solid var(--hairline)' }}>
          <div className="w-full h-4" style={{ background: 'var(--hairline-strong)' }} />
          <div className="flex items-end gap-1 px-2 -mt-2">
            <div className="w-4 h-4 rounded-full" style={{ background: 'var(--surface-elevated)', border: '1px solid var(--hairline)' }} />
          </div>
          <div className="px-2 pb-2 flex flex-col gap-1">{line('30px')}</div>
        </div>
      )}
    </div>
  );
}

export default function LayoutSelector({
  value,
  onChange,
}: {
  value: LayoutType;
  onChange: (v: LayoutType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {LAYOUTS.map((l) => {
        const active = l.value === value;
        return (
          <button
            key={l.value}
            type="button"
            onClick={() => onChange(l.value)}
            className={cn('rounded-xl p-2 text-left transition-colors duration-200')}
            style={{
              background: active ? 'var(--surface-elevated)' : 'var(--surface)',
              border: `1px solid ${active ? 'var(--hairline-strong)' : 'var(--hairline)'}`,
            }}
          >
            <Thumb layout={l.value} />
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-[13px]" style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {l.label}
              </span>
              {active && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-red)' }} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
