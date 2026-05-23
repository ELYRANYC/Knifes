import type { ProfileConfig } from '@/lib/types';

export const alex: ProfileConfig = {
  username: 'alex',
  displayName: 'alex',
  avatar: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=alex&backgroundColor=1a0000',
  description: ['sysadmin by day', 'ctf player by night', 'i make computers cry'],
  location: 'tor exit node',
  pronouns: 'he/him',
  verified: true,

  layout: 'modern',
  layoutSettings: {
    avatarRadius: 14,
    borderColor: 'rgba(255,0,51,0.4)',
    borderWidth: 1,
    borderRadius: 18,
  },

  background: {
    type: 'solid',
    value: '#000000',
  },
  backgroundEffect: 'matrix',

  cursorEffect: 'trail',
  profileEffect: 'rgb-glow',

  colors: {
    accent: '#ff0033',
    background: '#000000',
    text: '#ff3355',
    icon: '#ff3355',
    secondary: 'rgba(255,51,85,0.7)',
  },
  monochromeIcons: true,

  font: 'jetbrains-mono',
  usernameEffect: 'glitch',
  animatedTitle: true,

  typewriterSpeed: 70,
  typewriterDeleteSpeed: 32,
  typewriterPause: 1600,

  links: [
    { platform: 'github', url: 'https://github.com/alex', label: 'github' },
    { platform: 'discord', url: 'https://discord.com/users/000000000000000000', label: 'discord' },
    { platform: 'telegram', url: 'https://t.me/alex', label: 'telegram' },
    { platform: 'twitter', url: 'https://twitter.com/alex' },
    { platform: 'email', url: 'root@alex.dev', label: 'root@alex.dev' },
  ],
  linkAlignment: 'left',

  audio: [
    {
      title: 'cyberwave loop',
      artist: 'public domain',
      url: 'https://archive.org/download/cyberpunk-loop/cyberpunk-loop.mp3',
      cover: 'https://api.dicebear.com/9.x/shapes/svg?seed=alex-audio&backgroundColor=ff0033,000000',
    },
  ],
  audioAutoplay: true,
  audioVolume: 0.45,

  widgets: [
    { type: 'discord-server', invite: 'lanyard' },
    { type: 'github', username: 'torvalds' },
    { type: 'discord-presence', userId: '94490510688792576' },
  ],

  badges: [
    { icon: 'terminal', label: 'root' },
    { icon: 'shield', label: 'verified' },
    { icon: 'skull', label: '1337' },
    { icon: 'code', label: 'hacker' },
  ],

  boxOpacity: 0.62,
  boxBlur: 16,
  glow: { enabled: true, color: '#ff0033', intensity: 1.4 },

  discordId: '94490510688792576',
  showDiscordPresence: true,
  useDiscordAvatar: false,

  meta: {
    title: 'alex // knives.lol',
    description: '> access granted',
    themeColor: '#ff0033',
  },

  entryScreen: {
    enabled: true,
    text: '[ access terminal ]',
    clickToEnter: true,
  },
};
