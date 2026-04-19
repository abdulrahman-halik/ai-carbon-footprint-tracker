"use client";
import React from 'react';
import { TrendingDown, TrendingUp, Droplets, BarChart3, AlertTriangle, Target } from 'lucide-react';

export default function WaterStats() {
    const stats = [
        {
            label: "Daily Average",
            value: "148",
            unit: "Liters",
            icon: Droplets,
            trend: { direction: "down", value: "12%", text: "vs last week" },
            gradient: "from-sky-500 to-cyan-500",
            ring: "ring-sky-100",
            iconBg: "bg-gradient-to-br from-sky-400 to-cyan-500",
        },
        {
            label: "Monthly Total",
            value: "4,200",
            unit: "Liters",
            icon: BarChart3,
            trend: { direction: "down", value: "8%", text: "under target" },
            gradient: "from-blue-500 to-indigo-500",
            ring: "ring-blue-100",
            iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
            extra: { label: "Projected", value: "4,500L" },
        },
        {
            label: "Alerts",
            value: "1",
            unit: "Active",
            icon: AlertTriangle,
            gradient: "from-amber-500 to-orange-500",
            ring: "ring-amber-100",
            iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
            alert: { title: "High Usage Detected", description: "Sunday — check your irrigation system." },
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const isUp = stat.trend?.direction === "up";
                return (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ${stat.ring}`}
                    >
                        {/* Corner glow */}
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

                        {stat.trend && (
                            <div className="mt-4 flex items-center gap-2">
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isUp ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                    {stat.trend.value}
                                </div>
                                <span className="text-xs text-gray-400">{stat.trend.text}</span>
                            </div>
                        )}

                        {stat.extra && (
                            <div className="mt-4 flex items-center gap-2 bg-blue-50/60 px-3 py-2 rounded-xl">
                                <Target className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-xs text-gray-500">{stat.extra.label}: <span className="font-bold text-gray-700">{stat.extra.value}</span></span>
                            </div>
                        )}

                        {stat.alert && (
                            <div className="mt-4 flex items-start gap-2.5 bg-amber-50/60 px-3 py-2.5 rounded-xl">
                                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-gray-700">{stat.alert.title}</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">{stat.alert.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
