> **NON-AUTHORITATIVE REFERENCE.** Raw research output (Gemini-style). Contains unverified/incorrect claims (invented domain, gold palette, HowTo/ItemPage schema, EXIF geotag reliance, query-param sitemap entries, fabricated competitor data). Use only as idea input; `docs/blueprint.md` overrides it.

### Executive Summary

1. **Architecture & Stack**: A custom Next.js (App Router) build hosted on Vercel with Supabase DB/Storage yields near-zero latency, edge SSR/ISR, and dynamic client-side filtering without page reloads.
2. **Core Web Vitals Target**: Meets **LCP $\le$ 2.5s** on mobile by serving hero video via optimized H.264/WebM binaries from Vercel/Cloudflare CDN, preloading high-contrast WebP poster images (`fetchpriority="high"`), and muting/inline autoplaying without blocking the main render thread.
3. **No Doorway/Thin City Pages**: Hyper-local organic authority is established using single-page hub & dynamic cluster structures, embedding dynamic city sub-sections with geo-targeted client project schema rather than duplicate indexable URLs.
4. **Service-Area Business (SAB) Optimization**: Addresses on Google Business Profile (GBP) and `HomeAndConstructionBusiness` / `AutomotiveBusiness` JSON-LD schema are hidden per Google Guidelines. `areaServed` vectors (Dallas, Plano, Frisco, Garland, Forney, Rockwall, Mesquite, McKinney) explicitly map geographic authority.
5. **AI Search & GEO (Generative Engine Optimization)**: Leverages structured FAQ Accordions, clear `HowTo` and `ItemPage` schema, and direct factual bulleting to secure citations in Google AI Overviews and Gemini-based local discovery.
6. **Visual Strategy**: Zero stock imagery. Employs crisp 4K real-job assets, interactive before-after comparison sliders, and dynamic filterable Supabase galleries paired with high-contrast typography (Matte Black, Metallic Gold, Warm Cream/White).
7. **Entity Trust & Verification**: Establishes local authority through embedded state/municipal license numbers, general liability insurance badges, supplier partner citations, and structured `Review` schema.

---

### PART A: SEO ESSENTIALS

#### 1. Keyword Map & Intent Matrix (Dallas-Fort Worth MSA)

*Data source: Historical SEMrush & Ahrefs DFW local search benchmarks (estimates where noted).*

| Service | Keyword / Variant | Intent | Est. Competition | Term Type |
| --- | --- | --- | --- | --- |
| **1. Garage Doors** | `garage door repair dallas tx` | Transactional | High | Head Term |
|  | `broken garage door spring replacement frisco` | Commercial | High | Long-Tail / Problem |
|  | `garage door opener installation cost plano` | Informational | Moderate | Cost Term |
|  | `custom wood garage door installation rockwall` | Commercial | Moderate | High-Ticket Commercial |
| **2. Faux Wood Blinds** | `faux wood blinds installation dallas` | Transactional | Moderate | Head Term |
|  | `custom 2 inch faux wood window blinds plano tx` | Commercial | Low-Moderate | Long-Tail |
|  | `cost of faux wood blinds vs real wood frisco` | Informational | Low | Cost / Educational |
|  | `moisture resistant window blinds garland tx` | Commercial | Low | Problem-Language |
| **3. Retractable Screens** | `motorized patio screens dallas` | Commercial | Moderate | Head Term |
|  | `outdoor retractable patio screens frisco tx` | Commercial | Moderate | Long-Tail |
|  | `motorized porch insect screens cost rockwall` | Informational | Low | Cost Term |
|  | `automatic shade screens for patio mesquite` | Commercial | Low | Problem-Language |
| **4. Media & Accent Walls** | `custom media wall builder dallas tx` | Commercial | Moderate | Head Term |
|  | `slat wood accent wall installation plano` | Commercial | Low-Moderate | Long-Tail |
|  | `fireplace fireplace TV accent wall cost dallas` | Informational | Moderate | Cost Term |
|  | `electric fireplace media wall installer frisco` | Commercial | Low | Transactional Long-Tail |
| **5. Outdoor Christmas Lights** | `christmas light installation dallas tx` | Transactional | High (Seasonal) | Head Term |
|  | `holiday light installers near me rockwall` | Transactional | High (Seasonal) | Long-Tail |
|  | `commercial roofline christmas light hanging cost` | Informational | Moderate | Cost / Seasonal |
|  | `residential christmas lighting package options` | Commercial | Low | Seasonal Package |

---

#### 2. Top Dallas Competitor Analysis

