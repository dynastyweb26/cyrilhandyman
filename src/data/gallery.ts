/**
 * Gallery projects.
 *
 * One entry per real photo in raw-media/projects. Titles and alts describe
 * what the photo shows and nothing more: no city, no month, no counts. Every
 * job is `citySlug: null` — city pages keep their empty local-work state.
 *
 * `src` points at the WebP exports in public/media/projects/<folder>/; the
 * originals stay outside public/.
 */

export type ProjectKind = "photo" | "ba";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for crops, e.g. "50% 35%". */
  position?: string;
};

export type GalleryProject = {
  slug: string;
  kind: ProjectKind;
  /** Display label, e.g. "Garage doors". */
  tag: string;
  /** Service slug this project belongs to, or null for "Other work". */
  service: string | null;
  /** City slug for filtering; null for every real job until one is tagged. */
  citySlug: string | null;
  /** Plain description of what the photo shows. */
  title: string;
  /** Blank until a real city is confirmed. */
  city: string;
  /** Blank until a real write-up exists. */
  line: string;
  /** CSS aspect-ratio value, taken from the real image. */
  ratio: string;
  photo?: Photo;
  before?: Photo;
  after?: Photo;
  /** Placeholder label, only on cards with no photo yet. */
  slot?: string;
};

/** Display tag -> service slug, so gallery filters and service pages agree. */
export const tagToService: Record<string, string | null> = {
  "Garage doors": "garage-door-repair-installation",
  Blinds: "faux-wood-blinds",
  "Patio screens": "motorized-retractable-patio-screens",
  "Media walls": "media-walls-accent-walls",
  "Christmas lights": "christmas-light-installation",
  "Other work": null,
};

const photo = (
  src: string,
  width: number,
  height: number,
  alt: string,
  position?: string,
): Photo => ({ src, width, height, alt, position });

const project = (
  slug: string,
  tag: string,
  photoData: Photo,
  title: string,
  position?: string,
): GalleryProject => ({
  slug,
  kind: "photo",
  tag,
  service: tagToService[tag] ?? null,
  citySlug: null,
  title,
  city: "",
  line: "",
  ratio: `${photoData.width} / ${photoData.height}`,
  photo: position ? { ...photoData, position } : photoData,
});

const MEDIA = "/media/projects";
const GARAGE = "Garage doors";
const BLINDS = "Blinds";
const PATIO = "Patio screens";
const WALLS = "Media walls";
const OTHER = "Other work";

