import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The logo sits on a light chip so a transparent logo of any color stays
 * legible on the dark chrome.
 */
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
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white p-1">
        <Image
          src={site.brand.logo.src}
          alt=""
          width={site.brand.logo.width}
          height={site.brand.logo.height}
          priority={priority}
          className={cn("size-full object-contain", imageClassName)}
        />
      </span>
      {withWordmark ? (
        <span className="font-display text-small font-semibold uppercase tracking-[0.18em] text-white">
          {site.shortName}
        </span>
      ) : null}
    </Link>
  );
}
