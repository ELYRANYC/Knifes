'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, hexToRgb, randomBetween } from '@/lib/utils';

type Firefly = {
  x: number;
  y: number;
  baseAlpha: number;
  phase: number;
  pulseSpeed: number;
  driftAngle: number;
  driftSpeed: number;
  driftPhase: number;
  r: number;
};

export default function Fireflies({
  accentColor,
  color,
}: {
  accentColor: string;
  /** Explicit override for the firefly glow color. Defaults to accentColor. */
  color?: string;
}) {
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
    const rgb = hexToRgb(color ?? accentColor);

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

    const count = isMobile() ? 22 : 44;
    const flies: Firefly[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseAlpha: randomBetween(0.4, 0.9),
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: randomBetween(0.6, 1.8),
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: randomBetween(0.2, 0.6),
      driftPhase: Math.random() * Math.PI * 2,
      r: randomBetween(1.6, 3.2),
    }));

    let raf = 0;
    let running = true;

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const f of flies) {
        f.driftPhase += 0.006;
        f.driftAngle += Math.sin(f.driftPhase) * 0.04;
        f.x += Math.cos(f.driftAngle) * f.driftSpeed;
        f.y += Math.sin(f.driftAngle) * f.driftSpeed;
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < -10) f.y = height + 10;
        if (f.y > height + 10) f.y = -10;

        const pulse = (Math.sin(t * 0.001 * f.pulseSpeed + f.phase) + 1) * 0.5;
        const a = f.baseAlpha * (0.35 + pulse * 0.65);

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
        grad.addColorStop(0, `rgba(${rgb}, ${a})`);
        grad.addColorStop(0.4, `rgba(${rgb}, ${a * 0.3})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.9})`;
        ctx.arc(f.x, f.y, f.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

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
  }, [accentColor, color]);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
