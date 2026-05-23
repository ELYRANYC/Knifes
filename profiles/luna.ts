import type { ProfileConfig } from '@/lib/types';

export const luna: ProfileConfig = {
  username: 'luna',
  displayName: 'luna',
  avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=luna&backgroundColor=ffb3dd',
  description: ['just a girl on the internet', 'loves moon phases ✦', 'dreaming in pink'],
  location: 'milky way',
  pronouns: 'she/her',
  verified: false,

  layout: 'default',
  layoutSettings: {
    avatarRadius: 999,
    borderColor: 'rgba(255,143,209,0.5)',
    borderWidth: 2,
    borderRadius: 22,
  },

  background: {
    type: 'gradient',
    value: 'linear-gradient(180deg, #1a0d2e 0%, #3d1a4a 100%)',
  },
  gradient: { from: '#1a0d2e', to: '#3d1a4a', angle: 180 },
  backgroundEffect: 'fireflies',

  cursorEffect: 'sparkle',
  profileEffect: 'pulse',

  colors: {
    accent: '#ff8fd1',
    background: '#1a0d2e',
    text: '#ffe5f3',
    icon: '#ffb3dd',
    secondary: 'rgba(255,229,243,0.78)',
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
      cover: 'https://api.dicebear.com/9.x/shapes/svg?seed=luna-audio&backgroundColor=ff8fd1,3d1a4a',
    },
  ],
  audioAutoplay: true,
  audioVolume: 0.4,

  badges: [
    { icon: 'heart', label: 'soft', color: '#ff8fd1' },
    { icon: 'star', label: 'dreamer', color: '#ffd1ec' },
    { icon: 'moon', label: 'luna', color: '#c891ff' },
  ],

  boxOpacity: 0.48,
  boxBlur: 22,
  glow: { enabled: true, color: '#ff8fd1', intensity: 1.2 },

  meta: {
    title: 'luna ♡ knives.lol',
    description: 'just a girl on the internet',
    themeColor: '#ff8fd1',
  },

  entryScreen: {
    enabled: true,
    text: 'click to wake up ♡',
    clickToEnter: true,
  },
};
