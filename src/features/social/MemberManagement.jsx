"use client";

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export function MemberCard({ member, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transform transition-shadow duration-200 hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-50 shadow-sm"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleStatus && onToggleStatus(member.id); }}
                        title="Toggle status"
                        className={`absolute -bottom-1 -right-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium focus:outline-none ${member.statusColor}`}
                        aria-pressed={member.status === 'Active'}
                    >
                        {member.status}
                    </button>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{member.role} <span className="text-xs text-gray-400">• {member.task}</span></p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(member)} className="p-2 rounded-md text-gray-600 hover:bg-gray-50" title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => onDelete(member.id)} className="p-2 rounded-md text-red-600 hover:bg-red-50" title="Remove"><Trash2 size={16} /></button>
                </div>
            </div>
        </div>
    );
}

export function MemberList({ members, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => (
                <MemberCard key={m.id} member={m} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
        </div>
    );
}

export function MemberGrid({ members, onEdit, onDelete, onToggleStatus }) {
    return (
        <div>
            <MemberList members={members} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
        </div>
    );
}
