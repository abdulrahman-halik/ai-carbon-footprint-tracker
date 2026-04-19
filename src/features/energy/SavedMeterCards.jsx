"use client";

import React, { useMemo } from "react";
import { Zap, Edit3, Trash2, FileText, Calendar, TrendingUp } from "lucide-react";

export default function SavedMeterCards({ readings = [], onEdit, onDelete, editingId, onCancel }) {
    const max = useMemo(() => {
        if (!readings || readings.length === 0) return 1;
        return Math.max(...readings.map(r => Number(r.reading) || 0), 1);
    }, [readings]);

    if (!readings || readings.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Readings Yet</h4>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">Add your first meter reading to start tracking your energy consumption patterns.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg shadow-amber-200/50">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Saved Readings</h4>
                        <p className="text-xs text-gray-400">Your consumption history</p>
                    </div>
                </div>
                <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">{readings.length} entries</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {readings.map((r, index) => {
                    const pct = Math.min(100, Math.round(((Number(r.reading) || 0) / max) * 100));
                    return (
                        <div
                            key={r.id}
                            className="group relative bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ring-gray-50 overflow-hidden"
                        >
                            {/* Top gradient accent */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400" />

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-200/40 group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <div>
                                            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{r.reading}</div>
                                            <div className="text-xs font-medium text-gray-400 mt-0.5">kWh</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-sm font-bold ${pct >= 80 ? 'text-rose-500' : pct >= 50 ? 'text-amber-500' : 'text-emerald-500'}`}>{pct}%</div>
                                            <div className="text-[10px] text-gray-300">of peak</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        {r.date}
                                    </div>

                                    {r.notes && (
                                        <div className="flex items-start gap-1.5 mt-2 bg-amber-50/50 rounded-lg p-2">
                                            <FileText className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{r.notes}</p>
                                        </div>
                                    )}

                                    <div className="mt-3">
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-gradient-to-r from-rose-400 to-rose-500' : pct >= 50 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-end gap-2">
                                {editingId === r.id ? (
                                    <button onClick={() => onCancel && onCancel()} className="px-4 py-1.5 rounded-xl bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                                ) : (
                                    <>
                                        <button onClick={() => onEdit && onEdit(r.id)} className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Edit" aria-label="Edit reading">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete && onDelete(r.id)} className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete" aria-label="Delete reading">
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
