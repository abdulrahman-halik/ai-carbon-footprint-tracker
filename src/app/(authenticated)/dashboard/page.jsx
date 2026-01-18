import EmissionsDashboard from "@/features/emissions/components/EmissionsDashboard";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Alex!</p>
                </div>
            </div>

            <EmissionsDashboard />
        </div>
    );
}
