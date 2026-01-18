import { useState, useEffect } from 'react';
import { useOnboarding } from './OnboardingProvider';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';

const TRAITS = [
    { id: 'honesty', label: 'Honesty-Humility', description: 'Sincerity, fairness, greed avoidance, and modesty' },
    { id: 'emotionality', label: 'Emotionality', description: 'Fearfulness, anxiety, dependence, and sentimentality' },
    { id: 'extraversion', label: 'Extraversion', description: 'Social self-esteem, social boldness, sociability, and liveliness' },
    { id: 'agreeableness', label: 'Agreeableness', description: 'Forgiveness, gentleness, flexibility, and patience' },
    { id: 'conscientiousness', label: 'Conscientiousness', description: 'Organization, diligence, perfectionism, and prudence' },
    { id: 'openness', label: 'Openness to Experience', description: 'Aesthetic appreciation, inquisitiveness, creativity, and unconventionality' }
];

export default function PersonalityStep() {
    const { onboardingData, updateData, setIsStepValid } = useOnboarding();
    const [scores, setScores] = useState(onboardingData.personality || {});

    // Initialize with default values if not present (optional, or force user to pick)
    // Here we start empty or with existing data

    useEffect(() => {
        // Validate that all traits have been rated
        const allRated = TRAITS.every(trait => scores[trait.id] !== undefined);
        setIsStepValid(allRated);
    }, [scores, setIsStepValid]);

    const handleSliderChange = (traitId, value) => {
        const newScores = { ...scores, [traitId]: parseInt(value) };
        setScores(newScores);
        updateData({ personality: newScores });
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TRAITS.map((trait) => (
                    <Card key={trait.id} className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <Label className="text-lg font-semibold text-gray-800">{trait.label}</Label>
                            <p className="text-sm text-gray-500 mt-1">{trait.description}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-xs font-medium text-gray-400">Low</span>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={scores[trait.id] || 5}
                                onChange={(e) => handleSliderChange(trait.id, e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <span className="text-xs font-medium text-gray-400">High</span>
                        </div>
                        <div className="text-center mt-2 text-primary font-bold">
                            {scores[trait.id] || 5}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
                <p><strong>Why do we ask this?</strong> Understanding your personality helps us tailor eco-friendly challenges that match your natural style—whether you prefer social competition vs. quiet reflection, or bold changes vs. gradual steps.</p>
            </div>
        </div>
    );
}
