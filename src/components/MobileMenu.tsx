"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/data/nav";

const linkBase =
  "inline-flex min-h-11 items-center border-b-2 pt-px text-[16px] font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone";

/**
 * Desktop nav links. This is the one piece of the header that has to be
 * client-side: aria-current needs the pathname, and reading it on the server
 * (headers/middleware) would make every page dynamic.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-[30px] md:flex">
      {primaryNav.map((item) => {
        const active = item.match
          ? pathname === item.match || pathname.startsWith(`${item.match}/`)
          : false;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${linkBase} ${
                active
                  ? "border-red text-white"
                  : "border-transparent text-body-dim hover:border-red hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Menu button + full-width drawer, phones only. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes; the page behind the drawer does not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 items-center gap-[10px] border border-edge px-[14px] text-[15px] font-semibold leading-none text-bone transition-colors active:bg-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="flex flex-col gap-1">
          <span className="h-0.5 w-[18px] bg-bone" />
          <span className="h-0.5 w-[18px] bg-bone" />
          <span className="h-0.5 w-3 bg-red" />
        </span>
      </button>

      {open ? (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-30 list-none border-b border-line bg-ink px-5 pb-5 pt-2"
        >
          {primaryNav.map((item) => (
            <li key={item.href} className="border-b border-hair">
              <Link
                href={item.href}
                className="flex min-h-14 items-center justify-between font-display text-[22px] font-bold leading-none text-bone transition-colors active:text-red-soft"
              >
                {item.label}
                <span aria-hidden="true" className="text-red-soft">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
