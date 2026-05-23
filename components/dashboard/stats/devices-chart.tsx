'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const SHADES = ['rgba(245,245,247,0.9)', 'rgba(245,245,247,0.55)', 'rgba(245,245,247,0.28)'];

export default function DevicesChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="dash-card p-5">
      <div className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Devices
      </div>
      {total === 0 ? (
        <p className="text-[13px] py-8 text-center" style={{ color: 'var(--text-tertiary)' }}>
          No data yet.
        </p>
      ) : (
        <div className="flex items-center gap-4">
          <div style={{ width: 130, height: 130 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={62} paddingAngle={2} stroke="none">
                  {data.map((_, i) => (
                    <Cell key={i} fill={SHADES[i % SHADES.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12, color: '#f5f5f7' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2">
            {data.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-[13px]">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: SHADES[i % SHADES.length] }} />
                <span style={{ color: 'var(--text-primary)' }} className="capitalize">{d.name}</span>
                <span style={{ color: 'var(--text-tertiary)' }}>{Math.round((d.value / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
