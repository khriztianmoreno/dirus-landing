import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { locales } from "@/lib/i18n/config";
import { resolveLocale } from "@/lib/i18n/detect";

// Matches a pathname whose first segment is shaped like a language tag:
// "/fr", "/pt-BR", "/fr/pricing". Every route in this app lives under
// /[locale], so a locale-shaped first segment is always a locale attempt
// rather than a page name. Anchored on the pathname itself to avoid indexing
// into split() and the unreachable fallback branch that would require.
const LOCALE_SHAPED_PATH = /^\/[a-z]{2}(-[a-z]{2})?(\/|$)/i;

function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    // The trailing slash check matters: without it "/english" would be read
    // as the "/en" route with a stray suffix.
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/**
 * Prefixes every locale-less request with a locale.
 *
 * Named `proxy` rather than `middleware`: the middleware file convention is
 * deprecated in Next.js 16 and renamed to proxy.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname)) return;

  // An unsupported but locale-shaped segment is left alone so the route
  // segment can answer 404. Redirecting /fr to /es/fr would reply to an
  // invalid locale with a 307 pointing at a page that does not exist.
  if (LOCALE_SHAPED_PATH.test(pathname)) return;

  const locale = resolveLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API surface and anything that looks like a file,
  // so static assets are not sent through a locale redirect.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[^/]+$).*)"],
};
