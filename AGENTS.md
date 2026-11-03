# Agent instructions — Cyril Handyman & Door site

Read `docs/blueprint.md` before any work. Authoritative: sections 21-24 (merge decisions, final route list, brand tokens). Section 22 is the Phase 1 build prompt; work through it in order.

Rules
- Stack: Next.js App Router + TypeScript + Tailwind + Supabase + Vercel. No localhost testing: verify on Vercel preview deploys only.
- One commit per item. Do not start anything listed under "Do NOT build yet".
- Brand: black / charcoal / dark red accent / white. No gold, no gradients. Logo: `public/brand/logo-transparent.png`.
- Service-area business: never publish a street address; schema uses `areaServed`.
- No lorem ipsum. Unknown facts get `TODO_CONTENT` markers, never invented claims.
- `docs/research/*` is background only and non-authoritative; the blueprint wins on conflicts.
