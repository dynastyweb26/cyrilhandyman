import Image from "next/image";
import Link from "next/link";
import { cities, cityHref } from "@/data/cities";
import { footerCompany, footerServices } from "@/data/nav";
import { site } from "@/data/site";

const heading =
  "mb-[10px] text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-red-soft";
const link =
  "flex min-h-9 items-center text-[15px] text-body-dim transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone";

export function SiteFooter() {
  return (
    <footer className="border-t border-hair bg-ink px-5 pb-28 pt-12 text-bone md:px-14 md:pb-10 md:pt-[88px]">
      <div className="mx-auto w-full max-w-[1328px]">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_repeat(5,minmax(0,1fr))] md:gap-10">
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
              Handyman and home improvement out of Forney, Texas. Serving Forney and the towns
              around it. [CONFIRM wording with Cyril]
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

          <nav aria-label="Service areas" className="flex flex-col">
            <h2 className={heading}>Service areas</h2>
            <div className="grid grid-cols-2 gap-x-5">
              {cities.map((city) => (
                <Link key={city.slug} href={cityHref(city)} className={link}>
                  {city.name}
                </Link>
              ))}
            </div>
            <Link href="/service-areas" className={link}>
              All service areas
            </Link>
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
              Forney, TX
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className={heading}>Follow</h2>
            <a
              href={site.social.facebook}
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
              href={site.social.instagram}
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
