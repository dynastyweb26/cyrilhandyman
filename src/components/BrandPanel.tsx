import Image from "next/image";
import { site } from "@/data/site";

/**
 * Stand-in for a media slot that has no real photo yet: a dark panel with the
 * logo, so no design-spec label ("[ IMAGE 4:3 … ]") ever reaches a live page.
 * Swap for the real photo once it exists.
 */
export function BrandPanel({ slot, className = "" }: { slot?: string; className?: string }) {
  return (
    <div
      data-slot={slot}
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden border border-line bg-coal ${className}`}
    >
      <Image
        src={site.brand.logo.src}
        alt=""
        width={site.brand.logo.width}
        height={site.brand.logo.height}
        sizes="200px"
        className="h-auto w-2/5 max-w-[220px] opacity-25"
      />
    </div>
  );
}
