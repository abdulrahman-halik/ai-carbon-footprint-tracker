"use client";

import React from 'react';
import ScenarioSlider from './ScenarioSlider';

export default function SimulatorControls({ transportReduction, setTransportReduction, dietPlantBased, setDietPlantBased, energyEfficiency, setEnergyEfficiency }) {
    return (
        <div className="lg:col-span-7 space-y-8">
            <div className="bg-white/80 p-6 rounded-3xl border border-white/70 shadow-xl space-y-6 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
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
    );
}
