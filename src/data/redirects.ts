/**
 * Legacy URL inventory → new URL map (301).
 *
 * Source of truth for next.config.ts redirects(). Every entry is a permanent
 * (301) redirect. Keep the old paths exactly as they were published; add new
 * ones from Search Console → Pages before launch.
 *
 * From the audit of dynastyweb26/trustworthy-handyman-site:
 *   /                       /
 *   /services               /services
 *   /blinds                 /services          (blinds are one service line)
 *   /blinds/zebra           /services
 *   /blinds/roller           /services
 *   /blinds/blackout         /services
 *   /blinds/solar-patio-screens /services
 *   /contact                /contact
 *
 * TODO (before launch): when the dedicated blinds page ships, point the
 * /blinds/* rules at it instead of collapsing them into /services.
 */
export type RedirectRule = {
  source: string;
  destination: string;
  /** Explicit 301, so the verb does not depend on Next's 308 default. */
  statusCode: 301;
};

export const redirects: RedirectRule[] = [
  // Blinds section: no equivalent page yet, so fold into the services index.
  { source: "/blinds", destination: "/services", statusCode: 301 },
  { source: "/blinds/:path*", destination: "/services", statusCode: 301 },

  // Legacy entry points seen on the old SPA's catch-all rewrite.
  { source: "/index.html", destination: "/", statusCode: 301 },
  { source: "/home", destination: "/", statusCode: 301 },
];
