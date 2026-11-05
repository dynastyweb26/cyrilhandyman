import Image from "next/image";
import Link from "next/link";
import { footerCompany, footerServices } from "@/data/nav";
import { site } from "@/data/site";

const heading =
  "mb-[10px] text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-red-soft";
const link =
  "flex min-h-9 items-center text-[15px] text-body-dim transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone";

export function SiteFooter() {
  return (
    <footer className="border-t border-hair bg-ink px-5 pb-8 pt-12 text-bone md:px-14 md:pb-10 md:pt-[88px]">
      <div className="mx-auto w-full max-w-[1328px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] md:gap-12">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex min-h-11 items-center gap-3 text-bone transition-opacity hover:opacity-90 md:gap-[14px]"
            >
              <Image
                src={site.brand.logo.src}
                alt=""
                width={site.brand.logo.width}
                height={site.brand.logo.height}
                data-slot="logo-footer"
                className="h-12 w-auto object-contain md:h-14"
              />
              <span className="font-display text-[16px] font-extrabold uppercase leading-[1.05] tracking-[0.02em] md:text-[18px]">
                Cyril Handyman
                <br />
                &amp; Door LLC
              </span>
            </Link>
            <p className="m-0 max-w-[320px] text-[15px] leading-[1.55] text-muted">
              Handyman and home improvement out of Forney, Texas. Serving Kaufman County and the
              towns around it.
            </p>
          </div>

          <nav aria-label="Services" className="flex flex-col">
            <h2 className={heading}>Services</h2>
            {footerServices.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col">
            <h2 className={heading}>Company</h2>
            {footerCompany.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col">
            <h2 className={heading}>Contact</h2>
            <a
              href={`tel:${site.phone.tel}`}
              className="flex min-h-9 items-center text-[17px] font-bold leading-none text-white transition-colors hover:text-red-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <span className="flex min-h-9 items-center text-[15px] text-muted">
              Forney, TX · Kaufman County
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className={heading}>Follow</h2>
            <a
              href="https://facebook.com/[PLACEHOLDER]"
              rel="noopener"
              className="flex min-h-11 items-center gap-[10px] text-[15px] text-body-dim transition-colors hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="1.5" y="1.5" width="15" height="15" rx="3" />
                <path d="M11.5 5.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v9M7 9.5h4" />
              </svg>
              Facebook
            </a>
            <a
              href="https://instagram.com/[PLACEHOLDER]"
              rel="noopener"
              className="flex min-h-11 items-center gap-[10px] text-[15px] text-body-dim transition-colors hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="1.5" y="1.5" width="15" height="15" rx="4.5" />
                <circle cx="9" cy="9" r="3.5" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hair pt-6 text-[12px] leading-[1.4] text-muted-faint md:mt-[72px] md:flex-row md:items-center md:justify-between md:text-[13px]">
          <span>© 2026 Cyril Handyman &amp; Door LLC · Registered Texas LLC</span>
          <span>Same crew on every job.</span>
        </div>
      </div>
    </footer>
  );
}
