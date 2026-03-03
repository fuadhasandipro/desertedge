// app/state-sites/[state]/loading.tsx
// Shown by Next.js while the state page is loading (Suspense boundary)

export default function StateLoading() {
    return (
        <div className="flex flex-col min-h-screen font-sans animate-pulse">
            {/* Hero skeleton */}
            <div className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-slate-900">
                <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
                    <div className="h-8 w-48 bg-slate-700 rounded-full" />
                    <div className="h-14 w-3/4 bg-slate-700 rounded-xl" />
                    <div className="h-14 w-2/4 bg-slate-700 rounded-xl" />
                    <div className="h-6 w-2/3 bg-slate-800 rounded-md" />
                    <div className="h-12 w-44 bg-blue-700 rounded-full" />
                </div>
            </div>

            {/* Trust bar skeleton */}
            <div className="bg-blue-700 py-4 flex justify-center gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-5 w-28 bg-blue-600 rounded" />
                ))}
            </div>

            {/* Services skeleton */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-8 w-64 bg-slate-200 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="h-40 bg-slate-100 rounded-xl border border-slate-200" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Cities skeleton */}
            <div className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-4 mb-10">
                        <div className="h-8 w-72 bg-slate-200 rounded" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-14 bg-white border border-slate-200 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
