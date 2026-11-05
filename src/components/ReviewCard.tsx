/** Star row. Text characters, not icons, with an accessible label. */
export function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <span
      aria-label={label ?? `${rating} out of 5 stars`}
      className="block text-[14px] leading-none tracking-[0.12em] text-red-soft md:text-[15px]"
    >
      {"★★★★★".slice(0, rating)}
      <span aria-hidden="true" className="text-muted-soft">
        {"★★★★★".slice(rating)}
      </span>
    </span>
  );
}

export type ReviewCardProps = {
  rating: number;
  body: string;
  meta: string;
  source?: string;
  area?: string;
  reviewUrl?: string | null;
};

/** A single review. Real data only; placeholders are labelled as such. */
export function ReviewCard({ card, compact = false }: { card: ReviewCardProps; compact?: boolean }) {
  return (
    <figure
      className={`m-0 flex h-full flex-col justify-between gap-10 border border-line bg-coal p-6 md:p-9 ${
        compact ? "min-h-[260px] md:min-h-0" : "min-h-[260px] md:min-h-[320px]"
      }`}
    >
      <div>
        <Stars rating={card.rating} label={card.area} />
        <blockquote className="mt-4 text-[17px] leading-[1.5] text-bone md:mt-[22px] md:text-[20px]">
          {card.body}
        </blockquote>
      </div>
      <figcaption className="flex justify-between gap-3 text-[13px] leading-[1.4] text-muted-soft md:text-[14px]">
        <span>{card.meta}</span>
        {card.source ? <span>{card.source}</span> : null}
        {card.reviewUrl ? (
          <a
            href={card.reviewUrl}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="font-semibold text-red-soft underline underline-offset-4 hover:text-bone"
          >
            Read
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
