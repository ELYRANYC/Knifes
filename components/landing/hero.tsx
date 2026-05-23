'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/button';

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Hero() {
  return (
    <section className="relative pt-40 sm:pt-48 pb-24 sm:pb-32 px-6 overflow-hidden">
      {/* subtle neutral grid, faded toward edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 20%, transparent 80%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="display-heading"
          style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}
        >
          Everything you want,
          <br />
          right here.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-6 text-[16px] sm:text-[19px] max-w-[640px] mx-auto"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
        >
          knives.lol is your go-to for modern, feature-rich link-in-bio pages and
          fast, secure file hosting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/signup" variant="primary" size="lg" className="group">
            Sign Up for Free
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button href="#pricing" variant="secondary" size="lg">
            View Pricing
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
