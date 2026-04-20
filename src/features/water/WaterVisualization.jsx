"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart3, Clock } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const waterChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Water Usage (Liters)",
            data: [145, 132, 155, 120, 140, 180, 165],
            backgroundColor: (ctx) => {
                const chart = ctx.chart;
                const { ctx: c, chartArea } = chart;
                if (!chartArea) return "rgba(56, 189, 248, 0.6)";
                const gradient = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, "rgba(56, 189, 248, 0.2)");
                gradient.addColorStop(1, "rgba(14, 165, 233, 0.7)");
                return gradient;
            },
            borderColor: "rgb(14, 165, 233)",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
            hoverBackgroundColor: "rgba(14, 165, 233, 0.85)",
        },
    ],
};

export const waterChartOptions = {
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
                label: (ctx) => `${ctx.parsed.y} Liters`,
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

export function WaterChart() {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ring-1 ring-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl text-white shadow-lg shadow-sky-200/50">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Consumption</h3>
                            <p className="text-xs text-gray-400">Daily water usage breakdown</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                            <span className="text-xs font-medium text-sky-700">Avg: 148L / day</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            This week
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 sm:p-8">
                <div className="h-[300px] w-full">
                    <Bar data={waterChartData} options={waterChartOptions} />
                </div>
            </div>
        </div>
    );
}

export function Sparkline({ logs = [] }) {
    if (!logs || logs.length < 2) return null;
    const max = Math.max(...logs.map(l => l.liters || 0), 1);
    const width = Math.max(80, logs.length * 12);
    return (
        <svg className="w-full h-12" viewBox={`0 0 ${width} 40`} preserveAspectRatio="none">
            {logs.map((l, i) => {
                const h = Math.min(36, ((l.liters || 0) / max) * 36 || 4);
                return (
                    <rect key={l.id} x={i * 12 + 2} y={40 - h - 2} width={8} height={h} rx={2} fill="#38bdf8" opacity={0.9} />
                );
            })}
        </svg>
    );
}
