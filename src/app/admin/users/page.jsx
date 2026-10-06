"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Search,
    ShieldCheck,
    UserX,
    UserCheck,
    Leaf,
    BarChart2,
    RefreshCw,
    SlidersHorizontal,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Loader2,
} from "lucide-react";
import adminService from "@/services/adminService";
import UserSummaryModal from "@/features/admin/UserSummaryModal";
import { toast } from "react-hot-toast";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'active', 'inactive'
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [updatingUserId, setUpdatingUserId] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getUsers();
            setUsers(data || []);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load user accounts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (user) => {
        const newStatus = !user.is_active;
        setUpdatingUserId(user.id);
        try {
            await adminService.updateUserStatus(user.id, newStatus);
            setUsers((prev) =>
                prev.map((u) => (u.id === user.id ? { ...u, is_active: newStatus } : u))
            );
            toast.success(
                `User ${user.full_name || user.email} ${
                    newStatus ? "activated" : "deactivated"
                } successfully`
            );
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to update user status");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleModalStatusChange = (userId, newStatus) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, is_active: newStatus } : u))
        );
    };

    // Filtered users
    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            (u.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.email || "").toLowerCase().includes(searchQuery.toLowerCase());

        if (statusFilter === "active") return matchesSearch && u.is_active === true;
        if (statusFilter === "inactive") return matchesSearch && u.is_active === false;
        return matchesSearch;
    });

    const activeCount = users.filter((u) => u.is_active === true).length;
    const inactiveCount = users.filter((u) => u.is_active === false).length;
    const totalCarbon = users.reduce((acc, u) => acc + (u.total_emissions || 0), 0);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        User Directory & Accounts
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View registered users, analyze individual carbon footprints, and manage account access status.
                    </p>
                </div>
                <button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-emerald-700 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                        <Users size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
                        <p className="text-2xl font-black text-gray-900">{users.length}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center border border-green-100">
                        <UserCheck size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Users</p>
                        <p className="text-2xl font-black text-green-700">{activeCount}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                        <UserX size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deactivated</p>
                        <p className="text-2xl font-black text-red-600">{inactiveCount}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                        <Leaf size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracked Carbon</p>
                        <p className="text-2xl font-black text-teal-900">
                            {totalCarbon.toFixed(1)} <span className="text-xs font-bold text-gray-500">kg</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                    <span className="text-xs text-gray-400 font-semibold mr-1 flex items-center gap-1">
                        <SlidersHorizontal size={12} /> Status:
                    </span>
                    <button
                        onClick={() => setStatusFilter("all")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                            statusFilter === "all"
                                ? "bg-gray-900 text-white shadow-xs"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        All ({users.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter("active")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                            statusFilter === "active"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                    >
                        Active ({activeCount})
                    </button>
                    <button
                        onClick={() => setStatusFilter("inactive")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                            statusFilter === "inactive"
                                ? "bg-red-600 text-white shadow-xs"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                    >
                        Deactivated ({inactiveCount})
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xs overflow-hidden">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 size={32} className="animate-spin text-emerald-600 mb-3" />
                        <p className="text-sm font-semibold">Retrieving platform users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="py-20 text-center">
                        <Users size={36} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm font-bold text-gray-700">No users found</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {searchQuery ? "Try refining your search terms" : "No regular users in the database"}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                                <tr>
                                    <th className="py-3.5 px-4 sm:px-6">User</th>
                                    <th className="py-3.5 px-4">Role</th>
                                    <th className="py-3.5 px-4">Account Status</th>
                                    <th className="py-3.5 px-4">Carbon Footprint</th>
                                    <th className="py-3.5 px-4">Logs</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                                        {/* User Name & Email */}
                                        <td className="py-4 px-4 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-100 shrink-0">
                                                    {(user.full_name || "U")[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 truncate">
                                                        {user.full_name || "Eco Tracker User"}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-700">
                                                {user.role || "user"}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4">
                                            {user.is_active ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 size={12} />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-200">
                                                    <XCircle size={12} />
                                                    Deactivated
                                                </span>
                                            )}
                                        </td>

                                        {/* Carbon Footprint */}
                                        <td className="py-4 px-4">
                                            <span className="font-bold text-gray-900">
                                                {user.total_emissions || 0} kg
                                            </span>
                                        </td>

                                        {/* Logs Count */}
                                        <td className="py-4 px-4 text-gray-500">
                                            {user.records_count || 0} entries
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Select user -> View Carbon Summary */}
                                                <button
                                                    onClick={() => setSelectedUserId(user.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer"
                                                    title="View user carbon emission summary"
                                                >
                                                    <BarChart2 size={13} />
                                                    <span>Summary</span>
                                                </button>

                                                {/* Edit Option: Disable / Activate User */}
                                                <button
                                                    onClick={() => handleToggleStatus(user)}
                                                    disabled={updatingUserId === user.id}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                                        user.is_active
                                                            ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                                            : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                                    }`}
                                                    title={user.is_active ? "Block/Deactivate user" : "Activate user"}
                                                >
                                                    {updatingUserId === user.id ? (
                                                        <Loader2 size={13} className="animate-spin" />
                                                    ) : user.is_active ? (
                                                        <>
                                                            <UserX size={13} />
                                                            <span>Deactivate</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserCheck size={13} />
                                                            <span>Activate</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Individual User Carbon Summary Modal */}
            {selectedUserId && (
                <UserSummaryModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                    onStatusChange={handleModalStatusChange}
                />
            )}
        </div>
    );
}
