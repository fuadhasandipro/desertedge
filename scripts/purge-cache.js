#!/usr/bin/env node

/**
 * Cloudflare Cache Purge Script
 * 
 * Usage:
 * CLOUDFLARE_API_TOKEN="..." CLOUDFLARE_ZONE_ID="..." node scripts/purge-cache.js
 */

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

if (!API_TOKEN || !ZONE_ID) {
    console.error("Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID environment variables are required.");
    process.exit(1);
}

async function purgeCache() {
    console.log(`Purging cache for zone ${ZONE_ID}...`);

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ purge_everything: true }),
            }
        );

        const result = await response.json();

        if (result.success) {
            console.log("✅ Cache purged successfully!");
        } else {
            console.error("❌ Failed to purge cache:");
            console.error(JSON.stringify(result.errors, null, 2));
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ An error occurred while purging cache:");
        console.error(error.message);
        process.exit(1);
    }
}

purgeCache();
