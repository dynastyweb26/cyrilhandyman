import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "@/components/icons";
import { QuoteForm } from "@/components/quote-form";
import { christmas } from "@/data/christmas-lights";
import { cities, cityHref, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Christmas Light Installation",
  description:
    "Christmas light installation, in-season maintenance and takedown for homes and small businesses in Forney, Mesquite, Rockwall, Terrell and the surrounding North Texas towns. Flat quote per property.",
  path: "/services/christmas-light-installation",
});

export default function ChristmasLightInstallationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-line-dark bg-ink text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-24">
          <p className="font-display text-eyebrow font-semibold uppercase text-red-on-dark">
            {christmas.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-display-1 uppercase text-white lg:text-5xl">
            {christmas.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-white/85">{christmas.hero.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              Get a Christmas light quote
              <ArrowRightIcon />
            </Link>
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <PhoneIcon />
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* Quick answer */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="font-display text-eyebrow font-semibold uppercase text-red-on-dark">
                {christmas.quickAnswer.label}
              </p>
              <h2 className="mt-3 font-display text-display-3 uppercase text-white">
                {christmas.quickAnswer.question}
              </h2>
              <p className="mt-4 text-lead text-white/80">{christmas.quickAnswer.answer}</p>
              <p className="mt-4 text-small text-white/60">{christmas.quickAnswer.price}</p>
            </div>
            <ul className="space-y-3 border-l border-line-dark pl-6">
              {christmas.quickAnswer.points.map((point) => (
                <li key={point} className="flex gap-3 text-small text-white/80">
                  <CheckIcon className="mt-0.5 shrink-0 text-red-on-dark" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-ink text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-2 uppercase text-white">Season packages</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Three ways to book. Each one is one flat price for the season, including takedown.
          </p>
          <ul className="mt-10 grid gap-gutter md:grid-cols-3">
            {christmas.packages.map((pkg) => (
              <li
                key={pkg.name}
                className={`flex flex-col border p-6 ${
                  pkg.featured ? "border-red bg-charcoal" : "border-line-dark bg-charcoal/40"
                }`}
              >
                {pkg.featured ? (
                  <p className="mb-3 font-display text-eyebrow font-semibold uppercase text-red-on-dark">
                    Most booked
                  </p>
                ) : null}
                <h3 className="font-display text-display-3 uppercase text-white">{pkg.name}</h3>
                <p className="mt-2 text-small text-white/70">{pkg.tagline}</p>
                <p className="mt-5 font-display text-body font-semibold text-white">{pkg.price}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-small text-white/75">
                      <CheckIcon className="mt-0.5 shrink-0 text-red-on-dark" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-between border border-white/25 px-4 py-3 font-display text-eyebrow font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  Book this
                  <ArrowRightIcon width={14} height={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What affects price */}
      <section id="pricing" className="bg-charcoal text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-2 uppercase text-white">
            What changes the price
          </h2>
          <p className="mt-3 max-w-xl text-white/70">
            Six things decide the number. Knowing them before we quote keeps the quote accurate.
          </p>
          <dl className="mt-10 grid gap-x-gutter gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {christmas.priceFactors.map((factor) => (
              <div key={factor.title} className="border-t border-line-dark pt-4">
                <dt className="font-display text-body font-semibold uppercase tracking-[0.06em] text-white">
                  {factor.title}
                </dt>
                <dd className="mt-2 text-small text-white/70">{factor.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Booking cutoff banner */}
      <section className="bg-ink">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-14">
          <div className="border border-red bg-red/10 p-6 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-8">
            <div>
              <p className="font-display text-eyebrow font-semibold uppercase text-red-on-dark">
                {christmas.cutoff.label}
              </p>
              <p className="mt-2 font-display text-display-3 uppercase text-white">
                {christmas.cutoff.headline}
              </p>
              <p className="mt-2 max-w-2xl text-small text-white/75">{christmas.cutoff.body}</p>
            </div>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-5 inline-flex shrink-0 items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover lg:mt-0"
            >
              <PhoneIcon />
              Claim a date
            </a>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section id="gallery" className="bg-charcoal text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-3 uppercase text-white">Recent installs</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Photos are placeholders until the season&rsquo;s installs are photographed.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-gutter md:grid-cols-3">
            {christmas.gallery.map((item) => (
              <li key={item.expectedPath}>
                <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-line-dark bg-ink/60 p-3 text-center">
                  <span className="text-eyebrow uppercase tracking-[0.1em] text-white/40">
                    TODO_CONTENT — drop photo at {item.expectedPath}
                  </span>
                </div>
                <p className="mt-2 text-small text-white/70">{item.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we install */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
            <div>
              <h2 className="font-display text-display-3 uppercase text-white">
                {christmas.where.headline}
              </h2>
              <p className="mt-3 text-white/70">{christmas.where.body}</p>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={cityHref(city)}
                    className="flex h-full items-center justify-center border border-line-dark px-3 py-3 text-center font-display text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:border-white hover:text-white"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="bg-charcoal text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-3 uppercase text-white">
            Christmas light questions
          </h2>
          <div className="mt-8 max-w-3xl border-t border-line-dark">
            {christmas.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line-dark py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-body font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDownIcon className="mt-1 shrink-0 text-red-on-dark transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="mt-3 pr-8 text-small text-white/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <h2 className="font-display text-display-3 uppercase text-white">
            {christmas.reviews.headline}
          </h2>
          <p className="mt-3 max-w-xl text-small text-red-on-dark">{christmas.reviews.note}</p>
          <ul className="mt-8 grid gap-gutter md:grid-cols-3">
            {christmas.reviews.items.map((review) => (
              <li
                key={review.quote}
                className="border border-dashed border-line-dark p-5 text-small text-white/45"
              >
                <p>{review.quote}</p>
                <p className="mt-4">{review.name}</p>
                <p>{review.city}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="quote" className="bg-ink text-white">
        <div className="mx-auto grid max-w-page gap-10 px-page-x py-section lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-page-x-lg lg:py-20">
          <div>
            <h2 className="font-display text-display-3 uppercase text-white">
              Get your season on the calendar
            </h2>
            <p className="mt-3 text-white/70">
              Send the property address and a photo of the front elevation. We&rsquo;ll quote the
              roofline and hold a date.
            </p>
            <p className="mt-4 text-small text-white/55">{christmas.cutoff.headline}</p>
          </div>
          <div className="border border-line-dark bg-charcoal p-6 lg:p-8">
            <QuoteForm source="/services/christmas-light-installation" tone="dark" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line-dark bg-charcoal text-white">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-page-x py-section sm:flex-row sm:items-center sm:justify-between lg:px-page-x-lg lg:py-16">
          <div>
            <h2 className="font-display text-display-3 uppercase text-white">
              Get your season on the calendar
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Send the property address and a photo of the front elevation and we&rsquo;ll price the
              roofline from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              Request a quote
              <ArrowRightIcon />
            </Link>
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <PhoneIcon />
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
