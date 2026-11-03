import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { services, site, todo } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Handyman & Home Improvement Services",
  description:
    "TODO_CONTENT — services index description covering garage doors, media walls, kitchen renovation, flooring, painting and holiday lighting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we build, fix and install"
        intro={
          <>
            Garage doors, interior carpentry, flooring, paint and holiday lighting across{" "}
            {site.county} and the towns around it.
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
          <ul className="grid gap-gutter md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="border border-line p-6">
                <h2 className="font-display text-body font-semibold uppercase tracking-[0.06em] text-ink">
                  {service.name}
                </h2>
                <p className="mt-2 text-small text-muted">{service.summary}</p>
                {service.href ? (
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-eyebrow font-semibold uppercase tracking-[0.14em] text-red hover:text-red-hover"
                  >
                    View details <ArrowRightIcon width={14} height={14} />
                  </Link>
                ) : (
                  <p className="mt-5 text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted">
                    Page coming soon — call for pricing
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-small text-muted">{todo("services not listed here")}</p>
        </div>
      </section>
    </>
  );
}
