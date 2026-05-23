import { createClient } from '@/lib/supabase/server';
import StatCard from '@/components/dashboard/stats/stat-card';
import ViewsChart from '@/components/dashboard/stats/views-chart';
import PlatformsChart from '@/components/dashboard/stats/platforms-chart';
import DevicesChart from '@/components/dashboard/stats/devices-chart';
import CountriesList from '@/components/dashboard/stats/countries-list';

export const dynamic = 'force-dynamic';

const DAY = 86_400_000;

export default async function OverviewPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user?.id ?? '')
    .maybeSingle();

  const profileId = profile?.id;

  const now = Date.now();
  const since60 = new Date(now - 60 * DAY).toISOString();
  const since30 = new Date(now - 30 * DAY).toISOString();

  const [{ data: views }, { data: clicks }] = await Promise.all([
    supabase
      .from('profile_views')
      .select('viewed_at, country, device_type')
      .eq('profile_id', profileId ?? '')
      .gte('viewed_at', since60),
    supabase
      .from('link_clicks')
      .select('platform, clicked_at')
      .eq('profile_id', profileId ?? '')
      .gte('clicked_at', since30),
  ]);

  const viewRows = views ?? [];
  const clickRows = clicks ?? [];

  const views30 = viewRows.filter((v) => v.viewed_at >= since30).length;
  const viewsPrev30 = viewRows.length - views30;
  const totalClicks = clickRows.length;
  const delta =
    viewsPrev30 > 0 ? Math.round(((views30 - viewsPrev30) / viewsPrev30) * 100) : null;
  const clickRate = views30 > 0 ? Math.round((totalClicks / views30) * 100) : 0;
  const dailyAvg = Math.round(views30 / 30);

  // 30-day daily series
  const buckets = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - i * DAY);
    buckets.set(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 0);
  }
  for (const v of viewRows) {
    if (v.viewed_at < since30) continue;
    const label = new Date(v.viewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (buckets.has(label)) buckets.set(label, (buckets.get(label) ?? 0) + 1);
  }
  const series = Array.from(buckets, ([date, v]) => ({ date, views: v }));

  // platforms
  const platformMap = new Map<string, number>();
  for (const c of clickRows) platformMap.set(c.platform, (platformMap.get(c.platform) ?? 0) + 1);
  const platforms = Array.from(platformMap, ([platform, c]) => ({ platform, clicks: c }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8);

  // countries
  const countryMap = new Map<string, number>();
  for (const v of viewRows.filter((x) => x.viewed_at >= since30)) {
    const c = v.country ?? '';
    countryMap.set(c, (countryMap.get(c) ?? 0) + 1);
  }
  const countries = Array.from(countryMap, ([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // devices
  const deviceMap = new Map<string, number>();
  for (const v of viewRows.filter((x) => x.viewed_at >= since30)) {
    const d = v.device_type ?? 'desktop';
    deviceMap.set(d, (deviceMap.get(d) ?? 0) + 1);
  }
  const devices = ['mobile', 'tablet', 'desktop']
    .map((name) => ({ name, value: deviceMap.get(name) ?? 0 }))
    .filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="section-overline mb-2">Overview</div>
        <h1 className="display-heading text-2xl">Analytics</h1>
        <p className="text-[14px] mt-1" style={{ color: 'var(--text-secondary)' }}>
          Last 30 days.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Views (30d)" value={views30.toLocaleString()} delta={delta} />
        <StatCard label="Daily average" value={dailyAvg.toLocaleString()} />
        <StatCard label="Link clicks" value={totalClicks.toLocaleString()} />
        <StatCard label="Click rate" value={`${clickRate}%`} />
      </div>

      <ViewsChart data={series} />

      <div className="grid lg:grid-cols-2 gap-3">
        <PlatformsChart data={platforms} />
        <DevicesChart data={devices} />
      </div>

      <CountriesList data={countries} />
    </div>
  );
}
