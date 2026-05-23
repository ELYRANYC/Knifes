'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/auth-card';
import TextInput from '@/components/dashboard/editor/text-input';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
    setTimeout(() => {
      router.push('/dashboard');
      router.refresh();
    }, 1200);
  };

  return (
    <AuthCard
      title={done ? 'Password updated' : 'Set a new password'}
      subtitle={done ? 'Redirecting you to your dashboard…' : 'Choose a strong password you’ll remember.'}
    >
      {!done && (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="New password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            large
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            label="Confirm password"
            type="password"
            name="confirm"
            autoComplete="new-password"
            required
            large
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && <p className="field-error -mt-1">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 disabled:opacity-60">
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
