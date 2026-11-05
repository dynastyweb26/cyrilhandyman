import type { Metadata } from "next";
import Link from "next/link";
import { GalleryCard } from "@/components/GalleryCard";
import { filterSlug, galleryFilters, galleryProjects } from "@/data/gallery";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos, short clips and before-and-afters from handyman and garage door jobs in Forney and the towns around it.",
  path: "/gallery",
});

/** Service chips are plain links, so the grid stays a server component. */
export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const active = service ?? "all";
  const visible =
    active === "all" ? galleryProjects : galleryProjects.filter((p) => filterSlug(p.tag) === active);
  const activeLabel =
    galleryFilters.find((label) => filterSlug(label) === active) ?? "All";

  return (
    <>
      <section aria-labelledby="gallery-heading" className="px-5 pb-10 pt-10 md:px-14 md:pb-16 md:pt-[72px]">
        <div className="mx-auto w-full max-w-[1328px]">
          <nav aria-label="Breadcrumb" className="mb-6 text-[14px] font-medium leading-none text-muted-soft md:mb-8">
            <Link href="/" className="text-body-dark hover:text-white">
              Home
            </Link>{" "}
            <span aria-hidden="true" className="mx-2 text-red">
              /
            </span>
            <span aria-current="page">Gallery</span>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <h1
              id="gallery-heading"
              className="m-0 font-display text-[44px] font-extrabold leading-[0.94] tracking-[-0.04em] text-bone md:text-[104px]"
            >
              The gallery.{" "}
              <span className="font-accent text-[46px] font-normal italic leading-[0.94] tracking-[-0.01em] text-red-soft md:text-[108px]">
                Every job, by town.
              </span>
            </h1>
            <p className="m-0 max-w-[340px] text-[16px] leading-[1.55] text-body-dark md:mb-2.5 md:text-[17px]">
              Photos, short clips and before-and-afters from jobs in Forney and the towns around it. Tap any
              project for the full story.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Projects" className="bg-bone px-5 py-10 text-ink md:px-14 md:pt-14 md:pb-[120px]">
        <div className="mx-auto w-full max-w-[1328px]">
          <div className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between md:gap-8">
            <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2.5">
              {galleryFilters.map((label) => {
                const slug = filterSlug(label);
                const isActive = slug === active;
                return (
                  <Link
                    key={label}
                    href={label === "All" ? "/gallery" : `/gallery?service=${slug}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex h-11 items-center rounded-full border px-5 text-[15px] font-semibold leading-none transition-colors duration-150 hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-red ${
                      isActive
                        ? "border-ink bg-ink text-bone"
                        : "border-ink bg-transparent text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <p aria-live="polite" className="m-0 text-[15px] font-medium leading-none text-muted-ink">
              Showing {visible.length} of [ NN ] projects
              {activeLabel !== "All" ? ` · ${activeLabel}` : ""}
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="columns-1 gap-6 md:columns-3">
              {visible.map((project) => (
                <div key={project.slug} className="mb-6 break-inside-avoid">
                  <GalleryCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <p className="border border-dashed border-ink/25 p-6 text-[15px] leading-[1.6] text-muted-ink">
              TODO_CONTENT — no projects are tagged “{activeLabel}” yet. Real job photos get added
              to the placeholder array before launch.
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <Link
              href="/gallery?page=2"
              className="inline-flex h-14 items-center border-[1.5px] border-ink px-8 text-[16px] font-bold leading-none text-ink transition-colors duration-150 hover:bg-ink hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-red"
            >
              Load more projects
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-cta" className="bg-red px-5 py-14 text-white md:px-14 md:py-[88px]">
        <div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <h2
            id="gallery-cta"
            className="m-0 font-display text-[36px] font-extrabold leading-none tracking-[-0.035em] md:text-[64px]"
          >
            Want one like these?{" "}
            <span className="font-accent text-[38px] font-normal italic leading-none md:text-[68px]">
              Send a photo.
            </span>
          </h2>
          <div className="flex flex-none flex-col gap-3.5 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex h-14 items-center justify-center bg-ink px-7 text-[17px] font-bold leading-none text-white transition-colors hover:bg-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white md:h-[60px]"
            >
              Get a quote →
            </Link>
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex h-14 items-center justify-center border-[1.5px] border-white px-7 text-[17px] font-bold leading-none text-white transition-colors hover:bg-white hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white md:h-[60px]"
            >
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
