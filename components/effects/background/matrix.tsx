'use client';

import { useEffect, useRef } from 'react';
import { isReducedMotion, isMobile, hexToRgb, randomBetween } from '@/lib/utils';

const CHARS =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'.split('');

type Column = { y: number; speed: number; charIndices: number[]; length: number };

export default function Matrix({
  accentColor,
  color,
}: {
  accentColor: string;
  /** Explicit override for the matrix glyph color. Defaults to accentColor. */
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

    const fontSize = 16;
    let columns: Column[] = [];

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / fontSize);
      const max = isMobile() ? Math.min(cols, 30) : Math.min(cols, 60);
      columns = Array.from({ length: max }, (_, i) => ({
        y: Math.random() * -height,
        speed: randomBetween(2, 6),
        length: Math.floor(randomBetween(8, 22)),
        charIndices: Array.from({ length: 22 }, () => Math.floor(Math.random() * CHARS.length)),
      })).map((c, i) => ({ ...c, x: (i / max) * width })) as Column[];
      // Re-attach x via cast since type has no x; we re-derive per draw.
    };
    setup();

    const xPositions = () => columns.map((_, i) => Math.floor((i / columns.length) * width));

    let raf = 0;
    let running = true;
    let frame = 0;

    const tick = () => {
      if (!running) return;
      frame++;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px var(--font-jetbrains-mono), monospace`;
      ctx.textBaseline = 'top';

      const xs = xPositions();

      columns.forEach((col, ci) => {
        const x = xs[ci] ?? 0;
        col.y += col.speed;

        for (let i = 0; i < col.length; i++) {
          const yy = col.y - i * fontSize;
          if (yy < -fontSize || yy > height + fontSize) continue;
          const idx = (col.charIndices[i] ?? 0 + (frame >> 3)) % CHARS.length;
          const ch = CHARS[Math.abs(idx) % CHARS.length] ?? '0';
          if (i === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${rgb}, 0.9)`;
          } else {
            const fade = 1 - i / col.length;
            ctx.fillStyle = `rgba(${rgb}, ${fade * 0.85})`;
            ctx.shadowBlur = 0;
          }
          ctx.fillText(ch, x, yy);
        }

        if (frame % 4 === 0) {
          col.charIndices[Math.floor(Math.random() * col.charIndices.length)] = Math.floor(
            Math.random() * CHARS.length,
          );
        }

        if (col.y - col.length * fontSize > height) {
          col.y = randomBetween(-200, 0);
          col.speed = randomBetween(2, 6);
          col.length = Math.floor(randomBetween(8, 22));
        }
      });

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => setup();
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [accentColor, color]);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
