'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ProfileConfig } from '@/lib/types';
import Avatar from './avatar';
import Badges from './badges';
import Description from './description';
import LinksGrid from './links-grid';
import ViewCounter from './view-counter';
import { UsernameText } from '@/components/effects/text/text-effect';
import { cn, fontVarFromKey, hexToRgb } from '@/lib/utils';
import { useDiscordPresence } from '@/lib/use-discord-presence';

const STATUS_COLORS: Record<string, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

export default function DefaultLayout({ config }: { config: ProfileConfig }) {
  const { colors } = config;
  const rgb = hexToRgb(colors.accent);
  const fontVar = fontVarFromKey(config.font);
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
        ? `0 0 ${20 * (config.glow?.intensity ?? 1)}px rgba(${rgb}, ${0.32 * (config.glow?.intensity ?? 1)}),
           0 0 ${40 * (config.glow?.intensity ?? 1)}px rgba(${rgb}, ${0.18 * (config.glow?.intensity ?? 1)}),
           0 0 ${60 * (config.glow?.intensity ?? 1)}px rgba(${rgb}, ${0.1 * (config.glow?.intensity ?? 1)}),
           0 20px 50px rgba(0,0,0,0.5)`
        : `0 20px 50px rgba(0,0,0,0.5)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 content-stack"
      style={{ ['--accent-rgb' as string]: rgb }}
    >
      {config.layoutSettings?.banner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="relative w-full h-32 mb-4 overflow-hidden"
          style={{
            borderRadius: config.layoutSettings.bannerRadius ?? 14,
            border: `1px solid rgba(${rgb}, 0.18)`,
          }}
        >
          <img src={config.layoutSettings.banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </motion.div>
      )}

      <motion.div
        layout
        className={cn('glass p-6 sm:p-8 flex flex-col items-center text-center gap-4', effectClass)}
        style={boxStyle}
      >
        <Avatar
          src={avatar}
          alt={config.displayName}
          size={108}
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

        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ fontFamily: fontVar, color: colors.text }}
        >
          <UsernameText text={config.displayName} effect={config.usernameEffect} />
        </motion.h1>

        {(config.pronouns || config.location) && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 text-[12px]"
            style={{ color: 'rgba(240,240,245,0.55)' }}
          >
            {config.pronouns && <span className="pill">{config.pronouns}</span>}
            {config.location && (
              <span className="pill">
                <MapPin size={10} /> {config.location}
              </span>
            )}
          </motion.div>
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
    </motion.div>
  );
}
