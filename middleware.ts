// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { US_STATES_SET } from "@/lib/constants";

const CACHE_VERSION = "20260305"; // Change this to clear cache site-wide

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get("host") ?? "";
    const currentPath = url.pathname;

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const hostWithoutPort = hostname.replace(/:.*$/, "");
    const rootWithoutPort = ROOT_DOMAIN.replace(/:.*$/, "");

    // ── 1. Redirect /city-sites/** and /state-sites/** to proper subdomain ────
    if (currentPath.startsWith("/city-sites") || currentPath.startsWith("/state-sites")) {
        const pathParts = currentPath.split("/").filter(Boolean);
        const subSlug = pathParts[1]; // e.g. "dallas-tx"
        const remainingPath = pathParts.slice(2).join("/");

        if (subSlug) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.hostname = `${subSlug}.${rootWithoutPort}`;
            redirectUrl.pathname = `/${remainingPath}`;
            return NextResponse.redirect(redirectUrl, 308);
        }
        url.pathname = "/404";
        return NextResponse.rewrite(url, { status: 404 });
    }

    // ── 2. Detect subdomain ───────────────────────────────────────────────────
    let subdomain: string | null = null;

    if (hostWithoutPort.endsWith(`.${rootWithoutPort}`)) {
        subdomain = hostWithoutPort.slice(0, hostWithoutPort.length - rootWithoutPort.length - 1);
    }

    // ── 3. Redirect www → root ────────────────────────────────────────────────
    if (subdomain === "www") {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.hostname = rootWithoutPort;
        return NextResponse.redirect(redirectUrl, 308);
    }

    // ── 4. Root domain — serve normally ──────────────────────────────────────
    if (!subdomain) return NextResponse.next();

    const sub = subdomain.toLowerCase();

    // ── 5. State subdomain (2-letter code matching a real US state) ───────────
    if (sub.length === 2 && US_STATES_SET.has(sub)) {
        url.pathname = currentPath === "/" ? `/state-sites/${sub}` : `/state-sites/${sub}${currentPath}`;
        url.searchParams.set("v", CACHE_VERSION);
        return NextResponse.rewrite(url);
    }

    // ── 6. City subdomain ─────────────────────────────────────────────────────
    url.pathname = currentPath === "/" ? `/city-sites/${sub}` : `/city-sites/${sub}${currentPath}`;
    url.searchParams.set("v", CACHE_VERSION);
    return NextResponse.rewrite(url);
}