export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
                <div className="flex gap-2">
                    <div className="h-10 w-32 bg-slate-200 rounded-full"></div>
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
                ))}
            </div>

            {/* Map/Table Skeleton */}
            <div className="h-96 bg-slate-200 rounded-2xl w-full"></div>
        </div>
    );
}