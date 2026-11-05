import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/data/site";

/**
 * Red CTA band plus the quote form. The form is still UI-only; city and source
 * page ride along as hidden fields, and a city page shows its town read-only.
 */
export function QuoteBand({
  heading = "One call gets it on the calendar.",
  city,
  service,
  sourcePage,
}: {
  heading?: string;
  city?: string;
  service?: string;
  sourcePage: string;
}) {
  return (
    <>
      <section aria-labelledby="quote-band-heading" className="bg-red px-5 py-12 text-white md:px-14 md:py-[88px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-end justify-between gap-8">
          <h2
            id="quote-band-heading"
            className="m-0 max-w-[820px] font-display text-[38px] font-extrabold leading-[0.95] tracking-[-0.035em] text-balance md:text-[80px]"
          >
            {heading}{" "}
            <span className="font-accent font-normal italic tracking-[-0.01em]">
              We’ll take it from there.
            </span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex min-h-14 items-center bg-ink px-7 text-[18px] font-bold leading-none text-white transition-colors hover:bg-coal focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
            >
              Call {site.phone.display}
            </a>
            <Link
              href="#quote"
              className="inline-flex min-h-14 items-center border-2 border-white px-6 text-[18px] font-bold leading-none text-white transition-colors hover:bg-white hover:text-red focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-ink"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section id="quote" className="bg-coal px-5 py-14 text-bone md:px-14 md:py-[104px]">
        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
              Request a quote
            </p>
            <h2 className="m-0 font-display text-[34px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[56px]">
              Tell us about the job.
            </h2>
            <p className="mt-4 max-w-[440px] text-[17px] leading-[1.6] text-muted">
              We’ll call you back to talk it through and set a time. Rather talk now?{" "}
              <a
                href={`tel:${site.phone.tel}`}
                className="font-bold text-bone underline underline-offset-[3px] hover:text-white"
              >
                {site.phone.display}
              </a>
            </p>
            <span className="mt-3 block font-mono text-[12px] leading-[1.5] text-muted-faint">
              [CONFIRM callback time with Cyril]
            </span>
          </div>
          <QuoteForm city={city} service={service} sourcePage={sourcePage} tone="dark" />
        </div>
      </section>
    </>
  );
}
