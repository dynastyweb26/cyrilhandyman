import Link from "next/link";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { SiteLogo } from "@/components/site-logo";
import { cities, cityHref, nav, site } from "@/data/site";

/**
 * Sticky site header. The Areas dropdown and the mobile menu are CSS/native
 * <details> only — no client JavaScript, so they work before hydration.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-gutter px-page-x lg:h-20 lg:px-page-x-lg">
        <SiteLogo priority />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) =>
              item.cities ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex h-20 items-center gap-1.5 font-display text-small font-medium uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ChevronDownIcon className="transition-transform group-hover:rotate-180 motion-reduce:transition-none" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 border border-line-dark bg-charcoal p-1 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul>
                      {cities.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={cityHref(city)}
                            className="block px-3 py-2 text-small text-white/80 transition-colors hover:bg-ink hover:text-white"
                          >
                            {city.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/service-areas"
                      className="mt-1 block border-t border-line-dark px-3 pb-2 pt-3 text-eyebrow font-semibold uppercase tracking-[0.16em] text-red-on-dark"
                    >
                      All service areas
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-20 items-center font-display text-small font-medium uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 bg-red px-4 py-2.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover md:flex"
          >
            <PhoneIcon />
            {site.phone.display}
          </a>

          {/* Mobile menu (CSS only) */}
          <details className="group lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center border border-white/25 text-white [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="group-open:hidden" />
              <span className="hidden text-eyebrow font-semibold uppercase tracking-[0.2em] group-open:block">
                Close
              </span>
            </summary>
            <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-dark bg-ink px-page-x pb-8 pt-4">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-line-dark">
                  {nav.map((item) => (
                    <li key={item.href} className="py-1">
                      <Link
                        href={item.href}
                        className="flex min-h-12 items-center font-display text-body font-medium uppercase tracking-[0.14em] text-white"
                      >
                        {item.label}
                      </Link>
                      {item.cities ? (
                        <ul className="mb-3 grid grid-cols-2 gap-x-4">
                          {cities.map((city) => (
                            <li key={city.slug}>
                              <Link
                                href={cityHref(city)}
                                className="block py-2 text-small text-muted-dark transition-colors hover:text-white"
                              >
                                {city.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-6 flex items-center justify-center gap-2 bg-red px-4 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white"
              >
                <PhoneIcon />
                Call {site.phone.display}
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
