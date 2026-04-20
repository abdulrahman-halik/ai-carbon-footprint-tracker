"use client";
import React from "react";
import { Leaf, TrendingDown, Target } from "lucide-react";

export default function DashboardHero({ user, greeting }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 p-7 text-white shadow-xl shadow-emerald-200/40">
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-teal-300/20 blur-2xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                    <p className="text-emerald-100 text-sm font-medium mb-1">
                        {greeting}, {user?.name || "Eco Warrior"} 👋
                    </p>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Your Environmental Dashboard
                    </h1>
                    <p className="text-emerald-100 mt-1.5 max-w-lg text-sm">
                        Monitor your carbon footprint, water usage, energy consumption, and sustainability goals — all in one place.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20">
                            <Leaf className="w-3.5 h-3.5" /> Carbon: 850 kg this month
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20">
                            <TrendingDown className="w-3.5 h-3.5" /> ↓ 15% vs last month
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20">
                            <Target className="w-3.5 h-3.5" /> 3 goals in progress
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
