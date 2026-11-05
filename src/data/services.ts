/**
 * The five specialties, lifted from cyril-data.js — the content source of truth.
 *
 * Jobs and FAQs carry the same [CONFIRM ...] tags as the data file: nothing is
 * invented, and the tags keep the page out of the index until Cyril answers.
 */

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
    short: "New doors, openers, springs, repairs.",
    formValue: "garage-doors",
    tone: "ink",
    jobs: [
      {
        t: "New doors",
        d: "Measured, supplied and installed. [CONFIRM door styles and brands offered]",
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
        a: "Yes. Spring replacement is one of the jobs we do most. [CONFIRM same-day availability]",
      },
      {
        q: "Can you put a new opener on my existing door?",
        a: "[CONFIRM] Usually, yes. Tell us the door on the phone and we’ll let you know.",
      },
      { q: "Do you haul away the old door?", a: "[CONFIRM haul-away policy]" },
    ],
    seo: {
      title: "Garage Door Repair & Installation in Forney, TX",
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
    short: "Measured and installed.",
    formValue: "faux-wood-blinds",
    tone: "sand",
    jobs: [
      { t: "Measured", d: "We measure every window ourselves so the blinds fit the first time." },
      { t: "Installed", d: "Mounted, leveled and checked before we leave." },
      { t: "One window or the whole house", d: "[CONFIRM] Single rooms or every window at once." },
    ],
    faqs: [
      { q: "Do you measure the windows?", a: "Yes. We measure and install. [CONFIRM]" },
      { q: "Can you do the whole house at once?", a: "[CONFIRM]" },
      { q: "Where do the blinds come from?", a: "[CONFIRM supplier / brands]" },
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
    long: "Motorized & Retractable Patio Screens",
    promise: "Motorized and retractable patio screens, fitted to your patio.",
    slot: "patio screen lowered",
    short: "Motorized and retractable.",
    formValue: "patio-screens",
    tone: "sand",
    jobs: [
      {
        t: "Motorized screens",
        d: "Raise and lower with a switch or remote. [CONFIRM controls offered]",
      },
      {
        t: "Retractable screens",
        d: "Roll away when you don’t need them, come down when you do.",
      },
    ],
    faqs: [
      {
        q: "What’s the difference between motorized and retractable?",
        a: "Motorized screens raise and lower with a motor. Retractable screens roll up out of sight by hand. [CONFIRM options offered]",
      },
      { q: "Do motorized screens need an outlet nearby?", a: "[CONFIRM power requirements]" },
      {
        q: "Will screens fit my patio?",
        a: "[CONFIRM] Call and describe the patio, or send photos with a quote request.",
      },
    ],
    seo: {
      title: "Motorized & Retractable Patio Screens, Forney TX",
      description:
        "Motorized and retractable patio screens in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
  {
    slug: "media-walls-accent-walls",
    name: "Media & accent walls",
    long: "Media Walls & Accent Walls",
    promise: "Slat walls, panel walls and built-ins, designed with you and built in place.",
    slot: "media wall, finished",
    short: "Slat, panel and built-ins.",
    formValue: "media-accent-walls",
    tone: "ink",
    jobs: [
      { t: "Slat walls", d: "Vertical slat walls for living rooms, offices and entries." },
      { t: "Panel walls", d: "Panel and trim accent walls, painted or stained." },
      { t: "Built-ins", d: "Media walls and built-in shelving around the TV. [CONFIRM]" },
    ],
    faqs: [
      {
        q: "What styles do you build?",
        a: "Slat walls, panel walls and built-ins. [CONFIRM materials]",
      },
      { q: "Can you mount the TV and hide the wires?", a: "[CONFIRM]" },
      { q: "How long does a media wall take?", a: "[CONFIRM typical timeline]" },
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
    promise: "Christmas lights designed, hung, maintained through the season and taken down.",
    slot: "house lit at night",
    short: "Designed, hung, maintained, taken down.",
    formValue: "christmas-lights",
    tone: "red",
    jobs: [
      {
        t: "Design",
        d: "We walk the house with you and plan where the lights go: roofline, trees, windows, walkway. [CONFIRM]",
      },
      { t: "Install", d: "Hung by us, so you stay off the ladder." },
      {
        t: "Maintenance",
        d: "A strand goes out mid-season? Call and we’ll fix it. [CONFIRM terms]",
      },
      { t: "Takedown", d: "After the season we take it all down. [CONFIRM storage]" },
    ],
    faqs: [
      { q: "When should I book?", a: "[CONFIRM booking window]" },
      {
        q: "Do you take the lights down after the season?",
        a: "Yes. Takedown is part of the service.",
      },
      { q: "Do you supply the lights or use mine?", a: "[CONFIRM]" },
    ],
    seo: {
      title: "Christmas Light Installation in Forney, TX | Cyril",
      description:
        "Christmas lights designed, hung, maintained and taken down in Forney, TX and North Texas. Call Cyril Handyman & Door: 945-344-4580.",
    },
  },
];

export const serviceHref = (service: string | { slug: string }): string =>
  `/services/${typeof service === "string" ? service : service.slug}`;

export const getService = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
