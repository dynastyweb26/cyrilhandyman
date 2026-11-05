import { NextResponse, type NextRequest } from "next/server";

/**
 * Legacy town URLs are gone (Kaufman and Heath are no longer served).
 *
 * next.config redirects only match an exact, lower-case path, so a request for
 * /service-areas/Heath or /service-areas/heath/ would fall through to the city
 * route and 404. This keeps those variants on a real 301 to the hub.
 */
const RETIRED = new Set(["heath", "kaufman"]);

export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean).map((part) => part.toLowerCase());

  const retired =
    (segments.length === 1 && RETIRED.has(segments[0])) ||
    (segments.length === 2 && segments[0] === "service-areas" && RETIRED.has(segments[1]));

  if (retired) {
    return NextResponse.redirect(new URL("/service-areas", request.url), 301);
  }

  // Everything else keeps Next's default trailing-slash behaviour (308 to the
  // path without the slash).
  const { pathname, search } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return NextResponse.redirect(new URL(`${pathname.replace(/\/+$/, "")}${search}`, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  // Broad enough to normalise any trailing slash, cheap enough to run on all
  // page requests; static assets and the image optimiser are excluded.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|images/).*)"],
};
