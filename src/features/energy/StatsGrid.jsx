"use client";

import React from "react";
import { TrendingUp, TrendingDown, Zap, Sun, DollarSign, BarChart3 } from "lucide-react";

export default function StatsGrid() {
    const stats = [
        {
            label: "Daily Usage",
            value: "12.4",
            unit: "kWh",
            icon: Zap,
            trend: { direction: "up", value: "5%", text: "vs last week" },
            gradient: "from-amber-500 to-orange-500",
            bg: "bg-amber-50",
            ring: "ring-amber-100",
            iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
        },
        {
            label: "Renewable Mix",
            value: "42",
            unit: "%",
            icon: Sun,
            trend: { direction: "down", value: "8%", text: "more green" },
            gradient: "from-emerald-500 to-teal-500",
            bg: "bg-emerald-50",
            ring: "ring-emerald-100",
            iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
            progress: 42,
        },
        {
            label: "Monthly Cost",
            value: "$48.20",
            unit: "",
            icon: DollarSign,
            trend: { direction: "down", value: "12%", text: "savings" },
            gradient: "from-violet-500 to-purple-500",
            bg: "bg-violet-50",
            ring: "ring-violet-100",
            iconBg: "bg-gradient-to-br from-violet-400 to-purple-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const isUp = stat.trend.direction === "up";
                return (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ${stat.ring}`}
                    >
                        {/* Decorative corner gradient */}
                        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-xl`} />

                        <div className="relative flex items-start justify-between">
                            <div className="space-y-3">
                                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{stat.value}</span>
                                    {stat.unit && <span className="text-sm font-medium text-gray-400">{stat.unit}</span>}
                                </div>
                            </div>
                            <div className={`${stat.iconBg} p-3 rounded-xl text-white shadow-lg`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>

                        {stat.progress !== undefined && (
                            <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className={`h-2.5 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000`}
                                    style={{ width: `${stat.progress}%` }}
                                />
                            </div>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isUp ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                {stat.trend.value}
                            </div>
                            <span className="text-xs text-gray-400">{stat.trend.text}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
