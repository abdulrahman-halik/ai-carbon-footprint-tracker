"use client";
import React from "react";

export default function DashboardComparisons({ stats }) {
    if (!stats) return null;

    const neighbors = stats?.neighbors || { diffPercentage: 15, user: stats?.total_emissions || 850, avg: 1000 };
    const budget = stats?.budget || {
        total: 1000,
        used: stats?.total_emissions || 0,
        percentage: Math.min(100, Math.round(((stats?.total_emissions || 0) / 1000) * 100))
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">vs Community Average</p>
                <div className="flex items-center gap-4">
                    <div className="text-3xl font-extrabold text-emerald-600">{neighbors.diffPercentage}%</div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">lower than neighbours</p>
                        <p className="text-xs text-gray-400">You: {neighbors.user.toFixed(0)} kg · Avg: {neighbors.avg} kg</p>
                    </div>
                </div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (neighbors.user / neighbors.avg) * 100)}%` }}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">Monthly Budget</p>
                <div className="flex items-center gap-4">
                    <div className="text-3xl font-extrabold text-gray-900">{budget.percentage}%</div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">of budget used</p>
                        <p className="text-xs text-gray-400">{budget.used.toFixed(0)} kg of {budget.total} kg</p>
                    </div>
                </div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${budget.percentage > 80 ? 'bg-red-500' : budget.percentage > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${budget.percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
