'use client';

function flag(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  const cc = code.toUpperCase();
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (cc.charCodeAt(0) - 65), A + (cc.charCodeAt(1) - 65));
}

export default function CountriesList({ data }: { data: { country: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="dash-card p-5">
      <div className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Top countries
      </div>
      {data.length === 0 ? (
        <p className="text-[13px] py-8 text-center" style={{ color: 'var(--text-tertiary)' }}>
          No data yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {data.map((d) => (
            <div key={d.country} className="flex items-center gap-3">
              <span className="text-[16px] w-6 text-center">{flag(d.country)}</span>
              <span className="text-[13px] w-10" style={{ color: 'var(--text-primary)' }}>
                {d.country || '—'}
              </span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
                <div className="h-full rounded-full" style={{ width: `${(d.count / max) * 100}%`, background: 'rgba(245,245,247,0.7)' }} />
              </div>
              <span className="text-[12px] tabular-nums w-8 text-right" style={{ color: 'var(--text-tertiary)' }}>
                {d.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
