export const mainServices = [
    {
        slug: "water-heaters",
        title: "Water Heater Repair & Installation",
        icon: "Flame", // mapped to Lucide icon
        shortDesc: "Professional water heater services including repair, replacement, and installation of tank and tankless systems.",
        heroTitle: "Expert Water Heaters Repair & Installation Services",
        intro: "Professional water heater repair and installation for all types in the US. Reliable hot water solutions for your home or business!",
        fullContent: {
            residential: "Professional water heater services for homes with proper sizing and efficiency.",
            commercial: "Large-scale water heater systems for businesses with minimal downtime.",
            features: [
                { title: "Diagnostic services", desc: "Accurate troubleshooting" },
                { title: "Component replacement", desc: "Thermostats, heating elements" },
                { title: "Emergency repairs", desc: "24/7 restoration of hot water" },
                { title: "Performance optimization", desc: "Flushing and maintenance" }
            ]
        }
    },
    {
        slug: "drain-cleaning",
        title: "Drain Cleaning Services",
        icon: "Droplets",
        shortDesc: "Professional drain cleaning for clogged sinks, tubs, and sewer lines using advanced equipment.",
        heroTitle: "Professional Drain Cleaning Services",
        intro: "Fast and effective drain cleaning for clogged sinks, tubs, and sewer lines. Restore smooth drainage and prevent future plumbing issues!",
        fullContent: {
            residential: "Professional drain cleaning for homes with clogged sinks, tubs, and bathroom drains.",
            commercial: "Large-scale drain cleaning for businesses with minimal downtime and maximum efficiency.",
            features: [
                { title: "Kitchen Drain Cleaning", desc: "Fast cleaning for sinks and disposals" },
                { title: "Bathroom Drain Cleaning", desc: "Showers, tubs, and sinks" },
                { title: "Sewer Line Cleaning", desc: "Prevent backups and ensure flow" },
                { title: "Hydro Jetting", desc: "High-pressure blockage removal" }
            ]
        }
    },
    {
        slug: "leak-detection",
        title: "Leak Detection & Repair",
        icon: "Search",
        shortDesc: "Advanced leak detection technology to quickly locate and repair hidden water leaks.",
        heroTitle: "Expert Leak Detection & Repair Services",
        intro: "Professional leak detection and repair services. Find and fix leaks before they cause major damage!",
        fullContent: {
            residential: "Professional leak detection and repair for homes with property protection.",
            commercial: "Large-scale leak detection solutions for businesses with minimal disruption.",
            features: [
                { title: "Advanced Leak Detection", desc: "State-of-the-art locating technology" },
                { title: "Pipe Leak Detection", desc: "Walls, floors, and underground" },
                { title: "Fixture Leak Repair", desc: "Faucets, toilets, and valves" },
                { title: "Non-Invasive Methods", desc: "Protecting your property" }
            ]
        }
    },
    {
        slug: "sewer-line",
        title: "Sewer Line Services",
        icon: "Activity",
        shortDesc: "Complete sewer line inspection, repair, and replacement services with camera technology.",
        heroTitle: "Expert Sewer Line Inspection & Replacement",
        intro: "Professional sewer line inspection and replacement services. Keep your sewer system flowing properly!",
        fullContent: {
            residential: "Professional sewer line services for homes with camera inspection technology.",
            commercial: "Large-scale sewer line solutions for businesses with minimal disruption.",
            features: [
                { title: "Camera Inspection", desc: "Visual diagnostics of pipe interior" },
                { title: "Trenchless Repair", desc: "Minimal digging solutions" },
                { title: "Sewer Line Replacement", desc: "Full system upgrades" },
                { title: "Blockage Removal", desc: "Tree roots and debris clearing" }
            ]
        }
    },
    {
        slug: "toilet-repair",
        title: "Toilet Repair & Installation",
        icon: "Armchair", // Metaphor for seat/toilet
        shortDesc: "Fast and reliable toilet repair, replacement, and installation services for all types.",
        heroTitle: "Expert Toilet Repair & Installation Services",
        intro: "Fast and reliable toilet plumbing services for clogs, leaks, and replacements. Restore full function and improve efficiency!",
        fullContent: {
            residential: "Professional toilet repair and installation for homes with proper sizing and efficiency.",
            commercial: "Large-scale toilet systems for businesses with minimal downtime.",
            features: [
                { title: "Toilet Unclogging", desc: "Emergency blockage removal" },
                { title: "Leak Repair", desc: "Fix running toilets and seals" },
                { title: "New Installation", desc: "High-efficiency model upgrades" },
                { title: "Maintenance", desc: "Preventative care" }
            ]
        }
    },
    {
        slug: "faucet-sink",
        title: "Faucet & Sink Repair",
        icon: "Tap", // Will map to a Lucide icon
        shortDesc: "Professional repair and installation of kitchen and bathroom faucets and sinks.",
        heroTitle: "Expert Faucet & Sink Repair & Replacement",
        intro: "Expert installation and repair of kitchen and bathroom faucets and sinks. Leak-free performance and upgraded fixtures!",
        fullContent: {
            residential: "Professional faucet and sink services for homes with modern fixtures and efficiency.",
            commercial: "Large-scale faucet and sink systems for businesses with minimal downtime.",
            features: [
                { title: "Faucet Repair", desc: "Fix drips and leaks" },
                { title: "New Installation", desc: "Modern fixture upgrades" },
                { title: "Sink Replacement", desc: "Kitchen and bathroom basins" },
                { title: "Commercial Fixtures", desc: "Heavy-duty installations" }
            ]
        }
    }
];

