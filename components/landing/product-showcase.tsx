'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProfileConfig } from '@/lib/types';
import ProfilePreviewCard from './profile-preview-card';

const ANGLES = [-12, -4, 4, 12];
const Y_OFFSETS = [24, -4, -4, 24];
const Z_INDEX = [1, 3, 3, 1];
const EASE = [0.4, 0, 0.2, 1] as const;

export default function ProductShowcase({ profiles }: { profiles: ProfileConfig[] }) {
  const cards = profiles.slice(0, 4);
  const [unfanned, setUnfanned] = useState(false);

  return (
    <section className="relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center mb-12 sm:mb-16 relative"
      >
        <div className="section-overline mb-4">Live Previews</div>
        <h2 className="display-heading text-3xl sm:text-5xl">Built for the underground.</h2>
        <p
          className="mt-4 text-[15px] sm:text-[16px] max-w-md mx-auto"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
        >
          Four working personas. Four layouts. Same configuration system.
        </p>
      </motion.div>

      {/* Desktop fan */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="hidden md:flex relative justify-center items-center min-h-[640px]"
        style={{ perspective: '1600px' }}
        onMouseEnter={() => setUnfanned(true)}
        onMouseLeave={() => setUnfanned(false)}
      >
        <div className="flex items-center justify-center">
          {cards.map((p, i) => {
            const rot = unfanned ? 0 : ANGLES[i] ?? 0;
            const y = unfanned ? 0 : Y_OFFSETS[i] ?? 0;
            return (
              <div
                key={p.username}
                style={{
                  transform: `rotate(${rot}deg) translateY(${y}px)`,
                  marginLeft: i === 0 ? 0 : unfanned ? '24px' : '-72px',
                  zIndex: Z_INDEX[i],
                  transformOrigin: 'bottom center',
                  transition:
                    'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ProfilePreviewCard config={p} />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Mobile stack */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="md:hidden relative flex flex-col items-center gap-14"
      >
        {cards.map((p, i) => (
          <div key={p.username} style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}>
            <ProfilePreviewCard config={p} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
