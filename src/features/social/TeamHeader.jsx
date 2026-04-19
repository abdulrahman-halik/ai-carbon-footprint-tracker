"use client";

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function TeamHeader({ onOpen, memberCount = 0 }) {
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
