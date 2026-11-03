import { cities, services, site } from "@/data/site";

/**
 * Sitewide business schema.
 *
 * Deliberately no streetAddress: this is a service-area business and the only
 * public location data is the city/region plus the cities served.
 */
export function businessSchema(): Record<string, unknown> {
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
    description: `${site.name} is a handyman and door contractor based in ${site.nap.locality}, ${site.nap.region}, serving ${site.county} and the surrounding towns.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.nap.locality,
      addressRegion: site.nap.region,
      addressCountry: site.nap.country,
    },
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: `${city.name}, ${site.nap.region}`,
    })),
    knowsAbout: services.map((service) => service.name),
  };
}
