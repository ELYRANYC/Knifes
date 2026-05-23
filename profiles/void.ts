import type { ProfileConfig } from '@/lib/types';

export const voidProfile: ProfileConfig = {
  username: 'void',
  displayName: 'void',
  avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=void&backgroundColor=1a0000',
  description: 'i collect old things and quiet moments',
  location: 'the void',
  pronouns: 'any/all',

  layout: 'sleek',
  layoutSettings: {
    banner: 'https://api.dicebear.com/9.x/shapes/svg?seed=void-banner&backgroundType=gradientLinear&backgroundColor=ff0033,0a0000&shape1Color=ff0033&shape2Color=2a0000&shape3Color=0a0000',
    bannerRadius: 18,
    avatarRadius: 50,
    borderColor: '#8b0000',
    borderWidth: 1,
    borderRadius: 20,
  },

  background: {
    type: 'solid',
    value: '#0a0000',
  },
  backgroundEffect: 'particles',

  cursorEffect: 'glow',
  profileEffect: 'rgb-glow',

  colors: {
    accent: '#ff0033',
    background: '#0a0000',
    text: '#f0e6e6',
    icon: '#ff3355',
    secondary: 'rgba(240,230,230,0.72)',
  },
  monochromeIcons: true,

  font: 'orbitron',
  usernameEffect: 'glow',

  links: [
    { platform: 'spotify', url: 'https://open.spotify.com/user/void' },
    { platform: 'discord', url: 'https://discord.com/users/000000000' },
    { platform: 'soundcloud', url: 'https://soundcloud.com/void' },
    { platform: 'github', url: 'https://github.com/void' },
    { platform: 'kofi', url: 'https://ko-fi.com/void' },
  ],
  linkAlignment: 'left',

  audio: [
    {
      title: 'dark ambient drone',
      artist: 'public domain',
      url: 'https://archive.org/download/dark-ambient-drone/dark-drone.mp3',
      cover: 'https://api.dicebear.com/9.x/shapes/svg?seed=void-audio&backgroundColor=ff0033,0a0000',
    },
  ],
  audioAutoplay: true,
  audioVolume: 0.5,

  badges: [
    { icon: 'skull', label: 'mortal' },
    { icon: 'flame', label: 'burning', color: '#ff6633' },
    { icon: 'crown', label: 'void', color: '#ff0033' },
  ],

  boxOpacity: 0.65,
  boxBlur: 14,
  glow: { enabled: true, color: '#ff0033', intensity: 1.5 },

  meta: {
    title: 'void — knives.lol',
    description: 'i collect old things and quiet moments',
    themeColor: '#ff0033',
  },

  entryScreen: {
    enabled: true,
    text: '[ enter the void ]',
    clickToEnter: true,
  },
};
