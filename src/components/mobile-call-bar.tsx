import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { site } from "@/data/site";

/** Sticky bottom call bar — phones only (hidden from md up). */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-charcoal pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={`tel:${site.phone.tel}`}
          className="flex flex-1 items-center justify-center gap-2 bg-red px-4 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-white active:bg-red-hover"
        >
          <PhoneIcon />
          <span>Call {site.phone.display}</span>
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center border border-white/25 px-4 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-white active:border-white/50"
        >
          Free quote
        </Link>
      </div>
    </div>
  );
}
