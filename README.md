# knives.lol

**Phase 1 of 3** — a config-driven, neon, link-in-bio platform. Profiles are
TypeScript files, layouts are swappable in one line, and every effect is
real canvas rather than CSS theatre.

Phase 2 adds auth + a dashboard. Phase 3 adds image hosting + templates +
premium tiers.

---

## Stack

- **Next.js 15** (App Router, RSC where possible, edge route for Lanyard proxy)
- **TypeScript** in strict mode, zero `any`
- **Tailwind v3** + custom CSS for glow / glassmorphism / glitch
- **Framer Motion** for orchestration, springs, tab transitions
- **Vanilla Canvas API** for every background and cursor effect — no p5, no three
- **lucide-react** + **simple-icons** for brand icons
- **Lanyard** (api.lanyard.rest) for live Discord presence
- No database. No auth. Profiles compiled into the build.

---

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

Visit:

- `/` — landing + profile directory
- `/alex` — cyber / matrix
- `/luna` — pastel / dreamcore
- `/void` — gothic / dark red
- `/jordan` — minimalist

---

## Adding a profile

1. Copy `/profiles/_template.ts` → `/profiles/<username>.ts`.
2. Edit fields (every option is documented inline in the template).
3. Register it in `/profiles/index.ts`:

```ts
import { yourUsername } from './your-username';

export const profiles: Record<string, ProfileConfig> = {
  alex,
  luna,
  void: voidProfile,
  jordan,
  'your-username': yourUsername,
};
```

The profile is now served at `/your-username` with full SEO, OG embeds, and
per-profile theme color.

---

## Layouts

Switch in one line. The same config data renders four different cards:

| Layout        | Vibe                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| `default`     | Centered glass card — classic guns.lol look                                      |
| `modern`      | Two-tab card (profile / widgets) with smooth tab transitions                     |
| `simplistic`  | No card, just buttons. Clean, minimal, designer-coded                            |
| `sleek`       | Banner-forward, Twitter-style avatar overlap                                     |

---

## Effects

### Backgrounds (canvas, real 60fps)

`snow` · `rain` · `particles` · `matrix` · `stars` · `bubbles` · `fireflies`

All canvas effects:

- pause automatically when the tab is hidden
- resize on viewport change
- reduce particle counts on mobile
- respect `prefers-reduced-motion`

### Cursors

`trail` · `glow` · `sparkle` · `hearts` (emit on click)

### Username text

`gradient` · `glow` · `glitch` (animated RGB split) · `rainbow` (hue rotate)

### Profile box

`rgb-glow` (animated rainbow box-shadow) · `pulse` · `shake`

---

## Discord presence (Lanyard)

To enable live status / Spotify display:

