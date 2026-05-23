'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, randomBetween } from '@/lib/utils';

type Flake = { x: number; y: number; r: number; vx: number; vy: number; sway: number; phase: number };

export default function Snow({ accentColor: _accentColor }: { accentColor: string }) {
  void _accentColor;
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (isReducedMotion()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = isMobile() ? 50 : 110;
    const flakes: Flake[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: randomBetween(1, 4),
      vx: 0,
      vy: randomBetween(0.4, 1.6),
      sway: randomBetween(0.5, 1.4),
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let running = true;

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.phase += 0.008;
        f.x += Math.sin(f.phase) * f.sway * 0.4;
        f.y += f.vy * (0.5 + f.r / 4);
        if (f.y > height + 4) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        if (f.x < -4) f.x = width + 4;
        if (f.x > width + 4) f.x = -4;
        const alpha = 0.4 + (f.r / 4) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(255,255,255,0.6)';
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      void t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
