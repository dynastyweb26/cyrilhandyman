import type { Metadata } from "next";
import { PhoneIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { serviceAreasList } from "@/lib/format";
import { cities, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Free Quotes",
  description:
    "Call 945-344-4580 or email crazydoor04@gmail.com for a free quote on garage doors, blinds, patio screens, media walls and Christmas lights around Forney, TX.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get a free quote"
        intro={
          <>
            Call, text or email. Send photos of the space and a few details about what you want done
            and we&rsquo;ll follow up with a price.
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-page gap-12 px-page-x py-section lg:grid-cols-2 lg:gap-16 lg:px-page-x-lg lg:py-section-lg">
          <div>
            <h2 className="font-display text-display-3 uppercase text-ink">Reach us directly</h2>
            <ul className="mt-6 space-y-5">
              <li>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Phone
                </p>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="mt-1 inline-flex items-center gap-2 font-display text-display-3 text-ink hover:text-red"
                >
                  <PhoneIcon width={22} height={22} />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block text-body text-ink hover:text-red"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Service area
                </p>
                <p className="mt-1 text-body text-ink">{serviceAreasList(cities)}</p>
                <p className="mt-1 text-small text-muted-ink">{site.nap.serviceRadius}</p>
              </li>
              <li>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-ink">
                  Hours
                </p>
                <p className="mt-1 text-body text-ink">{site.nap.hours}</p>
              </li>
            </ul>
          </div>

          <div className="border border-line-ink bg-bone p-6 lg:p-8">
            <h2 className="font-display text-body font-semibold uppercase tracking-[0.08em] text-ink">
              Quote form
            </h2>
            <p className="mt-3 text-small text-muted-ink">
              Call or text with the job and your city. A photo of the space helps us quote it.
            </p>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-6 inline-flex items-center gap-2 bg-red px-5 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
            >
              <PhoneIcon />
              Call {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
