/**
 * Real Google reviews, copied verbatim from the business profile export.
 *
 * Nothing here is invented and nothing is edited: typos, casing, punctuation
 * and emoji are exactly as the reviewer wrote them. Dates are left out (the
 * export only had relative dates) and owner replies are not included.
 *
 * `city` is null for every review because no city is known for any of them.
 * That is why city pages show their empty state instead of reviews.
 */

export type ReviewService =
  | "motorized-retractable-patio-screens"
  | "media-walls-accent-walls"
  | null;

export type Review = {
  id: string;
  /** First name + last initial, as Google shows it. */
  name: string;
  /** Verbatim review text. */
  text: string;
  /** The service the reviewer names, when they name one. */
  service: ReviewService;
  city: null;
};

export const reviews: Review[] = [
  {
    id: "ruth-l",
    name: "Ruth L.",
    text: "He was very efficient and explained next step before starting each job.",
    service: null,
    city: null,
  },
  {
    id: "lemnyuy-n",
    name: "Lemnyuy N.",
    text: "Did an exceptional job installing my patio shades. Very happy with the job.",
    service: "motorized-retractable-patio-screens",
    city: null,
  },
  {
    id: "chopmoh-n",
    name: "Chopmoh N.",
    text: "Cyril Made a beautiful media Wall for my brand new house. Highly recommend for people building new houses. Great price",
    service: "media-walls-accent-walls",
    city: null,
  },
  {
    id: "eric-n",
    name: "Eric N.",
    text: "Excellent work and trustworthy. Strongly recommended for home projects for Celina/Aubrey families",
    service: null,
    city: null,
  },
  {
    id: "yakiesha-p",
    name: "Yakiesha P.",
    text: "Amazing job placing cabinet handles, extremely efficient and timely. Will be booking again for future handyman needs",
    service: null,
    city: null,
  },
  {
    id: "jiji-m",
    name: "Jiji M.",
    text: "Had a wonderful experience with Cyril. Knowledgeable, honest and dependable",
    service: null,
    city: null,
  },
  {
    id: "louis-t",
    name: "louis T.",
    text: "Cyril provide a magnificent service. He is on time and on budget.",
    service: null,
    city: null,
  },
  {
    id: "siddhartha-d",
    name: "siddhartha D.",
    text: "Cyrille has done an exceptional job and brought our design to life 100% and at a great price and kept us informed of the progress all along. Will definitely call him for all my other projects.",
    service: null,
    city: null,
  },
  {
    id: "rochelle-r",
    name: "Rochelle R.",
    text: "Thank you so much for getting my front door repaired. Would 100% recommend Cyrille for your home improvement needs and will be using him again for my future needs.",
    service: null,
    city: null,
  },
  {
    id: "emelda-m",
    name: "Emelda M.",
    text: "Incredible handyman, was able to deliver a very high quality wood work at my home. Thanks gentlemen",
    service: null,
    city: null,
  },
  {
    id: "neriso-z",
    name: "neriso Z.",
    text: "Was on time and got my new LG dish washer installed. Also helped me take away the old one for free to dispose",
    service: null,
    city: null,
  },
  {
    id: "fru-t",
    name: "Fru T.",
    text: "Fantastic work and I was satisfied with the results",
    service: null,
    city: null,
  },
  {
    id: "ghislain-w",
    name: "Ghislain W.",
    text: "Very reliable and affordable price",
    service: null,
    city: null,
  },
  {
    id: "erna-b",
    name: "ERNA B.",
    text: "So professional, experimented, fast with an affordable prices… I love his work thank you",
    service: null,
    city: null,
  },
  {
    id: "alveraz-c",
    name: "Alveraz C.",
    text: "Very professional & excellent job 👍 would recommend him to anyone!",
    service: null,
    city: null,
  },
  {
    id: "ngeme-r",
    name: "ngeme R.",
    text: "Very Efficient and Affordable 👍👍",
    service: null,
    city: null,
  },
  {
    id: "james-r",
    name: "James R.",
    text: "Man, cyril did a fantastic job. I'd recommend him anyway.",
    service: null,
    city: null,
  },
  {
    id: "elvis-m",
    name: "Elvis M.",
    text: "Very Affordable and Works Super fast. Definitely Recommend",
    service: null,
    city: null,
  },
  {
    id: "jennifer-c",
    name: "Jennifer C.",
    text: "Great experience! Fast service and reliable!",
    service: null,
    city: null,
  },
  {
    id: "brandon",
    name: "Brandon",
    text: "Super Efficient and works on time!! Definitely Recommend",
    service: null,
    city: null,
  },
];

/** The whole list is 5-star in the export, so the stars can be shown. */
export const allFiveStars = reviews.length > 0;

export const reviewCount = reviews.length;
