/**
 * Copy the service and city pages render outside their data files. Lives here
 * so the page, its noindex flag and the sitemap all check the same strings.
 */
import { getCity, type City } from "@/data/cities";

/** FAQs every service page carries. Part of the noindex gate. */
export const sharedFaqs = [
  {
    q: "Do you work in my town?",
    a: "We cover Forney, Mesquite, Sunnyvale, Rockwall, Terrell, Crandall, Garland and Frisco. Somewhere close by? Call and ask.",
  },
  {
    q: "How do I schedule?",
    a: "Call 945-344-4580. We’ll talk through the job and set a time on the same call.",
  },
  {
    q: "How soon can you come out?",
    a: "It depends on the job and the season. Call and we’ll give you our earliest time. [CONFIRM typical lead time]",
  },
];

/** The four-step process. Part of the noindex gate. */
export function serviceSteps(isChristmas: boolean) {
  return [
    { t: "Call or request a quote", d: "Call 945-344-4580 or send the form. Tell us what you need." },
    {
      t: isChristmas ? "We plan the design" : "We take a look",
      d: isChristmas
        ? "Roofline, trees, windows: we agree on the look with you. [CONFIRM]"
        : "We come out, measure and talk options. [CONFIRM on-site estimate]",
    },
    { t: "Pick a day", d: "We set the install date by phone. No portals." },
    {
      t: isChristmas ? "Hung, kept lit, taken down" : "We install",
      d: isChristmas
        ? "We hang everything, fix anything that goes out, and take it down after the season."
        : "Installed, cleaned up and checked with you before we leave.",
    },
  ];
}

/** City FAQs. Built here so the noindex gate checks what the page renders. */
export function cityFaqs(city: City) {
  const nearNames = city.near.map((nearSlug) => getCity(nearSlug)?.name ?? nearSlug);
  const nearList =
    nearNames.length > 1
      ? `${nearNames.slice(0, -1).join(", ")} and ${nearNames[nearNames.length - 1]}`
      : (nearNames[0] ?? "");

  return [
    {
      q: city.homeBase ? "Are you based in Forney?" : `Do you travel to ${city.name}?`,
      a: city.homeBase
        ? "Yes. Forney is home base for Cyril Handyman & Door."
        : `Yes. ${city.name} is part of our regular service area and travel isn’t an issue. [CONFIRM]`,
    },
    {
      q: "How do I schedule?",
      a: "Call 945-344-4580. We’ll talk through the job and set a time on the same call. Or send a quote request below and we’ll call you back.",
    },
    {
      q: "How soon can you come out?",
      a: "It depends on the job and the time of year. Call and we’ll give you the earliest time we have. [CONFIRM typical lead time]",
    },
    {
      q: `What areas near ${city.name} do you cover?`,
      a: `We also work in ${nearList}, plus the towns around them.`,
    },
  ];
}
