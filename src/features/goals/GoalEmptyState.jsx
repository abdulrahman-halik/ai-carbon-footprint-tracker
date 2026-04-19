"use client";
import React from 'react';
import { Leaf } from 'lucide-react';

export default function GoalEmptyState() {
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
