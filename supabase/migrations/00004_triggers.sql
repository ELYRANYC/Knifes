-- knives.lol — Phase 2 triggers

-- Keep profiles.updated_at fresh on every row change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Helper used by the signup flow: case-insensitive availability check that
-- also rejects reserved names. SECURITY DEFINER so anon can call it without
-- needing read access to auth internals.
create or replace function public.username_available(candidate text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from public.reserved_usernames where username = lower(candidate)) then
    return false;
  end if;
  if exists (select 1 from public.profiles where lower(username) = lower(candidate)) then
    return false;
  end if;
  if exists (select 1 from public.aliases where lower(alias) = lower(candidate)) then
    return false;
  end if;
  return true;
end;
$$;

grant execute on function public.username_available(text) to anon, authenticated;
