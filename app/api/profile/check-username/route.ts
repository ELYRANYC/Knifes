import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateUsername } from '@/lib/profile-mapper';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username') ?? '';
  const v = validateUsername(username);
  if (!v.valid) {
    return NextResponse.json({ available: false, error: v.error });
  }

  const supabase = createClient();
  const { data, error } = await supabase.rpc('username_available', {
    candidate: username.toLowerCase(),
  });

  if (error) {
    return NextResponse.json({ available: false, error: 'check failed' }, { status: 500 });
  }
  return NextResponse.json({ available: Boolean(data) });
}
