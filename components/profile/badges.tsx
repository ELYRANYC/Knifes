'use client';

import {
  Crown,
  Shield,
  Skull,
  Flame,
  Star,
  Heart,
  Moon,
  Sun,
  Sparkles,
  Terminal,
  Zap,
  Award,
  Gem,
  Bot,
  Code,
  Music,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Badge } from '@/lib/types';
import { hexToRgb } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  crown: Crown,
  shield: Shield,
  skull: Skull,
  flame: Flame,
  star: Star,
  heart: Heart,
  moon: Moon,
  sun: Sun,
  sparkles: Sparkles,
  terminal: Terminal,
  zap: Zap,
  award: Award,
  gem: Gem,
  bot: Bot,
  code: Code,
  music: Music,
  eye: Eye,
};

export default function Badges({
  badges,
  accentColor,
}: {
  badges: Badge[];
  accentColor: string;
}) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {badges.map((b, i) => {
        const Icon = ICONS[b.icon.toLowerCase()] ?? Star;
        const color = b.color ?? accentColor;
        const rgb = hexToRgb(color);
        return (
          <motion.span
            key={`${b.label}-${i}`}
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
            className="badge"
            style={{
              background: `rgba(${rgb}, 0.14)`,
              border: `1px solid rgba(${rgb}, 0.32)`,
              color,
              textShadow: `0 0 8px rgba(${rgb}, 0.5)`,
            }}
            title={b.label}
          >
            <Icon size={11} />
            <span>{b.label}</span>
          </motion.span>
        );
      })}
    </div>
  );
}
