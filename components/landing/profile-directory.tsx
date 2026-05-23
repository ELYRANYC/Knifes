'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ProfileConfig } from '@/lib/types';

const EASE = [0.4, 0, 0.2, 1] as const;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-[10px] font-medium"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid var(--hairline)',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </span>
  );
}

export default function ProfileDirectory({ profiles }: { profiles: ProfileConfig[] }) {
  return (
    <section id="leaderboard-section" className="relative px-6 py-24 sm:py-32">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <div className="section-overline mb-3">Profile Directory</div>
            <h2 className="display-heading text-2xl sm:text-4xl">Four personas, four layouts.</h2>
          </div>
          <div className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
            each one is a single typescript file in{' '}
            <code
              className="font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}
            >
              /profiles
            </code>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {profiles.map((p, i) => (
            <motion.div
              key={p.username}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
            >
              <Link
                href={`/${p.username}`}
                className="group block p-5 sm:p-6 rounded-2xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--hairline)',
                  transition: 'background-color 300ms ease, border-color 300ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--surface-elevated)';
                  e.currentTarget.style.borderColor = 'var(--hairline-strong)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface)';
                  e.currentTarget.style.borderColor = 'var(--hairline)';
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.avatar}
                    alt={p.displayName}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    style={{ border: '1px solid var(--hairline)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[17px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                        {p.displayName}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--hairline)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {p.layout}
                      </span>
                    </div>
                    <div className="text-[13px] truncate mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {Array.isArray(p.description) ? (p.description[0] ?? '') : p.description}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                      {p.backgroundEffect && p.backgroundEffect !== 'none' && <Chip>{p.backgroundEffect}</Chip>}
                      {p.cursorEffect && p.cursorEffect !== 'none' && <Chip>{p.cursorEffect} cursor</Chip>}
                      {p.audio && p.audio.length > 0 && <Chip>audio</Chip>}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="transition-all duration-300 group-hover:translate-x-0.5 text-[#a1a1a6] group-hover:text-[#f5f5f7]"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
