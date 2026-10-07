"use client";

import React, { useState, useEffect } from 'react';
import apiClient from "@/lib/apiClient";
import { Card } from '@/components/ui/Card';

export function PeerCategoryBar({ cat, userVal, avgVal }) {
    // Format values safely
    const safeUserVal = Number(userVal) || 0;
    const safeAvgVal = Number(avgVal) || 0;
    
    const fmtUser = safeUserVal.toFixed(1);
    const fmtAvg = safeAvgVal.toFixed(1);

    // Calculate percentages for bar widths
    // Ensure there is some max value to avoid division by zero
    const maxVal = (Math.max(safeUserVal, safeAvgVal) * 1.3) || 100;
    const avgPercent = (safeAvgVal / maxVal) * 100;
    const userPercent = (safeUserVal / maxVal) * 100;

    return (
        <div className="space-y-2 group w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
                <span className="font-semibold text-gray-800 flex items-center gap-2">{cat.label}</span>
                <div className="flex items-center gap-4 bg-gray-50/80 px-3 py-1.5 rounded-lg border border-gray-100 shadow-xs">
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block leading-none mb-1">You</span>
                        <span className="text-sm font-extrabold text-gray-800">{fmtUser} <span className="text-xs font-medium text-gray-500">kg</span></span>
                    </div>
                    <div className="w-px h-6 bg-gray-300 rounded-full"></div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block leading-none mb-1">Avg</span>
                        <span className="text-sm font-extrabold text-gray-600">{fmtAvg} <span className="text-xs font-medium text-gray-400">kg</span></span>
                    </div>
                </div>
            </div>
            
            <div className={`relative h-6 sm:h-8 ${cat.bg} rounded-full overflow-hidden shadow-inner w-full`}>
                {/* Average Marker Line */}
                {safeAvgVal > 0 && (
                    <div
                        className="absolute top-0 bottom-0 w-[3px] bg-gray-400 z-20 shadow-xs transition-all duration-1000 ease-out"
                        style={{ left: `${avgPercent}%`, transform: 'translateX(-50%)' }}
                        title={`Peer Average: ${fmtAvg} kg`}
                    />
                )}

                {/* User Bar */}
                <div
                    className={`h-full bg-linear-to-r ${cat.color} rounded-full transition-all duration-1000 ease-out shadow-sm relative z-10 group-hover:brightness-110`}
                    style={{ width: `${userPercent}%`, minWidth: userPercent > 0 ? '0.75rem' : '0' }}
                />
            </div>
        </div>
    );
}

export const PeerComparison = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparison = async () => {
            try {
                const res = await apiClient.get('/api/community/peer-comparison');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch peer comparison:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchComparison();
    }, []);

    const user = stats?.userStats || { transport: 0, energy: 0, diet: 0 };
    const avg = stats?.peerStats || { transport: 0, energy: 0, diet: 0 };
    const userCount = stats?.totalUsers || 0;

    const categories = [
        { key: 'transport', label: '🚗 Transport', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-100/50' },
        { key: 'energy', label: '⚡ Home Energy', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-100/50' },
        { key: 'diet', label: '🥗 Diet & Food', color: 'from-emerald-400 to-green-600', bg: 'bg-emerald-100/50' },
    ];

    return (
        <Card className="w-full h-full border border-white/70 shadow-xl rounded-3xl overflow-hidden bg-white/85 hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 sm:p-8 space-y-8 flex flex-col h-full justify-center">
                <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Peer Comparison</h3>
                    <p className="mt-1.5 text-sm font-medium text-gray-500">
                        {userCount > 0 
                            ? `How your footprint compares to ${userCount} similar household${userCount !== 1 ? 's' : ''}.`
                            : 'No other households to compare with yet. Check back later!'}
                    </p>
                </div>

                <div className="space-y-6 flex-1 flex flex-col justify-center">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-8">
                            <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                            <span className="text-sm font-medium text-gray-500">Analyzing community data...</span>
                        </div>
                    ) : (
                        categories.map((cat) => (
                            <PeerCategoryBar key={cat.key} cat={cat} userVal={user[cat.key]} avgVal={avg[cat.key]} />
                        ))
                    )}
                </div>
            </div>
        </Card>
    );
};

export default PeerComparison;