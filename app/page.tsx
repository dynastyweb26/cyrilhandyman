import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CityChip } from "@/components/CityChip";
import { Faq } from "@/components/Faq";
import { GalleryMarquee } from "@/components/GalleryMarquee";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/json-ld";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceTile } from "@/components/ServiceTile";
import { Step } from "@/components/Step";
import { QuoteForm } from "@/components/quote-form";
import { marqueeRowA, marqueeRowB } from "@/data/gallery";
import {
  bentoServices,
  faqs,
  quote,
  reviewsCopy,
  steps,
  whereWeWork,
  whoShowsUp,
} from "@/data/home";
import { cities, cityHref, site } from "@/data/site";
import { getPublishedReviews } from "@/lib/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Garage doors, blinds and patio screens in ${site.nap.locality}, ${site.nap.region}`,
  description:
    "Handyman and home improvement in Forney, TX and the towns around it. Garage doors, faux wood blinds, patio screens, media walls and Christmas lights. Same crew on every job.",
  path: "/",
});

export const revalidate = 600;

const container = "mx-auto w-full max-w-[1328px] px-5 md:px-14";
const eyebrow =
  "mb-3.5 text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft md:mb-5 md:text-[13px]";

/** Bento sizing: 7+5 on the first row, 4+4+4 under it (mobile stacks 1-2-2-1-1). */
const bentoLayout = [
  "col-span-2 h-[400px] md:col-span-7 md:h-[540px]",
  "col-span-1 h-[220px] md:col-span-5 md:h-[540px]",
  "col-span-1 h-[220px] md:col-span-4 md:h-[440px]",
  "col-span-2 h-[200px] md:col-span-4 md:h-[440px]",
  "col-span-2 h-[200px] md:col-span-4 md:h-[440px]",
];

