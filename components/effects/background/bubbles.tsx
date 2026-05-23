'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, hexToRgb, randomBetween } from '@/lib/utils';

type Bubble = { x: number; y: number; r: number; vy: number; sway: number; phase: number; alpha: number };

export default function Bubbles({ accentColor }: { accentColor: string }) {
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
    const rgb = hexToRgb(accentColor);

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

    const count = isMobile() ? 14 : 28;
    const bubbles: Bubble[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      r: randomBetween(8, 28),
      vy: randomBetween(0.3, 1.2),
      sway: randomBetween(0.4, 1.2),
      phase: Math.random() * Math.PI * 2,
      alpha: randomBetween(0.15, 0.35),
    }));

    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        b.phase += 0.012;
        b.x += Math.sin(b.phase) * b.sway * 0.6;
        b.y -= b.vy;
        if (b.y < -b.r * 2) {
          b.y = height + b.r * 2;
          b.x = Math.random() * width;
        }
        const edgeFade = Math.min(1, b.y / height, (height - b.y) / 80);
        const a = b.alpha * Math.max(0, edgeFade);
        const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.2, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${rgb}, ${a * 0.5})`);
        grad.addColorStop(0.7, `rgba(${rgb}, ${a * 0.25})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb}, ${a * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
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
  }, [accentColor]);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
