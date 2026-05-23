'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthCard from '@/components/auth/auth-card';

function VerifyInner() {
  const search = useSearchParams();
  const status = search.get('status');
  const error = search.get('error');

  if (error) {
    return (
      <AuthCard
        title="Verification failed"
        subtitle={error || 'This link may have expired. Try signing in to request a new one.'}
        footer={
          <Link href="/login" style={{ color: 'var(--text-primary)' }} className="hover:underline">
            Back to sign in
          </Link>
        }
      >
        <Link href="/login" className="btn btn-secondary w-full py-3.5">
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  if (status === 'success') {
    return (
      <AuthCard title="You're verified" subtitle="Your email is confirmed. You can sign in now.">
        <Link href="/login" className="btn btn-primary w-full py-3.5">
          Continue to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verify your email"
      subtitle="Open the link we emailed you to confirm your account. You can close this tab once verified."
      footer={
        <Link href="/login" style={{ color: 'var(--text-primary)' }} className="hover:underline">
          Back to sign in
        </Link>
      }
    >
      <Link href="/login" className="btn btn-secondary w-full py-3.5">
        Back to sign in
      </Link>
    </AuthCard>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
