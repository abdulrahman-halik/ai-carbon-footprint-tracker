"use client";
import React from "react";

export default function DashboardComparisons({ stats }) {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">vs Community Average</p>
                <div className="flex items-center gap-4">
                    <div className="text-3xl font-extrabold text-emerald-600">{stats.neighbors.diffPercentage}%</div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">lower than neighbours</p>
                        <p className="text-xs text-gray-400">You: {stats.neighbors.user} kg · Avg: {stats.neighbors.avg} kg</p>
                    </div>
                </div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (stats.neighbors.user / stats.neighbors.avg) * 100)}%` }}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">Monthly Budget</p>
                <div className="flex items-center gap-4">
                    <div className="text-3xl font-extrabold text-gray-900">{stats.budget.percentage}%</div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">of budget used</p>
                        <p className="text-xs text-gray-400">{stats.budget.used} kg of {stats.budget.total} kg</p>
                    </div>
                </div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${stats.budget.percentage > 80 ? 'bg-red-500' : stats.budget.percentage > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${stats.budget.percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
