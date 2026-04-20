"use client";

import React from "react";

export default function EmissionsBreakdownHeader({ onAddItem }) {
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Detailed Breakdown</h3>
            <div className="flex items-center gap-3">
                <button
                    onClick={onAddItem}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 hover:bg-emerald-700 transition-colors"
                >
                    Add Item
                </button>
            </div>
        </div>
    );
}
