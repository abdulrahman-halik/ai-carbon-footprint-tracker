import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Zap, Car, Bike, Train, Plane, Trash2, Droplets, Calculator, TrendingDown } from 'lucide-react';
import { calculateCarbonFootprint, calculatePotentialSavings } from '@/lib/carbonCalculator';

const DEFAULT_CURRENT = {
    electricity: 300, lpg: 10, water: 150, car: 20, bike: 5, public_transport: 15, air_travel: 2000, waste: 5
};

const DEFAULT_TARGET = {
    electricity: 250, lpg: 8, water: 120, car: 10, bike: 10, public_transport: 20, air_travel: 1000, waste: 3
};

const InputRow = ({ label, value, onChange, unit, id }) => (
    <div className="flex items-center gap-3">
        <Label className="w-20 text-sm">{label}</Label>
        <Input type="number" value={value} onChange={(e) => onChange(id, e.target.value)} className="w-24 h-8 text-sm" min="0" />
        <span className="text-xs text-gray-500">{unit}</span>
    </div>
);

const ResultCards = ({ results }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <CardHeader>
                <CardTitle className="text-lg">Current Footprint</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{results.current.totalFootprint.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">kg CO₂e / month</div>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm"><span>Energy</span><span className="font-medium">{results.current.categories.energy.toFixed(1)} kg</span></div>
                    <div className="flex justify-between text-sm"><span>Transport</span><span className="font-medium">{results.current.categories.transport.toFixed(1)} kg</span></div>
                    <div className="flex justify-between text-sm"><span>Waste</span><span className="font-medium">{results.current.categories.waste.toFixed(1)} kg</span></div>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg border-0 ring-1 ring-green-200/50 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><TrendingDown className="w-5 h-5 text-green-600" />Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">-{results.savings.savings.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">kg CO₂e / month</div>
                    <div className="text-lg font-medium text-green-700 mt-2">{results.savings.percentageReduction.toFixed(1)}% reduction</div>
                </div>
                <div className="mt-6 p-4 bg-white/60 rounded-lg">
                    <div className="text-sm text-gray-700"><strong>New footprint:</strong> {results.savings.targetFootprint.toFixed(1)} kg CO₂e/month</div>
                    <div className="text-xs text-gray-500 mt-1">Equivalent to removing {Math.round(results.savings.savings / 20)} cars from the road!</div>
                </div>
            </CardContent>
        </Card>
    </div>
);

export const SimulatorTool = () => {
    // Current and target lifestyle inputs
    const [currentInputs, setCurrentInputs] = useState(DEFAULT_CURRENT);
    const [targetInputs, setTargetInputs] = useState(DEFAULT_TARGET);

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputSections = [
        {
            title: "Energy Consumption",
            icon: Zap,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            inputs: [
                { id: 'electricity', label: 'Electricity', unit: 'kWh/month' },
                { id: 'lpg', label: 'LPG', unit: 'kg/month' },
                { id: 'water', label: 'Water', unit: 'litres/day' }
            ]
        },
        {
            title: "Transportation",
            icon: Car,
            color: "text-green-600",
            bgColor: "bg-green-50",
            inputs: [
                { id: 'car', label: 'Car', unit: 'km/day' },
                { id: 'bike', label: 'Bike', unit: 'km/day' },
                { id: 'public_transport', label: 'Public Transport', unit: 'km/day' },
                { id: 'air_travel', label: 'Air Travel', unit: 'km/year' }
            ]
        },
        {
            title: "Waste",
            icon: Trash2,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            inputs: [
                { id: 'waste', label: 'Waste', unit: 'kg/week' }
            ]
        }
    ];

    const InputCard = ({ title, headerIcon, headerBg, type }) => (
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${headerBg} rounded-full flex items-center justify-center`}>
                        {headerIcon}
                    </div>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {inputSections.map((section, sectionIndex) => {
                    const Icon = section.icon;
                    return (
                        <div key={sectionIndex} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded ${section.bgColor}`}>
                                    <Icon className={`w-4 h-4 ${section.color}`} />
                                </div>
                                <h4 className="font-medium text-gray-900">{section.title}</h4>
                            </div>
                            <div className="space-y-3 pl-8">
                                {section.inputs.map((input) => (
                                    <InputRow
                                        key={input.id}
                                        id={input.id}
                                        label={input.label}
                                        value={type === 'current' ? currentInputs[input.id] : targetInputs[input.id]}
                                        onChange={(id, v) => handleInputChange(type, id, v)}
                                        unit={input.unit}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );

    const handleInputChange = (type, id, value) => {
        const inputs = type === 'current' ? currentInputs : targetInputs;
        const setInputs = type === 'current' ? setCurrentInputs : setTargetInputs;

        setInputs(prev => ({
            ...prev,
            [id]: parseFloat(value) || 0
        }));
    };

    const handleSimulate = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const currentFootprint = calculateCarbonFootprint(currentInputs);
        const savings = calculatePotentialSavings(currentInputs, targetInputs);

        setResults({
            current: currentFootprint,
            savings: savings
        });
        setLoading(false);
    };

    const resetToDefaults = () => {
        setCurrentInputs(DEFAULT_CURRENT);
        setTargetInputs(DEFAULT_TARGET);
        setResults(null);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
                    Carbon Footprint Simulator
                </h3>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Compare your current lifestyle with potential changes to see the impact on your carbon footprint.
                </p>
            </div>

            {/* Input Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputCard title="Current Lifestyle" headerIcon={"📊"} headerBg="bg-gray-100" type="current" />
                <InputCard title="Target Lifestyle" headerIcon={"🎯"} headerBg="bg-green-100" type="target" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
                <Button onClick={resetToDefaults} variant="outline" size="lg">
                    Reset to Defaults
                </Button>
                <Button onClick={handleSimulate} disabled={loading} size="lg">
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Calculating...
                        </>
                    ) : (
                        <>
                            <Calculator className="mr-2 w-4 h-4" />
                            Run Simulation
                        </>
                    )}
                </Button>
            </div>

            {/* Results */}
            {results && <ResultCards results={results} />}
        </div>
    );
};

export default SimulatorTool;
