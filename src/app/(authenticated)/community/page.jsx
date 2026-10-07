"use client";
import React, { useState, useEffect } from 'react';
import Leaderboard from '@/features/social/Leaderboard';
import PeerComparison from '@/features/social/PeerComparison';
import apiClient from "@/lib/apiClient";

export default function CommunityPage() {
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await apiClient.get('/api/community/peer-comparison');
                setTotalUsers(res.data.totalUsers || 0);
            } catch (err) {
                console.error("Failed to fetch total users:", err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm">
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
                        🌱 {totalUsers > 0 ? `${totalUsers} Active Neighbors` : 'Loading...'}
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
