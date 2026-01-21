"use client";

import { TeamCollaboration } from "@/features/social/TeamCollaboration";
import { Users, Trophy } from "lucide-react";
import Leaderboard from "@/features/social/Leaderboard";

// Mock Leaderboard if the component doesn't export default or exists differently
// I'll assume I can just use TeamCollaboration for now as the main focus.
// But the folder features/social had Leaderboard.jsx. Let's try to use it too if possible.

export default function SocialPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Users className="text-emerald-500" size={32} />
                    Team Collaboration
                </h1>
                <p className="text-gray-500 mt-1">Collaborate with your team and track shared sustainability goals.</p>
            </div>

            {/* Team Collaboration Component */}
            <TeamCollaboration />

            {/* Comparison / Leaderboard Placeholder (Optional, can add later) */}
            {/* 
            <div className="glass-card p-6 mt-8">
                 <div className="flex items-center gap-2 mb-4">
                    <Trophy className="text-amber-500" />
                    <h2 className="text-lg font-bold text-gray-900">Leaderboard</h2>
                 </div>
                 <p className="text-gray-500">Compare your team's performance with others.</p>
            </div>
            */}
        </div>
    );
}
