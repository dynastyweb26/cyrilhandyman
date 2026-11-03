import { media } from "./media";
import { site } from "./site";

/** Absolute URL helper — sitemap entries must be absolute. */
export const absoluteUrl = (path: string): string => new URL(path, site.url).toString();

export type SitemapVideo = {
  title: string;
  thumbnail_loc: string;
  description: string;
  content_loc: string;
  /** seconds */
  duration?: number;
};

export type SitemapRoute = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: string[];
  videos?: SitemapVideo[];
};

/**
 * One data file drives app/sitemap.ts and app/robots.ts.
 * Routes here must exist; Blog is intentionally absent until it ships.
 */
export const sitemapRoutes: SitemapRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    images: [media.hero.posterSrc],
    videos: [
      {
        title: "Cyril Handyman & Door LLC — garage door and handyman work",
        thumbnail_loc: media.hero.posterSrc,
        description: media.hero.description,
        content_loc: media.hero.videoSrc,
      },
    ],
  },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  {
    // No Christmas photo or video assets exist yet, so no image/video entries.
    // TODO_CONTENT: add gallery/still entries once the install photos land.
    path: "/services/christmas-light-installation",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/service-areas", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export const robotsPolicy = {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      // Blog is planned but not built; keep crawlers off until it exists.
      disallow: ["/blog", "/api/"],
    },
  ],
  sitemap: absoluteUrl("/sitemap.xml"),
  host: site.url,
};
