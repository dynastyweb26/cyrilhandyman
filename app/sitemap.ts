import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { galleryProjects } from "@/data/gallery";
import { services } from "@/data/services";
import { absoluteUrl, sitemapRoutes } from "@/data/seo";
import type { SitemapRoute } from "@/data/seo";
import { hasPendingTags } from "@/lib/indexability";
import { cityFaqs, serviceSteps, sharedFaqs } from "@/lib/page-copy";

/**
 * The noindex gate applies here too: a city or service page whose data still
 * carries a [CYRIL …] / [PLACEHOLDER …] / [CONFIRM …] tag is not listed until
 * the tag is replaced with real detail.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const generated: SitemapRoute[] = [
    ...cities
      .filter((city) => !hasPendingTags(city, cityFaqs(city)))
      .map((city) => ({
        path: `/service-areas/${city.slug}`,
        changeFrequency: "monthly" as const,
        priority: city.homeBase ? 0.8 : 0.6,
      })),
    ...services
      .filter(
        (service) =>
          !hasPendingTags(
            service,
            sharedFaqs,
            serviceSteps(service.slug === "christmas-light-installation"),
          ),
      )
      .map((service) => ({
        path: `/services/${service.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    // Gallery project pages, only where a real photo exists.
    ...galleryProjects
      .filter((project) => project.photo || (project.before && project.after))
      .map((project) => ({
        path: `/gallery/${project.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.4,
        images: [(project.photo ?? project.after)!.src],
      })),
  ];

  return [...sitemapRoutes, ...generated].map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images?.map(absoluteUrl),
    videos: route.videos?.map((video) => ({
      ...video,
      // Next does not escape video text, and a raw "&" breaks the whole XML file.
      title: escapeXml(video.title),
      description: escapeXml(video.description),
      thumbnail_loc: absoluteUrl(video.thumbnail_loc),
      content_loc: absoluteUrl(video.content_loc),
    })),
  }));
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
