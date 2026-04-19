"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Activity, Clock, Zap } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function UsageChart({ data, options }) {
    const defaultData = {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        datasets: [
            {
                label: "Energy Usage (kWh)",
                data: [0.5, 0.4, 1.2, 1.8, 1.5, 2.4, 1.1],
                borderColor: "rgb(245, 158, 11)",
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(245, 158, 11, 0.3)");
                    gradient.addColorStop(1, "rgba(245, 158, 11, 0.02)");
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#fff",
                pointBorderColor: "rgb(245, 158, 11)",
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8,
                borderWidth: 3,
            },
        ],
    };

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                backgroundColor: "rgba(17, 24, 39, 0.9)",
                titleFont: { size: 13, weight: "bold" },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
                callbacks: {
                    label: (ctx) => `${ctx.parsed.y} kWh`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "rgba(0, 0, 0, 0.04)", drawBorder: false },
                ticks: { color: "#9ca3af", font: { size: 11 }, padding: 8 },
                border: { display: false },
            },
            x: {
                grid: { display: false },
                ticks: { color: "#9ca3af", font: { size: 11 }, padding: 8 },
                border: { display: false },
            },
        },
    };

    const useData = data || defaultData;
    const useOptions = options || defaultOptions;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ring-1 ring-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg shadow-amber-200/50">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Usage Trends</h3>
                            <p className="text-xs text-gray-400">Today&apos;s real-time consumption</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-xs font-medium text-amber-700">Peak: 2.4 kWh</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            Updated now
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 sm:p-8">
                <div className="h-[300px] w-full">
                    <Line data={useData} options={useOptions} />
                </div>
            </div>
        </div>
    );
}
