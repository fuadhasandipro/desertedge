import { Wrench, Droplet, Flame, Search, AlertTriangle, PenTool } from 'lucide-react';

export const services = [
    {
        id: "drain-cleaning",
        slug: "drain-cleaning",
        title: "Drain Cleaning",
        icon: Droplet,
        shortDesc: "Professional hydro-jetting and snake cleaning for stubborn clogs.",
        fullDesc: "Our advanced drain cleaning services remove blockages caused by grease, hair, roots, and debris.",
        heroTitle: "Professional Drain Cleaning Services",
        intro: "Fast and effective drain cleaning for clogged sinks, tubs, and sewer lines. Restore smooth drainage and prevent future plumbing issues!",
        subServices: [
            "Hydro Jetting",
            "Video Camera Inspection",
            "Rooter Service",
            "Clog Removal",
            "Sewer Line Cleaning"
        ],
        benefits: ["Prevents foul odors", "Reduces pipe damage", "Improves drainage speed"],
        fullContent: {
            residential: "We provide comprehensive residential drain cleaning to protect your home from backups. From kitchen sinks to main sewer lines, our specialized tools clear blockages without damaging your pipes.",
            commercial: "Keep your business compliant and operational. We handle grease traps, floor drains, and high-volume industrial clogs with minimal downtime.",
            features: [
                { title: "Hydro Jetting", desc: "High-pressure water scouring to remove grease and scale buildup." },
                { title: "Camera Inspection", desc: "Visual verification of the clog and pipe condition." },
                { title: "Rooter Service", desc: "Mechanical cutting of tree roots infiltrating your sewer line." },
                { title: "Preventative Maintenance", desc: "Scheduled cleaning to stop clogs before they happen." }
            ]
        }
    },
    {
        id: "water-heaters",
        slug: "water-heaters",
        title: "Water Heaters",
        icon: Flame,
        shortDesc: "Repair and installation for tankless and traditional water heaters.",
        fullDesc: "Never take a cold shower again. We specialize in the repair, maintenance, and installation of high-efficiency systems.",
        heroTitle: "Expert Water Heater Repair & Installation",
        intro: "Reliable hot water solutions for your home or business. We service all brands of tank and tankless systems with same-day repairs available.",
        subServices: [
            "Tankless Water Heater Installation",
            "Water Heater Repair",
            "Routine Maintenance flushing",
            "Thermostat Replacement",
            "Anode Rod Replacement"
        ],
        benefits: ["Lower energy bills", "Endless hot water", "Extended unit lifespan"],
        fullContent: {
            residential: "Enjoy consistent hot water with our residential services. We help you choose the right size and efficiency rating for your family's needs.",
            commercial: "We understand that hot water is critical for your business. Our technicians are trained on large-capacity commercial boilers.",
            features: [
                { title: "Tankless Upgrades", desc: "Save space and energy with on-demand hot water systems." },
                { title: "Rapid Repair", desc: "Quick diagnosis and fix for pilot lights, elements, and leaks." },
                { title: "System Flushing", desc: "Removal of sediment buildup to improve efficiency and lifespan." },
                { title: "Code Compliance", desc: "Ensuring all installations meet local safety and building codes." }
            ]
        }
    },
    {
        id: "leak-detection",
        slug: "leak-detection",
        title: "Leak Detection",
        icon: Search,
        shortDesc: "Non-invasive electronic leak detection for slab and wall leaks.",
        fullDesc: "Hidden leaks can cause massive structural damage. Our non-invasive acoustic and thermal imaging technology pinpoints leaks.",
        heroTitle: "Precision Leak Detection & Repair",
        intro: "Stop water damage in its tracks. Our advanced non-invasive technology finds hidden leaks behind walls and under concrete slabs quickly.",
        subServices: [
            "Slab Leak Detection",
            "Electronic Pipe Location",
            "Gas Leak Detection",
            "Meter Testing",
            "Thermal Imaging"
        ],
        benefits: ["Minimizes property damage", "Saves water", "Prevents mold growth"],
        fullContent: {
            residential: "Protect your home's foundation and drywall. Our non-destructive methods locate the exact source of the leak so we only dig where necessary.",
            commercial: "Unexplained high water bills? We survey large commercial properties to find underground leaks that are costing you money.",
            features: [
                { title: "Acoustic Listening", desc: "Amplifying the sound of dripping water through concrete." },
                { title: "Thermal Imaging", desc: "Detecting temperature variances caused by moisture pockets." },
                { title: "Tracer Gas", desc: "Using safe gas to sniff out leaks in pressurized lines." },
                { title: "Meter Testing", desc: "Isolating the leak to the main line or specific fixtures." }
            ]
        }
    },
    {
        id: "pipe-repair",
        slug: "pipe-repair",
        title: "Pipe Repair & Repiping",
        icon: Wrench,
        shortDesc: "Copper, PEX, and PVC pipe repair and whole-home repiping.",
        fullDesc: "From minor pinhole leaks to corroded galvanized pipes, we offer complete pipe repair and whole-house repiping solutions.",
        heroTitle: "Pipe Repair & Whole-Home Repiping",
        intro: "Upgrade your plumbing infrastructure. We replace corroded, leaking, and outdated pipes with durable Copper and PEX solutions.",
        subServices: [
            "Whole House Repiping",
            "Burst Pipe Repair",
            "Frozen Pipe Thawing",
            "Copper & PEX Installation",
            "Valve Replacement"
        ],
        benefits: ["Improved water pressure", "Clean water supply", "Increased home value"],
        fullContent: {
            residential: "Eliminate rusty water and low pressure. Our whole-home repiping services replace old galvanized pipes with modern materials.",
            commercial: "We perform repiping for office buildings and multi-family units, often working in sections to minimize disruption.",
            features: [
                { title: "PEX Repiping", desc: "Flexible, durable piping that is resistant to freezing and scale." },
                { title: "Copper Repiping", desc: "Traditional, long-lasting piping with antimicrobial properties." },
                { title: "Spot Repair", desc: "Fixing specific sections of damaged pipe to save costs." },
                { title: "Valve Upgrades", desc: "Installing reliable shut-off valves for better control." }
            ]
        }
    },
    {
        id: "emergency-plumbing",
        slug: "emergency-plumbing",
        title: "Emergency Plumbing",
        icon: AlertTriangle,
        shortDesc: "24/7 rapid response for plumbing disasters.",
        fullDesc: "Plumbing emergencies don't wait for business hours. Our on-call team is ready 24/7 to handle burst pipes and backups.",
        heroTitle: "24/7 Emergency Plumbing Response",
        intro: "Disasters don't wait for business hours. Neither do we. Our trucks are fully stocked and ready to dispatch immediately.",
        subServices: [
            "Overflowing Toilets",
            "Burst Pipes",
            "No Hot Water",
            "Sewage Backup",
            "Gas Leaks"
        ],
        benefits: ["Immediate response", "Prevents water damage", "Peace of mind"],
        fullContent: {
            residential: "We treat your emergency like our own. Our team arrives fast to shut off the water, assess the damage, and begin repairs.",
            commercial: "Plumbing failures can shut down a business. We prioritize commercial emergencies to get your restrooms back online.",
            features: [
                { title: "Rapid Dispatch", desc: "GPS-enabled trucks to get the nearest tech to you fast." },
                { title: "Stocked Trucks", desc: "We carry parts for most common emergencies to fix it in one trip." },
                { title: "Water Extraction", desc: "Basic assistance with stopping the flood and minimizing damage." },
                { title: "Temporary Solutions", desc: "If a major part is needed, we ensure you have water access." }
            ]
        }
    },
    {
        id: "sewer-repair",
        slug: "sewer-repair",
        title: "Sewer Repair",
        icon: PenTool,
        shortDesc: "Trenchless sewer line repair and replacement.",
        fullDesc: "We use trenchless technology to repair or replace damaged sewer lines without destroying your yard or driveway.",
        heroTitle: "Trenchless Sewer Line Repair",
        intro: "Fix your sewer line without destroying your landscape. Our trenchless technology allows us to repair underground pipes efficiently.",
        subServices: [
            "Trenchless Pipe Lining",
            "Pipe Bursting",
            "Sewer Camera Inspection",
            "Spot Repair",
            "Cleanout Installation"
        ],
        benefits: ["Preserves landscape", "Faster completion", "Long-lasting solution"],
        fullContent: {
            residential: "Save your driveway and garden. Our trenchless methods cure a new pipe inside the old one, creating a seamless line.",
            commercial: "Avoid digging up parking lots. We handle industrial sewer repairs with minimal impact on your property.",
            features: [
                { title: "Pipe Lining (CIPP)", desc: "Creating a new structural pipe inside the damaged existing one." },
                { title: "Pipe Bursting", desc: "Pulling a new pipe through the old one, fracturing it outward." },
                { title: "Camera Diagnosis", desc: "Pinpointing the exact location of bellies, cracks, or offsets." },
                { title: "Warranty Protection", desc: "Long-term guarantees on new trenchless sewer lines." }
            ]
        }
    }
];

// Alias for compatibility if any code uses 'mainServices'
export const mainServices = services;

export const cityServicesList = [
    { slug: "water-heater-repair", title: "Water Heater Repair and Installation", desc: "Affordable water heater repair and professional installation." },
    { slug: "drain-cleaning", title: "Professional Drain Cleaning", desc: "Fast and effective drain cleaning for clogged sinks, tubs, and sewer lines." },
    { slug: "leak-detection", title: "Leak Detection & Repair", desc: "We use advanced leak detection tools to quickly locate hidden leaks." },
    { slug: "toilet-repair", title: "Toilet Repair & Installation", desc: "Fast and reliable toilet plumbing services for clogs and leaks." },
    { slug: "sewer-inspection", title: "Sewer Line Inspection", desc: "Thorough sewer camera inspections and repairs." }
];