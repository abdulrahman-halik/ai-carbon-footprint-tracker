"use client";

import React from 'react';

export default function LeaderboardHeader({ filter, setFilter }) {
    return (
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
                <h3 className="text-xl font-bold text-gray-900">Community Leaderboard</h3>
                <p className="text-sm text-gray-500 mt-1">Top savers this week</p>
            </div>
            <div className="relative">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-0 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-green-500 transition-colors cursor-pointer"
                >
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="all-time">All Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
        </div>
    );
}
