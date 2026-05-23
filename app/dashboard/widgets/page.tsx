'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, MessageSquare, Activity, Music2, Youtube, Github } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import type { Widget } from '@/lib/types';
import Modal from '@/components/dashboard/editor/modal';
import Select from '@/components/dashboard/editor/select';
import TextInput from '@/components/dashboard/editor/text-input';

type WType = Widget['type'];

const META: Record<WType, { label: string; field: string; placeholder: string; icon: React.ReactNode }> = {
  'discord-server': { label: 'Discord Server', field: 'invite', placeholder: 'invite code (e.g. lanyard)', icon: <MessageSquare size={16} /> },
  'discord-presence': { label: 'Discord Presence', field: 'userId', placeholder: 'Discord user ID', icon: <Activity size={16} /> },
  spotify: { label: 'Spotify', field: 'userId', placeholder: 'Spotify user ID', icon: <Music2 size={16} /> },
  youtube: { label: 'YouTube', field: 'channelId', placeholder: '@handle', icon: <Youtube size={16} /> },
  github: { label: 'GitHub', field: 'username', placeholder: 'username', icon: <Github size={16} /> },
};

function makeWidget(type: WType, value: string): Widget {
  switch (type) {
    case 'discord-server': return { type, invite: value };
    case 'discord-presence': return { type, userId: value };
    case 'spotify': return { type, userId: value };
    case 'youtube': return { type, channelId: value };
    case 'github': return { type, username: value };
  }
}

function widgetValue(w: Widget): string {
  switch (w.type) {
    case 'discord-server': return w.invite;
    case 'discord-presence': return w.userId;
    case 'spotify': return w.userId;
    case 'youtube': return w.channelId;
    case 'github': return w.username;
  }
}

export default function WidgetsPage() {
  const { config, update } = useProfileEditor();
  const widgets = config.widgets ?? [];
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState<WType>('discord-server');
  const [value, setValue] = useState('');

  const isModern = config.layout === 'modern';

  const add = () => {
    if (!value.trim()) return;
    update({ widgets: [...widgets, makeWidget(type, value.trim())] });
    setValue('');
    setType('discord-server');
    setAdding(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="section-overline mb-2">Widgets</div>
          <h1 className="display-heading text-2xl">Second-tab widgets</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn btn-primary px-4 py-2.5 text-[13px]">
          <Plus size={15} /> Add widget
        </button>
      </header>

      {!isModern && (
        <div className="dash-card p-4 flex items-start gap-3">
          <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            Widgets appear on the second tab of the <strong style={{ color: 'var(--text-primary)' }}>Modern</strong> layout.
            Switch to it in{' '}
            <Link href="/dashboard/customize" className="underline" style={{ color: 'var(--text-primary)' }}>
              Customize → Layout
            </Link>{' '}
            to show them.
          </p>
        </div>
      )}

      {widgets.length === 0 ? (
        <div className="dash-card p-8 text-center">
          <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>No widgets yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {widgets.map((w, i) => (
            <div key={i} className="dash-card flex items-center gap-3 px-3 py-3">
              <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                {META[w.type].icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px]" style={{ color: 'var(--text-primary)' }}>{META[w.type].label}</div>
                <div className="text-[12px] truncate" style={{ color: 'var(--text-tertiary)' }}>{widgetValue(w)}</div>
              </div>
              <button
                onClick={() => update({ widgets: widgets.filter((_, j) => j !== i) })}
                className="p-2 rounded-lg transition-colors hover:bg-white/[0.05]"
                style={{ color: 'var(--text-tertiary)' }}
                aria-label="Delete widget"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add a widget"
        footer={
          <>
            <button onClick={() => setAdding(false)} className="btn btn-secondary px-4 py-2 text-[13px]">Cancel</button>
            <button onClick={add} className="btn btn-primary px-4 py-2 text-[13px]">Add widget</button>
          </>
        }
      >
        <Select<WType>
          label="Type"
          value={type}
          onChange={(t) => setType(t)}
          options={(Object.keys(META) as WType[]).map((t) => ({ value: t, label: META[t].label }))}
        />
        <TextInput label={META[type].field} value={value} onChange={(e) => setValue(e.target.value)} placeholder={META[type].placeholder} />
      </Modal>
    </div>
  );
}
