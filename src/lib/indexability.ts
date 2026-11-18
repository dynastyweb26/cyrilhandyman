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

const BARE_TAG = /\[(?:CYRIL|PLACEHOLDER|CONFIRM)\]/i;
const ANY_TAG = /\s*\[(?:CYRIL|PLACEHOLDER|CONFIRM)\b[^\]]*\]/gi;
const TODO_MARK = /TODO_CONTENT/;

/**
 * Copy that is safe to show a visitor, or null.
 *
 * - TODO_CONTENT or a bare [CONFIRM] / [CYRIL] / [PLACEHOLDER] means the whole
 *   statement is unconfirmed, so it is hidden.
 * - A descriptive tag ("[CONFIRM door styles and brands offered]") asks for
 *   extra detail; it is stripped and the confirmed sentence around it stays.
 *
 * The data keeps its tags, so the noindex gate still sees them.
 */
export function publicText(text?: string | null): string | null {
  if (!text) return null;
  if (TODO_MARK.test(text) || BARE_TAG.test(text)) return null;
  const cleaned = text.replace(ANY_TAG, "").trim();
  return cleaned.length > 0 ? cleaned : null;
}
