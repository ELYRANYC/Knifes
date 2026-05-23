-- knives.lol — Phase 2 reserved username seed

insert into public.reserved_usernames (username) values
  ('login'),
  ('signup'),
  ('logout'),
  ('dashboard'),
  ('api'),
  ('admin'),
  ('about'),
  ('pricing'),
  ('help'),
  ('support'),
  ('terms'),
  ('privacy'),
  ('forgot-password'),
  ('reset-password'),
  ('verify'),
  ('settings'),
  ('account'),
  ('leaderboard'),
  ('templates'),
  ('imagehost'),
  ('changelog'),
  ('discord')
on conflict (username) do nothing;
