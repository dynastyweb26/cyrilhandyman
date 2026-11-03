import { todo } from "./site";

/**
 * All copy for /services/christmas-light-installation.
 * Prices, dates, review quotes and photo paths are TODO_CONTENT on purpose —
 * nothing here is invented business fact.
 */
const cutoffHeadline = todo(
  "the date after which new installs close, e.g. Book by November 15",
);

export const christmas = {
  hero: {
    eyebrow: "Christmas light installation",
    title: "Christmas lights that go up, stay lit, and come down without you touching a ladder",
    intro:
      "Commercial-grade holiday lighting designed around your roofline, installed and maintained through the season, then removed and packed away in January. Homes and small commercial properties across North Texas.",
  },

  quickAnswer: {
    label: "The short answer",
    question: "How much does Christmas light installation cost?",
    answer:
      "Every property is priced on its own roofline — footage, height, trees and access all move the number. You get one flat quote before anything goes up, and it covers the design, the lights, the install, in-season repairs and the takedown.",
    points: [
      "One flat quote for the season — not a per-foot estimate that grows on install day.",
      "Install, mid-season maintenance and takedown are booked together.",
      "Residential rooflines and small commercial fronts are both handled.",
    ],
    price: todo("starting price or price range for a standard residential roofline"),
  },

  packages: [
    {
      name: "Roofline",
      tagline: "Single-story front elevations, eaves and gutters.",
      price: todo("Roofline package starting price"),
      includes: [
        "Front roofline and gutter runs",
        "Warm-white or single-color LED",
        "Timer or photocell control",
        "Install, maintenance and takedown",
      ],
      featured: false,
    },
    {
      name: "Roofline + landscape",
      tagline: "The roofline plus the yard lighting that makes it read from the street.",
      price: todo("Roofline + landscape package starting price"),
      includes: [
        "Everything in Roofline",
        "Wrapped trunks and shrub clusters",
        "Walkway or bed lighting",
        "Install, maintenance and takedown",
      ],
      featured: true,
    },
    {
      name: "Commercial & multi-story",
      tagline: "Storefronts, two-story homes and larger properties.",
      price: todo("commercial package starting price"),
      includes: [
        "Storefront, canopy and parking-island runs",
        "Two-story and steep-pitch access",
        "After-hours install window",
        "Install, maintenance and takedown",
      ],
      featured: false,
    },
  ],

  priceFactors: [
    {
      title: "Roofline length",
      body: "Footage is the biggest single input. Dormers, gables and multiple roof planes add runs and transitions.",
    },
    {
      title: "Height and pitch",
      body: "A steep second story takes longer to set up safely than a flat single-story eave, and that shows up in the price.",
    },
    {
      title: "Trees and shrubs",
      body: "Wrapped trunks, canopy loops and bed lighting are quoted by count and by height.",
    },
    {
      title: "Power and outlets",
      body: "Outdoor outlets near the install area keep it simple. Long runs may need additional power access.",
    },
    {
      title: "Color and custom pieces",
      body: "Single warm-white is the standard. Multi-color, wreaths, garland and custom shapes are quoted separately.",
    },
    {
      title: "When you book",
      body: "Peak-season dates cost more because every crew is already booked. Early-season installs are the cheapest week on the calendar.",
    },
  ],

  cutoff: {
    label: "Booking cutoff",
    headline: cutoffHeadline,
    body: `Installs run ${todo("install season start")} through ${todo("install season end")}. Takedowns are scheduled ${todo("takedown window")}, so nothing is left hanging into February.`,
  },

  gallery: [
    {
      expectedPath: "/gallery/christmas/christmas-roofline-01.webp",
      alt: todo("alt text for the front-elevation roofline install photo"),
      caption: "Single-story roofline, warm white",
    },
    {
      expectedPath: "/gallery/christmas/christmas-roofline-02.webp",
      alt: todo("alt text for the two-story roofline photo"),
      caption: "Two-story roofline and gables",
    },
    {
      expectedPath: "/gallery/christmas/christmas-trees-01.webp",
      alt: todo("alt text for the wrapped tree photo"),
      caption: "Wrapped trunks and canopy",
    },
    {
      expectedPath: "/gallery/christmas/christmas-storefront-01.webp",
      alt: todo("alt text for the commercial storefront photo"),
      caption: "Storefront run",
    },
    {
      expectedPath: "/gallery/christmas/christmas-walkway-01.webp",
      alt: todo("alt text for the walkway lighting photo"),
      caption: "Walkway and bed lighting",
    },
    {
      expectedPath: "/gallery/christmas/christmas-takedown-01.webp",
      alt: todo("alt text for the takedown / storage photo"),
      caption: "Takedown and storage",
    },
  ],

  faqs: [
    {
      question: "How much does Christmas light installation cost?",
      answer: `It depends on the roofline. Footage, roof pitch, height, trees, access and color all change the total, so the quote is built from your property rather than a price list. ${todo("starting price")}`,
    },
    {
      question: "Do you take the lights down afterwards?",
      answer:
        "Yes. Takedown is part of the standard season package and is scheduled when you book, so you are not chasing anyone in January.",
    },
    {
      question: "Do I own the lights or are they rented?",
      answer: todo(
        "confirm the model — lights included in the package, rented, or purchased by the customer and stored between seasons",
      ),
    },
    {
      question: "When do I need to book by?",
      answer: cutoffHeadline,
    },
    {
      question: "What kind of lights do you install?",
      answer:
        "Commercial-grade LED strings rated for outdoor use, sized to the run and color you pick. Clips are matched to the roof material rather than fastening through the shingles.",
    },
    {
      question: "What happens if a strand goes out mid-season?",
      answer: `${todo("confirm the mid-season repair promise and how to report a problem")}`,
    },
    {
      question: "Do you light businesses too?",
      answer: `${todo("confirm commercial scope, after-hours installs and minimums")}`,
    },
  ],


  where: {
    headline: "Where we install",
    body: `Based in ${todo("city")} and installing across the towns below. Outside the list is usually possible — ask before you assume.`,
  },
} as const;

