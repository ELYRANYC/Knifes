'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileEditor } from '@/lib/use-profile-editor';
import { createClient } from '@/lib/supabase/client';
import { validateUsername } from '@/lib/profile-mapper';
import TextInput from '@/components/dashboard/editor/text-input';
import Modal from '@/components/dashboard/editor/modal';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dash-card p-5 flex flex-col gap-4">
      <h2 className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Notice({ kind, text }: { kind: 'ok' | 'err'; text: string }) {
  return (
    <p className="text-[12px]" style={{ color: kind === 'ok' ? 'var(--status-green)' : 'var(--accent-red)' }}>
      {text}
    </p>
  );
}

export default function SettingsPage() {
  const { config, profileId, username, update } = useProfileEditor();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState(username);
  const [usernameMsg, setUsernameMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [discordId, setDiscordId] = useState(config.discordId ?? '');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ''));
  }, [supabase]);

  const saveUsername = async () => {
    setUsernameMsg(null);
    const slug = newUsername.trim().toLowerCase();
    if (slug === username) {
      setUsernameMsg({ kind: 'ok', text: 'No change' });
      return;
    }
    const v = validateUsername(slug);
    if (!v.valid) return setUsernameMsg({ kind: 'err', text: v.error ?? 'Invalid' });
    setBusy('username');
    const res = await fetch(`/api/profile/check-username?username=${encodeURIComponent(slug)}`);
    const json = (await res.json()) as { available: boolean };
    if (!json.available) {
      setBusy(null);
      return setUsernameMsg({ kind: 'err', text: 'That username is taken or reserved' });
    }
    const { error } = await supabase.from('profiles').update({ username: slug }).eq('id', profileId);
    setBusy(null);
    if (error) return setUsernameMsg({ kind: 'err', text: 'Could not update' });
    update({ username: slug });
    setUsernameMsg({ kind: 'ok', text: 'Username updated' });
    router.refresh();
  };

  const saveEmail = async () => {
    setEmailMsg(null);
    if (!newEmail.includes('@')) return setEmailMsg({ kind: 'err', text: 'Enter a valid email' });
    setBusy('email');
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setBusy(null);
    if (error) return setEmailMsg({ kind: 'err', text: error.message });
    setEmailMsg({ kind: 'ok', text: 'Check both inboxes to confirm the change' });
    setNewEmail('');
  };

  const savePassword = async () => {
    setPwMsg(null);
    if (newPw.length < 8) return setPwMsg({ kind: 'err', text: 'At least 8 characters' });
    if (newPw !== confirmPw) return setPwMsg({ kind: 'err', text: 'Passwords do not match' });
    setBusy('pw');
    // Verify current password by re-authenticating.
    const { error: reauth } = await supabase.auth.signInWithPassword({ email, password: curPw });
    if (reauth) {
      setBusy(null);
      return setPwMsg({ kind: 'err', text: 'Current password is incorrect' });
    }
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setBusy(null);
    if (error) return setPwMsg({ kind: 'err', text: error.message });
    setPwMsg({ kind: 'ok', text: 'Password updated' });
    setCurPw('');
    setNewPw('');
    setConfirmPw('');
  };

  const saveDiscord = () => {
    update({ discordId: discordId.trim() || undefined });
  };

  const connectDiscord = async () => {
    await supabase.auth.linkIdentity({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard/settings` },
    });
  };

  const deleteAccount = async () => {
    setBusy('delete');
    const res = await fetch('/api/profile/delete', { method: 'POST' });
    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="section-overline mb-2">Settings</div>
        <h1 className="display-heading text-2xl">Account</h1>
      </header>

      <Section title="Username">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <TextInput value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </div>
          <button onClick={saveUsername} disabled={busy === 'username'} className="btn btn-primary px-4 py-3 text-[13px] disabled:opacity-60">
            Save
          </button>
        </div>
        {usernameMsg && <Notice kind={usernameMsg.kind} text={usernameMsg.text} />}
      </Section>

      <Section title="Email">
        <TextInput label="Current" value={email} disabled />
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <TextInput label="New email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@example.com" />
          </div>
          <button onClick={saveEmail} disabled={busy === 'email'} className="btn btn-primary px-4 py-3 text-[13px] disabled:opacity-60">
            Update
          </button>
        </div>
        {emailMsg && <Notice kind={emailMsg.kind} text={emailMsg.text} />}
      </Section>

      <Section title="Password">
        <TextInput label="Current password" type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} />
        <TextInput label="New password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
        <TextInput label="Confirm new password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
        <div>
          <button onClick={savePassword} disabled={busy === 'pw'} className="btn btn-primary px-4 py-2.5 text-[13px] disabled:opacity-60">
            Change password
          </button>
        </div>
        {pwMsg && <Notice kind={pwMsg.kind} text={pwMsg.text} />}
      </Section>

      <Section title="Discord">
        <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
          Your Discord user ID powers the live presence widget (via Lanyard). Join discord.gg/lanyard for it to work.
        </p>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <TextInput label="Discord user ID" value={discordId} onChange={(e) => setDiscordId(e.target.value)} placeholder="000000000000000000" onBlur={saveDiscord} />
          </div>
          <button onClick={saveDiscord} className="btn btn-secondary px-4 py-3 text-[13px]">Save</button>
        </div>
        <button onClick={connectDiscord} className="btn btn-secondary px-4 py-2.5 text-[13px] self-start">
          Connect Discord account
        </button>
      </Section>

      <Section title="Danger zone">
        <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          Deleting your account is permanent and removes your profile, links, analytics, and uploads.
        </p>
        <button
          onClick={() => setDeleteOpen(true)}
          className="btn px-4 py-2.5 text-[13px] self-start"
          style={{ background: 'transparent', color: 'var(--accent-red)', border: '1px solid rgba(255,69,58,0.4)' }}
        >
          Delete account
        </button>
      </Section>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account"
        footer={
          <>
            <button onClick={() => setDeleteOpen(false)} className="btn btn-secondary px-4 py-2 text-[13px]">Cancel</button>
            <button
              onClick={deleteAccount}
              disabled={confirmName !== username || busy === 'delete'}
              className="btn btn-primary px-4 py-2 text-[13px] disabled:opacity-40"
            >
              {busy === 'delete' ? 'Deleting…' : 'Delete forever'}
            </button>
          </>
        }
      >
        <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          Type <strong style={{ color: 'var(--text-primary)' }}>{username}</strong> to confirm.
        </p>
        <TextInput value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder={username} />
      </Modal>
    </div>
  );
}
