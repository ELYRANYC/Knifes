export type LayoutType = 'default' | 'modern' | 'simplistic' | 'sleek';

export type BackgroundEffect =
  | 'none'
  | 'snow'
  | 'rain'
  | 'particles'
  | 'matrix'
  | 'stars'
  | 'bubbles'
  | 'fireflies';

export type CursorEffect = 'none' | 'trail' | 'glow' | 'sparkle' | 'hearts';

export type ProfileEffect = 'none' | 'rgb-glow' | 'pulse' | 'shake';

export type UsernameEffect = 'none' | 'gradient' | 'glow' | 'glitch' | 'rainbow';

export type FontFamily =
  | 'inter'
  | 'jetbrains-mono'
  | 'space-grotesk'
  | 'poppins'
  | 'orbitron'
  | 'caveat';

export type LinkPlatform =
  | 'discord'
  | 'twitter'
  | 'x'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitch'
  | 'spotify'
  | 'github'
  | 'gitlab'
  | 'linkedin'
  | 'telegram'
  | 'reddit'
  | 'snapchat'
  | 'pinterest'
  | 'facebook'
  | 'threads'
  | 'bluesky'
  | 'mastodon'
  | 'roblox'
  | 'steam'
  | 'psn'
  | 'xbox'
  | 'email'
  | 'website'
  | 'cashapp'
  | 'venmo'
  | 'paypal'
  | 'kofi'
  | 'patreon'
  | 'buymeacoffee'
  | 'soundcloud'
  | 'applemusic';

export type ProfileLink = {
  platform: LinkPlatform | string;
  url: string;
  label?: string;
  hidden?: boolean;
};

export type AudioTrack = {
  title: string;
  artist?: string;
  url: string;
  cover?: string;
};

export type Widget =
  | { type: 'discord-server'; invite: string }
  | { type: 'discord-presence'; userId: string }
  | { type: 'spotify'; userId: string }
  | { type: 'youtube'; channelId: string }
  | { type: 'github'; username: string };

export type Badge = {
  icon: string;
  label: string;
  color?: string;
};

export type ProfileColors = {
  accent: string;
  background: string;
  text: string;
  icon: string;
  secondary?: string;
};

export type BackgroundConfig = {
  type: 'image' | 'video' | 'gradient' | 'solid';
  value: string;
  blur?: number;
  opacity?: number;
};

export type LayoutSettings = {
  banner?: string;
  bannerRadius?: number;
  avatarRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
};

export type GradientConfig = {
  from: string;
  to: string;
  angle: number;
};

export type GlowConfig = {
  enabled: boolean;
  color: string;
  intensity: number;
};

export type MetaConfig = {
  title?: string;
  description?: string;
  embedImage?: string;
  themeColor?: string;
  favicon?: string;
};

export type EntryScreenConfig = {
  enabled: boolean;
  text?: string;
  clickToEnter?: boolean;
};

export type ProfileConfig = {
  username: string;
  displayName: string;
  avatar: string;
  description: string | string[];
  location?: string;
  pronouns?: string;
  verified?: boolean;

  layout: LayoutType;
  layoutSettings?: LayoutSettings;

  background: BackgroundConfig;
  backgroundEffect?: BackgroundEffect;

  cursorEffect?: CursorEffect;
  customCursor?: string;
  profileEffect?: ProfileEffect;

  colors: ProfileColors;
  gradient?: GradientConfig;
  monochromeIcons?: boolean;

  font?: FontFamily;
  usernameEffect?: UsernameEffect;
  animatedTitle?: boolean;

  typewriterSpeed?: number;
  typewriterDeleteSpeed?: number;
  typewriterPause?: number;

  links: ProfileLink[];
  linkAlignment?: 'left' | 'center' | 'right';

  audio?: AudioTrack[];
  audioAutoplay?: boolean;
  audioVolume?: number;

  widgets?: Widget[];

  badges?: Badge[];

  boxOpacity?: number;
  boxBlur?: number;
  glow?: GlowConfig;
  swapBoxColors?: boolean;

  discordId?: string;
  showDiscordPresence?: boolean;
  useDiscordAvatar?: boolean;

  meta?: MetaConfig;

  entryScreen?: EntryScreenConfig;
};

export type LanyardActivity = {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  sync_id?: string;
  party?: { id?: string };
  emoji?: { name: string; id?: string; animated?: boolean };
};

export type LanyardData = {
  discord_user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    global_name?: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
};
