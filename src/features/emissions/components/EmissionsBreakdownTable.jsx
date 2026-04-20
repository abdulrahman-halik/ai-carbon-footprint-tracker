"use client";
import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const IMPACT_LEVELS = [
    { threshold: 33, label: '🟢 Low', cls: 'text-emerald-700 bg-emerald-50' },
    { threshold: 55, label: '🟡 Medium', cls: 'text-yellow-700 bg-yellow-50' },
    { threshold: Infinity, label: '🔴 High', cls: 'text-red-700 bg-red-50' },
];

function getImpact(percentage) {
    return IMPACT_LEVELS.find(l => percentage <= l.threshold) || IMPACT_LEVELS[2];
}

/**
 * EmissionsBreakdownTable — sorted breakdown with progress bars + impact badges.
 */
export default function EmissionsBreakdownTable({ breakdown, extraEntries = [], onEditExtra, onDeleteExtra }) {
    const merged = [...(breakdown || []), ...extraEntries];
    const filtered = merged.filter(item => (item && Number(item.value) > 0));
    const total = filtered.reduce((s, it) => s + (Number(it.value) || 0), 0) || 1;
    const withPerc = filtered.map(it => ({
        ...it,
        percentage: (typeof it.percentage === 'number') ? it.percentage : ((Number(it.value) || 0) / total) * 100,
        color: it.color || '#60A5FA',
    }));
    const sorted = withPerc.sort((a, b) => b.value - a.value);

    const topItem = sorted[0];

    return (
<<<<<<< HEAD
        <Card className="shadow-2xl border border-white/70 bg-white/80 backdrop-blur-xl">
=======
        <Card className="shadow-sm border-0 ring-1 ring-gray-200/50">
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    Detailed Emissions Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                {/* Biggest opportunity callout */}
                {topItem && (
                    <div className="flex items-center gap-3 mb-4 bg-amber-50 rounded-xl px-4 py-3">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                            <strong>{topItem.category}</strong> is your biggest driver at{' '}
                            <strong>{topItem.percentage.toFixed(1)}%</strong> of total emissions.
                        </p>
                    </div>
                )}
                <div className="space-y-4">
<<<<<<< HEAD
                    {sorted.map((item, index) => (
                        <div key={item.id || index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{item.category}</span>
                                <div className="text-right">
                                    <span className="font-bold text-gray-900">{Number(item.value).toFixed(2)} kg</span>
                                    <span className="text-sm text-gray-500 ml-2">({Number(item.percentage).toFixed(1)}%)</span>
                                </div>
                            </div>
                            <div className="w-full bg-emerald-100 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${Number(item.percentage)}%`, backgroundColor: item.color }}
                                />
                            </div>
                            {/* Extra actions for custom entries */}
                            {item.id && (item._custom) && (
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => onEditExtra && onEditExtra(item)} className="text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-50">Edit</button>
                                    <button onClick={() => onDeleteExtra && onDeleteExtra(item.id)} className="text-sm text-red-600 px-2 py-1 rounded hover:bg-red-50">Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
=======
                    {sorted.map((item, index) => {
                        const impact = getImpact(item.percentage);
                        return (
                            <div key={index} className="space-y-1.5">
                                <div className="flex justify-between items-center gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-medium text-gray-800 truncate">{item.category}</span>
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${impact.cls}`}>
                                            {impact.label}
                                        </span>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-sm font-bold text-gray-900">{item.value.toFixed(2)} kg</span>
                                        <span className="text-xs text-gray-400 ml-1.5">({item.percentage.toFixed(1)}%)</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                </div>
            </CardContent>
        </Card>
    );
}
