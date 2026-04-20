"use client";

import React from 'react';

export default function LeaderItem({ user, index }) {
    const isTop3 = index < 3;
    let rankColor = 'text-gray-500 bg-gray-100';
    if (index === 0) rankColor = 'text-yellow-700 bg-yellow-100 ring-1 ring-yellow-200';
    if (index === 1) rankColor = 'text-gray-700 bg-gray-200 ring-1 ring-gray-300';
    if (index === 2) rankColor = 'text-orange-800 bg-orange-100 ring-1 ring-orange-200';

    return (
        <div
            className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${user.isCurrentUser
                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/70 border border-emerald-200/70 shadow-md'
                : 'hover:bg-emerald-50/40 border border-transparent hover:border-emerald-100/70'
            }`}
        >
            <div className="flex items-center space-x-4">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColor}`}>
                    {index + 1}
                </div>

                <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${user.isCurrentUser ? 'bg-emerald-500' : 'bg-sky-500'}`}>
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
    );
}
