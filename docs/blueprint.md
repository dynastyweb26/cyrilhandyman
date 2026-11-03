# Cyril Handyman & Door — Website Rebuild Blueprint

Prepared Nov 3, 2026 for Dynasty Web · Stack: Next.js App Router + Supabase + Vercel

## 1. The one-paragraph strategy

A local-service site wins in two places: the Google Maps pack and the organic results under it. Per the 2026 Whitespark survey of 47 local SEO experts (estimates, not official Google weights), the Maps pack is driven roughly 32% by Google Business Profile (GBP), 20% reviews, 15% on-page/website, 9% behavioral, 8% links, 6% citations. Local *organic* flips: on-page is about 33% and links about 24%. So the website is the main lever for organic and a supporting lever for Maps. The rebuild has to nail both: a crawlable, fast, well-structured site AND a GBP + review engine that feeds it. A pretty site alone will not move rankings.

## 2. Pushback before we build (scope control)

1. **Do not build 8 cities × 6 services = 48 pages.** Google treats near-identical city-swap pages as doorway pages, and a pile of them can drag the whole domain. Three strong, unique city pages beat 20 clones. Launch with the city pages Cyril can back with real jobs, real photos and real reviews (likely 3–4), list the rest on the Service Areas hub, and add a city page only when there is real local content for it.
2. **Service pages first, city pages second.** The service pages carry the keywords. City pages are proof-of-presence pages.
3. **Video hero is a performance risk, not just a design choice.** Handled in section 8. If it fails Core Web Vitals on mobile we serve the poster image on phones.
4. **FAQ schema will not give rich results anymore** (Google deprecated them, fully in May 2026 per secondary sources). Still build the FAQ section: it helps users and AI answer engines. Just do not sell it to Cyril as a ranking boost.
5. **Blog is Phase 3.** Do not start posting until service pages, GBP and reviews are live. Mid-build ideas go on a parking-lot list, not into this sprint.

## 3. Site architecture

| URL | Purpose | Notes |
| --- | --- | --- |
| `/` | Home | Video hero, call/quote CTA, services grid, areas, reviews, FAQ teaser |
| `/services/garage-door-repair` | Hub for garage door repair | Links to the three sub-pages below |
| `/services/garage-door-spring-replacement` | Spring pages | Safety angle, signs of a broken spring, what it costs |
| `/services/garage-door-opener-repair-installation` | Opener work | Remote programming, motor replacement |
| `/services/garage-door-installation` | New doors | Highest-ticket page, gallery-heavy |
| `/services/window-blinds-shades` | Blinds/shades | Uses the launch-campaign assets |
| `/services/handyman-services` | General handyman | Lists specific jobs |
| `/services/general-contracting` | GC work | Only if Cyril wants to rank for it now |
| `/areas` | Service Areas hub | Map + all 8 cities listed |
| `/areas/[city]` | City pages | Start with 3–4; unique content each |
| `/about` | About us | Cyril, license/insurance, story |
| `/how-we-work` | Process | 4–5 steps, response times, payment |
| `/gallery` | Project gallery | Tagged by service + city |
| `/reviews` | Reviews | Real reviews, grouped by area |
| `/faq` | FAQ | Plus short FAQs on each service page |
| `/blog`, `/blog/[slug]` | Blog | Phase 3 |
| `/contact` | Contact + quote form | Click-to-call, form, service area map |

Menu: Services (dropdown) · Areas (dropdown with each city) · Gallery · Reviews · How We Work · About · Blog · Call button always visible. Footer: NAP, areas list, Facebook, Instagram, sitemap link.

## 4. Keyword map (research starting points, validate in Search Console after launch)

Pattern per page: **service + city intent in the title/H1, problem-language in the body**. Sources show garage door searches split into panic searches (problem terms) and planner searches (new door research).

- **Garage door repair hub:** garage door repair, garage door repair near me, emergency garage door repair, garage door repair service
- **Spring:** garage door spring repair, broken garage door spring, garage door spring replacement cost, torsion vs extension spring
- **Opener:** garage door opener repair, garage door opener not working, opener installation, how to program a garage door remote
- **Off-track / cable (fold into hub or own page later):** garage door off track, garage door cable repair
- **Installation:** garage door installation, new garage door installation, garage door replacement cost
- **Blinds/shades:** window blinds installation, custom window shades, blinds repair (confirm terms with Cyril; memory note: say "cord"/"string", not "beaded chain")
- **Handyman:** handyman near me, local handyman services, home repair services in \[city\]

Handyman head terms are huge and brutally competitive nationally (e.g. "handyman near me" in the tens of thousands of monthly searches). Cyril will win on city + service + proof, not head terms.

## 5. On-page template (every service page)

1. Unique title tag and meta description (service first, then area, then brand; keep title around 60 characters)
2. One H1 with service + primary area
3. Click-to-call and quote button above the fold, trust line adjacent (licensed/insured, same-day if true)
4. 600+ words of real content: what the problem looks like, what Cyril does, process, what affects price, safety notes
5. Real project photos with descriptive alt text and file names
6. 3–5 service-specific FAQs (visible on page)
7. Reviews that mention this service by name
8. Internal links: parent hub, sibling services, 2–3 relevant city pages
9. Service/area-specific schema (section 7)

City page extras: real jobs done there, photos from there, reviews from customers there, local context (neighborhoods, housing age, weather/HOA angles) that Cyril actually knows, links to every service. Not a template with the city name swapped.

## 6. Technical SEO in Next.js App Router

