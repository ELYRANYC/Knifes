'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './logo';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Help Center', href: '/help' },
  { label: 'Discord', href: '#' },
  { label: 'Leaderboard', href: '#leaderboard-section' },
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
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'pointer-events-auto mt-3 sm:mt-4 mx-3 sm:mx-6 w-full max-w-[1100px] rounded-full',
          'flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3',
        )}
        style={{
          background: scrolled ? 'rgba(10,10,10,0.8)' : 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: 'blur(20px) saturate(120%)',
          border: '1px solid var(--hairline)',
          boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.5)' : '0 6px 24px rgba(0,0,0,0.3)',
          transition: 'background-color 300ms ease, box-shadow 300ms ease',
        }}
      >
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-[13px] rounded-full transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-5 mx-2" style={{ background: 'var(--hairline)' }} />
          <Link
            href="/login"
            className="px-3 py-1.5 text-[13px] rounded-full transition-colors duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Login
          </Link>
          <Button href="/signup" variant="primary" size="sm" className="ml-1">
            Sign Up Free
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--hairline)', color: 'var(--text-primary)' }}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden absolute top-full right-3 mt-2 w-60 rounded-2xl p-2 flex flex-col"
              style={{
                background: 'rgba(10,10,10,0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--hairline)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-[14px] rounded-xl transition-colors hover:bg-white/[0.05]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px my-1" style={{ background: 'var(--hairline)' }} />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-[14px] rounded-xl transition-colors hover:bg-white/[0.05]"
                style={{ color: 'var(--text-secondary)' }}
              >
                Login
              </Link>
              <Button href="/signup" variant="primary" size="md" fullWidth className="mt-1">
                Sign Up Free
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
