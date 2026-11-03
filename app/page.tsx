import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { cities, cityHref, services, site, todo } from "@/data/site";

export const metadata: Metadata = {
  title: `Handyman & Garage Door Service in ${site.nap.locality}, ${site.nap.region}`,
  description:
    "TODO_CONTENT — 150-character home page description listing the main services and the cities served.",
};

const reasons = [
  {
    title: "Wholehearted work",
    body: "Cyril Handyman & Door LLC is built on doing the job right and leaving the space cleaner than we found it.",
  },
  {
    title: "No job too small",
    body: "A sticking door, a torn-out carpet, a full media wall — the same crew and the same standard.",
  },
  {
    title: "Local to Kaufman County",
    body: `Based in ${site.nap.locality}, working across ${site.county} and the towns around it.`,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-bone">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-24">
          <p className="font-display text-eyebrow font-semibold uppercase text-red">
            {site.nap.locality}, {site.nap.region} &amp; nearby
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-display-2 uppercase text-ink lg:text-5xl">
            Handyman work and garage doors, done wholeheartedly
          </h1>
          <p className="mt-5 max-w-xl text-lead text-muted">
            Repairs, renovations and installations for homeowners across {site.county} — from
            garage doors and media walls to flooring, paint and holiday lighting.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              <PhoneIcon />
              Call {site.phone.display}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-ink/25 px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Get a free quote
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-3 uppercase text-ink">What we do</h2>
          <p className="mt-3 max-w-xl text-muted">
            One crew for the jobs that need a second pair of hands and the ones that need a
            finish carpenter.
          </p>
          <ul className="mt-8 grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li
                key={service.slug}
                className="flex flex-col border border-line bg-white p-5 transition-colors hover:border-ink/30"
              >
                <h3 className="font-display text-body font-semibold uppercase tracking-[0.06em] text-ink">
                  {service.href ? (
                    <Link href={service.href} className="hover:text-red">
                      {service.name}
                    </Link>
                  ) : (
                    service.name
                  )}
                </h3>
                <p className="mt-2 flex-1 text-small text-muted">{service.summary}</p>
                <p className="mt-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-red">
                  {service.href ? (
                    <Link href={service.href} className="inline-flex items-center gap-1.5">
                      View details <ArrowRightIcon width={14} height={14} />
                    </Link>
                  ) : (
                    "Details coming soon"
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-bone">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-gutter">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h3 className="font-display text-body font-semibold uppercase tracking-[0.08em] text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2 text-small text-muted">{reason.body}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-14 font-display text-display-3 uppercase text-ink">Where we work</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={cityHref(city)}
                  className="inline-flex border border-line bg-white px-3 py-1.5 text-small text-ink transition-colors hover:border-ink/40"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-small text-muted">{todo("note about jobs outside these cities")}</p>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-page-x py-section sm:flex-row sm:items-center sm:justify-between lg:px-page-x-lg lg:py-16">
          <div>
            <h2 className="font-display text-display-3 uppercase text-white">
              Tell us what you&rsquo;re planning
            </h2>
            <p className="mt-2 max-w-lg text-muted-dark">
              Send a photo and a rough idea of the space — we&rsquo;ll come back with a price and a
              date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              <PhoneIcon />
              {site.phone.display}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
