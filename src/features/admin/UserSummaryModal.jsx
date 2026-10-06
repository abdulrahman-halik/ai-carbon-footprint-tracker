"use client";

import { useEffect, useState } from "react";
import {
    X,
    Leaf,
    Droplets,
    Zap,
    Target,
    Calendar,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import adminService from "@/services/adminService";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CATEGORY_COLORS = {
    Transport: "#3B82F6", // Blue
    Food: "#10B981",      // Emerald
    Energy: "#F59E0B",    // Amber
    Shopping: "#06B6D4",  // Cyan
    Waste: "#84CC16",     // Lime
    Other: "#64748B",     // Slate
};

export default function UserSummaryModal({ userId, onClose, onStatusChange }) {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        if (!userId) return;

        let isMounted = true;
        const fetchSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await adminService.getUserSummary(userId);
                if (isMounted) setSummary(data);
            } catch (err) {
                if (isMounted) setError(err.response?.data?.detail || "Failed to load user summary");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchSummary();
        return () => {
            isMounted = false;
        };
    }, [userId]);

    const handleToggleStatus = async () => {
        if (!summary?.user) return;
        const newStatus = !summary.user.is_active;
        setToggling(true);
        try {
            await adminService.updateUserStatus(summary.user.id, newStatus);
            setSummary((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    is_active: newStatus,
                },
            }));
            if (onStatusChange) {
                onStatusChange(summary.user.id, newStatus);
            }
        } catch (err) {
            alert(err.response?.data?.detail || "Failed to update user status");
        } finally {
            setToggling(false);
        }
    };

    if (!userId) return null;

    const categories = summary?.category_breakdown || {};
    const catLabels = Object.keys(categories);
    const catValues = Object.values(categories);

    const chartData = {
        labels: catLabels.length > 0 ? catLabels : ["No Emissions Recorded"],
        datasets: [
            {
                data: catValues.length > 0 ? catValues : [1],
                backgroundColor: catLabels.length > 0
                    ? catLabels.map((c) => CATEGORY_COLORS[c] || "#10B981")
                    : ["#E2E8F0"],
                borderWidth: 2,
                borderColor: "#FFFFFF",
            },
        ],
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                            {summary?.user?.full_name ? summary.user.full_name[0].toUpperCase() : "U"}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {summary?.user?.full_name || "User Impact Details"}
                            </h2>
                            <p className="text-xs text-gray-500">{summary?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="animate-spin text-emerald-600 mb-3" size={32} />
                        <p className="text-sm font-medium">Loading user environmental records...</p>
                    </div>
                ) : error ? (
                    <div className="py-12 text-center text-red-500">
                        <AlertCircle className="mx-auto mb-2" size={32} />
                        <p className="font-semibold text-sm">{error}</p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-6">
                        {/* Status bar & Action */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2.5">
                                {summary.user.is_active ? (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                                        <CheckCircle2 size={13} />
                                        <span>Status: Active</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-100/70 px-3 py-1 rounded-full border border-red-200">
                                        <XCircle size={13} />
                                        <span>Status: Deactivated / Blocked</span>
                                    </div>
                                )}
                                <span className="text-xs text-gray-400">
                                    Role: <span className="font-medium text-gray-700">{summary.user.role || "user"}</span>
                                </span>
                            </div>

                            <button
                                onClick={handleToggleStatus}
                                disabled={toggling}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                                    summary.user.is_active
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                                }`}
                            >
                                {toggling ? "Updating..." : summary.user.is_active ? "Deactivate User Access" : "Reactivate User"}
                            </button>
                        </div>

                        {/* Top Metrics Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                                <div className="flex items-center gap-2 text-emerald-700 mb-1 text-xs font-semibold">
                                    <Leaf size={15} />
                                    <span>Total Carbon</span>
                                </div>
                                <p className="text-2xl font-extrabold text-emerald-950">
                                    {summary.total_emissions} <span className="text-xs font-semibold">kg CO2e</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                                <div className="flex items-center gap-2 text-blue-700 mb-1 text-xs font-semibold">
                                    <Droplets size={15} />
                                    <span>Water Usage</span>
                                </div>
                                <p className="text-2xl font-extrabold text-blue-950">
                                    {summary.total_water} <span className="text-xs font-semibold">Liters</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                                <div className="flex items-center gap-2 text-amber-700 mb-1 text-xs font-semibold">
                                    <Zap size={15} />
                                    <span>Energy Usage</span>
                                </div>
                                <p className="text-2xl font-extrabold text-amber-950">
                                    {summary.total_energy} <span className="text-xs font-semibold">kWh</span>
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                                <div className="flex items-center gap-2 text-teal-700 mb-1 text-xs font-semibold">
                                    <Target size={15} />
                                    <span>Active Goals</span>
                                </div>
                                <p className="text-2xl font-extrabold text-teal-950">
                                    {summary.goals?.length || 0}
                                </p>
                            </div>
                        </div>

                        {/* Carbon Breakdown Visualizer */}
                        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                            <h3 className="text-sm font-bold text-gray-900 mb-4">
                                Carbon Emission Breakdown by Sector
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="h-52 flex items-center justify-center">
                                    <Doughnut
                                        data={chartData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { position: "bottom", labels: { boxWidth: 12 } },
                                            },
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    {catLabels.length > 0 ? (
                                        catLabels.map((cat) => (
                                            <div
                                                key={cat}
                                                className="flex items-center justify-between text-xs p-2 rounded-xl bg-gray-50"
                                            >
                                                <span className="font-semibold text-gray-700 flex items-center gap-2">
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{ backgroundColor: CATEGORY_COLORS[cat] || "#10B981" }}
                                                    />
                                                    {cat}
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    {categories[cat]} kg CO2e
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No category breakdown logs available yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                Recent Emission Logs
                            </h3>
                            {summary.recent_logs?.length > 0 ? (
                                <div className="divide-y divide-gray-100 overflow-hidden">
                                    {summary.recent_logs.map((log) => (
                                        <div key={log.id || log._id} className="py-2.5 flex items-center justify-between text-xs">
                                            <div>
                                                <p className="font-semibold text-gray-800">{log.category} {log.sub_category ? `(${log.sub_category})` : ""}</p>
                                                <p className="text-[11px] text-gray-400">{log.description || "Activity recorded"}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-emerald-700">{log.value} kg CO2e</p>
                                                <p className="text-[10px] text-gray-400">
                                                    {log.date ? new Date(log.date).toLocaleDateString() : ""}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic py-2">No emission logs found for this user.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
