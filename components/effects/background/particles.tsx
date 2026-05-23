'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, hexToRgb, randomBetween } from '@/lib/utils';

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function Particles({ accentColor }: { accentColor: string }) {
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

    const count = isMobile() ? 50 : 130;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
      r: randomBetween(1, 2.4),
    }));

    const mouse = { x: width / 2, y: height / 2, active: false };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 0.6;
            p.y += (dy / dist) * force * 0.6;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb}, 0.7)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${rgb}, 0.7)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (!a) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.35;
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
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
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [accentColor]);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
