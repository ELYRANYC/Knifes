'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProfileConfig } from '@/lib/types';
import ProfilePreviewCard from './profile-preview-card';

const ANGLES = [-12, -4, 4, 12];
const Y_OFFSETS = [24, -4, -4, 24];
const Z_INDEX = [1, 3, 3, 1];

export default function ProductShowcase({ profiles }: { profiles: ProfileConfig[] }) {
  const cards = profiles.slice(0, 4);
  const [unfanned, setUnfanned] = useState(false);

  return (
    <section className="relative px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(255,0,51,0.12) 0%, rgba(255,0,51,0.04) 30%, transparent 65%)',
          filter: 'blur(8px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-14 relative"
      >
        <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: '#ff1f4d' }}>
          live previews
        </div>
        <h2
          className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
          style={{ textShadow: '0 0 30px rgba(255,0,51,0.18)' }}
        >
          Built for the underground.
        </h2>
        <p className="mt-3 text-[14px] sm:text-[15px] max-w-md mx-auto" style={{ color: 'rgba(240,240,245,0.6)' }}>
          Four working personas. Four layouts. Same configuration system.
        </p>
      </motion.div>

      {/* Desktop fan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex relative justify-center items-center min-h-[640px]"
        style={{ perspective: '1500px' }}
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="md:hidden relative flex flex-col items-center gap-12"
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
