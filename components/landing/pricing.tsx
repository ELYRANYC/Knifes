'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '@/components/ui/button';

const FREE_FEATURES = ['Basic Customization', 'Profile Analytics', 'Basic Effects', 'Add Your Socials'];

const PREMIUM_FEATURES = [
  'Exclusive Badge',
  'Profile Layouts',
  'Custom Fonts',
  'Typewriter Animation',
  'Special Profile Effects',
  'Advanced Customization',
  'Metadata & SEO Customization',
];

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="section-overline mb-4">Pricing</div>
          <h2 className="display-heading text-3xl sm:text-5xl">Choose your plan.</h2>
          <p
            className="mt-4 text-[15px] sm:text-[16px]"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}
          >
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
            ctaVariant="primary"
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
            ctaVariant="secondary"
            recommended
            delay={0.08}
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
  ctaVariant: 'primary' | 'secondary';
  recommended?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="relative rounded-3xl p-6 sm:p-8 flex flex-col"
      style={{
        background: recommended ? 'var(--surface-elevated)' : 'var(--surface)',
        border: `1px solid ${recommended ? 'rgba(255,69,58,0.3)' : 'var(--hairline)'}`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      }}
    >
      {recommended && (
        <span
          className="absolute top-5 right-5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full"
          style={{ background: 'var(--accent-red)', color: '#fff' }}
        >
          Recommended
        </span>
      )}

      <h3 className="text-[20px] sm:text-[22px] font-semibold" style={{ color: 'var(--text-primary)' }}>
        {tier}
      </h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span
          className="text-4xl sm:text-5xl font-semibold"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
        >
          {price}
        </span>
        <span className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          /{period}
        </span>
      </div>
      <p className="mt-3 text-[13.5px]" style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>
        {description}
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[13.5px]">
            <Check size={15} strokeWidth={2.5} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>{f}</span>
          </li>
        ))}
      </ul>

      <Button href={ctaHref} variant={ctaVariant} size="md" fullWidth className="mt-7">
        {ctaLabel}
      </Button>
    </motion.div>
  );
}
