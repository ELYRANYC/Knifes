'use client';

import { motion } from 'framer-motion';
import ClaimInput from './claim-input';

export default function ClaimSection() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center"
          style={{
            background:
              'linear-gradient(180deg, rgba(40,0,10,0.6) 0%, rgba(20,0,6,0.6) 100%)',
            border: '1px solid rgba(255,0,51,0.22)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: '0 0 40px rgba(255,0,51,0.18), 0 24px 50px rgba(0,0,0,0.45)',
          }}
        >
          {/* watermark pattern */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,0,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />
          {/* corner glow */}
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(255,0,51,0.2) 0%, transparent 70%)',
            }}
          />

          <div className="relative">
            <h2
              className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ textShadow: '0 0 24px rgba(255,0,51,0.25)' }}
            >
              Claim your profile and create an account in minutes!
            </h2>
            <p
              className="mt-3 text-[14px] sm:text-[15px] max-w-md mx-auto"
              style={{ color: 'rgba(240,240,245,0.65)' }}
            >
              Lock in your name. We&apos;ll hold it for you while you set up.
            </p>
            <div className="mt-6 sm:mt-8">
              <ClaimInput />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
