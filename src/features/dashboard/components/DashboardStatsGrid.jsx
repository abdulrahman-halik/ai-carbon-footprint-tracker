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
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-100/50 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded-md">Excellent</span>
                </div>
                <p className="text-sm text-emerald-800 font-medium opacity-80">Footprint Status</p>
                <h3 className="text-2xl font-bold text-emerald-950 mt-1">On Track</h3>
            </div>

            {/* Reduction Goal */}
            <div className="glass-card bg-white p-5 rounded-2xl border border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
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
            <div className="glass-card bg-white p-5 rounded-2xl border border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="bg-purple-100/50 text-purple-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Learning</span>
                </div>
                <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                    <span className="text-xs text-purple-600 font-medium hover:underline cursor-pointer">Resume</span>
                </div>
            </div>

            {/* Team Rank */}
            <div className="glass-card bg-white p-5 rounded-2xl border border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">Team Rank</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-gray-900">Top 10%</h3>
                    <span className="text-xs text-orange-600 font-bold">↑ 2 spots</span>
                </div>
            </div>
        </div>
    );
}
