import Image from "next/image";
import Link from "next/link";
import type { GalleryProject } from "@/data/gallery";

/**
 * Gallery / job card. The whole card is one link. Real photos render through
 * next/image; the Christmas lights card keeps a labelled slot because there
 * are no photos for it yet.
 */

const cardSizes = "(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw";

export function GalleryCard({
  project,
  duplicate = false,
  className = "",
}: {
  project: GalleryProject;
  duplicate?: boolean;
  className?: string;
}) {
  const { slug, kind, tag, title, city, line, ratio, photo, before, after, slot } = project;
  const isPair = kind === "ba" && before && after;

  return (
    <Link
      href={`/gallery/${slug}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={`group flex h-full flex-col border border-line bg-coal text-bone transition-[border-color,transform] duration-200 hover:-translate-y-[3px] hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-red motion-reduce:hover:translate-y-0 ${className}`}
    >
      <div className="relative overflow-hidden bg-slot" style={{ aspectRatio: ratio }}>
        {isPair ? (
          <>
            <Image
              src={after.src}
              alt={after.alt}
              fill
              sizes={cardSizes}
              className="object-cover"
              style={{ objectPosition: after.position ?? "50% 50%" }}
            />
            <div className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
              <Image
                src={before.src}
                alt={before.alt}
                fill
                sizes={cardSizes}
                className="object-cover"
                style={{ objectPosition: before.position ?? "50% 50%" }}
              />
            </div>
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-red" />
            <span className="absolute bottom-2.5 left-2.5 bg-ink px-2 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-bone">
              Before
            </span>
            <span className="absolute bottom-2.5 right-2.5 bg-ink px-2 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-bone">
              After
            </span>
          </>
        ) : photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={cardSizes}
            className="object-cover"
            style={{ objectPosition: photo.position ?? "50% 50%" }}
          />
        ) : (
          <SlotLabel text={slot ?? ""} slotId={`${slug}-cover`} align="center" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-[22px] pb-6 pt-5">
        <span className="inline-flex h-[26px] items-center self-start rounded-full border border-line bg-ink px-3 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-red-soft">
          {tag}
        </span>
        <h3 className="mt-1.5 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.01em] text-bone">
          {title}
        </h3>
        {city ? (
          <span className="text-[14px] font-medium leading-[1.3] text-muted-soft">{city}</span>
        ) : null}
        {line ? <p className="m-0 text-[15px] leading-[1.45] text-[#CFCBC4]">{line}</p> : null}
        <span className="mt-auto pt-2.5 text-[14px] font-bold leading-none text-red-soft">
          View project →
        </span>
      </div>
    </Link>
  );
}

function SlotLabel({
  text,
  slotId,
  align,
}: {
  text: string;
  slotId: string;
  align: "left" | "center";
}) {
  return (
    <div
      data-slot={slotId}
      className={`absolute inset-0 flex items-center p-2.5 font-mono text-[10px] leading-[1.5] tracking-[0.04em] text-muted-faint ${
        align === "center" ? "justify-center text-center" : "justify-start text-left"
      }`}
    >
      {text}
    </div>
  );
}
