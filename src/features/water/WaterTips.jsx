"use client";
import React from 'react';
import { Droplets, ShowerHead, Leaf, ArrowRight } from 'lucide-react';

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

export default function WaterTips() {
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
