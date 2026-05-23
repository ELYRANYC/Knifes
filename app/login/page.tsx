import type { Metadata } from 'next';
import PlaceholderShell from '@/components/landing/placeholder-shell';

export const metadata: Metadata = {
  title: 'Login — knives.lol',
  description: 'Login coming in Phase 2',
};

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="font-mono px-1.5 py-0.5 rounded"
      style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
    >
      {children}
    </code>
  );
}

export default function LoginPage() {
  return (
    <PlaceholderShell
      title="Login coming in Phase 2."
      description={
        <>
          Accounts and auth land in the next release. For now, all four demo
          profiles are pre-baked into the build and live at <Code>/alex</Code>,{' '}
          <Code>/luna</Code>, <Code>/void</Code>, and <Code>/jordan</Code>.
        </>
      }
    />
  );
}
