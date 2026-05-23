'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { ProfileConfig } from '@/lib/types';
import { backgroundEffectsMap, cursorEffectsMap } from '@/lib/effects-registry';
import { hexToRgb, pickGradient } from '@/lib/utils';
import EntryScreen from './entry-screen';
import AudioPlayer from './audio/audio-player';
import VolumeControl from './audio/volume-control';
import DefaultLayout from './profile/default-layout';
import ModernLayout from './profile/modern-layout';
import SimplisticLayout from './profile/simplistic-layout';
import SleekLayout from './profile/sleek-layout';
import { ViewCountProvider } from '@/lib/view-count-context';

export default function ProfileRenderer({
  config,
  viewCount = null,
  profileId,
  preview = false,
}: {
  config: ProfileConfig;
  viewCount?: number | null;
  profileId?: string;
  /** Contained dashboard preview: no global CSS mutation, cursor, audio or entry gate. */
  preview?: boolean;
}) {
  const [unlocked, setUnlocked] = useState(preview ? true : !config.entryScreen?.enabled);
  const rgb = hexToRgb(config.colors.accent);

  useEffect(() => {
    if (preview) return;
    document.documentElement.style.setProperty('--accent', config.colors.accent);
    document.documentElement.style.setProperty('--accent-rgb', rgb);
    document.documentElement.style.setProperty('--text', config.colors.text);
    if (config.colors.secondary) {
      document.documentElement.style.setProperty('--text-secondary', config.colors.secondary);
    }
    if (typeof document !== 'undefined' && config.customCursor) {
      document.body.style.cursor = `url(${config.customCursor}), auto`;
    }
    return () => {
      if (typeof document !== 'undefined' && config.customCursor) {
        document.body.style.cursor = '';
      }
    };
  }, [preview, config.colors.accent, config.colors.text, config.colors.secondary, config.customCursor, rgb]);

  const BgEffect = useMemo(() => {
    if (!config.backgroundEffect || config.backgroundEffect === 'none') return null;
    return backgroundEffectsMap[config.backgroundEffect];
  }, [config.backgroundEffect]);

  const CursorEffect = useMemo(() => {
    if (!config.cursorEffect || config.cursorEffect === 'none') return null;
    return cursorEffectsMap[config.cursorEffect];
  }, [config.cursorEffect]);

  const backgroundLayer = useMemo(() => {
    const bg = config.background;
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    };
    if (bg.type === 'image') {
      return (
        <div
          style={{
            ...baseStyle,
            backgroundImage: `url(${bg.value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
            opacity: bg.opacity ?? 1,
          }}
        />
      );
    }
    if (bg.type === 'video') {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            ...baseStyle,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
            opacity: bg.opacity ?? 1,
          }}
          src={bg.value}
        />
      );
    }
    if (bg.type === 'gradient') {
      const grad = config.gradient
        ? pickGradient(config.gradient.angle, config.gradient.from, config.gradient.to)
        : bg.value;
      return <div style={{ ...baseStyle, background: grad, opacity: bg.opacity ?? 1 }} />;
    }
    return <div style={{ ...baseStyle, background: bg.value, opacity: bg.opacity ?? 1 }} />;
  }, [config.background, config.gradient]);

  const hasAudio = (config.audio?.length ?? 0) > 0;
  const showVolume = hasAudio;

  return (
    <ViewCountProvider value={viewCount} profileId={profileId ?? null}>
    <main
      className="relative min-h-screen w-full"
      style={{ background: config.colors.background }}
    >
      {backgroundLayer}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb}, 0.08) 0%, transparent 50%)`,
        }}
      />
      {BgEffect && <BgEffect accentColor={config.colors.accent} />}
      {!preview && CursorEffect && unlocked && <CursorEffect accentColor={config.colors.accent} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: unlocked ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        {config.layout === 'modern' && <ModernLayout config={config} />}
        {config.layout === 'simplistic' && <SimplisticLayout config={config} />}
        {config.layout === 'sleek' && <SleekLayout config={config} />}
        {config.layout === 'default' && <DefaultLayout config={config} />}
      </motion.div>

      {!preview && hasAudio && config.audio && (
        <AudioPlayer
          tracks={config.audio}
          autoplay={config.audioAutoplay}
          initialVolume={config.audioVolume}
          accentColor={config.colors.accent}
          unlocked={unlocked}
        />
      )}
      {!preview && showVolume && <VolumeControl accentColor={config.colors.accent} />}

      {!preview && config.entryScreen?.enabled && (
        <EntryScreen
          username={config.username}
          text={config.entryScreen.text}
          accentColor={config.colors.accent}
          onEnter={() => setUnlocked(true)}
        />
      )}
    </main>
    </ViewCountProvider>
  );
}
