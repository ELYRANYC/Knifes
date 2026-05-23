'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, LayoutGrid } from 'lucide-react';
import type { ProfileConfig } from '@/lib/types';
import Avatar from './avatar';
import Badges from './badges';
import Description from './description';
import LinksGrid from './links-grid';
import ViewCounter from './view-counter';
import { UsernameText } from '@/components/effects/text/text-effect';
import DiscordPresence from '@/components/widgets/discord-presence';
import DiscordServer from '@/components/widgets/discord-server';
import SpotifyWidget from '@/components/widgets/spotify';
import YoutubeWidget from '@/components/widgets/youtube';
import GithubWidget from '@/components/widgets/github';
import { cn, fontVarFromKey, hexToRgb } from '@/lib/utils';
import { useDiscordPresence } from '@/lib/use-discord-presence';

const STATUS_COLORS: Record<string, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

export default function ModernLayout({ config }: { config: ProfileConfig }) {
  const { colors } = config;
  const rgb = hexToRgb(colors.accent);
  const fontVar = fontVarFromKey(config.font);
  const [tab, setTab] = useState<'profile' | 'widgets'>('profile');
  const presence = useDiscordPresence(
    config.showDiscordPresence ? config.discordId : undefined,
    15000,
  );
  const avatar =
    config.useDiscordAvatar && presence.data?.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${presence.data.discord_user.id}/${presence.data.discord_user.avatar}.${
          presence.data.discord_user.avatar.startsWith('a_') ? 'gif' : 'webp'
        }?size=256`
      : config.avatar;

  const widgets = config.widgets ?? [];
  const showTabs = widgets.length > 0;

  const effectClass = config.profileEffect === 'rgb-glow'
    ? 'effect-rgb-glow'
    : config.profileEffect === 'pulse'
    ? 'effect-pulse'
    : config.profileEffect === 'shake'
    ? 'effect-shake'
    : '';

  const boxStyle: React.CSSProperties = {
    background: `rgba(10, 10, 20, ${config.boxOpacity ?? 0.5})`,
    backdropFilter: `blur(${config.boxBlur ?? 18}px) saturate(140%)`,
    WebkitBackdropFilter: `blur(${config.boxBlur ?? 18}px) saturate(140%)`,
    borderColor:
      config.layoutSettings?.borderColor ?? `rgba(${rgb}, 0.22)`,
    borderWidth: config.layoutSettings?.borderWidth ?? 1,
    borderRadius: config.layoutSettings?.borderRadius ?? 16,
    borderStyle: 'solid',
    fontFamily: fontVar,
    color: colors.text,
    boxShadow:
      config.glow?.enabled !== false
        ? `0 0 ${24 * (config.glow?.intensity ?? 1)}px rgba(${rgb}, ${0.4 * (config.glow?.intensity ?? 1)}),
           0 0 ${48 * (config.glow?.intensity ?? 1)}px rgba(${rgb}, ${0.22 * (config.glow?.intensity ?? 1)}),
           0 20px 50px rgba(0,0,0,0.55)`
        : `0 20px 50px rgba(0,0,0,0.55)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 content-stack"
      style={{ ['--accent-rgb' as string]: rgb }}
    >
      <motion.div
        layout
        className={cn('glass p-5 sm:p-6 flex flex-col gap-4', effectClass)}
        style={boxStyle}
      >
        {showTabs && (
          <div
            className="flex p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(${rgb}, 0.12)` }}
          >
            <TabButton active={tab === 'profile'} onClick={() => setTab('profile')} color={colors.accent}>
              <User size={13} /> profile
            </TabButton>
            <TabButton active={tab === 'widgets'} onClick={() => setTab('widgets')} color={colors.accent}>
              <LayoutGrid size={13} /> widgets
            </TabButton>
          </div>
        )}

        <AnimatePresence mode="wait">
          {tab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <Avatar
                src={avatar}
                alt={config.displayName}
                size={104}
                accentColor={colors.accent}
                radius={config.layoutSettings?.avatarRadius}
                borderColor={config.layoutSettings?.borderColor}
                borderWidth={config.layoutSettings?.borderWidth ?? 2}
                verified={config.verified}
                showStatusDot={Boolean(config.showDiscordPresence && presence.data)}
                statusColor={
                  presence.data ? STATUS_COLORS[presence.data.discord_status] ?? STATUS_COLORS.offline : undefined
                }
              />
              <h1
                className="text-2xl sm:text-[28px] font-bold leading-tight"
                style={{ fontFamily: fontVar, color: colors.text }}
              >
                <UsernameText text={config.displayName} effect={config.usernameEffect} />
              </h1>
              {(config.pronouns || config.location) && (
                <div
                  className="flex flex-wrap items-center justify-center gap-2 text-[11px]"
                  style={{ color: 'rgba(240,240,245,0.55)' }}
                >
                  {config.pronouns && <span className="pill">{config.pronouns}</span>}
                  {config.location && (
                    <span className="pill">
                      <MapPin size={10} /> {config.location}
                    </span>
                  )}
                </div>
              )}
              {config.badges && config.badges.length > 0 && (
                <Badges badges={config.badges} accentColor={colors.accent} />
              )}
              {config.description && (
                <Description
                  text={config.description}
                  typewriterSpeed={config.typewriterSpeed}
                  typewriterDeleteSpeed={config.typewriterDeleteSpeed}
                  typewriterPause={config.typewriterPause}
                  className="text-[14px] leading-relaxed min-h-[1.5em]"
                  style={{ color: colors.secondary ?? 'rgba(240,240,245,0.7)', fontFamily: fontVar }}
                />
              )}
              <div className="w-full mt-2">
                <LinksGrid
                  links={config.links}
                  accentColor={colors.accent}
                  iconColor={colors.icon}
                  monochrome={config.monochromeIcons}
                  alignment={config.linkAlignment}
                />
              </div>
              <ViewCounter username={config.username} accentColor={colors.accent} />
            </motion.div>
          )}

          {tab === 'widgets' && (
            <motion.div
              key="widgets"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              {widgets.map((w, i) => {
                if (w.type === 'discord-server') {
                  return <DiscordServer key={i} invite={w.invite} accentColor={colors.accent} />;
                }
                if (w.type === 'discord-presence') {
                  return <DiscordPresence key={i} userId={w.userId} accentColor={colors.accent} />;
                }
                if (w.type === 'spotify') {
                  return <SpotifyWidget key={i} userId={w.userId} accentColor={colors.accent} />;
                }
                if (w.type === 'youtube') {
                  return <YoutubeWidget key={i} channelId={w.channelId} accentColor={colors.accent} />;
                }
                if (w.type === 'github') {
                  return <GithubWidget key={i} username={w.username} accentColor={colors.accent} />;
                }
                return null;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  const rgb = hexToRgb(color);
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-medium transition-all',
      )}
      style={{
        background: active ? `rgba(${rgb}, 0.16)` : 'transparent',
        color: active ? color : 'rgba(240,240,245,0.55)',
        boxShadow: active ? `0 0 14px rgba(${rgb}, 0.22)` : 'none',
        border: active ? `1px solid rgba(${rgb}, 0.35)` : '1px solid transparent',
      }}
    >
      {children}
    </button>
  );
}
