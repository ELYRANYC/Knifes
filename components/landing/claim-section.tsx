'use client';

import { motion } from 'framer-motion';
import ClaimInput from './claim-input';

const EASE = [0.4, 0, 0.2, 1] as const;

export default function ClaimSection() {
  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-3xl px-6 sm:px-12 py-14 sm:py-20 text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--hairline)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <h2 className="display-heading text-2xl sm:text-4xl">
            Claim your profile and create an account in minutes.
          </h2>
          <p
            className="mt-4 text-[15px] sm:text-[16px] max-w-md mx-auto"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
          >
            Lock in your name. We&apos;ll hold it for you while you set up.
          </p>
          <div className="mt-8 sm:mt-10">
            <ClaimInput />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
