'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ProfileConfig } from '@/lib/types';

const ACCENT = '#ff0033';
const ACCENT_BRIGHT = '#ff1f4d';

export default function ProfileDirectory({ profiles }: { profiles: ProfileConfig[] }) {
  return (
    <section id="leaderboard-section" className="relative px-6 py-20 sm:py-24">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT_BRIGHT }}>
              profile directory
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-2 text-white tracking-tight"
              style={{ textShadow: '0 0 24px rgba(255,0,51,0.15)' }}
            >
              Four personas, four layouts.
            </h2>
          </div>
          <div className="text-[12px]" style={{ color: 'rgba(240,240,245,0.45)' }}>
            each one is a single typescript file in{' '}
            <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,0,51,0.1)', color: ACCENT_BRIGHT }}>
              /profiles
            </code>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {profiles.map((p, i) => (
            <motion.div
              key={p.username}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/${p.username}`}
                className="group block p-5 sm:p-6 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(15,0,4,0.55)',
                  border: `1px solid ${p.colors.accent}33`,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: `0 0 0 1px ${p.colors.accent}11, 0 12px 30px rgba(0,0,0,0.4)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 24px ${p.colors.accent}55, 0 0 0 1px ${p.colors.accent}66, 0 18px 40px rgba(0,0,0,0.5)`;
                  e.currentTarget.style.borderColor = `${p.colors.accent}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${p.colors.accent}11, 0 12px 30px rgba(0,0,0,0.4)`;
                  e.currentTarget.style.borderColor = `${p.colors.accent}33`;
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.avatar}
                    alt={p.displayName}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      border: `2px solid ${p.colors.accent}`,
                      boxShadow: `0 0 14px ${p.colors.accent}66`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[17px] font-semibold truncate" style={{ color: p.colors.text }}>
                        {p.displayName}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                        style={{
                          background: `${ACCENT}1f`,
                          color: ACCENT_BRIGHT,
                          border: `1px solid ${ACCENT}55`,
                        }}
                      >
                        {p.layout}
                      </span>
                    </div>
                    <div className="text-[12.5px] truncate mt-1" style={{ color: 'rgba(240,240,245,0.6)' }}>
                      {Array.isArray(p.description) ? (p.description[0] ?? '') : p.description}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2.5 text-[10px] flex-wrap" style={{ color: ACCENT_BRIGHT }}>
                      {p.backgroundEffect && p.backgroundEffect !== 'none' && (
                        <span
                          className="px-1.5 py-0.5 rounded font-medium"
                          style={{ background: 'rgba(255,0,51,0.08)', border: '1px solid rgba(255,0,51,0.22)' }}
                        >
                          {p.backgroundEffect}
                        </span>
                      )}
                      {p.cursorEffect && p.cursorEffect !== 'none' && (
                        <span
                          className="px-1.5 py-0.5 rounded font-medium"
                          style={{ background: 'rgba(255,0,51,0.08)', border: '1px solid rgba(255,0,51,0.22)' }}
                        >
                          {p.cursorEffect} cursor
                        </span>
                      )}
                      {p.audio && p.audio.length > 0 && (
                        <span
                          className="px-1.5 py-0.5 rounded font-medium"
                          style={{ background: 'rgba(255,0,51,0.08)', border: '1px solid rgba(255,0,51,0.22)' }}
                        >
                          audio
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5"
                    style={{ color: ACCENT_BRIGHT }}
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