1. Server-render everything that matters. Verify with `curl -i <url>` that content, title and canonical are in the raw HTML.
2. Static metadata export or `generateMetadata` per route, a title template in the root layout, `alternates.canonical` on every page.
3. `app/sitemap.ts` and `app/robots.ts` generated from the same data array as the pages (services, cities, posts). Include only indexable URLs, with canonicals matching sitemap URLs and internal links.
4. `generateStaticParams` for city and blog routes. Pick one URL form (trailing slash or not) and keep sitemap, schema and links consistent.
5. JSON-LD as a native script tag in a server component, with `<` escaped.
6. `next/image` everywhere, `fetchpriority="high"` on the LCP element only. Never lazy-load above-the-fold media.
7. Fonts with `font-display: swap`; self-host via `next/font`.
8. Mobile-first: Google indexes the mobile version. Sticky call bar on mobile.
9. Core Web Vitals targets: LCP ≤ 2.5s, check INP and CLS too. Test on the Vercel preview with PageSpeed Insights.
10. Old URLs: map every old crazydoorhandyman.com URL to its new equivalent with 301 redirects. Do this before launch.
11. Search Console + Bing Webmaster verified, sitemap submitted at launch.

## 7. Structured data (schema)

- Homepage: one `HomeAndConstructionBusiness` (or a more specific subtype such as `GeneralContractor` if it fits) with name, phone, URL, logo, `areaServed` (the cities), hours, `sameAs` (GBP, Facebook, Instagram), and `hasOfferCatalog` for services. One LocalBusiness per page, no conflicting duplicates.
- NAP in schema must match the footer, GBP and every citation exactly.
- Service pages: `Service` with `provider` pointing at the business entity and `areaServed`.
- City pages: `areaServed` for that city.
- `BreadcrumbList` on inner pages; `Article`/`BlogPosting` on posts.
- `FAQPage`: keep for AI retrieval only; no rich result expected.
- Reviews: only mark up reviews that are genuinely displayed and genuine. Google mostly reads ratings from GBP anyway.
- Validate in Schema.org Validator and Search Console.

## 8. Video hero spec (the part most likely to hurt SEO if done lazily)

- Native `<video autoplay muted playsinline loop preload="metadata" poster="..." aria-hidden="true">`. Not a CSS background (the browser cannot discover it early).
- LCP measures the **poster image**, not playback, so the poster is the thing to optimize: WebP/AVIF, preloaded, `fetchpriority="high"`, sized for the viewport.
- Provide MP4 (H.264) and WebM sources; keep the loop short and compressed (my guidance: aim for a few MB at most for desktop; confirm with PageSpeed).
- Mobile: serve the poster only (or a much smaller clip) and skip the video fetch. Respect `prefers-reduced-motion`.
- Overlay text must pass contrast on top of the video; use a dark scrim.
- Put the real H1, phone number and CTA in HTML text over the video, never baked into the video.
- Host the video file on Supabase Storage or Vercel Blob, not in the repo.
- Make the video slot a single swappable config value so Cyril can change clips without code.

## 9. Making it NOT look vibecoded

The tells are generic. Remove them on purpose.

1. **Real assets over decoration.** Cyril's actual videos, job photos, van, logo. Zero stock photos of smiling models. No emoji icons, no generic gradient blobs, no purple-to-blue gradients.
2. **A real palette from his logo** and one distinct typeface pairing (headline with character, plain body face). Avoid default Inter-on-white-with-rounded-cards everywhere.
3. **Specific copy.** Real numbers, real cities, real job details, real turnaround times. No "Elevate your home experience" language. Write it in Cyril's voice.
4. **Layout with a point of view.** Mix full-bleed photo sections, a visible process strip, an honest pricing/what-affects-cost block. Avoid the identical three-card icon grid repeated down the page.
5. **Proof density.** Review counts, photo of the job next to the review, license/insurance info visible.
6. **Phone-first details.** Sticky tap-to-call, large tap targets, quote form with 3–4 fields max.
7. Run the `frontend-design` / `design-taste-frontend` skills during the build, and do a final pass deleting anything that looks like a template default.

## 10. Off-site: what actually moves Maps and links

The site alone will not do it. This is the other half of the job.

**GBP (highest leverage)**

1. Service-area business: hide the address if customers never visit, list real service areas (up to 20 regions; no states/countries).
2. Primary category matches the main revenue service; add accurate secondary categories only. Primary category is the top-ranked single factor in the survey. Decide with Cyril which is primary (garage door vs handyman).
3. Fill services with descriptions, upload real job photos weekly, post regularly (Notion GBP Post Library already exists).
4. Website link goes to the right landing page; keep GBP and site wording aligned.

**Reviews**

1. Ask every happy customer, same day, by text with a direct link. Respond to every review. Reviews that name the service and city help.
2. Never fake or gate reviews.

**Citations and links (keep it small and real)**

1. Foundations: Bing Places, Apple Maps, Facebook, Instagram, Yelp, BBB, Nextdoor business page, Angi/Thumbtack/Houzz if he wants leads from them. Keep NAP identical.
2. Local chambers of commerce (Forney, Rockwall, Mesquite, others he serves) with a member directory link.
3. Suppliers and manufacturers: ask the blinds supplier and door/opener suppliers for a dealer, installer or customer page with a link. Only if the relationship is real.
4. Sponsorships (a youth team, a school, a local event) that list sponsors with a link.
5. Avoid: paid link farms, Fiverr backlinks, random directories.

## 11. Blog plan (Phase 3)

Two posts a month is plenty if each answers a real homeowner question and links to a service page.

