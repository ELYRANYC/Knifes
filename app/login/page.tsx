import type { Metadata } from 'next';
import PlaceholderShell from '@/components/landing/placeholder-shell';

export const metadata: Metadata = {
  title: 'Login — knives.lol',
  description: 'Login coming in Phase 2',
};

export default function LoginPage() {
  return (
    <PlaceholderShell
      title="Login coming in Phase 2."
      description={
        <>
          Accounts and auth land in the next release. For now, all four demo
          profiles are pre-baked into the build and live at{' '}
          <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,0,51,0.12)', color: '#ff1f4d' }}>
            /alex
          </code>
          ,{' '}
          <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,0,51,0.12)', color: '#ff1f4d' }}>
            /luna
          </code>
          ,{' '}
          <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,0,51,0.12)', color: '#ff1f4d' }}>
            /void
          </code>
          ,{' '}
          <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,0,51,0.12)', color: '#ff1f4d' }}>
            /jordan
          </code>
          .
        </>
      }
    />
  );
}
