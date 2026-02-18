// components/shared/SiloMesh.tsx
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface NearbyCity {
    name: string;
    slug: string;
}

export default function SiloMesh({ cities, currentCity }: { cities: NearbyCity[], currentCity: string }) {
    if (!cities || cities.length === 0) return null;

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-2 rounded-lg shadow-sm text-brand-600">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">Nearby Areas</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Expanded Service Range</p>
                </div>
            </div>

            <p className="text-slate-600 text-sm mb-6">
                Our team in <strong>{currentCity}</strong> also deploys trucks to these neighboring communities:
            </p>

            <ul className="space-y-3">
                {cities.map((city) => (
                    <li key={city.slug}>
                        <a
                            href={`http://${city.slug}.localhost:3000`} // Note: Make this dynamic based on ENV in production
                            className="group flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer"
                        >
                            <span className="font-medium text-slate-700 group-hover:text-brand-700">{city.name}</span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
                        </a>
                    </li>
                ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <Link href="/locations" className="text-brand-600 font-bold text-sm hover:underline">
                    View All Locations
                </Link>
            </div>
        </div>
    );
}