'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Music, MousePointer2, Github } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { listProfiles } from '@/profiles';

const features = [
  {
    icon: Sparkles,
    title: 'canvas effects',
    body: 'matrix · particles · fireflies · stars · snow · rain · bubbles. real 60fps canvas, not CSS fakes.',
    color: '#00ff66',
  },
  {
    icon: Music,
    title: 'audio + entry',
    body: 'click-to-enter screen unlocks autoplay. compact player with marquee, volume, multi-track.',
    color: '#ff3d8a',
  },
  {
    icon: MousePointer2,
    title: 'cursor magic',
    body: 'trails · glow · sparkles · hearts. theme-aware and reduced-motion safe.',
    color: '#00d4ff',
  },
  {
    icon: Github,
    title: 'config-first',
    body: 'every profile is one typescript file. fully typed. swap layouts in one line.',
    color: '#9b59ff',
  },
];

export default function Home() {
  const profiles = useMemo(() => listProfiles(), []);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 10%, rgba(0,255,102,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(155,89,255,0.08) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 transition-transform duration-700 ease-out blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #00ff66 0%, transparent 70%)',
            left: mouse.x - 200,
            top: mouse.y - 200,
          }}
        />
      </div>

      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[12px] px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            github
          </a>
          <Link
            href="/alex"
            className="text-[12px] px-3 py-1.5 rounded-full font-medium transition-all"
            style={{
              background: 'rgba(0,255,102,0.16)',
              color: '#00ff66',
              border: '1px solid rgba(0,255,102,0.35)',
              boxShadow: '0 0 14px rgba(0,255,102,0.22)',
            }}
          >
            try a demo →
          </Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-20 sm:pt-20 sm:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider mb-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(240,240,245,0.7)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00ff66', boxShadow: '0 0 8px #00ff66' }}
          />
          phase 1 · config-driven profiles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          your link in bio,{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #00ff66, #00d4ff, #9b59ff, #ff3d8a)',
              backgroundSize: '300% 100%',
              animation: 'gradientShift 6s ease infinite',
            }}
          >
            but sharper.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-[16px] sm:text-lg max-w-xl mx-auto"
          style={{ color: 'rgba(240,240,245,0.65)' }}
        >
          neon glassmorphic profiles with audio, widgets, discord presence, cursor effects, and seven different
          canvas backgrounds. zero database. zero compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/alex"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all group"
            style={{
              background: '#00ff66',
              color: '#000',
              boxShadow: '0 0 18px rgba(0,255,102,0.5), 0 0 36px rgba(0,255,102,0.25)',
            }}
          >
            see a profile <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#profiles"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium border border-white/10 hover:border-white/30 transition-colors"
            style={{ color: 'rgba(240,240,245,0.85)' }}
          >
            browse all four
          </a>
        </motion.div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                className="glass p-4 hover:bg-white/[0.06] transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `${f.color}1f`,
                    color: f.color,
                    boxShadow: `0 0 14px ${f.color}33`,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div className="text-[13px] font-semibold mb-1">{f.title}</div>
                <div className="text-[12px] leading-relaxed text-white/55">{f.body}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="profiles" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-end justify-between"
        >
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/45">profile directory</div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">four personas, four layouts</h2>
          </div>
          <div className="text-[12px] text-white/45 hidden sm:block">
            each one is a single typescript file in <code className="text-white/70 font-mono">/profiles</code>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {profiles.map((p, i) => {
            return (
              <motion.div
                key={p.username}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/${p.username}`}
                  className="block glass p-4 sm:p-5 hover:scale-[1.01] transition-transform"
                  style={{
                    borderColor: `${p.colors.accent}33`,
                    boxShadow: `0 0 0 1px ${p.colors.accent}1a, 0 12px 30px rgba(0,0,0,0.4)`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.avatar}
                      alt={p.displayName}
                      className="w-14 h-14 rounded-xl object-cover"
                      style={{
                        border: `2px solid ${p.colors.accent}`,
                        boxShadow: `0 0 12px ${p.colors.accent}55`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-semibold truncate" style={{ color: p.colors.text }}>
                          {p.displayName}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                          style={{
                            background: `${p.colors.accent}1f`,
                            color: p.colors.accent,
                            border: `1px solid ${p.colors.accent}44`,
                          }}
                        >
                          {p.layout}
                        </span>
                      </div>
                      <div className="text-[12px] text-white/55 truncate mt-0.5">
                        {Array.isArray(p.description) ? (p.description[0] ?? '') : p.description}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-white/40">
                        {p.backgroundEffect && p.backgroundEffect !== 'none' && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5">{p.backgroundEffect}</span>
                        )}
                        {p.cursorEffect && p.cursorEffect !== 'none' && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5">{p.cursorEffect} cursor</span>
                        )}
                        {p.audio && p.audio.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5">audio</span>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-white/40" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-[12px] text-white/40 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Logo small />
          <span>· phase 1 of 3</span>
        </div>
        <div>auth + dashboard + image host coming in phase 2 & 3</div>
      </footer>
    </main>
  );
}

function Logo({ small }: { small?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span
        className={small ? 'text-[14px]' : 'text-[18px]'}
        style={{
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        knives
        <span style={{ color: '#00ff66', textShadow: '0 0 10px #00ff66' }}>.lol</span>
      </span>
    </Link>
  );
}
