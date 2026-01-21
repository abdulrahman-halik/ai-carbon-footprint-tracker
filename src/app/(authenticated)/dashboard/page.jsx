import EmissionsDashboard from "@/features/emissions/components/EmissionsDashboard";
import { GoalThermometer } from "@/features/behavior/GoalThermometer";
import { NeighborhoodComparison } from "@/features/behavior/NeighborhoodComparison";
import { TeamCollaboration } from "@/features/social/TeamCollaboration";

import ExportButton from "@/features/reports/ExportButton";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        <span className="text-gradient">
                            Dashboard
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg md:text-xl">
                        Welcome back, <span className="font-semibold text-gray-800">Alex</span>! Here's your impact today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <ExportButton />
                    <button className="glass-button text-gray-600 hover:text-emerald-600">
                        Last 7 Days
                    </button>
                    <Link href="/log" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-gray-200 hover:bg-gray-800 hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer block text-center">
                        Log Activity
                    </Link>
                </div>
            </div>

            <EmissionsDashboard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Phase 10: Behavioral Context */}
                <div className="glass-card flex flex-col justify-center min-h-[250px]">
                    <GoalThermometer
                        currentValue={750}
                        targetValue={1000}
                        unit="kg CO2e"
                        title="Monthly Carbon Budget"
                    />
                </div>
                <div className="glass-card flex flex-col justify-center min-h-[250px]">
                    <NeighborhoodComparison
                        userValue={750}
                        averageValue={950}
                        unit="kg CO2e"
                        insight="You're using 21% less carbon than your neighbors!"
                    />
                </div>
            </div>

            {/* Team Collaboration Section */}
            <div className="w-full">
                <TeamCollaboration />
            </div>
        </div>
    );
}
