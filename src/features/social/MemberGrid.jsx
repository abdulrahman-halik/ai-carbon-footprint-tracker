"use client";

import React from 'react';
import MemberList from './MemberList';

export default function MemberGrid({ members, onEdit, onDelete, onToggleStatus }) {
  return (
    <div>
      <MemberList members={members} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
    </div>
  );
}
