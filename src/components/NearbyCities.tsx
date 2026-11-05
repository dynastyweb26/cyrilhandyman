import Link from "next/link";
import { CityChip } from "@/components/CityChip";
import { cities, cityHref, type City } from "@/data/cities";

/** Neighbouring city links plus the way back to all eight. */
export function NearbyCities({ city }: { city: City }) {
  const near = city.near
    .map((slug) => cities.find((item) => item.slug === slug))
    .filter((item): item is City => Boolean(item));

  return (
    <section aria-labelledby="nearby-heading" className="bg-sand px-5 py-12 text-ink md:px-14 md:py-[72px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-6">
        <h2
          id="nearby-heading"
          className="m-0 font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] md:text-[40px]"
        >
          Near {city.name}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {near.map((item) => (
            <Link
              key={item.slug}
              href={cityHref(item.slug)}
              className="inline-flex min-h-14 items-center gap-4 border border-ink/20 bg-bone px-6 text-[17px] font-bold leading-none text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red md:text-[18px]"
            >
              {item.name}
              <span aria-hidden="true" className="text-red">
                →
              </span>
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="inline-flex min-h-14 items-center px-2 text-[16px] font-semibold leading-none text-ink underline decoration-1 underline-offset-4 hover:text-red focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red"
          >
            All 8 towns
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Kept beside NearbyCities so the hub can use the same chip styling. */
export { CityChip };
