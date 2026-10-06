"use client";

import { useState, useEffect } from "react";
import {
    Target,
    CheckCircle2,
    Clock,
    RefreshCw,
    Loader2,
    Users,
    Calendar,
    Sparkles,
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

export default function AdminActiveGoalsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await adminService.getGoalsAnalytics();
            setData(res);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load goals analytics");
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
                <p className="text-sm font-bold">Aggregating active sustainability goals across users...</p>
            </div>
        );
    }

    const activeGoals = data?.active_goals || [];
    const topScorers = data?.top_scorers || [];

    // Chart: Goal completion percentages
    const chartData = {
        labels: activeGoals.slice(0, 10).map((g) => `${g.user_name} (${g.category || "Goal"})`),
        datasets: [
            {
                label: "Completion Progress (%)",
                data: activeGoals.slice(0, 10).map((g) => g.percentage),
                backgroundColor: "#10B981",
                borderRadius: 8,
                hoverBackgroundColor: "#059669",
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Active Goals Monitoring
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track sustainability targets currently pursued by users and review progress.
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
                    <div className="flex items-center justify-between text-emerald-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Goals Count</span>
                        <Target size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.total_active_goals || 0}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Currently in-progress targets</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total User Goals</span>
                        <Sparkles size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {data?.total_goals || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Platform lifetime set goals</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Top Goal Leader</span>
                        <CheckCircle2 size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {topScorers[0]?.score || 0}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        Achiever: <span className="font-semibold text-gray-800">{topScorers[0]?.name || "N/A"}</span>
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <h2 className="text-base font-bold text-gray-900 mb-1">
                    Goal Completion Progress by User & Target
                </h2>
                <p className="text-xs text-gray-500 mb-6">Percentage completed toward target environmental value</p>
                <div className="h-72">
                    {activeGoals.length > 0 ? (
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100,
                                        grid: { color: "#F1F5F9" },
                                        ticks: { callback: (v) => `${v}%` },
                                    },
                                    x: { grid: { display: false } },
                                },
                            }}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-xs text-gray-400 italic">
                            No active goals recorded in the system.
                        </div>
                    )}
                </div>
            </div>

            {/* Active Goals Table */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                        Active Goals Registry
                    </h2>
                    <p className="text-xs text-gray-500">Detailed list of ongoing goals with current progress</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-6">User</th>
                                <th className="py-3 px-6">Category</th>
                                <th className="py-3 px-6">Target Value</th>
                                <th className="py-3 px-6">Current Value</th>
                                <th className="py-3 px-6">Progress</th>
                                <th className="py-3 px-6">Target Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                            {activeGoals.map((g) => (
                                <tr key={g.id || g._id} className="hover:bg-gray-50/60">
                                    <td className="py-3.5 px-6 font-bold text-gray-900">
                                        {g.user_name}
                                    </td>
                                    <td className="py-3.5 px-6">
                                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-800">
                                            {g.category}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-6 font-bold text-gray-700">
                                        {g.target_value}
                                    </td>
                                    <td className="py-3.5 px-6 font-bold text-emerald-700">
                                        {g.current_value}
                                    </td>
                                    <td className="py-3.5 px-6 w-48">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-emerald-500 h-2 rounded-full transition-all"
                                                    style={{ width: `${Math.min(g.percentage || 0, 100)}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-gray-700 text-[11px] w-9">
                                                {g.percentage}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-6 text-gray-500">
                                        {g.target_date ? new Date(g.target_date).toLocaleDateString() : "Ongoing"}
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