- Garage: why won't my garage door close, signs of a broken spring, spring replacement cost, opener won't respond, noisy garage door fixes, garage door safety tips
- Blinds: cord vs cordless, how to measure windows, blinds for Texas heat
- Handyman/GC: how much does a handyman charge, repair vs replace guides
- Local: seasonal checklists for North Texas homes
- Pricing-transparency posts (what a spring replacement should really cost) beat generic fluff.

## 12. Build sequence (one commit per discrete item, batch fixes, test on Vercel preview)

1. **Phase 0 — Inputs from Cyril** (see section 13) and content audit of the old site, including a list of every old URL.
2. **Phase 1 — Foundation:** Next.js scaffold, design tokens, layout/nav/footer, SEO plumbing (metadata, sitemap, robots, JSON-LD component), redirect map, video hero with poster fallback.
3. **Phase 2 — Pages:** home, 4–6 service pages, about, how we work, contact, areas hub + 3–4 city pages, gallery, reviews, FAQ.
4. **Phase 3 — Launch checklist:** schema validation, PageSpeed on mobile, redirects tested, Search Console + Bing submitted, GBP website link updated, citations cleaned.
5. **Phase 4 — Growth:** blog, more city pages as real content appears, review engine, link outreach, monthly ranking check.

Parking lot (do NOT add mid-build): booking system, customer portal, pricing calculator, Spanish version, chat widget.

## 13. Needed from Cyril

1. Exact business name, phone, email, hours, license/insurance details, year started (this becomes the NAP everywhere)
2. His home-base city (matters for GBP and which city pages go first)
3. Which service is the money service, to set the GBP primary category
4. All videos and the best 30+ job photos, tagged by service and city
5. Which cities he has actually worked in, with a real job story for each
6. Real reviews to feature, and permission to display names
7. Supplier and chamber relationships
8. Facebook and Instagram URLs
9. Domain and DNS access, GBP manager access, Search Console access
10. Payment terms to state on the site (memory says he takes Zelle only; confirm before publishing)

## 14. Ready-to-paste agent prompt (Phase 1)

> Audit first, then edit. Scaffold the Cyril Handyman & Door site as a new Next.js App Router project (TypeScript, Tailwind). Phase 1 only: layout, nav with Services and Areas dropdowns, footer with NAP, SEO plumbing (title template, per-route metadata, canonical, `app/sitemap.ts` and `app/robots.ts` driven by one data file of services and cities, a server-rendered JSON-LD component for `HomeAndConstructionBusiness`), a hero using a native `<video muted autoplay loop playsinline preload="metadata">` with a preloaded WebP poster, `fetchpriority="high"`, poster-only on mobile and under reduced motion, and the video URL in a single config value. No placeholder lorem ipsum: use clearly marked `TODO_CONTENT` strings. One commit per discrete item. Do not build city pages, blog or gallery yet. Report what you built and anything you would flag.

## 15. Nov 3 revision: flagship service pages, gallery, new order

This section supersedes the service rows in section 3. One designated flagship page per service, one gallery, and the Christmas lights page ships first because the season is already underway.

| URL | Page | Primary intent |
| --- | --- | --- |
| `/services/garage-doors` | Garage door repair, springs, openers, installation | Repair near me + new door research |
| `/services/faux-wood-blinds` | Faux wood blinds (custom, cordless, motorized) | Blind installation in North Texas |
| `/services/patio-screens` | Motorized/retractable patio screens | Shade, insect and privacy screens |
| `/services/media-accent-walls` | Media walls, TV accent walls, feature walls | Wall builds with hidden wiring |
| `/services/outdoor-christmas-lights` | Outdoor Christmas light installation | Seasonal, high urgency |
| `/gallery` + `/gallery/[project]` | Portfolio hub and project pages | Proof, image/video search |

Still on the plan: home, areas hub + 3–4 city pages, about, how we work, reviews, FAQ, contact, blog (Phase 3). Parked until Cyril confirms: the general handyman / GC page, since it is not on the new list.

**Pushback and decisions**

1. **Ship the Christmas lights page this week, ahead of the rebuild.** Sources on this niche say search interest climbs from September, accelerates through October and peaks later, and that pages published in the fall age into authority for next year. We are late for organic this year, so pair the page with Google Business Profile posts, Facebook and Instagram, and treat it as a head start on 2027. Put it on the current site or a standalone Vercel page now; fold it into the new site later with a 301 if the URL changes. Never delete it after the season.
2. **One big page per service is fine to start.** The garage door page will want sub-pages (spring, opener, installation, off-track) once it earns traffic. Plan the sections with anchors now so the split is a copy job later.
3. **Five long pages + gallery is already a big build.** Sequence: Christmas lights → garage doors → foundation/home/contact → blinds → patio screens → media walls → gallery depth → city pages → blog. Anything new goes on the parking lot.
4. **"Window blinds" became "faux wood blinds".** Confirm whether shades and shutters stay out, since competitor pages usually cover them together.

**Added to the Cyril checklist (section 13)**

1. Brand and model of the patio screens, plus the real spec sheet (no wind or heat claims we cannot back up)
2. Accent wall materials he actually builds (slat, shiplap, panels, stone) and typical timelines
3. Christmas lights: packages, pricing logic, booking cutoff, takedown and storage policy
4. A real project list: which service, which city, which month, with media for each
5. Written OK to show customer homes (no street addresses published)

## 16. Text-heavy pages, city names and addresses

Long pages with city names are the right instinct, but the source consensus is that a page full of the same copy with the city swapped is a doorway page, and thin duplicate pages can weigh down the whole domain. The fix is unique substance, not fewer words.

**City names**

