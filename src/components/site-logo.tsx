import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/** The logo is transparent and built for dark surfaces: rendered as-is. */
export function SiteLogo({
  className,
  imageClassName,
  withWordmark = true,
  priority = false,
}: {
  className?: string;
  imageClassName?: string;
  withWordmark?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={site.brand.logo.src}
        alt=""
        width={site.brand.logo.width}
        height={site.brand.logo.height}
        priority={priority}
        className={cn("h-10 w-auto object-contain", imageClassName)}
      />
      {withWordmark ? (
        <span className="font-display text-small font-semibold uppercase tracking-[0.18em] text-white">
          {site.shortName}
        </span>
      ) : null}
    </Link>
  );
}
