/**
 * The noindex gate.
 *
 * Nothing on this site is invented: copy Cyril still has to supply keeps a
 * [CYRIL ...], [PLACEHOLDER ...] or [CONFIRM ...] tag. Any page whose rendered
 * data still carries one stays out of the index (robots noindex) and out of the
 * sitemap until the tag is replaced with real detail.
 */

const PENDING_TAG = /\[(?:CYRIL|PLACEHOLDER|CONFIRM)\b[^\]]*\]/i;

function scan(value: unknown): boolean {
  if (typeof value === "string") return PENDING_TAG.test(value);
  if (Array.isArray(value)) return value.some(scan);
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some(scan);
  }
  return false;
}

export function hasPendingTags(...values: unknown[]): boolean {
  return values.some(scan);
}

export { PENDING_TAG };