/** Media & accent walls. The blue and red LEDs are two shots of one wall. */
const mediaWalls: GalleryProject[] = [
  project(
    "media-walls-01",
    WALLS,
    photo(
      `${MEDIA}/media-walls-01/cover-1600.webp`,
      1600,
      1200,
      "Slat accent wall with blue LED lighting behind two marble-look panels, beside a window.",
      "50% 50%",
    ),
    "Blue LED slat wall with two marble panels",
  ),
  project(
    "media-walls-01-red",
    WALLS,
    photo(
      `${MEDIA}/media-walls-01/2-1600.webp`,
      1600,
      1200,
      "The same slat accent wall lit red, with two marble-look panels and a window at the left.",
      "50% 50%",
    ),
    "Red LED slat wall with two marble panels",
  ),
  project(
    "media-walls-02",
    WALLS,
    photo(
      `${MEDIA}/media-walls-02/cover-1600.webp`,
      1600,
      2133,
      "Dark geometric panel wall with gold trim, a fireplace, and a TV mounted on white slats.",
      "50% 45%",
    ),
    "Geometric panel wall with a TV and fireplace",
  ),
  project(
    "media-walls-03",
    WALLS,
    photo(
      `${MEDIA}/media-walls-03/cover-1179.webp`,
      1179,
      1901,
      "Floor-to-ceiling slat wall above a white brick fireplace, with gold geometric shapes on it.",
      "50% 40%",
    ),
    "Slat wall with gold geometric panels above a fireplace",
  ),
  project(
    "media-walls-04",
    WALLS,
    photo(
      `${MEDIA}/media-walls-04/cover-1008.webp`,
      1008,
      486,
      "TV set into a slat wood surround, with backlit floating shelves on the wall beside it.",
      "50% 50%",
    ),
    "TV in a slat surround with floating shelves",
  ),
  project(
    "media-walls-05",
    WALLS,
    photo(
      `${MEDIA}/media-walls-05/cover-1450.webp`,
      1450,
      2576,
      "Marble-look TV wall with a linear fireplace, flanked by brown slat panels.",
      "50% 45%",
    ),
    "Marble TV wall with slat panels and a linear fireplace",
  ),
  project(
    "media-walls-06",
    WALLS,
    photo(
      `${MEDIA}/media-walls-06/cover-1024.webp`,
      1024,
      1536,
      "Floor-to-ceiling black and white slat wall around a small fireplace, with a wood mantel.",
      "50% 50%",
    ),
    "Floor-to-ceiling slat fireplace wall",
  ),
  project(
    "media-walls-07",
    WALLS,
    photo(
      `${MEDIA}/media-walls-07/cover-1500.webp`,
      1500,
      2000,
      "TV mounted over a linear fireplace, with rows of backlit display niches on both sides.",
      "50% 40%",
    ),
    "TV wall with backlit display niches",
  ),
  project(
    "media-walls-08",
    WALLS,
    photo(
      `${MEDIA}/media-walls-08/cover-904.webp`,
      904,
      804,
      "White built-in surround with lit niches, black vertical panelling behind a wall bracket, mid-install.",
      "50% 50%",
    ),
    "White built-in with lit niches, mid-install",
  ),
  project(
    "media-walls-09",
    WALLS,
    photo(
      `${MEDIA}/media-walls-09/cover-1050.webp`,
      1050,
      600,
      "Slat wall with a marble-look TV panel and purple LED glow, next to a marble fireplace wall.",
      "50% 50%",
    ),
    "Slat wall with marble TV panel and purple LED",
  ),
  project(
    "media-walls-10",
    WALLS,
    photo(
      `${MEDIA}/media-walls-10/cover-1600.webp`,
      1600,
      1200,
      "Vertical wood slat wall around a wall-mounted TV, with white built-in shelves at the left and a white floating console below the screen.",
      "50% 45%",
    ),
    "Slat media wall with built-in shelves and floating console",
  ),
  project(
    "media-walls-11",
    WALLS,
    photo(
      `${MEDIA}/media-walls-11/cover-1126.webp`,
      1126,
      1080,
      "Navy blue accent wall with a walnut slat strip, a white TV panel and a white floating console lit from behind.",
      "50% 40%",
    ),
    "Navy accent wall with a walnut slat strip and floating console",
  ),
  project(
    "media-walls-12",
    WALLS,
    photo(
      `${MEDIA}/media-walls-12/cover-739.webp`,
      739,
      1281,
      "Slat and panel TV wall with a linear electric fireplace burning below the screen.",
      "50% 35%",
    ),
    "Slat and panel TV wall with a linear fireplace",
  ),
  project(
    "media-walls-13",
    WALLS,
    photo(
      `${MEDIA}/media-walls-13/cover-660.webp`,
      660,
      1554,
      "Tall marble-look panel wall in a two-storey room, with blue fluted trim beside the panels and a TV set low into the wall.",
      "50% 35%",
    ),
    "Tall marble-look panel wall with blue fluted trim",
  ),
];

/**
 * The pair on the home page and the media walls service page: the same TV,
 * cropped so it lands in the same place in both frames.
 * Before crop 1232x924 at (223,218); after crop 1800x1350 at (600,0).
 */
export const mediaWallPair = {
  before: photo(
    `${MEDIA}/media-walls-10/pair-before-1600.webp`,
    1600,
    1200,
    "A TV and soundbar on a bare beige wall, before the media wall was built.",
    "50% 50%",
  ),
  after: photo(
    `${MEDIA}/media-walls-10/pair-after-1600.webp`,
    1600,
    1200,
    "The same wall finished in vertical wood slats, with white built-in shelves at the left and a white floating console under the TV.",
    "50% 50%",
  ),
  caption: "Slat media wall",
};

