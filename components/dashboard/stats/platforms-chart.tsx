'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function PlatformsChart({ data }: { data: { platform: string; clicks: number }[] }) {
  return (
    <div className="dash-card p-5">
      <div className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Top clicked platforms
      </div>
      {data.length === 0 ? (
        <p className="text-[13px] py-8 text-center" style={{ color: 'var(--text-tertiary)' }}>
          No clicks yet.
        </p>
      ) : (
        <div style={{ width: '100%', height: Math.max(160, data.length * 38) }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#6e6e73', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="platform"
                tick={{ fill: '#a1a1a6', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={84}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12, color: '#f5f5f7' }}
              />
              <Bar dataKey="clicks" fill="rgba(245,245,247,0.85)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
