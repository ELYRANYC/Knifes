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
import { fontVarFromKey, hexToRgb } from '@/lib/utils';

export default function SimplisticLayout({ config }: { config: ProfileConfig }) {
  const { colors } = config;
  const rgb = hexToRgb(colors.accent);
  const fontVar = fontVarFromKey(config.font);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-sm mx-auto px-6 py-12 sm:py-16 content-stack flex flex-col items-center text-center gap-5"
      style={{ ['--accent-rgb' as string]: rgb, fontFamily: fontVar, color: colors.text }}
    >
      <Avatar
        src={config.avatar}
        alt={config.displayName}
        size={96}
        accentColor={colors.accent}
        radius={config.layoutSettings?.avatarRadius}
        borderColor={config.layoutSettings?.borderColor ?? 'rgba(255,255,255,0.12)'}
        borderWidth={config.layoutSettings?.borderWidth ?? 1}
        verified={config.verified}
        glow={false}
      />

      <div className="flex flex-col items-center gap-1.5">
        <h1
          className="text-[26px] font-semibold leading-tight tracking-tight"
          style={{ fontFamily: fontVar, color: colors.text }}
        >
          <UsernameText text={config.displayName} effect={config.usernameEffect} />
        </h1>
        {(config.pronouns || config.location) && (
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-[12px]"
            style={{ color: 'rgba(240,240,245,0.5)' }}
          >
            {config.pronouns && <span>{config.pronouns}</span>}
            {config.pronouns && config.location && <span>·</span>}
            {config.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} /> {config.location}
              </span>
            )}
          </div>
        )}
      </div>

      {config.badges && config.badges.length > 0 && (
        <Badges badges={config.badges} accentColor={colors.accent} />
      )}

      {config.description && (
        <Description
          text={config.description}
          typewriterSpeed={config.typewriterSpeed}
          typewriterDeleteSpeed={config.typewriterDeleteSpeed}
          typewriterPause={config.typewriterPause}
          className="text-[14px] leading-relaxed max-w-[280px] min-h-[1.5em]"
          style={{ color: colors.secondary ?? 'rgba(240,240,245,0.65)', fontFamily: fontVar }}
        />
      )}

      <div className="w-full mt-2">
        <LinksGrid
          links={config.links}
          accentColor={colors.accent}
          iconColor={colors.icon}
          monochrome={config.monochromeIcons ?? true}
          alignment="center"
          variant="card"
        />
      </div>

      <ViewCounter username={config.username} accentColor={colors.accent} />
    </motion.div>
  );
}
