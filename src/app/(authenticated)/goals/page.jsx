"use client";

import React, { useState } from "react";
import { GoalHeader, GoalStats } from '@/features/goals/GoalHeader';
import { GoalCard, GoalEmptyState } from '@/features/goals/GoalCard';
import NewGoalModal from '@/features/goals/GoalModal';

export default function GoalsPage() {
    const [goals, setGoals] = useState([
        { id: 1, title: "Reduce Carbon Footprint", current: 750, target: 1000, unit: "kg", completed: false },
        { id: 2, title: "Plastic Free Week", current: 5, target: 7, unit: "days", completed: false },
        { id: 3, title: "Plant 5 Trees", current: 5, target: 5, unit: "trees", completed: true },
    ]);
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', current: '', target: '', unit: '' });
    const [editingId, setEditingId] = useState(null);

    const openNewGoal = () => {
        setEditingId(null);
        setNewGoal({ title: '', current: '', target: '', unit: '' });
        setIsNewGoalOpen(true);
    };

    const closeNewGoal = () => {
        setIsNewGoalOpen(false);
        setEditingId(null);
        setNewGoal({ title: '', current: '', target: '', unit: '' });
    };

    const openEditGoal = (goal) => {
        setEditingId(goal.id);
        setNewGoal({ title: goal.title || '', current: String(goal.current || ''), target: String(goal.target || ''), unit: goal.unit || '' });
        setIsNewGoalOpen(true);
    };

    const handleSaveGoal = () => {
        const parsedCurrent = parseFloat(newGoal.current) || 0;
        const parsedTarget = parseFloat(newGoal.target) || 0;

        if (editingId) {
            setGoals(prev => prev.map(g => g.id === editingId ? { ...g, title: newGoal.title || g.title, current: parsedCurrent, target: parsedTarget, unit: newGoal.unit || g.unit, completed: parsedCurrent >= parsedTarget } : g));
        } else {
            const id = Date.now();
            setGoals(prev => [
                ...prev,
                { id, title: newGoal.title || `Goal ${prev.length + 1}`, current: parsedCurrent, target: parsedTarget, unit: newGoal.unit || '', completed: parsedCurrent >= parsedTarget }
            ]);
        }

        closeNewGoal();
    };

    const handleDeleteGoal = (id) => {
        if (!confirm || window.confirm('Delete this goal?')) {
            setGoals(prev => prev.filter(g => g.id !== id));
        }
    };

    const completedCount = goals.filter(g => g.completed).length;
    const inProgressCount = goals.filter(g => !g.completed).length;
    const avgProgress = goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + Math.min(100, Math.round((g.current / (g.target || 1)) * 100)), 0) / goals.length) : 0;

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <GoalHeader inProgressCount={inProgressCount} completedCount={completedCount} avgProgress={avgProgress} onNewGoal={openNewGoal} />

            <GoalStats totalGoals={goals.length} completedCount={completedCount} avgProgress={avgProgress} />

            {goals.length === 0 ? (
                <GoalEmptyState />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} onEdit={() => openEditGoal(goal)} onDelete={() => handleDeleteGoal(goal.id)} />
                    ))}
                </div>
            )}

            <NewGoalModal isOpen={isNewGoalOpen} onClose={closeNewGoal} newGoal={newGoal} setNewGoal={setNewGoal} onSave={handleSaveGoal} editingId={editingId} />
        </div>
    );
}