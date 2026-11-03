import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapRoutes } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
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
