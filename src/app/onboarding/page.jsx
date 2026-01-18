"use client";

import { OnboardingProvider, useOnboarding } from "@/features/onboarding/OnboardingProvider";
import WizardLayout from "@/features/onboarding/WizardLayout";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

// Placeholder configuration for the wizard steps
// In Phase 7, we will replace the 'component' placeholders with actual form components
const WIZARD_STEPS = [
    {
        id: "welcome",
        title: "Welcome to Your Eco Journey",
        subtitle: "Let's create your personalized profile in just a few steps.",
        description: "We'll ask a few questions to understand your lifestyle and preferences. This helps us tailor recommendations just for you."
    },
    {
        id: "personality",
        title: "Personality Assessment",
        subtitle: "How do you view sustainability?",
        description: "Placeholder for HEXACO Assessment (Phase 7)"
    },
    {
        id: "behavior",
        title: "Behavioral Stage",
        subtitle: "Where are you on your journey?",
        description: "Placeholder for Transtheoretical Model Stage Selection (Phase 7)"
    },
    {
        id: "complete",
        title: "All Set!",
        subtitle: "Your profile has been created.",
        description: "You are now ready to access your dashboard and start tracking your impact."
    }
];

import PersonalityStep from "@/features/onboarding/PersonalityStep";
import BehaviorStageStep from "@/features/onboarding/BehaviorStageStep";
import { Card } from "@/components/ui/Card";

function WizardContent() {
    const { currentStep } = useOnboarding();

    // Safety check
    const stepIndex = currentStep - 1;
    const step = WIZARD_STEPS[stepIndex] || WIZARD_STEPS[0];

    // Render specific component based on step ID
    const renderStepContent = () => {
        switch (step.id) {
            case "personality":
                return <PersonalityStep />;
            case "behavior":
                return <BehaviorStageStep />;
            case "welcome":
                return (
                    <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 bg-primary-50 rounded-full">
                            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div className="text-center max-w-md">
                            <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                );
            case "complete":
                return (
                    <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 bg-green-50 rounded-full">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="text-center max-w-md">
                            <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                            <Button className="mt-8 w-full" onClick={() => window.location.href = '/dashboard'}>
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Step content coming soon...</p>
                    </div>
                );
        }
    };

    return (
        <WizardLayout title={step.title} subtitle={step.subtitle}>
            {renderStepContent()}
        </WizardLayout>
    );
}

export default function OnboardingPage() {
    return (
        <OnboardingProvider initialSteps={WIZARD_STEPS.length}>
            <WizardContent />
        </OnboardingProvider>
    );
}
