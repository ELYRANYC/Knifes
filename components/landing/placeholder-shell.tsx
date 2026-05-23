'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Logo from './logo';

const EASE = [0.4, 0, 0.2, 1] as const;

type Props = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
};

export default function PlaceholderShell({ eyebrow = 'Phase 2', title, description, children }: Props) {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* subtle neutral grid */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 15%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div
          className="rounded-3xl p-8 sm:p-10 text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--hairline)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div className="section-overline mb-5" style={{ fontSize: '11px' }}>
            {eyebrow}
          </div>

          <h1 className="display-heading text-2xl sm:text-3xl">{title}</h1>

          <div className="mt-4 text-[14px]" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {description}
          </div>

          {children && <div className="mt-6">{children}</div>}

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            <ArrowLeft size={14} /> back to home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
