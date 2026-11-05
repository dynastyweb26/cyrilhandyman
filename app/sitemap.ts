import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { absoluteUrl, sitemapRoutes } from "@/data/seo";
import type { SitemapRoute } from "@/data/seo";
import { hasPendingTags } from "@/lib/indexability";

/**
 * The noindex gate applies here too: a city or service page whose data still
 * carries a [CYRIL …] / [PLACEHOLDER …] / [CONFIRM …] tag is not listed until
 * the tag is replaced with real detail.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const generated: SitemapRoute[] = [
    ...cities
      .filter((city) => !hasPendingTags(city))
      .map((city) => ({
        path: `/service-areas/${city.slug}`,
        changeFrequency: "monthly" as const,
        priority: city.homeBase ? 0.8 : 0.6,
      })),
    ...services
      .filter((service) => !hasPendingTags(service))
      .map((service) => ({
        path: `/services/${service.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];

  return [...sitemapRoutes, ...generated].map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images?.map(absoluteUrl),
    videos: route.videos?.map((video) => ({
      ...video,
      thumbnail_loc: absoluteUrl(video.thumbnail_loc),
      content_loc: absoluteUrl(video.content_loc),
    })),
  }));
}
