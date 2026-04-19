"use client";
import React from 'react';
import { Plus, Target, Trophy, Flame, Activity } from 'lucide-react';

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
                                {avgProgress}% avg
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onNewGoal}
                    className="group flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 self-start md:self-center"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    New Goal
                </button>
            </div>
        </div>
    );
}
