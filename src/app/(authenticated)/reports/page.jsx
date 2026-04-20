"use client";

import React from 'react';
import ReportsHeader from '@/features/reports/ReportsHeader';
import FeaturedCertificate from '@/features/reports/FeaturedCertificate';
import ReportCard from '@/features/reports/ReportCard';

export default function ReportsPage() {
    const reports = [
        {
            id: 1,
            month: "January 2026",
            score: "A",
            emissions: "850 kg",
            saved: "120 kg",
            status: "Available",
            badge: "Eco Warrior",
            color: "emerald",
        },
        {
            id: 2,
            month: "December 2025",
            score: "B+",
            emissions: "1,100 kg",
            saved: "45 kg",
            status: "Available",
            badge: "Improver",
            color: "blue",
        },
    ];

    return (
        <div className="relative space-y-10 max-w-7xl mx-auto pb-10">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            <ReportsHeader />
            <FeaturedCertificate />

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Monthly Summaries</h3>
                <span className="rounded-2xl border border-emerald-200 bg-white/70 px-4 py-2 text-xs font-semibold text-emerald-800">2 reports ready</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
}
