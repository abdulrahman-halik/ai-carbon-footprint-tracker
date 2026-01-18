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
        <div className={cn("w-full h-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center", className)}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 w-full text-left">Impact Breakdown</h3>
            <div className="relative h-56 w-full flex justify-center items-center">
                <Doughnut data={chartData} options={options} />
                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <span className="text-3xl font-bold text-gray-900">1.2t</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Total CO2</span>
                </div>
            </div>
        </div>
    );
}
