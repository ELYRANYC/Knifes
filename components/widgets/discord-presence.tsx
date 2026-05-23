'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Headphones, Gamepad2 } from 'lucide-react';
import { useDiscordPresence } from '@/lib/use-discord-presence';
import { discordCdnAsset, elapsedSince, hexToRgb } from '@/lib/utils';
import type { LanyardActivity } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

export default function DiscordPresence({
  userId,
  accentColor,
}: {
  userId: string;
  accentColor: string;
}) {
  const { data, loading, error } = useDiscordPresence(userId);
  const rgb = hexToRgb(accentColor);

  if (loading) {
    return (
      <div className="glass p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="skeleton w-14 h-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-2 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error === 'not-monitored' || !data) {
    return (
      <a
        href="https://discord.gg/lanyard"
        target="_blank"
        rel="noreferrer"
        className="glass p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        style={{ borderColor: `rgba(${rgb}, 0.2)` }}
      >
        <div>
          <div className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>
            Discord presence
          </div>
          <div className="text-[11px]" style={{ color: 'rgba(240,240,245,0.55)' }}>
            user not in lanyard server
          </div>
        </div>
        <ExternalLink size={14} style={{ color: accentColor }} />
      </a>
    );
  }

  const status = data.discord_status;
  const username = data.discord_user.global_name || data.discord_user.username;
  const avatar = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${
        data.discord_user.avatar.startsWith('a_') ? 'gif' : 'webp'
      }?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${(parseInt(data.discord_user.discriminator || '0', 10) % 5)}.png`;

  const spotify = data.listening_to_spotify ? data.spotify : null;
  const customStatus = data.activities.find((a) => a.type === 4);
  const playing = data.activities.find((a) => a.type === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass p-4"
      style={{
        borderColor: `rgba(${rgb}, 0.18)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={avatar} alt={username} className="w-14 h-14 rounded-full object-cover" />
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2"
            style={{
              backgroundColor: STATUS_COLORS[status] ?? STATUS_COLORS.offline,
              borderColor: 'rgba(10,10,20,0.95)',
            }}
            title={status}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--text)' }}>
            {username}
          </div>
          {customStatus?.state ? (
            <div className="text-[12px] truncate" style={{ color: 'rgba(240,240,245,0.7)' }}>
              {customStatus.emoji?.name && <span className="mr-1">{customStatus.emoji.name}</span>}
              {customStatus.state}
            </div>
          ) : (
            <div className="text-[11px] uppercase tracking-wider" style={{ color: STATUS_COLORS[status] }}>
              {status === 'dnd' ? 'do not disturb' : status}
            </div>
          )}
        </div>
      </div>

      {spotify && (
        <div
          className="mt-3 p-3 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.25)' }}
        >
          <img src={spotify.album_art_url} alt={spotify.album} className="w-12 h-12 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: '#1db954' }}>
              <Headphones size={10} /> listening on spotify
            </div>
            <div className="text-[12px] font-medium truncate" style={{ color: 'var(--text)' }}>
              {spotify.song}
            </div>
            <div className="text-[11px] truncate" style={{ color: 'rgba(240,240,245,0.55)' }}>
              {spotify.artist}
            </div>
            <SpotifyProgress start={spotify.timestamps.start} end={spotify.timestamps.end} />
          </div>
        </div>
      )}

      {playing && (
        <PlayingCard activity={playing} accentColor={accentColor} />
      )}
    </motion.div>
  );
}

function SpotifyProgress({ start, end }: { start: number; end: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(1, end - start);
  const elapsed = Math.min(total, Math.max(0, now - start));
  const pct = (elapsed / total) * 100;
  return (
    <div className="mt-1">
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full transition-[width] duration-700"
          style={{
            width: `${pct}%`,
            background: '#1db954',
            boxShadow: '0 0 6px rgba(29,185,84,0.7)',
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] tabular-nums" style={{ color: 'rgba(240,240,245,0.55)' }}>
        <span>{fmt(elapsed)}</span>
        <span>{fmt(total)}</span>
      </div>
    </div>
  );
}

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, '0')}`;
}

function PlayingCard({ activity, accentColor }: { activity: LanyardActivity; accentColor: string }) {
  const rgb = hexToRgb(accentColor);
  const largeImg = activity.assets?.large_image
    ? activity.application_id
      ? discordCdnAsset(activity.application_id, activity.assets.large_image)
      : null
    : null;
  return (
    <div
      className="mt-3 p-3 rounded-xl flex items-center gap-3"
      style={{ background: `rgba(${rgb}, 0.08)`, border: `1px solid rgba(${rgb}, 0.2)` }}
    >
      {largeImg ? (
        <img src={largeImg} alt={activity.name} className="w-12 h-12 rounded object-cover" />
      ) : (
        <div
          className="w-12 h-12 rounded flex items-center justify-center"
          style={{ background: `rgba(${rgb}, 0.18)`, color: accentColor }}
        >
          <Gamepad2 size={20} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: accentColor }}>
          playing
        </div>
        <div className="text-[12px] font-medium truncate" style={{ color: 'var(--text)' }}>
          {activity.name}
        </div>
        {activity.details && (
          <div className="text-[11px] truncate" style={{ color: 'rgba(240,240,245,0.6)' }}>
            {activity.details}
          </div>
        )}
        {activity.state && (
          <div className="text-[11px] truncate" style={{ color: 'rgba(240,240,245,0.5)' }}>
            {activity.state}
          </div>
        )}
        {activity.timestamps?.start && (
          <div className="text-[10px] mt-0.5 tabular-nums" style={{ color: 'rgba(240,240,245,0.45)' }}>
            {elapsedSince(activity.timestamps.start)} elapsed
          </div>
        )}
      </div>
    </div>
  );
}
