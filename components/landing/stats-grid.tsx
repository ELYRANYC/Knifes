'use client';

import { motion } from 'framer-motion';
import { Layout, Sparkles, MousePointer2, Link as LinkIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Stat = { value: string; label: string; icon: LucideIcon };

const STATS: Stat[] = [
  { value: '4', label: 'Profile Layouts', icon: Layout },
  { value: '7', label: 'Canvas Effects', icon: Sparkles },
  { value: '5', label: 'Cursor Effects', icon: MousePointer2 },
  { value: '30+', label: 'Supported Socials', icon: LinkIcon },
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function StatsGrid() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <h2 className="display-heading text-3xl sm:text-5xl">
            Built for creators.
            <br />
            Loved by the underground.
          </h2>
          <p
            className="mt-5 text-[15px] sm:text-[17px] max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
          >
            Modern link-in-bio with effects, audio, widgets, and image hosting. All in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="relative p-6 sm:p-7 rounded-2xl"
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
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="absolute top-5 right-5"
                  style={{ color: 'var(--text-primary)', opacity: 0.5 }}
                />
                <div
                  className="text-5xl sm:text-6xl font-semibold tabular-nums leading-none"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                >
                  {stat.value}
                </div>
                <div className="mt-3 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
