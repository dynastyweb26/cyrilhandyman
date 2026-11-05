import type { City } from "@/data/site";

/** "Forney, Mesquite, … and Frisco" */
export function serviceAreasList(cities: City[]): string {
  const names = cities.map((city) => city.name);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}
