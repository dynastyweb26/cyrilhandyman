import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site, todo } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "TODO_CONTENT — about description: who Cyril Handyman & Door LLC is and how the crew works.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A local crew that finishes what it starts"
        intro={<>{site.tagline} — {site.nap.locality}, {site.nap.region}.</>}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-page gap-12 px-page-x py-section lg:grid-cols-2 lg:gap-16 lg:px-page-x-lg lg:py-section-lg">
          <div className="space-y-4 text-muted">
            <p>
              Cyril Handyman &amp; Door LLC started with door work and grew into the renovation and
              finish work that surrounds it — media walls, kitchens, flooring and paint. The crew
              still treats every job the same way: agree the scope, protect the room, and finish it
              properly.
            </p>
            <p>
              Most of our work comes from repeat customers and neighbours in {site.county}. That is
              the whole marketing plan.
            </p>
            <p className="text-small">{todo("owner story, year founded, crew size")}</p>
            <p className="text-small">{site.nap.license}</p>
            <p className="text-small">{site.nap.response}</p>
          </div>
          <div className="border border-line bg-bone p-6 lg:p-8">
            <h2 className="font-display text-body font-semibold uppercase tracking-[0.08em] text-ink">
              Get in touch
            </h2>
            <dl className="mt-4 space-y-3 text-small">
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted">
                  Phone
                </dt>
                <dd>
                  <a href={`tel:${site.phone.tel}`} className="text-ink hover:text-red">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted">
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-ink hover:text-red">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted">
                  Area
                </dt>
                <dd className="text-ink">
                  {site.nap.locality}, {site.nap.region} — {site.nap.serviceRadius}
                </dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="mt-6 inline-flex bg-red px-5 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
