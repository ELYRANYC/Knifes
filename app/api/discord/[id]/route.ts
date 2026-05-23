import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(_req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  if (!/^\d{15,20}$/.test(id)) {
    return NextResponse.json({ success: false, error: 'invalid_id' }, { status: 400 });
  }
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: 'upstream_error', status: res.status },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=10, s-maxage=10',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'fetch_failed', message: (err as Error).message },
      { status: 502 },
    );
  }
}
