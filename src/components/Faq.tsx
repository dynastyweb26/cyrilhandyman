import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";
import type { faqs } from "@/data/home";

type FaqItem = (typeof faqs)[number];

/**
 * Native <details> FAQ: answers stay in the HTML while collapsed, so they are
 * crawlable. First item open, plus/minus drawn from two bars (group-open).
 * FAQPage JSON-LD only includes entries whose answer is real — never [CONFIRM].
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const answerable = items.filter((item) => item.a.length > 0 && !item.a.includes("[CONFIRM"));

  const schema =
    answerable.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: answerable.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <div className="border border-b-0 border-line bg-coal">
        {items.map((item, index) => (
          <details key={item.q} open={index === 0} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 px-4 py-3.5 text-[17px] font-semibold leading-[1.35] text-bone transition-colors duration-150 hover:bg-slot focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-bone md:min-h-[76px] md:px-7 md:py-5 md:text-[19px]">
              <span className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="w-[30px] flex-none font-accent text-[20px] font-normal italic leading-none text-red-soft md:text-[22px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.q}</span>
              </span>
              <span
                aria-hidden="true"
                className="relative size-9 flex-none rounded-full border border-edge"
              >
                <span className="absolute left-2.5 top-4 h-0.5 w-3.5 bg-red-soft" />
                <span className="absolute left-4 top-2.5 h-3.5 w-0.5 bg-red-soft transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
              </span>
            </summary>
            <p className="m-0 max-w-[680px] px-[18px] pb-5 pl-[62px] text-[15px] leading-[1.6] text-body-dark md:px-7 md:pb-[26px] md:pl-[74px] md:text-[17px]">
              {item.a ? `${item.a} ` : null}
              {item.confirm ? (
                <span className="font-semibold text-red-soft">{item.confirm}</span>
              ) : null}
            </p>
          </details>
        ))}
      </div>

      <a
        href={`tel:${site.phone.tel}`}
        className="mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line px-4 text-[14px] font-medium leading-none text-body-dark transition-colors duration-150 hover:border-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
      >
        <span aria-hidden="true" className="size-1.5 bg-red" />
        Each service page has its own FAQ too.
      </a>

      {schema ? <JsonLd id="faq-schema" data={schema} /> : null}
    </>
  );
}
