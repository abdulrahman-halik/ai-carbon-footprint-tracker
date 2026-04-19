"use client";
import React from 'react';
import { Droplets, Calendar } from 'lucide-react';

export default function LogForm({ liters, onLiters, date, onDate, onCancel, onSave }) {
    return (
        <div className="space-y-5">
            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Droplets className="w-4 h-4 text-sky-500" />
                    Water Usage (Liters)
                </label>
                <div className="flex">
                    <input
                        type="number"
                        value={liters}
                        onChange={(e) => onLiters(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-gray-900 placeholder-gray-300 shadow-sm"
                    />
                    <span className="inline-flex items-center px-4 bg-sky-50 border border-l-0 border-gray-200 rounded-r-xl text-sm font-medium text-sky-600">L</span>
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-sky-500" />
                    Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-gray-900 shadow-sm"
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium text-sm transition-colors">
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={!liters}
                    className={`px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all duration-300 ${!liters ? 'bg-sky-300 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-sky-500 to-cyan-500 shadow-sky-200/50 hover:shadow-xl hover:scale-[1.02]'}`}
                >
                    Save Entry
                </button>
            </div>
        </div>
    );
}
