import React from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";

export default function EmissionsDashboard() {
    return (
        <div className="space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Best Performance Card */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Best Performance
                        </span>
                        <div className="bg-emerald-500 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">Sunday</h3>
                        <p className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                            <span>↓ 15%</span>
                            <span className="text-gray-400 font-normal">vs yesterday</span>
                        </p>
                    </div>
                </div>

                {/* Major Impact Card */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Major Impact
                        </span>
                        <div className="text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">Transport</h3>
                        <p className="text-sm font-medium text-blue-600 flex items-center gap-1">
                            <span className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">45%</span>
                            <span className="text-gray-400 font-normal">of footprint</span>
                        </p>
                    </div>
                </div>

                {/* Warning Card */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Warning
                        </span>
                        <div className="text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">High Usage</h3>
                        <p className="text-sm font-medium text-amber-600 flex items-center gap-1">
                            <span>↑ 10%</span>
                            <span className="text-gray-400 font-normal">energy spike</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Trends (Takes up 2 cols) */}
                <div className="glass-card bg-white border-none shadow-sm p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Trends</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Carbon Footprint History</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">
                            ↘ -12%
                        </span>
                    </div>
                    <div className="h-[300px] w-full">
                        <EmissionSparkline className="h-full w-full" />
                    </div>
                </div>

                {/* Impact Breakdown (Takes up 1 col) */}
                <div className="glass-card bg-white border-none shadow-sm p-8">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900">Impact Breakdown</h3>
                        <p className="text-sm text-gray-500 font-medium">Where your emissions come from</p>
                    </div>
                    <div className="h-[340px] w-full">
                        <ImpactVisualizer />
                    </div>
                </div>
            </div>

            {/* Bottom Row - Budget, Neighbors, Team */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Carbon Budget */}
                <div className="glass-card bg-white border-none shadow-sm p-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Carbon Budget</h3>
                            <p className="text-sm text-gray-500">Target reached: 75%</p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-emerald-600">750</span>
                            <span className="text-xs text-gray-400 font-medium uppercase"> / 1k KG</span>
                        </div>
                    </div>
                    <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[75%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wide">
                        <span>0</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Neighbors Comparison */}
                <div className="glass-card bg-white border-none shadow-sm p-6 flex items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Neighbors</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-emerald-600 uppercase">You</span>
                                    <span className="text-gray-900">750 KG</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[75%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-400 uppercase">Avg. City</span>
                                    <span className="text-gray-900">950 KG</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-300 w-[95%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block p-4 bg-blue-50/50 rounded-xl max-w-[140px]">
                        <div className="flex items-center gap-1 text-blue-700 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Insight</span>
                        </div>
                        <p className="text-xs text-blue-600 font-medium leading-relaxed">
                            Using <span className="font-bold">21% less</span> than average.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Collaboration */}
            <div className="glass-card bg-white border-none shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Team Collaboration</h3>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 transition-colors">
                        + Add
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Safe to assume mocked data for visual fidelity as per request */}
                    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=f0fdf4&color=166534" alt="Sarah" className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Sarah Chen</h4>
                            <p className="text-xs text-gray-500">Sustainability Manager</p>
                        </div>
                        <span className="bg-emerald-100/50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Active</span>
                    </div>

                    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <img src="https://ui-avatars.com/api/?name=Mike+Rodriguez&background=fff7ed&color=9a3412" alt="Mike" className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Mike Rodriguez</h4>
                            <p className="text-xs text-gray-500">Energy Analyst</p>
                        </div>
                        <span className="bg-blue-100/50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">In Progress</span>
                    </div>
                </div>
            </div>
        </div>
    );

}
