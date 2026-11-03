import type { ReactElement } from "react";

type JsonLdData = Record<string, unknown>;

/**
 * Server-rendered JSON-LD. Rendered with the page HTML (no client JS), so
 * crawlers see it on first response.
 */
export function JsonLd({ data, id }: { data: JsonLdData; id?: string }): ReactElement {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Escape "<" so a stray sequence in copy can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
