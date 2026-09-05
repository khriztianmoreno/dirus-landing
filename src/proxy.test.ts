import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { proxy } from "./proxy";

function request(path: string, acceptLanguage?: string) {
  return new NextRequest(new URL(path, "https://dirus.test"), {
    headers: acceptLanguage ? { "accept-language": acceptLanguage } : undefined,
  });
}

function locationOf(response: Response | undefined) {
  return response?.headers.get("location");
}

describe("proxy", () => {
  it("redirects the site root to Spanish by default", () => {
    const response = proxy(request("/"));

    expect(response?.status).toBe(307);
    expect(locationOf(response)).toBe("https://dirus.test/es");
  });

  it("redirects the root to Spanish when no preference is sent", () => {
    const response = proxy(request("/"));

    expect(locationOf(response)).toBe("https://dirus.test/es");
  });

  it("prefixes a locale-less path while keeping the path", () => {
    const response = proxy(request("/pricing", "es"));

    expect(locationOf(response)).toBe("https://dirus.test/es/pricing");
  });

  it("preserves the query string across the redirect", () => {
    const response = proxy(request("/pricing?plan=pro", "es"));

    expect(locationOf(response)).toBe("https://dirus.test/es/pricing?plan=pro");
  });

  it("leaves a request that already carries a locale alone", () => {
    expect(proxy(request("/es"))).toBeUndefined();
    expect(proxy(request("/en"))).toBeUndefined();
    expect(proxy(request("/en/pricing"))).toBeUndefined();
  });

  it("does not treat a longer segment as a locale prefix", () => {
    // "/english" starts with "en" as a string but is not the /en route.
    const response = proxy(request("/english", "es"));

    expect(locationOf(response)).toBe("https://dirus.test/es/english");
  });

  it.each(["/fr", "/de", "/pt-BR", "/fr/pricing"])(
    "lets %s through so the app answers 404",
    (path) => {
      // Every route in this app lives under /[locale], so a locale-shaped
      // first segment is a locale attempt. Redirecting /fr to /es/fr would
      // answer an invalid locale with a 307 towards a page that does not
      // exist; letting it through returns the 404 the URL deserves.
      expect(proxy(request(path, "es"))).toBeUndefined();
    },
  );

  it("still prefixes paths that are not locale-shaped", () => {
    expect(locationOf(proxy(request("/pricing", "es")))).toBe(
      "https://dirus.test/es/pricing",
    );
    expect(locationOf(proxy(request("/es-panol", "es")))).toBe(
      "https://dirus.test/es/es-panol",
    );
  });
});
