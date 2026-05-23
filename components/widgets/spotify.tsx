'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

export default function SpotifyWidget({
  userId,
  accentColor,
}: {
  userId: string;
  accentColor: string;
}) {
  const rgb = hexToRgb(accentColor);
  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      href={`https://open.spotify.com/user/${userId}`}
      target="_blank"
      rel="noreferrer"
      className="glass p-4 flex items-center gap-3 group"
      style={{ borderColor: `rgba(${rgb}, 0.18)` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(29,185,84,0.15)' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#1db954" aria-hidden>
          <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .26c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.34-1.46c4.5-1.06 8.4-.6 11.5 1.32.36.22.48.7.24 1zm1.45-3.2a.94.94 0 01-1.3.3c-3.2-2-8.1-2.5-11.9-1.4a.94.94 0 11-.55-1.8c4.4-1.3 9.8-.7 13.5 1.6.45.27.6.86.25 1.3zm.12-3.32C15.3 8.5 8.7 8.3 5 9.4a1.12 1.12 0 11-.65-2.15c4.3-1.3 11.6-1.06 16.2 1.7a1.12 1.12 0 11-1.18 1.9z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: '#1db954' }}>
          spotify
        </div>
        <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>
          @{userId}
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
