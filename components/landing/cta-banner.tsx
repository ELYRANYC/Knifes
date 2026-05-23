'use client';

import { motion } from 'framer-motion';
import ClaimInput from './claim-input';

const EASE = [0.4, 0, 0.2, 1] as const;

export default function CtaBanner() {
  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-3xl px-6 sm:px-12 py-16 sm:py-24 text-center"
          style={{
            background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
            border: '1px solid var(--hairline)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* barely-there red atmosphere */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[70%] h-[360px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(255,69,58,0.03) 0%, transparent 65%)' }}
          />

          <div className="relative">
            <h2 className="display-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
              Everything you want, right here.
            </h2>
            <p
              className="mt-4 text-[15px] sm:text-[16px] max-w-md mx-auto"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
            >
              Join our community of creators. Set up your profile in minutes.
            </p>
            <div className="mt-8 sm:mt-10">
              <ClaimInput />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
