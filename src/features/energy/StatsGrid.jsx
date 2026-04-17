"use client";

import React from "react";
import { TrendingUp, Lightbulb, Plug } from "lucide-react";

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Daily Usage</span>
                <div className="flex items-end gap-2 mt-2">
                    <span className="text-4xl font-bold text-gray-900">12.4</span>
                    <span className="text-gray-500 mb-1">kWh</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-full text-xs font-medium">
                    <TrendingUp size={14} />
                    <span>5% higher than annual avg</span>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Renewable Mix</span>
                <div className="flex items-end gap-2 mt-2">
                    <span className="text-4xl font-bold text-emerald-600">42%</span>
                    <span className="text-gray-500 mb-1">Green Energy</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
            </div>

            <div className="glass-card p-6 flex flex-col">
                <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                <div className="flex items-end gap-2 mt-2">
                    <span className="text-4xl font-bold text-gray-900">$48.20</span>
                    <span className="text-gray-500 mb-1">This Month</span>
                </div>
                <p className="text-xs text-gray-400 mt-4">Based on avg rate of $0.14/kWh</p>
            </div>
        </div>
    );
}
