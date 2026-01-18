"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import { DEFAULT_SPARKLINE_DATA } from "@/lib/constants";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

export function EmissionSparkline({ data, className }) {
    // Default dummy data if none provided
    const chartData = data || DEFAULT_SPARKLINE_DATA;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#1F2937", // Gray-900
                titleColor: "#F9FAFB",
                bodyColor: "#F9FAFB",
                displayColors: false,
                padding: 12,
                callbacks: {
                    label: (context) => `${context.parsed.y} kg CO2`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#9CA3AF", // Gray-400
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "#F3F4F6", // Gray-100/200 for subtle grid
                    borderDash: [5, 5],
                },
                ticks: {
                    color: "#9CA3AF",
                    font: {
                        size: 12,
                    },
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={cn("glass-card border-none w-full h-80 flex flex-col", className)}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Weekly Trends</h3>
                    <p className="text-sm text-gray-500">Your carbon footprint over time</p>
                </div>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center border border-green-200">
                    ↓ 12% vs last week
                </span>
            </div>
            <div className="flex-1 w-full min-h-0">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
