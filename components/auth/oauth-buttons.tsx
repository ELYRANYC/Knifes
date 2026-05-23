'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2" aria-hidden>
      <path d="M19.27 5.33A19.6 19.6 0 0014.45 4l-.24.25c2.2.4 3.2 1 4.27 1.85a13 13 0 00-11.06-.5c-.3.15-.45.25-.45.25.95-.9 2.4-1.55 4.36-1.7L11.25 4a18.3 18.3 0 00-4.83 1.33A19.7 19.7 0 003 16c1.1 1.55 2.65 2.5 4.1 2.55l.65-.9A6.1 6.1 0 015 16c.3.25.7.5 1.1.7a16.7 16.7 0 0011.8 0c.4-.2.8-.45 1.1-.7-.85.75-1.85 1.4-2.85 1.85.2.3.45.6.65.85 1.45-.05 3-1 4.1-2.55 0-3.3-1.55-6.5-2.93-8.32zM9.4 14.5c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75zm5.2 0c-.85 0-1.55-.8-1.55-1.75s.7-1.75 1.55-1.75 1.55.8 1.55 1.75-.7 1.75-1.55 1.75z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export default function OAuthButtons({ next }: { next?: string }) {
  const [loading, setLoading] = useState<string | null>(null);

  const signIn = async (provider: 'discord' | 'google') => {
    setLoading(provider);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback${
      next ? `?next=${encodeURIComponent(next)}` : ''
    }`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) setLoading(null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => signIn('discord')}
        disabled={loading !== null}
        className="btn btn-secondary w-full py-3 text-[14px] disabled:opacity-60"
      >
        <DiscordIcon />
        {loading === 'discord' ? 'Redirecting…' : 'Continue with Discord'}
      </button>
      <button
        type="button"
        onClick={() => signIn('google')}
        disabled={loading !== null}
        className="btn btn-secondary w-full py-3 text-[14px] disabled:opacity-60"
      >
        <GoogleIcon />
        {loading === 'google' ? 'Redirecting…' : 'Continue with Google'}
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
      <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
        or
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--hairline)' }} />
    </div>
  );
}
