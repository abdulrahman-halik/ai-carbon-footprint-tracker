"use client";

import React, { useState, useEffect } from "react";
import mockApi from "@/mockApi";
import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";
import DashboardHero from "./DashboardHero";
import EmissionsSnapshotCard from "./EmissionsSnapshotCard";
import LearningCard from "./LearningCard";

/**
 * MainDashboard — page-level orchestrator.
 * Fetches stats, manages modal state, and composes sub-components.
 */
export default function MainDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const displayName = user?.name?.trim() || "User";

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
        <div className="relative space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            {/* Greeting hero */}
            <DashboardHero displayName={displayName} />

            {/* Quick stats */}
            <DashboardStatsGrid stats={stats} />

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Emissions snapshot + Learning */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Emissions snapshot */}
                    <EmissionsSnapshotCard stats={stats} />

                    {/* Learning */}
                    <LearningCard />
                </div>

                {/* Right: Quick Actions + Recent Activity */}
                <DashboardSidebar />
            </div>
        </div>
    );
}
