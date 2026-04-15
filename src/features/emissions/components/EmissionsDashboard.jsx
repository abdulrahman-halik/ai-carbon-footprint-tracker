"use client";

import React, { useState, useEffect } from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Zap, Car, Bike, Train, Plane, Trash2, Calculator, TrendingDown, TrendingUp } from 'lucide-react';
import { calculateCarbonFootprint, getFootprintFeedback } from '@/lib/carbonCalculator';

export default function EmissionsDashboard() {
    // User lifestyle inputs
    const [inputs, setInputs] = useState({
        electricity: 300,
        lpg: 10,
        water: 150,
        car: 20,
        bike: 5,
        public_transport: 15,
        air_travel: 2000,
        waste: 5
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    // Calculate footprint on component mount and when inputs change
    useEffect(() => {
        handleCalculate();
    }, []);

    const handleInputChange = (id, value) => {
        setInputs(prev => ({
            ...prev,
            [id]: parseFloat(value) || 0
        }));
    };

    const handleCalculate = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const calculationResults = calculateCarbonFootprint(inputs);
        setResults(calculationResults);
        setLoading(false);
    };

    const inputSections = [
        {
            title: "Energy",
            icon: Zap,
            inputs: [
                { id: 'electricity', label: 'Electricity', unit: 'kWh/month' },
                { id: 'lpg', label: 'LPG', unit: 'kg/month' },
                { id: 'water', label: 'Water', unit: 'litres/day' }
            ]
        },
        {
            title: "Transport",
            icon: Car,
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
            inputs: [
                { id: 'waste', label: 'Waste', unit: 'kg/week' }
            ]
        }
    ];

    // Prepare data for charts
    const getEmissionsData = () => ({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "CO2 Emissions (kg)",
            data: [25, 30, 28, 35, 32, 20, 22],
            borderColor: "#22C55E",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
        }],
    });

    const getImpactData = () => {
        if (!results) return { labels: [], datasets: [] };

        return {
            labels: results.breakdown.map(item => item.category),
            datasets: [{
                label: "Emissions by Category",
                data: results.breakdown.map(item => item.value),
                backgroundColor: results.breakdown.map(item => item.color),
                hoverOffset: 4,
                borderWidth: 0,
            }],
        };
    };

    const feedback = results ? getFootprintFeedback(results.totalFootprint) : null;

    if (!results) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Controls */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Emissions Dashboard</h2>
                    <p className="text-gray-600">Track and analyze your carbon footprint</p>
                </div>
                <Button
                    onClick={() => setShowInputs(!showInputs)}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Calculator className="w-4 h-4" />
                    {showInputs ? 'Hide' : 'Update'} Data
                </Button>
            </div>

            {/* Input Form */}
            {showInputs && (
                <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
                    <CardHeader>
                        <CardTitle>Update Your Lifestyle Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {inputSections.map((section, sectionIndex) => {
                                const Icon = section.icon;
                                return (
                                    <div key={sectionIndex} className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-5 h-5 text-gray-600" />
                                            <h3 className="font-medium text-gray-900">{section.title}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {section.inputs.map((input) => (
                                                <div key={input.id} className="space-y-1">
                                                    <Label htmlFor={input.id} className="text-sm">
                                                        {input.label}
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id={input.id}
                                                            type="number"
                                                            value={inputs[input.id]}
                                                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                                                            className="pr-16"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                            {input.unit}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button onClick={handleCalculate} disabled={loading}>
                                {loading ? 'Calculating...' : 'Update Footprint'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Footprint */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Total Footprint
                        </span>
                        <div className="bg-blue-500 rounded-full p-1">
                            <Calculator className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-gray-900">
                            {results.totalFootprint.toFixed(1)}
                        </h3>
                        <p className="text-sm text-gray-500">kg CO₂e / month</p>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                            feedback?.level === 'excellent' ? 'bg-green-100 text-green-800' :
                            feedback?.level === 'good' ? 'bg-blue-100 text-blue-800' :
                            feedback?.level === 'average' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                            {feedback?.text}
                        </div>
                    </div>
                </div>

                {/* Energy Impact */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Energy
                        </span>
                        <div className="bg-emerald-500 rounded-full p-1">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {results.categories.energy.toFixed(1)}
                        </h3>
                        <p className="text-sm text-gray-500">kg CO₂e / month</p>
                        <p className="text-xs text-emerald-600 font-medium">
                            {((results.categories.energy / results.totalFootprint) * 100).toFixed(1)}% of total
                        </p>
                    </div>
                </div>

                {/* Transport Impact */}
                <div className="glass-card bg-white border-none shadow-sm hover:shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Transport
                        </span>
                        <div className="bg-orange-500 rounded-full p-1">
                            <Car className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {results.categories.transport.toFixed(1)}
                        </h3>
                        <p className="text-sm text-gray-500">kg CO₂e / month</p>
                        <p className="text-xs text-orange-600 font-medium">
                            {((results.categories.transport / results.totalFootprint) * 100).toFixed(1)}% of total
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Trends */}
                <div className="glass-card bg-white border-none shadow-sm p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Trends</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Carbon Footprint History</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">
                            ↘ -8%
                        </span>
                    </div>
                    <div className="h-[300px] w-full">
                        <EmissionSparkline data={getEmissionsData()} className="h-full w-full" />
                    </div>
                </div>

                {/* Impact Breakdown */}
                <div className="glass-card bg-white border-none shadow-sm p-8">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900">Impact Breakdown</h3>
                        <p className="text-sm text-gray-500 font-medium">Where your emissions come from</p>
                    </div>
                    <div className="h-[340px] w-full">
                        <ImpactVisualizer data={getImpactData()} />
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Detailed Emissions Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {results.breakdown
                            .filter(item => item.value > 0)
                            .sort((a, b) => b.value - a.value)
                            .map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">{item.category}</span>
                                        <div className="text-right">
                                            <span className="font-bold text-gray-900">
                                                {item.value.toFixed(2)} kg
                                            </span>
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({item.percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${item.percentage}%`,
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
