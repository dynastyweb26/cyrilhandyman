import Link from "next/link";
import type { GalleryProject } from "@/data/gallery";

/**
 * Gallery / job card. The whole card is one link. Media is a labelled slot
 * (data-slot) because no real photos exist yet — no invented imagery.
 */
export function GalleryCard({
  project,
  duplicate = false,
  className = "",
}: {
  project: GalleryProject;
  duplicate?: boolean;
  className?: string;
}) {
  const { slug, kind, tag, title, city, line, ratio, slot, beforeSlot, afterSlot } = project;

  return (
    <Link
      href={`/gallery/${slug}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={`group flex h-full flex-col border border-line bg-coal text-bone transition-[border-color,transform] duration-200 hover:-translate-y-[3px] hover:border-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-red motion-reduce:hover:translate-y-0 ${className}`}
    >
      <div className="relative overflow-hidden bg-slot" style={{ aspectRatio: ratio }}>
        {kind === "ba" ? (
          <>
            <div className="absolute inset-0 bg-[#1A1A1E]">
              <SlotLabel text={beforeSlot ?? slot} slotId={`${slug}-before`} align="left" />
            </div>
            <div className="absolute inset-0 bg-[#232329] left-1/2">
              <SlotLabel text={afterSlot ?? slot} slotId={`${slug}-after`} align="left" />
            </div>
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-red" />
            <span className="absolute bottom-2.5 left-2.5 bg-ink px-2 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-bone">
              Before
            </span>
            <span className="absolute bottom-2.5 right-2.5 bg-ink px-2 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-bone">
              After
            </span>
          </>
        ) : (
          <>
            <SlotLabel text={slot} slotId={`${slug}-cover`} align="center" />
            {kind === "video" ? (
              <span className="absolute left-3 top-3 flex h-[26px] items-center gap-[7px] rounded-full border border-line bg-ink pl-2 pr-2.5 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-bone">
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <polygon points="2,1 9,5 2,9" fill="#E04848" />
                </svg>
                Video
              </span>
            ) : null}
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-[22px] pb-6 pt-5">
        <span className="inline-flex h-[26px] items-center self-start rounded-full border border-line bg-ink px-3 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-red-soft">
          {tag}
        </span>
        <h3 className="mt-1.5 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.01em] text-bone">
          {title}
        </h3>
        <span className="text-[14px] font-medium leading-[1.3] text-muted-soft">{city}</span>
        <p className="m-0 text-[15px] leading-[1.45] text-[#CFCBC4]">{line}</p>
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
