/**
 * Gallery placeholders.
 *
 * Typed stand-in data only — no CMS, no database. Titles, cities and lines are
 * intentionally left as visible placeholders, and every media element carries a
 * data-slot id so real photos can be dropped in later without touching layout.
 */

export type ProjectKind = "photo" | "video" | "ba";

export type GalleryProject = {
  slug: string;
  kind: ProjectKind;
  /** Display label, e.g. "Garage doors". */
  tag: string;
  /** Service slug this project belongs to, for filtering. */
  service: string;
  /** City slug for filtering, or null while the job is a placeholder. */
  citySlug: string | null;
  title: string;
  city: string;
  line: string;
  /** CSS aspect-ratio value, e.g. "4 / 3". */
  ratio: string;
  /** Label for the empty media frame, e.g. "[ IMAGE 4:3 · 1200×900 ]". */
  slot: string;
  beforeSlot?: string;
  afterSlot?: string;
};

const SLOT = "[ Project title ]";
const CITY = "[ City ]";
const LINE = "[ One line on what was done ]";

/** Display tag -> service slug, so gallery filters and service pages agree. */
export const tagToService: Record<string, string> = {
  "Garage doors": "garage-door-repair-installation",
  Blinds: "faux-wood-blinds",
  "Patio screens": "motorized-retractable-patio-screens",
  "Media walls": "media-walls-accent-walls",
  "Christmas lights": "christmas-light-installation",
};

const project = (
  slug: string,
  kind: ProjectKind,
  tag: string,
  ratio: string,
  slot: string,
  city: string | null = null,
): GalleryProject => ({
  slug,
  kind,
  tag,
  service: tagToService[tag],
  citySlug: city,
  title: SLOT,
  city: CITY,
  line: LINE,
  ratio,
  slot,
  beforeSlot: kind === "ba" ? slot.replace("IMAGE", "BEFORE") : undefined,
  afterSlot: kind === "ba" ? slot.replace("IMAGE", "AFTER") : undefined,
});

/** Two rows for the home marquee, matching the artboard. */
export const marqueeRowA: GalleryProject[] = [
  project("garage-doors-1", "photo", "Garage doors", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("media-walls-1", "video", "Media walls", "4 / 3", "[ VIDEO 4:3 loop · 1200×900 · max 8s, muted ]"),
  project("patio-screens-1", "ba", "Patio screens", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("blinds-1", "photo", "Blinds", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("christmas-lights-1", "video", "Christmas lights", "4 / 3", "[ VIDEO 4:3 loop · 1200×900 · max 8s, muted ]"),
  project("garage-doors-2", "ba", "Garage doors", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
];

export const marqueeRowB: GalleryProject[] = [
  project("media-walls-2", "ba", "Media walls", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("christmas-lights-2", "photo", "Christmas lights", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("garage-doors-3", "video", "Garage doors", "4 / 3", "[ VIDEO 4:3 loop · 1200×900 · max 8s, muted ]"),
  project("patio-screens-2", "photo", "Patio screens", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("blinds-2", "ba", "Blinds", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("patio-screens-3", "video", "Patio screens", "4 / 3", "[ VIDEO 4:3 loop · 1200×900 · max 8s, muted ]"),
];

/** The /gallery grid: mixed orientations so the masonry reads like the artboard. */
export const galleryProjects: GalleryProject[] = [
  project("garage-doors-1", "photo", "Garage doors", "4 / 5", "[ IMAGE 4:5 · 960×1200 ]"),
  project("media-walls-1", "ba", "Media walls", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("christmas-lights-1", "video", "Christmas lights", "9 / 16", "[ VIDEO 9:16 loop · 720×1280 · max 8s ]"),
  project("blinds-1", "photo", "Blinds", "1 / 1", "[ IMAGE 1:1 · 1200×1200 ]"),
  project("garage-doors-2", "video", "Garage doors", "4 / 3", "[ VIDEO 4:3 loop · 1200×900 · max 8s ]"),
  project("patio-screens-1", "ba", "Patio screens", "4 / 5", "[ IMAGE 4:5 · 960×1200 ]"),
  project("media-walls-2", "photo", "Media walls", "3 / 2", "[ IMAGE 3:2 · 1200×800 ]"),
  project("christmas-lights-2", "photo", "Christmas lights", "4 / 5", "[ IMAGE 4:5 · 960×1200 ]"),
  project("garage-doors-3", "ba", "Garage doors", "1 / 1", "[ IMAGE 1:1 · 1200×1200 ]"),
  project("patio-screens-2", "video", "Patio screens", "9 / 16", "[ VIDEO 9:16 loop · 720×1280 · max 8s ]"),
  project("blinds-2", "photo", "Blinds", "4 / 3", "[ IMAGE 4:3 · 1200×900 ]"),
  project("garage-doors-4", "photo", "Garage doors", "3 / 2", "[ IMAGE 3:2 · 1200×800 ]"),
];

export const galleryFilters = [
  "All",
  "Garage doors",
  "Blinds",
  "Patio screens",
  "Media walls",
  "Christmas lights",
] as const;

/** Filter values are URL-safe: "Media & accent walls" -> "media-walls". */
export const filterSlug = (label: string): string =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z]+/g, "-")
    .replace(/-$/, "");

export const getProject = (slug: string): GalleryProject | undefined =>
  galleryProjects.find((item) => item.slug === slug);

/** Projects tagged to a city page. Empty until real city jobs are added. */
export const projectsByCity = (city: string): GalleryProject[] =>
  galleryProjects.filter((item) => item.citySlug === city);

/** Projects tagged to a service page. Empty until real service jobs are added. */
export const projectsByService = (service: string): GalleryProject[] =>
  galleryProjects.filter((item) => item.service === service);
