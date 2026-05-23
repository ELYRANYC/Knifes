'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

type Invite = {
  guild: { name: string; icon: string | null; id: string };
  approximate_member_count?: number;
  approximate_presence_count?: number;
};

export default function DiscordServerWidget({
  invite,
  accentColor,
}: {
  invite: string;
  accentColor: string;
}) {
  const [data, setData] = useState<Invite | null>(null);
  const [loading, setLoading] = useState(true);
  const rgb = hexToRgb(accentColor);
  const code = invite.replace(/^https?:\/\/(discord\.gg|discord\.com\/invite)\//, '');

  useEffect(() => {
    let cancelled = false;
    fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Invite | null) => {
        if (!cancelled) {
          setData(j);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      href={`https://discord.gg/${code}`}
      target="_blank"
      rel="noreferrer"
      className="glass p-4 flex items-center gap-3 group"
      style={{ borderColor: `rgba(${rgb}, 0.18)` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(88,101,242,0.15)' }}
      >
        {loading ? (
          <div className="skeleton w-12 h-12" />
        ) : data?.guild.icon ? (
          <img
            src={`https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.webp?size=128`}
            alt=""
            className="w-12 h-12 object-cover"
          />
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865f2" aria-hidden>
            <path d="M19.27 5.33A19.6 19.6 0 0014.45 4l-.24.25c2.2.4 3.2 1 4.27 1.85a13 13 0 00-11.06-.5c-.3.15-.45.25-.45.25.95-.9 2.4-1.55 4.36-1.7L11.25 4a18.3 18.3 0 00-4.83 1.33A19.7 19.7 0 003 16c1.1 1.55 2.65 2.5 4.1 2.55l.65-.9A6.1 6.1 0 015 16c.3.25.7.5 1.1.7a16.7 16.7 0 0011.8 0c.4-.2.8-.45 1.1-.7-.85.75-1.85 1.4-2.85 1.85.2.3.45.6.65.85 1.45-.05 3-1 4.1-2.55 0-3.3-1.55-6.5-2.93-8.32zM9.4 14.5c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75zm5.2 0c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: '#5865f2' }}>
          discord server
        </div>
        <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>
          {data?.guild.name ?? code}
        </div>
        {data?.approximate_member_count && (
          <div className="flex items-center gap-3 mt-0.5 text-[10px]" style={{ color: 'rgba(240,240,245,0.55)' }}>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {data.approximate_presence_count ?? 0} online
            </span>
            <span className="flex items-center gap-1">
              <Users size={9} />
              {data.approximate_member_count}
            </span>
          </div>
        )}
      </div>
      <ExternalLink
        size={14}
        className="opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text)' }}
      />
    </motion.a>
  );
}
