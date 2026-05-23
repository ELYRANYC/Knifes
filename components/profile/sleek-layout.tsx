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

export default function SleekLayout({ config }: { config: ProfileConfig }) {
  const { colors } = config;
  const rgb = hexToRgb(colors.accent);
  const fontVar = fontVarFromKey(config.font);
  const banner =
    config.layoutSettings?.banner ??
    `https://api.dicebear.com/9.x/shapes/svg?seed=${config.username}&backgroundType=gradientLinear&backgroundColor=${colors.accent.replace('#', '')},${colors.background.replace('#', '')}`;
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
        className={cn('relative overflow-visible', effectClass)}
        style={{
          background: `rgba(10, 10, 20, ${config.boxOpacity ?? 0.7})`,
          backdropFilter: `blur(${config.boxBlur ?? 14}px)`,
          WebkitBackdropFilter: `blur(${config.boxBlur ?? 14}px)`,
          border: `${config.layoutSettings?.borderWidth ?? 1}px solid ${config.layoutSettings?.borderColor ?? `rgba(${rgb}, 0.22)`}`,
          borderRadius: config.layoutSettings?.borderRadius ?? 20,
          boxShadow:
            config.glow?.enabled !== false
              ? `0 0 28px rgba(${rgb}, ${0.35 * (config.glow?.intensity ?? 1)}),
                 0 0 56px rgba(${rgb}, ${0.18 * (config.glow?.intensity ?? 1)}),
                 0 20px 50px rgba(0,0,0,0.55)`
              : `0 20px 50px rgba(0,0,0,0.55)`,
          fontFamily: fontVar,
          color: colors.text,
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 140,
            borderTopLeftRadius: (config.layoutSettings?.borderRadius ?? 20) - 1,
            borderTopRightRadius: (config.layoutSettings?.borderRadius ?? 20) - 1,
            borderBottom: `1px solid rgba(${rgb}, 0.18)`,
          }}
        >
          <img src={banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(10,10,20,0.6) 100%)` }} />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end gap-3 -mt-12 sm:-mt-14">
            <Avatar
              src={avatar}
              alt={config.displayName}
              size={92}
              accentColor={colors.accent}
              radius={config.layoutSettings?.avatarRadius}
              borderColor={config.layoutSettings?.borderColor ?? `rgba(10,10,20,0.95)`}
              borderWidth={4}
              verified={config.verified}
              showStatusDot={Boolean(config.showDiscordPresence && presence.data)}
              statusColor={
                presence.data ? STATUS_COLORS[presence.data.discord_status] ?? STATUS_COLORS.offline : undefined
              }
            />
            <div className="flex-1 min-w-0 pb-1">
              <h1
                className="text-[22px] sm:text-2xl font-bold leading-tight truncate"
                style={{ fontFamily: fontVar, color: colors.text }}
              >
                <UsernameText text={config.displayName} effect={config.usernameEffect} />
              </h1>
              {(config.pronouns || config.location) && (
                <div
                  className="flex flex-wrap items-center gap-2 text-[11px] mt-0.5"
                  style={{ color: 'rgba(240,240,245,0.55)' }}
                >
                  {config.pronouns && <span>{config.pronouns}</span>}
                  {config.pronouns && config.location && <span>·</span>}
                  {config.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={10} /> {config.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {config.badges && config.badges.length > 0 && (
            <div className="mt-4 flex justify-start">
              <Badges badges={config.badges} accentColor={colors.accent} />
            </div>
          )}

          {config.description && (
            <Description
              text={config.description}
              typewriterSpeed={config.typewriterSpeed}
              typewriterDeleteSpeed={config.typewriterDeleteSpeed}
              typewriterPause={config.typewriterPause}
              className="mt-4 text-[14px] leading-relaxed min-h-[1.5em]"
              style={{ color: colors.secondary ?? 'rgba(240,240,245,0.7)', fontFamily: fontVar }}
            />
          )}

          <div className="mt-5">
            <LinksGrid
              links={config.links}
              accentColor={colors.accent}
              iconColor={colors.icon}
              monochrome={config.monochromeIcons}
              alignment={config.linkAlignment ?? 'left'}
            />
          </div>

          <div className="mt-4 flex">
            <ViewCounter username={config.username} accentColor={colors.accent} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
