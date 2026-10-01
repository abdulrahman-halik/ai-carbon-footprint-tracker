"use client";

import React from "react";
import { TrendingUp, TrendingDown, Zap, Sun, DollarSign, BarChart3, Activity, Clock } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

// Register ChartJS components
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

export function StatsGrid({ stats = {} }) {
    const { dailyAvg = null, monthlyTotal = null, logCount = null } = stats;

    const statCards = [
        {
            label: "Daily Average",
            value: dailyAvg !== null ? dailyAvg.toFixed(1) : "–",
            unit: dailyAvg !== null ? "kWh" : "",
            icon: Zap,
            gradient: "from-amber-500 to-orange-500",
            ring: "ring-amber-100",
            iconBg: "bg-linear-to-br from-amber-400 to-orange-500",
        },
        {
            label: "Monthly Total",
            value: monthlyTotal !== null ? monthlyTotal.toFixed(1) : "–",
            unit: monthlyTotal !== null ? "kWh" : "",
            icon: Sun,
            gradient: "from-emerald-500 to-teal-500",
            ring: "ring-emerald-100",
            iconBg: "bg-linear-to-br from-emerald-400 to-teal-500",
        },
        {
            label: "Total Readings",
            value: logCount !== null ? String(logCount) : "–",
            unit: logCount !== null ? "entries" : "",
            icon: DollarSign,
            gradient: "from-violet-500 to-purple-500",
            ring: "ring-violet-100",
            iconBg: "bg-linear-to-br from-violet-400 to-purple-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ring-1 ${stat.ring}`}
                    >
                        {/* Decorative corner gradient */}
                        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-linear-to-br ${stat.gradient} opacity-10 blur-xl`} />

                        <div className="relative flex items-start justify-between">
                            <div className="space-y-3">
                                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{stat.value}</span>
                                    {stat.unit && <span className="text-sm font-medium text-gray-400">{stat.unit}</span>}
                                </div>
                            </div>
                            <div className={`${stat.iconBg} p-3 rounded-xl text-white shadow-lg`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function UsageChart({ data, options }) {
    const useData = data || {
        labels: [],
        datasets: [
            {
                label: "Energy Usage (kWh)",
                data: [],
                borderColor: "rgb(245, 158, 11)",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                tension: 0.4,
                fill: true,
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

    const useOptions = options || defaultOptions;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ring-1 ring-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg shadow-amber-200/50">
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
                <div className="h-75 w-full">
                    <Line data={useData} options={useOptions} />
                </div>
            </div>
        </div>
    );
}
