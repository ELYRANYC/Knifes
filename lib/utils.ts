import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRgb(hex: string): string {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned,
    16,
  );
  if (Number.isNaN(bigint)) return '0, 255, 102';
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function relativeTime(start: number): string {
  const diff = Date.now() - start;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min${min === 1 ? '' : 's'}`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'}`;
  const d = Math.floor(hr / 24);
  return `${d} day${d === 1 ? '' : 's'}`;
}

export function elapsedSince(start: number): string {
  const diff = Math.max(0, Math.floor((Date.now() - start) / 1000));
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}:${(m % 60).toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function pickGradient(angle: number, from: string, to: string): string {
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`;
}

export function discordCdnAsset(applicationId: string, asset: string): string {
  if (asset.startsWith('mp:external/')) {
    return `https://media.discordapp.net/external/${asset.replace('mp:external/', '')}`;
  }
  if (asset.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${asset.replace('spotify:', '')}`;
  }
  return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
}

export function fontVarFromKey(font: string | undefined): string {
  switch (font) {
    case 'jetbrains-mono':
      return 'var(--font-jetbrains-mono)';
    case 'space-grotesk':
      return 'var(--font-space-grotesk)';
    case 'poppins':
      return 'var(--font-poppins)';
    case 'orbitron':
      return 'var(--font-orbitron)';
    case 'caveat':
      return 'var(--font-caveat)';
    case 'inter':
    default:
      return 'var(--font-inter)';
  }
}
