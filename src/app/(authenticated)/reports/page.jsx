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
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <ReportsHeader />
            <FeaturedCertificate />

            <h3 className="text-xl font-bold text-gray-900 mt-8">Monthly Summaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
}
