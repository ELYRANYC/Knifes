import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './profiles/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          deep: '#08080d',
          soft: '#0d0d12',
        },
        neon: {
          green: '#00ff66',
          pink: '#ff3d8a',
          cyan: '#00d4ff',
          purple: '#9b59ff',
          red: '#ff0033',
        },
        text: {
          primary: '#f0f0f5',
          secondary: 'rgba(240,240,245,0.6)',
          muted: 'rgba(240,240,245,0.4)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        'space-grotesk': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'rgb-rotate': 'rgbRotate 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shake': 'shake 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'rainbow-hue': 'rainbowHue 4s linear infinite',
        'marquee': 'marquee 12s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.015)' },
        },
        rgbRotate: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-4px) rotate(0.5deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1px, 1px)' },
          '50%': { transform: 'translate(1px, -1px)' },
          '75%': { transform: 'translate(-1px, -1px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        rainbowHue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
