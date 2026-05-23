'use client';

import { motion } from 'framer-motion';
import ClaimInput from './claim-input';

export default function CtaBanner() {
  return (
    <section className="relative px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl px-6 sm:px-12 py-14 sm:py-20 text-center"
          style={{
            background:
              'linear-gradient(180deg, rgba(50,0,12,0.7) 0%, rgba(15,0,4,0.8) 100%)',
            border: '1px solid rgba(255,0,51,0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow:
              '0 0 60px rgba(255,0,51,0.22), 0 30px 60px rgba(0,0,0,0.5), inset 0 0 80px rgba(255,0,51,0.05)',
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,0,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.05) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[80%] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(255,0,51,0.18) 0%, transparent 60%)',
            }}
          />

          <div className="relative">
            <h2
              className="font-bold text-white tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                textShadow: '0 0 32px rgba(255,0,51,0.3)',
              }}
            >
              Everything you want, right here.
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] max-w-md mx-auto" style={{ color: 'rgba(240,240,245,0.7)' }}>
              Join our community of creators. Set up your profile in minutes.
            </p>
            <div className="mt-7 sm:mt-9">
              <ClaimInput />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
