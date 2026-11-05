import Image from "next/image";
import { hero } from "@/data/home";

/**
 * Full-bleed hero. The video is decorative; the H1 and CTAs are real text on a
 * flat scrim. Under prefers-reduced-motion the video is hidden and the poster
 * image shows instead (see globals.css).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[700px] items-end overflow-hidden bg-[#111113] px-5 pb-10 md:min-h-[860px] md:px-14 md:pb-24"
    >
      <video
        data-slot="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={hero.poster}
        aria-hidden="true"
        className="motion-video absolute inset-0 size-full object-cover"
      >
        <source src={hero.video} type="video/mp4" />
      </video>
      <Image
        src={hero.poster}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="reduced-motion-poster object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      <div className="absolute inset-x-5 top-4 border border-dashed border-edge px-2.5 py-2 font-mono text-[10px] leading-[1.5] tracking-[0.04em] text-muted-faint md:inset-x-auto md:right-14 md:top-7 md:px-3 md:text-[11px]">
        <span className="md:hidden">{hero.videoSlotMobile}</span>
        <span className="hidden md:inline">{hero.videoSlot}</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1328px]">
        <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.3] tracking-[0.16em] text-red-soft md:mb-7 md:text-[13px] md:leading-none">
          {hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="mt-0 max-w-[1000px] font-display text-[50px] font-extrabold leading-[0.96] tracking-[-0.035em] text-bone md:text-[116px] md:leading-[0.94]"
        >
          {hero.title}
        </h1>
        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.5] text-body-dark md:mt-9 md:text-[21px]">
          {hero.intro}
        </p>

        <div className="mt-7 flex flex-col gap-2.5 md:mt-10 md:flex-row md:gap-4">
          <a
            href={hero.primaryCta.href}
            className="flex h-14 items-center justify-center bg-red px-8 text-[17px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-[60px]"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="flex h-14 items-center justify-center border-[1.5px] border-bone text-[17px] font-bold leading-none text-bone transition-colors duration-150 hover:bg-bone hover:text-ink active:bg-[#D6D2CB] active:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-[60px] md:px-8"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <ul
          aria-label="About the company"
          className="mt-6 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 text-[14px] font-medium leading-[1.3] text-body-dark md:mt-9 md:gap-5 md:text-[15px] md:leading-none"
        >
          {hero.trust.map((item, index) => (
            <li key={item} className="flex items-center gap-3 md:gap-5">
              {index > 0 ? (
                <span aria-hidden="true" className="size-1 bg-red md:size-[5px]" />
              ) : null}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
