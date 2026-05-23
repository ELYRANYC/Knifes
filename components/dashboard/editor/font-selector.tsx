'use client';

import type { FontFamily } from '@/lib/types';
import { fontVarFromKey } from '@/lib/utils';
import Select from './select';

const FONTS: { value: FontFamily; label: string }[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'jetbrains-mono', label: 'JetBrains Mono' },
  { value: 'space-grotesk', label: 'Space Grotesk' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'orbitron', label: 'Orbitron' },
  { value: 'caveat', label: 'Caveat' },
];

export default function FontSelector({
  value,
  onChange,
  label = 'Font',
}: {
  value: FontFamily;
  onChange: (v: FontFamily) => void;
  label?: string;
}) {
  return (
    <Select<FontFamily>
      label={label}
      value={value}
      onChange={onChange}
      options={FONTS.map((f) => ({
        value: f.value,
        label: f.label,
        preview: (
          <span
            style={{ fontFamily: fontVarFromKey(f.value), fontSize: 15, color: 'var(--text-primary)' }}
            aria-hidden
          >
            Aa
          </span>
        ),
      }))}
    />
  );
}
