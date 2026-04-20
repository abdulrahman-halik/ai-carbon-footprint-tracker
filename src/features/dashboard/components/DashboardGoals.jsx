"use client";
import React from "react";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { RingProgress } from "./DashboardCharts";

const GOALS = [
    { title: "Reduce Electricity", current: 65, target: 100, unit: "kWh", color: "#6366f1" },
    { title: "Cut Car Travel", current: 40, target: 80, unit: "km/day", color: "#10b981" },
    { title: "Water Conservation", current: 80, target: 100, unit: "L", color: "#0ea5e9" },
];

export default function DashboardGoals() {
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
            <div className="grid grid-cols-3 gap-6">
                {GOALS.map((g) => {
                    const pct = Math.round((g.current / g.target) * 100);
                    return (
                        <div key={g.title} className="flex flex-col items-center text-center gap-2">
                            <RingProgress pct={pct} size={80} stroke={7} color={g.color}>
                                <span className="text-sm font-extrabold text-gray-900">{pct}%</span>
                            </RingProgress>
                            <p className="text-xs font-semibold text-gray-700 leading-snug">{g.title}</p>
                            <p className="text-[10px] text-gray-400">{g.current}/{g.target} {g.unit}</p>
                        </div>
                    );
                })}
            </div>
            {/* Progress bars */}
            <div className="mt-5 space-y-3 pt-4 border-t border-gray-50">
                {GOALS.map((g) => {
                    const pct = Math.round((g.current / g.target) * 100);
                    return (
                        <div key={g.title}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-600">{g.title}</span>
                                <span className="font-bold text-gray-800">{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%`, backgroundColor: g.color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
