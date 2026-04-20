"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { UserPlus, Users, CheckCircle, Zap } from 'lucide-react';
import AddMemberModal from './AddMemberModal';
import { MemberGrid } from './MemberManagement';

export function TeamHeader({ onOpen, memberCount = 0 }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Team Collaboration</h2>
                <p className="text-sm text-gray-500 mt-1">Collaborate with your team and track shared sustainability goals.</p>
                <div className="mt-4 w-28 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200" />
            </div>

            <div className="flex items-center gap-4">
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm shadow-inner">{memberCount} members</div>
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
        <div className="mt-4 mb-6 flex items-center gap-4">
            <div className="flex-1">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search team members or roles"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-200"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">Filter:</div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg shadow-sm bg-white">
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
                    <p className="text-sm text-gray-500">Quick overview of your team's activity</p>
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
    const DEFAULT_MEMBERS = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Sustainability Manager",
            task: "Working on Carbon Reduction Initiative",
            status: "Active",
            statusColor: "bg-yellow-100 text-yellow-700",
            avatar: "https://i.pravatar.cc/150?u=sarah",
        },
        {
            id: 2,
            name: "Mike Rodriguez",
            role: "Energy Analyst",
            task: "Working on Solar Panel Installation",
            status: "In Progress",
            statusColor: "bg-blue-100 text-blue-700",
            avatar: "https://i.pravatar.cc/150?u=mike",
        }
    ];

    const [teamMembers, setTeamMembers] = useState(DEFAULT_MEMBERS);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('All');

    const handleAddMember = (member) => {
        setTeamMembers(prev => [member, ...prev]);
    };

    const handleUpdateMember = (updated) => {
        setTeamMembers(prev => prev.map(m => m.id === updated.id ? { ...m, ...updated } : m));
    };

    const handleDeleteMember = (id) => {
        setTeamMembers(prev => prev.filter(m => m.id !== id));
    };

    const openEdit = (member) => {
        setEditingMember(member);
        setIsAddOpen(true);
    };

    // Load saved members from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem('team.members');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length) setTeamMembers(parsed);
            }
        } catch (e) {
            // ignore
        }
    }, []);

    // Persist members to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('team.members', JSON.stringify(teamMembers));
        } catch (e) {
            // ignore
        }
    }, [teamMembers]);

    const handleToggleStatus = (id) => {
        setTeamMembers(prev => {
            const updated = prev.map(m => {
                if (m.id !== id) return m;
                const isActive = m.status === 'Active';
                return {
                    ...m,
                    status: isActive ? 'Inactive' : 'Active',
                    statusColor: isActive ? 'bg-gray-100 text-gray-500' : 'bg-emerald-100 text-emerald-700',
                };
            });
            toast.success('Member status updated');
            return updated;
        });
    };

    const filtered = useMemo(() => {
        let result = teamMembers;
        // Apply status filter
        if (filter !== 'All') {
            result = result.filter(m => m.status === filter);
        }
        // Apply text search
        if (query) {
            const q = query.toLowerCase();
            result = result.filter(m => m.name.toLowerCase().includes(q) || (m.role || '').toLowerCase().includes(q));
        }
        return result;
    }, [teamMembers, query, filter]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <AddMemberModal isOpen={isAddOpen} onClose={() => { setIsAddOpen(false); setEditingMember(null); }} onAdd={handleAddMember} member={editingMember} onSave={handleUpdateMember} />

            <TeamHeader onOpen={() => setIsAddOpen(true)} memberCount={teamMembers.length} />

            <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="lg:col-span-2">
                    <TeamControls query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
                    <MemberGrid members={filtered} onEdit={openEdit} onDelete={handleDeleteMember} onToggleStatus={handleToggleStatus} />
                </div>

                <aside className="mt-6 lg:mt-0">
                    <TeamSidebar members={teamMembers} />
                </aside>
            </div>
        </div>
    );
}