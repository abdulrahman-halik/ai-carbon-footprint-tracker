"use client";

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function MemberCard({ member, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{member.task}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onToggleStatus && onToggleStatus(member.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${member.statusColor} hover:opacity-90`}
                    title="Toggle status"
                >
                    {member.status}
                </button>
                <button onClick={() => onEdit(member)} className="p-2 rounded-md text-gray-600 hover:bg-gray-50"><Edit2 size={16} /></button>
                <button onClick={() => onDelete(member.id)} className="p-2 rounded-md text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}
