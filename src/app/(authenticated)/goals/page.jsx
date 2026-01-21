"use client";

import { GoalThermometer } from "@/features/behavior/GoalThermometer";
import { Plus, CheckCircle2, Circle } from "lucide-react";

export default function GoalsPage() {
    const goals = [
        { id: 1, title: "Reduce Carbon Footprint", current: 750, target: 1000, unit: "kg", completed: false },
        { id: 2, title: "Plastic Free Week", current: 5, target: 7, unit: "days", completed: false },
        { id: 3, title: "Plant 5 Trees", current: 5, target: 5, unit: "trees", completed: true },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sustainability Goals</h1>
                    <p className="text-gray-500 mt-1">Track your progress towards a greener lifestyle.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    <Plus size={18} />
                    New Goal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                    <div key={goal.id} className="glass-card flex flex-col justify-between">
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
                ))}
            </div>
        </div>
    );
}
