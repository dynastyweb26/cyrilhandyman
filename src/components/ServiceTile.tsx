import Link from "next/link";
import type { Bento } from "@/data/home";

const tones = {
  ink: {
    tile: "bg-ink text-bone hover:bg-coal active:translate-y-0 focus-visible:outline-ink",
    number: "text-red-soft",
    blurb: "text-body-dark",
    arrow: "border-edge",
    frame: "bg-coal",
    frameText: "text-muted-faint",
    ring: "focus-visible:outline-red",
  },
  sand: {
    tile: "bg-sand text-ink hover:bg-sand-hover active:translate-y-0 focus-visible:outline-sand",
    number: "text-red-deep",
    blurb: "text-muted-ink",
    arrow: "border-[#BDB6AA]",
    frame: "bg-sand-slot",
    frameText: "text-[#5E5A53]",
    ring: "focus-visible:outline-red",
  },
  red: {
    tile: "bg-red text-white hover:bg-red-press active:translate-y-0 focus-visible:outline-red",
    number: "text-white",
    blurb: "text-white",
    arrow: "border-white/55",
    frame: "bg-red-press",
    frameText: "text-white/70",
    ring: "focus-visible:outline-ink",
  },
} as const;

/**
 * One bento tile. The whole tile is the link. Media sits between the number and
 * the title, on a solid tile colour so the text keeps its contrast.
 */
export function ServiceTile({ tile, className = "" }: { tile: Bento; className?: string }) {
  const tone = tones[tile.tone];

  return (
    <Link
      href={tile.href}
      className={`relative flex flex-col justify-between overflow-hidden p-[18px] transition-[transform,background-color] duration-[250ms] hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 motion-reduce:hover:translate-y-0 md:p-9 ${tone.tile} ${tone.ring} ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className={`font-accent text-[24px] font-normal italic leading-none md:text-[32px] ${tone.number}`}>
          {tile.n}
        </span>
        <span
          aria-hidden="true"
          className={`hidden size-12 items-center justify-center rounded-full border text-[20px] font-semibold leading-none md:flex ${tone.arrow}`}
        >
          →
        </span>
      </div>

      {tile.image ? (
        <div
          data-slot={tile.image.slot}
          className={`absolute inset-x-[22px] bottom-[128px] top-[66px] overflow-hidden md:inset-x-9 md:bottom-[176px] md:top-[100px] ${tone.frame}`}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center px-2.5 text-center font-mono text-[10px] leading-[1.5] md:text-[11px] ${tone.frameText}`}
          >
            {tile.image.label}
          </span>
        </div>
      ) : null}

      <div>
        <h3 className="m-0 font-display text-[28px] font-extrabold leading-none tracking-[-0.02em] md:text-[40px] md:tracking-[-0.025em]">
          {tile.title}
        </h3>
        <p className={`mt-1.5 text-[14px] leading-[1.35] md:mt-3 md:text-[17px] md:leading-[1.4] ${tone.blurb}`}>
          {tile.blurb}
        </p>
      </div>
    </Link>
  );
}
