"use client";

import { useOnboarding } from "./OnboardingProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/Icon";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

/**
 * WizardLayout
 * 
 * A wrapper component for the onboarding wizard.
 * Handles the progress bar, step visualization, and navigation buttons.
 * 
 * @param {Object} props
 * @param {string} props.title - Current step title
 * @param {string} props.subtitle - Current step subtitle
 * @param {React.ReactNode} props.children - The step content
 */
export default function WizardLayout({ title, subtitle, children }) {
    const { currentStep, totalSteps, nextStep, prevStep, isStepValid } = useOnboarding();

    // Calculate progress percentage
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300">

            {/* Top Header / Progress Area */}
            <div className="w-full max-w-2xl mb-8 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>

                {/* Progress Bar Track */}
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    {/* Progress Bar Fill */}
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Card Content */}
            <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-300">
                <div className="p-6 md:p-10">

                    {/* Header Text */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
                        {subtitle && <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[300px]">
                        {children}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={currentStep === 1 ? "invisible" : ""}
                        >
                            <Icon icon={ChevronLeft} className="mr-2" size={20} />
                            Back
                        </Button>

                        <Button
                            onClick={nextStep}
                            disabled={!isStepValid}
                            className="px-8"
                            size="lg"
                        >
                            {currentStep === totalSteps ? "Finish" : "Next"}
                            {currentStep !== totalSteps && (
                                <Icon icon={ChevronRight} className="ml-2" size={20} />
                            )}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Footer / Privacy Note (Optional) */}
            <div className="mt-8 text-center text-xs text-gray-400">
                <p>Your answers help us personalize your experience. Data is stored securely.</p>
            </div>
        </div>
    );
}
