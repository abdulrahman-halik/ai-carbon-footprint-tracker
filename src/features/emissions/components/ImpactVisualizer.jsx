"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import { DEFAULT_IMPACT_DATA } from "@/lib/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ImpactVisualizer({ data, className }) {
    const chartData = data || DEFAULT_IMPACT_DATA;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Disable default legend
            },
            tooltip: {
                backgroundColor: "#1F2937",
                padding: 12,
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.parsed}%`
                }
            }
        },
        cutout: "75%",
    };

    const legendItems = [
        { label: "Transport", color: "#3B82F6" }, // Blue
        { label: "Diet", color: "#22C55E" },      // Green
        { label: "Energy", color: "#EAB308" },    // Yellow
        { label: "Shopping", color: "#A855F7" },   // Purple
    ];

    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center gap-6", className)}>
            <div className="relative w-48 h-48 flex justify-center items-center">
                <Doughnut data={chartData} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                    <span className="text-3xl font-extrabold text-gray-900 tracking-tight">1.2t</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total CO2</span>
                </div>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {legendItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
