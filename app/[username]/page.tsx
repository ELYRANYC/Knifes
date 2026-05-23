import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { getProfile, profiles } from '@/profiles';
import ProfileRenderer from '@/components/profile-renderer';

type Params = { username: string };

export function generateStaticParams() {
  return Object.keys(profiles).map((username) => ({ username }));
}

export function generateViewport({ params }: { params: Params }): Viewport {
  const profile = getProfile(params.username);
  return {
    themeColor: profile?.meta?.themeColor ?? profile?.colors.accent ?? '#0a0a0f',
    width: 'device-width',
    initialScale: 1,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = params;
  const profile = getProfile(username);
  if (!profile) {
    return {
      title: 'not found — knives.lol',
      description: 'this profile does not exist',
    };
  }
  const desc = Array.isArray(profile.description)
    ? (profile.description[0] ?? `${profile.displayName} on knives.lol`)
    : profile.description;
  const title = profile.meta?.title ?? `${profile.displayName} | knives.lol`;
  const description = profile.meta?.description ?? desc;
  const ogImage = profile.meta?.embedImage ?? profile.avatar;
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProfilePage({ params }: { params: Params }) {
  const { username } = params;
  const profile = getProfile(username);
  if (!profile) notFound();
  return <ProfileRenderer config={profile} />;
}
