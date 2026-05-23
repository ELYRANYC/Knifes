import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { defaultProfileInsert, validateUsername } from '@/lib/profile-mapper';
import type { ProfileRow } from '@/lib/supabase/types';
import DashboardShell from '@/components/dashboard/dashboard-shell';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/dashboard');

  let { data: row } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  // Safety net: create a default profile if one is somehow missing.
  if (!row) {
    let base = (user.email?.split('@')[0] ?? 'user')
      .toLowerCase()
      .replace(/[^a-z0-9_.]/g, '')
      .slice(0, 18);
    if (!validateUsername(base).valid) base = `user${Math.random().toString(36).slice(2, 8)}`;
    const { data: avail } = await supabase.rpc('username_available', { candidate: base });
    const finalName = avail ? base : `${base.slice(0, 12)}${Math.random().toString(36).slice(2, 6)}`;
    const { data: created } = await supabase
      .from('profiles')
      .insert(defaultProfileInsert(user.id, finalName))
      .select('*')
      .single();
    row = created;
  }

  if (!row) redirect('/login');

  return (
    <DashboardShell row={row as ProfileRow} email={user.email ?? ''}>
      {children}
    </DashboardShell>
  );
}
