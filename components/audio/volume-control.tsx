'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

export default function VolumeControl({ accentColor }: { accentColor: string }) {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rgb = hexToRgb(accentColor);

  useEffect(() => {
    const v = parseFloat(localStorage.getItem('knives:volume') ?? '');
    const m = localStorage.getItem('knives:muted') === '1';
    if (Number.isFinite(v)) setVolume(v);
    setMuted(m);

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ volume: number; muted: boolean }>).detail;
      if (typeof detail.volume === 'number') setVolume(detail.volume);
      if (typeof detail.muted === 'boolean') setMuted(detail.muted);
    };
    window.addEventListener('knives:volume-update', onUpdate);
    return () => window.removeEventListener('knives:volume-update', onUpdate);
  }, []);

  const dispatch = (v: number, m: boolean) => {
    window.dispatchEvent(
      new CustomEvent('knives:set-volume', { detail: { volume: v, muted: m } }),
    );
    localStorage.setItem('knives:volume', String(v));
    localStorage.setItem('knives:muted', m ? '1' : '0');
  };

  const onSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    dispatch(v, v === 0);
  };

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    dispatch(volume, m);
  };

  const hoverOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  const Icon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      ref={containerRef}
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      className="fixed bottom-4 right-4 z-[100]"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-12 right-0 glass px-3 py-3 flex flex-col items-center gap-2"
            style={{
              borderColor: `rgba(${rgb}, 0.3)`,
              boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 14px rgba(${rgb}, 0.2)`,
            }}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={onSlide}
              className="neon-range"
              style={{
                writingMode: 'bt-lr' as unknown as 'horizontal-tb',
                WebkitAppearance: 'slider-vertical',
                width: 6,
                height: 100,
                ['--accent' as string]: accentColor,
              }}
              aria-label="Volume"
            />
            <span className="text-[10px] tabular-nums" style={{ color: 'rgba(240,240,245,0.55)' }}>
              {Math.round((muted ? 0 : volume) * 100)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="w-10 h-10 rounded-full glass flex items-center justify-center transition-transform hover:scale-110"
        style={{
          borderColor: `rgba(${rgb}, 0.3)`,
          color: accentColor,
          boxShadow: `0 0 14px rgba(${rgb}, 0.25)`,
        }}
      >
        <Icon size={16} />
      </button>
    </motion.div>
  );
}
