/** One step in "How a job goes". Rendered inside an <ol>. */
export function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-2 border-t border-line py-5 md:block md:border-l md:border-t md:px-8 md:pb-2 md:pt-9 md:first:border-l-0 md:first:pr-8 md:first:pl-0 md:last:pl-8 md:last:pr-0">
      <span
        aria-hidden="true"
        className="font-accent text-[34px] font-normal italic leading-none text-red-soft md:text-[44px]"
      >
        {n}
      </span>
      <div>
        <h3 className="mt-0.5 mb-1.5 text-[18px] font-semibold leading-[1.25] text-bone md:mt-6 md:mb-2.5 md:text-[20px]">
          {title}
        </h3>
        <p className="m-0 text-[15px] leading-[1.5] text-muted md:text-[16px] md:leading-[1.55]">
          {body}
        </p>
      </div>
    </li>
  );
}
