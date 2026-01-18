"use client";

import { createContext, useContext, useState, useEffect } from "react";

const OnboardingContext = createContext();

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
}

export function OnboardingProvider({ children, initialSteps = 4 }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(initialSteps);
    const [onboardingData, setOnboardingData] = useState({});
    const [isStepValid, setIsStepValid] = useState(true); // Control "Next" button state
    const [direction, setDirection] = useState(0); // For animation direction: 1 (next), -1 (back)

    // Load progress from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("onboarding_data");
        const savedStep = localStorage.getItem("onboarding_step");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (savedData) setOnboardingData(JSON.parse(savedData));
        if (savedStep) setCurrentStep(Number(savedStep));
    }, []);

    // Save progress on change
    useEffect(() => {
        localStorage.setItem("onboarding_data", JSON.stringify(onboardingData));
        localStorage.setItem("onboarding_step", currentStep.toString());
    }, [onboardingData, currentStep]);

    const updateData = (newData) => {
        setOnboardingData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setDirection(1);
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
        }
    };

    const goToStep = (step) => {
        if (step >= 1 && step <= totalSteps) {
            setDirection(step > currentStep ? 1 : -1);
            setCurrentStep(step);
        }
    }

    return (
        <OnboardingContext.Provider
            value={{
                currentStep,
                totalSteps,
                setTotalSteps,
                onboardingData,
                updateData,
                nextStep,
                prevStep,
                goToStep,
                isStepValid,
                setIsStepValid,
                direction
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}
