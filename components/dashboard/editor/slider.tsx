'use client';

export default function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  suffix,
  format,
}: {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  format?: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : `${value}${suffix ?? ''}`;
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            {label}
          </span>
          <span className="text-[12px] tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
            {display}
          </span>
        </div>
      )}
      <input
        type="range"
        className="apple-range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(to right, #fff 0%, #fff ${pct}%, var(--hairline-strong) ${pct}%, var(--hairline-strong) 100%)`,
        }}
      />
    </div>
  );
}
