"use client";
import React from 'react';
import { Zap, Car, Calculator } from 'lucide-react';

/**
 * EmissionsSummaryCards — renders the three top-row stat tiles:
 *   Total Footprint | Energy | Transport
 *
 * @param {object} results  - Output from calculateCarbonFootprint()
 * @param {object} feedback - Output from getFootprintFeedback()
 */
export default function EmissionsSummaryCards({ results, feedback }) {
    const energyPct = ((results.categories.energy / results.totalFootprint) * 100).toFixed(1);
    const transportPct = ((results.categories.transport / results.totalFootprint) * 100).toFixed(1);

    const levelClass = {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        average: 'bg-yellow-100 text-yellow-800',
    }[feedback?.level] ?? 'bg-orange-100 text-orange-800';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Footprint */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Total Footprint
                    </span>
                    <div className="bg-emerald-500 rounded-full p-1">
                        <Calculator className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-gray-900">{results.totalFootprint.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${levelClass}`}>
                        {feedback?.text}
                    </div>
                </div>
            </div>

            {/* Energy */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Energy
                    </span>
                    <div className="bg-emerald-500 rounded-full p-1">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{results.categories.energy.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <p className="text-xs text-emerald-600 font-medium">{energyPct}% of total</p>
                </div>
            </div>

            {/* Transport */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Transport
                    </span>
                    <div className="bg-amber-500 rounded-full p-1">
                        <Car className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{results.categories.transport.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <p className="text-xs text-amber-700 font-medium">{transportPct}% of total</p>
                </div>
            </div>
        </div>
    );
}
