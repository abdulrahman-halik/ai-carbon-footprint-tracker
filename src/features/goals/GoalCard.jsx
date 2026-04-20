"use client";
import React from 'react';
<<<<<<< HEAD
import { CheckCircle2, Circle, Edit3, Trash2, Target, Flame, Trophy } from 'lucide-react';
=======
import { CheckCircle2, Circle, Edit3, Trash2, Target, Flame, Trophy, Leaf } from 'lucide-react';

export function GoalEmptyState() {
    return (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">No Goals Yet</h4>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">Create your first sustainability goal to start tracking your progress.</p>
        </div>
    );
}
>>>>>>> origin/main

export default function GoalCard({ goal, onEdit, onDelete }) {
    const percentage = goal.target ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
    const isComplete = goal.completed || percentage >= 100;
    const barColor = isComplete
<<<<<<< HEAD
        ? 'bg-emerald-500'
        : percentage >= 60
            ? 'bg-emerald-500'
            : percentage >= 30
                ? 'bg-amber-500'
                : 'bg-rose-500';

    return (
        <div className="group relative bg-white/85 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/70 ring-1 ring-emerald-50/70 overflow-hidden">
            {/* Top accent */}
            <div className={`h-0.5 ${isComplete ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300' : 'bg-gradient-to-r from-emerald-200 via-teal-200 to-sky-200'}`} />
=======
        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
        : percentage >= 60
            ? 'bg-gradient-to-r from-emerald-400 to-green-500'
            : percentage >= 30
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                : 'bg-gradient-to-r from-rose-400 to-pink-500';

    return (
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ring-gray-50 overflow-hidden">
            {/* Top accent */}
            <div className={`h-1.5 ${isComplete ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400' : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400'}`} />
>>>>>>> origin/main

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
<<<<<<< HEAD
                        <div className={`p-2.5 rounded-xl shadow-sm flex-shrink-0 ${isComplete ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            {isComplete ? <Trophy className="w-5 h-5 text-emerald-700" /> : <Target className="w-5 h-5 text-gray-500" />}
=======
                        <div className={`p-2.5 rounded-xl shadow-lg flex-shrink-0 ${isComplete ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                            {isComplete ? <Trophy className="w-5 h-5 text-white" /> : <Target className="w-5 h-5 text-gray-500" />}
>>>>>>> origin/main
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 text-base truncate">{goal.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                {isComplete ? (
<<<<<<< HEAD
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-100/70">
                                        <CheckCircle2 className="w-3 h-3" /> Completed
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-100/70">
=======
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" /> Completed
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
>>>>>>> origin/main
                                        <Flame className="w-3 h-3" /> In Progress
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`text-2xl font-extrabold tracking-tight ${isComplete ? 'text-emerald-500' : percentage >= 60 ? 'text-emerald-600' : percentage >= 30 ? 'text-amber-500' : 'text-rose-500'}`}>
                        {percentage}%
                    </div>
                </div>

                {/* Progress values */}
                <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-gray-500">
                        <span className="text-lg font-extrabold text-gray-900">{goal.current}</span> / {goal.target} <span className="text-xs uppercase text-gray-400">{goal.unit}</span>
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{goal.target - goal.current > 0 ? `${goal.target - goal.current} ${goal.unit} left` : 'Done!'}</span>
                </div>

                {/* Progress bar */}
<<<<<<< HEAD
                <div className="relative h-2 w-full bg-emerald-50 rounded-full overflow-hidden shadow-inner mb-5">
=======
                <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner mb-5">
>>>>>>> origin/main
                    <div
                        className={`absolute top-0 left-0 h-full ${barColor} rounded-full shadow-lg transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                    >
<<<<<<< HEAD
                        {!isComplete && <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full" />}
=======
                        {!isComplete && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />}
>>>>>>> origin/main
                    </div>
                </div>

                {/* Actions */}
<<<<<<< HEAD
                <div className="pt-4 border-t border-emerald-50/80 flex items-center justify-end gap-2">
                    <button onClick={onEdit} aria-label="Edit goal" className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-white/80 text-gray-500 border border-gray-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} aria-label="Delete goal" className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-white/80 text-gray-400 border border-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors">
=======
                <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-2">
                    <button onClick={onEdit} aria-label="Edit goal" className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} aria-label="Delete goal" className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
>>>>>>> origin/main
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
