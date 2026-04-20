"use client";

import React from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";

export default function EmissionsChartsRow({ emissionsData, impactData }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Weekly Trends</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Carbon Footprint History</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">↘ -8%</span>
                </div>
                <div className="h-[300px] w-full">
                    <EmissionSparkline data={emissionsData} className="h-full w-full" />
                </div>
            </div>
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl p-8">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900">Impact Breakdown</h3>
                    <p className="text-sm text-gray-500 font-medium">Where your emissions come from</p>
                </div>
                <div className="h-[340px] w-full">
                    <ImpactVisualizer data={impactData} />
                </div>
            </div>
        </div>
    );
}
