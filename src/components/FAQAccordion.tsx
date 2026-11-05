/**
 * Native details/summary accordion. No JS: the answers are in the DOM for
 * crawlers and for anyone with scripts off. The + rotates when open.
 */
export function FAQAccordion({
  items,
  className = "",
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={`border-t border-ink ${className}`}>
      {items.map((item, index) => (
        <details
          key={item.q}
          open={index === 0}
          className="group border-b border-[#C9C2B6]"
        >
          <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-5 text-[17px] font-semibold leading-[1.35] text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red md:text-[19px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="flex-none text-[24px] leading-none text-red transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <p className="mb-6 mt-0 max-w-[620px] text-[16px] leading-[1.6] text-ink/80">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
