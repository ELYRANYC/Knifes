'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { hexToRgb } from '@/lib/utils';

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
};

export default function GithubWidget({
  username,
  accentColor,
}: {
  username: string;
  accentColor: string;
}) {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const rgb = hexToRgb(accentColor);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j: GitHubUser | null) => {
        if (!cancelled) {
          setData(j);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      className="glass p-4 flex items-center gap-3 group"
      style={{ borderColor: `rgba(${rgb}, 0.18)` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        {loading ? (
          <div className="skeleton w-12 h-12" />
        ) : data?.avatar_url ? (
          <img src={data.avatar_url} alt={username} className="w-12 h-12 object-cover" />
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text)' }}>
            <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1 .8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .3" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: accentColor }}>
          github
        </div>
        <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text)' }}>
          @{username}
        </div>
        {data && (
          <div className="flex items-center gap-3 mt-0.5 text-[10px]" style={{ color: 'rgba(240,240,245,0.55)' }}>
            <span className="flex items-center gap-1">
              <Star size={9} /> {data.followers}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={9} /> {data.public_repos}
            </span>
          </div>
        )}
      </div>
      <ExternalLink
        size={14}
        className="opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text)' }}
      />
    </motion.a>
  );
}
