"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { RingProgress } from "./DashboardCharts";
import goalService from "@/services/goalService";

export default function DashboardGoals() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        goalService.getProgress().then(setGoals);
    }, []);

    const getColor = (category) => {
        if (category?.toLowerCase().includes("energy") || category?.toLowerCase().includes("electric")) return "#6366f1";
        if (category?.toLowerCase().includes("water")) return "#0ea5e9";
        return "#10b981";
    };

    const getUnit = (category) => {
        if (category?.toLowerCase().includes("energy") || category?.toLowerCase().includes("electric")) return "kWh";
        if (category?.toLowerCase().includes("water")) return "L";
        return "kg";
    };

    if (!goals || goals.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
                <Target className="w-8 h-8 text-gray-300 mb-3" />
                <h2 className="text-base font-bold text-gray-900 mb-1">No Active Goals</h2>
                <p className="text-xs text-gray-400 mb-4">Set some goals to start tracking your progress.</p>
                <Link href="/goals" className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors">
                    Create Goal
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 rounded-xl">
                        <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900">Sustainability Goals</h2>
                        <p className="text-xs text-gray-400">Track your active targets</p>
                    </div>
                </div>
                <Link href="/goals" className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                    All goals <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {goals.slice(0, 3).map((g) => {
                    const title = g.goal.category || "General Goal";
                    const pct = Math.round(g.percentage_complete || 0);
                    const current = Math.round(g.current_value || 0);
                    const target = Math.round(g.goal.target_value || 100);
                    const color = getColor(title);

                    return (
                        <div key={g.goal._id} className="flex flex-col items-center text-center gap-2">
                            <RingProgress pct={pct} size={80} stroke={7} color={color}>
                                <span className="text-sm font-extrabold text-gray-900">{pct}%</span>
                            </RingProgress>
                            <p className="text-xs font-semibold text-gray-700 leading-snug">{title}</p>
                            <p className="text-[10px] text-gray-400">{current}/{target} {getUnit(title)}</p>
                        </div>
                    );
                })}
            </div>
            {/* Progress bars */}
            <div className="mt-5 space-y-3 pt-4 border-t border-gray-50">
                {goals.slice(0, 3).map((g) => {
                    const title = g.goal.category || "General Goal";
                    const pct = Math.round(g.percentage_complete || 0);
                    const color = getColor(title);

                    return (
                        <div key={g.goal._id}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-600">{title}</span>
                                <span className="font-bold text-gray-800">{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
