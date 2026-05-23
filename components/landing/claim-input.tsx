'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ClaimInput({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24);
    router.push(slug ? `/signup?username=${encodeURIComponent(slug)}` : '/signup');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full max-w-md mx-auto items-stretch rounded-full overflow-hidden"
      style={{
        background: 'rgba(10, 0, 0, 0.7)',
        border: '1px solid rgba(255,0,51,0.28)',
        boxShadow: '0 0 0 0 rgba(255,0,51,0)',
        transition: 'box-shadow 250ms, border-color 250ms',
      }}
      onFocusCapture={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,0,51,0.6)';
        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,0,51,0.12), 0 0 24px rgba(255,0,51,0.3)';
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,0,51,0.28)';
        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,0,51,0)';
      }}
    >
      <span
        className={`flex items-center pl-4 sm:pl-5 pr-1 font-mono text-white/55 ${
          compact ? 'text-[12px]' : 'text-[13px] sm:text-[14px]'
        }`}
      >
        knives.lol/
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="your-name"
        autoComplete="off"
        spellCheck={false}
        className={`flex-1 min-w-0 bg-transparent text-white placeholder:text-white/30 outline-none ${
          compact ? 'text-[13px] py-2.5' : 'text-[14px] py-3 sm:py-3.5'
        }`}
      />
      <button
        type="submit"
        className={`inline-flex items-center gap-1.5 px-4 sm:px-5 font-medium transition-all hover:brightness-110 ${
          compact ? 'text-[12px]' : 'text-[13px] sm:text-[14px]'
        }`}
        style={{
          background: '#ff0033',
          color: '#fff',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 0 14px rgba(255,0,51,0.4)',
        }}
      >
        Claim Now
        <ArrowRight size={compact ? 12 : 14} />
      </button>
    </form>
  );
}
