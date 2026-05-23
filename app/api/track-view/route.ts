import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function deviceFromUA(ua: string): string {
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(s)) return 'tablet';
  if (/mobi|iphone|android.*mobile|phone/.test(s)) return 'mobile';
  return 'desktop';
}

export async function POST(request: NextRequest) {
  let body: { profileId?: string; referrer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.profileId) return NextResponse.json({ ok: false }, { status: 400 });

  const ua = request.headers.get('user-agent') ?? '';
  const country =
    request.headers.get('x-vercel-ip-country') ??
    request.geo?.country ??
    null;
  const referrer = (body.referrer || request.headers.get('referer') || '').slice(0, 512) || null;

  const supabase = createClient();
  await supabase.from('profile_views').insert({
    profile_id: body.profileId,
    country,
    device_type: deviceFromUA(ua),
    referrer,
  });

  return NextResponse.json({ ok: true });
}
