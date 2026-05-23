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

## Phase 2 preview

- Email / Discord OAuth
- `/dashboard` to edit profiles in-browser
- Persistence (Supabase or similar)
- Slug claim flow + reserved usernames

## Phase 3 preview

- Image / banner host with per-user quotas
- Profile templates marketplace
- Premium animated avatars / custom domains
