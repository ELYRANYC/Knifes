'use client';

import { motion } from 'framer-motion';
import {
  siDiscord,
  siX,
  siInstagram,
  siTiktok,
  siYoutube,
  siTwitch,
  siSpotify,
  siGithub,
  siGitlab,
  siLinkedin,
  siTelegram,
  siReddit,
  siSnapchat,
  siPinterest,
  siFacebook,
  siThreads,
  siBluesky,
  siMastodon,
  siRoblox,
  siSteam,
  siPlaystation,
  siCashapp,
  siVenmo,
  siPaypal,
  siKofi,
  siPatreon,
  siBuymeacoffee,
  siSoundcloud,
  siApplemusic,
} from 'simple-icons/icons';
import { Mail, Globe, ExternalLink, Gamepad2 } from 'lucide-react';
import type { ProfileLink } from '@/lib/types';
import { cn, hexToRgb } from '@/lib/utils';

type IconMeta = { svg: string; hex: string; title: string };

const ICON_REGISTRY: Record<string, IconMeta> = {
  discord: siDiscord,
  twitter: siX,
  x: siX,
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  twitch: siTwitch,
  spotify: siSpotify,
  github: siGithub,
  gitlab: siGitlab,
  linkedin: siLinkedin,
  telegram: siTelegram,
  reddit: siReddit,
  snapchat: siSnapchat,
  pinterest: siPinterest,
  facebook: siFacebook,
  threads: siThreads,
  bluesky: siBluesky,
  mastodon: siMastodon,
  roblox: siRoblox,
  steam: siSteam,
  psn: siPlaystation,
  cashapp: siCashapp,
  venmo: siVenmo,
  paypal: siPaypal,
  kofi: siKofi,
  patreon: siPatreon,
  buymeacoffee: siBuymeacoffee,
  soundcloud: siSoundcloud,
  applemusic: siApplemusic,
};

const PRETTY_LABELS: Record<string, string> = {
  twitter: 'twitter / x',
  x: 'twitter / x',
  applemusic: 'apple music',
  buymeacoffee: 'buy me a coffee',
  cashapp: 'cash app',
  psn: 'playstation',
};

function getIconMeta(platform: string): IconMeta | null {
  return ICON_REGISTRY[platform.toLowerCase()] ?? null;
}

function getLinkLabel(platform: string, label?: string): string {
  if (label) return label;
  if (PRETTY_LABELS[platform.toLowerCase()]) return PRETTY_LABELS[platform.toLowerCase()] as string;
  return platform;
}

function getUrlPreview(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, '') + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    if (url.startsWith('mailto:')) return url.replace('mailto:', '');
    return url;
  }
}

function PlatformIcon({
  platform,
  size = 18,
  color,
  monochrome,
}: {
  platform: string;
  size?: number;
  color: string;
  monochrome?: boolean;
}) {
  const p = platform.toLowerCase();
  if (p === 'email') return <Mail size={size} style={{ color }} />;
  if (p === 'website' || p === 'web') return <Globe size={size} style={{ color }} />;
  if (p === 'xbox') return <Gamepad2 size={size} style={{ color }} />;
  const meta = getIconMeta(p);
  if (!meta) return <ExternalLink size={size} style={{ color }} />;
  const fill = monochrome ? color : `#${meta.hex}`;
  return (
    <span
      aria-hidden
      style={{ display: 'inline-flex', width: size, height: size, color: fill }}
      dangerouslySetInnerHTML={{
        __html: meta.svg.replace('<svg', `<svg fill="currentColor" width="${size}" height="${size}"`),
      }}
    />
  );
}

type GridProps = {
  links: ProfileLink[];
  accentColor: string;
  iconColor: string;
  monochrome?: boolean;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'card' | 'icon-only' | 'button';
};

export default function LinksGrid({
  links,
  accentColor,
  iconColor,
  monochrome,
  alignment = 'left',
  variant = 'card',
}: GridProps) {
  const visible = links.filter((l) => !l.hidden);
  if (!visible.length) return null;
  const rgb = hexToRgb(accentColor);

  const justify =
    alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start';

  if (variant === 'icon-only') {
    return (
      <div className={cn('flex flex-wrap gap-2', justify)}>
        {visible.map((link, i) => (
          <motion.a
            key={`${link.platform}-${i}`}
            href={ensureHref(link.url, link.platform)}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.04, duration: 0.25 }}
            whileHover={{ y: -3, scale: 1.05 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(${rgb}, 0.18)`,
              boxShadow: `0 0 0 0 rgba(${rgb}, 0)`,
            }}
            title={getLinkLabel(link.platform, link.label)}
            aria-label={getLinkLabel(link.platform, link.label)}
          >
            <PlatformIcon platform={link.platform} color={iconColor} monochrome={monochrome} />
          </motion.a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2 w-full')}>
      {visible.map((link, i) => (
        <motion.a
          key={`${link.platform}-${i}`}
          href={ensureHref(link.url, link.platform)}
          target={link.platform === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
          className={cn(
            'link-card group',
            alignment === 'center' && 'justify-center',
            alignment === 'right' && 'flex-row-reverse',
          )}
          style={{
            ['--accent-rgb' as string]: rgb,
          }}
        >
          <span
            className="flex-shrink-0 inline-flex items-center justify-center"
            style={{ color: iconColor }}
          >
            <PlatformIcon platform={link.platform} color={iconColor} monochrome={monochrome} size={18} />
          </span>
          <span className="flex-1 min-w-0 flex flex-col">
            <span className="font-medium text-[13px] leading-tight">
              {getLinkLabel(link.platform, link.label)}
            </span>
            <span className="text-[10px] truncate opacity-50">{getUrlPreview(link.url)}</span>
          </span>
          <ExternalLink
            size={13}
            className="opacity-0 group-hover:opacity-60 transition-opacity"
            style={{ color: accentColor }}
          />
        </motion.a>
      ))}
    </div>
  );
}

function ensureHref(url: string, platform: string): string {
  if (platform.toLowerCase() === 'email') {
    return url.startsWith('mailto:') ? url : `mailto:${url}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}
