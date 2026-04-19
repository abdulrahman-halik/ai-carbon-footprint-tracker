"use client";
import React from 'react';
import { Edit3, Trash2, Droplets, Calendar, TrendingUp } from 'lucide-react';

export default function SavedUsageCards({ logs = [], onEdit, onDelete, editingId, onCancel }) {
    if (!logs || logs.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                    <Droplets className="w-8 h-8 text-sky-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Logs Yet</h4>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">Add your first water log to start tracking your consumption patterns.</p>
            </div>
        );
    }

    const max = Math.max(...logs.map(l => l.liters || 0), 1);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl text-white shadow-lg shadow-sky-200/50">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Saved Usage</h4>
                        <p className="text-xs text-gray-400">Your water consumption history</p>
                    </div>
                </div>
                <span className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full">{logs.length} entries</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {logs.map((l) => {
                    const pct = Math.min(100, Math.round(((l.liters || 0) / max) * 100));
                    return (
                        <div
                            key={l.id}
                            className="group relative bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ring-gray-50 overflow-hidden"
                        >
                            {/* Top gradient accent */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400" />

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-sky-200/40 group-hover:scale-110 transition-transform duration-300">
                                        <Droplets className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <div>
                                            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{l.liters}</div>
                                            <div className="text-xs font-medium text-gray-400 mt-0.5">Liters</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-sm font-bold ${pct >= 80 ? 'text-rose-500' : pct >= 50 ? 'text-sky-500' : 'text-emerald-500'}`}>{pct}%</div>
                                            <div className="text-[10px] text-gray-300">of peak</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(l.date).toLocaleDateString()}
                                    </div>

                                    {l.notes && (
                                        <div className="flex items-start gap-1.5 mt-2 bg-sky-50/50 rounded-lg p-2">
                                            <Droplets className="w-3 h-3 text-sky-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{l.notes}</p>
                                        </div>
                                    )}

                                    <div className="mt-3">
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-gradient-to-r from-rose-400 to-rose-500' : pct >= 50 ? 'bg-gradient-to-r from-sky-400 to-cyan-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-end gap-2">
                                {editingId === l.id ? (
                                    <button onClick={() => onCancel && onCancel()} className="px-4 py-1.5 rounded-xl bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                                ) : (
                                    <>
                                        <button onClick={() => onEdit && onEdit(l.id)} className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="Edit" aria-label="Edit log">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete && onDelete(l.id)} className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete" aria-label="Delete log">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
