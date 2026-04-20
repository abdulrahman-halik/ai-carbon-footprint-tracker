"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useMemo } from "react";
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
import mockApi from "@/mockApi";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/Modal";
import ActivityLogWizard from "@/features/tracking/ActivityLogWizard";
import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";
import DashboardHero from "./DashboardHero";
import EmissionsSnapshotCard from "./EmissionsSnapshotCard";
import LearningCard from "./LearningCard";

// Sub-components
import DashboardHero from "./DashboardHero";
import DashboardInsights from "./DashboardInsights";
import DashboardTrends from "./DashboardTrends";
import DashboardGoals from "./DashboardGoals";
import DashboardComparisons from "./DashboardComparisons";

/**
 * MainDashboard — high-level environmental impact overview.
 * Refactored into smaller, focused components for better maintainability.
 */
export default function MainDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
<<<<<<< HEAD
    const { user } = useAuth();
    const displayName = user?.name?.trim() || "User";
=======
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const statsRes = await mockApi.getStats();
            setStats(statsRes);
            const u = mockApi.getCurrentUser();
            setUser(u);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6

    useEffect(() => {
        fetchData();
    }, []);

    const greeting = useMemo(() => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const handleNewEntryClose = () => {
        setIsNewEntryOpen(false);
        fetchData(); // Refresh stats after logging activity
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto" />
                    <p className="text-sm text-gray-400">Loading your impact overview…</p>
                </div>
            </div>
        );
    }

    return (
<<<<<<< HEAD
        <div className="relative space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            {/* Greeting hero */}
            <DashboardHero displayName={displayName} onNewEntry={() => setIsNewEntryOpen(true)} />
=======
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-4">

            <DashboardHero user={user} greeting={greeting} />
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6

            <DashboardStatsGrid stats={stats} />

<<<<<<< HEAD
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Emissions snapshot + Learning */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Emissions snapshot */}
                    <EmissionsSnapshotCard stats={stats} />

                    {/* Learning */}
                    <LearningCard />
=======
            <DashboardInsights />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DashboardTrends />
                    <DashboardGoals />
                    <DashboardComparisons stats={stats} />
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                </div>

                <DashboardSidebar onNewEntry={() => setIsNewEntryOpen(true)} />
            </div>

            <Modal isOpen={isNewEntryOpen} onClose={handleNewEntryClose}>
                <ModalContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50/50">
                    <ModalHeader>
                        <ModalTitle className="text-2xl">Log New Activity</ModalTitle>
                    </ModalHeader>
                    <div className="p-2 sm:p-4">
                        <ActivityLogWizard onComplete={handleNewEntryClose} />
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}
