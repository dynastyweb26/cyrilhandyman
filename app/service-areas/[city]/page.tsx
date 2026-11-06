import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/json-ld";
import { LocalWorkModule } from "@/components/LocalWorkModule";
import { NearbyCities } from "@/components/NearbyCities";
import { PromiseBlock } from "@/components/PromiseBlock";
import { QuoteBand } from "@/components/QuoteBand";
import { ServiceTile } from "@/components/ServiceTile";
import { cities, cityHref, getCity } from "@/data/cities";
import { projectsByCity } from "@/data/gallery";
import type { Bento } from "@/data/home";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { hasPendingTags } from "@/lib/indexability";
import { getPublishedReviews } from "@/lib/reviews";
import { breadcrumbSchema, businessSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) {
    return pageMetadata({
      title: "Service area",
      description: "This service area page does not exist.",
      path: "/service-areas",
    });
  }
  return pageMetadata({
    title: city.seo.title,
    description: city.seo.description,
    path: `/service-areas/${city.slug}`,
    // Noindex until every [CYRIL] / [CONFIRM] tag on this page is real copy.
    noIndex: hasPendingTags(city),
  });
}

const tileSpans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const projects = projectsByCity(city.slug);
  const reviews = await getPublishedReviews({ limit: 2, city: city.name });

  const sub = city.homeBase
    ? "Forney is home. This is where we’re based, so for Forney homes the drive is short and the schedule is easy. Garage doors, faux wood blinds, patio screens, media walls and Christmas lights, plus the smaller repairs in between."
    : `Garage doors, faux wood blinds, patio screens, media walls and Christmas lights for ${city.name} homes, booked with one phone call.`;

  const nearNames = city.near.map((nearSlug) => getCity(nearSlug)?.name ?? nearSlug);
  const nearList =
    nearNames.length > 1
      ? `${nearNames.slice(0, -1).join(", ")} and ${nearNames[nearNames.length - 1]}`
      : (nearNames[0] ?? "");

  const faqs = [
    {
      q: city.homeBase ? "Are you based in Forney?" : `Do you travel to ${city.name}?`,
      a: city.homeBase
        ? "Yes. Forney is home base for Cyril Handyman & Door."
        : `Yes. ${city.name} is part of our regular service area and travel isn’t an issue. [CONFIRM]`,
    },
    {
      q: "How do I schedule?",
      a: "Call 945-344-4580. We’ll talk through the job and set a time on the same call. Or send a quote request below and we’ll call you back.",
    },
    {
      q: "How soon can you come out?",
      a: "It depends on the job and the time of year. Call and we’ll give you the earliest time we have. [CONFIRM typical lead time]",
    },
    {
      q: `What areas near ${city.name} do you cover?`,
      a: `We also work in ${nearList}, plus the towns around them.`,
    },
  ];

  const cityFaqSchema = faqSchema(faqs);

  const tiles: Bento[] = services.map((service, index) => ({
    n: String(index + 1).padStart(2, "0"),
    title: `${service.name} in ${city.name}`,
    blurb: service.short,
    href: `/services/${service.slug}`,
    tone: service.tone,
    image: service.tile ? { alt: service.tile.alt, photo: service.tile } : undefined,
  }));

  return (
    <>
      <section aria-labelledby="city-heading" className="px-5 pb-14 pt-10 md:px-14 md:pb-24 md:pt-20">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-[72px]">
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[14px] text-muted">
              <Link href="/service-areas" className="text-body-dark underline underline-offset-[3px] hover:text-white">
                Service areas
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-bone">
                {city.name}
              </span>
            </nav>

            {city.homeBase ? (
              <span className="self-start bg-red px-3 py-2 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-white">
                Home base · Forney, TX
              </span>
            ) : null}

            <h1
              id="city-heading"
              className="m-0 font-display text-[42px] font-extrabold leading-[0.93] tracking-[-0.04em] text-bone text-balance md:text-[88px]"
            >
              Handyman &amp; Door Services in{" "}
              <span className="font-accent font-normal italic tracking-[-0.02em] text-red-soft">
                {city.name}, TX
              </span>
            </h1>

            <p className="m-0 max-w-[560px] text-[17px] leading-[1.55] text-body-dark md:text-[20px]">
              {sub}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex min-h-14 items-center bg-red px-7 text-[18px] font-bold leading-none text-white transition-colors hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-bone"
              >
                Call {site.phone.display}
              </a>
              <Link
                href="#quote"
                className="inline-flex min-h-14 items-center border border-bone px-6 text-[18px] font-bold leading-none text-bone transition-colors hover:bg-bone hover:text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red"
              >
                Request a quote
              </Link>
            </div>

            {city.homeBase ? null : (
              <p className="m-0 flex flex-wrap items-center gap-2.5 text-[14px] leading-[1.4] text-muted">
                <span aria-hidden="true" className="size-2 flex-none bg-red" />
                Serving {city.name} from Forney
                <span className="font-mono text-[11px] leading-[1.5] text-muted-faint">
                  [CONFIRM drive time]
                </span>
              </p>
            )}
          </div>

          <div
            data-slot={`${city.slug}-hero`}
            className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-coal"
          >
            <span className="absolute inset-0 flex items-center justify-center p-5 text-center font-mono text-[12px] leading-[1.6] text-muted-faint">
              [ IMAGE 4:3 · 1600×1200 — a real {city.name} job, finished ]
            </span>
          </div>
        </div>
      </section>

      <PromiseBlock city={city.name} />

      <section aria-labelledby="city-services-heading" className="bg-bone px-5 py-16 text-ink md:px-14 md:py-28">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2
              id="city-services-heading"
              className="m-0 font-display text-[38px] font-extrabold leading-[0.95] tracking-[-0.04em] md:text-[76px]"
            >
              What we do <span className="font-accent font-normal italic text-red">in {city.name}.</span>
            </h2>
            <p className="m-0 max-w-[320px] text-[16px] leading-[1.55] text-muted-ink">
              Each one has its own page with process, FAQs and real projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            {tiles.map((tile, index) => (
              <ServiceTile key={tile.href} tile={tile} className={`${tileSpans[index]} min-h-[240px]`} />
            ))}
          </div>

          <p className="m-0 border-t border-[#D6D0C6] pt-6 text-[16px] leading-[1.5] text-ink/80">
            Also: flooring, painting, cabinet refacing and handyman repairs.{" "}
            <Link href="/services" className="font-bold text-red hover:text-ink">
              See everything →
            </Link>
          </p>
        </div>
      </section>

      <LocalWorkModule city={city} projects={projects} />

      {reviews.length > 0 ? (
        <section aria-labelledby="city-reviews-heading" className="bg-bone px-5 pb-0 pt-16 text-ink md:px-14 md:pt-28">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
            <h2
              id="city-reviews-heading"
              className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
            >
              From {city.name} customers.
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <figure key={review.id} className="m-0 flex flex-col gap-5 bg-sand p-8">
                  <span aria-hidden="true" className="font-accent text-[56px] italic leading-[0.5] text-red">
                    “
                  </span>
                  <blockquote className="m-0 text-[19px] leading-[1.5]">{review.text}</blockquote>
                  <figcaption className="text-[14px] leading-[1.4] text-ink/70">
                    {[review.name, "Google review"].join(" · ")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="city-faq-heading" className="bg-bone px-5 py-16 text-ink md:px-14 md:py-28">
        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-8 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-[72px]">
          <h2
            id="city-faq-heading"
            className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
          >
            Questions from <span className="font-accent font-normal italic text-red">{city.name}.</span>
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <NearbyCities city={city} />

      <QuoteBand city={city.name} heading={`Need something done in ${city.name}?`} sourcePage={cityHref(city)} />

      {/* Same @id as the sitewide business node, narrowed to this city. */}
      <JsonLd
        id="city-business-schema"
        data={businessSchema([`${city.name}, ${site.nap.region}`])}
      />
      {cityFaqSchema ? <JsonLd id="city-faq-schema" data={cityFaqSchema} /> : null}
      <JsonLd
        id="city-breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service areas", path: "/service-areas" },
          { name: city.name, path: `/service-areas/${city.slug}` },
        ])}
      />
    </>
  );
}
