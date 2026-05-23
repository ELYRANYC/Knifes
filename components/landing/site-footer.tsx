'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Logo from './logo';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'General',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Recover Account', href: '#' },
      { label: 'Leaderboard', href: '#leaderboard-section' },
      { label: 'Website Status', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Changelog', href: '#' },
      { label: 'Redeem Code', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Discord Server', href: '#' },
      { label: 'Support Email', href: 'mailto:support@knives.lol' },
      { label: 'Business Email', href: 'mailto:business@knives.lol' },
      { label: 'Legal Email', href: 'mailto:legal@knives.lol' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Copyright Policy', href: '#' },
    ],
  },
];

const SOCIAL_ICONS = [
  {
    label: 'Discord',
    href: '#',
    svg: 'M19.27 5.33A19.6 19.6 0 0014.45 4l-.24.25c2.2.4 3.2 1 4.27 1.85a13 13 0 00-11.06-.5c-.3.15-.45.25-.45.25.95-.9 2.4-1.55 4.36-1.7L11.25 4a18.3 18.3 0 00-4.83 1.33A19.7 19.7 0 003 16c1.1 1.55 2.65 2.5 4.1 2.55l.65-.9A6.1 6.1 0 015 16c.3.25.7.5 1.1.7a16.7 16.7 0 0011.8 0c.4-.2.8-.45 1.1-.7-.85.75-1.85 1.4-2.85 1.85.2.3.45.6.65.85 1.45-.05 3-1 4.1-2.55 0-3.3-1.55-6.5-2.93-8.32zM9.4 14.5c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75zm5.2 0c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75z',
  },
  {
    label: 'TikTok',
    href: '#',
    svg: 'M19.6 8a4.7 4.7 0 01-2.75-.88V15a5.95 5.95 0 11-5.95-5.95c.34 0 .68.03 1 .1v2.4a3.55 3.55 0 102.56 3.45V3h2.4a4.7 4.7 0 002.74 4.2V8z',
  },
  {
    label: 'X',
    href: '#',
    svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Telegram',
    href: '#',
    svg: 'M11.94 14.96L11.6 18.6c.47 0 .68-.2.93-.45l2.23-2.12 4.62 3.38c.85.47 1.45.22 1.68-.78l3.04-14.25c.27-1.25-.45-1.74-1.28-1.44L1.7 9.45c-1.22.47-1.2 1.15-.2 1.46l4.93 1.54 11.43-7.2c.54-.36 1.03-.16.62.2z',
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative px-6 pt-16 pb-8 border-t" style={{ borderColor: 'rgba(255,0,51,0.12)' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* brand block */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <Logo size="lg" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(35,165,90,0.1)',
                border: '1px solid rgba(35,165,90,0.32)',
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#23a55a', boxShadow: '0 0 8px #23a55a' }}
              />
              <span className="text-[11px] font-medium" style={{ color: '#23a55a' }}>
                System Status — Operational
              </span>
            </motion.div>

            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'rgba(240,240,245,0.55)' }}>
              Create feature-rich, customizable and modern link-in-bio pages with knives.lol.
            </p>

            <button
              type="button"
              className="inline-flex items-center justify-between gap-2 max-w-[180px] px-3 py-2 rounded-lg text-[12px] transition-colors hover:bg-white/[0.04]"
              style={{
                background: 'rgba(15,0,4,0.55)',
                border: '1px solid rgba(255,0,51,0.18)',
                color: 'rgba(240,240,245,0.75)',
              }}
            >
              <span>🇺🇸 English (US)</span>
              <ChevronDown size={12} style={{ color: '#ff1f4d' }} />
            </button>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: '#ff1f4d' }}
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors hover:text-white"
                      style={{ color: 'rgba(240,240,245,0.55)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,0,51,0.1)' }}
        >
          <div className="text-[12px]" style={{ color: 'rgba(240,240,245,0.4)' }}>
            Copyright © 2026 knives.lol — All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            {SOCIAL_ICONS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(20,0,6,0.6)',
                  border: '1px solid rgba(255,0,51,0.2)',
                  color: 'rgba(240,240,245,0.65)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff1f4d';
                  e.currentTarget.style.borderColor = 'rgba(255,0,51,0.55)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255,0,51,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(240,240,245,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255,0,51,0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d={s.svg} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
