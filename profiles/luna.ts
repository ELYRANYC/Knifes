import type { ProfileConfig } from '@/lib/types';

export const luna: ProfileConfig = {
  username: 'luna',
  displayName: 'luna',
  avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=luna&backgroundColor=ff3d6e',
  description: ['just a girl on the internet', 'loves moon phases ✦', 'dreaming in red'],
  location: 'milky way',
  pronouns: 'she/her',
  verified: false,

  layout: 'default',
  layoutSettings: {
    avatarRadius: 999,
    borderColor: 'rgba(255,61,110,0.5)',
    borderWidth: 2,
    borderRadius: 22,
  },

  background: {
    type: 'gradient',
    value: 'linear-gradient(180deg, #1a0000 0%, #3d0a14 100%)',
  },
  gradient: { from: '#1a0000', to: '#3d0a14', angle: 180 },
  backgroundEffect: 'fireflies',

  cursorEffect: 'sparkle',
  profileEffect: 'pulse',

  colors: {
    accent: '#ff3d6e',
    background: '#1a0000',
    text: '#ffe5ea',
    icon: '#ff6680',
    secondary: 'rgba(255,229,234,0.78)',
  },
  monochromeIcons: false,

  font: 'caveat',
  usernameEffect: 'gradient',

  typewriterSpeed: 100,
  typewriterDeleteSpeed: 50,
  typewriterPause: 1800,

  links: [
    { platform: 'instagram', url: 'https://instagram.com/luna' },
    { platform: 'tiktok', url: 'https://tiktok.com/@luna' },
    { platform: 'spotify', url: 'https://open.spotify.com/user/luna' },
    { platform: 'twitter', url: 'https://twitter.com/luna' },
    { platform: 'pinterest', url: 'https://pinterest.com/luna' },
    { platform: 'kofi', url: 'https://ko-fi.com/luna', label: 'support me ♡' },
  ],
  linkAlignment: 'center',

  audio: [
    {
      title: 'dreamy ambient',
      artist: 'creative commons',
      url: 'https://archive.org/download/ambient-pad-loop/ambient-pad.mp3',
      cover: 'https://api.dicebear.com/9.x/shapes/svg?seed=luna-audio&backgroundColor=ff3d6e,1a0000',
    },
  ],
  audioAutoplay: true,
  audioVolume: 0.4,

  badges: [
    { icon: 'heart', label: 'soft', color: '#ff3d6e' },
    { icon: 'star', label: 'dreamer', color: '#ff6680' },
    { icon: 'moon', label: 'luna', color: '#ff99b3' },
  ],

  boxOpacity: 0.48,
  boxBlur: 22,
  glow: { enabled: true, color: '#ff3d6e', intensity: 1.2 },

  meta: {
    title: 'luna ♡ knives.lol',
    description: 'just a girl on the internet',
    themeColor: '#ff3d6e',
  },

  entryScreen: {
    enabled: true,
    text: 'click to wake up ♡',
    clickToEnter: true,
  },
};
