import type { Metadata } from "next";
import { absoluteUrl } from "@/data/seo";
import { site } from "@/data/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical and OG URL. */
  path: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Per-route metadata helper: title goes through the layout's title template,
 * canonical and OG URL are always absolute.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = site.brand.ogImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
