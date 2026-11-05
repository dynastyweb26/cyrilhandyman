import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { GalleryCard } from "@/components/GalleryCard";
import type { City } from "@/data/cities";
import type { GalleryProject } from "@/data/gallery";

/**
 * "Recent work in {City}" band. With no tagged projects it collapses to
 * LocalWorkEmpty and the before/after slider is left out entirely.
 */
export function LocalWorkModule({
  city,
  projects,
}: {
  city: City;
  projects: GalleryProject[];
}) {
  const hasProjects = projects.length > 0;

  return (
    <section
      aria-labelledby="local-work-heading"
      className="border-t-[6px] border-red bg-coal px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 md:gap-12">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[72px]">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
              Only in {city.name.toUpperCase()}
            </p>
            <h2
              id="local-work-heading"
              className="m-0 font-display text-[40px] font-extrabold leading-[0.92] tracking-[-0.04em] text-bone md:text-[84px]"
            >
              Recent work{" "}
              <span className="font-accent font-normal italic text-red-soft">in {city.name}.</span>
            </h2>
          </div>
          <div className="border-l border-edge pl-5">
            <h3 className="m-0 mb-3 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-muted">
              What we see in {city.name.toUpperCase()}
            </h3>
            <p className="m-0 font-accent text-[19px] italic leading-[1.45] text-bone md:text-[23px]">
              {city.see}
            </p>
          </div>
        </div>

        {hasProjects ? (
          <div className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <GalleryCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="aspect-[21/9] w-full">
              <BeforeAfter
                slotId={city.slug}
                beforeSlot="[ BEFORE · 1600×1370 ]"
                afterSlot={`[ AFTER · same ${city.name} job ]`}
              />
            </div>
            <Link
              href="/gallery"
              className="inline-flex min-h-11 items-center self-start border-b-2 border-red text-[16px] font-bold leading-none text-bone hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red-soft"
            >
              All {city.name} projects in the gallery →
            </Link>
          </div>
        ) : (
          <LocalWorkEmpty city={city} />
        )}
      </div>
    </section>
  );
}

/** Empty state: same size as the populated module, no before/after. */
export function LocalWorkEmpty({ city }: { city: City }) {
  return (
    <div className="grid items-center gap-5 border border-dashed border-[#4A4A50] p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-x-12 md:p-11">
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[13px] leading-[1.5] text-bone">
          [ PLACEHOLDER: first {city.name} project ]
        </span>
        <p className="m-0 text-[15px] leading-[1.6] text-muted-soft">
          Cards and a before/after appear here once a {city.name} job is tagged in the gallery.
          Until then this module stays this size.
        </p>
      </div>
      <Link
        href="/gallery"
        className="inline-flex min-h-11 items-center justify-self-start border-b-2 border-red text-[16px] font-bold leading-none text-bone hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red-soft"
      >
        See projects from nearby towns →
      </Link>
    </div>
  );
}
