import Link from "next/link";
import { CityChip } from "@/components/CityChip";
import { cities, cityHref } from "@/data/cities";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="px-5 pb-20 pt-20 text-bone md:px-14 md:pb-36 md:pt-[160px]"
    >
      <div className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-7 text-center">
        <span aria-hidden="true" className="font-accent text-[64px] italic leading-none text-red-soft md:text-[96px]">
          404
        </span>

        <h1
          id="not-found-heading"
          className="m-0 font-display text-[44px] font-extrabold leading-[0.92] tracking-[-0.045em] text-bone text-balance md:text-[96px]"
        >
          That page isn’t here.
        </h1>

        <p className="m-0 max-w-[520px] text-[17px] leading-[1.55] text-body-dark md:text-[20px]">
          It may have moved. Start from the homepage, or call and we’ll point you the right way.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center bg-red px-7 text-[18px] font-bold leading-none text-white transition-colors hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-bone"
          >
            Back to home
          </Link>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex min-h-14 items-center border border-bone px-6 text-[18px] font-bold leading-none text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red"
          >
            Call {site.phone.display}
          </a>
        </div>

        <div className="mt-12 grid w-full gap-10 border-t border-hair pt-10 text-left md:grid-cols-2 md:gap-10">
          <div className="flex flex-col">
            <h2 className="mb-2 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
              Services
            </h2>
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`flex min-h-11 items-center text-[17px] font-semibold leading-none text-bone hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red-soft ${
                  index === services.length - 1 ? "" : "border-b border-[#1E1E22]"
                }`}
              >
                {service.name} →
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <h2 className="m-0 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
              Towns we serve
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <CityChip key={city.slug} name={city.name} href={cityHref(city)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