export const cityServicesList = [
    { slug: "water-heater-repair", title: "Water Heater Repair and Installation", desc: "Affordable water heater repair and professional installation for homes and commercial buildings." },
    { slug: "tankless-water-heater", title: "Tankless Water Heater Installation", desc: "Expert installation of energy-efficient tankless water heaters for homes and businesses." },
    { slug: "recirculation-pump", title: "Water Recirculation Pump Repair", desc: "Professional repair and installation of hot water recirculation pumps." },
    { slug: "faucet-sink-repair", title: "Faucet and Sink Repair & Replacement", desc: "Expert installation and repair of kitchen and bathroom faucets and sinks." },
    { slug: "water-conservation", title: "Water Conservation Plumbing Systems", desc: "Eco-friendly water-saving plumbing solutions for homes and businesses." },
    { slug: "bathroom-renovation", title: "Custom Bathroom Renovation", desc: "Expert team designs and renovates bathrooms with modern fixtures." },
    { slug: "water-system", title: "Water System Installation & Repair", desc: "We install, repair, and maintain residential and commercial water systems." },
    { slug: "slab-leak", title: "Slab Leak Detection & Repair", desc: "Fast and accurate slab leak detection with expert repairs." },
    { slug: "sump-pump", title: "Sump Pump Installation & Repair", desc: "Keep your basement dry and protected with professional sump pump repair." },
    { slug: "drain-cleaning", title: "Professional Drain Cleaning", desc: "Fast and effective drain cleaning for clogged sinks, tubs, and sewer lines." },
    { slug: "drain-repair", title: "Expert Drain Repair", desc: "We fix damaged or leaking drains with precision to prevent backups." },
    { slug: "sewer-inspection", title: "Sewer Line Inspection & Replacement", desc: "Thorough sewer camera inspections, repairs, and full replacements." },
    { slug: "gas-line", title: "Gas Line Installation & Repair", desc: "Safe and code-compliant gas line installations, repairs, and replacements." },
    { slug: "leak-detection", title: "Leak Detection & Repair", desc: "We use advanced leak detection tools to quickly locate and repair hidden water leaks." },
    { slug: "toilet-repair", title: "Toilet Repair & Installation", desc: "Fast and reliable toilet plumbing services for clogs, leaks, and replacements." }
];