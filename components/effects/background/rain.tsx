'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, randomBetween } from '@/lib/utils';

type Drop = { x: number; y: number; len: number; speed: number; opacity: number };

export default function Rain({ accentColor }: { accentColor: string }) {
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

    const count = isMobile() ? 60 : 140;
    const angle = (-18 * Math.PI) / 180;
    const drops: Drop[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: randomBetween(8, 22),
      speed: randomBetween(8, 18),
      opacity: randomBetween(0.2, 0.7),
    }));

    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      for (const d of drops) {
        d.x += Math.sin(angle) * d.speed;
        d.y += Math.cos(angle) * d.speed;
        if (d.y > height + 20) {
          d.y = -20;
          d.x = Math.random() * width;
        }
        if (d.x < -20) d.x = width + 20;
        const gradient = ctx.createLinearGradient(
          d.x,
          d.y,
          d.x + Math.sin(angle) * d.len,
          d.y + Math.cos(angle) * d.len,
        );
        gradient.addColorStop(0, `rgba(180, 200, 255, 0)`);
        gradient.addColorStop(1, `rgba(180, 200, 255, ${d.opacity})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + Math.sin(angle) * d.len, d.y + Math.cos(angle) * d.len);
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
