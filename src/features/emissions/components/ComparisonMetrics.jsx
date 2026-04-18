"use client";
import React from "react";
import { TrendingUp, TrendingDown, Users, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

/**
 * ComparisonMetrics — shows You vs Average, You vs Last Month, and forecast.
 * @param {number} totalFootprint
 * @param {number} lastMonth
 * @param {number} average
 * @param {number} forecast
 */
export default function ComparisonMetrics({ totalFootprint = 0, lastMonth = 0, average = 430, forecast = 0 }) {
    const vsAvgDiff = totalFootprint - average;
    const vsAvgPct = average > 0 ? ((Math.abs(vsAvgDiff) / average) * 100).toFixed(1) : 0;
    const vsAvgPositive = vsAvgDiff <= 0;

    const vsLastDiff = totalFootprint - lastMonth;
    const vsLastPct = lastMonth > 0 ? ((Math.abs(vsLastDiff) / lastMonth) * 100).toFixed(1) : 0;
    const vsLastPositive = vsLastDiff <= 0;

    const forecastIncrease = forecast > totalFootprint;

    const metrics = [
        {
            label: "vs. Average User",
            icon: Users,
            iconBg: vsAvgPositive ? "bg-emerald-500" : "bg-red-500",
            badge: vsAvgPositive ? "Below Average ✓" : "Above Average ⚠",
            badgeBg: vsAvgPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
            main: `${vsAvgPositive ? "-" : "+"}${vsAvgPct}%`,
            mainColor: vsAvgPositive ? "text-emerald-600" : "text-red-500",
            sub: `Your ${totalFootprint.toFixed(0)} kg vs avg ${average} kg`,
            TrendIcon: vsAvgPositive ? TrendingDown : TrendingUp,
            trendColor: vsAvgPositive ? "text-emerald-500" : "text-red-500",
        },
        {
            label: "vs. Last Month",
            icon: Calendar,
            iconBg: vsLastPositive ? "bg-blue-500" : "bg-orange-500",
            badge: vsLastPositive ? "Improving ↓" : "Increasing ↑",
            badgeBg: vsLastPositive ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700",
            main: `${vsLastPositive ? "-" : "+"}${vsLastPct}%`,
            mainColor: vsLastPositive ? "text-blue-600" : "text-orange-500",
            sub: `Last month: ${lastMonth.toFixed(0)} kg CO₂e`,
            TrendIcon: vsLastPositive ? TrendingDown : TrendingUp,
            trendColor: vsLastPositive ? "text-blue-500" : "text-orange-500",
        },
        {
            label: "Next Month Forecast",
            icon: BarChart3,
            iconBg: forecastIncrease ? "bg-amber-500" : "bg-teal-500",
            badge: forecastIncrease ? "Trend: Increasing ⚠" : "Trend: Stable ✓",
            badgeBg: forecastIncrease ? "bg-amber-50 text-amber-700" : "bg-teal-50 text-teal-700",
            main: `${forecast.toFixed(0)} kg`,
            mainColor: forecastIncrease ? "text-amber-600" : "text-teal-600",
            sub: "Predicted CO₂e based on current habits",
            TrendIcon: forecastIncrease ? TrendingUp : TrendingDown,
            trendColor: forecastIncrease ? "text-amber-500" : "text-teal-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((m) => {
                const Icon = m.icon;
                const TrendIcon = m.TrendIcon;
                return (
                    <Card key={m.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div className={`${m.iconBg} rounded-lg p-2`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.badgeBg}`}>
                                    {m.badge}
                                </span>
                            </div>
                            <div className="flex items-end gap-2 mb-1">
                                <span className={`text-2xl font-bold ${m.mainColor}`}>{m.main}</span>
                                <TrendIcon className={`w-4 h-4 mb-1 ${m.trendColor}`} />
                            </div>
                            <p className="text-xs text-gray-500">{m.label}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{m.sub}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
