import type { ProfileConfig } from '@/lib/types';

/**
 * ============================================================================
 *  knives.lol — PROFILE TEMPLATE
 * ============================================================================
 *
 *  Copy this file, rename it to /profiles/{username}.ts, and tweak.
 *  Every option is documented inline. Required fields are flagged.
 *  Then register your profile in /profiles/index.ts.
 *
 * ============================================================================
 */

export const template: ProfileConfig = {
  // ─────── IDENTITY (required) ───────────────────────────────────────────────

  // Lowercase URL slug. Profile is served at /<username>.
  username: 'template',

  // Public display name shown at the top of the card.
  displayName: 'template',

  // Public image URL (square). DiceBear styles are free, instant, and varied:
  //   notionists-neutral, bottts-neutral, lorelei, adventurer, micah, miniavs
  //   pixel-art, fun-emoji, thumbs, croodles, big-smile, avataaars
  avatar: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=template',

  // String = static. Array = typewriter (cycles through phrases).
  description: ['build cool things', 'break boring things', 'repeat'],

  // Optional micro-info displayed under the username.
  location: 'somewhere on earth',
  pronouns: 'they/them',

  // If true, shows a small accent-colored checkmark on the avatar.
  verified: false,

  // ─────── LAYOUT (required) ─────────────────────────────────────────────────

  // 'default'      — centered glass card, classic guns.lol look
  // 'modern'       — two-tab card (profile / widgets) with smooth transitions
  // 'simplistic'   — no glass card, just buttons (clean, minimal)
  // 'sleek'        — banner image at top, twitter-style avatar overlap
  layout: 'default',

  layoutSettings: {
    // For 'sleek' layout. Public image URL, 16:9 ratio recommended.
    banner: undefined,
    bannerRadius: 14, // px, 0-32
    avatarRadius: 999, // px. 999 = circle. 12 = squircle. 0 = sharp square.
    borderColor: undefined, // CSS color. Defaults to accent w/ low alpha.
    borderWidth: 1, // px, 0-4
    borderRadius: 16, // px, 0-32
  },

  // ─────── BACKGROUND (required) ─────────────────────────────────────────────

  background: {
    // 'solid'   — flat color (value = hex)
    // 'gradient'— two-stop gradient (value = CSS string OR use `gradient` below)
    // 'image'   — image URL (value = url)
    // 'video'   — looping muted video (value = url, .mp4/.webm)
    type: 'solid',
    value: '#0a0a0f',
    blur: 0, // px, 0-32
    opacity: 1, // 0-1
  },

  // For gradient backgrounds. Overrides `background.value` if set.
  gradient: undefined,
  // example: { from: '#1a0d2e', to: '#3d1a4a', angle: 180 }

  // Animated canvas effect rendered over the background:
  //   'none' | 'snow' | 'rain' | 'particles' | 'matrix' | 'stars' | 'bubbles' | 'fireflies'
  backgroundEffect: 'none',

  // ─────── CURSOR & PROFILE EFFECTS ──────────────────────────────────────────

  // 'none' | 'trail' | 'glow' | 'sparkle' | 'hearts'
  cursorEffect: 'none',

  // Custom cursor image (URL). Optional, applied on body.
  customCursor: undefined,

  // 'none' | 'rgb-glow' (animated rainbow glow) | 'pulse' (breathing scale) | 'shake' (gentle drift)
  profileEffect: 'none',

  // ─────── COLORS (required) ─────────────────────────────────────────────────

  colors: {
    accent: '#00ff66',         // Drives glows, badges, link hover, etc.
    background: '#0a0a0f',     // Fallback when no bg image
    text: '#f0f0f5',           // Primary text
    icon: '#00ff66',           // Link icons (overridden if monochromeIcons=false and platform has brand color)
    secondary: 'rgba(240,240,245,0.7)', // Description / muted text
  },

  // If true, all link icons rendered in `colors.icon`. If false, brand colors.
  monochromeIcons: false,

  // ─────── TYPOGRAPHY ────────────────────────────────────────────────────────

  // 'inter' | 'jetbrains-mono' | 'space-grotesk' | 'poppins' | 'orbitron' | 'caveat'
  font: 'inter',

  // 'none' | 'gradient' | 'glow' | 'glitch' | 'rainbow'
  usernameEffect: 'none',

  // If true, page <title> cycles through description phrases.
  animatedTitle: false,

  // Typewriter tuning (only used when description is an array).
  typewriterSpeed: 80,
  typewriterDeleteSpeed: 40,
  typewriterPause: 1500,

  // ─────── LINKS (required, can be empty array) ──────────────────────────────

  // Supported platforms: discord, twitter, x, instagram, tiktok, youtube,
  // twitch, spotify, github, gitlab, linkedin, telegram, reddit, snapchat,
  // pinterest, facebook, threads, bluesky, mastodon, roblox, steam, psn,
  // xbox, email, website, cashapp, venmo, paypal, kofi, patreon,
  // buymeacoffee, soundcloud, applemusic.
  links: [
    { platform: 'twitter', url: 'https://twitter.com/example' },
    { platform: 'github', url: 'https://github.com/example' },
    { platform: 'email', url: 'hi@example.com', label: 'say hi' },
    // { platform: 'spotify', url: '...', hidden: true } — keep config but hide
  ],

  // 'left' | 'center' | 'right'
  linkAlignment: 'left',

  // ─────── AUDIO ─────────────────────────────────────────────────────────────

  // Compact player in the bottom-left corner. Use Internet Archive, Pixabay,
  // Free Music Archive, or self-hosted URLs (CORS-enabled).
  audio: undefined,
  // example:
  // audio: [
  //   {
  //     title: 'ambient track',
  //     artist: 'royalty free',
  //     url: 'https://archive.org/download/.../track.mp3',
  //     cover: 'https://...',
  //   },
  // ],
  audioAutoplay: true,
  audioVolume: 0.5, // 0-1

  // ─────── WIDGETS (Modern layout only) ──────────────────────────────────────

  widgets: undefined,
  // example:
  // widgets: [
  //   { type: 'discord-server', invite: 'discord-invite-code' },
  //   { type: 'discord-presence', userId: '0000000000' },
  //   { type: 'spotify', userId: 'spotify-id' },
  //   { type: 'youtube', channelId: '@handle' },
  //   { type: 'github', username: 'octocat' },
  // ],

  // ─────── BADGES ────────────────────────────────────────────────────────────

  // Available icon keys (lucide-react):
  //   crown, shield, skull, flame, star, heart, moon, sun, sparkles,
  //   terminal, zap, award, gem, bot, code, music, eye
  badges: undefined,
  // example:
  // badges: [
  //   { icon: 'crown', label: 'og' },
  //   { icon: 'shield', label: 'verified', color: '#00d4ff' },
  // ],

  // ─────── PROFILE BOX ───────────────────────────────────────────────────────

  boxOpacity: 0.5, // 0-1, glass card background opacity
  boxBlur: 18,     // px, backdrop-filter blur

  glow: {
    enabled: true,
    color: '#00ff66', // Usually matches accent
    intensity: 1, // 0-2 multiplier
  },

  swapBoxColors: false, // Future use

  // ─────── DISCORD (Lanyard integration) ─────────────────────────────────────

  // Your Discord user ID. User must be in discord.gg/lanyard server.
  discordId: undefined,
  // If true, status dot appears on avatar (online / idle / dnd / offline).
  showDiscordPresence: false,
  // If true, avatar is loaded live from Discord (overrides `avatar`).
  useDiscordAvatar: false,

  // ─────── META (Open Graph / Discord embed) ─────────────────────────────────

  meta: {
    title: undefined,        // Defaults to "<displayName> | knives.lol"
    description: undefined,  // Defaults to first description phrase
    embedImage: undefined,   // Defaults to avatar
    themeColor: undefined,   // Defaults to colors.accent (Discord sidebar)
    favicon: undefined,
  },

  // ─────── ENTRY SCREEN ──────────────────────────────────────────────────────

  // Full-screen click gate. Required for autoplay audio on most browsers.
  entryScreen: {
    enabled: true,
    text: 'click to enter',
    clickToEnter: true,
  },
};

export default template;
