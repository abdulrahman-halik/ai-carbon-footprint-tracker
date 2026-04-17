"use client";

import React from "react";
import { Line } from "react-chartjs-2";

export default function UsageChart({ data, options }) {
    return (
        <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Usage Trends (Today)</h3>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-sm text-gray-600">Peak Hours</span>
                </div>
            </div>
            <div className="h-[300px] w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
