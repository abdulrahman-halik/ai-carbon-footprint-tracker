"use client";

import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Bell,
    ArrowRight,
    Zap,
} from "lucide-react";
import Link from "next/link";
import mockApi from "@/mockApi";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/Modal";
import ActivityLogWizard from "@/features/tracking/ActivityLogWizard";
import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardSidebar from "./DashboardSidebar";

/**
 * MainDashboard — page-level orchestrator.
 * Fetches stats, manages modal state, and composes sub-components.
 */
export default function MainDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Greeting header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, User</h1>
                    <p className="text-gray-500 mt-1">Here is what&apos;s happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsNewEntryOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 shadow-md shadow-emerald-600/20 rounded-lg text-sm font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer group"
                    >
                        <span>New Entry</span>
                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick stats */}
            <DashboardStatsGrid stats={stats} />

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Emissions snapshot + Learning */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Emissions snapshot */}
                    <div className="glass-card bg-white p-6 rounded-2xl border border-gray-100">
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
                                <div className="space-y-2 text-center sm:text-left flex-1 border-r border-gray-200 pr-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Against Avg</p>
                                    <div className="flex items-end gap-2 justify-center sm:justify-start">
                                        <span className="text-3xl font-bold text-gray-900">{stats.neighbors.diffPercentage}%</span>
                                        <span className="text-sm text-gray-500 font-medium mb-1">lower</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div className="h-full bg-emerald-500 rounded-full w-[21%]" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-center sm:text-left flex-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Usage</p>
                                    <div className="flex items-end gap-2 justify-center sm:justify-start">
                                        <span className="text-3xl font-bold text-gray-900">{stats.budget.used}</span>
                                        <span className="text-sm text-gray-500 font-medium mb-1">/ {stats.budget.total} kg</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.budget.percentage}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning */}
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
                                            <div className="h-full bg-purple-500 rounded-full w-[60%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Intro to Carbon Tracking</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-xs text-gray-500">Not started</span>
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Actions + Recent Activity */}
                <DashboardSidebar onNewEntry={() => setIsNewEntryOpen(true)} />
            </div>

            {/* New Entry modal */}
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
