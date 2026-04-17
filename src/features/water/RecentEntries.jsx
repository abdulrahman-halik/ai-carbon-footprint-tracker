"use client";
import React from 'react';

export default function RecentEntries({ items }) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Entries</h4>
            {items.length === 0 ? (
                <p className="text-xs text-gray-400">No recent logs yet — your saved entries will appear here.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((l) => (
                        <li key={l.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div>
                                <div className="text-sm font-medium text-gray-800">{l.liters} L</div>
                                <div className="text-xs text-gray-500">{l.date}</div>
                            </div>
                            <div className="text-xs text-gray-500">Saved</div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 p-3 bg-sky-50 rounded-lg text-sm text-sky-700">
                Tip: Log showers, irrigation, and appliance use separately for better insights.
            </div>
        </div>
    );
}
