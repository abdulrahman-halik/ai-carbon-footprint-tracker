"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

/**
 * EmissionSparkline — weekly trend chart with optional forecast line.
 * @param {object} data      - Chart.js dataset object (actual data)
 * @param {number} forecast  - Numeric forecast value for next month
 */
export function EmissionSparkline({ data, className, forecast }) {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Forecast"];
    const actualData = data?.datasets?.[0]?.data || [25, 30, 28, 35, 32, 20, 22];
    const avgActual = actualData.reduce((a, b) => a + b, 0) / actualData.length;
    const forecastPoint = forecast ? +(forecast / 30).toFixed(1) : +(avgActual * 1.05).toFixed(1);

    const chartData = {
        labels,
        datasets: [
            {
                label: "CO₂ Emissions (kg/day)",
                data: [...actualData, null],
                borderColor: "#22C55E",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                fill: true, tension: 0.4, pointRadius: 4,
                pointBackgroundColor: "#22C55E",
                pointBorderColor: "#fff",
                pointHoverRadius: 6,
            },
            {
                label: "Forecast",
                data: [...Array(actualData.length - 1).fill(null), actualData[actualData.length - 1], forecastPoint],
                borderColor: "#F59E0B",
                backgroundColor: "rgba(245, 158, 11, 0.05)",
                borderDash: [5, 4],
                fill: false, tension: 0.3, pointRadius: [0, 0, 0, 0, 0, 0, 4, 6],
                pointBackgroundColor: "#F59E0B",
                pointBorderColor: "#fff",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1F2937", titleColor: "#F9FAFB", bodyColor: "#D1FAE5",
                displayColors: true, padding: 10,
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y !== null ? ctx.parsed.y + " kg" : "—"}`,
                },
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: "#9CA3AF", font: { size: 11 } } },
            y: {
                grid: { color: "#F3F4F6", borderDash: [4, 4] },
                ticks: { color: "#9CA3AF", font: { size: 11 } },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={cn("w-full h-full flex flex-col", className)}>
            <div className="flex-1 w-full min-h-0">
                <Line data={chartData} options={options} />
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs justify-end">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Actual</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 inline-block rounded border-dashed" /> Forecast</span>
            </div>
        </div>
    );
}