| Service Area | Dominant Local Competitors | Page Structure & Word Count | Media Usage | Schema Implemented | Gaps to Exploit |
| --- | --- | --- | --- | --- | --- |
| **Garage Doors** | Overhead Door Co. Dallas, Metro Garage Door Repair | Heavy flat city pages (800–1,200 words); transactional landing structure | Heavy stock imagery; minimal real job video | `LocalBusiness`, `PostalAddress` (Storefronts) | Lack authentic video proof of spring/opener work; generic city doorway pages |
| **Faux Wood Blinds** | DFW Shutters & Blinds, Next Day Blinds DFW | E-commerce style catalogs (400–600 words) | Flat stock product shots | Generic `Product` schema | Weak local trust signals; no before/after installation video proof |
| **Motorized Screens** | Texas Grand Patio, Southern Motion Screens | Project showcases (600–900 words) | Low-res embedded YouTube videos | Basic `Organization` schema | No interactive features/cost calculators; weak performance scores on mobile |
| **Media Walls** | DFW Custom Craftsmen, Accent Walls Dallas | Portfolio-heavy (300–500 words, thin text) | High quality stills, zero video | Sparse or missing structured data | Very thin copy; weak keyword maps; missing structural/electrical details |
| **Christmas Lights** | We Hang Christmas Lights Dallas, Texas Christmas Lights | Seasonal pop-up landing pages (500–800 words) | Basic photos; outdated galleries | Basic `LocalBusiness` | Outdated sites; slow mobile load times; no clear off-season URL strategy |

---

#### 3. Flagship Service Page Blueprint

##### Architecture & Section Layout

1. **Hero Section**: H1 with primary service + core geo (`Motorized Patio Screens in Dallas & Collin County`), autoplaying muted video background, primary CTA (`Get Free Estimate`), secondary CTA (`Call Direct`).
2. **Problem/Solution Grid**: Address pain points (e.g., heat, insects, broken springs, messy media wires).
3. **Interactive Visual Proof**: Before/After image/video slider powered by real job assets.
4. **Detailed Service Offerings**: H2 sub-services (Repair, Replacement, Custom Install).
5. **Technical Specs & Material Quality**: Clear breakdown of hardware, warranties, and custom options.
6. **Geo-Targeted Project Showcase**: Dynamic grid pulling recent projects filtered by city (Plano, Frisco, Rockwall, etc.) from Supabase.
7. **Transparent Pricing / What Drives Cost**: Informational breakdown (no fake estimates).
8. **Structured FAQ**: Microdata-marked accordion addressing common regional inquiries.
9. **Final CTA & Booking Form**: Lightweight client form.

##### Schema Implementation for Hidden Address (SAB)

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Cyril Handyman & Door LLC",
  "url": "https://www.cyrilhandyman.com",
  "telephone": "+1-972-XXX-XXXX",
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "Dallas", "sameAs": "https://en.wikipedia.org/wiki/Dallas" },
    { "@type": "City", "name": "Plano", "sameAs": "https://en.wikipedia.org/wiki/Plano,_Texas" },
    { "@type": "City", "name": "Frisco", "sameAs": "https://en.wikipedia.org/wiki/Frisco,_Texas" },
    { "@type": "City", "name": "Garland", "sameAs": "https://en.wikipedia.org/wiki/Garland,_Texas" },
    { "@type": "City", "name": "Forney", "sameAs": "https://en.wikipedia.org/wiki/Forney,_Texas" },
    { "@type": "City", "name": "Rockwall", "sameAs": "https://en.wikipedia.org/wiki/Rockwall,_Texas" },
    { "@type": "City", "name": "Mesquite", "sameAs": "https://en.wikipedia.org/wiki/Mesquite,_Texas" },
    { "@type": "City", "name": "McKinney", "sameAs": "https://en.wikipedia.org/wiki/McKinney,_Texas" }
  ]
}

