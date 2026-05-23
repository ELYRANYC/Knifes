'use client';

import { useEffect, useRef, useState } from 'react';
import { Smartphone, Monitor, ExternalLink, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useProfileEditor } from '@/lib/use-profile-editor';
import SegmentedControl from './editor/segmented-control';

const DEVICES = {
  mobile: { w: 390, h: 844, radius: 36 },
  desktop: { w: 1320, h: 860, radius: 14 },
} as const;

export default function PreviewPane() {
  const { username, status } = useProfileEditor();
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [scale, setScale] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prevStatus = useRef(status);

  const { w, h, radius } = DEVICES[device];

  useEffect(() => {
    const calc = () => {
      if (!wrapRef.current) return;
      const availW = wrapRef.current.clientWidth - 8;
      const availH = wrapRef.current.clientHeight - 8;
      setScale(Math.min(1, availW / w, availH / h));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [w, h]);

  // Reload the iframe whenever a save lands so the preview reflects edits.
  useEffect(() => {
    if (prevStatus.current !== 'saved' && status === 'saved') {
      setReloadKey((k) => k + 1);
    }
    prevStatus.current = status;
  }, [status]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="w-[150px]">
          <SegmentedControl
            value={device}
            onChange={setDevice}
            size="sm"
            segments={[
              { value: 'mobile', icon: <Smartphone size={14} /> },
              { value: 'desktop', icon: <Monitor size={14} /> },
            ]}
          />
        </div>

        <div className="flex items-center gap-3">
          <SaveIndicator status={status} />
          <Link
            href={`/${username}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-[12px] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ExternalLink size={13} /> Open
          </Link>
        </div>
      </div>

      <div ref={wrapRef} className="flex-1 flex items-center justify-center overflow-hidden p-4">
        <div style={{ width: w * scale, height: h * scale }}>
          <div
            style={{
              width: w,
              height: h,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              borderRadius: radius,
              overflow: 'hidden',
              border: '1px solid var(--hairline)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          >
            <iframe
              key={reloadKey}
              src={`/${username}?preview=1`}
              title="Profile preview"
              style={{ width: w, height: h, border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: string }) {
  if (status === 'saving')
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
        <Loader2 size={12} className="animate-spin" /> Saving…
      </span>
    );
  if (status === 'saved')
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--status-green)' }}>
        <Check size={12} /> Saved
      </span>
    );
  if (status === 'error')
    return (
      <span className="text-[12px]" style={{ color: 'var(--accent-red)' }}>
        Save failed
      </span>
    );
  return null;
}
