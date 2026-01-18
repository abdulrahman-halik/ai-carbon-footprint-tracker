import { useState, useEffect } from 'react';
import { useOnboarding } from './OnboardingProvider';
import { Card } from '@/components/ui/Card';
import { Check } from 'lucide-react';
import Icon from '@/components/Icon';

const STAGES = [
    {
        id: 'precontemplation',
        label: 'Not Interested Yet',
        description: 'I do not intend to take action in the foreseeable future (next 6 months).',
        color: 'gray'
    },
    {
        id: 'contemplation',
        label: 'Thinking About It',
        description: 'I intend to start being more eco-friendly in the next 6 months.',
        color: 'blue'
    },
    {
        id: 'preparation',
        label: 'Getting Ready',
        description: 'I am ready to take action in the next 30 days and have taken some small steps.',
        color: 'yellow'
    },
    {
        id: 'action',
        label: 'Taking Action',
        description: 'I have made specific changes in my lifestyle within the last 6 months.',
        color: 'green'
    },
    {
        id: 'maintenance',
        label: 'Maintaining Change',
        description: 'I have been sustaining these changes for more than 6 months.',
        color: 'purple'
    }
];

export default function BehaviorStageStep() {
    const { onboardingData, updateData, setIsStepValid } = useOnboarding();
    const [selectedStage, setSelectedStage] = useState(onboardingData.behaviorStage || null);

    useEffect(() => {
        setIsStepValid(!!selectedStage);
    }, [selectedStage, setIsStepValid]);

    const handleSelect = (stageId) => {
        setSelectedStage(stageId);
        updateData({ behaviorStage: stageId });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="text-center mb-6">
                <p className="text-lg text-gray-600">Which statement best describes your current approach to sustainable living?</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {STAGES.map((stage) => {
                    const isSelected = selectedStage === stage.id;
                    return (
                        <Card
                            key={stage.id}
                            onClick={() => handleSelect(stage.id)}
                            className={`
                                relative p-5 cursor-pointer transition-all duration-200 border-2
                                ${isSelected
                                    ? 'border-primary bg-green-50 shadow-md transform scale-[1.02]'
                                    : 'border-transparent bg-white hover:border-gray-200 hover:bg-gray-50 shadow-sm'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-gray-800'}`}>
                                        {stage.label}
                                    </h3>
                                    <p className="text-gray-500 mt-1">{stage.description}</p>
                                </div>

                                <div className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}
                                `}>
                                    {isSelected && <Icon icon={Check} size={14} className="text-white" />}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
