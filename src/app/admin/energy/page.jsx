"use client";

import { useState, useEffect } from "react";
import {
    Zap,
    TrendingUp,
    RefreshCw,
    Loader2,
    Users,
    Lightbulb,
} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import adminService from "@/services/adminService";
import { toast } from "react-hot-toast";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function AdminEnergyPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await adminService.getEnergyAnalytics();
            setData(res);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load energy analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                <Loader2 size={36} className="animate-spin text-amber-500 mb-3" />
                <p className="text-sm font-bold">Computing energy consumption metrics across users...</p>
            </div>
        );
    }

    const comparisonList = data?.all_users_comparison || [];
    const highestConsumers = data?.highest_consumers || [];
    const energyTypes = data?.energy_type_distribution || [];

    const barChartData = {
        labels: comparisonList.slice(0, 10).map((u) => u.name || "User"),
        datasets: [
            {
                label: "Energy Consumption (kWh)",
                data: comparisonList.slice(0, 10).map((u) => u.total_energy),
                backgroundColor: "#F59E0B",
                borderRadius: 8,
                hoverBackgroundColor: "#D97706",
            },
        ],
    };

    const donutData = {
        labels: energyTypes.map((t) => t.type),
        datasets: [
            {
                data: energyTypes.map((t) => t.total),
                backgroundColor: ["#F59E0B", "#10B981", "#3B82F6", "#64748B"],
                borderColor: "#FFFFFF",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Electricity & Energy Usage
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor power consumption (kWh) per user and energy type distribution.
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                    <RefreshCw size={14} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Platform Total Power</span>
                        <Zap size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.platform_total_energy?.toLocaleString() || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">kWh</span>
                    </p>
                    <p className="text-xs text-amber-600 mt-1 font-medium">Recorded electricity consumption</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Accounts Logging Energy</span>
                        <Users size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {comparisonList.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Users actively tracking power meters</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Peak Consumer</span>
                        <TrendingUp size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {highestConsumers[0]?.total_energy || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">kWh</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        Account: <span className="font-semibold text-gray-800">{highestConsumers[0]?.name || "N/A"}</span>
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <h2 className="text-base font-bold text-gray-900 mb-1">
                        Electricity Consumption by User
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">Total kilowatt-hours (kWh) consumed per account</p>
                    <div className="h-72">
                        {comparisonList.length > 0 ? (
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: "#F1F5F9" } },
                                        x: { grid: { display: false } },
                                    },
                                }}
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center text-xs text-gray-400 italic">
                                No electricity consumption data logged.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs flex flex-col">
                    <h2 className="text-base font-bold text-gray-900 mb-1">
                        Energy Sources
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">Breakdown by power category</p>
                    <div className="h-56 relative flex items-center justify-center my-auto">
                        {energyTypes.length > 0 ? (
                            <Doughnut
                                data={donutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } },
                                }}
                            />
                        ) : (
                            <p className="text-xs text-gray-400 italic">No energy type records available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* User Electricity Table */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                        Electricity Usage Table
                    </h2>
                    <p className="text-xs text-gray-500">Detailed list of user electrical consumption totals</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-6">Rank</th>
                                <th className="py-3 px-6">User</th>
                                <th className="py-3 px-6">Total Power Logged</th>
                                <th className="py-3 px-6">Meter Logs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                            {comparisonList.map((user, idx) => (
                                <tr key={user.user_id} className="hover:bg-gray-50/60">
                                    <td className="py-3.5 px-6 font-bold text-gray-500">
                                        #{idx + 1}
                                    </td>
                                    <td className="py-3.5 px-6 font-bold text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="py-3.5 px-6">
                                        <span className="font-extrabold text-amber-700 text-sm">
                                            {user.total_energy} kWh
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-6 text-gray-500">{user.logs_count} entries</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
