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

export default function StatsGrid() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 0 30px rgba(255,0,51,0.15)' }}
          >
            Built for creators.
            <br />
            <span style={{ color: '#ff1f4d', textShadow: '0 0 32px rgba(255,0,51,0.5)' }}>
              Loved by the underground.
            </span>
          </h2>
          <p
            className="mt-4 text-[15px] sm:text-[16px] max-w-xl mx-auto"
            style={{ color: 'rgba(240,240,245,0.65)' }}
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
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative p-5 sm:p-6 rounded-2xl group transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(20,0,4,0.4)',
                  border: '1px solid rgba(255,0,51,0.15)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                  style={{
                    background: 'rgba(255,0,51,0.14)',
                    color: '#ff1f4d',
                    border: '1px solid rgba(255,0,51,0.3)',
                    boxShadow: '0 0 14px rgba(255,0,51,0.25)',
                  }}
                >
                  <Icon size={16} />
                </div>
                <div
                  className="text-4xl sm:text-5xl font-bold text-white tabular-nums leading-none"
                  style={{ textShadow: '0 0 24px rgba(255,0,51,0.2)' }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-[12px] sm:text-[13px] font-medium" style={{ color: 'rgba(240,240,245,0.6)' }}>
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
