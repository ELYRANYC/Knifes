'use client';

import { cn } from '@/lib/utils';

export default function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}) {
  const sw = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex h-[26px] w-[44px] flex-shrink-0 rounded-full p-[3px]',
        'transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      style={{ background: checked ? 'var(--accent-red)' : 'rgba(255,255,255,0.14)' }}
    >
      <span
        className="h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: checked ? 'translateX(18px)' : 'translateX(0)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      />
    </button>
  );

  if (!label) return sw;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
          {label}
        </div>
        {description && (
          <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </div>
        )}
      </div>
      {sw}
    </div>
  );
}
