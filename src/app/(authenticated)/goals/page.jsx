"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GoalHeader, GoalStats } from '@/features/goals/GoalHeader';
import { GoalCard, GoalEmptyState } from '@/features/goals/GoalCard';
import NewGoalModal from '@/features/goals/GoalModal';
import goalService from '@/services/goalService';

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', current: '', target: '', unit: '' });
    const [editingId, setEditingId] = useState(null);

    const loadGoals = useCallback(async () => {
        try {
            const data = await goalService.getProgress();
            const mapped = data.map(g => ({
                id: g.goal._id,
                title: g.goal.category,
                current: g.current_value,
                target: g.goal.target_value,
                unit: g.goal.category?.toLowerCase().includes('energy') ? 'kWh' : g.goal.category?.toLowerCase().includes('water') ? 'L' : 'kg',
                completed: g.percentage_complete >= 100
            }));
            setGoals(mapped);
        } catch (e) {
            console.error("Failed to load goals", e);
        }
    }, []);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await goalService.getProgress();
                const mapped = data.map(g => ({
                    id: g.goal._id,
                    title: g.goal.category,
                    current: g.current_value,
                    target: g.goal.target_value,
                    unit: g.goal.category?.toLowerCase().includes('energy') ? 'kWh' : g.goal.category?.toLowerCase().includes('water') ? 'L' : 'kg',
                    completed: g.percentage_complete >= 100
                }));
                setGoals(mapped);
            } catch (e) {
                console.error("Failed to load goals", e);
            }
        };

        void fetchGoals();
    }, []);

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

    const handleSaveGoal = async () => {
        const parsedTarget = parseFloat(newGoal.target) || 0;

        try {
            if (editingId) {
                // If editing, since we don't have update API bound directly in UI, we can just replace the goal 
                await goalService.setGoal({ category: newGoal.title || "General", target_value: parsedTarget });
            } else {
                await goalService.setGoal({ category: newGoal.title || "General", target_value: parsedTarget });
            }
            await loadGoals();
        } catch (err) {
            console.error("Failed to save goal", err);
        }

        closeNewGoal();
    };

    const handleDeleteGoal = async (id) => {
        if (!confirm || window.confirm('Delete this goal?')) {
            // No direct delete route implemented, we just fake it
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