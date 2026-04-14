"use client";

import React, { useState, useEffect } from "react";
import {
    Activity,
    BookOpen,
    Users,
    TrendingDown,
    Zap,
    Bell,
    ArrowRight,
    Leaf
} from "lucide-react";
import Link from "next/link";
import mockApi from "@/mockApi";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/Modal";
import ActivityLogWizard from "@/features/tracking/ActivityLogWizard";

export default function MainDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                // For the main dashboard we just need quick high-level stats
                const statsRes = await mockApi.getStats();
                setStats(statsRes);
            } catch (error) {
                console.error("Failed to fetch dashboard overview:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Greeting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Welcome back, User
                    </h1>
                    <p className="text-gray-500 mt-1">Here is what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                        <Bell className="w-4 h-4 text-gray-500" />
                        <span>Notifications</span>
                    </button>
                    <button
                        onClick={() => setIsNewEntryOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 shadow-md shadow-emerald-600/20 rounded-lg text-sm font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer group">
                        <span>New Entry</span>
                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick Stats Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-100/50 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded-md">Excellent</span>
                    </div>
                    <p className="text-sm text-emerald-800 font-medium opacity-80">Footprint Status</p>
                    <h3 className="text-2xl font-bold text-emerald-950 mt-1">On Track</h3>
                </div>

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

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Emissions Mini-Summary & Activity Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Mini Emissions Overview */}
                    <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100 max-h-min p-6">
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

                        <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                {/* Compare */}
                                <div className="space-y-2 text-center sm:text-left flex-1 border-r border-gray-200 pr-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Against Avg</p>
                                    <div className="flex items-end gap-2 justify-center sm:justify-start">
                                        <span className="text-3xl font-bold text-gray-900">{stats.neighbors.diffPercentage}%</span>
                                        <span className="text-sm text-gray-500 font-medium mb-1">lower</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div className="h-full bg-emerald-500 rounded-full w-[21%]"></div>
                                    </div>
                                </div>
                                {/* Used */}
                                <div className="space-y-2 text-center sm:text-left flex-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Usage</p>
                                    <div className="flex items-end gap-2 justify-center sm:justify-start">
                                        <span className="text-3xl font-bold text-gray-900">{stats.budget.used}</span>
                                        <span className="text-sm text-gray-500 font-medium mb-1">/ {stats.budget.total} kg</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.budget.percentage}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Education Modules */}
                    <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View All</button>
                        </div>
                        <div className="space-y-4">
                            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Sustainable Logistics 101</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-xs text-gray-500">2 modules remaining</span>
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full">
                                            <div className="h-full bg-purple-500 rounded-full w-[60%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Intro to Carbon Tracking</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-xs text-gray-500">Not started</span>
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full flex"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Recent Activity & Quick Actions */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setIsNewEntryOpen(true)}
                                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 text-gray-600 hover:text-emerald-700 transition-all group">
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
                                    <p className="text-xs font-bold text-gray-900">Completed "Recycling 101"</p>
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

            </div>

            <Modal isOpen={isNewEntryOpen} onClose={() => setIsNewEntryOpen(false)}>
                <ModalContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50/50">
                    <ModalHeader>
                        <ModalTitle className="text-2xl">Log New Activity</ModalTitle>
                    </ModalHeader>
                    <div className="p-2 sm:p-4">
                        <ActivityLogWizard />
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}
