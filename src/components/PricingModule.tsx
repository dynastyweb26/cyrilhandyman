import type { Service } from "@/data/services";
import { site } from "@/data/site";

/**
 * Pricing guidance. No numbers are invented: every row shows the price slot
 * with its [CONFIRM] tag until Cyril supplies real ranges.
 */
export function PricingModule({ service }: { service: Service }) {
  return (
    <section aria-labelledby="pricing-heading" className="bg-sand px-5 py-16 text-ink md:px-14 md:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] items-start gap-8 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:gap-[72px]">
        <div>
          <p className="mb-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red">
            Pricing guidance
          </p>
          <h2
            id="pricing-heading"
            className="m-0 font-display text-[36px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[64px]"
          >
            What it costs.
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-ink/80">
            Every home is different, so your real number comes after a quick call. Ranges below are
            a starting point.
          </p>
          <span className="mt-4 inline-block border border-dashed border-[#7A746B] px-3 py-2 font-mono text-[12px] leading-[1.4] text-ink/80">
            [CONFIRM pricing guidance with Cyril]
          </span>
        </div>

        <div className="flex flex-col bg-bone">
          {service.jobs.map((job) => (
            <div
              key={job.t}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D6D0C6] px-6 py-[22px]"
            >
              <span className="text-[18px] font-bold leading-[1.3]">{job.t}</span>
              <span className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-[13px] text-ink/60">starting at</span>
                <span
                  data-slot="price"
                  className="min-w-[120px] border border-dashed border-[#A8A196] px-2.5 py-1.5 text-center font-mono text-[13px] leading-none text-ink/70"
                >
                  $ [CONFIRM]
                </span>
              </span>
            </div>
          ))}
          <a
            href={`tel:${site.phone.tel}`}
            className="flex min-h-16 items-center justify-between gap-3 bg-ink px-6 text-[17px] font-bold leading-none text-bone transition-colors hover:bg-coal focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red"
          >
            Get your exact price: {site.phone.display}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
