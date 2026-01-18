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
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: "#4B5563", // Gray-600
                    font: {
                        size: 12,
                    }
                },
            },
            tooltip: {
                backgroundColor: "#1F2937",
                padding: 12,
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.parsed}%`
                }
            }
        },
        cutout: "70%", // Thinner doughnut
    };

    return (
        <div className={cn("glass-card border-none w-full h-80 flex flex-col items-center", className)}>
            <div className="w-full mb-2">
                <h3 className="text-lg font-bold text-gray-800 text-left">Impact Breakdown</h3>
                <p className="text-sm text-gray-500 text-left">Where your emissions come from</p>
            </div>
            <div className="relative flex-1 w-full flex justify-center items-center min-h-0">
                <Doughnut data={chartData} options={options} />
                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">1.2t</span>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Total CO2</span>
                </div>
            </div>
        </div>
    );
}
