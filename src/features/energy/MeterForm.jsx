"use client";

import React from "react";
import { Zap, Calendar, FileText, Settings } from "lucide-react";

export default function MeterForm({ reading, onReading, date, onDate, notes, onNotes, onCancel, onSave }) {
    return (
        <div className="space-y-5">
            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Meter Reading (kWh)
                </label>
                <input
                    type="number"
                    value={reading}
                    onChange={(e) => onReading(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm"
                    placeholder="e.g. 12452"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 shadow-sm"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Settings className="w-4 h-4 text-amber-500" />
                    Meter Type
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 shadow-sm appearance-none">
                    <option>Electric</option>
                    <option>Solar</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    Notes (optional)
                </label>
                <textarea
                    rows={3}
                    value={notes || ''}
                    onChange={(e) => onNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm resize-none"
                    placeholder="e.g. meter replaced, rooftop generation"
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium text-sm transition-colors">
                    Cancel
                </button>
                <button onClick={onSave} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    Save Reading
                </button>
            </div>
        </div>
    );
}
