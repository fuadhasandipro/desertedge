// lib/services.ts — Shared plumbing services list
// Used by: app/(main)/page.tsx and app/state-sites/[state]/page.tsx
// Pass a `suffix` to append location-specific text (e.g. "in Arizona")

export interface ServiceItem {
    title: string;
    description: string;
}

const SERVICE_TEMPLATES: ServiceItem[] = [
    { title: "Emergency Plumbing", description: "24/7 rapid response for urgent issues." },
    { title: "Leak Repair", description: "Pinpoint hidden water leaks quickly." },
    { title: "Drain Cleaning", description: "Clear clogged sinks, tubs, and main lines." },
    { title: "Pipe Installation & Repiping", description: "Upgrade aging or corroded piping." },
    { title: "Sump Pump Services", description: "Keep basements dry year-round." },
    { title: "Water Softener Installation", description: "Eliminate hard-water scale and stains." },
    { title: "Gas Line Services", description: "Safe gas pipe installs and leak repairs." },
    // { title: "Commercial Plumbing Maintenance", description: "Preventive care for businesses and facilities." },
    { title: "24/7 Service", description: "Plumbing support around the clock." },
    { title: "Leak Detection", description: "Pinpoint hidden water leaks." },
    { title: "Burst Pipe Repair", description: "Stop damaging pipe ruptures fast." },
    { title: "Water Line Repair", description: "Restore clean water supply lines." },
    { title: "Sewer Line Repair", description: "Fix broken or blocked sewers." },
    { title: "Sewer Line Replacement", description: "Full upgrade of failing sewer mains." },
    { title: "Trenchless Sewer Repair", description: "No-dig solution for damaged pipes." },
    { title: "Clogged Drain Service", description: "Emergency unclogging for backups." },
    { title: "Hydro-Jetting", description: "High-pressure pipe scouring." },
    { title: "Video Pipe Inspection", description: "See exactly what's wrong underground." },
    { title: "Water Heater Repair", description: "Quick fixes for no-hot-water woes." },
    { title: "Water Heater Installation", description: "New standard tank systems installed." },
    { title: "Tankless Water Heater Installation", description: "Endless hot water, space-saving design." },
    { title: "Water Heater Maintenance", description: "Annual tune-ups for peak performance." },
    { title: "Toilet Repair", description: "Fix leaks, clogs, and running tanks." },
    { title: "Toilet Installation", description: "Upgrade to modern, water-saving toilets." },
    { title: "Faucet Repair", description: "Stop drips and squeaks." },
    { title: "Faucet Installation", description: "Stylish new taps installed flawlessly." },
    { title: "Sink Repair", description: "Mend chips, leaks, and loose mounts." },
    { title: "Sink Installation", description: "Fresh sinks for kitchens & vanities." },
    { title: "Garbage Disposal Repair", description: "Quiet, efficient grinding restored." },
    { title: "Garbage Disposal Installation", description: "New disposers fitted securely." },
    { title: "Shower & Tub Repair", description: "Fix leaks, valves, and worn caulk." },
    { title: "Shower & Tub Installation", description: "Spa-quality bathing upgrades." },
    { title: "Sump Pump Installation", description: "New primary or backup pumps installed." },
    { title: "Backflow Prevention", description: "Stop contaminated water reversal." },
    { title: "Backflow Testing", description: "Annual certification for code compliance." },
    { title: "Gas Leak Detection", description: "Locate dangerous gas escapes fast." },
    { title: "Fixture Installation", description: "Professional install of any plumbing fixture." },
    { title: "New Construction Plumbing", description: "Complete rough-in and finish plumbing." },
    { title: "Remodel Plumbing", description: "Plumbing relocations for renovations." },
    { title: "Water Filtration Systems", description: "Whole-house or point-of-use filtration." },
    { title: "Boiler Services", description: "Boiler repair, replacement, and tuning." },
    // { title: "Commercial Plumbing", description: "Plumbing solutions for businesses." },
    // { title: "Grease Trap Cleaning", description: "Keep commercial kitchens code-compliant." },
];

/**
 * Returns the services list with an optional location suffix appended to each title.
 * @example getServices("Near Me")   → "Emergency Plumbing Near Me"
 * @example getServices("in Arizona") → "Emergency Plumbing in Arizona"
 */
export function getServices(suffix?: string): ServiceItem[] {
    if (!suffix) return SERVICE_TEMPLATES;
    return SERVICE_TEMPLATES.map((s) => ({
        title: `${s.title} ${suffix}`,
        description: s.description,
    }));
}
