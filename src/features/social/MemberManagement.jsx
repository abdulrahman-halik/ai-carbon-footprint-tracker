"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Edit2, Trash2, Mail, Briefcase, CheckCircle, Clock, X, User } from 'lucide-react';
import { Modal, ModalContent } from '@/components/ui/Modal';
import { getInitials } from '@/lib/utils';

export function MemberCard({ member, onClick }) {
    return (
        <div
            onClick={() => onClick(member)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center gap-3 transform transition-all duration-200 hover:-translate-y-1"
        >
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold text-xl ring-4 ring-emerald-50 mb-1">
                {member.avatar ? (
                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                ) : (
                    <span>{getInitials(member.name)}</span>
                )}
            </div>
            <div className="w-full text-center">
                <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                <p className="text-sm text-gray-500 truncate">{member.role}</p>
            </div>
        </div>
    );
}

export function MemberDetailsModal({ member, isOpen, onClose, onEdit, onDelete, onToggleStatus }) {
    if (!member) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="w-full max-w-sm mx-4 sm:mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Member Details</h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-sm ring-4 ring-emerald-50 bg-gray-50">
                                {member.avatar ? (
                                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold text-3xl">{getInitials(member.name)}</div>
                                )}
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                            <p className="text-emerald-600 font-medium text-sm">{member.role}</p>
                        </div>

                        <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail size={16} className="text-gray-400 shrink-0" />
                                <span className="text-gray-700 truncate">{member.email || "No email"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase size={16} className="text-gray-400 shrink-0" />
                                <span className="text-gray-700 truncate">{member.task || "No task"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    {member.status === 'Active' ? <CheckCircle size={16} className="text-emerald-500 shrink-0" /> : <Clock size={16} className="text-amber-500 shrink-0" />}
                                    <span className="text-gray-700">Status: <span className="font-semibold">{member.status}</span></span>
                                </div>
                                <button
                                    onClick={() => onToggleStatus(member.id)}
                                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md"
                                >
                                    Toggle
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button
                                onClick={() => { onClose(); onEdit(member); }}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors font-medium text-sm"
                            >
                                <Edit2 size={16} /> Edit
                            </button>
                            <button
                                onClick={() => { onClose(); onDelete(member.id); }}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors font-medium text-sm"
                            >
                                <Trash2 size={16} /> Remove
                            </button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

export function MemberList({ members, onSelectMember }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {members.map((m) => (
                <MemberCard key={m.id} member={m} onClick={onSelectMember} />
            ))}
        </div>
    );
}

export function MemberGrid({ members, onEdit, onDelete, onToggleStatus }) {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectMember = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    return (
        <div>
            <MemberList members={members} onSelectMember={handleSelectMember} />
            <MemberDetailsModal
                member={selectedMember}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEdit={onEdit}
                onDelete={(id) => {
                    onDelete(id);
                    if (selectedMember && selectedMember.id === id) {
                        setIsModalOpen(false);
                        setSelectedMember(null);
                    }
                }}
                onToggleStatus={(id) => {
                    onToggleStatus(id);
                    if (selectedMember && selectedMember.id === id) {
                        // Optimistically update status in local component state
                        setSelectedMember(prev => ({
                            ...prev,
                            status: prev.status === 'Active' ? 'Inactive' : 'Active'
                        }));
                    }
                }}
            />
        </div>
    );
}
