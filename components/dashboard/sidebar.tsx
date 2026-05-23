'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wand2,
  Link2,
  Music,
  Award,
  LayoutGrid,
  AtSign,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
  { label: 'Customize', href: '/dashboard/customize', icon: Wand2 },
  { label: 'Links', href: '/dashboard/links', icon: Link2 },
  { label: 'Audio', href: '/dashboard/audio', icon: Music },
  { label: 'Badges', href: '/dashboard/badges', icon: Award },
  { label: 'Widgets', href: '/dashboard/widgets', icon: LayoutGrid },
  { label: 'Aliases', href: '/dashboard/aliases', icon: AtSign },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet rail */}
      <aside
        className="hidden md:flex flex-col gap-1 flex-shrink-0 w-[60px] lg:w-[220px] p-3 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto no-scrollbar"
        style={{ borderRight: '1px solid var(--hairline)' }}
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors duration-200',
                'justify-center lg:justify-start',
              )}
              style={{
                background: active ? 'var(--surface-elevated)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full"
                  style={{ background: 'var(--accent-red)' }}
                />
              )}
              <Icon size={17} className="flex-shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-around px-1 py-1.5"
        style={{
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg"
              style={{ color: active ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
              aria-label={item.label}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
