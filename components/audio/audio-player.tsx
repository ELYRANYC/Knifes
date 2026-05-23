'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronUp, ChevronDown, Music } from 'lucide-react';
import type { AudioTrack } from '@/lib/types';
import { cn, formatDuration } from '@/lib/utils';

type Props = {
  tracks: AudioTrack[];
  autoplay?: boolean;
  initialVolume?: number;
  accentColor: string;
  unlocked: boolean;
};

export default function AudioPlayer({ tracks, autoplay, initialVolume = 0.5, accentColor, unlocked }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [titleOverflow, setTitleOverflow] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const current = tracks[index];

  const playCurrent = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const stored = parseFloat(localStorage.getItem('knives:volume') ?? '');
    const muted = localStorage.getItem('knives:muted') === '1';
    const a = audioRef.current;
    if (!a) return;
    a.volume = Number.isFinite(stored) ? stored : initialVolume;
    a.muted = muted;
  }, [initialVolume]);

  useEffect(() => {
    if (!unlocked) return;
    if (autoplay) {
      void playCurrent();
    }
  }, [unlocked, autoplay, playCurrent]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onDur = () => setDuration(a.duration || 0);
    const onEnd = () => {
      if (tracks.length > 1) {
        setIndex((i) => (i + 1) % tracks.length);
      } else {
        a.currentTime = 0;
        void a.play();
      }
    };
    const onVol = () => {
      localStorage.setItem('knives:volume', String(a.volume));
      localStorage.setItem('knives:muted', a.muted ? '1' : '0');
      window.dispatchEvent(new CustomEvent('knives:volume-update', { detail: { volume: a.volume, muted: a.muted } }));
    };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onDur);
    a.addEventListener('ended', onEnd);
    a.addEventListener('volumechange', onVol);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onDur);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('volumechange', onVol);
    };
  }, [tracks.length]);

  useEffect(() => {
    const onVol = (e: Event) => {
      const a = audioRef.current;
      if (!a) return;
      const detail = (e as CustomEvent<{ volume: number; muted: boolean }>).detail;
      if (typeof detail.volume === 'number') a.volume = detail.volume;
      if (typeof detail.muted === 'boolean') a.muted = detail.muted;
    };
    window.addEventListener('knives:set-volume', onVol);
    return () => window.removeEventListener('knives:set-volume', onVol);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) {
      void a.play().catch(() => setPlaying(false));
    }
  }, [index, playing]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    setTitleOverflow(el.scrollWidth > el.clientWidth + 4);
  }, [current?.title, current?.artist, expanded]);

  if (!current) return null;

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const next = () => setIndex((i) => (i + 1) % tracks.length);
  const prev = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
  };

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-4 left-4 z-[100] select-none"
      style={{ ['--accent' as string]: accentColor }}
    >
      <audio ref={audioRef} src={current.url} preload="metadata" />
      <motion.div
        layout
        className={cn(
          'glass overflow-hidden flex flex-col',
          expanded ? 'w-72 p-3' : 'w-64 p-2',
        )}
        style={{
          borderColor: `rgba(${hexToRgbCSS(accentColor)}, 0.25)`,
          boxShadow: `0 10px 28px rgba(0,0,0,0.45), 0 0 18px rgba(${hexToRgbCSS(accentColor)}, 0.18)`,
        }}
      >
        <div className="flex items-center gap-2">
          {current.cover ? (
            <img
              src={current.cover}
              alt=""
              className={cn('rounded-lg object-cover transition-all', expanded ? 'w-16 h-16' : 'w-10 h-10')}
            />
          ) : (
            <div
              className={cn(
                'rounded-lg flex items-center justify-center transition-all',
                expanded ? 'w-16 h-16' : 'w-10 h-10',
              )}
              style={{ background: `rgba(${hexToRgbCSS(accentColor)}, 0.16)`, color: accentColor }}
            >
              <Music size={expanded ? 22 : 14} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div ref={titleRef} className="overflow-hidden whitespace-nowrap">
              <span
                className={cn('inline-block text-[13px] font-medium', titleOverflow && 'marquee')}
                style={{ color: 'var(--text)' }}
              >
                {current.title}
                {titleOverflow && <span style={{ paddingLeft: '40px' }}>{current.title}</span>}
              </span>
            </div>
            {current.artist && (
              <div className="text-[11px] truncate" style={{ color: 'rgba(240,240,245,0.55)' }}>
                {current.artist}
              </div>
            )}
          </div>

          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: `rgba(${hexToRgbCSS(accentColor)}, 0.18)`,
              color: accentColor,
              boxShadow: `0 0 12px rgba(${hexToRgbCSS(accentColor)}, 0.35)`,
            }}
          >
            {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>

          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? 'Collapse player' : 'Expand player'}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 transition-colors"
            style={{ color: 'rgba(240,240,245,0.55)' }}
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        <div
          className="mt-2 h-1 rounded-full cursor-pointer relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          onClick={seek}
        >
          <div
            className="h-full transition-[width] duration-100"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor})`,
              boxShadow: `0 0 8px rgba(${hexToRgbCSS(accentColor)}, 0.7)`,
            }}
          />
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] tabular-nums" style={{ color: 'rgba(240,240,245,0.55)' }}>
                  {formatDuration(progress)}
                </span>
                <div className="flex items-center gap-2">
                  {tracks.length > 1 && (
                    <button
                      onClick={prev}
                      aria-label="Previous track"
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5"
                      style={{ color: 'var(--text)' }}
                    >
                      <SkipBack size={14} />
                    </button>
                  )}
                  {tracks.length > 1 && (
                    <button
                      onClick={next}
                      aria-label="Next track"
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5"
                      style={{ color: 'var(--text)' }}
                    >
                      <SkipForward size={14} />
                    </button>
                  )}
                </div>
                <span className="text-[10px] tabular-nums" style={{ color: 'rgba(240,240,245,0.55)' }}>
                  {formatDuration(duration)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function hexToRgbCSS(hex: string): string {
  const c = hex.replace('#', '');
  const full = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return '0, 255, 102';
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
