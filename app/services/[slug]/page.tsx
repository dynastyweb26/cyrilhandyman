import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CityChip } from "@/components/CityChip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/json-ld";
import { QuoteBand } from "@/components/QuoteBand";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceTile } from "@/components/ServiceTile";
import { StepList } from "@/components/StepList";
import { TrustStrip } from "@/components/TrustStrip";
import { cities, cityHref } from "@/data/cities";
import { projectsByService } from "@/data/gallery";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { hasPendingTags } from "@/lib/indexability";
import { getPublishedReviews } from "@/lib/reviews";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return pageMetadata({
      title: "Services",
      description: "This service page does not exist.",
      path: "/services",
    });
  }
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    // Noindex until every [CONFIRM] tag on this page is real copy.
    noIndex: hasPendingTags(service),
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isChristmas = service.slug === "christmas-light-installation";
  const projects = projectsByService(service.slug);
  const photos = projects.filter((project) => project.photo);
  const reviews = await getPublishedReviews({ limit: 3, service: service.slug });

  const shared = [
    {
      q: "Do you work in my town?",
      a: "We cover Forney, Mesquite, Sunnyvale, Rockwall, Terrell, Crandall, Garland and Frisco. Somewhere close by? Call and ask.",
    },
    {
      q: "How do I schedule?",
      a: "Call 945-344-4580. We’ll talk through the job and set a time on the same call.",
    },
    {
      q: "How soon can you come out?",
      a: "It depends on the job and the season. Call and we’ll give you our earliest time. [CONFIRM typical lead time]",
    },
  ];

  const faqs = [...shared.slice(0, 2), ...service.faqs, ...shared.slice(2)];
  const serviceFaqSchema = faqSchema(faqs);

  const steps = [
    { t: "Call or request a quote", d: "Call 945-344-4580 or send the form. Tell us what you need." },
    {
      t: isChristmas ? "We plan the design" : "We take a look",
      d: isChristmas
        ? "Roofline, trees, windows: we agree on the look with you. [CONFIRM]"
        : "We come out, measure and talk options. [CONFIRM on-site estimate]",
    },
    { t: "Pick a day", d: "We set the install date by phone. No portals." },
    {
      t: isChristmas ? "Hung, kept lit, taken down" : "We install",
      d: isChristmas
        ? "We hang everything, fix anything that goes out, and take it down after the season."
        : "Installed, cleaned up and checked with you before we leave.",
    },
  ];

  const related = services.filter((item) => item.slug !== service.slug);

  const why = [
    { title: "Your satisfaction first", body: "The job isn’t done until you’re happy with it." },
    { title: "We aim to be on time", body: "When we give you a time, we work to keep it." },
    { title: "Travel isn’t an issue", body: "Forney, Frisco or anywhere between on our list." },
    { title: "Simple scheduling", body: "One phone call and you’re on the calendar." },
  ];

  return (
    <>
      <section aria-labelledby="service-heading" className="px-5 pb-14 pt-8 md:px-14 md:pb-20 md:pt-[72px]">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-9 md:grid-cols-2 md:gap-[72px]">
          <div className="flex flex-col gap-5">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[14px] text-muted">
              <Link href="/services" className="text-body-dark underline underline-offset-[3px] hover:text-white">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-bone">
                {service.name}
              </span>
            </nav>

            <h1
              id="service-heading"
              className="m-0 font-display text-[40px] font-extrabold leading-[0.93] tracking-[-0.04em] text-bone text-balance md:text-[84px]"
            >
              {service.long}{" "}
              <span className="font-accent font-normal italic tracking-[-0.02em] text-red-soft">
                in Forney, TX &amp; North Texas
              </span>
            </h1>

            <p className="m-0 max-w-[540px] text-[18px] leading-[1.5] text-body-dark md:text-[21px]">
              {service.promise}
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

            <TrustStrip />
          </div>

          {service.hero ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-coal">
              <Image
                src={service.hero.src}
                alt={service.hero.alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: service.hero.position ?? "50% 50%" }}
              />
            </div>
          ) : (
            <div
              data-slot={`${service.slug}-hero`}
              className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-coal"
            >
              <span className="absolute inset-0 flex items-center justify-center p-5 text-center font-mono text-[12px] leading-[1.6] text-muted-faint">
                [ IMAGE or VIDEO 4:3 · 1600×1200 — {service.slot} ]
              </span>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="what-we-do-heading" className="bg-bone px-5 py-16 text-ink md:px-14 md:py-28">
        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-10 md:grid-cols-2 md:gap-[72px]">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red">
              What we do
            </p>
            <h2
              id="what-we-do-heading"
              className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
            >
              {service.name}, <span className="font-accent font-normal italic text-red">start to finish.</span>
            </h2>
          </div>
          <ol className="m-0 list-none border-t border-ink p-0">
            {service.jobs.map((job, index) => (
              <li key={job.t} className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-b border-[#C9C2B6] py-6">
                <span className="font-accent text-[26px] font-normal italic leading-[1.1] text-red">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="m-0 font-display text-[24px] font-extrabold leading-[1.1] tracking-[-0.025em] md:text-[30px]">
                    {job.t}
                  </h3>
                  <p className="m-0 max-w-[560px] text-[16px] leading-[1.6] text-ink/80">{job.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="px-5 py-16 md:px-14 md:py-28">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
          <h2
            id="how-heading"
            className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] text-bone md:text-[64px]"
          >
            How it works.
          </h2>
          <StepList steps={steps} />
        </div>
      </section>

      <section aria-labelledby="projects-heading" className="bg-coal px-5 py-16 md:px-14 md:py-28">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="projects-heading"
              className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] text-bone md:text-[64px]"
            >
              Real projects.
            </h2>
            <Link
              href="/gallery"
              className="inline-flex min-h-11 items-center border-b-2 border-red text-[16px] font-bold leading-none text-bone hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red-soft"
            >
              All {service.name.toLowerCase()} in the gallery →
            </Link>
          </div>

          {photos.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {photos.slice(0, 6).map((project) => (
                <Link
                  key={project.slug}
                  href={`/gallery/${project.slug}`}
                  className="flex flex-col gap-3.5 text-bone focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-red-soft"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink">
                    <Image
                      src={project.photo!.src}
                      alt={project.photo!.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: project.photo!.position ?? "50% 50%" }}
                    />
                  </div>
                  <span className="text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-red-soft">
                    {service.name.toUpperCase()}
                  </span>
                  <span className="text-[18px] font-semibold leading-[1.3]">{project.title}</span>
                </Link>
              ))}
            </div>
          ) : service.pair ? null : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <Link
                  key={index}
                  href="/gallery"
                  className="flex flex-col gap-3.5 text-bone focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-red-soft"
                >
                  <div
                    data-slot={`${service.slug}-project-${index}`}
                    className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink"
                  >
                    <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-[12px] leading-[1.6] text-muted-faint">
                      [ IMAGE 4:3 · 1600×1200 — {service.slot} ]
                    </span>
                  </div>
                  <span className="text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-red-soft">
                    {service.name.toUpperCase()} · [PLACEHOLDER: TOWN]
                  </span>
                  <span className="text-[18px] font-semibold leading-[1.3]">[PLACEHOLDER: project title]</span>
                </Link>
              ))}
            </div>
          )}

          {service.pair ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h3 className="m-0 font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[40px]">
                  Before and after.
                </h3>
                <p className="m-0 text-[15px] leading-none text-muted-soft">
                  {service.pair.caption ?? ""}
                </p>
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden border border-line">
                <BeforeAfter
                  slotId={`${service.slug}-pair`}
                  before={service.pair.before}
                  after={service.pair.after}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="why-heading" className="bg-bone px-5 pb-0 pt-16 text-ink md:px-14 md:pt-28">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
          <h2
            id="why-heading"
            className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
          >
            Why customers <span className="font-accent font-normal italic text-red">choose us.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {why.map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col gap-2 pt-5 ${
                  index === 0 ? "border-t-[3px] border-red" : "border-t-[3px] border-ink"
                }`}
              >
                <h3 className="m-0 text-[20px] font-bold leading-[1.3]">{item.title}</h3>
                <p className="m-0 text-[16px] leading-[1.55] text-ink/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="service-faq-heading" className="bg-bone px-5 py-16 text-ink md:px-14 md:py-28">
        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-8 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-[72px]">
          <h2
            id="service-faq-heading"
            className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
          >
            Questions.
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section aria-labelledby="service-areas-heading" className="px-5 py-14 md:px-14 md:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7">
          <h2
            id="service-areas-heading"
            className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[52px]"
          >
            {service.name} across North Texas.
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <CityChip key={city.slug} name={city.name} href={cityHref(city)} />
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 ? (
        <section
          aria-labelledby="service-reviews-heading"
          className="border-t border-hair px-5 py-14 md:px-14 md:py-20"
        >
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7">
            <h2
              id="service-reviews-heading"
              className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[52px]"
            >
              What customers say.
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  compact
                  card={{
                    rating: 5,
                    body: review.text,
                    meta: review.name,
                    source: "Google review",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="related-heading" className="bg-bone px-5 py-14 text-ink md:px-14 md:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7">
          <h2
            id="related-heading"
            className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] md:text-[52px]"
          >
            We also do
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {related.map((item, index) => (
              <ServiceTile
                key={item.slug}
                sizes="(min-width: 768px) 25vw, 100vw"
                className="min-h-[200px]"
                tile={{
                  n: String(index + 1).padStart(2, "0"),
                  title: item.name,
                  blurb: item.short,
                  href: `/services/${item.slug}`,
                  tone: item.tone,
                  image: item.tile ? { alt: item.tile.alt, photo: item.tile } : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        service={service.formValue}
        heading={`Ready for ${service.name.toLowerCase()}?`}
        sourcePage={`/services/${service.slug}`}
      />

      <JsonLd id="service-schema" data={serviceSchema({ ...service, image: service.hero?.src })} />
      {serviceFaqSchema ? <JsonLd id="service-faq-schema" data={serviceFaqSchema} /> : null}
      <JsonLd
        id="service-breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
