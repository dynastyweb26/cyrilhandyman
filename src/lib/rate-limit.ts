/**
 * Best-effort in-memory rate limiter.
 *
 * Caveat: this is per server instance, so on Vercel it only throttles within a
 * warm lambda. It stops naive form spam; a durable limiter (Upstash/KV or a DB
 * counter) is the production upgrade if abuse appears.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_KEYS = 5000;

const attempts = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfterMinutes: number } {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_ATTEMPTS) {
    const oldest = recent[0] ?? now;
    const retryAfterMinutes = Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 60000));
    attempts.set(key, recent);
    return { allowed: false, retryAfterMinutes };
  }

  recent.push(now);
  attempts.set(key, recent);

  // Keep the map from growing without bound in a long-lived instance.
  if (attempts.size > MAX_KEYS) {
    for (const [storedKey, times] of attempts) {
      if (times.every((time) => now - time >= WINDOW_MS)) attempts.delete(storedKey);
    }
  }

  return { allowed: true, retryAfterMinutes: 0 };
}
