"use client";
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/**
 * EmissionsBreakdownTable — detailed per-category breakdown with progress bars.
 *
 * @param {Array} breakdown - Array of { category, value, percentage, color } from calculateCarbonFootprint()
 */
export default function EmissionsBreakdownTable({ breakdown }) {
    const sorted = [...breakdown]
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);

    return (
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Detailed Emissions Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sorted.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{item.category}</span>
                                <div className="text-right">
                                    <span className="font-bold text-gray-900">{item.value.toFixed(2)} kg</span>
                                    <span className="text-sm text-gray-500 ml-2">({item.percentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
