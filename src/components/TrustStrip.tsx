import { allFiveStars, reviewCount } from "@/data/reviews";

/**
 * Trust strip: only the things we can prove today. The review line shows the
 * real count from the data file and stars only because every review in it is
 * 5-star — never an average rating.
 */
export function TrustStrip({ className = "" }: { className?: string }) {
  const items = ["Based in Forney, TX", "Registered Texas LLC", "Scheduled by phone"];

  return (
    <ul
      className={`m-0 mt-2 flex list-none flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line p-0 pt-4 text-[14px] leading-none text-body-dark ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 bg-red" />
          {item}
        </li>
      ))}
      <li className="flex items-center gap-2">
        {allFiveStars ? (
          <span aria-label="Rated five out of five stars" className="text-[13px] leading-none tracking-[0.12em] text-red-soft">
            ★★★★★
          </span>
        ) : null}
        {reviewCount} Google reviews
      </li>
    </ul>
  );
}
