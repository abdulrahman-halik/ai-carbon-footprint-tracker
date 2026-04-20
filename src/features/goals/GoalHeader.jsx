"use client";
import React from 'react';
import { Plus, Target, Trophy, Flame, Activity } from 'lucide-react';

<<<<<<< HEAD
export default function GoalHeader({ inProgressCount, completedCount, avgProgress, onNewGoal }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 p-8 sm:p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-green-300/20 blur-2xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sustainability Goals</h1>
                        <p className="text-emerald-100 mt-1.5 max-w-md text-sm sm:text-base">
                            Track your progress towards a greener, more sustainable lifestyle.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                                <Flame className="w-3.5 h-3.5" />
                                {inProgressCount} active
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                                <Trophy className="w-3.5 h-3.5" />
                                {completedCount} completed
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                                <Activity className="w-3.5 h-3.5" />
=======
const statsConfig = [
    { key: "total", label: "Total Goals", icon: Target, gradient: "from-emerald-200/60 to-teal-200/60", ring: "ring-emerald-100/70", iconBg: "bg-white/80 border border-emerald-100/70 text-emerald-700" },
    { key: "completed", label: "Completed", icon: Trophy, gradient: "from-amber-200/60 to-yellow-200/60", ring: "ring-amber-100/70", iconBg: "bg-white/80 border border-amber-100/70 text-amber-700" },
    { key: "avg", label: "Avg Progress", icon: Activity, gradient: "from-sky-200/60 to-cyan-200/60", ring: "ring-sky-100/70", iconBg: "bg-white/80 border border-sky-100/70 text-sky-700" },
];

export function GoalHeader({ inProgressCount, completedCount, avgProgress, onNewGoal }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-8 sm:p-10 text-gray-900 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/70 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/60 blur-2xl" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-emerald-200/50 blur-2xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/70 shadow-sm">
                        <Target className="w-8 h-8 text-emerald-700" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sustainability Goals</h1>
                        <p className="text-emerald-900/80 mt-1.5 max-w-md text-sm sm:text-base">
                            Track your progress towards a greener, more sustainable lifestyle.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-100/70 text-emerald-800">
                                <Flame className="w-3.5 h-3.5 text-emerald-700" />
                                {inProgressCount} active
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-100/70 text-emerald-800">
                                <Trophy className="w-3.5 h-3.5 text-emerald-700" />
                                {completedCount} completed
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-100/70 text-emerald-800">
                                <Activity className="w-3.5 h-3.5 text-emerald-700" />
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                                {avgProgress}% avg
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onNewGoal}
<<<<<<< HEAD
                    className="group flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 self-start md:self-center"
=======
                    className="group flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 self-start md:self-center"
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    New Goal
                </button>
            </div>
        </div>
    );
}
<<<<<<< HEAD
=======

export function GoalStats({ totalGoals, completedCount, avgProgress }) {
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
                    <div key={s.key} className={`relative overflow-hidden bg-white/80 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/70 ring-1 ${s.ring}`}>
                        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-30 blur-xl`} />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-500">{s.label}</span>
                                <div className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">{values[s.key]}</div>
                            </div>
                            <div className={`${s.iconBg} p-3 rounded-xl shadow-sm`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default GoalHeader;
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
