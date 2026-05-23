'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ITEMS = [
  {
    q: 'What is knives.lol?',
    a: 'knives.lol is a modern link-in-bio platform that lets you bring all your socials, content, and projects together on one customizable profile page.',
  },
  {
    q: 'Is knives.lol free?',
    a: 'Yes. Free forever for the basics. Premium unlocks advanced customization and exclusive features for a one-time payment of 7.99€.',
  },
  {
    q: 'How long does it take to set up a profile?',
    a: 'Less than a minute. Sign up, pick a username, customize, and share.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We use modern infrastructure and encrypted connections to protect your data.',
  },
  {
    q: 'Can I use my own custom domain for the image host?',
    a: 'Yes — Premium users can add and verify their own domains for image hosting.',
  },
  {
    q: 'Where can I get support?',
    a: 'Join our Discord community or reach out via email — see the footer for links.',
  },
];

export default function FAQ() {
  return (
    <section className="relative px-6 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: '#ff1f4d' }}>
            faq
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 0 24px rgba(255,0,51,0.15)' }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(15,0,4,0.5)',
            border: '1px solid rgba(255,0,51,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          {ITEMS.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} isLast={i === ITEMS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,0,51,0.12)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={open}
      >
        <span className="text-[14px] sm:text-[15px] font-medium text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,0,51,0.12)',
            border: '1px solid rgba(255,0,51,0.3)',
            color: '#ff1f4d',
          }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 text-[13.5px] leading-relaxed" style={{ color: 'rgba(240,240,245,0.7)' }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
