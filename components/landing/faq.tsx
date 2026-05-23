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

const EASE = [0.4, 0, 0.2, 1] as const;

export default function FAQ() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <div className="section-overline mb-4">FAQ</div>
          <h2 className="display-heading text-3xl sm:text-4xl">Frequently Asked Questions</h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={open}
      >
        <span className="text-[14px] sm:text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex-shrink-0"
          style={{ color: open ? 'var(--text-primary)' : 'var(--text-secondary)' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-6 pb-5 text-[13.5px]"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
