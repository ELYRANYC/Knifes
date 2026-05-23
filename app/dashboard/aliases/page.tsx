'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, AtSign } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import { createClient } from '@/lib/supabase/client';
import { validateUsername } from '@/lib/profile-mapper';
import TextInput from '@/components/dashboard/editor/text-input';

type AliasRow = { id: string; alias: string };
const FREE_MAX = 1;

export default function AliasesPage() {
  const { profileId } = useProfileEditor();
  const supabase = useMemo(() => createClient(), []);
  const [aliases, setAliases] = useState<AliasRow[]>([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('aliases')
      .select('id, alias')
      .eq('profile_id', profileId)
      .then(({ data }) => {
        if (!cancelled) {
          setAliases(data ?? []);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, profileId]);

  const add = async () => {
    setError(null);
    const slug = value.trim().toLowerCase();
    const v = validateUsername(slug);
    if (!v.valid) {
      setError(v.error ?? 'Invalid');
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/profile/check-username?username=${encodeURIComponent(slug)}`);
    const json = (await res.json()) as { available: boolean };
    if (!json.available) {
      setError('That name is taken or reserved');
      setBusy(false);
      return;
    }
    const { data, error: insErr } = await supabase
      .from('aliases')
      .insert({ profile_id: profileId, alias: slug })
      .select('id, alias')
      .single();
    if (insErr || !data) {
      setError('Could not add alias');
      setBusy(false);
      return;
    }
    setAliases((a) => [...a, data]);
    setValue('');
    setBusy(false);
  };

  const remove = async (id: string) => {
    await supabase.from('aliases').delete().eq('id', id);
    setAliases((a) => a.filter((x) => x.id !== id));
  };

  const atLimit = aliases.length >= FREE_MAX;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="section-overline mb-2">Aliases</div>
        <h1 className="display-heading text-2xl">Alternate usernames</h1>
        <p className="text-[14px] mt-1" style={{ color: 'var(--text-secondary)' }}>
          Aliases redirect to your profile. Free includes {FREE_MAX}.
        </p>
      </header>

      {!loading && (
        <div className="flex flex-col gap-2">
          {aliases.map((a) => (
            <div key={a.id} className="dash-card flex items-center gap-3 px-3 py-3">
              <AtSign size={15} style={{ color: 'var(--text-tertiary)' }} />
              <span className="flex-1 text-[14px]" style={{ color: 'var(--text-primary)' }}>
                knives.lol/{a.alias}
              </span>
              <button onClick={() => remove(a.id)} className="p-2 rounded-lg transition-colors hover:bg-white/[0.05]" style={{ color: 'var(--text-tertiary)' }} aria-label="Delete alias">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {atLimit ? (
        <div className="dash-card p-4">
          <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            You&apos;ve used your free alias. More alias slots come with Premium in Phase 3.
          </p>
        </div>
      ) : (
        <div className="dash-card p-5 flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <TextInput label="New alias" value={value} onChange={(e) => setValue(e.target.value)} placeholder="alt-name" error={error ?? undefined} />
            </div>
            <button onClick={add} disabled={busy} className="btn btn-primary px-4 py-3 text-[13px] disabled:opacity-60">
              <Plus size={15} /> Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
