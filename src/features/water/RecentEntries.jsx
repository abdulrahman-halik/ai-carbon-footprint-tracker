"use client";
import React from 'react';
import { Edit3, Trash2, Droplets } from 'lucide-react';

export default function RecentEntries({ items, onEdit, onDelete, editingId, onCancel }) {
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
