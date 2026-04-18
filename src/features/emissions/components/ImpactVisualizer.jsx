"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * ImpactVisualizer — doughnut chart with dynamic legend from real breakdown data.
 * @param {object} data    - Chart.js dataset
 * @param {Array}  breakdown - results.breakdown from calculateCarbonFootprint()
 * @param {number} total   - totalFootprint for center label
 */
export function ImpactVisualizer({ data, breakdown, total, className }) {
    // Build dynamic legend from top-4 real breakdown items
    const top4 = breakdown
        ? [...breakdown].filter(i => i.value > 0).sort((a, b) => b.value - a.value).slice(0, 4)
        : [
            { category: "Transport", color: "#3B82F6" },
            { category: "Food", color: "#22C55E" },
            { category: "Energy", color: "#EAB308" },
            { category: "Shopping", color: "#A855F7" },
        ];

    const totalLabel = total ? `${(total / 1000).toFixed(1)}t` : "—";

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1F2937",
                padding: 10,
                callbacks: {
                    label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(1)} kg (${((ctx.parsed / (total || 1)) * 100).toFixed(1)}%)`,
                },
            },
        },
        cutout: "75%",
    };

    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center gap-4", className)}>
            <div className="relative w-44 h-44 flex justify-center items-center">
                {data?.datasets?.length ? <Doughnut data={data} options={options} /> : null}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{totalLabel}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CO₂/mo</span>
                </div>
            </div>

            {/* Dynamic legend */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {top4.map((item) => (
                    <div key={item.category} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-600 font-medium truncate max-w-[80px]">{item.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
