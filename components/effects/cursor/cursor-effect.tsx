'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, hexToRgb, randomBetween } from '@/lib/utils';

type TrailPoint = { x: number; y: number; tx: number; ty: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number };
type Heart = { x: number; y: number; vy: number; life: number; size: number };

function useCanvasCursor(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }) => void) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (isReducedMotion()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const mouse = { x: w / 2, y: h / 2 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, mouse);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return ref;
}

export function CursorTrail({ accentColor }: { accentColor: string }) {
  const points = useRef<TrailPoint[]>([]);
  const rgb = hexToRgb(accentColor);

  useEffect(() => {
    points.current = Array.from({ length: 12 }, () => ({ x: 0, y: 0, tx: 0, ty: 0 }));
  }, []);

  const ref = useCanvasCursor((ctx, w, h, mouse) => {
    void w;
    void h;
    const pts = points.current;
    const first = pts[0];
    if (!first) return;
    first.tx = mouse.x;
    first.ty = mouse.y;
    first.x += (first.tx - first.x) * 0.4;
    first.y += (first.ty - first.y) * 0.4;
    for (let i = 1; i < pts.length; i++) {
      const cur = pts[i];
      const prev = pts[i - 1];
      if (!cur || !prev) continue;
      cur.x += (prev.x - cur.x) * 0.35;
      cur.y += (prev.y - cur.y) * 0.35;
    }
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      if (!p) continue;
      const a = 1 - i / pts.length;
      const r = 6 * a + 1;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${rgb}, ${a * 0.9})`;
      ctx.shadowBlur = 12 * a;
      ctx.shadowColor = `rgba(${rgb}, 0.8)`;
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  });

  return <canvas ref={ref} className="fx-canvas" style={{ zIndex: 9999 }} aria-hidden />;
}

export function CursorGlow({ accentColor }: { accentColor: string }) {
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rgb = hexToRgb(accentColor);

  const ref = useCanvasCursor((ctx, w, h, mouse) => {
    void w;
    void h;
    pos.current.tx = mouse.x;
    pos.current.ty = mouse.y;
    pos.current.x += (pos.current.tx - pos.current.x) * 0.18;
    pos.current.y += (pos.current.ty - pos.current.y) * 0.18;
    const { x, y } = pos.current;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 90);
    grad.addColorStop(0, `rgba(${rgb}, 0.5)`);
    grad.addColorStop(0.4, `rgba(${rgb}, 0.18)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 90, 0, Math.PI * 2);
    ctx.fill();
  });

  return <canvas ref={ref} className="fx-canvas" style={{ zIndex: 9999 }} aria-hidden />;
}

export function CursorSparkle({ accentColor }: { accentColor: string }) {
  const particles = useRef<Particle[]>([]);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rgb = hexToRgb(accentColor);

  const ref = useCanvasCursor((ctx, w, h, mouse) => {
    void w;
    void h;
    const dx = mouse.x - lastMouse.current.x;
    const dy = mouse.y - lastMouse.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 2) {
      const n = Math.min(4, Math.floor(dist / 4));
      for (let i = 0; i < n; i++) {
        particles.current.push({
          x: mouse.x + randomBetween(-4, 4),
          y: mouse.y + randomBetween(-4, 4),
          vx: randomBetween(-0.6, 0.6),
          vy: randomBetween(-0.6, 0.6),
          life: 0,
          maxLife: randomBetween(400, 700),
          r: randomBetween(1, 2.4),
        });
      }
    }
    lastMouse.current = { x: mouse.x, y: mouse.y };

    const now = performance.now();
    particles.current = particles.current.filter((p) => p.life < p.maxLife);
    if (particles.current.length > 220) particles.current.splice(0, particles.current.length - 220);
    for (const p of particles.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 16;
      const a = 1 - p.life / p.maxLife;
      // Draw a 4-point star
      ctx.fillStyle = `rgba(${rgb}, ${a})`;
      ctx.shadowBlur = 10 * a;
      ctx.shadowColor = `rgba(${rgb}, ${a})`;
      drawStar(ctx, p.x, p.y, p.r, p.r * 2.4);
    }
    void now;
    ctx.shadowBlur = 0;
  });

  return <canvas ref={ref} className="fx-canvas" style={{ zIndex: 9999 }} aria-hidden />;
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, inner: number, outer: number) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? outer : inner;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

export function CursorHearts({ accentColor }: { accentColor: string }) {
  const hearts = useRef<Heart[]>([]);
  const rgb = hexToRgb(accentColor);

  useEffect(() => {
    if (isReducedMotion()) return;
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        hearts.current.push({
          x: e.clientX + randomBetween(-10, 10),
          y: e.clientY + randomBetween(-6, 6),
          vy: randomBetween(0.6, 1.6),
          life: 0,
          size: randomBetween(10, 18),
        });
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const ref = useCanvasCursor((ctx, w, h, mouse) => {
    void w;
    void h;
    void mouse;
    hearts.current = hearts.current.filter((p) => p.life < 1500);
    for (const p of hearts.current) {
      p.y -= p.vy;
      p.life += 16;
      const a = 1 - p.life / 1500;
      ctx.fillStyle = `rgba(${rgb}, ${a})`;
      ctx.shadowBlur = 10 * a;
      ctx.shadowColor = `rgba(${rgb}, ${a})`;
      drawHeart(ctx, p.x, p.y, p.size);
    }
    ctx.shadowBlur = 0;
  });

  return <canvas ref={ref} className="fx-canvas" style={{ zIndex: 9999 }} aria-hidden />;
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(-6, -4, -14, 4, 0, 14);
  ctx.bezierCurveTo(14, 4, 6, -4, 0, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
