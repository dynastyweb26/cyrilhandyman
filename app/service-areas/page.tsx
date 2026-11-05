import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { cities, site, todo } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas",
  description:
    "TODO_CONTENT — description naming the eight cities Cyril Handyman & Door LLC serves.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Service areas"
        title="Where we work"
        intro={
          <>
            Based in {site.nap.locality}, {site.nap.region} and working across {site.county} and
            the surrounding towns.
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-gutter">
            {cities.map((city) => (
              <article key={city.slug} id={city.slug} className="border-t border-line-ink pt-6">
                <h2 className="font-display text-display-3 uppercase text-ink">Handyman in {city.name}, TX</h2>
                <p className="mt-3 text-small text-muted-ink">
                  {todo(`${city.name} intro — 2–3 sentences about the work we do there`)}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-eyebrow font-semibold uppercase tracking-[0.14em]">
                  <a href={`tel:${site.phone.tel}`} className="text-red hover:text-red-hover">
                    Call {site.phone.display}
                  </a>
                  <Link href="/contact" className="text-ink/70 hover:text-ink">
                    Request a quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-small text-muted-ink">{site.nap.serviceRadius}</p>
        </div>
      </section>
    </>
  );
}
