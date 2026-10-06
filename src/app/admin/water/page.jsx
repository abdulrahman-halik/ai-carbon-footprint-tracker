"use client";

import { useState, useEffect } from "react";
import {
    Droplets,
    TrendingUp,
    RefreshCw,
    Loader2,
    Users,
    Waves,
} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import adminService from "@/services/adminService";
import { toast } from "react-hot-toast";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminWaterPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await adminService.getWaterAnalytics();
            setData(res);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load water analytics");
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
                <Loader2 size={36} className="animate-spin text-blue-600 mb-3" />
                <p className="text-sm font-bold">Computing water consumption metrics across users...</p>
            </div>
        );
    }

    const comparisonList = data?.all_users_comparison || [];
    const highestConsumers = data?.highest_consumers || [];

    const chartData = {
        labels: comparisonList.slice(0, 10).map((u) => u.name || "User"),
        datasets: [
            {
                label: "Water Consumption (Liters)",
                data: comparisonList.slice(0, 10).map((u) => u.total_water),
                backgroundColor: "#3B82F6",
                borderRadius: 8,
                hoverBackgroundColor: "#2563EB",
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Water Usage Analytics
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track water consumption metrics across accounts and monitor high-usage trends.
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
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Platform Total Water</span>
                        <Waves size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.platform_total_water?.toLocaleString() || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">Liters</span>
                    </p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Logged across all user water meters</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Users Logging Water</span>
                        <Users size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {comparisonList.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Contributors to water tracking</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Highest Water Consumer</span>
                        <TrendingUp size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {highestConsumers[0]?.total_water || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">Liters</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        User: <span className="font-semibold text-gray-800">{highestConsumers[0]?.name || "N/A"}</span>
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <h2 className="text-base font-bold text-gray-900 mb-1">
                    Water Consumption by User
                </h2>
                <p className="text-xs text-gray-500 mb-6">Comparison of total liters recorded</p>
                <div className="h-72">
                    {comparisonList.length > 0 ? (
                        <Bar
                            data={chartData}
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
                            No water consumption logs recorded in the database.
                        </div>
                    )}
                </div>
            </div>

            {/* User Breakdown Table */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                        User Water Consumption Table
                    </h2>
                    <p className="text-xs text-gray-500">Individual user usage tallies and log counts</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-6">Rank</th>
                                <th className="py-3 px-6">User</th>
                                <th className="py-3 px-6">Total Water Logged</th>
                                <th className="py-3 px-6">Log Entries</th>
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
                                        <span className="font-extrabold text-blue-700 text-sm">
                                            {user.total_water} L
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
