"use client";
import React from 'react';
import NudgeFeed from '@/features/recommendations/NudgeFeed';

export default function InsightsPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 -z-10 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] -z-10 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute top-[10%] left-[-10%] -z-10 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="mb-10 text-center max-w-2xl mx-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4 shadow-sm">
                    AI-Powered Sustainability
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    Your Personal Insights
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Discover personalized recommendations and actionable tips to reduce your carbon footprint and live more sustainably.
                </p>
            </div>

            <NudgeFeed />
        </div>
    );
}