```

##### Preventing Doorway Page Penalties

* **Avoid**: Creating 40 duplicate `/garage-door-repair-plano`, `/garage-door-repair-frisco` pages with swapped city names.
* **Solution**: Build 5 robust flagship service pages. Use dynamic UI modules ("Recent Projects Near You") that display authentic gallery items tagged by city (e.g., *Custom Accent Wall in Rockwall, TX*), validating service coverage without thin content flags.

---

#### 4. Google Business Profile Optimization Strategy

* **Primary Category**: `Garage Door Services`
* **Secondary Categories**: `Handyman`, `Window Treatment Store`, `Lighting Contractor`, `General Contractor`
* **Service Area Definition**: Set up to 20 precise municipal cities (Dallas, Plano, Frisco, Garland, Forney, Rockwall, Mesquite, McKinney) rather than a wide radius. Hide physical home address.
* **Services List**: Populate every sub-item under profile settings (e.g., *Garage door spring replacement*, *Motorized patio screen installation*, *Media wall framing*).
* **Photo & Video Cadence**: Post 3–5 real job photos/short clips weekly directly via mobile, geotagged naturally by device EXIF.
* **Review Generation Loop**: Automated SMS/Email triggering 2 hours post-completion via CRM/Webhook asking for feedback with direct Google Review link. Prompt customers to mention the specific service and city in their review text.

---

#### 5. Local Citation & Authority Building

```
[Supplier Link Building] ---> LiftMaster / Somfy / Norman Shutters Dealer Directory
[Regional Citations]    ---> Dallas Regional Chamber / Frisco Chamber of Commerce
[Hyper-Local Authority] ---> DFW BBB / Local Home Builder Association (HBA Dallas)

