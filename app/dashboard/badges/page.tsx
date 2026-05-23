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
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Crown, Shield, Skull, Flame, Star, Heart, Moon, Sun, Sparkles, Terminal, Zap, Award, Gem, Bot, Code, Music, Eye,
  GripVertical, Plus, Trash2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import type { Badge } from '@/lib/types';
import Modal from '@/components/dashboard/editor/modal';
import TextInput from '@/components/dashboard/editor/text-input';
import ColorPicker from '@/components/dashboard/editor/color-picker';

const ICONS: Record<string, LucideIcon> = {
  crown: Crown, shield: Shield, skull: Skull, flame: Flame, star: Star, heart: Heart, moon: Moon,
  sun: Sun, sparkles: Sparkles, terminal: Terminal, zap: Zap, award: Award, gem: Gem, bot: Bot,
  code: Code, music: Music, eye: Eye,
};
const ICON_KEYS = Object.keys(ICONS);

type Row = Badge & { _id: string };
const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

export default function BadgesPage() {
  const { config, update } = useProfileEditor();
  const [rows, setRows] = useState<Row[]>(() => (config.badges ?? []).map((b) => ({ ...b, _id: uid() })));
  const [adding, setAdding] = useState(false);
  const [icon, setIcon] = useState('star');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#f5f5f7');
  const [search, setSearch] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const ids = useMemo(() => rows.map((r) => r._id), [rows]);
  const filtered = ICON_KEYS.filter((k) => k.includes(search.toLowerCase()));

  const persist = (next: Row[]) => {
    setRows(next);
    update({ badges: next.map(({ _id, ...rest }) => rest) });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    persist(arrayMove(rows, rows.findIndex((r) => r._id === active.id), rows.findIndex((r) => r._id === over.id)));
  };

  const addBadge = () => {
    if (!label.trim()) return;
    persist([...rows, { _id: uid(), icon, label: label.trim(), color }]);
    setLabel('');
    setIcon('star');
    setColor('#f5f5f7');
    setAdding(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="section-overline mb-2">Badges</div>
          <h1 className="display-heading text-2xl">Profile badges</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn btn-primary px-4 py-2.5 text-[13px]">
          <Plus size={15} /> Add badge
        </button>
      </header>

      {rows.length === 0 ? (
        <div className="dash-card p-8 text-center">
          <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>No badges yet.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {rows.map((row) => (
                <SortableBadge key={row._id} row={row} onDelete={() => persist(rows.filter((r) => r._id !== row._id))} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add a badge"
        footer={
          <>
            <button onClick={() => setAdding(false)} className="btn btn-secondary px-4 py-2 text-[13px]">Cancel</button>
            <button onClick={addBadge} className="btn btn-primary px-4 py-2 text-[13px]">Add badge</button>
          </>
        }
      >
        <TextInput label="Search icons" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="crown, star…" />
        <div className="grid grid-cols-6 gap-2 max-h-44 overflow-auto no-scrollbar">
          {filtered.map((k) => {
            const Icon = ICONS[k]!;
            const active = k === icon;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setIcon(k)}
                className="aspect-square rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: active ? 'var(--surface)' : 'transparent',
                  border: `1px solid ${active ? 'var(--hairline-strong)' : 'var(--hairline)'}`,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                aria-label={k}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
        <TextInput label="Label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. founder" maxLength={24} />
        <ColorPicker label="Color" value={color} onChange={setColor} />
      </Modal>
    </div>
  );
}

function SortableBadge({ row, onDelete }: { row: Row; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row._id });
  const Icon = ICONS[row.icon] ?? Star;
  const color = row.color ?? '#f5f5f7';
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 }}
      className="dash-card flex items-center gap-3 px-3 py-3"
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none p-1" style={{ color: 'var(--text-tertiary)' }} aria-label="Reorder">
        <GripVertical size={16} />
      </button>
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px]"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--hairline)', color }}
      >
        <Icon size={12} />
        {row.label}
      </span>
      <div className="flex-1" />
      <button onClick={onDelete} className="p-2 rounded-lg transition-colors hover:bg-white/[0.05]" style={{ color: 'var(--text-tertiary)' }} aria-label="Delete badge">
        <Trash2 size={15} />
      </button>
    </div>
  );
}
