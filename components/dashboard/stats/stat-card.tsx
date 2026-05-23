'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: number | null;
}) {
  const showDelta = typeof delta === 'number' && Number.isFinite(delta);
  const up = (delta ?? 0) >= 0;
  return (
    <div className="dash-card p-5">
      <div className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-semibold tabular-nums" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {showDelta && (
          <span
            className="inline-flex items-center gap-0.5 text-[12px] mb-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta as number)}%
          </span>
        )}
      </div>
    </div>
  );
}
