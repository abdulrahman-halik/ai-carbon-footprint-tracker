"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import PeerCategoryBar from './PeerCategoryBar';

export function PeerCategoryBar({ cat, userVal, avgVal }) {
    const maxVal = Math.max(userVal, avgVal) * 1.3;
    return (
        <div className="space-y-3 group">
            <div className="flex justify-between items-end">
                <span className="font-semibold text-gray-700 flex items-center gap-2">{cat.label}</span>
                <div className="text-right">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Target</span>
                    <span className="ml-2 text-sm font-bold text-gray-600">{avgVal} <span className="text-xs font-normal text-gray-400">kg</span></span>
                </div>
            </div>
            <div className={`relative h-10 ${cat.bg} rounded-2xl overflow-hidden shadow-inner`}>
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-gray-400/50 z-10 border-r border-dashed border-gray-600"
                    style={{ left: `${(avgVal / maxVal) * 100}%` }}
                    title={`Average: ${avgVal}`}
                />
                <div
                    className="absolute top-0 bottom-0 z-20 flex flex-col justify-between py-1"
                    style={{ left: `calc(${(avgVal / maxVal) * 100}% + 4px)` }}
                >
                    <span className="text-[10px] font-medium text-gray-400 leading-none">Avg</span>
                </div>

                <div
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-r-2xl transition-all duration-1000 ease-out flex items-center justify-end pr-3 shadow-sm relative z-0 group-hover:brightness-110`}
                    style={{ width: `${(userVal / maxVal) * 100}%` }}
                >
                    <span className="text-xs font-bold text-white drop-shadow-sm filter">{userVal}</span>
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>My Footprint</span>
            </div>
        </div>
    );
}

export const PeerComparison = ({ userStats, peerStats }) => {
    const user = userStats || { transport: 42, energy: 28, diet: 35 };
    const avg = peerStats || { transport: 50, energy: 45, diet: 35 };

    const categories = [
        { key: 'transport', label: '🚗 Transport', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
        { key: 'energy', label: '⚡ Home Energy', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
        { key: 'diet', label: '🥗 Diet & Food', color: 'from-emerald-400 to-green-600', bg: 'bg-emerald-50' },
    ];

    return (
        <Card className="w-full h-full border border-white/70 shadow-2xl rounded-3xl overflow-hidden bg-white/85">
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Peer Comparison</h3>
                    <p className="mt-1 text-sm text-gray-600">How your footprint compares to similar households.</p>
                </div>

                <div className="space-y-8">
                    {categories.map((cat) => (
                        <PeerCategoryBar key={cat.key} cat={cat} userVal={user[cat.key]} avgVal={avg[cat.key]} />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default PeerComparison;