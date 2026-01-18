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

function WizardContent() {
    const { currentStep } = useOnboarding();

    // Safety check
    const stepIndex = currentStep - 1;
    const step = WIZARD_STEPS[stepIndex] || WIZARD_STEPS[0];

    return (
        <WizardLayout title={step.title} subtitle={step.subtitle}>
            <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-primary-50 rounded-full">
                    {/* Placeholder Icon */}
                    <svg
                        className="w-16 h-16 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="text-center max-w-md">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {step.description}
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        Step ID: {step.id}
                    </p>
                </div>

                {/* Debug Info (Optional, can be removed) */}
                {/* <div className="p-4 bg-gray-100 rounded text-xs text-left w-full mt-8">
                    <pre>Current Step: {currentStep}</pre>
                </div> */}
            </div>
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
