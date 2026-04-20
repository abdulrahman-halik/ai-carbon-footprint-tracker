import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderItem from './LeaderItem';

const MOCK_LEADERBOARD = [
    { id: 1, name: 'Alice', score: 120, avatar: 'A' },
    { id: 2, name: 'Bob', score: 110, avatar: 'B' },
    { id: 3, name: 'Charlie', score: 95, avatar: 'C' },
    { id: 4, name: 'You', score: 85, avatar: 'Y', isCurrentUser: true },
    { id: 5, name: 'Diana', score: 80, avatar: 'D' },
];

export const Leaderboard = () => {
    const [filter, setFilter] = useState('weekly');

    return (
        <Card className="w-full h-full border border-white/70 shadow-2xl rounded-3xl overflow-hidden bg-white/85">
            <div className="p-6 space-y-6">
                <LeaderboardHeader filter={filter} setFilter={setFilter} />

                <div className="space-y-3">
                    {MOCK_LEADERBOARD.map((user, index) => (
                        <LeaderItem key={user.id} user={user} index={index} />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default Leaderboard;
