import Link from "next/link";
import { site } from "@/data/site";

/**
 * Fixed call bar, phones only. Padding includes the iOS safe area so the bar
 * sits above the home indicator.
 */
export function StickyCallBar() {
  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2 border-t border-line bg-ink px-3 pt-[10px] pb-[calc(10px+env(safe-area-inset-bottom))] md:hidden"
    >
      <a
        href={`tel:${site.phone.tel}`}
        className="flex h-[52px] items-center justify-center gap-2 bg-red text-[16px] font-bold leading-none text-white transition-colors active:bg-red-active"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <rect x="4" y="1.5" width="8" height="13" rx="1.5" />
          <path d="M7 12h2" />
        </svg>
        Call {site.phone.display}
      </a>
      <Link
        href="/#quote"
        className="flex h-[52px] items-center justify-center border-[1.5px] border-bone text-[16px] font-bold leading-none text-bone transition-colors active:bg-bone active:text-ink"
      >
        Get a quote
      </Link>
    </div>
  );
}
