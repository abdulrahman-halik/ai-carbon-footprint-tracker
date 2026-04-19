"use client";

import React from "react";
import { BarChart3, Zap } from "lucide-react";

export default function MeterPreview({ reading, date, readings = [] }) {
    return (
        <div className="space-y-5">
            <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    Live Preview
                </h4>
                <p className="text-xs text-gray-400 mt-1">Snapshot of the current reading</p>
            </div>

            {/* Current reading card */}
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                <div className="relative">
                    <div className="text-amber-100 text-xs font-medium uppercase tracking-wider">Current Reading</div>
                    <div className="text-4xl font-extrabold mt-1 tracking-tight">{reading || '--'}</div>
                    <div className="text-amber-200 text-sm mt-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        kWh &bull; {date || '—'}
                    </div>
                </div>
            </div>

            {/* Recent readings */}
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent History</div>
                <div className="space-y-2 max-h-44 overflow-auto pr-1">
                    {readings.length === 0 && (
                        <div className="text-center py-4 text-xs text-gray-300">No recent readings</div>
                    )}
                    {readings.slice(0, 5).map((r) => (
                        <div key={r.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                                </div>
                                <span className="text-sm text-gray-500">{r.date}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{r.reading} <span className="text-xs font-normal text-gray-400">kWh</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