export default async function HomePage() {
  const reviews = await getPublishedReviews({ limit: 3 });
  const average =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0;

  const reviewSchema =
    reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": `${site.url}/#business`,
          name: site.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average.toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.author_first_name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: review.body,
          })),
        }
      : null;

  return (
    <>
      <Hero />

      <GalleryMarquee rowA={marqueeRowA} rowB={marqueeRowB} />

      {/* Services */}
      <section id="services" aria-labelledby="services-heading" className="bg-bone px-5 py-16 text-ink md:px-14 md:pb-28 md:pt-[120px]">
        <div className="mx-auto w-full max-w-[1328px]">
          <div className="mb-7 md:mb-14 md:flex md:items-end md:justify-between md:gap-12">
            <h2
              id="services-heading"
              className="m-0 font-display text-[42px] font-extrabold leading-none tracking-[-0.035em] md:max-w-[780px] md:text-[76px]"
            >
              Five specialties.{" "}
              <span className="font-accent text-[46px] font-normal italic leading-[0.95] tracking-[-0.01em] text-red md:text-[84px]">
                One crew.
              </span>
            </h2>
            <p className="mt-4 mb-0 max-w-[330px] text-[16px] leading-[1.55] text-muted-ink md:mb-2 md:mt-0">
              Each one has its own page with pricing guidance, process, FAQs and real projects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-12 md:gap-6">
            {bentoServices.map((tile, index) => (
              <ServiceTile key={tile.n} tile={tile} className={bentoLayout[index]} />
            ))}
          </div>

          <p className="mt-6 border-t border-[#D9D4CB] pt-5 text-[15px] leading-[1.5] text-muted-ink-strong md:mt-10 md:pt-7 md:text-[17px]">
            Also: flooring, painting, cabinet refacing and handyman repairs.{" "}
            <Link href="/services" className="font-bold text-red hover:text-ink">
              See everything →
            </Link>
          </p>
        </div>
      </section>

      {/* Before / after — the interactive slider is its own component. */}
      <section aria-labelledby="before-after-heading" className="bg-ink px-5 py-16 md:px-14 md:py-32">
        <div className="mx-auto grid w-full max-w-[1328px] items-center gap-9 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <div>
            <p className={eyebrow}>Before / after</p>
            <h2
              id="before-after-heading"
              className="m-0 font-display text-[36px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[60px]"
            >
              Drag to see the difference.
            </h2>
            <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.5] text-body-dark md:mt-6 md:text-[18px] md:leading-[1.55]">
              Every gallery project can carry a before and after, with the city and service on it
              so you know it was done near you.
            </p>
            <Link
              href="/gallery"
              className="mt-3 inline-flex min-h-11 items-center text-[15px] font-bold leading-none text-red-soft hover:text-bone md:mt-5 md:text-[16px]"
            >
              Browse the gallery →
            </Link>
          </div>

          <div className="aspect-[4/5] w-full md:aspect-[3/2]">
            <BeforeAfter
              slotId="home-ba"
              beforeSlot="[ BEFORE 3:2 · 1800×1200 ]"
              afterSlot="[ AFTER 3:2 · 1800×1200 ]"
              altBefore="[ALT: Before — garage door, city]"
              altAfter="[ALT: After — garage door, city]"
            />
          </div>
        </div>
      </section>

      {/* Who shows up */}
      <section id="about" aria-labelledby="who-heading" className="bg-coal px-5 py-16 md:px-14 md:py-32">
        <div className="mx-auto grid w-full max-w-[1328px] items-center gap-6 md:grid-cols-2 md:gap-[88px]">
          <div
            data-slot={whoShowsUp.image.slot}
            className="relative aspect-square w-full overflow-hidden border border-line bg-ink"
          >
            <span className="absolute inset-0 flex items-center justify-center p-5 text-center font-mono text-[10px] leading-[1.5] text-muted-faint md:p-6 md:text-[11px]">
              {whoShowsUp.image.label}
            </span>
          </div>
          <div>
            <p className={eyebrow}>{whoShowsUp.eyebrow}</p>
            <h2
              id="who-heading"
              className="mb-6 mt-0 font-display text-[38px] font-extrabold leading-none tracking-[-0.035em] text-bone md:mb-10 md:text-[68px]"
            >
              {whoShowsUp.title}
            </h2>
            <dl className="m-0">
              {whoShowsUp.rows.map((row, index) => (
                <div
                  key={row.term}
                  className={`border-t border-line py-5 md:py-7 ${
                    index === whoShowsUp.rows.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="text-[18px] font-semibold leading-[1.3] text-bone md:text-[21px]">
                    {row.term}
                  </dt>
                  <dd className="mt-1.5 mb-0 text-[15px] leading-[1.5] text-muted md:mt-2 md:text-[17px]">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How a job goes */}
      <section aria-labelledby="how-heading" className="bg-ink px-5 py-16 md:px-14 md:py-32">
        <div className="mx-auto w-full max-w-[1328px]">
          <h2
            id="how-heading"
            className="mb-7 mt-0 font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] text-bone md:mb-14 md:text-[72px]"
          >
            How a job goes.{" "}
            <span className="font-accent text-[42px] font-normal italic leading-none tracking-[-0.01em] text-red-soft md:text-[78px]">
              Start to clean-up.
            </span>
          </h2>
          <ol className="m-0 grid list-none grid-cols-1 p-0 md:grid-cols-4 md:border-t md:border-line">
            {steps.map((step) => (
              <Step key={step.n} n={step.n} title={step.title} body={step.body} />
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="bg-ink px-5 pb-12 pt-16 md:px-14 md:pb-[104px] md:pt-32"
      >
        <div className="mx-auto w-full max-w-[1328px]">
          <div className="mb-6 md:mb-11 md:flex md:items-end md:justify-between md:gap-8">
            <h2
              id="reviews-heading"
              className="m-0 font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] text-bone md:text-[68px]"
            >
              {reviewsCopy.title}
            </h2>
            <div className="mt-4 text-left md:mt-0 md:text-right">
              <p className="m-0 flex items-center gap-2.5 text-red-soft md:justify-end md:gap-3">
                <span className="font-display text-[30px] font-extrabold leading-none md:text-[44px]">
                  {reviews.length > 0 ? average.toFixed(1) : reviewsCopy.average}
                </span>
                <span aria-label="Rating out of five" className="text-[24px] leading-none md:text-[36px]">
                  ★★★★★
                </span>
              </p>
              <p className="mt-2 mb-0 text-[14px] leading-[1.4] text-muted">
                {reviews.length > 0 ? reviews.length : reviewsCopy.count} Google reviews ·{" "}
                <a
                  href={reviewsCopy.profile}
                  rel="noopener"
                  className="font-semibold text-red-soft hover:text-bone"
                >
                  Read them all
                </a>
              </p>
            </div>
          </div>

          <ul className="-mx-5 flex list-none gap-3 overflow-x-auto px-5 pb-2 [scroll-padding:0_20px] [scroll-snap-type:x_mandatory] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {reviews.length > 0
              ? reviews.map((review) => (
                  <li
                    key={review.id}
                    className="w-[300px] flex-none [scroll-snap-align:start] md:w-auto"
                  >
                    <ReviewCard
                      card={{
                        rating: review.rating,
                        body: review.body,
                        meta: [review.author_first_name, review.city, review.service]
                          .filter(Boolean)
                          .join(" · "),
                        source: review.source,
                        area: `${review.rating} out of 5 stars`,
                        reviewUrl: review.review_url,
                      }}
                      compact
                    />
                  </li>
                ))
              : [0, 1, 2].map((slot) => (
                  <li key={slot} className="w-[300px] flex-none [scroll-snap-align:start] md:w-auto">
                    <ReviewCard
                      card={{
                        rating: 5,
                        body: reviewsCopy.placeholderBody,
                        meta: reviewsCopy.placeholderMeta,
                        area: "[ N ] out of 5 stars",
                      }}
                      compact
                    />
                  </li>
                ))}
          </ul>

          {reviews.length === 0 ? (
            <p className="mt-4 text-[13px] leading-[1.5] text-muted-faint">
              TODO_CONTENT — real Google reviews are added to the reviews table before launch.
              Nothing above is invented copy.
            </p>
          ) : null}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-t border-hair bg-ink px-5 py-16 md:px-14 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-[1328px] items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <div className="md:sticky md:top-8 md:flex md:flex-col">
            <p className={eyebrow}>FAQ</p>
            <h2
              id="faq-heading"
              className="m-0 font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] text-bone md:text-[68px]"
            >
              Questions,{" "}
              <span className="font-accent text-[44px] font-normal italic leading-none tracking-[-0.01em] text-red-soft md:text-[74px]">
                answered.
              </span>
            </h2>
            <p className="mt-3.5 max-w-[420px] text-[16px] leading-[1.5] text-body-dark md:mt-6 md:mb-10 md:text-[18px] md:leading-[1.55]">
              Straight answers about quotes, timing and how we work.
            </p>
            <div className="mt-6 border border-line bg-coal p-[22px] md:mt-0 md:p-8">
              <p className="m-0 text-[19px] font-semibold leading-[1.3] text-bone md:text-[21px]">
                Still have a question?
              </p>
              <p className="mt-2 mb-[22px] text-[16px] leading-[1.5] text-muted">
                Call or text. A photo of the job helps.
              </p>
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex h-14 items-center justify-center bg-red px-7 text-[16px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone"
              >
                Call {site.phone.display}
              </a>
            </div>
          </div>

          <div>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* Where we work */}
      <section
        aria-labelledby="where-heading"
        className="border-t border-hair bg-ink px-5 py-14 md:px-14 md:pb-32 md:pt-[104px]"
      >
        <div className="mx-auto grid w-full max-w-[1328px] items-center gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <div>
            <p className={eyebrow}>{whereWeWork.eyebrow}</p>
            <h2
              id="where-heading"
              className="mb-6 mt-0 font-display text-[38px] font-extrabold leading-none tracking-[-0.035em] text-bone md:mb-9 md:text-[64px]"
            >
              {whereWeWork.title}
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0 md:gap-2.5">
              {cities.map((city) => (
                <li key={city.slug}>
                  <CityChip name={city.name} href={cityHref(city)} />
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[460px] text-[14px] leading-[1.5] text-muted-soft md:mt-7 md:text-[15px] md:leading-[1.55]">
              {whereWeWork.note}{" "}
              <Link href="/service-areas" className="font-bold text-bone underline underline-offset-[3px] hover:text-white">
                {whereWeWork.noteLink}
              </Link>{" "}
              <span className="font-mono text-[11px] leading-[1.5] text-muted-faint">
                [CONFIRM wording with Cyril]
              </span>
            </p>
          </div>
          <div
            data-slot={whereWeWork.map.slot}
            className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-coal"
          >
            <span className="absolute inset-0 flex items-center justify-center p-5 text-center font-mono text-[10px] leading-[1.5] text-muted-faint md:p-6 md:text-[11px]">
              {whereWeWork.map.label}
            </span>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="bg-red px-5 py-14 text-white md:px-14 md:py-[120px]"
      >
        <div className="mx-auto grid w-full max-w-[1328px] items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <div>
            <p className="mb-3.5 text-[11px] font-bold uppercase leading-none tracking-[0.16em] md:mb-5 md:text-[13px]">
              {quote.eyebrow}
            </p>
            <h2
              id="quote-heading"
              className="m-0 font-display text-[48px] font-extrabold leading-[0.96] tracking-[-0.04em] md:text-[92px] md:leading-[0.95]"
            >
              {quote.titleLead}{" "}
              <span className="font-accent text-[50px] font-normal italic leading-[0.96] tracking-[-0.01em] md:text-[96px] md:leading-[0.95]">
                {quote.titleAccent}
              </span>
            </h2>
            <p className="mt-4.5 max-w-[440px] text-[16px] leading-[1.5] md:mt-8 md:text-[19px] md:leading-[1.55]">
              {quote.body}
            </p>
            <div className="mt-6 flex flex-col gap-1.5 border-t border-white/40 pt-5 md:mt-12 md:pt-7">
              <span className="text-[15px] font-medium leading-[1.4]">{quote.phoneLabel}</span>
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex min-h-12 items-center font-display text-[32px] font-extrabold leading-none tracking-[-0.02em] text-white underline decoration-2 underline-offset-[6px] transition-colors hover:text-ink md:text-[36px]"
              >
                {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center text-[16px] font-medium leading-none hover:underline md:text-[17px]"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="bg-ink p-5 text-bone md:p-10">
            <QuoteForm source="/" tone="dark" />
          </div>
        </div>
      </section>

      {reviewSchema ? <JsonLd id="home-reviews-schema" data={reviewSchema} /> : null}
    </>
  );
}
