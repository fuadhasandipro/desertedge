import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname (e.g., "scottsdale.localhost:3000" or "scottsdale.desertedge.com")
    const hostname = req.headers.get('host') || '';

    // Define the root domain. 
    // IMPORTANT: If you are testing on localhost, this must be "localhost:3000"
    // If you are on Vercel/Production, this must be "desertedgeplumbing.com"
    const currentHost = process.env.NODE_ENV === 'production'
        ? 'desertedgeplumbing.com'
        : 'localhost:3000';

    // Check if we are on a subdomain
    // Logic: Hostname includes root domain, but is NOT the root domain itself
    const isSubdomain =
        hostname.includes(currentHost) &&
        hostname !== currentHost &&
        !hostname.startsWith('www.');

    if (isSubdomain) {
        // Extract the subdomain (e.g., "scottsdale")
        // We split by "." and take the first part
        const subdomain = hostname.split('.')[0];

        console.log(`>>> Rewriting subdomain: ${subdomain} to /city-sites/${subdomain}${url.pathname}`);

        // Rewrite the URL to the internal folder
        // The user sees: http://scottsdale.localhost:3000/
        // Next.js serves: /app/city-sites/scottsdale/page.tsx
        url.pathname = `/city-sites/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * 1. /api routes
         * 2. /_next (internal nextjs files)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};