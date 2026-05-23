import type {
  ProfileConfig,
  LayoutType,
  BackgroundEffect,
  CursorEffect,
  ProfileEffect,
  UsernameEffect,
  FontFamily,
} from '@/lib/types';
import type { ProfileRow, ProfileInsert } from '@/lib/supabase/types';

// The DB stores opacity/volume as 0–100 ints; ProfileConfig uses 0–1 floats
// (that's what the Phase 1 layouts + audio player expect). Convert at the boundary.
const pct = (v: number | null | undefined, fallback: number) =>
  typeof v === 'number' ? v / 100 : fallback;
const toPct = (v: number | undefined, fallback: number) =>
  typeof v === 'number' ? Math.round(v * 100) : fallback;

const DEFAULT_COLORS = {
  accent: '#ff453a',
  background: '#000000',
  text: '#f5f5f7',
  icon: '#f5f5f7',
  secondary: '#a1a1a6',
};

export function rowToConfig(row: ProfileRow): ProfileConfig {
  return {
    username: row.username,
    displayName: row.display_name,
    avatar:
      row.avatar_url ||
      `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(row.username)}`,
    description: row.description ?? 'new on knives.lol',
    location: row.location ?? undefined,
    pronouns: row.pronouns ?? undefined,
    verified: row.verified,

    layout: (row.layout as LayoutType) || 'default',
    layoutSettings: row.layout_settings ?? undefined,

    background: row.background ?? { type: 'solid', value: '#000000' },
    backgroundEffect: (row.background_effect as BackgroundEffect) ?? 'none',

    cursorEffect: (row.cursor_effect as CursorEffect) ?? 'none',
    customCursor: row.custom_cursor ?? undefined,
    profileEffect: (row.profile_effect as ProfileEffect) ?? 'none',

    colors: row.colors ?? DEFAULT_COLORS,
    gradient: row.gradient ?? undefined,
    monochromeIcons: row.monochrome_icons,

    font: (row.font as FontFamily) || 'inter',
    usernameEffect: (row.username_effect as UsernameEffect) || 'none',
    animatedTitle: row.animated_title,

    typewriterSpeed: row.typewriter_speed,
    typewriterDeleteSpeed: row.typewriter_delete_speed,
    typewriterPause: row.typewriter_pause,

    links: row.links ?? [],
    linkAlignment: (row.link_alignment as 'left' | 'center' | 'right') || 'center',

    audio: row.audio ?? [],
    audioAutoplay: row.audio_autoplay,
    audioVolume: pct(row.audio_volume, 0.3),

    widgets: row.widgets ?? [],
    badges: row.badges ?? [],

    boxOpacity: pct(row.box_opacity, 0.5),
    boxBlur: row.box_blur,
    glow: row.glow ?? undefined,
    swapBoxColors: row.swap_box_colors,

    discordId: row.discord_id ?? undefined,
    showDiscordPresence: row.show_discord_presence,
    useDiscordAvatar: row.use_discord_avatar,

    meta: row.meta ?? undefined,
    entryScreen: row.entry_screen ?? undefined,
  };
}

