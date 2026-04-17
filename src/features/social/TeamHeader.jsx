"use client";

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function TeamHeader({ onOpen }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Team Collaboration</h2>
            <button
                onClick={onOpen}
                aria-label="Add member"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md transform transition duration-150 ease-in-out hover:scale-105 bg-gradient-to-r from-emerald-500 to-emerald-400"
            >
                <UserPlus size={16} />
                Add Member
            </button>
        </div>
    );
}
