'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Logo from './logo';

type Props = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
};

export default function PlaceholderShell({ eyebrow = 'phase 2', title, description, children }: Props) {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* atmosphere */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,0,51,0.12) 0%, transparent 50%), #08080a',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,0,51,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div
          className="rounded-3xl p-8 sm:p-10 text-center"
          style={{
            background: 'linear-gradient(180deg, rgba(35,0,10,0.55) 0%, rgba(15,0,4,0.7) 100%)',
            border: '1px solid rgba(255,0,51,0.28)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow:
              '0 0 40px rgba(255,0,51,0.2), 0 24px 50px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] mb-5"
            style={{
              background: 'rgba(255,0,51,0.1)',
              border: '1px solid rgba(255,0,51,0.32)',
              color: '#ff1f4d',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#ff0033', boxShadow: '0 0 8px #ff0033' }}
            />
            {eyebrow}
          </div>

          <h1
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 0 24px rgba(255,0,51,0.25)' }}
          >
            {title}
          </h1>

          <div className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(240,240,245,0.7)' }}>
            {description}
          </div>

          {children && <div className="mt-6">{children}</div>}

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all"
            style={{
              background: 'rgba(255,0,51,0.14)',
              color: '#ff1f4d',
              border: '1px solid rgba(255,0,51,0.4)',
              boxShadow: '0 0 16px rgba(255,0,51,0.2)',
            }}
          >
            <ArrowLeft size={13} /> back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
