"use client";
import React, { useState, useMemo } from "react";
import { Sliders, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { calculateCarbonFootprint, calculatePotentialSavings } from "@/lib/carbonCalculator";

/**
 * WhatIfSimulator — interactive sliders for instant CO₂ scenario preview.
 * @param {object} baseInputs - The current user inputs
 */
export default function WhatIfSimulator({ baseInputs = {} }) {
    const [carReduction, setCarReduction] = useState(0);
    const [ptIncrease, setPtIncrease] = useState(0);
    const [acReduction, setAcReduction] = useState(0);
    const [meatReduction, setMeatReduction] = useState(0);

    const scenarioInputs = useMemo(() => ({
        ...baseInputs,
        car: (baseInputs.car || 0) * (1 - carReduction / 100),
        public_transport: (baseInputs.public_transport || 0) + ptIncrease,
        ac_usage: Math.max(0, (baseInputs.ac_usage || 0) - acReduction),
        meat_meals: Math.max(0, (baseInputs.meat_meals || 0) - meatReduction),
    }), [baseInputs, carReduction, ptIncrease, acReduction, meatReduction]);

    const saving = useMemo(
        () => calculatePotentialSavings(baseInputs, scenarioInputs),
        [baseInputs, scenarioInputs]
    );

    const sliders = [
        {
            label: "Reduce Car Usage", unit: "%",
            value: carReduction, set: setCarReduction, min: 0, max: 100, step: 5,
            hint: `Save ~${((baseInputs.car || 0) * 30 * 0.25 * carReduction / 100).toFixed(1)} kg CO₂/mo`,
            color: "from-orange-400 to-amber-500",
        },
        {
            label: "Add Public Transport", unit: "km/day",
            value: ptIncrease, set: setPtIncrease, min: 0, max: 30, step: 1,
            hint: `Save ~${(ptIncrease * 30 * (0.25 - 0.08)).toFixed(1)} kg CO₂/mo vs car`,
            color: "from-blue-400 to-indigo-500",
        },
        {
            label: "Reduce AC Usage", unit: "hrs/day",
            value: acReduction, set: setAcReduction, min: 0, max: 8, step: 0.5,
            hint: `Save ~${(acReduction * 30 * 0.85).toFixed(1)} kg CO₂/mo`,
            color: "from-cyan-400 to-teal-500",
        },
        {
            label: "Reduce Meat Meals", unit: "meals/wk",
            value: meatReduction, set: setMeatReduction, min: 0, max: 14, step: 1,
            hint: `Save ~${(meatReduction * 4.33 * 3.5).toFixed(1)} kg CO₂/mo`,
            color: "from-rose-400 to-pink-500",
        },
    ];

    const savingPositive = saving.savings > 0;

    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-1.5">
                        <Sliders className="w-4 h-4 text-white" />
                    </div>
                    What-If Simulator
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
                <div className={`flex items-center justify-between rounded-xl p-4 ${savingPositive ? "bg-emerald-50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-2">
                        <Zap className={`w-5 h-5 ${savingPositive ? "text-emerald-600" : "text-gray-400"}`} />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Potential Monthly Saving</p>
                            <p className="text-xs text-gray-500">{saving.percentageReduction.toFixed(1)}% reduction from current</p>
                        </div>
                    </div>
                    <span className={`text-xl font-bold ${savingPositive ? "text-emerald-600" : "text-gray-400"}`}>
                        {savingPositive ? "-" : ""}{Math.abs(saving.savings).toFixed(1)} kg
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
