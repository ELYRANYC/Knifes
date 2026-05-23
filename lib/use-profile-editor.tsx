'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ProfileConfig } from '@/lib/types';
import { configToRow, rowToConfig } from '@/lib/profile-mapper';
import type { ProfileRow } from '@/lib/supabase/types';
import { createClient } from '@/lib/supabase/client';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

type EditorContextValue = {
  config: ProfileConfig;
  profileId: string;
  username: string;
  status: SaveStatus;
  update: (patch: Partial<ProfileConfig>) => void;
  /** Persist immediately, bypassing the debounce (used by list editors). */
  flush: () => Promise<void>;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function ProfileEditorProvider({
  initialRow,
  children,
}: {
  initialRow: ProfileRow;
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<ProfileConfig>(() => rowToConfig(initialRow));
  const [status, setStatus] = useState<SaveStatus>('idle');
  const pending = useRef<Partial<ProfileConfig>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supabase = useMemo(() => createClient(), []);
  const profileId = initialRow.id;

  const doSave = useCallback(async () => {
    const patch = pending.current;
    pending.current = {};
    if (Object.keys(patch).length === 0) {
      setStatus('idle');
      return;
    }
    setStatus('saving');
    const row = configToRow(patch);
    const { error } = await supabase.from('profiles').update(row).eq('id', profileId);
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('saved');
    setTimeout(() => setStatus((s) => (s === 'saved' ? 'idle' : s)), 1800);
  }, [supabase, profileId]);

  const update = useCallback(
    (patch: Partial<ProfileConfig>) => {
      setConfig((prev) => ({ ...prev, ...patch }));
      pending.current = { ...pending.current, ...patch };
      setStatus('saving');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void doSave(), 1000);
    },
    [doSave],
  );

  const flush = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    await doSave();
  }, [doSave]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ config, profileId, username: initialRow.username, status, update, flush }),
    [config, profileId, initialRow.username, status, update, flush],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useProfileEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useProfileEditor must be used within ProfileEditorProvider');
  return ctx;
}
