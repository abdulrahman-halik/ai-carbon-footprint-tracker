import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import TransportInput from './TransportInput';
import DietInput from './DietInput';
import emissionsService from '@/services/emissionsService';
import { CheckCircle2 } from "lucide-react";

export const ActivityLogWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [logData, setLogData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [impactData, setImpactData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = (data) => {
        setLogData(prev => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else handleSubmit();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Prepare payload according to backend EmissionCreate schema
            let category = "Transport";
            let subCategory = logData.mode;
            let value = parseFloat(getTransportCO2(logData.mode, logData.distance));

            if (logData.diet) {
                category = "Food";
                subCategory = logData.diet;
                value = parseFloat(getDietCO2(logData.diet));
            }

            const payload = {
                category: category,
                sub_category: subCategory,
                value: value,
                unit: "kg CO2e",
                description: `Logged via ActivityLogWizard: ${subCategory}`
            };

            const result = await emissionsService.logActivity(payload);

            // Adapt real backend response to component needs
            setImpactData({
                impact: result.value,
                totalUsed: 0 // Backend might not return the new total budget directly in this endpoint
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to log activity:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="glass-card w-full text-center py-10 px-6 animate-in fade-in zoom-in duration-500">
                {/* Success Icon */}
                <div className="mx-auto h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-emerald-100 shadow-lg ring-4 ring-emerald-50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Activity Logged!</h3>
                <p className="text-gray-500 mt-1 text-sm max-w-xs mx-auto">
                    Here's a breakdown of what was recorded and how it affects your carbon footprint.
                </p>

                {/* What was logged */}
                <div className="mt-6 text-left max-w-sm mx-auto space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">What you logged today</h4>

                    {/* Transport row */}
                    {logData.mode ? (
                        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                            <span className="text-2xl">{getTransportIcon(logData.mode)}</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-blue-800 capitalize">{logData.mode} travel</p>
                                <p className="text-xs text-blue-600">{logData.distance || 0} km travelled</p>
                            </div>
                            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                                ~{getTransportCO2(logData.mode, logData.distance)} kg CO₂
                            </span>
                        </div>
                    ) : null}

                    {/* Diet row */}
                    {logData.diet ? (
                        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                            <span className="text-2xl">{getDietIcon(logData.diet)}</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-emerald-800">{getDietLabel(logData.diet)} diet</p>
                                <p className="text-xs text-emerald-600">Today's meals</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                                ~{getDietCO2(logData.diet)} kg CO₂
                            </span>
                        </div>
                    ) : null}
                </div>

                {/* Impact summary */}
                {impactData && (
                    <div className="mt-6 max-w-sm mx-auto">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 text-left">Carbon footprint impact</h4>
                        <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-sm text-gray-500">Previous total</span>
                                <span className="text-sm font-semibold text-gray-700">
                                    {impactData.totalUsed - impactData.impact} kg CO₂e
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-sm text-gray-500">Added this session</span>
                                <span className="text-sm font-bold text-rose-600">+ {impactData.impact} kg CO₂e</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3 bg-white">
                                <span className="text-sm font-bold text-gray-800">New total</span>
                                <span className="text-base font-extrabold text-gray-900">{impactData.totalUsed} kg CO₂e</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setStep(1);
                            setLogData({});
                            setImpactData(null);
                        }}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Log Another
                    </button>
                </div>
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
                    disabled={step === 1 || isSubmitting}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors ${step === 1 || isSubmitting
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-8 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all min-w-[140px]"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        step === 2 ? 'Finish Logging' : 'Next Step'
                    )}
                </button>
            </div>
        </div>
    );
};

// --- Helper functions for labels / CO₂ estimates ---

const getTransportIcon = (type) => {
    switch (type) {
        case 'car': return '🚗';
        case 'bus': return '🚌';
        case 'train': return '🚆';
        case 'walk': return '🚶';
        default: return '🚗';
    }
};

/** Estimated kg CO₂ per km (simplified emission factors) */
const getTransportCO2 = (mode, distance = 0) => {
    const factors = { car: 0.17, bus: 0.03, train: 0.04, walk: 0 };
    return ((factors[mode] || 0.17) * distance).toFixed(2);
};

const getDietIcon = (diet) => {
    switch (diet) {
        case 'meat-heavy': return '🥩';
        case 'omnivore': return '🍗';
        case 'vegetarian': return '🥗';
        case 'vegan': return '🥦';
        default: return '🍽️';
    }
};

const getDietLabel = (diet) => {
    const labels = { 'meat-heavy': 'Meat heavy', omnivore: 'Omnivore', vegetarian: 'Vegetarian', vegan: 'Vegan' };
    return labels[diet] || diet;
};

/** Estimated daily kg CO₂ by diet type */
const getDietCO2 = (diet) => {
    const factors = { 'meat-heavy': 7.2, omnivore: 4.7, vegetarian: 3.8, vegan: 2.9 };
    return (factors[diet] || 4.7).toFixed(1);
};

export default ActivityLogWizard;
