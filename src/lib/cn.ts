/** Tiny classname joiner — no dependency needed for this site. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
