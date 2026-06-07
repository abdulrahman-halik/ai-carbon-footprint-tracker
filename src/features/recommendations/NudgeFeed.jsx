import React, { useState, useEffect } from 'react';
import NudgeCard from './NudgeCard';
import insightsService from '@/services/insightsService';

export const NudgeFeed = () => {
    const [nudges, setNudges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRecommendations = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await insightsService.search('personalized sustainability recommendations', 6);
                const items = (response?.results || []).map((item, index) => ({
                    id: index + 1,
                    type: item.meta?.category === 'transport' ? 'action' : 'insight',
                    title: item.meta?.category ? `${item.meta.category.charAt(0).toUpperCase() + item.meta.category.slice(1)} Tip` : 'Sustainability Tip',
                    description: item.text,
                    impact: null
                }));

                if (items.length) {
                    setNudges(items);
                } else {
                    setNudges([{
                        id: 1,
                        type: 'insight',
                        title: 'Personalized sustainability advice',
                        description: response?.insight || 'Keep using the app to unlock more tailored recommendations.',
                        impact: null
                    }]);
                }
            } catch (err) {
                console.error('Failed to load recommendations:', err);
                setError('Could not load recommendations at this time. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    const handleDismiss = (id) => {
        setNudges(prev => prev.filter(n => n.id !== id));
    };

    const handleAccept = (id) => {
        handleDismiss(id);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-60 rounded-3xl bg-white/80 border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500">Loading personalized recommendations…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl bg-red-50 border border-red-100 p-6 text-sm text-red-700">
                {error}
            </div>
        );
    }

    if (nudges.length === 0) {
        return (
            <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl">
                <div className="mx-auto h-24 w-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">You&apos;re all caught up!</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    We currently have no new recommendations. Check back later for more personalized insights based on your activity.
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