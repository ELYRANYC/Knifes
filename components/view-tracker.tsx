'use client';

import { useEffect } from 'react';

// Records a view once per session per profile. The visible count comes from the
// server (RPC); this just records the visit without inflating on prefetch.
export default function ViewTracker({ profileId }: { profileId: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `knives:viewed:${profileId}`;
    if (sessionStorage.getItem(key) === '1') return;
    sessionStorage.setItem(key, '1');

    const referrer = document.referrer || '';
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, referrer }),
      keepalive: true,
    }).catch(() => {});
  }, [profileId]);

  return null;
}
