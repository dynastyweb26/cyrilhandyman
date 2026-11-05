import Image from "next/image";
import Link from "next/link";
import { MobileMenu, NavLinks } from "@/components/MobileMenu";
import { site } from "@/data/site";

/**
 * Top bar + primary nav. Server component: the only client parts are the
 * current-page link state and the mobile drawer.
 */
export function SiteHeader() {
  return (
    <header className="relative z-20 bg-ink">
      <div className="flex items-center justify-between gap-6 border-b border-hair px-5 py-2 text-[12px] leading-[1.4] text-muted md:px-14 md:py-[10px] md:text-[13px]">
        <span>Forney, TX · Serving Kaufman County and the towns around it</span>
        <span className="hidden md:inline">Working wholeheartedly, one job at a time</span>
      </div>

      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-6 border-b border-hair py-[10px] pl-5 pr-3 md:gap-8 md:px-14 md:py-[18px]"
      >
        <Link
          href="/"
          aria-label="Cyril Handyman & Door, home"
          className="flex min-h-11 items-center gap-[10px] text-bone transition-opacity hover:opacity-90 md:gap-[14px]"
        >
          <Image
            src={site.brand.logo.src}
            alt=""
            width={site.brand.logo.width}
            height={site.brand.logo.height}
            priority
            data-slot="logo"
            className="h-[38px] w-auto object-contain md:h-[46px]"
          />
          <span className="font-display text-[14px] font-extrabold uppercase leading-[1.05] tracking-[0.02em] md:text-[17px] md:leading-none">
            Cyril Handyman
            <br className="md:hidden" />
            <span className="hidden md:inline"> &amp; Door</span>
            <span className="md:hidden"> &amp; Door</span>
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <NavLinks />
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-[10px] bg-red px-6 text-[16px] font-bold leading-none text-white transition-colors duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:inline-flex md:h-[52px]"
          >
            Call {site.phone.display}
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
