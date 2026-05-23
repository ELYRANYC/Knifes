'use client';

import { useEffect, useState } from 'react';

const HOUR_MS = 60 * 60 * 1000;

export function useViewCounter(username: string) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!username || typeof window === 'undefined') return;
    const countKey = `knives:views:${username}`;
    const tsKey = `knives:views:${username}:ts`;

    const stored = parseInt(localStorage.getItem(countKey) ?? '0', 10) || 0;
    const lastTs = parseInt(localStorage.getItem(tsKey) ?? '0', 10) || 0;
    const now = Date.now();

    let next = stored;
    if (now - lastTs > HOUR_MS) {
      next = stored + 1;
      localStorage.setItem(countKey, String(next));
      localStorage.setItem(tsKey, String(now));
    }
    setViews(next);
  }, [username]);

  return views;
}
