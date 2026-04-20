"use client";
import React from 'react';
import { Target } from 'lucide-react';

export default function GoalModalHeader({ editingId, onClose }) {
    return (
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-t-2xl p-6 text-white overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{editingId ? 'Edit Goal' : 'Create New Goal'}</h3>
                        <p className="text-emerald-100 text-sm mt-0.5">Set a target and track your progress</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
