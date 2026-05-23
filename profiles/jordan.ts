import type { ProfileConfig } from '@/lib/types';

export const jordan: ProfileConfig = {
  username: 'jordan',
  displayName: 'Jordan',
  avatar: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=jordan&backgroundColor=0d0306',
  description: 'designer, writer, occasional photographer.',
  location: 'Brooklyn, NY',
  pronouns: 'they/them',

  layout: 'simplistic',
  layoutSettings: {
    avatarRadius: 999,
    borderColor: 'rgba(255,0,51,0.25)',
    borderWidth: 1,
    borderRadius: 14,
  },

  background: {
    type: 'solid',
    value: '#0a0000',
  },
  backgroundEffect: 'none',

  cursorEffect: 'none',
  profileEffect: 'none',

  colors: {
    accent: '#ff0033',
    background: '#0a0000',
    text: '#f0f0f5',
    icon: '#ff0033',
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
  glow: { enabled: false, color: '#ff0033', intensity: 0 },

  meta: {
    title: 'Jordan',
    description: 'designer, writer, occasional photographer.',
    themeColor: '#0a0000',
  },

  entryScreen: {
    enabled: false,
  },
};
