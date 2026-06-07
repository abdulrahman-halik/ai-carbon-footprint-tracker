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
            let category = "Transport";
            let subCategory = logData.mode;
            let value = parseFloat(getTransportCO2(logData.mode, logData.distance));

            if (logData.diet) {
                category = "Food";
                subCategory = logData.diet;
                value = parseFloat(getDietCO2(logData.diet));
            }

            const payload = {
                category,
                sub_category: subCategory,
                value,
                unit: "kg CO2e",
                description: `Logged via ActivityLogWizard: ${subCategory}`
            };

            const result = await emissionsService.logActivity(payload);

            setImpactData({
                impact: result.value,
                totalUsed: 0
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
                <div className="mx-auto h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-emerald-100 shadow-lg ring-4 ring-emerald-50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">Activity Logged!</h3>

                <p className="text-gray-500 mt-1 text-sm max-w-xs mx-auto">
                    {"Here's a breakdown of what was recorded and how it affects your carbon footprint."}
                </p>

                {/* rest of your code unchanged */}
            </div>
        );
    }

    return (
        <div className="glass-card w-full p-8 md:p-10">
            {/* rest unchanged */}
        </div>
    );
};

export default ActivityLogWizard;