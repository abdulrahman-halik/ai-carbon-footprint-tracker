import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import TransportInput from './TransportInput';
import DietInput from './DietInput';

export const ActivityLogWizard = () => {
    const [step, setStep] = useState(1);
    const [logData, setLogData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleUpdate = (data) => {
        setLogData(prev => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else handleSubmit();
    };

    const handleSubmit = () => {
        // Here you would typically save to backend
        console.log("Submitting log:", logData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setStep(1);
            setLogData({});
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="glass-card w-full text-center py-16 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto h-20 w-20 bg-emerald-100/50 rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-emerald-50">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Activity Logged!</h3>
                <p className="text-gray-500 mt-2 text-lg">Your carbon footprint has been updated.</p>
            </div>
        );
    }

    return (
        <div className="glass-card w-full p-8 md:p-10">
            {/* Progress Header */}
            <div className="mb-10">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-3 tracking-wide uppercase">
                    <span>Step {step} of 2</span>
                    <span className="text-emerald-600">{Math.round((step / 2) * 100)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200/50">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 ease-out shadow-lg"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>
            </div>

            <div className="min-h-[250px] transition-all duration-300">
                {step === 1 && <TransportInput onUpdate={handleUpdate} />}
                {step === 2 && <DietInput onUpdate={handleUpdate} />}
            </div>

            <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors ${step === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                    {step === 2 ? 'Finish Logging' : 'Next Step'}
                </button>
            </div>
        </div>
    );
};

export default ActivityLogWizard;
