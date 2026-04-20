"use client";
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/**
 * EmissionsBreakdownTable — detailed per-category breakdown with progress bars.
 *
 * @param {Array} breakdown - Array of { category, value, percentage, color } from calculateCarbonFootprint()
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

    return (
        <Card className="shadow-2xl border border-white/70 bg-white/80 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Detailed Emissions Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
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
                </div>
            </CardContent>
        </Card>
    );
}
