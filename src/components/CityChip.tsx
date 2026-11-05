import Link from "next/link";

/**
 * City chip. Links to that city's page; the same chip is used on the home page,
 * the hub, service pages and the 404.
 */
export function CityChip({
  name,
  href,
  className = "",
}: {
  name: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center border border-edge px-5 text-[16px] font-bold leading-none text-bone transition-colors duration-150 hover:border-bone hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-red-soft md:text-[17px] ${className}`}
    >
      {name}
    </Link>
  );
}
