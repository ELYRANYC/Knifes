'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthCard from '@/components/auth/auth-card';
import OAuthButtons, { OrDivider } from '@/components/auth/oauth-buttons';
import TextInput from '@/components/dashboard/editor/text-input';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage your profile."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--text-primary)' }} className="hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <OAuthButtons next={next} />
      <OrDivider />

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
        <div>
          <TextInput
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            large
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-[12px] hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="field-error -mt-1">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
