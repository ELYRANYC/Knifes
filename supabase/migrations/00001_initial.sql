-- knives.lol — Phase 2 initial schema
-- Run order: 00001 → 00002 → 00003 → 00004
-- Paste into Supabase SQL Editor (or apply via the Supabase MCP / CLI).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles — one row per user, mirrors the ProfileConfig type in lib/types.ts
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  description jsonb,                       -- string OR string[]
  location text,
  pronouns text,
  verified boolean default false,

  layout text default 'default',
  layout_settings jsonb,

  background jsonb,
  background_effect text,
  cursor_effect text,
  custom_cursor text,
  profile_effect text,

  colors jsonb,
  gradient jsonb,
  monochrome_icons boolean default false,

  font text default 'inter',
  username_effect text default 'none',
  animated_title boolean default false,

  typewriter_speed int default 80,
  typewriter_delete_speed int default 40,
  typewriter_pause int default 1500,

  links jsonb default '[]'::jsonb,
  link_alignment text default 'center',

  audio jsonb default '[]'::jsonb,
  audio_autoplay boolean default false,
  audio_volume int default 30,

  widgets jsonb default '[]'::jsonb,
  badges jsonb default '[]'::jsonb,

  box_opacity int default 50,
  box_blur int default 16,
  glow jsonb,
  swap_box_colors boolean default false,

  discord_id text,
  show_discord_presence boolean default false,
  use_discord_avatar boolean default false,

  meta jsonb,
  entry_screen jsonb,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists profiles_username_idx on public.profiles (lower(username));
create index if not exists profiles_user_id_idx on public.profiles (user_id);

-- ---------------------------------------------------------------------------
-- aliases — alternate usernames redirecting to a canonical profile
-- ---------------------------------------------------------------------------
create table if not exists public.aliases (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  alias text unique not null,
  created_at timestamptz default now()
);

create index if not exists aliases_alias_idx on public.aliases (lower(alias));
create index if not exists aliases_profile_id_idx on public.aliases (profile_id);

-- ---------------------------------------------------------------------------
-- profile_views — analytics (anonymous inserts allowed)
-- ---------------------------------------------------------------------------
create table if not exists public.profile_views (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  viewed_at timestamptz default now(),
  country text,
  device_type text,
  referrer text
);

create index if not exists profile_views_profile_id_idx on public.profile_views (profile_id);
create index if not exists profile_views_viewed_at_idx on public.profile_views (viewed_at);

-- ---------------------------------------------------------------------------
-- link_clicks — analytics (anonymous inserts allowed)
-- ---------------------------------------------------------------------------
create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  platform text not null,
  url text not null,
  clicked_at timestamptz default now()
);

create index if not exists link_clicks_profile_id_idx on public.link_clicks (profile_id);
create index if not exists link_clicks_clicked_at_idx on public.link_clicks (clicked_at);

-- ---------------------------------------------------------------------------
-- reserved_usernames — system routes that cannot be claimed
-- ---------------------------------------------------------------------------
create table if not exists public.reserved_usernames (
  username text primary key
);
