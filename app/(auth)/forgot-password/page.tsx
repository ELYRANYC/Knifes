'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/auth/auth-card';
import TextInput from '@/components/dashboard/editor/text-input';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <AuthCard
      title={sent ? 'Check your email' : 'Reset your password'}
      subtitle={
        sent
          ? `If an account exists for ${email}, a reset link is on its way.`
          : 'Enter your email and we’ll send you a reset link.'
      }
      footer={
        <Link href="/login" style={{ color: 'var(--text-primary)' }} className="hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <Link href="/login" className="btn btn-secondary w-full py-3.5">
          Back to sign in
        </Link>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
            large
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="field-error -mt-1">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
