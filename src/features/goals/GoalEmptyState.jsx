"use client";
import React from 'react';
import { Leaf } from 'lucide-react';

export default function GoalEmptyState() {
    return (
        <div className="bg-white/80 rounded-2xl p-12 shadow-lg border border-white/70 text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-100/70 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100/70">
                <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">No Goals Yet</h4>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">Create your first sustainability goal to start tracking your progress.</p>
        </div>
    );
}
