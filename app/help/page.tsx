import type { Metadata } from 'next';
import PlaceholderShell from '@/components/landing/placeholder-shell';

export const metadata: Metadata = {
  title: 'Help — knives.lol',
  description: 'Help docs coming soon',
};

export default function HelpPage() {
  return (
    <PlaceholderShell
      eyebrow="coming soon"
      title="Help docs coming soon."
      description={
        <>
          For now, the FAQ section on the home page covers the basics. Reach out
          via Discord or{' '}
          <a
            href="mailto:support@knives.lol"
            style={{ color: 'var(--text-primary)' }}
            className="hover:underline"
          >
            support@knives.lol
          </a>{' '}
          if you have a question that isn&apos;t answered there.
        </>
      }
    />
  );
}
