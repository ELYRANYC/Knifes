'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ClaimInput({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

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
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${focused ? 'rgba(255,255,255,0.2)' : 'var(--hairline)'}`,
        transition: 'border-color 200ms ease',
      }}
    >
      <span
        className={`flex items-center pl-4 sm:pl-5 pr-1 font-mono ${
          compact ? 'text-[12px]' : 'text-[13px] sm:text-[14px]'
        }`}
        style={{ color: 'var(--text-tertiary)' }}
      >
        knives.lol/
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="your-name"
        autoComplete="off"
        spellCheck={false}
        className={`flex-1 min-w-0 bg-transparent outline-none ${
          compact ? 'text-[13px] py-2.5' : 'text-[14px] py-3 sm:py-3.5'
        }`}
        style={{ color: 'var(--text-primary)' }}
      />
      <button
        type="submit"
        className={`btn btn-primary inline-flex items-center gap-1.5 px-4 sm:px-5 rounded-none ${
          compact ? 'text-[12px]' : 'text-[13px] sm:text-[14px]'
        }`}
      >
        Claim Now
        <ArrowRight size={compact ? 12 : 14} />
      </button>
    </form>
  );
}
