import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { media } from "@/data/media";
import { site } from "@/data/site";

type HeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Override the shared hero media for a different page. */
  videoSrc?: string | null;
  posterSrc?: string;
};

/**
 * Hero with a silent background video.
 *
 * - The poster is a preloaded WebP and is what paints first (LCP candidate).
 * - The video is decorative, muted/looping/inline, preload="metadata", and is
 *   hidden entirely below md and under prefers-reduced-motion (see globals.css).
 * - The H1, phone number and CTA are real HTML text over a flat dark scrim.
 */
export function Hero({
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  videoSrc = media.hero.videoSrc,
  posterSrc = media.hero.posterSrc,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={posterSrc}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {videoSrc ? (
        <video
          className="hero-video absolute inset-0 -z-10 h-full w-full object-cover"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {/* Flat scrim — no gradients. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

      <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-28">
        <p className="font-display text-eyebrow font-semibold uppercase text-red-text">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-display-1 uppercase text-white lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-lead text-white/85">{intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
          >
            {primaryCta.label}
            <ArrowRightIcon />
          </Link>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            <PhoneIcon />
            {site.phone.display}
          </a>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="font-display text-small font-semibold uppercase tracking-[0.12em] text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
