import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import SimulatorHeader from './SimulatorHeader';
import SimulatorControls from './SimulatorControls';
import SimulatorResults from './SimulatorResults';

export const SimulatorTool = () => {
    const BASE_FOOTPRINT = 12000;

    const [transportReduction, setTransportReduction] = useState(0);
    const [dietPlantBased, setDietPlantBased] = useState(0);
    const [energyEfficiency, setEnergyEfficiency] = useState(0);

    const transportSavings = (BASE_FOOTPRINT * 0.30) * (transportReduction / 100);
    const dietSavings = (BASE_FOOTPRINT * 0.25) * (dietPlantBased / 100);
    const energySavings = (BASE_FOOTPRINT * 0.25) * (energyEfficiency / 100);

    const totalSavings = transportSavings + dietSavings + energySavings;
    const savings = Math.round(totalSavings);
    const projectedFootprint = Math.round(BASE_FOOTPRINT - totalSavings);

    return (
        <div className="relative">
            <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-emerald-300/60 via-teal-300/60 to-amber-300/60 blur-xl" />
            <Card className="relative w-full border border-white/70 bg-white/70 shadow-2xl backdrop-blur-xl overflow-hidden">
                <div className="p-6 sm:p-8 space-y-8">
                    <SimulatorHeader />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <SimulatorControls
                            transportReduction={transportReduction}
                            setTransportReduction={setTransportReduction}
                            dietPlantBased={dietPlantBased}
                            setDietPlantBased={setDietPlantBased}
                            energyEfficiency={energyEfficiency}
                            setEnergyEfficiency={setEnergyEfficiency}
                        />

                        <SimulatorResults
                            projectedFootprint={projectedFootprint}
                            savings={savings}
                            baseFootprint={BASE_FOOTPRINT}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SimulatorTool;