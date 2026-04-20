"use client";
import React from 'react';
import { Edit3, Trash2, Droplets, Calendar, TrendingUp } from 'lucide-react';

export function SavedUsageCards({ logs = [], onEdit, onDelete, editingId, onCancel }) {
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

export function RecentEntries({ items, onEdit, onDelete, editingId, onCancel }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm ring-1 ring-gray-50">
            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Droplets className="w-4 h-4 text-sky-500" />
                Recent Entries
            </h4>
            {items.length === 0 ? (
                <div className="text-center py-6">
                    <div className="w-10 h-10 mx-auto bg-sky-50 rounded-xl flex items-center justify-center mb-2">
                        <Droplets className="w-5 h-5 text-sky-300" />
                    </div>
                    <p className="text-xs text-gray-400">No recent logs yet — your entries will appear here.</p>
                </div>
            ) : (
                <ul className="space-y-2.5 max-h-56 overflow-auto pr-1">
                    {items.map((l) => (
                        <li key={l.id} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-sky-50/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">{l.liters} <span className="text-xs font-normal text-gray-400">L</span></div>
                                    <div className="text-[11px] text-gray-400">{l.date}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {editingId === l.id ? (
                                    <button onClick={() => onCancel && onCancel()} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium transition-colors">Cancel</button>
                                ) : (
                                    <>
                                        <button onClick={() => onEdit && onEdit(l.id)} className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-gray-400 hover:bg-sky-100 hover:text-sky-600 transition-colors opacity-0 group-hover:opacity-100" aria-label="Edit">
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => onDelete && onDelete(l.id)} className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" aria-label="Delete">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 p-3 bg-sky-50/60 rounded-xl border border-sky-100/50">
                <p className="text-xs text-sky-600 font-medium">💡 Tip: Log showers, irrigation, and appliance use separately for better insights.</p>
            </div>
        </div>
    );
}
