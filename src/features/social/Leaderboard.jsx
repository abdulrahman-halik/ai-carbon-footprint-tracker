import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

const MOCK_LEADERBOARD = [
    { id: 1, name: 'Alice', score: 120, avatar: 'A' },
    { id: 2, name: 'Bob', score: 110, avatar: 'B' },
    { id: 3, name: 'Charlie', score: 95, avatar: 'C' },
    { id: 4, name: 'You', score: 85, avatar: 'Y', isCurrentUser: true },
    { id: 5, name: 'Diana', score: 80, avatar: 'D' },
];

export const Leaderboard = () => {
    const [filter, setFilter] = useState('weekly');

    return (
        <Card className="w-full h-full border-0 shadow-lg shadow-gray-200/50 rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white">
            <div className="p-6 space-y-6">
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

                <div className="space-y-3">
                    {MOCK_LEADERBOARD.map((user, index) => {
                        const isTop3 = index < 3;
                        let rankColor = 'text-gray-500 bg-gray-100';
                        if (index === 0) rankColor = 'text-yellow-700 bg-yellow-100 ring-1 ring-yellow-200'; // Gold
                        if (index === 1) rankColor = 'text-gray-700 bg-gray-200 ring-1 ring-gray-300'; // Silver
                        if (index === 2) rankColor = 'text-orange-800 bg-orange-100 ring-1 ring-orange-200'; // Bronze

                        return (
                            <div
                                key={user.id}
                                className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${user.isCurrentUser
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm'
                                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-100'
                                    }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColor}`}>
                                        {index + 1}
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${user.isCurrentUser ? 'bg-green-500' : 'bg-indigo-400'
                                            }`}>
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <span className={`block font-semibold ${user.isCurrentUser ? 'text-green-900' : 'text-gray-900'}`}>
                                                {user.name}
                                            </span>
                                            {user.isCurrentUser && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">You</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-bold text-gray-900 group-hover:scale-105 transition-transform">{user.score}</span>
                                    <span className="text-xs text-gray-500 font-medium">pts</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    );
};

export default Leaderboard;
