import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';
import { defaultProfileInsert, validateUsername } from '@/lib/profile-mapper';

export const dynamic = 'force-dynamic';

function sanitizeBase(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, '')
    .slice(0, 18);
  return base.length >= 3 ? base : `user${base}`;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  if (!code) {
    return NextResponse.redirect(`${origin}/verify?error=${encodeURIComponent('Missing code')}`);
  }

  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    },
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    return NextResponse.redirect(
      `${origin}/verify?error=${encodeURIComponent(error?.message ?? 'Verification failed')}`,
    );
  }

  const user = data.user;

  // Create the profile row on first sign-in if it doesn't exist yet.
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!existing) {
    const meta = user.user_metadata as { username?: string; user_name?: string; name?: string };
    const candidates = [
      meta.username,
      meta.user_name,
      meta.name,
      user.email?.split('@')[0],
      `user${Math.random().toString(36).slice(2, 8)}`,
    ].filter((v): v is string => Boolean(v));

    let chosen = '';
    for (const c of candidates) {
      const base = sanitizeBase(c);
      if (!validateUsername(base).valid) continue;
      const { data: avail } = await supabase.rpc('username_available', { candidate: base });
      if (avail) {
        chosen = base;
        break;
      }
      // try a suffixed variant
      const suffixed = `${base.slice(0, 14)}${Math.random().toString(36).slice(2, 6)}`;
      const { data: avail2 } = await supabase.rpc('username_available', { candidate: suffixed });
      if (avail2) {
        chosen = suffixed;
        break;
      }
    }
    if (!chosen) chosen = `user${Math.random().toString(36).slice(2, 10)}`;

    await supabase.from('profiles').insert(defaultProfileInsert(user.id, chosen));
  }

  return NextResponse.redirect(`${origin}${next}`);
}
