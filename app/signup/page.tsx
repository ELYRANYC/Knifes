import type { Metadata } from 'next';
import PlaceholderShell from '@/components/landing/placeholder-shell';

export const metadata: Metadata = {
  title: 'Sign Up — knives.lol',
  description: 'Sign up coming in Phase 2',
};

type SearchParams = { username?: string };

export default function SignupPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = (searchParams.username ?? '').toString().toLowerCase();
  const requested = raw.replace(/[^a-z0-9_-]/g, '').slice(0, 24);

  if (requested) {
    return (
      <PlaceholderShell
        title="Sign up coming in Phase 2."
        description={
          <>
            You wanted{' '}
            <strong style={{ color: '#fff' }}>
              knives.lol/
              <span style={{ color: '#ff1f4d' }}>{requested}</span>
            </strong>
            . We&apos;ll save your spot when signups open.
          </>
        }
      >
        <div
          className="px-4 py-3 rounded-xl text-[13px] text-left"
          style={{
            background: 'rgba(255,0,51,0.08)',
            border: '1px solid rgba(255,0,51,0.28)',
            color: 'rgba(240,240,245,0.8)',
          }}
        >
          <div className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: '#ff1f4d' }}>
            reserved name
          </div>
          <code className="font-mono">knives.lol/{requested}</code>
        </div>
      </PlaceholderShell>
    );
  }

  return (
    <PlaceholderShell
      title="Sign up coming in Phase 2."
      description="Accounts, dashboards, and live customization land in the next release. In the meantime, the four demo profiles show off everything the system can do."
    />
  );
}
