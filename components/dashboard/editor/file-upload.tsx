'use client';

import { useRef, useState } from 'react';
import { UploadCloud, Loader2, X } from 'lucide-react';
import { uploadToBucket, BUCKET_LIMITS, type StorageBucket } from '@/lib/storage';

export default function FileUpload({
  bucket,
  value,
  onUploaded,
  onClear,
  label,
  preview = 'image',
}: {
  bucket: StorageBucket;
  value?: string;
  onUploaded: (url: string) => void;
  onClear?: () => void;
  label?: string;
  preview?: 'image' | 'none';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = BUCKET_LIMITS[bucket];

  const handleFile = async (file: File) => {
    setError(null);
    if (file.size > limit.maxMB * 1024 * 1024) {
      setError(`Max ${limit.maxMB}MB`);
      return;
    }
    setBusy(true);
    try {
      const url = await uploadToBucket(bucket, file);
      onUploaded(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="field-label">{label}</label>}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) void handleFile(f);
        }}
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-6 cursor-pointer transition-colors"
        style={{
          background: 'var(--surface)',
          border: `1px dashed ${dragging ? 'var(--hairline-strong)' : 'var(--hairline)'}`,
        }}
      >
        {value && preview === 'image' ? (
          <div className="relative">
            <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover" style={{ border: '1px solid var(--hairline)' }} />
            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--surface-elevated)', border: '1px solid var(--hairline)', color: 'var(--text-secondary)' }}
              >
                <X size={11} />
              </button>
            )}
          </div>
        ) : busy ? (
          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--text-secondary)' }} />
        ) : (
          <UploadCloud size={20} style={{ color: 'var(--text-tertiary)' }} />
        )}
        <div className="text-center">
          <div className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            {busy ? 'Uploading…' : value ? 'Replace' : 'Drop here or click to upload'}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            up to {limit.maxMB}MB
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={limit.accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
