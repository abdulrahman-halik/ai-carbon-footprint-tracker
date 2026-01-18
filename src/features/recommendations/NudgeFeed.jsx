import React, { useState } from 'react';
import NudgeCard from './NudgeCard';

const MOCK_RECOMMENDATIONS = [
    {
        id: 1,
        type: 'action',
        title: 'Switch to LED Bulbs',
        description: 'Replacing 5 bulbs could save you 50kg of CO2 per year.',
        impact: '-50 kg CO2e/yr',
    },
    {
        id: 2,
        type: 'insight',
        title: 'Great Job on Transport!',
        description: 'Your transport emissions are 15% lower than last week.',
        impact: null,
    },
    {
        id: 3,
        type: 'alert',
        title: 'High Heating Usage',
        description: 'Heating usage spiked yesterday. Consider lowering the thermostat by 1°C.',
        impact: '-5% Energy Bill',
    },
];

export const NudgeFeed = () => {
    const [nudges, setNudges] = useState(MOCK_RECOMMENDATIONS);

    const handleDismiss = (id) => {
        setNudges(prev => prev.filter(n => n.id !== id));
    };

    const handleAccept = (id) => {
        console.log(`Accepted recommendation ${id}`);
        // Add logic to track user commitment
        handleDismiss(id);
    };

    if (nudges.length === 0) {
        return (
            <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl">
                <div className="mx-auto h-24 w-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">🎉</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">You're all caught up!</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Great job acting on your recommendations. Check back later for more personalized insights to help reduce your footprint.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">✨</span> AI Insights
                    <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                        {nudges.length} New
                    </span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {nudges.map((nudge) => (
                    <NudgeCard
                        key={nudge.id}
                        {...nudge}
                        onDismiss={() => handleDismiss(nudge.id)}
                        onAccept={nudge.type === 'action' ? () => handleAccept(nudge.id) : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default NudgeFeed;