1. Put the primary area in the H1 and title (service + North Texas/Dallas-Fort Worth, or the city the page is built for). Do not paste a comma list of all 8 cities into every footer and paragraph.
2. Add one "Where we install" section per flagship page with a short, specific paragraph for each city Cyril has real jobs in: housing styles, typical problems, a recent job there, a photo from there. Cities without real content get a mention on the Areas hub only.
3. Change more than the city name between pages: different photos, different FAQs, different reviews, different job stories. If two pages could be swapped by find-and-replace, merge them.
4. Link each flagship page to the city pages that have real content for it, and back.

**Addresses**

1. Cyril is a service-area business. Google's rule is to hide the address on Google Business Profile if customers never visit, and list real service areas instead (up to 20 regions, not states or countries). Do not publish a home address on the site just to add "location text".
2. Keep business name, phone and service areas identical across the site, Google Business Profile and citations.
3. Check Google's current LocalBusiness structured data docs before building schema: rich-result eligibility may expect an address, which conflicts with a hidden one. Use `areaServed` and skip the street address rather than expose a home.
4. Never publish customer street addresses in the gallery. Neighborhood or city level only, with permission.

**Length and structure of each flagship page**

My guidance, not a Google rule: 1,200–2,000 real words per flagship page. Order: H1 + hero media → quick answer and CTA → types/options → how it works → what affects price → materials and brands → gallery strip for that service → Where we install (cities) → FAQs → reviews → final CTA. Use a table of contents with anchor links on the longest pages.

## 17. Per-page notes

| Page | Keyword themes (validate in Search Console) | What makes the page worth ranking | Watch out |
| --- | --- | --- | --- |
| Garage doors | garage door repair, spring replacement, opener repair/installation, off track/cable, new garage door installation, emergency/same-day | Problem-language sections (door won't open, spring snapped), safety note on springs, cost factors, installation gallery | Brand-name pages (LiftMaster, Chamberlain, etc.) only if Cyril is actually authorized |
| Faux wood blinds | faux wood blinds installation, custom faux wood blinds, cordless, motorized, faux vs real wood, how to measure | Slat sizes and colors, room-by-room picks, measuring guide, real installs; competitors bundle shutters and shades | Say "cord"/"string" per supplier correction; do not copy supplier copy |
| Patio screens | motorized retractable patio screens, patio screens Dallas, bug/sun/privacy screens, patio enclosure | Shade, glare, insects and privacy in North Texas; covered patio, pool and pergola use cases; real install video | Competitors quote wind ratings; only claim specs from the product Cyril actually installs. Ignore unsourced stats like "90% heat reduction" |
| Media / accent walls | media wall, TV accent wall, feature wall, wood slat accent wall, electric fireplace surround, hidden cable management | Materials, lighting, concealed wiring, process steps, before/after, timelines from Cyril's real jobs | Electrical and mounting claims must match what is legally and safely done on each job |
| Outdoor Christmas lights | Christmas light installation, holiday lighting, Christmas lights near me, cost, takedown and storage | Packages, pricing logic, booking cutoff, night-time photos and video, early-booking offer | Seasonal: update yearly, keep the URL live, do not delete after December |

**Page-level reminders**

1. Each page gets its own title, meta description, H1, FAQs, reviews and media. No shared boilerplate blocks beyond the footer and CTA.
2. Videos are embedded with a description and nearby text, with a click-to-play poster below the hero (one autoplaying video per page, the hero).
3. Price: show what affects price and typical ranges only if Cyril is willing to stand behind them. Pricing-transparency pages help conversion.

## 18. Gallery spec

The gallery is both the conversion engine and an SEO asset. Sources recommend a dedicated page per major project instead of one big photo grid, with descriptive file names, alt text and scope details.

**Structure**

1. `/gallery`: filterable by service and city, tiles show a cover image or video thumbnail, title, service and city (no street address).
2. `/gallery/[project-slug]`: scope of work, materials, city or neighborhood, rough timeline, before/after, 6–12 images, optional video, link to the matching service page, and a review if one exists.
3. Each service page shows a gallery strip filtered to that service. The homepage shows featured projects.
4. Data lives in Supabase: a `projects` table (title, slug, service, city, summary, scope, materials, published, featured) and a `project_media` table (project id, type, storage path, alt text, caption, sort order). Cyril or Brandon adds projects without code.

**Image and video SEO**

1. Rename files before upload (`faux-wood-blinds-living-room-forney.jpg`, not `IMG_4823.jpg`). Write alt text that describes what is in the photo and the context, specific but not stuffed.
2. Filters and "load more" must resolve to real, crawlable URLs (pagination links or per-project pages); content that exists only after a JS click can be missed.
3. Add images (and videos) to the sitemap; Next.js supports media entries in `sitemap.ts` (verify in the current Next.js docs).
4. Videos get a poster, a title, a short description and surrounding text; consider `VideoObject` schema (my suggestion, validate it).

**Performance**

1. `next/image` with AVIF/WebP, correct `sizes`, lazy-load everything below the fold, blur placeholders.
2. Video tiles are click-to-play with a poster. Never autoplay more than the hero.
3. Store originals in Supabase Storage and serve resized variants; cap gallery pages at a sensible count per page.
4. Lightbox must be keyboard-accessible and not block the page's text content.

**Privacy**

Get permission to show customer homes. Strip location metadata (EXIF GPS) from every photo before publishing.

## 19. High-end design research

The patterns below come from 2026 roundups of contractor, remodeler and home-builder sites and from web design trend guides. These are mostly agency listicles, so treat them as pattern evidence, not gospel: the ChatGPT/Gemini prompt below asks for named sites to open and judge yourself.

**What the best contractor and remodeler sites do**

1. Lead with the work: full-bleed photography or looping video, then a filterable portfolio with scope and location on each card (one source says portfolio-led homepages convert best for general contractors).
2. Minimal navigation: a handful of core pages (about, portfolio, services, contact) instead of a dozen links.
3. One statement image or clip plus short text beats a crowded homepage on premium sites; dense block layouts work for diverse services.
4. Before/after galleries, a visible process timeline, an FAQ, and a clear quote CTA on every page.
5. Sticky tap-to-call on mobile; emergency-style bars suit repair trades.

**Trends: adopt, test, skip (for a Next.js site that has to pass Core Web Vitals)**

| Trend | Call | Why |
| --- | --- | --- |
| Oversized headline typography | Adopt | Cheap, premium, no performance cost |
| Bento-style grids with varied card sizes | Adopt | Fits service overview and gallery; keep whitespace and scan order |
| Full-bleed real photo and video | Adopt | We have the content; poster-first for LCP |
| Process timeline / problem → proof → payoff sections | Adopt | Modular storytelling that also reads well for SEO |
| Subtle scroll reveals (CSS first) | Test | Add polish; guard with `prefers-reduced-motion`, watch INP |
| One scroll-driven story section on the garage page | Test | Strong for "how a spring replacement works"; JS-heavy scrollytelling can hurt INP and LCP |
| Dark mode feel for the hero or Christmas lights page | Test | Natural for night-time light photography; check contrast |
| Kinetic typography | Skip | Readability and layout-shift risk |
| Glassmorphism, WebGL/3D, JS parallax | Skip | Cost more than they give on a trades site |
| Auto-personalized homepages | Skip | Not worth the complexity |

**Layout recipes**

Homepage: 1) video hero with H1, phone, quote button → 2) trust strip (licensed/insured, review count, years) → 3) five service tiles in a bento grid with a still image each (short clip on hover, desktop only) → 4) featured projects with a service/city filter → 5) how we work → 6) reviews grouped by area → 7) service area map and city list → 8) FAQ teaser → 9) closing CTA with form.

