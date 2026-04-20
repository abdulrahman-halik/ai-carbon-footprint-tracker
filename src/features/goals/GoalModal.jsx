"use client";
import React from 'react';
import { Target, Type, Hash, Ruler } from 'lucide-react';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { GoalThermometer } from '@/features/behavior/GoalThermometer';

export function GoalModalHeader({ editingId, onClose }) {
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

export function GoalForm({ newGoal, setNewGoal, onSave, onClose, editingId }) {
    return (
        <div className="space-y-5">
            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Type className="w-4 h-4 text-emerald-500" />
                    Goal Title
                </label>
                <input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="e.g. Reduce Electricity Usage"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Hash className="w-4 h-4 text-emerald-500" />
                        Current
                    </label>
                    <div className="flex">
                        <input
                            value={newGoal.current}
                            onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                            type="number"
                            placeholder="0"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-gray-900 shadow-sm"
                        />
                        <span className="inline-flex items-center px-3 bg-emerald-50 border border-l-0 border-gray-200 rounded-r-xl text-xs font-medium text-emerald-600">{newGoal.unit || 'units'}</span>
                    </div>
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Target className="w-4 h-4 text-emerald-500" />
                        Target
                    </label>
                    <div className="flex">
                        <input
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            type="number"
                            placeholder="100"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-gray-900 shadow-sm"
                        />
                        <span className="inline-flex items-center px-3 bg-emerald-50 border border-l-0 border-gray-200 rounded-r-xl text-xs font-medium text-emerald-600">{newGoal.unit || 'units'}</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Ruler className="w-4 h-4 text-emerald-500" />
                    Unit
                </label>
                <input
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    placeholder="kg / days / trees"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">Units are used for display only.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium text-sm transition-colors">
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={!newGoal.title || !newGoal.target}
                    className={`px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all duration-300 ${!newGoal.title || !newGoal.target ? 'bg-emerald-300 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02]'}`}
                >
                    {editingId ? 'Update Goal' : 'Save Goal'}
                </button>
            </div>
        </div>
    );
}

export function GoalPreview({ newGoal }) {
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
