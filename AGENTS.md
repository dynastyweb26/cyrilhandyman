# Agent instructions — Cyril Handyman & Door site

Read `docs/blueprint.md` before any work. Authoritative: sections 21-24 (merge decisions, final route list, brand tokens). Section 22 is the Phase 1 build prompt; work through it in order.

Rules
- Stack: Next.js App Router + TypeScript + Tailwind + Supabase + Vercel. No localhost testing: verify on Vercel preview deploys only.
- One commit per item. Do not start anything listed under "Do NOT build yet".
- Brand: black / charcoal / dark red accent / white. No gold, no gradients. Logo: `public/brand/logo-transparent.png`.
- Service-area business: never publish a street address; schema uses `areaServed`.
- No lorem ipsum. Unknown facts get `TODO_CONTENT` markers, never invented claims.
- `docs/research/*` is background only and non-authoritative; the blueprint wins on conflicts.

## Confirmed facts (override blueprint placeholders)
- Brand red is `#CC0000` (hover `#A30000`, small red text on dark `#E04848`). Supersedes any other red in the blueprint.
- Business: Cyril Handyman & Door LLC, legally registered LLC, 2+ years in business. Do NOT claim licensed or insured (not confirmed) — no "licensed & insured" badges or copy.
- Cyril and his team perform every job themselves (no subcontracting claims either way).
- Current site tone: "Working wholeheartedly for the Lord", "Faithfully serving Forney, Mesquite & Rockwall". Keep that voice, subtle.

## Reviews (required design space)
- Home page: reviews band (rating summary + 3-4 review cards, carousel not required) between services and CTA.
- Every service page: 2-3 relevant reviews inline.
- `/reviews` page: full list, filterable by service/city, links to Google profile.
- Data: Supabase `reviews` table (author_first_name, city, service, rating, body, source, review_url, published bool). RLS public-read published only. Real reviews only, never fabricated; emit Review/AggregateRating JSON-LD only for reviews actually displayed.