Flagship service page: split hero (media left, H1 + quote form right) or full-bleed clip → quick answer → options in a bento or comparison table → process timeline → gallery strip → Where we install → FAQs → reviews → CTA. Christmas lights: dark theme, night-time hero clip, package cards, booking-cutoff banner.

Gallery: masonry or bento grid, service and city filter chips, hover preview for video, lightbox, each tile links to its project page.

Sources: [Colorlib construction examples](https://colorlib.com/wp/construction-company-website-examples/), [Contractor Gorilla remodeling roundup](https://contractorgorilla.com/blog/best-remodeling-websites/), [Demand Convert home builder designs](https://demandconvert.com/learn/blog/27-best-home-builder-website-designs-in-2026/), [PXLPeak contractor layouts](https://pxlpeak.com/blog/web-design/best-contractor-website-designs-2026), [Netguru design trends](https://www.netguru.com/blog/top-web-design-trends), [TheeDigital 2026 trends](https://www.theedigital.com/blog/web-design-trend), [PushLeads gallery SEO](https://pushleads.com/before-and-after-gallery-seo-how-to-turn-your-remodeling-portfolio-into-a-lead-generating-machine/), [Ritner Digital on seasonal SEO](https://www.ritnerdigital.com/blog/christmas-light-installers-are-about-to-miss-their-entire-season-again-the-seasonal-service-seo-deadline).

## 20. Research prompt for ChatGPT and Gemini

Paste into ChatGPT (Deep Research) and Gemini (Deep Research) separately, then bring both reports back here to merge. Fill in the brackets first.

```text
You are a senior local-SEO strategist and award-level web design director. Do deep research, with sources, for a website rebuild.

CLIENT
Cyril Handyman & Door LLC, a service-area business (no public storefront, address hidden on Google Business Profile) serving Dallas, Plano, Frisco, Garland, Forney, Rockwall, Mesquite and McKinney, Texas. Flagship services, each getting its own long SEO page: (1) garage doors: repair, springs, openers, installation; (2) faux wood blinds; (3) motorized/retractable patio screens; (4) media walls and accent walls; (5) outdoor Christmas light installation. Plus a dedicated project gallery. [Add: years in business, license/insurance, anything else.]

ASSETS: we already have as much real photo and video content as we need for every service. Do not suggest stock imagery. Design ideas SHOULD use video and photography heavily.

BUILD: Next.js App Router, hosted on Vercel, Supabase for gallery data. Targets: LCP <= 2.5s on mobile, one autoplaying hero video with a poster-first fallback, no doorway/thin city pages.

PART A: SEO ESSENTIALS (research and cite)
1. For each of the 5 services, build a keyword map for the Dallas-Fort Worth area: head terms, long-tail, problem-language, cost/informational and seasonal terms. Label intent (transactional, commercial, informational) and give relative competition, plus the tool or source you used. Do not invent search volumes; say "estimate" or "unavailable" when you cannot verify them.
2. Analyze the top 5 organic and map-pack competitors in the Dallas area for each service: page structure, word count range, media use, FAQ, schema, review volume, and content gaps we can beat.
3. Page blueprint for each flagship service page: sections in order, target length, internal links, FAQs worth answering, schema types, and how to handle city names WITHOUT doorway or keyword-stuffing risk. Include how to handle a hidden address (service-area business) with schema and NAP consistency.
4. Google Business Profile: best primary and secondary categories for each service mix, service-area setup, services list, photo/video and post cadence, review-generation system.
5. Backlink and citation plan realistic for a one-person local contractor in North Texas: which directories, chambers, suppliers/manufacturers, sponsorships, and local press are worth pursuing. Exclude paid link schemes.
6. Seasonal plan for outdoor Christmas lights: when to publish and refresh the page, booking cutoffs, offers, and how to keep the URL ranking year over year.
7. Technical SEO checklist for this stack: metadata, canonicals, sitemap (incl. image/video), robots, redirects from an old site, Core Web Vitals with a video hero, structured data, crawlability of gallery filters.
8. What changed in Google local search and AI answer features in 2026 that affects this plan. Flag anything you are unsure about.

PART B: HIGH-END DESIGN RESEARCH
1. Find 20+ current (2025-2026) websites worth studying and give each URL: home improvement, luxury remodeling, outdoor living, window coverings, patio/pergola, custom millwork and wall design, holiday/landscape lighting, plus 5 premium sites from adjacent industries (architecture, furniture, automotive, hospitality) that use photography and video well.
2. For each: layout pattern, hero treatment, how it uses video and still images, gallery/portfolio UX, navigation, typography and color approach, trust elements, mobile behavior, and one thing to steal and one thing to avoid.
3. Specific patterns I want evaluated: video hero with overlay and CTA; filterable project galleries with project detail pages; before/after sliders; bento service grids; process timelines; scroll-driven story sections; sticky call bars; service-area maps. For each, say adopt / test / skip, with the performance and accessibility cost.
4. How do premium sites avoid looking template-made or AI-generated? List concrete tells to avoid and concrete moves that read as handcrafted.
5. Design systems: suggest 3 distinct visual directions for this brand (palette logic, type pairing, grid, motion rules, photo/video treatment), each with a homepage wireframe described section by section and a template for a flagship service page and the gallery.

OUTPUT RULES
- Cite every factual claim with a URL and date. Separate verified facts from your opinions. If sources conflict, say so.
- Never fabricate statistics, rankings, or example sites. If you cannot open a site, say so.
- Ask at most 3 clarifying questions only if blocked; otherwise proceed with stated assumptions.
- Structure: executive summary (max 10 bullets), then Part A, Part B, then a prioritized 30-day action list.
- Use tables for comparisons. Keep prose tight.
```

After both reports are back, bring them to this chat and we will cross-check the overlap, drop anything unsourced, and turn the winning direction into the Phase 1 build prompt.

## 21. Merge verdict on the first research report

The report is good for page structure and the UI pattern calls, but about a third of its specifics are unverified or wrong for Cyril. Do not paste it into the build as-is.

**Keep**

1. Five flagship pages, no city-swap clones, hidden address, `areaServed` in schema
2. A "recent projects by city" module on every flagship page, fed by real gallery items (it proves coverage without thin pages)
3. Poster-first video hero with a reduced-motion fallback, sticky mobile call bar, bento service grid, before/after slider where real "before" media exists
4. Supabase gallery tables and a year-round Christmas lights URL

**Change**

| Report says | Do instead |
| --- | --- |
| No city pages at all | 3–4 real city pages (Cyril wants a city menu) plus the by-city project module |
| Domain `cyrilhandyman.com`, placeholder phone | Invented. The real domain is crazydoorhandyman.com; phone and NAP come from Cyril |
| Christmas slug `/services/christmas-light-installation` | Adopt it (matches the search phrase better than `/outdoor-christmas-lights`). Other pages keep the `/services/` prefix |
| Query-param gallery filters (`?filter=`) in the sitemap | Parameter URLs canonicalize to `/gallery`. Index through project pages and real paths like `/gallery/service/garage-doors` |
| Black + metallic gold + cream, Cinzel/Playfair as the default | Palette and type come from Cyril's logo. Black-and-gold luxury is itself a template look. Dark theme is fine for the Christmas page |
| GBP primary "Garage Door Services", secondary Handyman, Window Treatment Store, Lighting Contractor, General Contractor | Verify exact category names in the GBP picker, set the primary by Cyril's real revenue, and add only categories that fit. "Store" categories suggest a storefront |
| Automated SMS review loop via CRM/webhook; ask customers to mention service and city | Launch with a manual text containing the direct review link. Do not script keywords. Automate later |
| Yext/BrightLocal sync to 6+ aggregators, "dofollow" chamber links | Free listings first (Bing, Apple Maps, Yelp, BBB, Facebook, Nextdoor, chambers). Citations are a small slice of Maps weight in the survey we cited. Manufacturer dealer pages only where Cyril is an authorized dealer |
| `HowTo`, `ItemPage`, `AutomotiveBusiness` schema; "microdata" FAQ | Drop them (HowTo rich results are gone, the others do not fit). FAQ as JSON-LD for AI use only. Review schema only for genuine, displayed reviews |
| Rely on EXIF geotags on job photos | Strip GPS from every photo (customer privacy, no sourced ranking benefit) |
| Skip scroll storytelling | Agree on no scroll-jacking. Keep CSS-first reveals and at most one tested story section |

**Drop (unverified)**

1. The competitor table: names, word counts and schema claims are unverifiable. We do a real SERP check for 5 queries ourselves.
2. "March 2026 core update penalizes AI copy" and the video-verification claim: no source given.
3. The competition labels and the 1.5MB video figure: treat as targets and measure on the Vercel preview.
4. The 20-site design table: layout claims are unverified, and many entries are luxury product or auto brands, not trades. Use it as a moodboard list, then open and judge each one.
5. Cost calculators and visualizers: parking lot.
6. The 30-day schedule: replaced by the build order in section 15 (Christmas lights first).

## 22. Phase 1 build prompt (replaces section 14)

Paste into OpenCode. Send the logo and brand colors first, or the agent uses neutral tokens.

```text
Audit first, then edit. Project: new site for Cyril Handyman & Door LLC (domain crazydoorhandyman.com). Existing repo: dynastyweb26/trustworthy-handyman-site. Before changing anything, audit it: routes, content, old URLs, reusable pieces. Report findings in 10 lines max, then build.

Stack: Next.js App Router, TypeScript, Tailwind, Supabase, Vercel. Verify everything on Vercel preview deploys only. One commit per discrete item.

Build in this order:
1. Old URL inventory -> redirects map file (old path -> new path, 301).
2. Design tokens in one file (colors, type, spacing), using the brand tokens in section 24 (black #0A0A0B, charcoal #17171A, dark red #8E1B1B with #6E1313 hover, #D65A5A for red text on dark, white, optional bone #F5F3EF). Red is an accent only, no gradients, no emoji icons, no gold. Use the logo from /public/brand (I will upload a transparent PNG or SVG).
3. Shell: layout, nav using the route list in section 23 (Areas dropdown lists all 8 cities, each linking to its section on /service-areas; Blog hidden), footer with TODO_CONTENT NAP placeholders, sticky mobile call bar.
4. SEO plumbing: title template, per-route metadata, canonicals, app/sitemap.ts (with image/video entries) and app/robots.ts driven by one data file, server-rendered JSON-LD component for HomeAndConstructionBusiness using areaServed and NO street address.
5. Hero component: native <video muted autoplay loop playsInline preload="metadata"> with a preloaded WebP poster (fetchpriority=high), poster-only on mobile and under prefers-reduced-motion, video URL in one config value, real H1/phone/CTA as HTML text over a dark scrim.
6. Flagship page /services/christmas-light-installation FIRST (dark theme allowed): sections per the blueprint (hero, quick answer, packages, what affects price, booking cutoff banner, gallery strip, Where we install, FAQs, reviews, CTA). Use TODO_CONTENT strings, no lorem ipsum. Keep the URL permanent.
7. Supabase migration: projects (id, slug, title, service, city, summary, scope, materials, featured, published) and project_media (project_id, type, storage_path, alt_text NOT NULL, caption, sort_order). RLS: public read of published rows only, writes authenticated only.

Do NOT build yet: other service pages, city pages, blog, gallery UI, calculators, scroll-jacking, or paid-aggregator citation code. Flag anything you think is missing instead of adding it.

When done, report: what shipped, preview URL, Lighthouse mobile LCP, anything you would flag.
```

## 23. Second research report: merge and final decisions

The second report is the stronger one: it separates verified facts from hypotheses, cites Google's own docs, and refuses to invent volumes, rankings or audits. Where the two reports and this blueprint disagree, the rulings below win.

**Checked in this pass**

1. Google announced Search generative AI performance reports and an opt-out control on June 3, 2026, with worldwide availability confirmed as of Aug 31, 2026 (multiple sources). Google says the control is not a ranking signal for normal results. Do not opt out of AI features for Cyril. Google also does not use llms.txt, so skip it.
2. Schema and hidden address: sources conflict on whether `address` is required for LocalBusiness rich results. Plan: omit the street address, use `areaServed`, and accept that we may not get LocalBusiness rich-result eligibility. Never publish a home address to satisfy a validator.

**Rulings**

| Topic | Ruling |
| --- | --- |
| City pages | Neither report builds them at launch. Final plan: one `/service-areas` hub with a section per city (all 8), city names in project titles, and no individual city URLs until a city has about 3 documented projects plus reviews (my threshold, not a Google rule). The "Areas" menu lists every city and links to its hub section, so Cyril gets his city menu without thin pages. This replaces the 3–4 city pages in sections 5 and 15. |
| Keyword map | Use report 2's keyword clusters as the working map. They are hypotheses until checked in Keyword Planner and Search Console. No search volumes are claimed. |
| Visual direction | Modern Architectural with some warmth from the residential direction, but the actual palette and type come from Cyril's logo. The black-and-gold direction from report 1 is rejected. |
| Scroll storytelling | Test one controlled section, no scroll-jacking. |
| GBP categories | Both reports say verify exact names in the live editor and pick by real business identity. Also check Google's guidance that a service area should stay within roughly two hours' driving of the base. |
| Reviews | No incentives, no selective asking, no scripted keywords. Send the direct link and let customers write their own words. |
| Christmas calendar | Report 2's annual calendar is right for 2027 onward. For this season, we ship the page now. |
| Competitors | Report 2's names are a discovery pool, not verified top-5 results. Both reports' competitor claims need a live search and Maps capture per service before we rely on them. |
| Design references | Open and judge before copying anything. Trade-relevant: Phantom Screens, Tier One Custom Windows, Elite Custom Millwork, Holiday Lights Texas, Splendid Christmas Company. Local DFW pool: Vue Screens, Texas Shade, EX Design Group, BT Home Designs, DFW Shades. Aman, Porsche, Four Seasons and similar are mood references only. |

**Final route list (supersedes sections 3 and 15)**

| URL | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview |
| `/services/garage-door-repair-installation` | Garage doors |
| `/services/faux-wood-blinds` | Faux wood blinds |
| `/services/motorized-retractable-patio-screens` | Patio screens |
| `/services/media-walls-accent-walls` | Media and accent walls |
| `/services/christmas-light-installation` | Christmas lights (build first) |
| `/gallery`, `/gallery/[slug]` | Gallery hub and project pages (kept as "gallery" because that is what Cyril asked for) |
| `/service-areas` | Hub with a section per city |
| `/about`, `/how-we-work`, `/reviews`, `/faq`, `/contact` | Supporting pages |
| `/blog`, `/blog/[slug]` | Phase 3 |

**Verify with Cyril before publishing any claim**

1. Year established, owner name, and real years of hands-on experience
2. Insurance (general liability, workers' comp only if held) and any licenses or certifications, with issuers
3. Manufacturer or dealer authorizations (do not imply any he lacks)
4. Written workmanship warranty terms
5. Which services he performs himself and which use subcontractors
6. Hours, accepted payment methods, estimate policy (free or paid), service limits
7. Christmas lights: lights supplied or customer-owned, takedown and storage, minimum job size, booking cutoff

The three blocking questions: year established and experience, insured and licensed status, and who performs each service.

**Next steps**

1. Cyril or you send the logo and brand colors (decides palette and type)
2. Run the live competitor and Maps audit for the five services and open the trade-relevant design references
3. Paste the section 22 prompt into OpenCode

## 24. Brand tokens from the logo

The logo is a black circle with white "Cyril Handyman & Door" text and tool icons (hammer, wrench, ladder, plug, pliers, screwdriver, nut) radiating out. Brand colors confirmed: black, dark red, white accents. These replace the black-and-gold and charcoal/bronze ideas from the research reports.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0A0A0B` | Page and hero backgrounds, headlines on light |
| `--charcoal` | `#17171A` | Cards and surfaces on dark |
| `--red` | `#8E1B1B` | Buttons, rules, small accents (starting value, confirm against his van, cards or signage) |
| `--red-deep` | `#6E1313` | Hover and pressed states |
| `--red-on-dark` | `#D65A5A` | Red text or links on black (the base red is too dark to read on black) |
| `--white` | `#FFFFFF` | Text on dark, light sections |
| `--bone` | `#F5F3EF` | Optional warm off-white for light sections |

Contrast, calculated by hand (re-check with a tool): white on `--red` is about 9:1, `--red` text on white about 9:1, `--red-on-dark` on black about 5:1, base red on black only about 2:1 so never use it for text there.

**Rules**

1. Red is an accent, roughly a tenth of any screen: primary buttons, thin rules, small markers. Black and white do the heavy lifting. No gradients.
2. Alternate dark and light sections so photography and video carry the page. The Christmas lights page can run fully dark.
3. Type: the logo uses a friendly humanist sans, so keep body copy in a clean sans and use one stronger display face for big headlines (my suggestion: a sturdy serif or condensed grotesque; pick two fonts total and test both on the preview).
4. Corners: small radii or square, to match the logo's flat, graphic feel.

**Logo notes**

1. The file has a white rounded "sticker" border around the mark. We need a transparent PNG or, better, an SVG, or the border will look wrong on dark backgrounds. Ask whoever made it for the vector.
2. Use the circle mark small in the header and as a favicon and social avatar. Do not tile or scatter the tool icons across the site, that reads as template clip art.
3. The mark says "Handyman" and shows general tools, while the new services are installations and repairs. That is fine for trust, but the homepage headline should name the five services so visitors see the focus immediately.

## Sources

- [Whitespark 2026 Local Search Ranking Factors summary (Digital Thrive)](https://www.digitalthriveai.com/en-us/resources/seo/google-updates-local-ranking-documentation/)
- [2026 Local Search Ranking Factors, local organic weights (Advice Local)](https://www.advicelocal.com/?p=20716)
- [Whitespark Local Search Ranking Factors](https://whitespark.ca/whats-working-in-local-seo)
- [Search Engine Land: service area pages](https://searchengineland.com/guide/service-area-pages)
- [Search Engine Roundtable via Local Search Forum: Google on city landing pages as doorway pages](https://localsearchforum.com/threads/google-city-landing-pages-can-be-doorway-pages-against-guidelines.55438/post-162605)
- [BrightLocal: service area pages](https://brightlocal.com/learn/service-area-pages/)
- [Google Business Profile service-area rules (PPC Land)](https://ppc.land/service-area-business/)
- [Google bans states/countries as service areas (PPC Land)](https://ppc.land/google-bans-countries-and-states-from-business-profile-service-areas/)
- [Garage door SEO keywords (Loopex Digital)](https://www.loopexdigital.com/industries/seo-for-garage-door-companies)
- [Handyman SEO keyword volumes (Comrade Web)](https://comradeweb.com/blog/seo-for-handyman/)
- [Contractor SEO 2026 (SkillMammoth)](https://skillmammoth.com/blog/contractor-seo)
- [Handyman SEO guide (Digimau)](https://www.digimau.com/seo-for-handyman-services-the-complete-guide-to-growing-your-handyman/)
- [Hero image/LCP (PPC Land)](https://ppc.land/hero-image/)
- [Background video best practices](https://usavps.com/blog/?p=174026)
- [Next.js 15 App Router SEO (DEV)](https://dev.to/cekuu35/nextjs-15-app-router-seo-done-right-generatemetadata-dynamic-sitemaps-and-the-one-file-strategy-fd4)
- [Practical technical SEO in Next.js (DEV)](https://dev.to/na1969na/practical-technical-seo-in-nextjs-the-implementation-guide-2bcm)
- [LocalBusiness schema guide (Schema App)](https://www.schemaapp.com/tutorial/how-to-do-schema-markup-for-local-business/)
- [FAQ rich results deprecation (Passionfruit)](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now)
- [Local backlinks for home service pros (Footbridge Media)](https://www.footbridgemedia.com/marketing-tips/backlinks-for-home-service-pros)
- [Local backlink sources (ContextBolt)](https://contextbolt.com/blog/local-seo-backlinks/)

Note: the weight percentages are expert-survey estimates relayed by secondary sources, and the FAQ deprecation date comes from secondary sources too. Verify against Google's own documentation before quoting them to Cyril.