/** Blinds. Only blinds-01 is faux wood; the rest are zebra or roller shades. */
const blinds: GalleryProject[] = [
  project(
    "blinds-01",
    BLINDS,
    photo(
      `${MEDIA}/blinds-01/cover-1179.webp`,
      1179,
      1352,
      "White faux wood blinds lowered on two living room windows, above two armchairs.",
      "50% 45%",
    ),
    "Faux wood blinds on two living room windows",
  ),
  project(
    "blinds-02",
    BLINDS,
    photo(
      `${MEDIA}/blinds-02/cover-1031.webp`,
      1031,
      1440,
      "Zebra shades on two tall windows over a light wood sideboard, with clerestory windows above.",
      "50% 45%",
    ),
    "Zebra shades on two tall windows",
  ),
  project(
    "blinds-03",
    BLINDS,
    photo(
      `${MEDIA}/blinds-03/cover-1600.webp`,
      1600,
      1631,
      "Zebra shades on three windows around a glass dining table, with a chandelier above.",
      "50% 45%",
    ),
    "Zebra shades in a dining nook",
  ),
  project(
    "blinds-04",
    BLINDS,
    photo(
      `${MEDIA}/blinds-04/cover-1164.webp`,
      1164,
      1920,
      "Zebra shades on tall two-story windows in a vaulted living room, above a brown sectional.",
      "50% 40%",
    ),
    "Zebra shades on tall two-story windows",
  ),
  project(
    "blinds-05",
    BLINDS,
    photo(
      `${MEDIA}/blinds-05/cover-1600.webp`,
      1600,
      1589,
      "White roller shades raised partway on three windows in an empty room.",
      "50% 45%",
    ),
    "Roller shades on three windows",
  ),
  project(
    "blinds-06",
    BLINDS,
    photo(
      `${MEDIA}/blinds-06/cover-1600.webp`,
      1600,
      1901,
      "Roller shades pulled halfway down on a bay window, with a pool visible outside.",
      "50% 45%",
    ),
    "Roller shades in a bay window with a pool view",
  ),
  project(
    "blinds-07",
    BLINDS,
    photo(
      `${MEDIA}/blinds-07/cover-1080.webp`,
      1080,
      1440,
      "Roller shades on four tall windows along a sunny room, beside a light sofa.",
      "50% 45%",
    ),
    "Roller shades in a sunny living room",
  ),
];

/** Patio screens. */
const patioScreens: GalleryProject[] = [
  project(
    "patio-screens-01",
    PATIO,
    photo(
      `${MEDIA}/patio-screens-01/cover-1449.webp`,
      1449,
      2576,
      "A large grey patio screen lowered over a wall opening, with two air-conditioning units in front.",
      "50% 40%",
    ),
    "Patio screen lowered over a wall opening",
  ),
  project(
    "patio-screens-02",
    PATIO,
    photo(
      `${MEDIA}/patio-screens-02/cover-335.webp`,
      335,
      365,
      "A dark patio screen fitted to a covered front porch on a stucco house, with a lake behind.",
      "50% 50%",
    ),
    "Patio screen on a front porch",
  ),
  project(
    "patio-screens-03",
    PATIO,
    photo(
      `${MEDIA}/patio-screens-03/cover-677.webp`,
      677,
      719,
      "A dark patio screen drawn across a gable end above a pool, on a white house.",
      "50% 50%",
    ),
    "Patio screen across a gable end above a pool",
  ),
];

