import React, { useState } from "react";
import AddMemberModal from './AddMemberModal';
import TeamHeader from './TeamHeader';
import MemberList from './MemberList';

export function TeamCollaboration() {
    const [teamMembers, setTeamMembers] = useState([
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
    ]);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

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

    const handleToggleStatus = (id) => {
        setTeamMembers(prev => prev.map(m => {
            if (m.id !== id) return m;
            const isActive = m.status === 'Active';
            return {
                ...m,
                status: isActive ? 'Inactive' : 'Active',
                statusColor: isActive ? 'bg-gray-100 text-gray-500' : 'bg-emerald-100 text-emerald-700',
            };
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <AddMemberModal isOpen={isAddOpen} onClose={() => { setIsAddOpen(false); setEditingMember(null); }} onAdd={handleAddMember} member={editingMember} onSave={handleUpdateMember} />

            <TeamHeader onOpen={() => setIsAddOpen(true)} />

            <MemberList members={teamMembers} onEdit={openEdit} onDelete={handleDeleteMember} onToggleStatus={handleToggleStatus} />
        </div>
    );
}
