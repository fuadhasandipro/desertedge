// lib/constants.ts — App-wide constants: phone, domain, US state lists

/** Formatted display phone number */
export const PHONE_NUMBER = "(844) 984-30-80";

/** tel: link phone number */
export const PHONE_NUMBER_TEL = "tel:+18449843080";

/** Contact email */
export const CONTACT_EMAIL = "info@desertedgeplumbing.com";

/** Root domain — always use process.env at runtime, this is a build-time fallback */
export const ROOT_DOMAIN =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

/** All 50 US state abbreviations in lowercase — used by middleware + sitemaps */
export const US_STATES_LC = [
    "ak", "al", "ar", "az", "ca", "co", "ct", "de", "fl", "ga",
    "hi", "ia", "id", "il", "in", "ks", "ky", "la", "ma", "md", "me",
    "mi", "mn", "mo", "ms", "mt", "nc", "nd", "ne", "nh", "nj", "nm", "nv",
    "ny", "oh", "ok", "or", "pa", "ri", "sc",
    "sd", "tn", "tx", "ut", "va", "vt", "wa", "wi", "wv", "wy",
] as const;

/** Set of US state abbreviations for O(1) middleware lookups */
export const US_STATES_SET: Set<string> = new Set(US_STATES_LC);

/** Full state name by uppercase abbreviation */
export const US_STATE_NAMES: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
    CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
    IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
    KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
    NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
    NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
    OR: "Oregon", PA: "Pennsylvania", PR: "Puerto Rico", RI: "Rhode Island",
    SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
    WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "Washington D.C.",
};


/**
 * Service IDs excluded sitewide — commercial/industrial services not offered.
 * Used by page-level filters AND sitemap route handlers.
 * Edit this set to control exclusion everywhere at once.
 */
export const COMMERCIAL_SERVICE_IDS = new Set([
    "commercial-plumbing",
    "commercial-plumbing-maintenance",
    "grease-trap-cleaning",
    "backflow-testing",
    "backflow-prevention",
    "new-construction-plumbing",
]);