"use client";
import React from 'react';
import { Modal, ModalContent } from '@/components/ui/Modal';
import GoalModalHeader from '@/features/goals/GoalModalHeader';
import GoalForm from '@/features/goals/GoalForm';
import GoalPreview from '@/features/goals/GoalPreview';

export default function NewGoalModal({ isOpen, onClose, newGoal, setNewGoal, onSave, editingId }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                <GoalModalHeader editingId={editingId} onClose={onClose} />

                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50">
                    <GoalForm newGoal={newGoal} setNewGoal={setNewGoal} onSave={onSave} onClose={onClose} editingId={editingId} />
                    <GoalPreview newGoal={newGoal} />
                </div>
            </ModalContent>
        </Modal>
    );
}
