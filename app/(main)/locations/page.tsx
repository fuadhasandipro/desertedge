"use client"; // Client component for search functionality

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import locations from '@/data/locations.json'; // Make sure this file exists

export default function LocationsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // Group cities by State
    const filteredLocations = locations.filter(loc =>
        loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedLocations = filteredLocations.reduce((acc: any, loc) => {
        (acc[loc.state] = acc[loc.state] || []).push(loc);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            {/* Page Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Service Areas</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    We have local plumbers stationed across the country ready to help. Find your city below.
                </p>

                {/* Search Input */}
                <div className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search for your city or state..."
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
            </div>

            {/* Locations Grid */}
            <div className="container mx-auto px-4">
                {Object.keys(groupedLocations).length === 0 ? (
                    <div className="text-center text-slate-500 py-12">No locations found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(groupedLocations).map(([state, cities]: [string, any]) => (
                            <div key={state} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                                    <div className="bg-brand-100 text-brand-700 font-bold p-2 rounded-lg text-sm">{state}</div>
                                    <h2 className="text-xl font-bold text-slate-800">New York</h2> {/* Dynamic State Name needed here in real implementation */}
                                </div>

                                <ul className="space-y-3">
                                    {cities.map((city: any) => (
                                        <li key={city.slug}>
                                            <a
                                                // The Magic Link: Points to the Subdomain
                                                href={`http://${city.slug}.localhost:3000`} // Change to your production domain
                                                className="group flex items-center justify-between text-slate-600 hover:text-brand-600 transition-colors p-2 rounded hover:bg-slate-50"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
                                                    {city.city}
                                                </span>
                                                <span className="opacity-0 group-hover:opacity-100 text-xs font-bold uppercase tracking-wider text-brand-400 transition-opacity">
                                                    View Site →
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}