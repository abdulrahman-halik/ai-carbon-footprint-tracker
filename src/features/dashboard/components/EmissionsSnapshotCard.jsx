"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EmissionsSnapshotCard({ stats }) {
    return (
        <div className="glass-card bg-white/80 p-6 rounded-3xl border border-white/70 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Emissions Snapshot</h2>
                    <p className="text-sm text-gray-500">Quick look at your recent impact</p>
                </div>
                <Link href="/emissions" className="text-emerald-600 text-sm font-medium hover:text-emerald-700 flex items-center gap-1 group">
                    Full Analytics
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            <div className="bg-white/70 rounded-2xl p-5 border border-white/70 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-center sm:text-left flex-1 border-r border-emerald-100/70 pr-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Against Avg</p>
                        <div className="flex items-end gap-2 justify-center sm:justify-start">
                            <span className="text-3xl font-bold text-gray-900">{stats.neighbors.diffPercentage}%</span>
                            <span className="text-sm text-gray-500 font-medium mb-1">lower</span>
                        </div>
                        <div className="w-full h-1.5 bg-emerald-100 rounded-full mt-2">
                            <div className="h-full bg-emerald-500 rounded-full w-[21%]" />
                        </div>
                    </div>
                    <div className="space-y-2 text-center sm:text-left flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Usage</p>
                        <div className="flex items-end gap-2 justify-center sm:justify-start">
                            <span className="text-3xl font-bold text-gray-900">{stats.budget.used}</span>
                            <span className="text-sm text-gray-500 font-medium mb-1">/ {stats.budget.total} kg</span>
                        </div>
                        <div className="w-full h-1.5 bg-emerald-100 rounded-full mt-2">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.budget.percentage}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
