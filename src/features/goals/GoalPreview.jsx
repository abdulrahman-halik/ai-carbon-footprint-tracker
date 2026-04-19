"use client";
import React from 'react';
import { Target } from 'lucide-react';
import { GoalThermometer } from '@/features/behavior/GoalThermometer';

export default function GoalPreview({ newGoal }) {
    const currentVal = Number(newGoal.current) || 0;
    const targetVal = Number(newGoal.target) || 0;
    const previewPct = Math.min(100, Math.round((currentVal / (targetVal || 1)) * 100));

    return (
        <div className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm ring-1 ring-gray-50">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
                    <Target className="w-4 h-4 text-emerald-500" />
                    Live Preview
                </h4>
                <GoalThermometer
                    currentValue={currentVal}
                    targetValue={targetVal || 100}
                    unit={newGoal.unit || ''}
                    title={newGoal.title || 'Preview Goal'}
                    description="Live preview of progress"
                />
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                <div className="relative">
                    <div className="text-emerald-100 text-xs font-medium uppercase tracking-wider">Progress</div>
                    <div className="text-4xl font-extrabold mt-1 tracking-tight">{previewPct}%</div>
                    <div className="text-emerald-200 text-sm mt-1">
                        {currentVal} / {targetVal} {newGoal.unit}
                    </div>
                    <div className="mt-3 w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <div className="h-2 bg-white rounded-full transition-all duration-700" style={{ width: `${previewPct}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
