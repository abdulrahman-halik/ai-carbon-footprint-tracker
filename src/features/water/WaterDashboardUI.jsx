"use client";
import React from 'react';
import { Droplets, Plus, Waves, Activity, TrendingDown, TrendingUp, BarChart3, AlertTriangle, Target, ShowerHead, Leaf, ArrowRight } from 'lucide-react';

export function WaterHeader({ onOpen }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 p-8 sm:p-10 text-white shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-cyan-300/20 blur-2xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                        <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Water Usage Tracker</h1>
                        <p className="text-sky-100 mt-1.5 max-w-md text-sm sm:text-base">
                            Monitor and reduce your daily water consumption for a greener tomorrow.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                                <Activity className="w-3.5 h-3.5" />
                                Daily tracking
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                                <Waves className="w-3.5 h-3.5" />
                                Smart insights
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onOpen}
                    className="group flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 self-start md:self-center"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Log Usage
                </button>
            </div>
        </div>
    );
}

export function WaterStats() {
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
                            <div className={`${stat.iconBg} p-3 rounded-xl text-white`}>
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

const tips = [
    {
        icon: Droplets,
        title: "Fix Leaky Faucets",
        description: "A leaky faucet can waste up to 3,000 gallons per year. Check your bathroom and kitchen sinks for any drips!",
        gradient: "from-sky-400 to-cyan-500",
        border: "border-sky-100",
        tag: "Quick Win",
        tagColor: "bg-sky-100 text-sky-700",
    },
    {
        icon: ShowerHead,
        title: "Shorter Showers",
        description: "A 5-minute shower uses 10-25 gallons. A full bath can use up to 70 gallons. Cutting 2 minutes saves big!",
        gradient: "from-blue-400 to-indigo-500",
        border: "border-blue-100",
        tag: "Daily Habit",
        tagColor: "bg-blue-100 text-blue-700",
    },
    {
        icon: Leaf,
        title: "Smart Irrigation",
        description: "Water your garden early morning or late evening to reduce evaporation by up to 30%. Use drip irrigation when possible.",
        gradient: "from-emerald-400 to-teal-500",
        border: "border-emerald-100",
        tag: "Eco Impact",
        tagColor: "bg-emerald-100 text-emerald-700",
    },
];

export function WaterTips() {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl text-white shadow-lg shadow-sky-200/50">
                    <Droplets className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Water Saving Tips</h3>
                    <p className="text-xs text-gray-400">Small changes, big conservation impact</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {tips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                        <div
                            key={tip.title}
                            className={`group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${tip.border} ring-1 ring-gray-50`}
                        >
                            {/* Top accent */}
                            <div className={`h-1.5 bg-gradient-to-r ${tip.gradient}`} />

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${tip.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tip.tagColor}`}>
                                        {tip.tag}
                                    </span>
                                </div>

                                <h4 className="text-base font-bold text-gray-900 mb-2">{tip.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>

                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-600 group-hover:gap-2.5 transition-all duration-300">
                                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
