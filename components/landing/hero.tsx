'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 overflow-hidden">
      {/* radial red glow top-center */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,0,51,0.18) 0%, rgba(255,0,51,0.06) 30%, transparent 65%)',
          filter: 'blur(12px)',
        }}
      />

      {/* faint diagonal grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,0,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 30%, black 30%, transparent 80%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] mb-7"
          style={{
            background: 'rgba(255,0,51,0.08)',
            border: '1px solid rgba(255,0,51,0.3)',
            color: '#ff1f4d',
            boxShadow: '0 0 14px rgba(255,0,51,0.18)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#ff0033', boxShadow: '0 0 8px #ff0033' }}
          />
          phase 1 · config-driven profiles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-bold tracking-tight text-white leading-[1.02]"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            textShadow: '0 0 40px rgba(255,0,51,0.18)',
          }}
        >
          Everything you want,
          <br />
          right here.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-6 text-[15px] sm:text-[17px] max-w-[640px] mx-auto leading-relaxed"
          style={{ color: 'rgba(240,240,245,0.7)' }}
        >
          knives.lol is your go-to for modern, feature-rich link-in-bio pages and
          fast, secure file hosting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] transition-all hover:brightness-110 group"
            style={{
              background: '#ff0033',
              color: '#fff',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(255,0,51,0.55), 0 0 40px rgba(255,0,51,0.25)',
            }}
          >
            Sign Up for Free
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] transition-all"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,0,51,0.4)',
              boxShadow: 'inset 0 0 0 1px rgba(255,0,51,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,0,51,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,0,51,0.4)';
            }}
          >
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}
