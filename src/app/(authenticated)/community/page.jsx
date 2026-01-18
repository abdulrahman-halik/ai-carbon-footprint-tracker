"use client";
import React from 'react';
import Leaderboard from '@/features/social/Leaderboard';
import PeerComparison from '@/features/social/PeerComparison';

export default function CommunityPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Community Hub
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Connect, compete, and grow with your sustainable neighborhood.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        🌱 142 Active Neighbors
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <PeerComparison />
                <Leaderboard />
            </div>
        </div>
    );
}
