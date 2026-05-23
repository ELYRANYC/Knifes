import type { ProfileConfig } from '@/lib/types';

export const jordan: ProfileConfig = {
  username: 'jordan',
  displayName: 'Jordan',
  avatar: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=jordan&backgroundColor=0d0d12',
  description: 'designer, writer, occasional photographer.',
  location: 'Brooklyn, NY',
  pronouns: 'they/them',

  layout: 'simplistic',
  layoutSettings: {
    avatarRadius: 999,
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderRadius: 14,
  },

  background: {
    type: 'solid',
    value: '#0d0d12',
  },
  backgroundEffect: 'none',

  cursorEffect: 'none',
  profileEffect: 'none',

  colors: {
    accent: '#ffffff',
    background: '#0d0d12',
    text: '#f0f0f5',
    icon: '#ffffff',
    secondary: 'rgba(240,240,245,0.55)',
  },
  monochromeIcons: true,

  font: 'space-grotesk',
  usernameEffect: 'none',

  links: [
    { platform: 'twitter', url: 'https://twitter.com/jordan' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/jordan' },
    { platform: 'github', url: 'https://github.com/jordan' },
    { platform: 'website', url: 'https://jordan.design', label: 'jordan.design' },
    { platform: 'email', url: 'hi@jordan.design' },
  ],
  linkAlignment: 'center',

  boxOpacity: 0,
  boxBlur: 0,
  glow: { enabled: false, color: '#ffffff', intensity: 0 },

  meta: {
    title: 'Jordan',
    description: 'designer, writer, occasional photographer.',
    themeColor: '#0d0d12',
  },

  entryScreen: {
    enabled: false,
  },
};
