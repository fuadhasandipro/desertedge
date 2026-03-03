// app/sitemap.ts — Root domain sitemap: homepage + all state subdomain entries
import type { MetadataRoute } from "next";
import { US_STATES_LC } from "@/lib/constants";

function randomRecentDate(): Date {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    return new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const stateEntries = US_STATES_LC.flatMap((state) => {
        const date = randomRecentDate();
        return [
            {
                url: `https://${state}.${ROOT_DOMAIN}/`,
                lastModified: date,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            },
            {
                url: `https://${state}.${ROOT_DOMAIN}/sitemap.xml`,
                lastModified: date,
                changeFrequency: "weekly" as const,
                priority: 0.6,
            },
        ];
    });

    return [
        {
            url: `https://${ROOT_DOMAIN}/`,
            lastModified: randomRecentDate(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...stateEntries,
    ];
}