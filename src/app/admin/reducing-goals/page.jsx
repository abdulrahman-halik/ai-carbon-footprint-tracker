"use client";

import { useState, useEffect } from "react";
import {
    TrendingDown,
    Award,
    Trophy,
    RefreshCw,
    Loader2,
    Users,
    CheckCircle2,
    ArrowDownRight,
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

export default function AdminReducingGoalsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await adminService.getGoalsAnalytics();
            setData(res);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load reducing goals");
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
                <p className="text-sm font-bold">Computing emission reduction goals and scores...</p>
            </div>
        );
    }

    const reducingGoals = data?.reducing_goals || [];
    const topScorers = data?.top_scorers || [];

    // Chart: Top scorers / users with highest score percentages
    const chartData = {
        labels: topScorers.slice(0, 10).map((u) => u.name),
        datasets: [
            {
                label: "Overall Score / Completion (%)",
                data: topScorers.slice(0, 10).map((u) => u.score),
                backgroundColor: "#059669",
                borderRadius: 8,
                hoverBackgroundColor: "#047857",
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Reducing Goals & Score Leaders
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Evaluate emission reduction targets, performance scores, and user impact achievements.
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
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tracked Reducing Goals</span>
                        <TrendingDown size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {reducingGoals.length}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Emission & resource cut targets</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-amber-600 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Top Sustainability Leader</span>
                        <Trophy size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900 truncate">
                        {topScorers[0]?.name || "N/A"}
                    </p>
                    <p className="text-xs text-amber-600 mt-1 font-medium">
                        Score: {topScorers[0]?.score || 0}% across {topScorers[0]?.goals_count || 0} goals
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Scored Users</span>
                        <Users size={18} />
                    </div>
                    <p className="text-3xl font-black text-gray-900">
                        {topScorers.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Users actively pursuing reduction</p>
                </div>
            </div>

            {/* Chart: Top Scorers */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-base font-bold text-gray-900">
                            Highest Sustainability Scores Leaderboard
                        </h2>
                        <p className="text-xs text-gray-500">Users with the highest goal completion and reduction scores</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Award size={13} />
                        Top Reducers
                    </span>
                </div>

                <div className="h-72">
                    {topScorers.length > 0 ? (
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
                            No goal scores calculated yet.
                        </div>
                    )}
                </div>
            </div>

            {/* Leaderboard & Goals List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Leaderboard */}
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <Trophy size={16} className="text-amber-500" />
                        Scoring Leaders
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">Ranked by goal success rate</p>

                    <div className="space-y-3">
                        {topScorers.length > 0 ? (
                            topScorers.map((user, idx) => (
                                <div
                                    key={user.user_id}
                                    className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-6 text-center text-xs font-bold text-gray-400">
                                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">{user.name}</p>
                                            <p className="text-[10px] text-gray-400">{user.goals_count} goals tracked</p>
                                        </div>
                                    </div>
                                    <span className="font-extrabold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                        {user.score}%
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 italic">No user scores recorded yet.</p>
                        )}
                    </div>
                </div>

                {/* Reducing Goals Details Table */}
                <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-base font-bold text-gray-900">
                            Reduction Goals Portfolio
                        </h2>
                        <p className="text-xs text-gray-500">Individual targets and calculated reduction margins</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                                <tr>
                                    <th className="py-3 px-6">User</th>
                                    <th className="py-3 px-6">Category</th>
                                    <th className="py-3 px-6">Target Limit</th>
                                    <th className="py-3 px-6">Reduction Achieved</th>
                                    <th className="py-3 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium">
                                {reducingGoals.map((g) => (
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
                                        <td className="py-3.5 px-6">
                                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                                                <ArrowDownRight size={13} />
                                                {g.reduction_achieved || 0}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6">
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                    g.is_active
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {g.is_active ? "In Progress" : "Completed"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
