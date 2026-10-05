import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import ScenarioSlider from './ScenarioSlider';
import mlService from '@/services/mlService';
import dashboardService from '@/services/dashboardService';

// Default features fallback expected by the ML model
const FALLBACK_FEATURES = {
    Daily_Travel_km: 20,
    Electricity_Usage_kWh_per_month: 300,
    Meat_Consumption_per_week: 5,
};

export const SimulatorTool = () => {
    const [baseFeatures, setBaseFeatures] = useState(FALLBACK_FEATURES);
    const [baseFootprint, setBaseFootprint] = useState(12000);
    const [projectedFootprint, setProjectedFootprint] = useState(12000);
    const [isLoading, setIsLoading] = useState(true);
    const [isSimulating, setIsSimulating] = useState(false);

    // Simulation parameters (percentage reduction)
    const [transportReduction, setTransportReduction] = useState(0);
    const [dietPlantBased, setDietPlantBased] = useState(0);
    const [energyEfficiency, setEnergyEfficiency] = useState(0);

    // Initial load: get real stats or base ML prediction
    useEffect(() => {
        const fetchBase = async () => {
            try {
                let currentFeatures = FALLBACK_FEATURES;
                try {
                    const dynamicFeatures = await mlService.getBaseFeatures();
                    currentFeatures = { ...FALLBACK_FEATURES, ...dynamicFeatures };
                } catch (featErr) {
                    console.warn("Could not load dynamic base features, using fallback", featErr);
                }
                setBaseFeatures(currentFeatures);

                const response = await mlService.predict(currentFeatures);
                const annualPredicted = (response.prediction || 1000) * 12;
                setBaseFootprint(annualPredicted);
                setProjectedFootprint(annualPredicted);
            } catch (error) {
                console.error("Failed to load base prediction:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBase();
    }, []);

    // ML calculation effect with debounce
    useEffect(() => {
        if (isLoading) return;

        const timeoutId = setTimeout(async () => {
            setIsSimulating(true);
            try {
                // Map slider reductions to real ML features
                const adjustedFeatures = {
                    ...baseFeatures,
                    Daily_Travel_km: baseFeatures.Daily_Travel_km * (1 - transportReduction / 100),
                    Meat_Consumption_per_week: baseFeatures.Meat_Consumption_per_week * (1 - dietPlantBased / 100),
                    Electricity_Usage_kWh_per_month: baseFeatures.Electricity_Usage_kWh_per_month * (1 - energyEfficiency / 100),
                };
                const result = await mlService.predict(adjustedFeatures);
                const annualSimulated = (result.prediction || 1000) * 12;
                setProjectedFootprint(annualSimulated);
            } catch (error) {
                console.error("Simulation failed:", error);
            } finally {
                setIsSimulating(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [transportReduction, dietPlantBased, energyEfficiency, isLoading, baseFeatures]);

    const baseSavings = Math.round(baseFootprint - projectedFootprint);
    const savings = Math.max(0, baseSavings);
    const displayProjected = Math.round(projectedFootprint);

    if (isLoading) {
        return (
            <Card className="w-full shadow-xl border-0 ring-1 ring-gray-200/50 bg-white/50 backdrop-blur-sm p-6 sm:p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-xl border-0 ring-1 ring-gray-200/50 bg-white/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 sm:p-8 space-y-8">
                <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Future Impact Simulator</h3>
                    <p className="text-gray-500 mt-2 max-w-2xl">
                        Adjust your lifestyle choices below to see their potential impact on your annual carbon emissions, powered by our AI predictive model.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Controls Column */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 hover:shadow-md transition-shadow duration-300">
                            <ScenarioSlider
                                label="Reduce Car Travel"
                                value={transportReduction}
                                min={0}
                                max={100}
                                unit="%"
                                icon="🚗"
                                description="Walk, bike, or take public transit more often."
                                onChange={setTransportReduction}
                            />
                            <div className="h-px bg-gray-50" />
                            <ScenarioSlider
                                label="Plant-Based Meals"
                                value={dietPlantBased}
                                min={0}
                                max={100}
                                unit="%"
                                icon="🥗"
                                description="Incorporate more vegetarian or vegan meals."
                                onChange={setDietPlantBased}
                            />
                            <div className="h-px bg-gray-50" />
                            <ScenarioSlider
                                label="Home Energy Efficiency"
                                value={energyEfficiency}
                                min={0}
                                max={100}
                                unit="%"
                                icon="🏠"
                                description="Use smart stats, LED bulbs, and better insulation."
                                onChange={setEnergyEfficiency}
                            />
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="lg:col-span-5">
                        <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden text-center transition-all">
                            {isSimulating && (
                                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-3xl">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
                                </div>
                            )}

                            {/* Decorative background circles */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

                            <h4 className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-6">AI Projected Annual Footprint</h4>

                            <div className="relative inline-flex items-center justify-center">
                                <span className="text-5xl font-black tracking-tight">{displayProjected.toLocaleString()}</span>
                            </div>
                            <span className="block text-blue-200 mt-1 mb-8 text-sm">kg CO2e / year</span>

                            {savings > 0 ? (
                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-fade-in">
                                    <p className="text-blue-50 font-medium text-sm mb-1">Total Savings</p>
                                    <p className="text-3xl font-bold text-green-300">-{savings.toLocaleString()} kg</p>
                                    <p className="text-xs text-blue-100 mt-2 opacity-90">
                                        Equivalent to planting <span className="font-bold text-white">{Math.ceil(savings / 20)}</span> trees! 🌲
                                    </p>
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl border border-white/10 text-blue-200 text-sm">
                                    Adjust the sliders to see your AI-predicted savings.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SimulatorTool;