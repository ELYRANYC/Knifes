'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Youtube } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

export default function YoutubeWidget({
  channelId,
  accentColor,
}: {
  channelId: string;
  accentColor: string;
}) {
  const rgb = hexToRgb(accentColor);
  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      href={`https://youtube.com/${channelId.startsWith('@') ? channelId : '@' + channelId}`}
      target="_blank"
      rel="noreferrer"
      className="glass p-4 flex items-center gap-3 group"
      style={{ borderColor: `rgba(${rgb}, 0.18)` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(255,0,0,0.14)', color: '#ff3333' }}
      >
        <Youtube size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: '#ff3333' }}>
          youtube
        </div>
        <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>
          {channelId.startsWith('@') ? channelId : '@' + channelId}
        </div>
      </div>
      <ExternalLink
        size={14}
        className="opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text)' }}
      />
    </motion.a>
  );
}
