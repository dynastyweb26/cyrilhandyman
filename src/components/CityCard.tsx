import Link from "next/link";
import { cityHref, type City } from "@/data/cities";
import { site } from "@/data/site";

/**
 * Hub card: index, badge, town, intro and the two ways in. The [CONFIRM intro]
 * tag rides along because Cyril still has to supply the local detail.
 */
export function CityCard({ city, index }: { city: City; index: number }) {
  return (
    <article className="flex min-h-[300px] flex-col gap-5 bg-sand p-6 md:p-10">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-accent text-[28px] font-normal italic leading-none text-red">
          {String(index + 1).padStart(2, "0")}
        </span>
        {city.badge ? (
          <span className="text-[12px] font-bold leading-none tracking-[0.14em] text-ink/60">
            {city.badge}
          </span>
        ) : null}
      </div>

      <h3 className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink md:text-[52px]">
        {city.name}
        <span className="ml-0.5 text-[0.5em] tracking-normal text-ink/60">, TX</span>
      </h3>

      <p className="m-0 max-w-[520px] flex-1 text-[16px] leading-[1.6] text-ink/80">
        {city.intro}{" "}
        <span className="font-mono text-[11px] leading-[1.5] text-ink/50">[CONFIRM intro]</span>
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-4">
        <a
          href={`tel:${site.phone.tel}`}
          className="inline-flex min-h-11 items-center text-[16px] font-bold leading-none text-red hover:text-red-hover focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          Call {site.phone.display}
        </a>
        <Link
          href={cityHref(city)}
          className="ml-auto inline-flex min-h-11 items-center text-[16px] font-bold leading-none text-ink hover:text-red focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          See {city.name} →
        </Link>
      </div>
    </article>
  );
}
