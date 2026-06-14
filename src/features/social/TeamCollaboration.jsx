"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from 'react-hot-toast';
import { UserPlus, Users, CheckCircle, Zap, Loader2 } from 'lucide-react';
import AddMemberModal from './AddMemberModal';
import { MemberGrid } from './MemberManagement';
import communityService from "@/services/communityService";

export function TeamHeader({ onOpen, memberCount = 0 }) {
    return (
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Team Collaboration</h2>
                <p className="text-sm text-gray-500 mt-1">Collaborate with your team and track shared sustainability goals.</p>
                <div className="mt-4 w-28 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200" />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm shadow-inner">
                    {memberCount} member{memberCount !== 1 ? 's' : ''}
                </div>
                <button
                    onClick={onOpen}
                    aria-label="Add member"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg transform transition duration-150 ease-in-out hover:scale-105 bg-gradient-to-r from-emerald-500 to-emerald-400"
                >
                    <UserPlus size={16} />
                    Add Member
                </button>
            </div>
        </div>
    );
}

export function TeamControls({ query, setQuery, filter, setFilter }) {
    return (
        <div className="mt-4 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search team members or roles"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500 shrink-0">Filter:</div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-emerald-200 focus:outline-none w-full sm:w-auto"
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>In Progress</option>
                    <option>Inactive</option>
                </select>
            </div>
        </div>
    );
}

export function TeamSidebar({ members = [] }) {
    const total = members.length;
    const active = members.filter(m => m.status === 'Active').length;
    const inProgress = members.filter(m => m.status === 'In Progress').length;
    const inactive = members.filter(m => m.status === 'Inactive').length;

    return (
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Team Snapshot</h3>
                    <p className="text-sm text-gray-500">Quick overview of your team&apos;s activity</p>
                </div>
                <div className="bg-emerald-50 p-2 rounded-lg">
                    <Users className="text-emerald-600" />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500">Members</div>
                    <div className="text-2xl font-extrabold text-gray-900">{total}</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500">Active</div>
                    <div className="text-2xl font-extrabold text-emerald-600">{active}</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500">In progress</div>
                    <div className="text-2xl font-extrabold text-amber-600">{inProgress}</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500">Inactive</div>
                    <div className="text-2xl font-extrabold text-gray-500">{inactive}</div>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800">Recent Activity</h4>
                <ul className="mt-3 space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">Mission milestone reached</div>
                            <div className="text-xs text-gray-500">2 days ago</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Zap size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">New project added</div>
                            <div className="text-xs text-gray-500">4 days ago</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export function TeamCollaboration() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('All');

    // ─── Load members from backend ───────────────────────────────────────────
    const fetchMembers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await communityService.getMembers();
            setTeamMembers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load team members:", err);
            toast.error("Failed to load team members");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    // ─── CRUD handlers ───────────────────────────────────────────────────────
    const handleAddMember = async (memberData) => {
        try {
            const created = await communityService.addMember({
                name: memberData.name,
                email: memberData.email,
                role: memberData.role,
                status: memberData.status,
                avatar: memberData.avatar || null,
                task: memberData.task || "No task yet",
            });
            setTeamMembers(prev => [created, ...prev]);
            toast.success(`${created.name} added to the team`);
        } catch (err) {
            console.error("Failed to add member:", err);
            toast.error("Failed to add member");
        }
    };

    const handleUpdateMember = async (updated) => {
        try {
            const saved = await communityService.updateMember(updated.id, {
                name: updated.name,
                email: updated.email,
                role: updated.role,
                status: updated.status,
                avatar: updated.avatar || null,
                task: updated.task,
            });
            setTeamMembers(prev => prev.map(m => m.id === saved.id ? saved : m));
            toast.success(`${saved.name} updated`);
        } catch (err) {
            console.error("Failed to update member:", err);
            toast.error("Failed to update member");
        }
    };

    const handleDeleteMember = async (id) => {
        try {
            await communityService.deleteMember(id);
            setTeamMembers(prev => prev.filter(m => m.id !== id));
            toast.success("Member removed");
        } catch (err) {
            console.error("Failed to delete member:", err);
            toast.error("Failed to remove member");
        }
    };

    const openEdit = (member) => {
        setEditingMember(member);
        setIsAddOpen(true);
    };

    const handleToggleStatus = async (id) => {
        const member = teamMembers.find(m => m.id === id);
        if (!member) return;
        const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
        try {
            const saved = await communityService.updateMember(id, { status: newStatus });
            setTeamMembers(prev => prev.map(m => m.id === id ? saved : m));
            toast.success('Member status updated');
        } catch (err) {
            console.error("Failed to toggle status:", err);
            toast.error("Failed to update status");
        }
    };

    // ─── Filtered view ───────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        let result = teamMembers;
        if (filter !== 'All') result = result.filter(m => m.status === filter);
        if (query) {
            const q = query.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(q) || (m.role || '').toLowerCase().includes(q)
            );
        }
        return result;
    }, [teamMembers, query, filter]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <AddMemberModal
                isOpen={isAddOpen}
                onClose={() => { setIsAddOpen(false); setEditingMember(null); }}
                onAdd={handleAddMember}
                member={editingMember}
                onSave={handleUpdateMember}
            />

            <TeamHeader onOpen={() => setIsAddOpen(true)} memberCount={teamMembers.length} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TeamControls query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="animate-spin text-emerald-500" size={32} />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <Users size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No team members yet. Add your first teammate!</p>
                        </div>
                    ) : (
                        <MemberGrid
                            members={filtered}
                            onEdit={openEdit}
                            onDelete={handleDeleteMember}
                            onToggleStatus={handleToggleStatus}
                        />
                    )}
                </div>

                <aside className="mt-0">
                    <TeamSidebar members={teamMembers} />
                </aside>
            </div>
        </div>
    );
}