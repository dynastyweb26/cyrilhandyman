import type { Metadata } from "next";
import Link from "next/link";
import { CityCard } from "@/components/CityCard";
import { CityChip } from "@/components/CityChip";
import { QuoteBand } from "@/components/QuoteBand";
import { cities, cityHref } from "@/data/cities";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas | Forney and the towns around it",
  description:
    "Eight towns, one crew, one phone number. Garage doors, faux wood blinds, patio screens, media walls and Christmas lights across Forney and the towns around it.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <section aria-labelledby="areas-heading" className="px-5 pb-12 pt-12 md:px-14 md:pb-20 md:pt-[112px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6">
          <span className="text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
            Service areas
          </span>
          <h1
            id="areas-heading"
            className="m-0 max-w-[1000px] font-display text-[46px] font-extrabold leading-[0.9] tracking-[-0.045em] text-bone md:text-[116px]"
          >
            Forney and{" "}
            <span className="font-accent font-normal italic tracking-[-0.02em] text-red-soft">
              the towns around it.
            </span>
          </h1>
          <p className="m-0 max-w-[600px] text-[17px] leading-[1.5] text-body-dark md:text-[21px]">
            Eight towns, one crew, one phone number. Pick yours to see the work we do there.{" "}
            <span className="font-mono text-[11px] leading-[1.5] text-muted-faint">
              [CONFIRM wording with Cyril]
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex min-h-14 items-center bg-red px-7 text-[18px] font-bold leading-none text-white transition-colors hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-bone"
            >
              Call {site.phone.display}
            </a>
            <Link
              href="#quote"
              className="inline-flex min-h-14 items-center border border-bone px-6 text-[18px] font-bold leading-none text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="where-heading"
        className="border-t border-hair px-5 py-12 md:px-14 md:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-[72px]">
          <div className="flex flex-col gap-6">
            <h2
              id="where-heading"
              className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] text-bone md:text-[56px]"
            >
              Where we work.
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {cities.map((city) => (
                <CityChip key={city.slug} name={city.name} href={cityHref(city)} />
              ))}
            </div>
            <p className="m-0 max-w-[460px] text-[15px] leading-[1.6] text-muted">
              Each name opens its own page with the work we’ve done in that town. Not on the list?
              Call and ask.
            </p>
          </div>

          <div
            data-slot="service-area-map"
            className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-coal"
          >
            <span className="absolute inset-0 flex items-center justify-center p-5 text-center font-mono text-[12px] leading-[1.6] text-muted-faint">
              [ MAP 4:3 · 1600×1200 — service area shaded, no street address, no pin ]
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="pick-heading" className="bg-sand px-5 py-16 text-ink md:px-14 md:py-28">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
          <h2
            id="pick-heading"
            className="m-0 font-display text-[38px] font-extrabold leading-[0.95] tracking-[-0.04em] md:text-[76px]"
          >
            Pick <span className="font-accent font-normal italic text-red">your town.</span>
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {cities.map((city, index) => (
              <CityCard key={city.slug} city={city} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="every-town-heading" className="px-5 py-14 md:px-14 md:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7">
          <h2
            id="every-town-heading"
            className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[52px]"
          >
            What we do in every town.
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-edge p-0 sm:grid-cols-2 md:grid-cols-5">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex min-h-[120px] flex-col gap-2.5 border-b border-hair py-6 pr-5 text-bone transition-colors hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-soft"
                >
                  <span className="font-accent text-[22px] font-normal italic leading-none text-red-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[24px] font-extrabold leading-[1.05] tracking-[-0.02em]">
                    {service.name} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand sourcePage="/service-areas" />
    </>
  );
}
