/**
 * Single source of truth for brand, NAP and the route list.
 *
 * Cities and services live in their own files; this module re-exports them so
 * existing imports keep working. Anything marked TODO_CONTENT is a placeholder
 * the business has to supply before launch — it renders visibly, never hidden
 * behind lorem ipsum.
 */
export { cities, cityHref, cityName, getCity } from "./cities";
export type { City, CitySlug } from "./cities";
export { getService, serviceHref, services } from "./services";
export type { Service, ServiceSlug } from "./services";

export const todo = (what: string): string => `TODO_CONTENT — ${what}`;

export const site = {
  name: "Cyril Handyman & Door LLC",
  shortName: "Cyril Handyman",
  url: "https://crazydoorhandyman.com",
  tagline: "Working Wholeheartedly for the Lord",
  /**
   * Regional wording. The old county-level line was removed on Cyril's
   * instruction; every page uses this line until he confirms his own.
   * [CONFIRM wording with Cyril]
   */
  serviceRegion: "Forney and the towns around it",
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
    serviceRadius: todo("service radius, e.g. \u201cwithin 40 miles of Forney, TX\u201d"),
    hours: todo("hours of operation"),
    response: todo("response time promise, e.g. \u201cwe reply within one business day\u201d"),
  },
  social: {
    googleBusinessProfile: todo("Google Business Profile URL"),
    /** No real profile URLs have been supplied yet; the tags stay visible. */
    facebook: "https://facebook.com/[PLACEHOLDER]",
    instagram: "https://instagram.com/[PLACEHOLDER]",
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
