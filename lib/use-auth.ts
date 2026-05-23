'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const router = useRouter();

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }, [router]);

  return { signOut };
}
