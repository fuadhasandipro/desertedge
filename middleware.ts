// middleware.ts — project ROOT next to package.json

import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
    ],
};

// All 50 US state abbreviations (lowercase) to distinguish
// az.domain.com (state) vs american-canyon-ca.domain.com (city)
const US_STATES = new Set([
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
    "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
    "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
    "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
    "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
]);

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get("host") || "";
    const currentPath = url.pathname;

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const hostWithoutPort = hostname.replace(/:.*$/, "");
    const rootWithoutPort = ROOT_DOMAIN.replace(/:.*$/, "");

    // ── 1. Block direct access to internal routing paths ─────────────────────
    // Googlebot and users hitting these paths directly get a hard 404.
    if (
        currentPath.startsWith("/city-sites") ||
        currentPath.startsWith("/state-sites")
    ) {
        url.pathname = "/404";
        return NextResponse.rewrite(url, { status: 404 });
    }

    // ── 2. Detect subdomain ───────────────────────────────────────────────────
    let subdomain: string | null = null;

    if (hostWithoutPort.endsWith(`.${rootWithoutPort}`)) {
        subdomain = hostWithoutPort.slice(
            0,
            hostWithoutPort.length - rootWithoutPort.length - 1
        );
    }

    if (subdomain === "www") subdomain = null;

    // ── 3. Root domain — serve normally ──────────────────────────────────────
    if (!subdomain) {
        return NextResponse.next();
    }

    const sub = subdomain.toLowerCase();

    // ── 4. State subdomain ────────────────────────────────────────────────────
    // Exactly 2 chars + matches a real US state code
    // az.domain.com/          → /state-sites/az
    // az.domain.com/cities    → /state-sites/az/cities
    if (sub.length === 2 && US_STATES.has(sub)) {
        const rewritePath =
            currentPath === "/"
                ? `/state-sites/${sub}`
                : `/state-sites/${sub}${currentPath}`;

        url.pathname = rewritePath;
        return NextResponse.rewrite(url);
    }

    // ── 5. City subdomain ─────────────────────────────────────────────────────
    // american-canyon-ca.domain.com/ → /city-sites/american-canyon-ca
    // american-canyon-ca.domain.com/services/leak-repair
    //                                → /city-sites/american-canyon-ca/services/leak-repair
    const rewritePath =
        currentPath === "/"
            ? `/city-sites/${sub}`
            : `/city-sites/${sub}${currentPath}`;

    url.pathname = rewritePath;
    return NextResponse.rewrite(url);
}