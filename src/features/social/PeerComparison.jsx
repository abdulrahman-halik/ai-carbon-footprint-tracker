import React from 'react';
import { Card } from '@/components/ui/Card';
import PeerCategoryBar from './PeerCategoryBar';

export const PeerComparison = ({ userStats, peerStats }) => {
    const user = userStats || { transport: 42, energy: 28, diet: 35 };
    const avg = peerStats || { transport: 50, energy: 45, diet: 35 };

    const categories = [
        { key: 'transport', label: '🚗 Transport', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
        { key: 'energy', label: '⚡ Home Energy', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
        { key: 'diet', label: '🥗 Diet & Food', color: 'from-emerald-400 to-green-600', bg: 'bg-emerald-50' },
    ];

    return (
        <Card className="w-full h-full border border-white/70 shadow-2xl rounded-3xl overflow-hidden bg-white/85">
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Peer Comparison</h3>
                    <p className="mt-1 text-sm text-gray-600">How your footprint compares to similar households.</p>
                </div>

                <div className="space-y-8">
                    {categories.map((cat) => (
                        <PeerCategoryBar key={cat.key} cat={cat} userVal={user[cat.key]} avgVal={avg[cat.key]} />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default PeerComparison;
