# Cyril Handyman & Door LLC — crazydoorhandyman.com

Next.js (App Router) + TypeScript + Tailwind v4. Supabase for portfolio data,
Vercel for hosting.

This replaces the previous Vite SPA in `dynastyweb26/trustworthy-handyman-site`.

## Commands

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Environment

Server-side only — set these in Vercel → Project → Settings → Environment Variables
(and in `.env.local` locally). They are deliberately not `NEXT_PUBLIC_`.

| Variable | Used by |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | quote form insert, reviews read |
| `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM` | lead notification email |

A lead counts as delivered when either path works. For launch, the Resend
email is the one that matters (it reaches Cyril); Supabase is an optional
backup log.

- `LEAD_NOTIFY_TO`: the inbox that gets quote requests.
- `LEAD_NOTIFY_FROM`: must be an address on a domain verified in Resend
  (e.g. `quotes@crazydoorhandyman.com`), or Resend rejects the send.

With no variables set the form returns a "please call" error instead of
pretending the lead was captured, and logs `[lead] Lead was not delivered`
to Vercel runtime logs.

## What exists

| Route | State |
| --- | --- |
| `/` | Built (hero, services, areas, CTA) |
| `/services` | Built (index; most services have no page yet) |
| `/services/christmas-light-installation` | Built — flagship page, permanent URL |
| `/service-areas` | Built — 8 city sections (anchor ids) |
| `/about` | Built |
| `/contact` | Built — form not implemented yet |
| `/blog` | Not built, hidden from nav, disallowed in robots |

## Where things live

- **Design tokens** — `src/styles/tokens.css` (colors, type scale, spacing). Brand
  red is an accent only: no gradients, no gold, no emoji icons.
- **Brand / NAP / cities / services / nav** — `src/data/site.ts`.
- **Legacy URLs → 301 map** — `src/data/redirects.ts`, consumed by `next.config.ts`.
- **Sitemap + robots data** — `src/data/seo.ts` (single file drives `app/sitemap.ts`
  and `app/robots.ts`, including image/video entries).
- **Business JSON-LD** — `src/lib/schema.ts`, rendered server-side in `app/layout.tsx`.
  `HomeAndConstructionBusiness` with `areaServed`; no street address by design.
- **Hero media** — `src/data/media.ts` (one value for the video URL).
- **Christmas page copy** — `src/data/christmas-lights.ts`.
- **Supabase schema** — `supabase/migrations/` (projects, project_media, leads, reviews).

## Assets to replace

- `public/brand/logo-transparent.png` — the real logo (black mark, white lettering),
  rendered directly on the dark chrome. Swap in the SVG and update
  `site.brand.logo.src` when the vector exists.
- `public/media/hero.mp4` + `public/media/hero-poster.webp` — footage of Cyril's own
  garage door job (confirmed). Keep the poster under ~100 KB if it is swapped.
- `public/gallery/christmas/*` — the flagship gallery expects six photos at the paths
  listed in `src/data/christmas-lights.ts`.
- `public/og-image.png` — 1200×630 social card.

## Seasonal: Christmas lights

The Christmas lights service page (`/services/christmas-light-installation`) is
seasonal. Cyril takes it off the site in January and puts it back for the next
season. When it comes off, remove it from `src/data/services.ts` and the home
services list (`src/data/home.ts`), and redirect the URL to `/services` in
`src/data/redirects.ts` so it doesn’t 404.

## Still open before launch

- Google Business Profile URL (the share link supplied couldn't be confirmed as
  the profile) and a Facebook page URL. Both stay hidden until real.
- Photo of Cyril for the About page (logo panel holds the spot).
- Christmas light job photos.
- FAQ answers not yet supplied: garage install time, blinds lead time, deposit
  policy. Those questions stay hidden until answered.
- Lead email env vars on Vercel (see Environment).

## Deploy / verification

- Vercel previews build from a branch push. `sitemap.xml` and `robots.txt` come from
  `app/sitemap.ts` / `app/robots.ts` — do not add static copies in `public/`.
- The old `vercel.json` catch-all rewrite is intentionally not carried over; real
  routes now exist and `next.config.ts` handles the 301s.
