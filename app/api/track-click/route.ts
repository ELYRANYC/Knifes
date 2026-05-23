import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: { profileId?: string; platform?: string; url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.profileId || !body.platform || !body.url) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createClient();
  await supabase.from('link_clicks').insert({
    profile_id: body.profileId,
    platform: body.platform,
    url: body.url.slice(0, 1024),
  });

  return NextResponse.json({ ok: true });
}
