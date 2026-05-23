-- knives.lol — Phase 2 analytics helpers
-- profile_views.SELECT is owner-only under RLS, so the public profile page
-- can't read raw counts. This SECURITY DEFINER function exposes only an
-- aggregate count, callable by anonymous visitors.

create or replace function public.profile_view_count(p_profile_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.profile_views where profile_id = p_profile_id;
$$;

grant execute on function public.profile_view_count(uuid) to anon, authenticated;
