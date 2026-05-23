'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, randomBetween } from '@/lib/utils';

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  twinkle: number;
  phase: number;
};

export default function Stars({ accentColor: _accentColor }: { accentColor: string }) {
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

    const count = isMobile() ? 120 : 240;
    const stars: Star[] = Array.from({ length: count }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: randomBetween(0.4, 1.6) * (0.5 + depth),
        depth,
        twinkle: randomBetween(0.5, 2),
        phase: Math.random() * Math.PI * 2,
      };
    });

    const mouse = { x: width / 2, y: height / 2 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    let running = true;

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      const offsetX = (mouse.x - width / 2) * 0.02;
      const offsetY = (mouse.y - height / 2) * 0.02;

      for (const s of stars) {
        s.x -= 0.06 * s.depth;
        if (s.x < -2) s.x = width + 2;

        const px = s.x + offsetX * s.depth;
        const py = s.y + offsetY * s.depth;

        const flicker = (Math.sin(t * 0.001 * s.twinkle + s.phase) + 1) * 0.5;
        const alpha = 0.3 + flicker * 0.7 * (0.4 + s.depth);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = 6 * s.depth;
        ctx.shadowColor = `rgba(255,255,255,${alpha})`;
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

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
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
