'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Settings, LogOut, User } from 'lucide-react';
import Logo from '@/components/landing/logo';
import { useAuth } from '@/lib/use-auth';

export default function TopBar({
  username,
  avatarUrl,
  email,
}: {
  username: string;
  avatarUrl: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-[57px]"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <Logo size="md" href="/dashboard/overview" />

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 transition-colors hover:bg-white/[0.05]"
          style={{ border: '1px solid var(--hairline)' }}
        >
          <img
            src={avatarUrl}
            alt=""
            className="w-7 h-7 rounded-full object-cover"
            style={{ border: '1px solid var(--hairline)' }}
          />
          <span className="text-[13px] hidden sm:inline" style={{ color: 'var(--text-primary)' }}>
            {username}
          </span>
          <ChevronDown
            size={14}
            style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none' }}
            className="transition-transform duration-200"
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 mt-2 w-56 rounded-2xl p-1.5"
              style={{
                background: 'var(--surface-elevated)',
                border: '1px solid var(--hairline)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid var(--hairline)' }}>
                <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {username}
                </div>
                <div className="text-[11px] truncate" style={{ color: 'var(--text-tertiary)' }}>
                  {email}
                </div>
              </div>
              <DropItem href={`/${username}`} external icon={<ExternalLink size={14} />}>
                View profile
              </DropItem>
              <DropItem href="/dashboard/customize" icon={<User size={14} />}>
                Customize
              </DropItem>
              <DropItem href="/dashboard/settings" icon={<Settings size={14} />}>
                Settings
              </DropItem>
              <button
                onClick={signOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-left transition-colors hover:bg-white/[0.06]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <LogOut size={14} />
                Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function DropItem({
  href,
  children,
  icon,
  external,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors hover:bg-white/[0.06]"
      style={{ color: 'var(--text-secondary)' }}
    >
      {icon}
      {children}
    </Link>
  );
}
