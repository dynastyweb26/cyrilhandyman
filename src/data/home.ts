/** Home page content, kept out of the components so copy is easy to swap. */

export const hero = {
  eyebrow: "Forney, TX · Registered LLC · 2+ years",
  title: "Garage doors to media walls. Same crew, every job.",
  intro:
    "The people who quote your job are the people who do it. Doors, blinds, patio screens, accent walls and holiday lights across Forney and the towns around it. [CONFIRM wording with Cyril]",
  primaryCta: { label: "Send a photo, get a quote", href: "#quote" },
  secondaryCta: { label: "See recent work", href: "/gallery" },
  trust: ["Registered Texas LLC", "2+ years", "Same crew on every job"],
  video: "/media/hero.mp4",
  poster: "/media/hero-poster.webp",
  videoSlot: "[ HERO VIDEO 16:9 loop · 1920×1080 · 15–20s, muted, no audio · poster 1920×1080 JPG ]",
  videoSlotMobile:
    "[ HERO POSTER 9:16 · 1080×1920 JPG shows first · VIDEO 9:16 loop · 720×1280, max 10s, loads after first paint ]",
};

export type Bento = {
  n: string;
  title: string;
  blurb: string;
  href: string;
  tone: "ink" | "sand" | "red";
  image?: { slot: string; alt: string; ratio: string; label: string };
};

export const bentoServices: Bento[] = [
  {
    n: "01",
    title: "Garage doors",
    blurb: "New doors, openers, springs, repairs. The shop's specialty.",
    href: "/services/garage-door-repair-installation",
    tone: "ink",
    image: {
      slot: "svc-garage",
      alt: "[ALT: New garage door installed on a home in Forney]",
      ratio: "5 / 2",
      label: "[ IMAGE 5:2 · 2000×800 — garage door install ]",
    },
  },
  {
    n: "02",
    title: "Faux wood blinds",
    blurb: "Measured and installed.",
    href: "/services/faux-wood-blinds",
    tone: "sand",
    image: {
      slot: "svc-blinds",
      alt: "[ALT: Faux wood blinds installed in a living room window]",
      ratio: "16 / 9",
      label: "[ IMAGE 16:9 · 1600×900 — blinds in a window ]",
    },
  },
  {
    n: "03",
    title: "Patio screens",
    blurb: "Motorized and retractable.",
    href: "/services/motorized-retractable-patio-screens",
    tone: "sand",
  },
  {
    n: "04",
    title: "Media & accent walls",
    blurb: "Slat, panel and built-ins.",
    href: "/services/media-walls-accent-walls",
    tone: "ink",
  },
  {
    n: "05",
    title: "Christmas lights",
    blurb: "Designed, hung, maintained, taken down.",
    href: "/services/christmas-light-installation",
    tone: "red",
  },
];

export const whoShowsUp = {
  eyebrow: "Who shows up",
  title: "The ones you talked to.",
  image: {
    slot: "crew",
    alt: "[ALT: Cyril and his crew standing in front of the company truck in Forney, TX]",
    label: "[ IMAGE 1:1 · 1600×1600 — Cyril and the crew, in front of the truck ]",
  },
  rows: [
    {
      term: "Cyril and his team do every job",
      detail: "No handoffs and no strangers. You meet the crew who does the work.",
    },
    {
      term: "Registered Texas LLC, 2+ years in",
      detail: "Local to Forney. Our name is on the truck and on every review.",
    },
    {
      term: "Working wholeheartedly",
      detail: "The job is finished right and the space is left cleaner than we found it.",
    },
  ],
};

export const steps = [
  { n: "1", title: "Send a photo", body: "Or call. Tell us the job and the city." },
  { n: "2", title: "Get a quote", body: "A clear price and a date. [ Confirm response time ]" },
  { n: "3", title: "We do the work", body: "The same crew you spoke to." },
  { n: "4", title: "Cleaner than we found it", body: "We walk through it with you before we leave." },
];

/**
 * FAQs from the artboard. Answers that still need Cyril are left as explicit
 * [CONFIRM …] labels — nothing is invented, and those entries are left out of
 * the FAQPage JSON-LD until they are real.
 */
export const faqs: { q: string; a: string; confirm?: string }[] = [
  {
    q: "Which cities do you serve?",
    a: "Forney, Mesquite, Sunnyvale, Rockwall, Terrell, Crandall, Garland and Frisco, plus the towns around them.",
    confirm: "[CONFIRM final list]",
  },
  {
    q: "How do I get a quote?",
    a: "Send a photo and your city through the form on this page, or call 945-344-4580.",
    confirm: "[CONFIRM response time]",
  },
  {
    q: "Do you take small jobs?",
    a: "Yes. Anything from a sticking door to a full media wall, with the same crew and the same standard.",
  },
  {
    q: "Who actually does the work?",
    a: "Cyril and his team do every job. No handoffs.",
  },
  { q: "How long does a garage door install take?", a: "", confirm: "[CONFIRM typical install time]" },
  { q: "How long until my faux wood blinds arrive?", a: "", confirm: "[CONFIRM lead time]" },
  {
    q: "What do motorized patio screens cost?",
    a: "It depends on the size of the opening, the fabric and the motor. Send a photo and we will quote from that.",
    confirm: '[CONFIRM whether a "starting at" price can be shown]',
  },
  {
    q: "When should I book Christmas lights?",
    a: "",
    confirm: "[CONFIRM booking window and takedown policy]",
  },
  {
    q: "What do you need from me to quote a media or accent wall?",
    a: "A photo of the wall, rough measurements and the look you want.",
  },
  { q: "How do you handle payment?", a: "", confirm: "[CONFIRM accepted payment methods and deposit policy]" },
];

export const whereWeWork = {
  eyebrow: "Where we work",
  title: "Forney and the towns around it.",
  note: "Each town has its own page with the work we’ve done there.",
  noteLink: "All service areas",
  map: {
    slot: "home-map",
    alt: "Map of the Cyril Handyman & Door service area around Forney, Texas and the towns served",
    label: "[ MAP 4:3 · 1600×1200 — service area shaded, no street address, no pin ]",
  },
};

export const quote = {
  eyebrow: "Quote by photo",
  titleLead: "Send a photo.",
  titleAccent: "Get a price.",
  body: "Snap the door, window, wall or roofline. Tell us the city. Cyril gets back to you with a price. [ Confirm response time ]",
  phoneLabel: "Rather talk it through?",
};

export const reviewsCopy = {
  title: "What neighbors say.",
  average: "[ X.X ]",
  count: "[ NN ]",
  profile: "https://g.page/[PLACEHOLDER]",
  placeholderBody: "[ Real review text goes here — pulled from Google reviews, nothing invented. ]",
  placeholderMeta: "[ First name ] · [ City ] · [ Service ]",
};
