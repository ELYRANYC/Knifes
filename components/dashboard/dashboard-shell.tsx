'use client';

import { ProfileEditorProvider } from '@/lib/use-profile-editor';
import type { ProfileRow } from '@/lib/supabase/types';
import TopBar from './top-bar';
import Sidebar from './sidebar';
import PreviewPane from './preview-pane';

export default function DashboardShell({
  row,
  email,
  children,
}: {
  row: ProfileRow;
  email: string;
  children: React.ReactNode;
}) {
  const avatar =
    row.avatar_url ||
    `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(row.username)}`;

  return (
    <ProfileEditorProvider initialRow={row}>
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <TopBar username={row.username} avatarUrl={avatar} email={email} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0 px-4 sm:px-6 py-6 pb-24 md:pb-10">
            <div className="max-w-2xl mx-auto xl:mx-0">{children}</div>
          </main>
          <div
            className="hidden xl:block w-[440px] flex-shrink-0 sticky top-[57px] h-[calc(100vh-57px)]"
            style={{ borderLeft: '1px solid var(--hairline)' }}
          >
            <PreviewPane />
          </div>
        </div>
      </div>
    </ProfileEditorProvider>
  );
}
