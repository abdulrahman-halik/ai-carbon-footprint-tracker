"use client";
import React from 'react';
import { Zap, BookOpen, Users, Activity, Leaf } from 'lucide-react';
import Link from 'next/link';

/**
 * DashboardSidebar — right-column of the dashboard containing:
 *   • Quick Actions grid (Log Travel, Invite Team, New Project, Browse Courses)
 *   • Recent Activity timeline
 *
 */
export default function DashboardSidebar() {
    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card bg-white/85 p-6 rounded-3xl border border-white/70 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Boost</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/60 border border-sky-100/60 text-sky-700 transition-all group hover:-translate-y-0.5 hover:shadow-lg">
                        <Users className="w-6 h-6 mb-2 text-sky-500" />
                        <span className="text-xs font-bold text-center">Invite Team</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-100/60 text-amber-700 transition-all group hover:-translate-y-0.5 hover:shadow-lg">
                        <Activity className="w-6 h-6 mb-2 text-amber-500" />
                        <span className="text-xs font-bold text-center">New Project</span>
                    </button>
                    <Link href="/education" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/60 border border-teal-100/60 text-teal-700 transition-all group hover:-translate-y-0.5 hover:shadow-lg">
                        <BookOpen className="w-6 h-6 mb-2 text-teal-500" />
                        <span className="text-xs font-bold text-center">Browse Courses</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card bg-white/85 p-6 rounded-3xl border border-white/70 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-200 before:to-transparent pl-6 sm:pl-0">
                    <div className="relative flex items-center sm:justify-start">
                        <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 border-2 border-white shadow">
                            <Leaf className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-white/70 ml-4 sm:ml-0 sm:mr-8 w-full sm:w-[calc(50%-2rem)] hover:shadow-md transition-shadow">
                            <p className="text-xs font-bold text-gray-900">Completed &quot;Recycling 101&quot;</p>
                            <p className="text-[10px] text-gray-500 mt-1">2 hours ago</p>
                        </div>
                    </div>
                    <div className="relative flex items-center sm:justify-end">
                        <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 border-2 border-white shadow">
                            <Zap className="w-3 h-3 text-sky-600" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-white/70 ml-4 sm:ml-8 w-full sm:w-[calc(50%-2rem)] sm:order-last hover:shadow-md transition-shadow">
                            <p className="text-xs font-bold text-gray-900">Logged flight to NY</p>
                            <p className="text-[10px] text-gray-500 mt-1">Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
