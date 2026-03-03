// components/shared/LogoMark.tsx — Shared brand logo used in Header and Footer
// Eliminates the duplicated SVG+markup that existed in both components

interface LogoMarkProps {
    /** If true, text renders white (for dark backgrounds like Footer) */
    dark?: boolean;
}

export default function LogoMark({ dark = false }: LogoMarkProps) {
    return (
        <div className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            </div>
            <div className="flex flex-col">
                <span
                    className={`text-xl font-bold tracking-tight leading-none group-hover:text-blue-600 transition-colors ${dark ? "text-white" : "text-slate-800"
                        }`}
                >
                    DesertEdge
                </span>
                <span className="text-sm font-bold text-blue-500 leading-none">Plumbing</span>
            </div>
        </div>
    );
}