/** Garage doors. The only real before/after pair in the set. */
const garageDoors: GalleryProject[] = [
  {
    slug: "garage-doors-01",
    kind: "ba",
    tag: GARAGE,
    service: tagToService[GARAGE] ?? null,
    citySlug: null,
    title: "Garage door replacement, before and after",
    city: "",
    line: "",
    ratio: "629 / 348",
    before: photo(
      `${MEDIA}/garage-doors-01/before-629.webp`,
      629,
      348,
      "The original white panel garage door on a brick house, seen from the driveway.",
      "50% 50%",
    ),
    after: photo(
      `${MEDIA}/garage-doors-01/after-629.webp`,
      629,
      348,
      "The same brick house with a new black garage door with a row of windows.",
      "50% 50%",
    ),
  },
  {
    slug: "garage-doors-02",
    kind: "ba",
    tag: GARAGE,
    service: tagToService[GARAGE] ?? null,
    citySlug: null,
    title: "Garage door replacement, before and after",
    city: "",
    line: "",
    ratio: "415 / 272",
    before: photo(
      `${MEDIA}/garage-doors-02/before-832.webp`,
      832,
      547,
      "An older white panel garage door under a grey gable, seen from the driveway before replacement.",
      "50% 50%",
    ),
    after: photo(
      `${MEDIA}/garage-doors-02/after-415.webp`,
      415,
      272,
      "The same house with a new white garage door with a row of windows, new trim and a wall lamp.",
      "50% 50%",
    ),
  },
  {
    slug: "garage-doors-03",
    kind: "ba",
    tag: GARAGE,
    service: tagToService[GARAGE] ?? null,
    citySlug: null,
    title: "Garage door replacement, before and after",
    city: "",
    line: "",
    ratio: "1270 / 1017",
    before: photo(
      `${MEDIA}/garage-doors-03/before-1293.webp`,
      1293,
      1007,
      "A close view of an older white panel garage door and its trim, before replacement.",
      "50% 50%",
    ),
    after: photo(
      `${MEDIA}/garage-doors-03/after-1270.webp`,
      1270,
      1017,
      "The same garage with a new white door with a row of windows at the top, new trim and a wall lamp.",
      "50% 50%",
    ),
  },
  project(
    "garage-doors-04",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-04/cover-845.webp`,
      845,
      416,
      "A cream garage door with a stone surround and raw wood trim posts, seen from the driveway.",
      "50% 50%",
    ),
    "Cream garage door with stone surround and raw wood trim",
  ),
  project(
    "garage-doors-05",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-05/cover-706.webp`,
      706,
      622,
      "A black garage door with a row of side windows, set in white stucco.",
      "50% 50%",
    ),
    "Modern black garage door with side windows",
  ),
  project(
    "garage-doors-06",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-06/cover-832.webp`,
      832,
      628,
      "An older grey garage door from inside the garage, with the torsion spring and track above it.",
      "50% 50%",
    ),
    "Garage door with spring and track, interior",
  ),
  project(
    "garage-doors-07",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-07/cover-1315.webp`,
      1315,
      1011,
      "A grey garage door inside a garage during a replacement, with a ladder, boxes and tools around it.",
      "50% 50%",
    ),
    "Garage door mid-replacement, interior",
  ),
  project(
    "garage-doors-08",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-08/cover-1307.webp`,
      1307,
      1036,
      "Two white garage doors with rows of window panels, seen from inside the garage.",
      "50% 50%",
    ),
    "Two-bay garage doors with window panels, interior view",
  ),
  project(
    "garage-doors-09",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-09/cover-821.webp`,
      821,
      842,
      "A white garage door with frosted side windows, seen from inside a new garage.",
      "50% 50%",
    ),
    "Garage door with frosted side windows, new construction",
  ),
  /** Second photo of the cream-door job: shown under its main card, not in the grid. */
  project(
    "garage-doors-04-b",
    GARAGE,
    photo(
      `${MEDIA}/garage-doors-04/2-780.webp`,
      780,
      417,
      "The same cream garage door and raw wood trim from the other side, with the stone corner at the right.",
      "50% 50%",
    ),
    "Cream door and raw wood trim, second view",
  ),
];

/** Widest garage photo: the garage service hero and the home tile. */
const garage08 = garageDoors.find((item) => item.slug === "garage-doors-08");
export const garageHero = garage08?.photo as Photo;

