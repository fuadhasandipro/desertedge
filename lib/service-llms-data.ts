// lib/service-llms-data.ts
// Service-specific data for per-service llms.txt route generation

export interface ServiceLlmsData {
    id: string;
    title: string;
    description: string;
    whenNeeded: string[];
    urgency: "emergency" | "urgent" | "scheduled";
    aiQueryPatterns: string[];
    relatedServices: string[];
}

export const SERVICE_LLMS_DATA: Record<string, ServiceLlmsData> = {
    "emergency-plumbing": {
        id: "emergency-plumbing",
        title: "Emergency Plumbing",
        description:
            "24/7 emergency plumbing repairs for burst pipes, sudden flooding, sewage backups, and any urgent plumbing failure. Local licensed plumbers dispatched within 60 minutes.",
        whenNeeded: [
            "Water gushing from a burst or broken pipe",
            "Sewage backing up into the home",
            "Complete loss of water to the property",
            "Major flooding from plumbing failure",
            "Gas line emergency alongside plumbing",
        ],
        urgency: "emergency",
        aiQueryPatterns: [
            "emergency plumber in [city]",
            "plumber near me right now [city]",
            "burst pipe [city]",
            "plumbing emergency [city]",
            "24 hour plumber [city]",
            "plumber open now [city]",
            "urgent plumber [city]",
            "flooding from pipe [city]",
        ],
        relatedServices: ["burst-pipe-repair", "24-7-service", "leak-repair"],
    },

    "burst-pipe-repair": {
        id: "burst-pipe-repair",
        title: "Burst Pipe Repair",
        description:
            "Emergency repair for burst or ruptured water pipes. Stops flooding fast, minimizes water damage, and restores water supply. Available 24/7.",
        whenNeeded: [
            "Pipe suddenly burst or cracked",
            "Water spraying from wall, ceiling, or floor",
            "Rapid unexplained flooding indoors",
            "Pipes froze and then burst in winter",
        ],
        urgency: "emergency",
        aiQueryPatterns: [
            "burst pipe repair [city]",
            "broken pipe [city]",
            "pipe burst in house [city]",
            "frozen pipe burst [city]",
            "water spraying from pipe [city]",
        ],
        relatedServices: ["emergency-plumbing", "leak-repair", "water-line-repair"],
    },

    "24-7-service": {
        id: "24-7-service",
        title: "24/7 Plumbing Service",
        description:
            "Round-the-clock plumbing service available nights, weekends, and holidays. No extra charge for after-hours calls. Local pros in every US city.",
        whenNeeded: [
            "Plumbing emergency outside business hours",
            "Weekend or holiday plumbing failure",
            "Middle-of-the-night pipe burst or overflow",
        ],
        urgency: "emergency",
        aiQueryPatterns: [
            "plumber open 24 hours [city]",
            "after hours plumber [city]",
            "plumber on weekends [city]",
            "plumber available tonight [city]",
            "night time plumber [city]",
        ],
        relatedServices: ["emergency-plumbing", "burst-pipe-repair"],
    },

    "leak-detection": {
        id: "leak-detection",
        title: "Leak Detection",
        description:
            "Professional non-invasive leak detection using acoustic, thermal, and pressure testing to locate hidden water leaks inside walls, floors, and underground.",
        whenNeeded: [
            "Water bill suddenly increased with no explanation",
            "Damp or wet spots on walls, ceilings, or floors",
            "Mold or mildew smell without visible source",
            "Sound of running water when everything is off",
            "Low water pressure throughout the home",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "hidden water leak detection [city]",
            "find a water leak [city]",
            "water leak in wall [city]",
            "leaking pipe inside wall [city]",
            "high water bill no leak visible [city]",
            "non-invasive leak detection [city]",
        ],
        relatedServices: ["leak-repair", "slab-leak-detection", "video-pipe-inspection"],
    },

    "leak-repair": {
        id: "leak-repair",
        title: "Leak Repair",
        description:
            "Repair of all types of water leaks including pipe joints, fittings, supply lines, and fixtures. Fast, permanent fixes by licensed local plumbers.",
        whenNeeded: [
            "Dripping or leaking pipe identified",
            "Leaking faucet, valve, or fixture",
            "Water stain on ceiling or wall from above",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "pipe leak repair [city]",
            "fix water leak [city]",
            "leaking pipe [city]",
            "water leak repair [city]",
            "plumber fix leak [city]",
        ],
        relatedServices: ["leak-detection", "water-line-repair", "pipe-installation-repiping"],
    },

    "slab-leak-detection": {
        id: "slab-leak-detection",
        title: "Slab Leak Detection",
        description:
            "Specialized detection of water leaks occurring beneath concrete slab foundations. Uses acoustic listening and thermal imaging to pinpoint exact leak location without breaking concrete.",
        whenNeeded: [
            "Warm spots on floor (hot water line leak beneath slab)",
            "Sound of running water under the floor",
            "Foundation cracks appearing",
            "Sudden spike in water bills",
            "Wet carpet or flooring with no visible source",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "slab leak detection [city]",
            "leak under concrete slab [city]",
            "foundation leak [city]",
            "warm spot on floor [city]",
            "water under slab [city]",
        ],
        relatedServices: ["slab-leak-repair", "leak-detection", "leak-repair"],
    },

    "slab-leak-repair": {
        id: "slab-leak-repair",
        title: "Slab Leak Repair",
        description:
            "Repair of confirmed leaks beneath concrete slabs via tunneling, breaking concrete, or rerouting pipe — whichever is least invasive. Restores structural integrity.",
        whenNeeded: ["Slab leak confirmed by detection", "Repeated wet floor with no other source"],
        urgency: "urgent",
        aiQueryPatterns: [
            "slab leak repair [city]",
            "fix leak under foundation [city]",
            "repair pipe under concrete [city]",
        ],
        relatedServices: ["slab-leak-detection", "pipe-installation-repiping"],
    },

    "drain-cleaning": {
        id: "drain-cleaning",
        title: "Drain Cleaning",
        description:
            "Professional drain cleaning for sinks, showers, tubs, floor drains, and main lines. Uses snaking and hydro-jetting to remove grease, hair, mineral scale, and debris buildup.",
        whenNeeded: [
            "Slow-draining sink, tub, or shower",
            "Gurgling sound from drain",
            "Water pooling in shower or tub",
            "Kitchen sink draining slowly",
            "Recurring drain clogs",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "drain cleaning [city]",
            "slow drain [city]",
            "clogged shower drain [city]",
            "clean kitchen drain [city]",
            "drain unclogging [city]",
            "drain service near me [city]",
        ],
        relatedServices: ["clogged-drain-service", "hydro-jetting", "video-pipe-inspection"],
    },

    "clogged-drain-service": {
        id: "clogged-drain-service",
        title: "Clogged Drain Service",
        description:
            "Emergency and same-day service for completely blocked drains causing standing water or sewage backup. Fast clearance using professional drain snakes and jetting equipment.",
        whenNeeded: [
            "Drain completely blocked — no water moving",
            "Standing water in sink, tub, or floor drain",
            "Toilet not flushing",
            "Multiple drains backing up at once",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "clogged drain [city]",
            "blocked drain [city]",
            "drain won't drain [city]",
            "unclog drain [city]",
            "drain backup [city]",
        ],
        relatedServices: ["drain-cleaning", "hydro-jetting", "sewer-line-repair"],
    },

    "hydro-jetting": {
        id: "hydro-jetting",
        title: "Hydro Jetting",
        description:
            "High-pressure water jetting (2,000–4,000 PSI) to blast through severe grease buildup, mineral scale, and root intrusion in drain and sewer lines. Commercial-grade results.",
        whenNeeded: [
            "Repeated or recurring drain clogs that keep coming back",
            "Grease buildup in kitchen or restaurant drains",
            "Root intrusion in sewer lines",
            "Slow drains throughout entire property",
            "Pre-purchase pipe cleaning for real estate",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "hydro jetting [city]",
            "high pressure drain cleaning [city]",
            "hydro jet drain [city]",
            "commercial drain cleaning [city]",
            "grease trap cleaning drain [city]",
        ],
        relatedServices: ["drain-cleaning", "video-pipe-inspection", "sewer-line-repair"],
    },

    "video-pipe-inspection": {
        id: "video-pipe-inspection",
        title: "Video Pipe Inspection",
        description:
            "Camera inspection of drain and sewer pipes to visually identify blockages, cracks, root intrusion, and pipe condition without digging. Includes recorded video report.",
        whenNeeded: [
            "Unknown cause of recurring drain problems",
            "Pre-purchase home inspection of plumbing",
            "Before or after drain cleaning to verify results",
            "Suspected pipe damage or root intrusion",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "pipe camera inspection [city]",
            "sewer camera [city]",
            "video drain inspection [city]",
            "plumbing camera inspection [city]",
        ],
        relatedServices: ["drain-cleaning", "sewer-line-repair", "hydro-jetting"],
    },

    "sewer-line-repair": {
        id: "sewer-line-repair",
        title: "Sewer Line Repair",
        description:
            "Repair of damaged, cracked, or partially collapsed sewer lines. Restores proper waste flow and prevents sewage backup into the home.",
        whenNeeded: [
            "Sewage smell in yard or home",
            "Multiple drains backing up simultaneously",
            "Wet or sunken patches in yard above sewer line",
            "Slow drains throughout entire house",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "sewer line repair [city]",
            "sewage backup [city]",
            "broken sewer pipe [city]",
            "sewer line problem [city]",
            "raw sewage smell [city]",
        ],
        relatedServices: ["sewer-line-replacement", "trenchless-sewer-repair", "video-pipe-inspection"],
    },

    "sewer-line-replacement": {
        id: "sewer-line-replacement",
        title: "Sewer Line Replacement",
        description:
            "Full replacement of old, collapsed, or severely damaged sewer lines. Available with traditional open-cut or trenchless methods.",
        whenNeeded: [
            "Sewer line beyond repair (collapsed or severely corroded)",
            "Very old clay or cast iron sewer pipe",
            "Repeated sewer line failures",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "sewer line replacement [city]",
            "replace sewer pipe [city]",
            "new sewer line [city]",
            "collapsed sewer pipe [city]",
        ],
        relatedServices: ["sewer-line-repair", "trenchless-sewer-repair"],
    },

    "trenchless-sewer-repair": {
        id: "trenchless-sewer-repair",
        title: "Trenchless Sewer Repair",
        description:
            "No-dig sewer repair using pipe lining (CIPP) or pipe bursting — fixes or replaces sewer lines without excavating your yard, driveway, or landscaping.",
        whenNeeded: [
            "Sewer repair needed without destroying landscaping or driveway",
            "Cracked or root-invaded sewer pipe",
            "Modern alternative to traditional sewer excavation",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "trenchless sewer repair [city]",
            "no dig sewer repair [city]",
            "pipe lining [city]",
            "sewer repair without digging [city]",
            "pipe bursting [city]",
        ],
        relatedServices: ["sewer-line-repair", "sewer-line-replacement", "video-pipe-inspection"],
    },

    "water-heater-repair": {
        id: "water-heater-repair",
        title: "Water Heater Repair",
        description:
            "Diagnosis and repair of tank and tankless water heaters. Fixes no-hot-water, lukewarm water, strange noises, leaking tanks, and pilot light issues.",
        whenNeeded: [
            "No hot water coming from any tap",
            "Water only lukewarm, not properly hot",
            "Water heater making rumbling, popping, or banging sounds",
            "Water heater leaking from tank or connections",
            "Pilot light won't stay lit",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "water heater repair [city]",
            "no hot water [city]",
            "fix water heater [city]",
            "water heater not working [city]",
            "water heater leaking [city]",
            "hot water heater broken [city]",
        ],
        relatedServices: ["water-heater-replacement", "tankless-water-heater"],
    },

    "water-heater-replacement": {
        id: "water-heater-replacement",
        title: "Water Heater Replacement",
        description:
            "Full replacement of old or failed water heaters. Same-day installation available. Licensed pros handle removal, proper disposal, and installation of new unit to code.",
        whenNeeded: [
            "Water heater older than 10–12 years",
            "Tank severely rusted or corroded",
            "Repair cost exceeds replacement cost",
            "Upgrading to larger capacity or better efficiency",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "water heater replacement [city]",
            "new water heater installation [city]",
            "replace water heater [city]",
            "water heater install [city]",
        ],
        relatedServices: ["water-heater-repair", "tankless-water-heater"],
    },

    "tankless-water-heater": {
        id: "tankless-water-heater",
        title: "Tankless Water Heater Installation",
        description:
            "Installation of on-demand tankless water heaters. Provides endless hot water, saves energy (up to 30%), and lasts 20+ years. Gas and electric models available.",
        whenNeeded: [
            "Upgrading from old tank water heater",
            "Running out of hot water frequently",
            "Want lower energy bills from water heating",
            "New construction or major remodel",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "tankless water heater [city]",
            "on demand water heater [city]",
            "tankless water heater installation [city]",
            "install tankless heater [city]",
        ],
        relatedServices: ["water-heater-replacement", "water-heater-repair"],
    },

    "water-line-repair": {
        id: "water-line-repair",
        title: "Water Line Repair",
        description:
            "Repair of main water supply lines from the street to the home, as well as interior supply lines. Restores full water pressure and stops leaks.",
        whenNeeded: [
            "Low water pressure throughout entire home",
            "Water main break in yard",
            "Sudden loss of water supply",
            "Wet patch in yard above water line",
        ],
        urgency: "urgent",
        aiQueryPatterns: [
            "water line repair [city]",
            "main water line break [city]",
            "water supply line leak [city]",
            "low water pressure whole house [city]",
            "main line repair [city]",
        ],
        relatedServices: ["leak-repair", "pipe-installation-repiping", "burst-pipe-repair"],
    },

    "pipe-installation-repiping": {
        id: "pipe-installation-repiping",
        title: "Pipe Installation & Repiping",
        description:
            "Complete home repiping with modern copper or PEX pipes. Replaces old galvanized steel or polybutylene pipes that corrode, leak, or cause poor water quality.",
        whenNeeded: [
            "Home has original galvanized steel pipes (pre-1970s)",
            "Recurring leaks at multiple locations",
            "Discolored or rust-colored water",
            "Low water pressure due to corroded pipes",
            "Orange or brown sediment in water",
        ],
        urgency: "scheduled",
        aiQueryPatterns: [
            "repiping [city]",
            "whole house repipe [city]",
            "replace galvanized pipes [city]",
            "pipe installation [city]",
            "rusty water pipes [city]",
        ],
        relatedServices: ["water-line-repair", "leak-repair", "new-construction-plumbing"],
    },

    "gas-line-services": {
        id: "gas-line-services",
        title: "Gas Line Services",
        description:
            "Licensed gas line installation, repair, and leak detection. Handles gas supply lines for appliances, BBQ grills, stoves, fireplaces, and whole-home gas systems.",
        whenNeeded: [
            "Smell of gas (rotten egg odor) in home or yard",
            "Gas appliance not getting sufficient gas",
            "Installing new gas appliance (stove, dryer, fireplace)",
            "Adding gas line to outdoor kitchen or BBQ",
        ],
        urgency: "emergency",
        aiQueryPatterns: [
            "gas line repair [city]",
            "gas leak [city]",
            "gas line installation [city]",
            "smell gas in house [city]",
            "gas line plumber [city]",
        ],
        relatedServices: ["emergency-plumbing"],
    },
};
