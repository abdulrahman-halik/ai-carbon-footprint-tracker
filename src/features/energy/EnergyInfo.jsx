"use client";

import React, { useState } from "react";
import { Zap, Plus, Activity, Lightbulb, Plug, Leaf, ArrowRight } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';

export function EnergyHeader({ onAdd }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-100 via-orange-100 to-yellow-100 p-8 sm:p-10 text-amber-900 shadow-2xl">
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
        details: "Switching to LED lighting is one of the quickest and easiest ways to reduce your energy bill.\n\nKey benefits:\n- Energy Efficiency: LEDs use up to 90% less energy than traditional incandescent bulbs, drastically cutting down on electricity usage.\n- Longevity: A single LED bulb can last up to 25 times longer than an incandescent one, meaning you'll buy fewer bulbs over time.\n- Environmental Impact: Less energy consumption directly translates to a lower carbon footprint, and because they last longer, LEDs reduce waste in landfills.",
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
        details: "Phantom power, also known as vampire power, refers to the energy drawn by electronic devices even when they are turned off but still plugged in.\n\nHow to stop it:\n- Identify Culprits: TVs, computers, gaming consoles, and kitchen appliances are major contributors to phantom power.\n- Smart Power Strips: Invest in smart power strips that automatically cut power to devices when they are not in use.\n- Unplug: Simply unplugging chargers and devices when they are fully charged or not in use can save up to 10% on your monthly electricity bill.",
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
        details: "Transitioning to renewable energy sources is one of the most impactful steps you can take toward a sustainable lifestyle.\n\nSteps to take:\n- Green Providers: Contact your local utility company to see if they offer an opt-in program for 100% wind or solar energy. It's often a simple switch.\n- Solar Panels: If you own your home, consider installing solar panels. While the initial investment is significant, federal and state tax credits, along with long-term energy savings, make it highly cost-effective over time.\n- Community Solar: If you can't install panels, look into community solar programs where you can subscribe to a shared local solar farm.",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        tag: "Eco Impact",
        tagColor: "bg-emerald-100 text-emerald-700",
    },
];

export function EnergyTips() {
    const [activeTip, setActiveTip] = useState(null);

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg shadow-amber-200/50">
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
                            <div className={`h-1.5 bg-linear-to-r ${tip.gradient}`} />

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-linear-to-br ${tip.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tip.tagColor}`}>
                                        {tip.tag}
                                    </span>
                                </div>

                                <h4 className="text-base font-bold text-gray-900 mb-2">{tip.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>

                                <button
                                    onClick={() => setActiveTip(tip)}
                                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 group-hover:gap-2.5 transition-all duration-300 focus:outline-none cursor-pointer"
                                >
                                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={!!activeTip} onClose={() => setActiveTip(null)}>
                <ModalContent className="max-w-xl">
                    {activeTip && (
                        <>
                            <ModalHeader>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl bg-linear-to-br ${activeTip.gradient} text-white shadow-lg`}>
                                        <activeTip.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${activeTip.tagColor}`}>
                                            {activeTip.tag}
                                        </div>
                                        <ModalTitle className="text-xl sm:text-2xl">{activeTip.title}</ModalTitle>
                                    </div>
                                </div>
                            </ModalHeader>
                            <div className="p-6 pt-2 overflow-y-auto max-h-[60vh]">
                                <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap">
                                    {activeTip.details}
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
