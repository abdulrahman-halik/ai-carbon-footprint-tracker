"use client";
import React from 'react';
import { Zap, BookOpen, Users, Activity, Leaf } from 'lucide-react';
import Link from 'next/link';

/**
 * DashboardSidebar — right-column of the dashboard containing:
 *   • Quick Actions grid (Log Travel, Invite Team, New Project, Browse Courses)
 *   • Recent Activity timeline
 *
 * @param {Function} onNewEntry - Opens the New Entry modal
 */
export default function DashboardSidebar({ onNewEntry }) {
    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onNewEntry}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 text-gray-600 hover:text-emerald-700 transition-all group"
                    >
                        <Zap className="w-6 h-6 mb-2 text-gray-400 group-hover:text-emerald-500" />
                        <span className="text-xs font-bold text-center">Log Travel</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 text-gray-600 hover:text-blue-700 transition-all group">
                        <Users className="w-6 h-6 mb-2 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-xs font-bold text-center">Invite Team</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-100 text-gray-600 hover:text-orange-700 transition-all group">
                        <Activity className="w-6 h-6 mb-2 text-gray-400 group-hover:text-orange-500" />
                        <span className="text-xs font-bold text-center">New Project</span>
                    </button>
                    <Link href="/education" className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-100 text-gray-600 hover:text-purple-700 transition-all group">
                        <BookOpen className="w-6 h-6 mb-2 text-gray-400 group-hover:text-purple-500" />
                        <span className="text-xs font-bold text-center">Browse Courses</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-5 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent pl-6 sm:pl-0">
                    <div className="relative flex items-center sm:justify-start">
                        <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 border-2 border-white shadow">
                            <Leaf className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 ml-4 sm:ml-0 sm:mr-8 w-full sm:w-[calc(50%-2rem)] hover:shadow-md transition-shadow">
                            <p className="text-xs font-bold text-gray-900">Completed &quot;Recycling 101&quot;</p>
                            <p className="text-[10px] text-gray-500 mt-1">2 hours ago</p>
                        </div>
                    </div>
                    <div className="relative flex items-center sm:justify-end">
                        <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 border-2 border-white shadow">
                            <Zap className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 ml-4 sm:ml-8 w-full sm:w-[calc(50%-2rem)] sm:order-last hover:shadow-md transition-shadow">
                            <p className="text-xs font-bold text-gray-900">Logged flight to NY</p>
                            <p className="text-[10px] text-gray-500 mt-1">Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
