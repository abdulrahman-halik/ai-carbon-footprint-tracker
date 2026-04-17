"use client";

import React from "react";
import { Zap } from "lucide-react";

export default function EnergyHeader({ onAdd }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Zap className="text-amber-500" size={32} />
                    Energy Monitor
                </h1>
                <p className="text-gray-500 mt-1">Track your electricity consumption and renewable energy usage.</p>
            </div>
            <div className="flex gap-3">
                <button onClick={onAdd} className="bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-amber-100 hover:bg-amber-600 transition-colors">
                    Add Meter Reading
                </button>
            </div>
        </div>
    );
}
