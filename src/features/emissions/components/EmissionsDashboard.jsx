"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calculator, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import {
    calculateCarbonFootprint, getFootprintFeedback,
    generateAIInsights, getComparisonData, getUserLevel
} from '@/lib/carbonCalculator';

import EmissionsInputForm from "./EmissionsInputForm";
import EmissionsSummaryCards from "./EmissionsSummaryCards";
import EmissionsBreakdownTable from "./EmissionsBreakdownTable";
import AIInsightsPanel from "./AIInsightsPanel";
import ComparisonMetrics from "./ComparisonMetrics";
import WhatIfSimulator from "./WhatIfSimulator";
import GamificationBadge from "./GamificationBadge";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";

const DEFAULT_INPUTS = {
    // Energy
    electricity: 300, lpg: 10, water: 150, energy_source: 'grid',
    // Transport
    car: 20, bike: 5, public_transport: 15, air_travel: 2000, waste: 5,
    // Food
    diet_type: 'mixed', meat_meals: 5, dairy_portions: 7, food_waste: 2,
    // Home
    house_type: 'apartment', household_size: 3, ac_usage: 3, has_solar: 0,
    // Shopping
    clothing: 2, electronics: 0, online_orders: 4,
};

export default function EmissionsDashboard() {
    const [inputs, setInputs] = useState(DEFAULT_INPUTS);
    const [results, setResults] = useState(calculateCarbonFootprint(DEFAULT_INPUTS));
    const [loading, setLoading] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const handleInputChange = useCallback((id, value) => {
        setInputs(prev => ({ ...prev, [id]: typeof value === 'string' ? (parseFloat(value) || value) : value }));
    }, []);

    const handleCalculate = useCallback(async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 300));
        setResults(calculateCarbonFootprint(inputs));
        setLoading(false);
    }, [inputs]);

    // Auto-recalculate on input change (debounced)
    useEffect(() => {
        const id = setTimeout(() => {
            setResults(calculateCarbonFootprint(inputs));
        }, 400);
        return () => clearTimeout(id);
    }, [inputs]);

    if (!results) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    const feedback = getFootprintFeedback(results.totalFootprint);
    const { insights, recommendations } = generateAIInsights(results, inputs);
    const comparison = getComparisonData(results.totalFootprint);
    const levelData = getUserLevel(results.totalFootprint);

    const impactData = {
        labels: results.breakdown.filter(i => i.value > 0).sort((a, b) => b.value - a.value).slice(0, 6).map(i => i.category),
        datasets: [{
            label: "Emissions by Category",
            data: results.breakdown.filter(i => i.value > 0).sort((a, b) => b.value - a.value).slice(0, 6).map(i => i.value),
            backgroundColor: results.breakdown.filter(i => i.value > 0).sort((a, b) => b.value - a.value).slice(0, 6).map(i => i.color),
            hoverOffset: 4, borderWidth: 0,
        }],
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                     Emissions Dashboard
                    </h2>
                    <p className="text-gray-500 text-sm">AI-powered carbon footprint advisor</p>
                </div>
                <Button onClick={() => setShowInputs(!showInputs)} variant="outline" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    {showInputs ? 'Hide' : 'Update'} Data
                </Button>
            </div>

            {/* Collapsible input form */}
            {showInputs && (
                <EmissionsInputForm
                    inputs={inputs} loading={loading}
                    onChange={handleInputChange} onCalculate={handleCalculate}
                />
            )}

            {/* Summary + Gamification row */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                    <EmissionsSummaryCards results={results} feedback={feedback} />
                </div>
                <div>
                    <GamificationBadge levelData={levelData} streakDays={5} />
                </div>
            </div>

            {/* AI Insights */}
            <AIInsightsPanel insights={insights} recommendations={recommendations} />

            {/* Comparison */}
            <ComparisonMetrics
                totalFootprint={results.totalFootprint}
                lastMonth={comparison.lastMonth}
                average={comparison.average}
                forecast={comparison.forecast}
            />

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card bg-white border-none shadow-sm p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Trends</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Actual + Forecast</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">↘ -8%</span>
                    </div>
                    <div className="h-[280px] w-full">
                        <EmissionSparkline forecast={comparison.forecast} />
                    </div>
                </div>
                <div className="glass-card bg-white border-none shadow-sm p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Impact Breakdown</h3>
                        <p className="text-sm text-gray-400">Top emission sources</p>
                    </div>
                    <div className="h-[280px] w-full">
                        <ImpactVisualizer data={impactData} breakdown={results.breakdown} total={results.totalFootprint} />
                    </div>
                </div>
            </div>

            {/* What-If Simulator */}
            <WhatIfSimulator baseInputs={inputs} />

            {/* Breakdown table */}
            <EmissionsBreakdownTable breakdown={results.breakdown} />
        </div>
    );
}
