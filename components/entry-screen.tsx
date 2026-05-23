'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hexToRgb } from '@/lib/utils';

type Props = {
  username: string;
  text?: string;
  accentColor: string;
  onEnter: () => void;
};

export default function EntryScreen({ username, text = 'click to enter', accentColor, onEnter }: Props) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const rgb = hexToRgb(accentColor);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `knives:entered:${username}`;
    if (sessionStorage.getItem(key) === '1') {
      setVisible(false);
      onEnter();
    }
  }, [username, onEnter]);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem(`knives:entered:${username}`, '1');
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 500);
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, exiting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleEnter}
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center text-center cursor-pointer focus:outline-none"
          style={{
            background:
              `radial-gradient(ellipse at 50% 50%, rgba(${rgb}, 0.08) 0%, rgba(10,10,20,0.96) 50%, rgba(8,8,13,1) 100%)`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          aria-label="Enter site"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.04, 1],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[18px] sm:text-[22px] uppercase tracking-[0.32em] font-medium"
              style={{
                color: accentColor,
                textShadow: `0 0 12px rgba(${rgb}, 0.7), 0 0 24px rgba(${rgb}, 0.4)`,
              }}
            >
              {text}
            </motion.span>
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-px w-32 sm:w-48"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                boxShadow: `0 0 8px rgba(${rgb}, 0.6)`,
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(240,240,245,0.35)' }}>
              press any key
            </span>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
