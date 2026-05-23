-- knives.lol — Phase 2 Row Level Security policies

alter table public.profiles enable row level security;
alter table public.aliases enable row level security;
alter table public.profile_views enable row level security;
alter table public.link_clicks enable row level security;
alter table public.reserved_usernames enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create policy "profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "users insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "users update their own profile"
  on public.profiles for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "users delete their own profile"
  on public.profiles for delete
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- aliases — public read; mutations only by the owning profile's user
-- ---------------------------------------------------------------------------
create policy "aliases are publicly readable"
  on public.aliases for select
  using (true);

create policy "users insert aliases for their own profile"
  on public.aliases for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = aliases.profile_id and p.user_id = auth.uid()
    )
  );

create policy "users delete aliases for their own profile"
  on public.aliases for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = aliases.profile_id and p.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- profile_views — anyone can insert (anon tracking); owner can read
-- ---------------------------------------------------------------------------
create policy "anyone can record a view"
  on public.profile_views for insert
  to anon, authenticated
  with check (true);

create policy "owners read their own views"
  on public.profile_views for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = profile_views.profile_id and p.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- link_clicks — anyone can insert; owner can read
-- ---------------------------------------------------------------------------
create policy "anyone can record a click"
  on public.link_clicks for insert
  to anon, authenticated
  with check (true);

create policy "owners read their own clicks"
  on public.link_clicks for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = link_clicks.profile_id and p.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- reserved_usernames — public read only (admin-managed via service role)
-- ---------------------------------------------------------------------------
create policy "reserved usernames are publicly readable"
  on public.reserved_usernames for select
  using (true);
