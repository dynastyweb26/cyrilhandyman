/**
 * The eight cities, lifted from cyril-data.js — the content source of truth.
 *
 * Copy Cyril still has to confirm keeps its [CYRIL ...] / [CONFIRM ...] tag, so
 * it stays visible on the page and keeps that page out of the index until the
 * tag is replaced with real local detail.
 */

export type CitySlug =
  | "forney"
  | "mesquite"
  | "sunnyvale"
  | "rockwall"
  | "terrell"
  | "crandall"
  | "garland"
  | "frisco";

export type City = {
  slug: CitySlug;
  name: string;
  /** Neighbouring towns, in the order the data file lists them. */
  near: CitySlug[];
  /** Placeholder flags from the data file: no real projects or reviews yet. */
  projects: boolean;
  reviews: boolean;
  intro: string;
  see: string;
  /** Forney is where the crew is based. */
  homeBase: boolean;
  badge: "HOME BASE" | "NEW" | null;
  seo: { title: string; description: string };
};

export const cities: City[] = [
  {
    slug: "forney",
    name: "Forney",
    near: ["mesquite", "terrell", "crandall"],
    projects: true,
    reviews: true,
    homeBase: true,
    badge: "HOME BASE",
    intro:
      "Our home base. Garage doors, faux wood blinds, patio screens, media walls and Christmas lights, plus the smaller repairs in between.",
    see: "[CYRIL: add real local detail — which Forney neighborhoods you work in most, what the homes are like (age, builders, garage sizes), and which jobs Forney homeowners ask for first.]",
    seo: {
      title: "Forney, TX Handyman & Door Services | Cyril",
      description:
        "Forney’s home-base handyman and door crew: garage doors, faux wood blinds, patio screens, media walls and Christmas lights. Call 945-344-4580.",
    },
  },
  {
    slug: "mesquite",
    name: "Mesquite",
    near: ["sunnyvale", "garland", "forney"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: null,
    intro:
      "Garage door repairs and new doors, faux wood blinds and patio screens for Mesquite homes. One call sets the day.",
    see: "[CYRIL: add real local detail — the Mesquite areas you work in, older vs. newer homes you see there, and the most common Mesquite requests.]",
    seo: {
      title: "Handyman & Door Services in Mesquite, TX | Cyril",
      description:
        "Garage door repair and installation, faux wood blinds and patio screens in Mesquite, TX. Simple scheduling by phone: 945-344-4580.",
    },
  },
  {
    slug: "sunnyvale",
    name: "Sunnyvale",
    near: ["mesquite", "forney", "garland"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: null,
    intro:
      "Media walls, faux wood blinds and garage doors for Sunnyvale homeowners. Tell us what you have in mind and we’ll set a time.",
    see: "[CYRIL: add real local detail — Sunnyvale neighborhoods, lot and home sizes you see, and what Sunnyvale customers usually call about.]",
    seo: {
      title: "Handyman & Door Services in Sunnyvale, TX | Cyril",
      description:
        "Media and accent walls, faux wood blinds and garage doors for Sunnyvale, TX homes. One call to schedule: 945-344-4580.",
    },
  },
  {
    slug: "rockwall",
    name: "Rockwall",
    near: ["garland", "forney", "mesquite"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: null,
    intro:
      "Patio screens, garage doors and Christmas lights in Rockwall. Travel isn’t an issue. Call and we’ll get you on the schedule.",
    see: "[CYRIL: add real local detail — Rockwall areas you work in, lake-side vs. in-town homes, and the jobs Rockwall homeowners ask for most.]",
    seo: {
      title: "Handyman & Door Services in Rockwall, TX | Cyril",
      description:
        "Patio screens, garage doors and Christmas light installation in Rockwall, TX. Travel isn’t an issue. Call 945-344-4580.",
    },
  },
  {
    slug: "terrell",
    name: "Terrell",
    near: ["forney", "crandall"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: null,
    intro: "Garage doors, blinds and handyman repairs in Terrell. Scheduling is one phone call.",
    see: "[CYRIL: add real local detail — Terrell neighborhoods, the age of homes you see there, and common Terrell requests.]",
    seo: {
      title: "Handyman & Door Services in Terrell, TX | Cyril",
      description:
        "Garage doors, faux wood blinds and handyman repairs in Terrell, TX, from a Forney-based crew. Call 945-344-4580 to schedule.",
    },
  },
  {
    slug: "crandall",
    name: "Crandall",
    near: ["forney", "terrell"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: null,
    intro:
      "From a new garage door opener to a full accent wall, we work in Crandall homes. Call to set a time.",
    see: "[CYRIL: add real local detail — Crandall subdivisions you work in, what the homes are like, and what Crandall customers call about.]",
    seo: {
      title: "Handyman & Door Services in Crandall, TX | Cyril",
      description:
        "Garage door openers, accent walls, blinds and patio screens for Crandall, TX homes. Scheduling is one phone call: 945-344-4580.",
    },
  },
  {
    slug: "garland",
    name: "Garland",
    near: ["mesquite", "sunnyvale", "rockwall"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: "NEW",
    intro:
      "Now serving Garland: garage doors, blinds, patio screens, media walls and Christmas lights. Same crew, same phone number.",
    see: "[CYRIL: add real local detail — the Garland areas you cover, typical home age there, and the first Garland jobs you’ve done.]",
    seo: {
      title: "Handyman & Door Services in Garland, TX | Cyril",
      description:
        "Now serving Garland, TX: garage doors, faux wood blinds, patio screens, media walls and Christmas lights. Call 945-344-4580.",
    },
  },
  {
    slug: "frisco",
    name: "Frisco",
    near: ["garland", "rockwall"],
    projects: false,
    reviews: false,
    homeBase: false,
    badge: "NEW",
    intro: "Now serving Frisco. The same five specialties, booked with one phone call.",
    see: "[CYRIL: add real local detail — the Frisco neighborhoods you work in, newer-build details you see, and what Frisco customers ask for.]",
    seo: {
      title: "Handyman & Door Services in Frisco, TX | Cyril",
      description:
        "Now serving Frisco, TX: garage doors, faux wood blinds, patio screens, media walls and Christmas lights. One call: 945-344-4580.",
    },
  },
];

/** City pages live at /service-areas/<slug>. Accepts a slug or any object with one. */
export const cityHref = (city: string | { slug: string }): string =>
  `/service-areas/${typeof city === "string" ? city : city.slug}`;

export const getCity = (slug: string): City | undefined => cities.find((city) => city.slug === slug);

export const cityName = (slug: string): string => getCity(slug)?.name ?? slug;
