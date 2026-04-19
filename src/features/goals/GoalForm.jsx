"use client";
import React from 'react';
import { Target, Type, Hash, Ruler } from 'lucide-react';

export default function GoalForm({ newGoal, setNewGoal, onSave, onClose, editingId }) {
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
