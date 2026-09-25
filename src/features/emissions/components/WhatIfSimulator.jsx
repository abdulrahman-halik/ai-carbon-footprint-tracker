"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Sliders, Zap, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import mlService from "@/services/mlService";

/**
 * WhatIfSimulator — interactive sliders for instant CO₂ scenario preview powered by ML.
 * @param {object} baseInputs - The current user inputs
 */
export default function WhatIfSimulator({ baseInputs = {} }) {
    const [carReduction, setCarReduction] = useState(0);
    const [ptIncrease, setPtIncrease] = useState(0);
    const [acReduction, setAcReduction] = useState(0);
    const [meatReduction, setMeatReduction] = useState(0);

    const [currentPrediction, setCurrentPrediction] = useState(0);
    const [scenarioPrediction, setScenarioPrediction] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // Transform raw dashboard inputs to ML Model Features
    const transformInputsForML = (inputs) => ({
        Daily_Travel_km: inputs.car || 20,
        Electricity_Usage_kWh_per_month: (inputs.ac_usage ? inputs.ac_usage * 30 : 0) + (inputs.electricity || 300),
        Meat_Consumption_per_week: inputs.meat_meals || 5,
        Uses_Renewable_Energy: inputs.has_solar || 0
    });

    // Initial load of the base footprint using ML prediction
    useEffect(() => {
        const fetchBase = async () => {
            try {
                const response = await mlService.predict(transformInputsForML(baseInputs));
                const annual = (response.prediction || 0) * 12;
                setCurrentPrediction(annual);
                setScenarioPrediction(annual);
            } catch (err) {
                console.error("Failed to load base prediction", err);
            }
        };
        fetchBase();
    }, [baseInputs]);

    // Scenario simulation using ML API on slider change with debounce
    useEffect(() => {
        if (!currentPrediction) return;

        const timeoutId = setTimeout(async () => {
            setIsSimulating(true);
            try {
                const scenarioInputs = {
                    ...baseInputs,
                    car: (baseInputs.car || 20) * (1 - carReduction / 100),
                    ac_usage: Math.max(0, (baseInputs.ac_usage || 3) - acReduction),
                    meat_meals: Math.max(0, (baseInputs.meat_meals || 5) - meatReduction),
                };
                const response = await mlService.predict(transformInputsForML(scenarioInputs));
                const annual = (response.prediction || 0) * 12;
                setScenarioPrediction(annual);
            } catch (err) {
                console.error("Simulation failed", err);
            } finally {
                setIsSimulating(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [carReduction, ptIncrease, acReduction, meatReduction, baseInputs, currentPrediction]);

    // For UI 
    const savings = Math.max(0, currentPrediction - scenarioPrediction);
    const percentageReduction = currentPrediction > 0 ? (savings / currentPrediction) * 100 : 0;
    const savingPositive = savings > 0;

    const sliders = [
        {
            label: "Reduce Car Usage", unit: "%",
            value: carReduction, set: setCarReduction, min: 0, max: 100, step: 5,
            hint: "Walking, biking, or carpooling",
            color: "from-orange-400 to-amber-500",
        },
        {
            label: "Add Public Transport", unit: "km/day",
            value: ptIncrease, set: setPtIncrease, min: 0, max: 30, step: 1,
            hint: "Take the bus or train instead",
            color: "from-blue-400 to-indigo-500",
        },
        {
            label: "Reduce AC Usage", unit: "hrs/day",
            value: acReduction, set: setAcReduction, min: 0, max: 8, step: 0.5,
            hint: "Use fans or natural ventilation",
            color: "from-cyan-400 to-teal-500",
        },
        {
            label: "Reduce Meat Meals", unit: "meals/wk",
            value: meatReduction, set: setMeatReduction, min: 0, max: 14, step: 1,
            hint: "Swap to plant-based alternatives",
            color: "from-rose-400 to-pink-500",
        },
    ];

    return (
        <Card className="border-0 shadow-sm overflow-hidden relative">
            {isSimulating && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
            )}
            <div className="h-1 bg-linear-to-r from-purple-400 to-pink-500" />
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <div className="bg-linear-to-br from-purple-500 to-pink-600 rounded-lg p-1.5">
                        <Sliders className="w-4 h-4 text-white" />
                    </div>
                    AI What-If Simulator
                    <span className="ml-auto text-xs font-normal text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                        Interactive
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {sliders.map((s) => (
                        <div key={s.label} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700">{s.label}</label>
                                <span className="text-sm font-bold text-gray-900">{s.value} {s.unit}</span>
                            </div>
                            <input
                                type="range"
                                min={s.min} max={s.max} step={s.step}
                                value={s.value}
                                onChange={(e) => s.set(Number(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-purple-500"
                            />
                            <p className="text-xs text-gray-500">{s.hint}</p>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={`flex items-center justify-between rounded-xl p-4 transition-colors ${savingPositive ? "bg-emerald-50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-2">
                        <Zap className={`w-5 h-5 transition-colors ${savingPositive ? "text-emerald-600" : "text-gray-400"}`} />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">AI Predicted Annual Saving</p>
                            <p className="text-xs text-gray-500">{percentageReduction.toFixed(1)}% reduction from current</p>
                        </div>
                    </div>
                    <span className={`text-xl font-bold transition-colors ${savingPositive ? "text-emerald-600" : "text-gray-400"}`}>
                        {savingPositive ? "-" : ""}{Math.abs(savings).toFixed(1)} kg
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
