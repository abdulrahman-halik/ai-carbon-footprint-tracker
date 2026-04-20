"use client";

import React from "react";
import { Zap, Plus, Activity, Lightbulb, Plug, Leaf, ArrowRight } from "lucide-react";

export function EnergyHeader({ onAdd }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 p-8 sm:p-10 text-amber-900 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-amber-200/50 blur-2xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
                        <Zap className="w-8 h-8 text-amber-700" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Energy Monitor</h1>
                        <p className="text-amber-800 mt-1.5 max-w-md text-sm sm:text-base">
                            Track electricity consumption and optimize your renewable energy usage.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-amber-800 border border-white/60">
                                <Activity className="w-3.5 h-3.5" />
                                Live monitoring
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-amber-800 border border-white/60">
                                <Zap className="w-3.5 h-3.5" />
                                Smart tracking
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onAdd}
                    className="group flex items-center gap-2 bg-white/95 text-amber-700 px-6 py-3 rounded-2xl text-sm font-bold border border-white shadow-sm hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300 self-start md:self-center"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add Reading
                </button>
            </div>
        </div>
    );
}

const tips = [
    {
        icon: Lightbulb,
        title: "Switch to LED",
        description: "LED bulbs use up to 90% less energy than incandescent bulbs and last 25x longer. The easiest switch with the biggest impact!",
        gradient: "from-amber-400 to-yellow-400",
        bg: "bg-amber-50",
        border: "border-amber-100",
        tag: "Quick Win",
        tagColor: "bg-amber-100 text-amber-700",
    },
    {
        icon: Plug,
        title: "Kill Phantom Power",
        description: "Standby electronics can account for up to 10% of your electricity bill. Use smart power strips to turn them all off at once.",
        gradient: "from-violet-400 to-purple-500",
        bg: "bg-violet-50",
        border: "border-violet-100",
        tag: "Save $$$",
        tagColor: "bg-violet-100 text-violet-700",
    },
    {
        icon: Leaf,
        title: "Go Renewable",
        description: "Consider switching to a green energy provider or installing solar panels. Many utility companies now offer 100% renewable options.",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        tag: "Eco Impact",
        tagColor: "bg-emerald-100 text-emerald-700",
    },
];

export function EnergyTips() {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg shadow-amber-200/50">
                    <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Smart Energy Tips</h3>
                    <p className="text-xs text-gray-400">Simple changes that make a big difference</p>
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

                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 group-hover:gap-2.5 transition-all duration-300">
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
