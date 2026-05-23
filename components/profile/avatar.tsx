'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

export default function Avatar({
  src,
  alt,
  size = 96,
  borderColor,
  borderWidth = 2,
  radius,
  accentColor,
  verified,
  glow = true,
  showStatusDot,
  statusColor,
}: {
  src: string;
  alt: string;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  accentColor: string;
  verified?: boolean;
  glow?: boolean;
  showStatusDot?: boolean;
  statusColor?: string;
}) {
  const rgb = hexToRgb(accentColor);
  const r = radius ?? 999;
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: r,
          border: `${borderWidth}px solid ${borderColor ?? accentColor}`,
          boxShadow: glow
            ? `0 0 20px rgba(${rgb}, 0.5), 0 0 40px rgba(${rgb}, 0.25), 0 0 60px rgba(${rgb}, 0.12)`
            : 'none',
        }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {showStatusDot && (
        <span
          className="absolute bottom-1 right-1 rounded-full border-[3px]"
          style={{
            width: size * 0.18,
            height: size * 0.18,
            background: statusColor ?? '#23a55a',
            borderColor: 'rgba(10,10,20,0.95)',
            boxShadow: `0 0 8px ${statusColor ?? '#23a55a'}`,
          }}
        />
      )}
      {verified && (
        <span
          className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center"
          style={{
            width: size * 0.28,
            height: size * 0.28,
            background: accentColor,
            color: '#0a0a0f',
            boxShadow: `0 0 12px rgba(${rgb}, 0.7)`,
            border: '2px solid rgba(10,10,20,0.95)',
          }}
          title="verified"
        >
          <Check size={size * 0.14} strokeWidth={3.5} />
        </span>
      )}
    </motion.div>
  );
}
