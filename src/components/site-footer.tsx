import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { cities, cityHref, services, site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const liveServices = services.filter((service) => service.href);

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-page px-page-x py-14 lg:px-page-x-lg lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-gutter">
          <div>
            <SiteLogo withWordmark={false} />
            <p className="mt-4 font-display text-body font-semibold uppercase tracking-[0.1em]">
              {site.name}
            </p>
            <p className="mt-1 text-small text-muted-dark">{site.tagline}</p>
            <p className="mt-4 text-small text-muted-dark">{site.nap.serviceRadius}</p>
          </div>

          <div>
            <h2 className="font-display text-eyebrow font-semibold uppercase tracking-[0.16em] text-white/70">
              Services
            </h2>
            <ul className="mt-4 space-y-2 text-small">
              <li>
                <Link href="/services" className="text-muted-dark transition-colors hover:text-white">
                  All services
                </Link>
              </li>
              {liveServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href!}
                    className="text-muted-dark transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-eyebrow font-semibold uppercase tracking-[0.16em] text-white/70">
              Service areas
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-small">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={cityHref(city)}
                    className="text-muted-dark transition-colors hover:text-white"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-eyebrow font-semibold uppercase tracking-[0.16em] text-white/70">
              Contact
            </h2>
            <address className="mt-4 space-y-2 text-small not-italic text-muted-dark">
              <p>
                <a href={`tel:${site.phone.tel}`} className="transition-colors hover:text-white">
                  {site.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </p>
              <p>
                {site.nap.locality}, {site.nap.region} — serving {site.county} and nearby
              </p>
              <p>{site.nap.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-dark pt-6 text-small text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
