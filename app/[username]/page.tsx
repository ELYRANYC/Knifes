import type { Metadata, Viewport } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { rowToConfig } from '@/lib/profile-mapper';
import type { ProfileRow } from '@/lib/supabase/types';
import ProfileRenderer from '@/components/profile-renderer';
import ViewTracker from '@/components/view-tracker';

export const dynamic = 'force-dynamic';

type Params = { username: string };

async function resolveProfile(username: string): Promise<ProfileRow | null> {
  const supabase = createClient();
  const slug = username.toLowerCase();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .ilike('username', slug)
    .maybeSingle();

  if (profile) return profile as ProfileRow;
  return null;
}

async function resolveAliasTarget(username: string): Promise<string | null> {
  const supabase = createClient();
  const { data: alias } = await supabase
    .from('aliases')
    .select('profile_id')
    .ilike('alias', username.toLowerCase())
    .maybeSingle();
  if (!alias) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', alias.profile_id)
    .maybeSingle();
  return profile?.username ?? null;
}

export async function generateViewport({ params }: { params: Params }): Promise<Viewport> {
  const row = await resolveProfile(params.username);
  const config = row ? rowToConfig(row) : null;
  return {
    themeColor: config?.meta?.themeColor ?? config?.colors.accent ?? '#000000',
    width: 'device-width',
    initialScale: 1,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const row = await resolveProfile(params.username);
  if (!row) {
    return { title: 'not found — knives.lol', description: 'this profile does not exist' };
  }
  const config = rowToConfig(row);
  const desc = Array.isArray(config.description)
    ? (config.description[0] ?? `${config.displayName} on knives.lol`)
    : config.description;
  const title = config.meta?.title ?? `${config.displayName} | knives.lol`;
  const description = config.meta?.description ?? desc;
  const ogImage = config.meta?.embedImage ?? config.avatar;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      type: 'profile',
      siteName: 'knives.lol',
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { preview?: string };
}) {
  const row = await resolveProfile(params.username);

  if (!row) {
    const canonical = await resolveAliasTarget(params.username);
    if (canonical && canonical.toLowerCase() !== params.username.toLowerCase()) {
      redirect(`/${canonical}`);
    }
    notFound();
  }

  const isPreview = searchParams.preview === '1';
  const config = rowToConfig(row);

  if (isPreview) {
    // Rendered inside the dashboard preview iframe — no tracking, no entry gate.
    return <ProfileRenderer config={config} preview viewCount={0} />;
  }

  const supabase = createClient();
  const { data: count } = await supabase.rpc('profile_view_count', { p_profile_id: row.id });

  return (
    <>
      <ProfileRenderer config={config} viewCount={count ?? 0} profileId={row.id} />
      <ViewTracker profileId={row.id} />
    </>
  );
}
