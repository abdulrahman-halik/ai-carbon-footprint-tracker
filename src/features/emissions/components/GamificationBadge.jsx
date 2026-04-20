"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

/**
 * GamificationBadge — user eco-level, streak, and XP progress.
 * @param {{ level: string, icon: string, xp: number, color: string }} levelData
 * @param {number} streakDays - Mock streak (5 by default)
 */
export default function GamificationBadge({ levelData, streakDays = 5 }) {
    if (!levelData) return null;

    const { level, icon, xp, color } = levelData;

    const colorMap = {
        emerald: { bg: "from-emerald-400 to-green-600", badge: "bg-emerald-100 text-emerald-800", bar: "bg-emerald-500", ring: "ring-emerald-400" },
        green: { bg: "from-green-400 to-teal-500", badge: "bg-green-100 text-green-800", bar: "bg-green-500", ring: "ring-green-400" },
        yellow: { bg: "from-yellow-400 to-amber-500", badge: "bg-yellow-100 text-yellow-800", bar: "bg-yellow-500", ring: "ring-yellow-400" },
        orange: { bg: "from-orange-400 to-red-500", badge: "bg-orange-100 text-orange-800", bar: "bg-orange-500", ring: "ring-orange-400" },
    };

    const c = colorMap[color] || colorMap.green;

    const levels = ["Eco Beginner", "Eco Learner", "Eco Warrior", "Carbon Champion"];
    const levelIndex = levels.indexOf(level);
    const nextLevel = levels[Math.min(levelIndex + 1, levels.length - 1)];

    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <div className={`bg-gradient-to-r ${c.bg} p-5 text-white`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Your Eco Level</p>
                        <p className="text-xl font-bold">{icon} {level}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-full bg-white/20 ring-2 ${c.ring} flex items-center justify-center text-3xl`}>
                        {icon}
                    </div>
                </div>
            </div>
            <CardContent className="p-4 space-y-3">
                {/* XP Progress */}
                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>Progress to <strong>{nextLevel}</strong></span>
                        <span>{xp}/100 XP</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${c.bar} transition-all duration-700`}
                            style={{ width: `${xp}%` }}
                        />
                    </div>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <div>
                            <p className="text-xs font-semibold text-gray-800">{streakDays}-Day Low-Emission Streak!</p>
                            <p className="text-[10px] text-gray-500">Keep it going to earn bonus XP</p>
                        </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                        Active
                    </span>
                </div>

                {/* Level milestones */}
                <div className="flex justify-between gap-1 pt-1">
                    {levels.map((l, i) => (
                        <div key={l} className="flex-1 text-center">
                            <div className={`h-1.5 rounded-full mb-1 ${i <= levelIndex ? c.bar : "bg-gray-200"}`} />
                            <p className="text-[9px] text-gray-400 leading-tight">{l.split(" ")[1] || l}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