// Maps a (partial) ProfileConfig to DB column shape for inserts/updates.
// Only includes keys that are present on `config`.
export function configToRow(config: Partial<ProfileConfig>): Partial<ProfileRow> {
  const row: Partial<ProfileRow> = {};
  if (config.username !== undefined) row.username = config.username;
  if (config.displayName !== undefined) row.display_name = config.displayName;
  if (config.avatar !== undefined) row.avatar_url = config.avatar;
  if (config.description !== undefined) row.description = config.description;
  if (config.location !== undefined) row.location = config.location ?? null;
  if (config.pronouns !== undefined) row.pronouns = config.pronouns ?? null;
  if (config.verified !== undefined) row.verified = config.verified;

  if (config.layout !== undefined) row.layout = config.layout;
  if (config.layoutSettings !== undefined) row.layout_settings = config.layoutSettings ?? null;

  if (config.background !== undefined) row.background = config.background;
  if (config.backgroundEffect !== undefined) row.background_effect = config.backgroundEffect;
  if (config.cursorEffect !== undefined) row.cursor_effect = config.cursorEffect;
  if (config.customCursor !== undefined) row.custom_cursor = config.customCursor ?? null;
  if (config.profileEffect !== undefined) row.profile_effect = config.profileEffect;

  if (config.colors !== undefined) row.colors = config.colors;
  if (config.gradient !== undefined) row.gradient = config.gradient ?? null;
  if (config.monochromeIcons !== undefined) row.monochrome_icons = config.monochromeIcons;

  if (config.font !== undefined) row.font = config.font;
  if (config.usernameEffect !== undefined) row.username_effect = config.usernameEffect;
  if (config.animatedTitle !== undefined) row.animated_title = config.animatedTitle;

  if (config.typewriterSpeed !== undefined) row.typewriter_speed = config.typewriterSpeed;
  if (config.typewriterDeleteSpeed !== undefined)
    row.typewriter_delete_speed = config.typewriterDeleteSpeed;
  if (config.typewriterPause !== undefined) row.typewriter_pause = config.typewriterPause;

  if (config.links !== undefined) row.links = config.links;
  if (config.linkAlignment !== undefined) row.link_alignment = config.linkAlignment;

  if (config.audio !== undefined) row.audio = config.audio;
  if (config.audioAutoplay !== undefined) row.audio_autoplay = config.audioAutoplay;
  if (config.audioVolume !== undefined) row.audio_volume = toPct(config.audioVolume, 30);

  if (config.widgets !== undefined) row.widgets = config.widgets;
  if (config.badges !== undefined) row.badges = config.badges;

  if (config.boxOpacity !== undefined) row.box_opacity = toPct(config.boxOpacity, 50);
  if (config.boxBlur !== undefined) row.box_blur = config.boxBlur;
  if (config.glow !== undefined) row.glow = config.glow ?? null;
  if (config.swapBoxColors !== undefined) row.swap_box_colors = config.swapBoxColors;

  if (config.discordId !== undefined) row.discord_id = config.discordId ?? null;
  if (config.showDiscordPresence !== undefined)
    row.show_discord_presence = config.showDiscordPresence;
  if (config.useDiscordAvatar !== undefined) row.use_discord_avatar = config.useDiscordAvatar;

  if (config.meta !== undefined) row.meta = config.meta ?? null;
  if (config.entryScreen !== undefined) row.entry_screen = config.entryScreen ?? null;

  return row;
}

// Apple-aesthetic default profile created on signup.
export function defaultProfileInsert(userId: string, username: string): ProfileInsert {
  return {
    user_id: userId,
    username,
    display_name: username,
    avatar_url: `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(username)}`,
    description: 'new on knives.lol',
    location: null,
    pronouns: null,
    verified: false,

    layout: 'default',
    layout_settings: null,

    background: { type: 'solid', value: '#000000' },
    background_effect: 'none',
    cursor_effect: 'none',
    custom_cursor: null,
    profile_effect: 'none',

    colors: {
      accent: '#ff453a',
      background: '#000000',
      text: '#f5f5f7',
      icon: '#f5f5f7',
      secondary: '#a1a1a6',
    },
    gradient: null,
    monochrome_icons: false,

    font: 'inter',
    username_effect: 'none',
    animated_title: false,

    typewriter_speed: 80,
    typewriter_delete_speed: 40,
    typewriter_pause: 1500,

    links: [],
    link_alignment: 'center',

    audio: [],
    audio_autoplay: false,
    audio_volume: 30,

    widgets: [],
    badges: [],

    box_opacity: 50,
    box_blur: 16,
    glow: { enabled: false, color: '#ff453a', intensity: 1 },
    swap_box_colors: false,

    discord_id: null,
    show_discord_presence: false,
    use_discord_avatar: false,

    meta: null,
    entry_screen: { enabled: true, text: 'click to enter', clickToEnter: true },
  };
}

// Validates a candidate username against the Phase 2 rules.
export function validateUsername(input: string): { valid: boolean; error?: string } {
  const u = input.trim();
  if (u.length < 3) return { valid: false, error: 'Must be at least 3 characters' };
  if (u.length > 20) return { valid: false, error: 'Must be 20 characters or fewer' };
  if (!/^[a-z0-9_.]+$/i.test(u)) {
    return { valid: false, error: 'Only letters, numbers, underscores, and dots' };
  }
  return { valid: true };
}
