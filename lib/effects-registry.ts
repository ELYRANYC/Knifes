import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { BackgroundEffect, CursorEffect } from './types';

export type EffectProps = { accentColor: string };

const Snow = dynamic(() => import('@/components/effects/background/snow').then((m) => m.default), {
  ssr: false,
});
const Rain = dynamic(() => import('@/components/effects/background/rain').then((m) => m.default), {
  ssr: false,
});
const Particles = dynamic(
  () => import('@/components/effects/background/particles').then((m) => m.default),
  { ssr: false },
);
const Matrix = dynamic(
  () => import('@/components/effects/background/matrix').then((m) => m.default),
  { ssr: false },
);
const Stars = dynamic(() => import('@/components/effects/background/stars').then((m) => m.default), {
  ssr: false,
});
const Bubbles = dynamic(
  () => import('@/components/effects/background/bubbles').then((m) => m.default),
  { ssr: false },
);
const Fireflies = dynamic(
  () => import('@/components/effects/background/fireflies').then((m) => m.default),
  { ssr: false },
);

export const backgroundEffectsMap: Record<
  Exclude<BackgroundEffect, 'none'>,
  ComponentType<EffectProps>
> = {
  snow: Snow,
  rain: Rain,
  particles: Particles,
  matrix: Matrix,
  stars: Stars,
  bubbles: Bubbles,
  fireflies: Fireflies,
};

const CursorTrail = dynamic(
  () => import('@/components/effects/cursor/cursor-effect').then((m) => m.CursorTrail),
  { ssr: false },
);
const CursorGlow = dynamic(
  () => import('@/components/effects/cursor/cursor-effect').then((m) => m.CursorGlow),
  { ssr: false },
);
const CursorSparkle = dynamic(
  () => import('@/components/effects/cursor/cursor-effect').then((m) => m.CursorSparkle),
  { ssr: false },
);
const CursorHearts = dynamic(
  () => import('@/components/effects/cursor/cursor-effect').then((m) => m.CursorHearts),
  { ssr: false },
);

export const cursorEffectsMap: Record<
  Exclude<CursorEffect, 'none'>,
  ComponentType<EffectProps>
> = {
  trail: CursorTrail,
  glow: CursorGlow,
  sparkle: CursorSparkle,
  hearts: CursorHearts,
};
