import Link from "next/link";
import { GalleryCard } from "@/components/GalleryCard";
import type { GalleryProject } from "@/data/gallery";

/**
 * Server-rendered marquee: two rows drifting in opposite directions.
 * The duplicate set is aria-hidden and untabbable so screen readers and
 * keyboard users only meet each card once.
 */
export function GalleryMarquee({
  rowA,
  rowB,
}: {
  rowA: GalleryProject[];
  rowB: GalleryProject[];
}) {
  return (
    <section
      aria-labelledby="gallery-strip-heading"
      className="border-t border-hair bg-ink py-14 text-bone md:py-[112px]"
    >
      <div className="mx-auto mb-10 flex w-full max-w-[1328px] flex-col gap-5 px-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-12 md:px-14">
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft md:mb-5 md:text-[13px]">
            The gallery
          </p>
          <h2
            id="gallery-strip-heading"
            className="font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] md:text-[72px]"
          >
            See the work{" "}
            <span className="font-accent text-[42px] font-normal italic leading-none tracking-[-0.01em] text-red-soft md:text-[78px]">
              before you call.
            </span>
          </h2>
        </div>
        <p className="m-0 max-w-[340px] text-[16px] leading-[1.55] text-muted md:mb-2">
          Every project has its own page with photos, the city and what was done. Hover to pause.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 md:gap-6">
        <Row projects={rowA} reverse={false} />
        <Row projects={rowB} reverse />
      </div>

      <div className="mx-auto mt-7 flex w-full max-w-[1328px] flex-col gap-4 px-5 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-8 md:px-14">
        <ul
          aria-label="Filter the gallery by service"
          className="flex list-none gap-2 overflow-x-auto p-0 md:flex-wrap md:gap-2.5 md:overflow-visible"
        >
          {["Garage doors", "Blinds", "Patio screens", "Media walls", "Christmas lights"].map(
            (label) => (
              <li key={label} className="flex-none">
                <Link
                  href={`/gallery?service=${label.toLowerCase().replace(/ /g, "-")}`}
                  className="inline-flex h-11 items-center rounded-full border border-edge px-[18px] text-[14px] font-semibold leading-none text-bone transition-colors duration-150 hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-red md:h-11 md:px-5 md:text-[15px]"
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link
          href="/gallery"
          className="flex h-14 items-center justify-center bg-red px-7 text-[16px] font-bold leading-none text-white transition-colors duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-14"
        >
          Open the full gallery →
        </Link>
      </div>
    </section>
  );
}

function Row({ projects, reverse }: { projects: GalleryProject[]; reverse: boolean }) {
  return (
    <div
      className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]"
    >
      <div
        className={`flex w-max gap-3.5 pr-3.5 md:gap-6 md:pr-6 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {projects.map((project) => (
          <GalleryCard
            key={project.slug}
            project={project}
            className="w-[270px] flex-none md:w-[360px]"
          />
        ))}
        <div aria-hidden="true" className="marquee-duplicate contents">
          {projects.map((project) => (
            <GalleryCard
              key={`${project.slug}-dup`}
              project={project}
              duplicate
              className="w-[270px] flex-none md:w-[360px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
