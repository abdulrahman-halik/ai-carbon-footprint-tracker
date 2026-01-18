import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import ScenarioSlider from './ScenarioSlider';

export const SimulatorTool = () => {
    // Base footprint in kg CO2e
    const BASE_FOOTPRINT = 12000;

    // Simulation parameters (percentage reduction)
    const [transportReduction, setTransportReduction] = useState(0);
    const [dietPlantBased, setDietPlantBased] = useState(0);
    const [energyEfficiency, setEnergyEfficiency] = useState(0);

    // Dynamic calculation logic (Derived State)
    // Simple mock model
    // Transport accounts for ~30%, Diet ~25%, Energy ~25% of total
    const transportSavings = (BASE_FOOTPRINT * 0.30) * (transportReduction / 100);
    const dietSavings = (BASE_FOOTPRINT * 0.25) * (dietPlantBased / 100);
    const energySavings = (BASE_FOOTPRINT * 0.25) * (energyEfficiency / 100);

    const totalSavings = transportSavings + dietSavings + energySavings;
    const savings = Math.round(totalSavings);
    const projectedFootprint = Math.round(BASE_FOOTPRINT - totalSavings);

    return (
        <Card className="w-full shadow-xl border-0 ring-1 ring-gray-200/50 bg-white/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 sm:p-8 space-y-8">
                <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Future Impact Simulator</h3>
                    <p className="text-gray-500 mt-2 max-w-2xl">
                        Adjust your lifestyle choices below to see their potential impact on your annual carbon emissions.
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
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden text-center">
                            {/* Decorative background circles */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

                            <h4 className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-6">Projected Annual Footprint</h4>

                            <div className="relative inline-flex items-center justify-center">
                                <span className="text-5xl font-black tracking-tight">{projectedFootprint.toLocaleString()}</span>
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
                                    Adjust the sliders to see your savings.
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
