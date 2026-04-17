"use client";

import React, { useState } from "react";
import { GoalThermometer } from "@/features/behavior/GoalThermometer";
import { Plus } from "lucide-react";
import GoalCard from '@/features/goals/GoalCard';
import NewGoalModal from '@/features/goals/NewGoalModal';

export default function GoalsPage() {
    const [goals, setGoals] = useState([
        { id: 1, title: "Reduce Carbon Footprint", current: 750, target: 1000, unit: "kg", completed: false },
        { id: 2, title: "Plastic Free Week", current: 5, target: 7, unit: "days", completed: false },
        { id: 3, title: "Plant 5 Trees", current: 5, target: 5, unit: "trees", completed: true },
    ]);
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', current: '', target: '', unit: '' });

    const openNewGoal = () => setIsNewGoalOpen(true);
    const closeNewGoal = () => setIsNewGoalOpen(false);

    const handleSaveGoal = () => {
        const id = Date.now();
        const parsedCurrent = parseFloat(newGoal.current) || 0;
        const parsedTarget = parseFloat(newGoal.target) || 0;
        setGoals(prev => [
            ...prev,
            { id, title: newGoal.title || `Goal ${prev.length + 1}`, current: parsedCurrent, target: parsedTarget, unit: newGoal.unit || '', completed: parsedCurrent >= parsedTarget }
        ]);
        setNewGoal({ title: '', current: '', target: '', unit: '' });
        closeNewGoal();
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sustainability Goals</h1>
                    <p className="text-gray-500 mt-1">Track your progress towards a greener lifestyle.</p>
                </div>
                <button onClick={openNewGoal} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    <Plus size={18} />
                    New Goal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>

            <NewGoalModal isOpen={isNewGoalOpen} onClose={closeNewGoal} newGoal={newGoal} setNewGoal={setNewGoal} onSave={handleSaveGoal} />
        </div>
    );
}
