// app/city-sites/[city]/loading.tsx
// Shown by Next.js while the city page is loading (Suspense boundary)

export default function CityLoading() {
    return (
        <div className="flex flex-col min-h-screen font-sans animate-pulse">
            {/* Hero skeleton */}
            <div className="relative pt-32 pb-40 bg-slate-900">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="h-7 w-40 bg-slate-700 rounded-full" />
                        <div className="h-14 w-3/4 bg-slate-700 rounded-xl" />
                        <div className="h-14 w-2/3 bg-slate-700 rounded-xl" />
                        <div className="h-5 w-full bg-slate-800 rounded" />
                        <div className="h-5 w-5/6 bg-slate-800 rounded" />
                        <div className="h-12 w-44 bg-blue-700 rounded-full mt-2" />
                    </div>
                    <div className="hidden lg:block w-80 h-64 bg-slate-800 rounded-2xl" />
                </div>
            </div>

            {/* Services skeleton */}
            <div className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <div className="h-4 w-24 bg-slate-200 rounded" />
                        <div className="h-8 w-64 bg-slate-200 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-40 bg-white rounded-xl border border-slate-200" />
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQs skeleton */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="h-8 w-56 bg-slate-200 rounded mb-8 mx-auto" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-16 bg-slate-100 rounded-lg mb-4" />
                    ))}
                </div>
            </div>
        </div>
    );
}
