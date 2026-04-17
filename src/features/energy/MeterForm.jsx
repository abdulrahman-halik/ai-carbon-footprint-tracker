"use client";

import React from "react";

export default function MeterForm({ reading, onReading, date, onDate, onCancel, onSave }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700">Meter Reading (kWh)</label>
                <input
                    type="number"
                    value={reading}
                    onChange={(e) => onReading(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="e.g. 12452"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDate(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Meter Type</label>
                <select className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300">
                    <option>Electric</option>
                    <option>Solar</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
                <textarea
                    rows={3}
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="e.g. meter replaced, rooftop generation"
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600">Save Reading</button>
            </div>
        </div>
    );
}
