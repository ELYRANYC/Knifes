'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { ProfileConfig } from '@/lib/types';
import { fontVarFromKey, hexToRgb } from '@/lib/utils';

const EFFECT_HINTS: Record<string, string> = {
  matrix:
    'repeating-linear-gradient(180deg, rgba(255,0,51,0.18) 0%, transparent 6px, transparent 18px), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
  fireflies:
    'radial-gradient(circle at 20% 30%, rgba(255,61,110,0.35) 0%, transparent 16%), radial-gradient(circle at 75% 60%, rgba(255,61,110,0.3) 0%, transparent 18%), radial-gradient(circle at 50% 85%, rgba(255,102,128,0.25) 0%, transparent 14%)',
  particles:
    'radial-gradient(circle at 30% 25%, rgba(255,0,51,0.18) 0%, transparent 10%), radial-gradient(circle at 70% 70%, rgba(255,51,85,0.18) 0%, transparent 12%), radial-gradient(circle at 50% 50%, rgba(255,0,51,0.1) 0%, transparent 20%)',
  stars:
    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 1%), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.4) 0%, transparent 1%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.45) 0%, transparent 1%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 1%)',
  snow: 'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.4) 0%, transparent 1.5%), radial-gradient(circle at 60% 55%, rgba(255,255,255,0.45) 0%, transparent 1.5%), radial-gradient(circle at 80% 85%, rgba(255,255,255,0.35) 0%, transparent 1.5%)',
  rain: 'repeating-linear-gradient(160deg, rgba(180,200,255,0.18) 0%, transparent 3px, transparent 16px)',
  bubbles:
    'radial-gradient(circle at 25% 80%, rgba(255,0,51,0.18) 0%, transparent 6%), radial-gradient(circle at 70% 50%, rgba(255,0,51,0.15) 0%, transparent 7%)',
};

export default function ProfilePreviewCard({
  config,
  className,
  style,
}: {
  config: ProfileConfig;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { colors } = config;
  const rgb = hexToRgb(colors.accent);
  const fontVar = fontVarFromKey(config.font);
  const previewLinks = config.links.filter((l) => !l.hidden).slice(0, 3);

  const bgValue =
    config.background.type === 'gradient' && config.gradient
      ? `linear-gradient(${config.gradient.angle}deg, ${config.gradient.from}, ${config.gradient.to})`
      : config.background.value;

  const hint = config.backgroundEffect ? EFFECT_HINTS[config.backgroundEffect] : undefined;
  const displayName = config.displayName;

  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
    >
      <Link
        href={`/${config.username}`}
        className="block relative"
        aria-label={`Open ${config.displayName} profile`}
      >
        {/* phone bezel */}
        <div
          className="relative rounded-[36px] p-[3px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,0,51,0.45) 0%, rgba(50,0,10,0.85) 35%, rgba(15,0,4,1) 100%)',
            boxShadow: `0 30px 60px rgba(0,0,0,0.55), 0 0 40px rgba(${rgb}, 0.22)`,
          }}
        >
          {/* notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[7px] z-10 w-16 h-4 rounded-b-xl"
            style={{ background: '#000' }}
          />

          {/* inner screen */}
          <div
            className="relative w-[260px] sm:w-[280px] h-[480px] sm:h-[520px] rounded-[33px] overflow-hidden"
            style={{ background: bgValue, fontFamily: fontVar, color: colors.text }}
          >
            {/* background effect hint */}
            {hint && (
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: hint, opacity: 0.85 }}
              />
            )}

            {/* top accent gradient */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-24 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb}, 0.35) 0%, transparent 70%)`,
              }}
            />

            {/* status pill */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(10,0,0,0.6)',
                border: `1px solid rgba(${rgb}, 0.4)`,
                color: colors.accent,
                backdropFilter: 'blur(6px)',
              }}
            >
              {config.layout}
            </div>

            {/* content */}
            <div className="relative h-full flex flex-col items-center px-5 pt-14 pb-5">
              <div
                className="w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: `2px solid ${colors.accent}`,
                  boxShadow: `0 0 18px rgba(${rgb}, 0.55)`,
                }}
              >
                <img src={config.avatar} alt="" className="w-full h-full object-cover" />
              </div>

              <div
                className="mt-3 text-[18px] font-bold text-center leading-tight"
                style={{
                  color: colors.text,
                  textShadow: `0 0 12px rgba(${rgb}, 0.5)`,
                  fontFamily: fontVar,
                }}
              >
                {displayName}
              </div>

              <div className="mt-1 text-[10px] text-center px-2 line-clamp-2" style={{ color: colors.secondary ?? 'rgba(240,240,245,0.6)' }}>
                {Array.isArray(config.description) ? (config.description[0] ?? '') : config.description}
              </div>

              {config.badges && config.badges.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
                  {config.badges.slice(0, 3).map((b, i) => (
                    <span
                      key={i}
                      className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        background: `rgba(${rgb}, 0.14)`,
                        border: `1px solid rgba(${rgb}, 0.35)`,
                        color: b.color ?? colors.accent,
                      }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 w-full flex-1 flex flex-col gap-1.5 overflow-hidden">
                {previewLinks.map((link, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px]"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(${rgb}, 0.18)`,
                      color: colors.text,
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${rgb}, 0.2)` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colors.accent }}
                      />
                    </span>
                    <span className="flex-1 truncate font-medium">{link.label ?? link.platform}</span>
                    <ExternalLink size={9} style={{ color: colors.accent, opacity: 0.6 }} />
                  </div>
                ))}
              </div>

              {/* dock indicator */}
              <div className="mt-3 w-20 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>

            {/* glass reflection at top */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        </div>

        {/* ground shadow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[70%] h-10 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, rgba(${rgb}, 0.4) 0%, transparent 70%)`,
            filter: 'blur(18px)',
          }}
        />
      </Link>
    </motion.div>
  );
}
