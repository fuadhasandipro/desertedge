import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware.ts
export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const host = req.headers.get('host') || '';

    // Identify if we are on localhost or production root
    const isLocalhost = host.includes('localhost');
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

    // Extract subdomain
    // If local: "berlin.localhost:3000" -> ["berlin", "localhost:3000"]
    // If prod: "berlin.desertedge.com" -> ["berlin", "desertedge", "com"]
    const parts = host.split('.');

    // Determine the subdomain
    let subdomain = '';
    if (isLocalhost) {
        // In "berlin.localhost:3000", parts[0] is "berlin"
        // In "localhost:3000", parts[0] is "localhost:3000"
        if (parts.length > 1) subdomain = parts[0];
    } else {
        if (parts.length > 2) subdomain = parts[0];
    }

    const reserved = ['www', 'app', 'admin', 'localhost'];

    if (subdomain && !reserved.includes(subdomain)) {
        url.pathname = `/city-sites/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // IMPORTANT: If no subdomain, let it proceed to the normal /app/page.tsx
    return NextResponse.next();
}


// Optional: Configure the middleware matcher
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
