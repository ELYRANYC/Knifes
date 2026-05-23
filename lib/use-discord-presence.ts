'use client';

import { useEffect, useState, useRef } from 'react';
import type { LanyardData } from './types';

type State = {
  data: LanyardData | null;
  loading: boolean;
  error: string | null;
};

export function useDiscordPresence(userId: string | undefined, pollMs = 15000) {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!userId) {
      setState({ data: null, loading: false, error: 'no user id' });
      return;
    }
    let cancelled = false;

    const fetchPresence = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          if (cancelled) return;
          setState({
            data: null,
            loading: false,
            error: res.status === 404 ? 'not-monitored' : 'fetch-error',
          });
          return;
        }
        const json = (await res.json()) as { success: boolean; data: LanyardData };
        if (cancelled) return;
        if (json.success && json.data) {
          setState({ data: json.data, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: 'fetch-error' });
        }
      } catch {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: 'network' }));
      }
    };

    fetchPresence();
    timerRef.current = setInterval(fetchPresence, pollMs);

    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userId, pollMs]);

  return state;
}
