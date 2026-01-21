"use client";

import { Zap, TrendingUp, Lightbulb, Plug } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

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

export default function EnergyPage() {
    const data = {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        datasets: [
            {
                label: "Energy Usage (kWh)",
                data: [0.5, 0.4, 1.2, 1.8, 1.5, 2.4, 1.1],
                borderColor: "rgb(245, 158, 11)", // Amber-500
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgb(245, 158, 11)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Zap className="text-amber-500" size={32} />
                        Energy Monitor
                    </h1>
                    <p className="text-gray-500 mt-1">Track your electricity consumption and renewable energy usage.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-amber-100 hover:bg-amber-600 transition-colors">
                        Add Meter Reading
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col">
                    <span className="text-gray-500 text-sm font-medium">Daily Usage</span>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-4xl font-bold text-gray-900">12.4</span>
                        <span className="text-gray-500 mb-1">kWh</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-full text-xs font-medium">
                        <TrendingUp size={14} />
                        <span>5% higher than annual avg</span>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col">
                    <span className="text-gray-500 text-sm font-medium">Renewable Mix</span>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-4xl font-bold text-emerald-600">42%</span>
                        <span className="text-gray-500 mb-1">Green Energy</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col">
                    <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-4xl font-bold text-gray-900">$48.20</span>
                        <span className="text-gray-500 mb-1">This Month</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">Based on avg rate of $0.14/kWh</p>
                </div>
            </div>

            {/* Main Chart */}
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

            {/* Insights & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-0 overflow-hidden flex flex-col">
                    <div className="p-6 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg text-amber-500 shadow-sm">
                            <Lightbulb size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900">Energy Saving Tip</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Switching to LED bulbs can use up to <strong>90% less energy</strong> than traditional incandescent bulbs and last up to 25 times longer. It's the easiest switch with the biggest impact!
                        </p>
                    </div>
                </div>

                <div className="glass-card p-0 overflow-hidden flex flex-col">
                    <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg text-gray-700 shadow-sm">
                            <Plug size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900">Phantom Power</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Electronics plugged in but not in use (TVs, chargers, computers) can account for up to <strong>10%</strong> of your monthly electricity bill. Use power strips to turn them all off at once.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
