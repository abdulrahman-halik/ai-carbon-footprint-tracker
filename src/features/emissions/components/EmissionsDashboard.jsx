import React from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";

export default function EmissionsDashboard() {
    return (
        <div className="space-y-8">
            {/* Additional Stats/Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Best Day Card */}
                <div className="glass-card bg-gradient-to-br from-emerald-50/50 to-white/30 border-emerald-100/50">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-emerald-700 font-bold text-xs uppercase tracking-widest mb-1">Best Day</h4>
                            <p className="text-3xl font-extrabold text-gray-900 mt-1">Sunday</p>
                            <div className="mt-3 flex items-center">
                                <span className="bg-emerald-100/80 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold">
                                    ↓ 15%
                                </span>
                                <span className="text-xs text-gray-500 ml-2 font-medium">Lowest emissions</span>
                            </div>
                        </div>
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.5-1.1.2-2.3 1.3-2.8l3.2-1.4c1.3-.6 2.9-.1 3.6 1.2l1.4 2.6c.6 1.1 2 1.5 3 .9l4.5-2.6c1.1-.6 2.5-.2 3.1.9l.9 1.6c.5 1 .1 2.2-.9 2.7l-2 1"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Top Category Card */}
                <div className="glass-card bg-gradient-to-br from-blue-50/50 to-white/30 border-blue-100/50">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-blue-700 font-bold text-xs uppercase tracking-widest mb-1">Top Category</h4>
                            <p className="text-3xl font-extrabold text-gray-900 mt-1">Transport</p>
                            <div className="mt-3 flex items-center">
                                <span className="bg-blue-100/80 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                                    45%
                                </span>
                                <span className="text-xs text-gray-500 ml-2 font-medium">of total footprint</span>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h6.17a2 2 0 0 1 1.89 1.4L18 16z"></path><circle cx="5.5" cy="17.5" r="2.5"></circle><circle cx="18.5" cy="17.5" r="2.5"></circle></svg>
                        </div>
                    </div>
                </div>

                {/* Action Needed Card */}
                <div className="glass-card bg-gradient-to-br from-amber-50/50 to-white/30 border-amber-100/50">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-1">Action Needed</h4>
                            <p className="text-3xl font-extrabold text-gray-900 mt-1">High Usage</p>
                            <div className="mt-3 flex items-center">
                                <span className="bg-amber-100/80 text-amber-800 text-xs px-2 py-1 rounded-full font-bold">
                                    ↑ 10%
                                </span>
                                <span className="text-xs text-gray-500 ml-2 font-medium">Energy increase</span>
                            </div>
                        </div>
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <div className="glass-card p-1">
                    <EmissionSparkline className="min-h-[300px]" />
                </div>

                {/* Breakdown Chart */}
                <div className="glass-card p-1">
                    <ImpactVisualizer className="min-h-[300px]" />
                </div>
            </div>
        </div>
    );

}
