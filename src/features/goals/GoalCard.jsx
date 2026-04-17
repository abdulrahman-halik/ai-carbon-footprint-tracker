"use client";
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { GoalThermometer } from '@/features/behavior/GoalThermometer';

export default function GoalCard({ goal }) {
    return (
        <div className="glass-card flex flex-col justify-between">
            <div className="mb-4 flex items-start justify-between">
                <h3 className="font-semibold text-gray-800 text-lg">{goal.title}</h3>
                {goal.completed ? (
                    <CheckCircle2 className="text-emerald-500" size={24} />
                ) : (
                    <Circle className="text-gray-300" size={24} />
                )}
            </div>

            <GoalThermometer
                currentValue={goal.current}
                targetValue={goal.target}
                unit={goal.unit}
                title=""
            />

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                <span>{goal.completed ? "Completed" : "In Progress"}</span>
                <span className="font-medium text-gray-900">{Math.round((goal.current / goal.target) * 100)}%</span>
            </div>
        </div>
    );
}
