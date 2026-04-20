"use client";
import React from 'react';
import { TrendingDown, BookOpen, Users, Leaf } from 'lucide-react';

/**
 * DashboardStatsGrid — the 4-card quick-stats row at the top of the dashboard.
 *
 * @param {object} stats - API response from mockApi.getStats()
 */
export default function DashboardStatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Footprint Status */}
            <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-sky-50 p-5 rounded-3xl border border-emerald-100/60 relative overflow-hidden group shadow-lg">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all" />
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2 py-1 rounded-md">Excellent</span>
                </div>
                <p className="text-sm text-emerald-800 font-medium opacity-80">Footprint Status</p>
                <h3 className="text-2xl font-bold text-emerald-950 mt-1">On Track</h3>
            </div>

            {/* Reduction Goal */}
            <div className="glass-card bg-white/85 p-5 rounded-3xl border border-white/70 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.35)] hover:shadow-[0_16px_40px_-16px_rgba(16,185,129,0.35)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">Reduction Goal</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-900">{stats.budget.percentage}%</h3>
                    <span className="text-xs text-gray-400 font-medium">reached</span>
                </div>
            </div>

            {/* Active Courses */}
            <div className="glass-card bg-white/85 p-5 rounded-3xl border border-white/70 shadow-[0_8px_30px_-12px_rgba(56,189,248,0.35)] hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="bg-sky-100/60 text-sky-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Learning</span>
                </div>
                <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                    <span className="text-xs text-sky-600 font-medium hover:underline cursor-pointer">Resume</span>
                </div>
            </div>

            {/* Team Rank */}
            <div className="glass-card bg-white/85 p-5 rounded-3xl border border-white/70 shadow-[0_8px_30px_-12px_rgba(245,158,11,0.35)] hover:shadow-[0_16px_40px_-16px_rgba(245,158,11,0.35)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">Team Rank</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-900">Top 10%</h3>
                    <span className="text-xs text-amber-600 font-bold">↑ 2 spots</span>
                </div>
            </div>
        </div>
    );
}
