"use client";
import React from 'react';
import { Target, Trophy, Activity } from 'lucide-react';

const statsConfig = [
    { key: "total", label: "Total Goals", icon: Target, gradient: "from-emerald-400 to-teal-500", ring: "ring-emerald-100", iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500" },
    { key: "completed", label: "Completed", icon: Trophy, gradient: "from-amber-400 to-yellow-500", ring: "ring-amber-100", iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500" },
    { key: "avg", label: "Avg Progress", icon: Activity, gradient: "from-violet-400 to-purple-500", ring: "ring-violet-100", iconBg: "bg-gradient-to-br from-violet-400 to-purple-500" },
];

export default function GoalStats({ totalGoals, completedCount, avgProgress }) {
    const values = {
        total: totalGoals,
        completed: completedCount,
        avg: `${avgProgress}%`,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {statsConfig.map((s) => {
                const Icon = s.icon;
                return (
                    <div key={s.key} className={`relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ${s.ring}`}>
                        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 blur-xl`} />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-500">{s.label}</span>
                                <div className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">{values[s.key]}</div>
                            </div>
                            <div className={`${s.iconBg} p-3 rounded-xl text-white shadow-lg`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
