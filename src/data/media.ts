/**
 * Hero media. The video URL lives here and nowhere else — swap this one value
 * when the final footage is uploaded.
 */
export const media = {
  hero: {
    videoSrc: "/media/hero.mp4",
    posterSrc: "/media/hero-poster.webp",
    posterWidth: 1920,
    posterHeight: 1080,
    /** Shown to screen readers in place of the silent decorative video. */
    description:
      "Cyril Handyman crew finishing a garage door installation on a North Texas home",
  },
} as const;
