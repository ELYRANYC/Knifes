'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './logo';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Help Center', href: '/help' },
  { label: 'Discord', href: '#' },
  { label: 'Leaderboard', href: '#profiles' },
  { label: 'Pricing', href: '#pricing' },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'pointer-events-auto mt-3 sm:mt-4 mx-3 sm:mx-6 w-full max-w-[1100px] rounded-full transition-all',
          'flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3',
        )}
        style={{
          background: scrolled ? 'rgba(15, 0, 4, 0.85)' : 'rgba(20, 0, 6, 0.55)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: `1px solid ${scrolled ? 'rgba(255,0,51,0.28)' : 'rgba(255,0,51,0.16)'}`,
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(255,0,51,0.18)'
            : '0 4px 18px rgba(0,0,0,0.35)',
        }}
      >
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-[13px] rounded-full text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-5 mx-2 bg-white/10" />
          <Link
            href="/login"
            className="px-3 py-1.5 text-[13px] rounded-full text-white/80 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="ml-1 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all hover:scale-[1.03]"
            style={{
              background: '#ff0033',
              color: '#fff',
              boxShadow: '0 0 16px rgba(255,0,51,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            Sign Up Free
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white"
          style={{ background: 'rgba(255,0,51,0.1)', border: '1px solid rgba(255,0,51,0.25)' }}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="md:hidden absolute top-full right-3 mt-2 w-60 rounded-2xl p-2 flex flex-col"
              style={{
                background: 'rgba(15, 0, 4, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,0,51,0.28)',
                boxShadow: '0 12px 36px rgba(0,0,0,0.5), 0 0 24px rgba(255,0,51,0.2)',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-[14px] rounded-xl text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px my-1 bg-white/10" />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-[14px] rounded-xl text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="mt-1 px-4 py-2.5 rounded-xl text-[14px] font-medium text-center"
                style={{
                  background: '#ff0033',
                  color: '#fff',
                  boxShadow: '0 0 16px rgba(255,0,51,0.5)',
                }}
              >
                Sign Up Free
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
