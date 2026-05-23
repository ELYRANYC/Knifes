'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import type { ProfileLink } from '@/lib/types';
import Toggle from '@/components/dashboard/editor/toggle';
import SegmentedControl from '@/components/dashboard/editor/segmented-control';
import Select from '@/components/dashboard/editor/select';
import TextInput from '@/components/dashboard/editor/text-input';
import Modal from '@/components/dashboard/editor/modal';

type Row = ProfileLink & { _id: string };

const PLATFORMS = [
  'discord', 'twitter', 'instagram', 'tiktok', 'youtube', 'twitch', 'spotify', 'github', 'gitlab',
  'linkedin', 'telegram', 'reddit', 'snapchat', 'pinterest', 'facebook', 'threads', 'bluesky',
  'mastodon', 'roblox', 'steam', 'psn', 'xbox', 'email', 'website', 'cashapp', 'venmo', 'paypal',
  'kofi', 'patreon', 'buymeacoffee', 'soundcloud', 'applemusic',
];

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

export default function LinksPage() {
  const { config, update } = useProfileEditor();
  const [rows, setRows] = useState<Row[]>(() => config.links.map((l) => ({ ...l, _id: uid() })));
  const [adding, setAdding] = useState(false);
  const [newPlatform, setNewPlatform] = useState('discord');
  const [newUrl, setNewUrl] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const ids = useMemo(() => rows.map((r) => r._id), [rows]);

  const persist = (next: Row[]) => {
    setRows(next);
    update({ links: next.map(({ _id, ...rest }) => rest) });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = rows.findIndex((r) => r._id === active.id);
    const newIdx = rows.findIndex((r) => r._id === over.id);
    persist(arrayMove(rows, oldIdx, newIdx));
  };

  const addLink = () => {
    if (!newUrl.trim()) return;
    persist([...rows, { _id: uid(), platform: newPlatform, url: newUrl.trim(), label: newLabel.trim() || undefined }]);
    setNewUrl('');
    setNewLabel('');
    setNewPlatform('discord');
    setAdding(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="section-overline mb-2">Links</div>
          <h1 className="display-heading text-2xl">Your links</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn btn-primary px-4 py-2.5 text-[13px]">
          <Plus size={15} /> Add link
        </button>
      </header>

      <SegmentedControl
        label="Alignment"
        value={config.linkAlignment ?? 'center'}
        onChange={(v) => update({ linkAlignment: v })}
        segments={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
      />

      {rows.length === 0 ? (
        <div className="dash-card p-8 text-center">
          <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
            No links yet. Add your first one.
          </p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {rows.map((row) => (
                <SortableLink
                  key={row._id}
                  row={row}
                  onToggleHide={() =>
                    persist(rows.map((r) => (r._id === row._id ? { ...r, hidden: !r.hidden } : r)))
                  }
                  onDelete={() => persist(rows.filter((r) => r._id !== row._id))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add a link"
        footer={
          <>
            <button onClick={() => setAdding(false)} className="btn btn-secondary px-4 py-2 text-[13px]">
              Cancel
            </button>
            <button onClick={addLink} className="btn btn-primary px-4 py-2 text-[13px]">
              Add link
            </button>
          </>
        }
      >
        <Select
          label="Platform"
          value={newPlatform}
          onChange={setNewPlatform}
          options={PLATFORMS.map((p) => ({ value: p, label: p }))}
        />
        <TextInput label="URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://…" />
        <TextInput label="Label (optional)" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Defaults to platform name" />
      </Modal>
    </div>
  );
}

function SortableLink({
  row,
  onToggleHide,
  onDelete,
}: {
  row: Row;
  onToggleHide: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row._id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 }}
      className="dash-card flex items-center gap-3 px-3 py-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none p-1"
        style={{ color: 'var(--text-tertiary)' }}
        aria-label="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
          {row.label || row.platform}
        </div>
        <div className="text-[12px] truncate flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
          <ExternalLink size={10} /> {row.url}
        </div>
      </div>
      <Toggle checked={!row.hidden} onChange={onToggleHide} />
      <button
        onClick={onDelete}
        className="p-2 rounded-lg transition-colors hover:bg-white/[0.05]"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-red)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        aria-label="Delete link"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
