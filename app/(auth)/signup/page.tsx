'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, X, Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth/auth-card';
import OAuthButtons, { OrDivider } from '@/components/auth/oauth-buttons';
import TextInput from '@/components/dashboard/editor/text-input';
import { createClient } from '@/lib/supabase/client';
import { validateUsername } from '@/lib/profile-mapper';

type Availability = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

function SignupForm() {
  const search = useSearchParams();
  const [username, setUsername] = useState(search.get('username') ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Availability>('idle');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!username) {
      setAvailability('idle');
      setUsernameError(null);
      return;
    }
    const v = validateUsername(username);
    if (!v.valid) {
      setAvailability('invalid');
      setUsernameError(v.error ?? 'Invalid username');
      return;
    }
    setUsernameError(null);
    setAvailability('checking');
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/profile/check-username?username=${encodeURIComponent(username)}`);
        const json = (await res.json()) as { available: boolean };
        setAvailability(json.available ? 'available' : 'taken');
      } catch {
        setAvailability('idle');
      }
    }, 450);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [username]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validateUsername(username);
    if (!v.valid) {
      setUsernameError(v.error ?? 'Invalid username');
      return;
    }
    if (availability === 'taken') {
      setUsernameError('That username is taken');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username.toLowerCase() },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <AuthCard
        title="Check your email"
        subtitle={`We sent a verification link to ${email}. Click it to finish creating your account.`}
        footer={
          <>
            Wrong email?{' '}
            <button onClick={() => setSent(false)} style={{ color: 'var(--text-primary)' }} className="hover:underline">
              Go back
            </button>
          </>
        }
      >
        <Link href="/login" className="btn btn-secondary w-full py-3.5">
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Claim your name and start building."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--text-primary)' }} className="hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <OAuthButtons />
      <OrDivider />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="field-label">Username</label>
          <div className="relative flex items-center field" style={{ padding: '0 14px' }}>
            <span className="text-[14px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
              knives.lol/
            </span>
            <input
              className="flex-1 bg-transparent outline-none py-3.5 text-[14px]"
              style={{ color: 'var(--text-primary)' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourname"
              autoComplete="off"
              spellCheck={false}
              required
            />
            <span className="flex-shrink-0">
              {availability === 'checking' && (
                <Loader2 size={15} className="animate-spin" style={{ color: 'var(--text-tertiary)' }} />
              )}
              {availability === 'available' && <Check size={15} style={{ color: 'var(--status-green)' }} />}
              {(availability === 'taken' || availability === 'invalid') && (
                <X size={15} style={{ color: 'var(--accent-red)' }} />
              )}
            </span>
          </div>
          {usernameError ? (
            <p className="field-error">{usernameError}</p>
          ) : availability === 'taken' ? (
            <p className="field-error">That username is taken</p>
          ) : availability === 'available' ? (
            <p className="text-[12px] mt-1.5" style={{ color: 'var(--status-green)' }}>
              Available
            </p>
          ) : null}
        </div>

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
        <TextInput
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          large
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="field-error -mt-1">{error}</p>}

        <button
          type="submit"
          disabled={loading || availability === 'taken' || availability === 'invalid'}
          className="btn btn-primary w-full py-3.5 disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
