"use client";

import { useState, useEffect } from "react";
import {
    BarChart3,
    Leaf,
    TrendingUp,
    TrendingDown,
    Loader2,
    RefreshCw,
    Award,
    PieChart,
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

const CATEGORY_COLORS = [
    "#10B981", // Emerald
    "#3B82F6", // Blue
    "#F59E0B", // Amber
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#EC4899", // Pink
    "#64748B", // Slate
];

export default function AdminEmissionsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await adminService.getEmissionsAnalytics();
            setData(res);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load emissions analytics");
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
                <Loader2 size={36} className="animate-spin text-emerald-600 mb-3" />
                <p className="text-sm font-bold">Computing carbon footprint metrics across users...</p>
            </div>
        );
    }

    const comparisonList = data?.all_users_comparison || [];
    const highestEmitters = data?.highest_emitters || [];
    const categoryData = data?.category_distribution || [];

    // Chart 1: Bar chart comparing top users
    const barChartData = {
        labels: comparisonList.slice(0, 10).map((u) => u.name || "User"),
        datasets: [
            {
                label: "Carbon Footprint (kg CO2e)",
                data: comparisonList.slice(0, 10).map((u) => u.total_emissions),
                backgroundColor: "#10B981",
                borderRadius: 8,
                hoverBackgroundColor: "#059669",
            },
        ],
    };

    // Chart 2: Category breakdown doughnut
    const donutData = {
        labels: categoryData.map((c) => c.category),
        datasets: [
            {
                data: categoryData.map((c) => c.total),
                backgroundColor: categoryData.map((_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length]),
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
                        Carbon Footprint Analytics
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Cross-user carbon emission rankings, category allocations, and reduction leaders.
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

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-emerald-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Platform Total Footprint</span>
                        <Leaf size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.platform_total_emissions?.toLocaleString() || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">kg CO2e</span>
                    </p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Aggregated across all monitored accounts</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tracked Accounts</span>
                        <BarChart3 size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.total_users_tracked || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Active footprint logging users</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Highest Individual Footprint</span>
                        <TrendingUp size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {highestEmitters[0]?.total_emissions || 0}{" "}
                        <span className="text-xs font-bold text-gray-400">kg CO2e</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        Recorded by: <span className="font-semibold text-gray-800">{highestEmitters[0]?.name || "N/A"}</span>
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <h2 className="text-base font-bold text-gray-900 mb-1">
                        Highest Emission Contributors
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">Comparative carbon footprint generated per user</p>
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
                                No emission logs available to chart.
                            </div>
                        )}
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs flex flex-col">
                    <h2 className="text-base font-bold text-gray-900 mb-1">
                        Category Distribution
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">Total platform emissions by sector</p>
                    <div className="h-56 relative flex items-center justify-center my-auto">
                        {categoryData.length > 0 ? (
                            <Doughnut
                                data={donutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } },
                                }}
                            />
                        ) : (
                            <p className="text-xs text-gray-400 italic">No categorical records found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Detailed Rankings Table */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-gray-900">
                            Carbon Footprint Rankings
                        </h2>
                        <p className="text-xs text-gray-500">Users sorted by total emissions generated</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-6">Rank</th>
                                <th className="py-3 px-6">User</th>
                                <th className="py-3 px-6">Total Carbon (kg CO2e)</th>
                                <th className="py-3 px-6">Total Logs</th>
                                <th className="py-3 px-6">Account Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                            {comparisonList.map((user, idx) => (
                                <tr key={user.user_id} className="hover:bg-gray-50/60">
                                    <td className="py-3.5 px-6 font-bold text-gray-500">
                                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                                    </td>
                                    <td className="py-3.5 px-6">
                                        <p className="font-bold text-gray-900">{user.name}</p>
                                        <p className="text-[11px] text-gray-400">{user.email}</p>
                                    </td>
                                    <td className="py-3.5 px-6">
                                        <span className="font-black text-emerald-800 text-sm">
                                            {user.total_emissions} kg
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-6 text-gray-500">{user.records_count} logs</td>
                                    <td className="py-3.5 px-6">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                user.is_active
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                    : "bg-red-50 text-red-600 border border-red-200"
                                            }`}
                                        >
                                            {user.is_active ? "Active" : "Deactivated"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
