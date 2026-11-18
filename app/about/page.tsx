import type { Metadata } from "next";
import Link from "next/link";
import { BrandPanel } from "@/components/BrandPanel";
import { PageHeader } from "@/components/page-header";
import { site } from "@/data/site";
import { publicText } from "@/lib/indexability";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Cyril Handyman & Door | Forney, TX",
  description:
    "Cyril Handyman & Door LLC is a Forney, TX crew doing garage doors, faux wood blinds, patio screens, media walls and Christmas lights. Free on-site estimates.",
  path: "/about",
});

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
          <div className="space-y-4 text-muted-ink">
            {/* Photo of Cyril goes here once he sends it; logo panel until then. */}
            <BrandPanel slot="about-cyril" className="aspect-[4/3] w-full" />
            <p>
              Cyril Handyman &amp; Door LLC is run by Cyril Fotsing: hard-working, and dedicated to
              the job in front of him.
            </p>
            <p>
              The business started with door work and grew into the renovation and
              finish work that surrounds it — media walls, kitchens, flooring and paint. The crew
              still treats every job the same way: agree the scope, protect the room, and finish it
              properly.
            </p>
            <p>
              Most of our work comes from repeat customers and neighbours in {site.serviceRegion}. That is
              the whole marketing plan.
            </p>
            {publicText(site.nap.response) ? (
              <p className="text-small">{publicText(site.nap.response)}</p>
            ) : null}
          </div>
          <div className="border border-line-ink bg-bone p-6 lg:p-8">
            <h2 className="font-display text-body font-semibold uppercase tracking-[0.08em] text-ink">
              Get in touch
            </h2>
            <dl className="mt-4 space-y-3 text-small">
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Phone
                </dt>
                <dd>
                  <a href={`tel:${site.phone.tel}`} className="text-ink hover:text-red">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-ink hover:text-red">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Area
                </dt>
                <dd className="text-ink">
                  {site.nap.locality}, {site.nap.region}
                  {publicText(site.nap.serviceRadius) ? ` — ${publicText(site.nap.serviceRadius)}` : null}
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
