import { cities, services, site } from "@/data/site";
import { hasPendingTags } from "@/lib/indexability";

/**
 * Sitewide business schema.
 *
 * Deliberately no streetAddress: this is a service-area business and the only
 * public location data is the city/region plus the cities served.
 */
export function businessSchema(areaServed?: string[]): Record<string, unknown> {
  const areas = areaServed ?? cities.map((city) => `${city.name}, ${site.nap.region}`);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/`,
    telephone: site.phone.tel,
    email: site.email,
    image: `${site.url}${site.brand.ogImage}`,
    logo: `${site.url}${site.brand.logo.src}`,
    description: `${site.name} is a handyman and door contractor based in ${site.nap.locality}, ${site.nap.region}, serving ${site.serviceRegion}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.nap.locality,
      addressRegion: site.nap.region,
      addressCountry: site.nap.country,
    },
    areaServed: areas.map((name) => ({ "@type": "City", name })),
    knowsAbout: services.map((service) => service.name),
  };
}

/** BreadcrumbList for one trail. Paths are route paths, not absolute URLs. */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

/**
 * FAQPage built from the same array the accordion renders. Questions whose
 * answer still carries a pending tag are left out rather than published.
 */
export function faqSchema(items: { q: string; a: string }[]): Record<string, unknown> | null {
  const usable = items.filter((item) => item.a.trim().length > 0 && !hasPendingTags(item.q, item.a));
  if (usable.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: usable.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Service schema for the five service pages. Provider is the sitewide business. */
export function serviceSchema(service: {
  name: string;
  long: string;
  promise: string;
  slug: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}#service`,
    name: service.long,
    serviceType: service.name,
    description: service.promise,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: cities.map((city) => ({ "@type": "City", name: `${city.name}, ${site.nap.region}` })),
  };
}
