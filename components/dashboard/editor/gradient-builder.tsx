'use client';

import type { GradientConfig } from '@/lib/types';
import ColorPicker from './color-picker';
import Slider from './slider';

export default function GradientBuilder({
  value,
  onChange,
}: {
  value: GradientConfig;
  onChange: (g: GradientConfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-12 w-full rounded-lg"
        style={{
          background: `linear-gradient(${value.angle}deg, ${value.from}, ${value.to})`,
          border: '1px solid var(--hairline)',
        }}
      />
      <ColorPicker label="From" value={value.from} onChange={(from) => onChange({ ...value, from })} />
      <ColorPicker label="To" value={value.to} onChange={(to) => onChange({ ...value, to })} />
      <Slider
        label="Angle"
        value={value.angle}
        min={0}
        max={360}
        suffix="°"
        onChange={(angle) => onChange({ ...value, angle })}
      />
    </div>
  );
}
