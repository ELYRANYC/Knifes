'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = ['#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#0a84ff', '#bf5af2', '#f5f5f7', '#000000'];

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const r = parseInt(c.slice(0, 2), 16) / 255 || 0;
  const g = parseInt(c.slice(2, 4), 16) / 255 || 0;
  const b = parseInt(c.slice(4, 6), 16) / 255 || 0;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

export default function ColorPicker({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);
  const { h, s, v } = hexToHsv(value || '#000000');

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const handleSV = (clientX: number, clientY: number) => {
    const el = svRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ns = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const nv = Math.min(1, Math.max(0, 1 - (clientY - rect.top) / rect.height));
    onChange(hsvToHex(h, ns, nv));
  };

  const startSV = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handleSV(e.clientX, e.clientY);
  };
  const moveSV = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    handleSV(e.clientX, e.clientY);
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center justify-between gap-3">
        {label && <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{label}</span>}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hairline)' }}
        >
          <span
            className="w-5 h-5 rounded-md"
            style={{
              background: value,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
            }}
          />
          <span className="text-[12px] font-mono uppercase" style={{ color: 'var(--text-secondary)' }}>
            {value}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 z-50 mt-2 w-60 rounded-xl p-3"
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--hairline)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div
              ref={svRef}
              onPointerDown={startSV}
              onPointerMove={moveSV}
              className="relative w-full h-32 rounded-lg mb-3 cursor-crosshair touch-none"
              style={{
                background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hsvToHex(h, 1, 1)})`,
              }}
            >
              <span
                className="absolute w-3 h-3 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, boxShadow: '0 0 0 1px rgba(0,0,0,0.4)' }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={360}
              value={h}
              onChange={(e) => onChange(hsvToHex(parseInt(e.target.value, 10), s, v))}
              className="apple-range w-full mb-3"
              style={{
                background:
                  'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
              }}
            />

            <div className="flex items-center gap-2 mb-3">
              <input
                value={value}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#?[0-9a-fA-F]{0,6}$/.test(val)) onChange(val.startsWith('#') ? val : `#${val}`);
                }}
                className="field font-mono text-[12px] uppercase"
                style={{ padding: '8px 10px' }}
              />
            </div>

            <div className="grid grid-cols-9 gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onChange(p)}
                  className="w-full aspect-square rounded-md"
                  style={{ background: p, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}
                  aria-label={p}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
