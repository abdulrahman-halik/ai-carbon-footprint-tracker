"use client";

import React from 'react';
import MemberCard from './MemberCard';

export default function MemberList({ members, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => (
                <MemberCard key={m.id} member={m} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
        </div>
    );
}
