/**
 * scripts/indexnow-ping.js
 * 
 * Pings IndexNow API with all city sitemap URLs to trigger
 * instant indexing on Bing, Yandex, and other IndexNow partners.
 * 
 * SETUP:
 *   1. Get your key from https://www.bing.com/indexnow
 *   2. Set INDEXNOW_KEY below
 *   3. Create public/[YOUR-KEY].txt with just the key as content
 *   4. Run: node scripts/indexnow-ping.js
 * 
 * RATE LIMIT: IndexNow allows 10,000 URLs per request.
 * This script chunks them automatically.
 */

const INDEXNOW_KEY = "c2d47f8abcf243ff9e1548fb04c6f597"; // ← paste your key here
const ROOT_DOMAIN = "desertedgeplumbing.com";

// All 50 states with city counts from your states.json
const STATES = [
  { state: "AL", count: 26 }, { state: "AK", count: 1 },
  { state: "AZ", count: 31 }, { state: "AR", count: 23 },
  { state: "CA", count: 150 }, { state: "CO", count: 30 },
  { state: "CT", count: 13 }, { state: "DE", count: 4 },
  { state: "FL", count: 121 }, { state: "GA", count: 52 },
  { state: "HI", count: 4 }, { state: "ID", count: 11 },
  { state: "IL", count: 86 }, { state: "IN", count: 47 },
  { state: "IA", count: 26 }, { state: "KS", count: 21 },
  { state: "KY", count: 25 }, { state: "LA", count: 18 },
  { state: "ME", count: 5 }, { state: "MD", count: 36 },
  { state: "MA", count: 20 }, { state: "MI", count: 38 },
  { state: "MN", count: 47 }, { state: "MS", count: 15 },
  { state: "MO", count: 35 }, { state: "MT", count: 6 },
  { state: "NE", count: 10 }, { state: "NV", count: 4 },
  { state: "NH", count: 4 }, { state: "NJ", count: 34 },
  { state: "NM", count: 12 }, { state: "NY", count: 44 },
  { state: "NC", count: 54 }, { state: "ND", count: 7 },
  { state: "OH", count: 84 }, { state: "OK", count: 22 },
  { state: "OR", count: 19 }, { state: "PA", count: 36 },
  { state: "RI", count: 4 }, { state: "SC", count: 36 },
  { state: "SD", count: 6 }, { state: "TN", count: 35 },
  { state: "TX", count: 142 }, { state: "UT", count: 31 },
  { state: "VT", count: 2 }, { state: "VA", count: 37 },
  { state: "WA", count: 47 }, { state: "WV", count: 6 },
  { state: "WI", count: 30 }, { state: "WY", count: 5 },
];

// Build all sitemap URLs (one per state subdomain + root)
function buildSitemapUrls() {
  const urls = [
    `https://${ROOT_DOMAIN}/sitemap.xml`,
    `https://${ROOT_DOMAIN}/sitemap-index.xml`,
  ];

  for (const { state } of STATES) {
    const sub = state.toLowerCase();
    urls.push(`https://${sub}.${ROOT_DOMAIN}/sitemap.xml`);
    urls.push(`https://${sub}.${ROOT_DOMAIN}/sitemap-index.xml`);
  }

  return urls;
}

// Read city slugs from your public data directory
const fs = require("fs");
const path = require("path");

function readCitySlugs() {
  const citiesDir = path.join(__dirname, "../public/data/cities");
  try {
    const files = fs.readdirSync(citiesDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    console.warn("Could not read cities dir — using sitemap URLs only");
    return [];
  }
}

function buildCityUrls(slugs) {
  const urls = [];
  for (const slug of slugs) {
    // State abbreviation is the last 2 chars after the last dash
    const parts = slug.split("-");
    const state = parts[parts.length - 1]; // e.g. "tx"
    const base = `https://${slug}.${ROOT_DOMAIN}`;
    urls.push(base + "/");
    urls.push(base + "/services/");
    urls.push(base + "/sitemap.xml");
  }
  return urls;
}

// Chunk array into batches of N
function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// Ping IndexNow with a batch of URLs
async function pingBatch(urls, batchNum, total) {
  const body = {
    host: ROOT_DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: `https://${ROOT_DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    console.log(`Batch ${batchNum}/${total}: ${res.status} — ${urls.length} URLs`);
  } catch (err) {
    console.error(`Batch ${batchNum}/${total} FAILED:`, err.message);
  }
}

// Delay helper
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (INDEXNOW_KEY === "YOUR-KEY-HERE") {
    console.error("ERROR: Set your INDEXNOW_KEY in this script first!");
    console.error("Get your key at: https://www.bing.com/indexnow");
    process.exit(1);
  }

  const slugs = readCitySlugs();
  const allUrls = [
    ...buildSitemapUrls(),
    ...buildCityUrls(slugs),
  ];

  console.log(`Total URLs to ping: ${allUrls.length}`);
  console.log(`Domain: ${ROOT_DOMAIN}`);
  console.log(`Key: ${INDEXNOW_KEY}`);
  console.log("---");

  const batches = chunk(allUrls, 10000); // IndexNow max per request
  console.log(`Sending in ${batches.length} batch(es)...`);

  for (let i = 0; i < batches.length; i++) {
    await pingBatch(batches[i], i + 1, batches.length);
    if (i < batches.length - 1) {
      await delay(2000); // 2 second pause between batches
    }
  }

  console.log("\n✅ Done! Check Bing Webmaster → IndexNow report in 24-48h.");
}

main();
