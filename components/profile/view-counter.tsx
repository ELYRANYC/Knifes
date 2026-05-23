'use client';

import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useViewCounter } from '@/lib/use-view-counter';
import { hexToRgb } from '@/lib/utils';

export default function ViewCounter({
  username,
  accentColor,
}: {
  username: string;
  accentColor: string;
}) {
  const views = useViewCounter(username);
  const rgb = hexToRgb(accentColor);
  if (views === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="pill"
      style={{
        background: `rgba(${rgb}, 0.06)`,
        border: `1px solid rgba(${rgb}, 0.18)`,
        color: 'rgba(240,240,245,0.7)',
      }}
    >
      <Eye size={11} style={{ color: accentColor }} />
      <span className="tabular-nums">{views.toLocaleString()}</span>
      <span style={{ color: 'rgba(240,240,245,0.4)' }}>views</span>
    </motion.div>
  );
}
