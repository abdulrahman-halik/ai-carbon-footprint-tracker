export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Alex!</p>
                </div>
            </div>

            {/* Content placeholder */}
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center text-gray-500">
                Dashboard Content Area
            </div>
        </div>
    );
}
