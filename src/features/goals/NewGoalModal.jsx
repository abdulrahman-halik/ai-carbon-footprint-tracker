"use client";
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { GoalThermometer } from '@/features/behavior/GoalThermometer';

export default function NewGoalModal({ isOpen, onClose, newGoal, setNewGoal, onSave }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl">
                <div className="bg-gradient-to-r from-emerald-50 to-white rounded-t-2xl p-4">
                    <ModalHeader className="p-0">
                        <ModalTitle className="text-2xl">Create New Goal</ModalTitle>
                        <p className="text-sm text-gray-500 mt-1">Add a goal and preview progress before saving.</p>
                    </ModalHeader>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Title</label>
                            <input
                                value={newGoal.title}
                                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                                placeholder="e.g. Reduce Electricity Usage"
                                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Current</label>
                                <div className="mt-1 flex">
                                    <input
                                        value={newGoal.current}
                                        onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                                        type="number"
                                        placeholder="0"
                                        className="w-full px-3 py-2 border rounded-l-lg"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-lg bg-gray-50 border border-l-0 text-sm text-gray-500">{newGoal.unit || 'units'}</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Target</label>
                                <div className="mt-1 flex">
                                    <input
                                        value={newGoal.target}
                                        onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                                        type="number"
                                        placeholder="100"
                                        className="w-full px-3 py-2 border rounded-l-lg"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-lg bg-gray-50 border border-l-0 text-sm text-gray-500">{newGoal.unit || 'units'}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Unit</label>
                            <input
                                value={newGoal.unit}
                                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                                placeholder="kg / days / trees"
                                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">Units are used for display only.</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Preview</h4>
                        <div className="mb-3">
                            <GoalThermometer
                                currentValue={Number(newGoal.current) || 0}
                                targetValue={Number(newGoal.target) || 100}
                                unit={newGoal.unit || ''}
                                title={newGoal.title || 'Preview Goal'}
                                description="Live preview of progress"
                            />
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            Progress: <span className="font-semibold text-gray-900">{Math.min(100, Math.round(((Number(newGoal.current) || 0) / (Number(newGoal.target) || 1)) * 100))}%</span>
                        </div>
                    </div>
                </div>

                <ModalFooter>
                    <button onClick={onClose} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                    <button
                        onClick={onSave}
                        disabled={!newGoal.title || !newGoal.target}
                        className={`px-4 py-2 rounded-xl text-white transition-colors ${!newGoal.title || !newGoal.target ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                        Save Goal
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