1. Join [discord.gg/lanyard](https://discord.gg/lanyard) with your Discord
   account.
2. Set in your profile config:
   ```ts
   discordId: 'your-discord-id',
   showDiscordPresence: true,
   useDiscordAvatar: true, // optional, use your live Discord avatar
   ```

The hook polls `https://api.lanyard.rest/v1/users/<id>` every 15s.
An optional edge proxy lives at `/api/discord/[id]` if you want CDN
caching or to mask the upstream.

---

## Audio

Drop one or more tracks in `audio: []`. The player appears bottom-left with:

- compact mode (album + title + play/pause + progress)
- expanded mode (full art + prev/next/seek)
- marquee on long titles
- localStorage volume + mute persistence
- automatic next-track / loop
- crossfade between tracks if multiple

Browsers block autoplay until first user interaction — that's why every
audio-enabled profile has an entry screen. On click, the screen fades, the
session is marked, and audio begins.

Use URLs from Internet Archive, Pixabay, Free Music Archive, or self-hosted
storage with CORS enabled. **Do not paste copyrighted audio URLs.**

---

## Project structure

```
/app
  page.tsx                 — landing + directory
  layout.tsx               — fonts + global metadata
  globals.css              — CSS vars, glass, glow, keyframes
  /[username]
    page.tsx               — dynamic profile route (RSC + metadata)
    not-found.tsx
  /api/discord/[id]
    route.ts               — Lanyard edge proxy

/profiles
  _template.ts             — heavily commented schema reference
  alex.ts · luna.ts · void.ts · jordan.ts
  index.ts                 — registry

/components
  profile-renderer.tsx     — composes layout + effects + audio + entry
  entry-screen.tsx
  /profile
    avatar.tsx · badges.tsx · description.tsx
    links-grid.tsx · view-counter.tsx
    default-layout.tsx · modern-layout.tsx
    simplistic-layout.tsx · sleek-layout.tsx
  /effects
    /background/{snow,rain,particles,matrix,stars,bubbles,fireflies}.tsx
    /cursor/cursor-effect.tsx        — trail / glow / sparkle / hearts
    /text/text-effect.tsx            — username effect renderer
  /widgets
    discord-presence.tsx · discord-server.tsx
    spotify.tsx · youtube.tsx · github.tsx
  /audio
    audio-player.tsx · volume-control.tsx

/lib
  types.ts                 — ProfileConfig + 30+ link platforms
  utils.ts                 — cn, hexToRgb, formatDuration, etc.
  effects-registry.ts      — dynamic-imported effect components
  use-discord-presence.ts  — Lanyard hook
  use-view-counter.ts      — localStorage view tracking
```

---

## Accessibility / polish

- `prefers-reduced-motion` short-circuits all canvas animations and
  Framer transitions.
- Keyboard navigation with visible accent-colored focus rings.
- Tab navigation (modern layout) is keyboard-driven.
- Skeleton loaders for Discord, GitHub, audio art.
- Strict TypeScript, `noUncheckedIndexedAccess`, `strictNullChecks`.

---

## Phase 2 — Auth + Dashboard (Supabase)

Profiles now live in Supabase Postgres. Auth (email + Discord/Google OAuth)
and a full customization dashboard are live. Config files in `/profiles`
remain only as a seed/import source.

### 1. Environment variables

Set these in Vercel (production) and `.env.local` (local dev). See
`.env.example`:

| Var | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server | Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Account deletion, import, email-verify |
| `NEXT_PUBLIC_SITE_URL` | both | e.g. `https://knives.lol` |

### 2. Run the SQL migrations

Open the Supabase **SQL Editor** and paste each file in order:

```
supabase/migrations/00001_initial.sql        — tables + indexes
supabase/migrations/00002_rls.sql            — row-level security
supabase/migrations/00003_reserved_usernames.sql — reserved-name seed
supabase/migrations/00004_triggers.sql       — updated_at + username_available()
supabase/migrations/00005_analytics.sql      — public view-count function
```

(Or apply them via the Supabase MCP server / `supabase db push` with the CLI.)

### 3. Create Storage buckets

In **Storage → New bucket**, create six **public** buckets. Add a policy on
each allowing authenticated users to insert/update/delete only within their
own `{userId}/…` folder (uploads use that path prefix):

| Bucket | Max size | Types |
| --- | --- | --- |
| `avatars` | 5 MB | image |
| `backgrounds` | 15 MB | image / video |
| `audio` | 10 MB | audio |
| `cursors` | 1 MB | image |
| `banners` | 10 MB | image |
| `embeds` | 5 MB | image |

Example per-bucket policy (repeat per bucket, swapping the name):

```sql
create policy "own folder write" on storage.objects
  for all to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
```

### 4. Configure Auth

- **Authentication → URL Configuration:** set Site URL to `NEXT_PUBLIC_SITE_URL`
  and add redirect URLs:
  `${SITE_URL}/api/auth/callback`, `${SITE_URL}/reset-password`.
- **Email provider:** enable email confirmations (signup sends a verification
  link to `/api/auth/callback`, which creates the profile row).
- **OAuth (Discord + Google):** enable each provider, paste client ID/secret,
  and set the provider callback to
  `https://<project-ref>.supabase.co/auth/v1/callback`.

### 5. Migrate the Phase 1 profiles

```bash
npm run import-profiles
```

Creates a verified auth user (random password, printed to console) per file in
`/profiles` and inserts the matching row. Save the printed passwords.

### 6. Local dev

```bash
cp .env.example .env.local   # fill in real values
npm install
npm run dev
```

### How it fits together

- `lib/supabase/{client,server,middleware,admin}.ts` — SSR-ready clients via
  `@supabase/ssr`. `middleware.ts` refreshes sessions and guards `/dashboard/*`.
- `lib/profile-mapper.ts` — converts a DB row ↔ `ProfileConfig` (and back),
  including the 0–100 ↔ 0–1 opacity/volume conversion.
- `app/[username]/page.tsx` — resolves username → profile, falls back to
  `aliases` (canonical redirect), maps the row, and renders the **unchanged**
  Phase 1 layouts. `?preview=1` renders a tracking-free version for the
  dashboard preview iframe.
- `app/dashboard/*` — the studio. A shared `ProfileEditorProvider` holds the
  edited config and autosaves (1s debounce) to Supabase; the live preview is an
  iframe that reloads on each save.
- Security is **RLS**; the service role is used only for account deletion, the
  import script, and verifying emails.

## Phase 3 preview

- Image / banner host with per-user quotas
- Profile templates marketplace
- Premium animated avatars / custom domains
