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

With no variables set the form returns a "please call" error instead of
pretending the lead was captured, and the reviews band renders its
TODO_CONTENT state.

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
- `public/media/hero.mp4` + `public/media/hero-poster.webp` — placeholder garage-door
  still/clip. Replace with real footage and keep the poster under ~100 KB.
- `public/gallery/christmas/*` — the flagship gallery expects six photos at the paths
  listed in `src/data/christmas-lights.ts`.
- `public/og-image.png` — 1200×630 social card.

## TODO_CONTENT before launch

Rendered visibly on the site, not hidden lorem ipsum:

- Site + per-page meta descriptions (`app/*/page.tsx`).
- Footer NAP: hours, service radius, response-time promise.
- Christmas page: prices, booking cutoff dates, ownership model, maintenance promise,
  commercial scope, reviews (real quotes only), gallery photos, city intro copy.
- About: owner story, founding year, crew size.
- Contact: quote form build (EmailJS today → decide transport + spam protection).

## Deploy / verification

- Vercel previews build from a branch push. `sitemap.xml` and `robots.txt` come from
  `app/sitemap.ts` / `app/robots.ts` — do not add static copies in `public/`.
- The old `vercel.json` catch-all rewrite is intentionally not carried over; real
  routes now exist and `next.config.ts` handles the 301s.