/** Cabinets, closets and counters. No service page: /gallery only. */
const otherWork: GalleryProject[] = [
  project(
    "other-01",
    OTHER,
    photo(
      `${MEDIA}/other-01/cover-900.webp`,
      900,
      1600,
      "Unfinished plywood cabinet and shelf units standing in a metal-walled shop.",
      "50% 50%",
    ),
    "Unfinished cabinet and shelf units in the shop",
  ),
  project(
    "other-02",
    OTHER,
    photo(
      `${MEDIA}/other-02/cover-1600.webp`,
      1600,
      900,
      "A newly built wood vanity cabinet with a marble top, set against a white wall, with tools on top.",
      "50% 50%",
    ),
    "Unfinished wood vanity with a marble top",
  ),
  project(
    "other-03",
    OTHER,
    photo(
      `${MEDIA}/other-03/cover-1449.webp`,
      1449,
      2576,
      "White built-in closet shelving and a hanging rod, seen through a doorway.",
      "50% 45%",
    ),
    "Built-in closet shelving",
  ),
  project(
    "other-04",
    OTHER,
    photo(
      `${MEDIA}/other-04/cover-1179.webp`,
      1179,
      2064,
      "Two white closet shelving units with black shelf edges, side by side.",
      "50% 45%",
    ),
    "Closet shelving units",
  ),
  project(
    "other-05",
    OTHER,
    photo(
      `${MEDIA}/other-05/cover-1126.webp`,
      1126,
      2000,
      "A white marble-look countertop laid over a kitchen island, with cabinets in the background.",
      "50% 50%",
    ),
    "Marble countertop refinish in a kitchen",
  ),
  project(
    "other-05-b",
    OTHER,
    photo(
      `${MEDIA}/other-05/2-1126.webp`,
      1126,
      2000,
      "Wider view of the same marble-look island countertop, with pendant lights and a range hood behind.",
      "50% 50%",
    ),
    "Marble countertop refinish, wider view",
  ),
  project(
    "other-06",
    OTHER,
    photo(
      `${MEDIA}/other-06/cover-1080.webp`,
      1080,
      1920,
      "Kitchen cabinets painted white above the counter and black below, beside a gas cooktop.",
      "50% 50%",
    ),
    "Kitchen cabinets painted white and black",
  ),
];

/** No Christmas lights photos exist yet, so the card stays a labelled slot. */
const christmasLights: GalleryProject[] = [
  {
    slug: "christmas-lights-01",
    kind: "photo",
    tag: "Christmas lights",
    service: tagToService["Christmas lights"] ?? null,
    citySlug: null,
    title: "[ Project title ]",
    city: "",
    line: "",
    ratio: "4 / 3",
    slot: "[ IMAGE 4:3 · 1200×900 ]",
  },
];

/** The /gallery grid. Mixed orientations, the same masonry as the artboard. */
export const galleryProjects: GalleryProject[] = [
  mediaWalls[0],
  blinds[0],
  garageDoors[0],
  mediaWalls[1],
  patioScreens[0],
  otherWork[1],
  garageDoors[1],
  mediaWalls[2],
  blinds[2],
  garageDoors[2],
  mediaWalls[4],
  otherWork[5],
  patioScreens[2],
  garageDoors[3],
  mediaWalls[6],
  blinds[3],
  otherWork[2],
  garageDoors[4],
  mediaWalls[8],
  blinds[5],
  mediaWalls[3],
  garageDoors[5],
  otherWork[0],
  patioScreens[1],
  mediaWalls[5],
  garageDoors[6],
  blinds[1],
  otherWork[3],
  mediaWalls[7],
  garageDoors[7],
  blinds[4],
  garageDoors[8],
  mediaWalls[9],
  mediaWalls[10],
  mediaWalls[11],
  mediaWalls[12],
  mediaWalls[13],
  otherWork[4],
  blinds[6],
  otherWork[6],
  christmasLights[0],
];

/** Two rows for the home marquee. */
export const marqueeRowA: GalleryProject[] = [
  garageDoors[0],
  mediaWalls[0],
  patioScreens[0],
  blinds[0],
  mediaWalls[8],
  otherWork[1],
];

export const marqueeRowB: GalleryProject[] = [
  mediaWalls[2],
  blinds[5],
  patioScreens[2],
  otherWork[5],
  mediaWalls[6],
  blinds[2],
];

export const galleryFilters = [
  "All",
  "Garage doors",
  "Blinds",
  "Patio screens",
  "Media walls",
  "Christmas lights",
  "Other work",
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

/** Projects tagged to a service page. */
export const projectsByService = (service: string): GalleryProject[] =>
  galleryProjects.filter((item) => item.service === service);

/** Hero photos, only where the source is at least 1200px wide. */
export const heroPhotos = {
  mediaWalls: mediaWalls[0].photo,
  patioScreens: patioScreens[0].photo,
};

/** The one real before/after pair in the set. */
export const garagePair = {
  before: garageDoors[0].before as Photo,
  after: garageDoors[0].after as Photo,
  caption: "Garage door replacement",
};

export { mediaWalls, blinds, patioScreens, garageDoors, otherWork, christmasLights };
