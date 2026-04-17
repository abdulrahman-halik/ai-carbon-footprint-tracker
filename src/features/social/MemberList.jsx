"use client";

import React from 'react';
import MemberCard from './MemberCard';

export default function MemberList({ members, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="space-y-6">
            {members.map((m) => (
                <MemberCard key={m.id} member={m} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
            ))}
        </div>
    );
}
