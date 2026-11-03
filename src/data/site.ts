/**
 * Single source of truth for brand, NAP and the route list.
 *
 * Anything marked TODO_CONTENT is a placeholder the business has to supply
 * before launch — it is rendered visibly as "TODO_CONTENT — ..." rather than
 * hidden behind lorem ipsum.
 */
export const todo = (what: string): string => `TODO_CONTENT — ${what}`;

export type City = {
  /** Anchor id on /service-areas */
  slug: string;
  name: string;
};

/**
 * The 8 cities in the nav "Areas" dropdown. Each links to its section on
 * /service-areas. Keep this list as the only place cities are defined.
 */
export const cities: City[] = [
  { slug: "forney", name: "Forney" },
  { slug: "mesquite", name: "Mesquite" },
  { slug: "sunnyvale", name: "Sunnyvale" },
  { slug: "rockwall", name: "Rockwall" },
  { slug: "heath", name: "Heath" },
  { slug: "terrell", name: "Terrell" },
  { slug: "crandall", name: "Crandall" },
  { slug: "kaufman", name: "Kaufman" },
];

export type Service = {
  slug: string;
  name: string;
  /** One-line description used on cards. */
  summary: string;
  /** Omitted while the page does not exist yet, so nothing 404s. */
  href?: string;
  status: "live" | "planned";
};

export const services: Service[] = [
  {
    slug: "christmas-light-installation",
    name: "Christmas Light Installation",
    summary:
      "Commercial-grade holiday lighting designed, installed, maintained and taken down for homes and storefronts.",
    href: "/services/christmas-light-installation",
    status: "live",
  },
  {
    slug: "garage-doors",
    name: "Garage Doors",
    summary:
      "Garage door repair, new installation and opener replacement — the shop's specialty.",
    status: "planned",
  },
  {
    slug: "media-walls",
    name: "Media Walls",
    summary: "Custom built-in entertainment walls and shelving, built and trimmed on site.",
    status: "planned",
  },
  {
    slug: "kitchen-renovation",
    name: "Kitchen Renovation",
    summary: "Cabinet refacing and painting, countertops, backsplash and tile work.",
    status: "planned",
  },
  {
    slug: "accent-walls",
    name: "Accent Walls",
    summary: "Slat, panel and painted feature walls that add depth to a room.",
    status: "planned",
  },
  {
    slug: "flooring",
    name: "Flooring & Carpet Removal",
    summary: "LVP and tile installation, plus tear-out and disposal of old carpet.",
    status: "planned",
  },
  {
    slug: "interior-painting",
    name: "Interior Painting",
    summary: "Walls, trim and cabinetry painted clean, with proper prep.",
    status: "planned",
  },
  {
    slug: "window-blinds",
    name: "Window Blinds & Shades",
    summary:
      "Custom zebra, roller, blackout and solar patio shades measured and installed.",
    status: "planned",
  },
];

export const site = {
  name: "Cyril Handyman & Door LLC",
  shortName: "Cyril Handyman",
  url: "https://crazydoorhandyman.com",
  tagline: "Working Wholeheartedly for the Lord",
  county: "Kaufman County",
  phone: {
    display: "945-344-4580",
    /** E.164 for tel: links and schema. */
    tel: "+19453444580",
  },
  email: "crazydoor04@gmail.com",
  brand: {
    /**
     * The shop's real logo: transparent PNG, black mark with white lettering,
     * so it sits directly on the dark chrome with no white chip behind it.
     * Swap for the SVG when the vector exists.
     */
    logo: {
      src: "/brand/logo-transparent.png",
      width: 1448,
      height: 1086,
      alt: "Cyril Handyman & Door LLC",
    },
    ogImage: "/og-image.png",
  },
  /**
   * Service-area business: the public NAP has no street address. Schema and
   * the footer both intentionally omit it.
   */
  nap: {
    locality: "Forney",
    region: "TX",
    regionName: "Texas",
    country: "US",
    serviceRadius: todo("service radius, e.g. “within 40 miles of Forney, TX”"),
    hours: todo("hours of operation"),
    response: todo("response time promise, e.g. “we reply within one business day”"),
  },
  social: {
    googleBusinessProfile: todo("Google Business Profile URL"),
  },
};

/** Primary nav. "Areas" is the only dropdown; Blog stays hidden until it ships. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas", cities: true as const },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Routes that exist in the plan but are intentionally not in the nav yet.
 * Also excluded from app/sitemap.ts and disallowed in app/robots.ts.
 */
export const hiddenNav = [{ label: "Blog", href: "/blog" }];

export const cityHref = (city: City): string => `/service-areas#${city.slug}`;
