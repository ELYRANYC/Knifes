'use client';

import { createClient } from '@/lib/supabase/client';

export type StorageBucket = 'avatars' | 'backgrounds' | 'audio' | 'cursors' | 'banners' | 'embeds';

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
    .slice(-48);
}

// Uploads to `{userId}/{random}-{name}` (matching the storage RLS policy) and
// returns the public URL.
export async function uploadToBucket(bucket: StorageBucket, file: File): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const prefix =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  const path = `${user.id}/${prefix}-${safeName(file.name)}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export const BUCKET_LIMITS: Record<StorageBucket, { maxMB: number; accept: string }> = {
  avatars: { maxMB: 5, accept: 'image/*' },
  backgrounds: { maxMB: 15, accept: 'image/*,video/*' },
  audio: { maxMB: 10, accept: 'audio/*' },
  cursors: { maxMB: 1, accept: 'image/*' },
  banners: { maxMB: 10, accept: 'image/*' },
  embeds: { maxMB: 5, accept: 'image/*' },
};
