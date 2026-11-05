/**
 * Trust strip: only the things we can prove today, plus a visible placeholder
 * where the rating and count will go once real reviews exist.
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
      <li className="flex items-center font-mono text-[12px] leading-none text-muted-faint">
        [PLACEHOLDER: review rating + count]
      </li>
    </ul>
  );
}
