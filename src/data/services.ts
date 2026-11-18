/**
 * The five specialties, lifted from cyril-data.js — the content source of truth.
 *
 * Jobs and FAQs carry the same [CONFIRM ...] tags as the data file: nothing is
 * invented, and the tags keep the page out of the index until Cyril answers.
 */

import type { Photo } from "@/data/gallery";
import {
  blinds,
  garageHero,
  garagePair,
  heroPhotos,
  mediaWallPair,
  mediaWalls,
  patioScreens,
} from "@/data/gallery";

export type ServiceSlug =
  | "garage-door-repair-installation"
  | "faux-wood-blinds"
  | "motorized-retractable-patio-screens"
  | "media-walls-accent-walls"
  | "christmas-light-installation";

export type Service = {
  slug: ServiceSlug;
  /** Short label, used in tiles and links. */
  name: string;
  /** Full service name, used in H1s. */
  long: string;
  promise: string;
  /** What the media slot should show, e.g. "garage door install". */
  slot: string;
  /** Real hero photo, only where the source is at least 1200px wide. */
  hero?: Photo;
  /** Real before/after pair, when one exists for this service. */
  pair?: { before: Photo; after: Photo; caption?: string };
  /** Best available photo for a photo-backed service tile. */
  tile?: Photo;
  /** One line for cards. */
  short: string;
  jobs: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
  /** Value the quote form's service select uses. */
  formValue: string;
  tone: "ink" | "sand" | "red";
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "garage-door-repair-installation",
    name: "Garage doors",
    long: "Garage Door Repair & Installation",
    promise: "New garage doors, openers, springs and repairs, scheduled with one phone call.",
    slot: "garage door install",
    // 1307px wide: the two-bay interior shot, sharp enough for the hero.
    hero: garageHero,
    pair: garagePair,
    tile: garageHero,
    short: "New doors, openers, springs, repairs.",
    formValue: "garage-doors",
    tone: "ink",
    jobs: [
      {
        t: "New doors",
        d: "Measured, supplied and installed. We install every type, including popular brands like Clopay, Amarr and Wayne Dalton.",
      },
      { t: "Openers", d: "New openers and replacements on an existing door." },
      {
        t: "Springs",
        d: "Broken or worn springs replaced so the door lifts the way it should.",
      },
      { t: "Repairs", d: "Off-track doors, noisy rollers, damaged panels and the rest." },
    ],
    faqs: [
      {
        q: "Do you repair broken springs?",
        a: "Yes, and same-day spring repair is available. Spring replacement is one of the jobs we do most.",
      },
      { q: "Do you haul away the old door?", a: "Yes. We haul away the old door when we install the new one." },
    ],
    seo: {
      title: "Garage Door Repair & Installation in Forney, TX | Cyril",
      description:
        "Garage door repair, new doors, openers and springs in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
  {
    slug: "faux-wood-blinds",
    name: "Faux wood blinds",
    long: "Faux Wood Blinds",
    promise: "Faux wood blinds, measured and installed in your home.",
    slot: "blinds in a window",
    // blinds-01 is 1179px wide: below the 1200px hero floor, so no hero.
    tile: { ...blinds[0].photo!, position: "50% 35%" },
    short: "Measured and installed.",
    formValue: "faux-wood-blinds",
    tone: "sand",
    jobs: [
      { t: "Measured", d: "We measure every window ourselves so the blinds fit the first time." },
      { t: "Installed", d: "Mounted, leveled and checked before we leave." },
      { t: "One window or the whole house", d: "Single rooms or every window at once." },
    ],
    faqs: [
      { q: "Do you measure the windows?", a: "Yes. We measure and install." },
      { q: "Can you do the whole house at once?", a: "Yes. We do single rooms or the whole house." },
      { q: "Where do the blinds come from?", a: "We source them from a private supplier." },
    ],
    seo: {
      title: "Faux Wood Blinds in Forney, TX | Cyril Handyman",
      description:
        "Faux wood blinds measured and installed in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
  {
    slug: "motorized-retractable-patio-screens",
    name: "Patio screens",
    long: "Motorized Retractable Patio Screens",
    promise: "Motorized retractable patio screens, fitted to your patio.",
    slot: "patio screen lowered",
    hero: heroPhotos.patioScreens,
    tile: patioScreens[2].photo,
    short: "Motorized, with a remote.",
    formValue: "patio-screens",
    tone: "sand",
    jobs: [
      {
        t: "Motorized screens",
        d: "Raise and lower with a remote.",
      },
      {
        t: "Out of sight when up",
        d: "They roll away when you don’t need them and come down when you do.",
      },
    ],
    faqs: [
      {
        q: "Do you install manual screens too?",
        a: "We install motorized screens. They raise and lower with a remote.",
      },
      { q: "Do motorized screens need power?", a: "Yes. Motorized screens need power at the patio for the motor." },
    ],
    seo: {
      title: "Motorized Retractable Patio Screens, Forney TX | Cyril",
      description:
        "Motorized retractable patio screens with remote control in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
  {
    slug: "media-walls-accent-walls",
    name: "Media & accent walls",
    long: "Media Walls & Accent Walls",
    promise: "Slat walls, panel walls and built-ins, designed with you and built in place.",
    slot: "media wall, finished",
    hero: heroPhotos.mediaWalls,
    pair: mediaWallPair,
    tile: mediaWalls[0].photo,
    short: "Slat, panel and built-ins.",
    formValue: "media-accent-walls",
    tone: "ink",
    jobs: [
      { t: "Slat walls", d: "Vertical slat walls for living rooms, offices and entries." },
      { t: "Panel walls", d: "Panel and trim accent walls, painted or stained." },
      { t: "Media walls", d: "Built around the TV, with the TV mounted and the wires hidden." },
    ],
    faqs: [
      {
        q: "What styles do you build?",
        a: "Slat walls, panel walls and media walls, built from wood, sheetrock, PVC and standard panels.",
      },
      { q: "Can you mount the TV and hide the wires?", a: "Yes. We mount the TV and hide the wires." },
      {
        q: "How long does a media wall take?",
        a: "About 5 days to build the pieces in our workshop, then 2 to 3 days to install, depending on the design.",
      },
    ],
    seo: {
      title: "Media Walls & Accent Walls in Forney, TX | Cyril",
      description:
        "Slat walls, panel walls and built-ins in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
  {
    slug: "christmas-light-installation",
    name: "Christmas lights",
    long: "Christmas Light Installation",
    promise: "Christmas lights hung on your house and taken down after the season.",
    slot: "house lit at night",
    short: "Hung and taken down.",
    formValue: "christmas-lights",
    tone: "red",
    jobs: [
      { t: "Install", d: "Hung by us, so you stay off the ladder." },
      { t: "Takedown", d: "After the season we take it all down." },
    ],
    faqs: [
      { q: "When should I book?", a: "We take bookings from now until Christmas." },
      {
        q: "Do you take the lights down after the season?",
        a: "Yes. Takedown is part of the service.",
      },
    ],
    seo: {
      title: "Christmas Light Installation in Forney, TX | Cyril",
      description:
        "Christmas lights hung and taken down after the season in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
];

export const serviceHref = (service: string | { slug: string }): string =>
  `/services/${typeof service === "string" ? service : service.slug}`;

export const getService = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
