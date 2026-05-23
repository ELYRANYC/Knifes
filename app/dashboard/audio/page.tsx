'use client';

import { useState } from 'react';
import { Music, Trash2 } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import type { AudioTrack } from '@/lib/types';
import Toggle from '@/components/dashboard/editor/toggle';
import Slider from '@/components/dashboard/editor/slider';
import { uploadToBucket } from '@/lib/storage';

export default function AudioPage() {
  const { config, update } = useProfileEditor();
  const tracks = config.audio ?? [];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setTracks = (next: AudioTrack[]) => update({ audio: next });

  const onAudioFile = async (file: File) => {
    setError(null);
    if (file.size > 10 * 1024 * 1024) {
      setError('Max 10MB');
      return;
    }
    setBusy(true);
    try {
      const url = await uploadToBucket('audio', file);
      const title = file.name.replace(/\.[^.]+$/, '');
      setTracks([...tracks, { title, url }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="section-overline mb-2">Audio</div>
        <h1 className="display-heading text-2xl">Music</h1>
        <p className="text-[14px] mt-1" style={{ color: 'var(--text-secondary)' }}>
          Tracks play in a compact player. Autoplay needs the entry screen enabled.
        </p>
      </header>

      <div className="dash-card p-5 flex flex-col gap-4">
        <Toggle label="Autoplay" checked={config.audioAutoplay ?? false} onChange={(v) => update({ audioAutoplay: v })} />
        <Slider
          label="Default volume"
          value={Math.round((config.audioVolume ?? 0.3) * 100)}
          min={0}
          max={100}
          suffix="%"
          onChange={(v) => update({ audioVolume: v / 100 })}
        />
      </div>

      <div className="flex flex-col gap-2">
        {tracks.map((t, i) => (
          <div key={i} className="dash-card flex items-center gap-3 p-3">
            {t.cover ? (
              <img src={t.cover} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-tertiary)' }}>
                <Music size={18} />
              </div>
            )}
            <div className="flex-1 min-w-0 grid grid-cols-2 gap-2">
              <input
                className="field"
                style={{ padding: '8px 10px' }}
                value={t.title}
                placeholder="Title"
                onChange={(e) => setTracks(tracks.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              />
              <input
                className="field"
                style={{ padding: '8px 10px' }}
                value={t.artist ?? ''}
                placeholder="Artist"
                onChange={(e) => setTracks(tracks.map((x, j) => (j === i ? { ...x, artist: e.target.value } : x)))}
              />
            </div>
            <button
              onClick={() => setTracks(tracks.filter((_, j) => j !== i))}
              className="p-2 rounded-lg transition-colors hover:bg-white/[0.05] flex-shrink-0"
              style={{ color: 'var(--text-tertiary)' }}
              aria-label="Delete track"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <AudioPicker busy={busy} onPick={onAudioFile} />
        {error && <p className="field-error">{error}</p>}
      </div>
    </div>
  );
}

function AudioPicker({ busy, onPick }: { busy: boolean; onPick: (f: File) => void }) {
  return (
    <label
      className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 cursor-pointer text-[13px]"
      style={{ background: 'var(--surface)', border: '1px dashed var(--hairline)', color: 'var(--text-secondary)' }}
    >
      {busy ? 'Uploading…' : 'Choose an audio file (mp3, up to 10MB)'}
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = '';
        }}
      />
    </label>
  );
}
