"use client";
import React from 'react';

export default function LogForm({ liters, onLiters, date, onDate, onCancel, onSave }) {
    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Liters</label>
            <div className="flex">
                <input
                    type="number"
                    value={liters}
                    onChange={(e) => onLiters(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full px-4 py-3 rounded-l-lg border border-gray-200 focus:ring-2 focus:ring-sky-100"
                />
                <span className="inline-flex items-center px-4 bg-gray-50 border border-l-0 border-gray-200 rounded-r-lg text-sm text-gray-500">L</span>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input type="date" value={date} onChange={(e) => onDate(e.target.value)} className="mt-1 w-full px-3 py-3 border rounded-lg" />
            </div>

            <div className="flex items-center gap-3 mt-3">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button onClick={onSave} disabled={!liters} className={`px-4 py-2 rounded-lg text-white ${!liters ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'}`}>
                    Save Entry
                </button>
            </div>
        </div>
    );
}
