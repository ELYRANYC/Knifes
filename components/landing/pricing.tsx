'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const FREE_FEATURES = [
  'Basic Customization',
  'Profile Analytics',
  'Basic Effects',
  'Add Your Socials',
];

const PREMIUM_FEATURES = [
  'Exclusive Badge',
  'Profile Layouts',
  'Custom Fonts',
  'Typewriter Animation',
  'Special Profile Effects',
  'Advanced Customization',
  'Metadata & SEO Customization',
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-20 sm:py-28 scroll-mt-24">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-[11px] uppercase tracking-[0.24em] mb-3" style={{ color: '#ff1f4d' }}>
            pricing
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 0 30px rgba(255,0,51,0.18)' }}
          >
            Choose your plan.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px]" style={{ color: 'rgba(240,240,245,0.65)' }}>
            Start free. Upgrade when you want more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
          <PricingCard
            tier="Free"
            price="0€"
            period="Lifetime"
            description="For beginners, link all your socials in one place."
            features={FREE_FEATURES}
            ctaLabel="Get Started"
            ctaHref="/signup"
            ctaVariant="filled"
            delay={0}
          />
          <PricingCard
            tier="Premium"
            price="7.99€"
            period="Lifetime"
            description="The perfect plan to discover your creativity & unlock more features."
            features={PREMIUM_FEATURES}
            ctaLabel="Learn More"
            ctaHref="/signup"
            ctaVariant="outline"
            recommended
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
  ctaVariant,
  recommended,
  delay,
}: {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'filled' | 'outline';
  recommended?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-3xl p-6 sm:p-8 flex flex-col"
      style={{
        background: recommended
          ? 'linear-gradient(180deg, rgba(60,0,15,0.6) 0%, rgba(20,0,6,0.6) 100%)'
          : 'rgba(15,0,4,0.55)',
        border: `1px solid ${recommended ? 'rgba(255,0,51,0.55)' : 'rgba(255,0,51,0.18)'}`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: recommended
          ? '0 0 40px rgba(255,0,51,0.28), 0 24px 50px rgba(0,0,0,0.45)'
          : '0 12px 30px rgba(0,0,0,0.4)',
      }}
    >
      {recommended && (
        <span
          className="absolute top-4 right-4 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full"
          style={{
            background: '#ff0033',
            color: '#fff',
            boxShadow: '0 0 14px rgba(255,0,51,0.5)',
          }}
        >
          Recommended
        </span>
      )}

      <h3 className="text-[20px] sm:text-[22px] font-bold text-white">{tier}</h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span
          className="text-4xl sm:text-5xl font-bold text-white"
          style={{ textShadow: recommended ? '0 0 24px rgba(255,0,51,0.4)' : 'none' }}
        >
          {price}
        </span>
        <span className="text-[13px]" style={{ color: 'rgba(240,240,245,0.5)' }}>
          /{period}
        </span>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: 'rgba(240,240,245,0.65)' }}>
        {description}
      </p>

      <ul className="mt-6 space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[13.5px]">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,0,51,0.16)', border: '1px solid rgba(255,0,51,0.35)' }}
            >
              <Check size={10} strokeWidth={3.5} style={{ color: '#ff1f4d' }} />
            </span>
            <span style={{ color: 'rgba(240,240,245,0.85)' }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="mt-7 w-full block text-center py-3 rounded-full text-[14px] font-medium transition-all hover:brightness-110"
        style={
          ctaVariant === 'filled'
            ? {
                background: '#ff0033',
                color: '#fff',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.2), 0 0 18px rgba(255,0,51,0.45)',
              }
            : {
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,0,51,0.5)',
              }
        }
      >
        {ctaLabel}
      </Link>
    </motion.div>
  );
}
