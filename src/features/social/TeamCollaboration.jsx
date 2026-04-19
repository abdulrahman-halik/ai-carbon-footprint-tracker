import React, { useState, useMemo, useEffect } from "react";
import { toast } from 'react-hot-toast';
import AddMemberModal from './AddMemberModal';
import TeamHeader from './TeamHeader';
import MemberGrid from './MemberGrid';
import TeamControls from './TeamControls';
import TeamSidebar from './TeamSidebar';

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
            const changed = updated.find(m => m.id === id);
            console.log('Toggled status for', id, changed && changed.status);
            toast.success('Member status updated');
            return updated;
        });
    };

    const filtered = useMemo(() => {
        if (!query) return teamMembers;
        const q = query.toLowerCase();
        return teamMembers.filter(m => m.name.toLowerCase().includes(q) || (m.role || '').toLowerCase().includes(q));
    }, [teamMembers, query]);

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