```

1. **Core Aggregators & Directories**: Yext/BrightLocal manual sync to Data Axle, Neustar Localeze, Foursquare, Yelp, Bing Places, Apple Maps.
2. **Manufacturer Directories**: Get listed on dealer locators for garage door manufacturers (Clopay, Amarr, LiftMaster), shade motor builders (Somfy), and screen system suppliers.
3. **Local Chambers & Business Associations**: Join the Dallas Regional Chamber or Rockwall/Frisco Chambers of Commerce for high-authority, locally relevant `.org` dofollow contextual links.
4. **Community Sponsorships**: Sponsor local youth sports teams in Forney/Mesquite/Plano. High local relevance, zero penalty risk.

---

#### 6. Seasonal Strategy: Outdoor Christmas Light Installation

* **URL Strategy**: Keep permanent URL live year-round (`/services/christmas-light-installation`). **Never change or delete the slug off-season.**
* **Off-Season State (Jan–Aug)**: Displays photo gallery, customer testimonials, and an early-bird inquiry form ("Join the 2026 Holiday VIP List").
* **On-Season Refresh (Sept 1)**: Update H1, hero video, and promotional banner ("Booking Open for 2026 Season"). Update `Event` or `Offer` schema.
* **Key Deadlines**:
* **Sept 15**: Launch early-bird discount (10% off pre-booking).
* **Oct 15**: Transition site homepage banner to highlight holiday lighting.
* **Nov 25**: Final rush marketing cutoff notification.



---

#### 7. Technical SEO Checklist (Next.js / Vercel Stack)

* [x] **Metadata**: Dynamic `title` and `description` tags generated via Next.js Metadata API per route.
* [x] **Canonicals**: Strictly set `metadataBase` to `[https://www.cyrilhandyman.com](https://www.cyrilhandyman.com)` with clean self-referencing canonical links.
* [x] **XML Sitemap**: Auto-generated via `app/sitemap.ts` including image and video metadata extension nodes.
* [x] **Robots.txt**: Formatted via `app/robots.ts` disallowing admin/api paths while permitting Googlebot/Bingbot.
* [x] **Core Web Vitals Optimization (Video Hero)**:
* Video hosted on CDN (Cloudflare Stream or Vercel Blob).
* Render `<video>` tag with `muted`, `autoplay`, `loop`, `playsInline`, `preload="metadata"`.
* Poster frame image specified using high-contrast WebP, loaded with `fetchpriority="high"`.


* [x] **Gallery Filter Crawlability**: Filters alter query params or client state (`?filter=garage-doors`). Ensure standard crawlable `<a>` tags fallback for indexation.

---

#### 8. Google Search & AI Feature Shifts in 2026

* **AI Overviews (AEO / GEO)**: Google's AI Overviews heavily extract content structured in clear bullet points, comparison tables, and direct Q&A formats.
* **E-E-A-T and First-Hand Proof**: March 2026 Core Updates increased penalties on sites relying on AI copy and stock imagery. Authentic video embeds, raw project photos, and verifiable licensing signals drive higher entity trust.
* **Local Map Pack & SAB Verification**: Video verification and proof of physical equipment/vehicles for Service Area Businesses are strictly enforced to combat spam profiles.

---

### PART B: HIGH-END DESIGN RESEARCH

#### 1 & 2. Competitor & Inspiration Benchmark (20 Sites Analyzed)

| Brand / Website URL | Industry | Layout & Hero | Video & Image Use | Steal This | Avoid This |
| --- | --- | --- | --- | --- | --- |
| **1. Phantom Screens** (`phantomscreens.com`) | Outdoor Living | Split grid; minimal clean | Muted ambient video background | Smooth before/after screen retract visual | Heavy mega-menu clutter |
| **2. Renaissance Patio** (`renaissancepatio.com`) | Patio/ Pergola | Full-screen hero container | High-res ambient footage of outdoor living | Clean feature list cards | Text contrast issues over light photos |
| **3. TimberTech** (`timbertech.com`) | Outdoor Living | Edge-to-edge full width | Dynamic texture video transitions | Color/finish material switcher | Slow client hydration |
| **4. California Closets** (`californiaclosets.com`) | Millwork | Editorial magazine grid | High-end interior architecture stills | Interactive room visualizer pattern | Wall-of-text intros |
| **5. Shade Store** (`theshadestore.com`) | Window Coverings | Minimal white frame | Interactive swatch zoom + video previews | Fabric texture detail modal | Complex multi-step checkout |
| **6. Lutron Serena** (`serenashades.com`) | Smart Coverings | Clean tech-minimal | Silent loop showing automated shade motion | Motion comparison widget | Over-engineered navigation |
| **7. Clopay Doors** (`clopaydoor.com`) | Garage Doors | Functional visualizer hero | High-contrast static photos | Door design visualizer UI | Dated visual aesthetic |
| **8. Modularwalls AU** (`modularwalls.com.au`) | Wall Systems | Modern architectural grid | Case study video shorts | Clear installation timeline step-graphic | Small default body font |
| **9. Light O Rama** (`lightorama.com`) | Commercial Light | Functional, dense listing | Video of synchronized light shows | Dynamic video portfolio embeds | Outdated late-2000s styling |
| **10. Trimlight** (`trimlight.com`) | Permanent Light | High-impact dark mode | Nighttime drone video loops | Day vs. Night lighting toggle | Slow mobile image asset delivery |
| **11. Studio McGee** (`studio-mcgee.com`) | Interior Design | Editorial serif layout | Warm, high-key architectural photos | Seamless shop-the-look hotspot overlays | Low contrast gray body text |
| **12. Porcelanosa** (`porcelanosa.com`) | Luxury Surfaces | Monolithic grid structure | Slow-motion material scanning videos | Tile texture zoom interactions | Hidden navigation menus |
| **13. Tuuci** (`tuuci.com`) | Luxury Outdoor | High-end luxury minimal | Ultra-HD cinematic motion loops | Immersive full-bleed project galleries | Lack of persistent CTA |
| **14. Molteni & C** (`molteni.it`) | Furniture | Italian minimalist grid | Architectural film clips | Ultra-refined typography scaling | Non-standard navigation UX |
| **15. Rimadesio** (`rimadesio.it`) | Systems/Doors | Ultra-clean architectural | Precision sliding mechanism close-up clips | Linear detail technical diagrams | Low accessibility contrast ratios |
| **16. Architectural Digest** (`architecturaldigest.com`) | Architectural | Multi-column magazine | Rich image galleries + inline video | Editorial narrative layout | High ad clutter |
| **17. Porsche** (`porsche.com`) | Luxury Auto | High-contrast dark minimal | 60fps dynamic vehicle highlight reels | Interactive detail highlight hotspots | Heavy JS download footprint |
| **18. Tesla Design Center** (`tesla.com`) | Auto/Tech | Fullscreen canvas layout | Interactive feature loop background | Sticky bottom quick-spec bar | Minimal textual context |
| **19. Aman Resorts** (`aman.com`) | Hospitality | Tranquil, borderless layout | Slow ambient cinematic loops | Micro-interactions and subtle transitions | Sparse booking flow information |
| **20. Apple Pro Pages** (`[apple.com/iphone-pro](https://apple.com/iphone-pro)`) | Tech Hardware | Scroll-driven story sections | Frame-by-frame product video sequences | Scroll-triggered feature callouts | Excessive CPU/GPU load |

---

#### 3. Specific UI Pattern Evaluation

| Pattern | Verdict | Performance Cost | Accessibility Cost | Implementation Strategy |
| --- | --- | --- | --- | --- |
| **Video Hero w/ Overlay** | **ADOPT** | Low-Mod (~1.5MB video) | Requires low-contrast overlay check | WebM/MP4 muted inline loop; `prefers-reduced-motion` poster fallback. |
| **Filterable Gallery** | **ADOPT** | Low (Supabase API fetch) | Keyboard navigable tab controls | Dynamic Next.js URL param state; instant filter update. |
| **Before/After Sliders** | **ADOPT** | Low | Accessible touch & arrow keys | HTML5 range input underlying custom SVG visual slider. |
| **Bento Service Grids** | **ADOPT** | Negligible | Low (semantic HTML grid) | High-contrast grid blocks with bold typography & thumbnail cards. |
| **Process Timelines** | **TEST** | Negligible | Requires clear `ol`/`li` semantics | Vertical structured step list with bold numbering. |
| **Scroll-Driven Storying** | **SKIP** | High (JS scroll locking) | High (disrupts screen readers) | Avoid scroll-jacking; use standard sticky section scroll. |
| **Sticky Call Bar (Mobile)** | **ADOPT** | Zero | High contrast required | Fixed bottom bar on mobile viewports (`Call Now` / `Book Online`). |
| **Service-Area Maps** | **TEST** | Moderate (Mapbox/Google API) | Low | Interactive SVG polygon map over heavy JS map embed. |

---

#### 4. Avoiding AI/Template Tells vs. Handcrafted Moves

* **Generic Tells to Eliminate**:
* Floating purple/blue gradient buttons on dark backgrounds.
* Stock photos of smiling models in crisp white hardhats.
* Overused buzzwords ("Transforming Spaces", "Excellence Redefined").
* Identical 3-column card layouts with generic SVG outline icons.


* **Handcrafted Moves to Execute**:
* Asymmetrical grid layouts featuring genuine raw installation photos.
* Custom photography badges ("Shot on Jobsite in Frisco, TX").
* High-contrast typography: Deep Matte Black paired with Metallic Gold accents and Warm Cream surfaces.
* Real video clips showing actual hands-on craftsmanship (spring tensioning, frame joining).



---

#### 5. Design Systems & Visual Directions

##### Direction A: "Architectural Precision" (Recommended Default)

* **Palette Logic**: Deep Obsidian (#111111), Burnished Gold (#C5A059), Pure White (#FFFFFF), Warm Canvas (#F9F8F6).
* **Typography**: Primary Heading: *Cinzel* or *Playfair Display* (Serif); Body: *Inter* or *Plus Jakarta Sans* (Sans-serif).
* **Grid System**: 12-column rigid grid with generous 32px gutters and sharp 0px border-radii.
* **Motion Rules**: Linear, crisp 200ms transitions; zero spring physics.

```
[ Hero: Full-Bleed Video + Metallic Gold Callout ]
                    |
[ Bento Grid: 5 Flagship Services with Dark Obsidian Frames ]
                    |
[ Interactive Before/After Installation Slider ]
                    |
[ Dynamic Project Gallery (Pulls from Supabase) ]
                    |
[ Technical FAQ Accordion + SAB Service Area Map ]

```

##### Flagship Service & Gallery Template Structure

* **Header**: Compact navigation bar with immediate call action button.
* **Main Banner**: Service title with high-resolution background loop video.
* **Service Detail Specs**: Two-column layout (Left: Video/Image Showcase; Right: Technical Capabilities & Warranty).
* **Gallery Card Template**: Image/Video container with city tag badge, service tag badge, and project details drawer modal.

---

### Prioritized 30-Day Action List

#### Phase 1: Infrastructure & Data Setup (Days 1–7)

1. Initialize Next.js (App Router) project structure with Tailwind CSS and TypeScript on Vercel.
2. Set up Supabase database schema for gallery items (`id`, `title`, `service_category`, `city`, `media_url`, `media_type`, `before_after_pair`).
3. Set up Cloudflare Stream or Vercel Blob storage for video hosting.

#### Phase 2: Core Page Engineering (Days 8–18)

4. Build responsive layout shell (Header, Mobile Sticky CTA Bar, Footer with SAB schema).
5. Develop hero section supporting poster-first fallbacks and muted auto-looping WebM/MP4 videos.
6. Build 5 dedicated flagship service routes (`/garage-doors`, `/faux-wood-blinds`, `/motorized-patio-screens`, `/media-walls`, `/christmas-light-installation`).
7. Create interactive HTML5 Before/After comparison slider component.

#### Phase 3: SEO, Schema & GBP Optimization (Days 19–25)

8. Implement JSON-LD `HomeAndConstructionBusiness` structured data across all service pages with `areaServed` geographic arrays.
9. Audit Google Business Profile: hide street address, set 20 target municipal service areas, update sub-services list.
10. Generate dynamic `sitemap.ts` and `robots.ts` files ensuring indexability of query-based gallery tags.

#### Phase 4: Testing & Deployment (Days 26–30)

11. Run Lighthouse and Core Web Vitals audits to guarantee **LCP $\le$ 2.5s** on mobile connections.
12. Configure automated Google Review post-service SMS review request campaign.
13. Submit updated XML sitemap to Google Search Console and Bing Webmaster Tools.