import Link from "next/link";

/** Square city chip. Links to the city section on /service-areas. */
export function CityChip({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center border border-edge px-4 text-[15px] font-semibold leading-none text-bone transition-colors duration-150 hover:border-red hover:bg-coal active:border-red active:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-12 md:px-5 md:text-[16px]"
    >
      {name}
    </Link>
  );
}
