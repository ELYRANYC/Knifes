/**
 * Migrates the Phase 1 config-file profiles into Supabase.
 *
 *   npm run import-profiles
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 * Creates a verified auth user (random password) per profile and inserts the
 * matching profiles row. Temporary passwords are printed for recovery.
 */
import { config as loadEnv } from 'dotenv';
import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { listProfiles } from '../profiles/index';
import { configToRow } from '../lib/profile-mapper';
import type { Database } from '../lib/supabase/types';

loadEnv({ path: existsSync('.env.local') ? '.env.local' : '.env' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const admin = createClient<Database>(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function randomPassword(): string {
  return randomBytes(12).toString('base64url');
}

async function main() {
  const profiles = listProfiles();
  const summary: { username: string; email: string; password: string; status: string }[] = [];

  for (const profile of profiles) {
    const username = profile.username.toLowerCase();
    const email = `${username}@knives.local`;
    const password = randomPassword();

    const { data: created, error: userErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username },
    });

    if (userErr || !created.user) {
      summary.push({ username, email, password: '—', status: `skip: ${userErr?.message ?? 'no user'}` });
      continue;
    }

    const row = {
      ...configToRow(profile),
      user_id: created.user.id,
      username,
      display_name: profile.displayName,
    };

    const { error: insErr } = await admin.from('profiles').insert(row as never);
    if (insErr) {
      summary.push({ username, email, password, status: `profile error: ${insErr.message}` });
      continue;
    }

    summary.push({ username, email, password, status: 'created' });
  }

  console.log('\nImport complete:\n');
  console.table(summary);
  console.log('\nSave these temporary passwords — change them after first login.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
