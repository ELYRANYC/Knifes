'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  preview?: React.ReactNode;
};

export default function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select…',
}: {
  label?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="w-full" ref={ref}>
      {label && <label className="field-label">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="field flex items-center justify-between gap-2 text-left"
        >
          <span className={cn('truncate', !selected && 'text-[var(--text-tertiary)]')}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={15}
            className="flex-shrink-0 transition-transform duration-200"
            style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none' }}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              className="absolute z-50 mt-1.5 w-full max-h-64 overflow-auto no-scrollbar rounded-xl p-1"
              style={{
                background: 'var(--surface-elevated)',
                border: '1px solid var(--hairline)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              }}
            >
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[14px] text-left transition-colors hover:bg-white/[0.06]"
                    style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {opt.preview}
                      {opt.label}
                    </span>
                    {active && <Check size={14} style={{ color: 'var(--text-primary)' }} />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
