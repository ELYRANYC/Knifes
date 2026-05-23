'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ViewsChart({ data }: { data: { date: string; views: number }[] }) {
  return (
    <div className="dash-card p-5">
      <div className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
        Views — last 30 days
      </div>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f5f7" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#f5f5f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6e6e73', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={28}
            />
            <YAxis tick={{ fill: '#6e6e73', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} width={40} />
            <Tooltip
              cursor={{ stroke: 'rgba(255,255,255,0.14)' }}
              contentStyle={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                fontSize: 12,
                color: '#f5f5f7',
              }}
              labelStyle={{ color: '#a1a1a6' }}
            />
            <Area type="monotone" dataKey="views" stroke="#f5f5f7" strokeWidth={2} fill="url(#viewsFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
