"use client";

import React from "react";
import { Zap, Plus, Activity } from "lucide-react";

export default function EnergyHeader({ onAdd }) {
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
