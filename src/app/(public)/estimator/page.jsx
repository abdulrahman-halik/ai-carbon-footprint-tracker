"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Calculator, Zap, Car, Trash2, Plane, Bike, Train, Droplets } from 'lucide-react';
import { calculateCarbonFootprint, getFootprintFeedback } from '@/lib/carbonCalculator';

const inputSections = [
    {
        title: "Energy Consumption",
        icon: Zap,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        inputs: [
            {
                id: 'electricity',
                label: 'Monthly Electricity Usage',
                unit: 'kWh',
                placeholder: 'e.g., 300',
                type: 'number',
                min: 0
            },
            {
                id: 'lpg',
                label: 'Monthly LPG Usage',
                unit: 'kg',
                placeholder: 'e.g., 10',
                type: 'number',
                min: 0
            },
            {
                id: 'water',
                label: 'Daily Water Usage',
                unit: 'litres',
                placeholder: 'e.g., 150',
                type: 'number',
                min: 0
            }
        ]
    },
    {
        title: "Travel & Transportation",
        icon: Car,
        color: "text-green-600",
        bgColor: "bg-green-50",
        inputs: [
            {
                id: 'car',
                label: 'Daily Car Travel',
                unit: 'km',
                placeholder: 'e.g., 20',
                type: 'number',
                min: 0
            },
            {
                id: 'bike',
                label: 'Daily Bike Travel',
                unit: 'km',
                placeholder: 'e.g., 5',
                type: 'number',
                min: 0
            },
            {
                id: 'public_transport',
                label: 'Daily Public Transport',
                unit: 'km',
                placeholder: 'e.g., 15',
                type: 'number',
                min: 0
            },
            {
                id: 'air_travel',
                label: 'Yearly Air Travel',
                unit: 'km',
                placeholder: 'e.g., 2000',
                type: 'number',
                min: 0
            }
        ]
    },
    {
        title: "Waste Generation",
        icon: Trash2,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        inputs: [
            {
                id: 'waste',
                label: 'Weekly Waste Generation',
                unit: 'kg',
                placeholder: 'e.g., 5',
                type: 'number',
                min: 0
            }
        ]
    }
];

export default function EstimatorPage() {
    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (id, value) => {
        setInputs(prev => ({
            ...prev,
            [id]: parseFloat(value) || 0
        }));
    };

    const handleCalculate = async () => {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const calculationResults = calculateCarbonFootprint(inputs);
        setResults(calculationResults);
        setLoading(false);
    };

    const handleReset = () => {
        setInputs({});
        setResults(null);
    };

    const feedback = results ? getFootprintFeedback(results.totalFootprint) : null;

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Calculator className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Carbon Footprint Calculator
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Calculate your monthly carbon footprint by entering your lifestyle data.
                        Get detailed insights and personalized recommendations.
                    </p>
                </div>

                {!results ? (
                    /* Input Form */
                    <div className="space-y-8">
                        {inputSections.map((section, sectionIndex) => {
                            const Icon = section.icon;
                            return (
                                <Card key={sectionIndex} className="shadow-lg border-0 ring-1 ring-gray-200/50">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${section.bgColor}`}>
                                                <Icon className={`w-5 h-5 ${section.color}`} />
                                            </div>
                                            <CardTitle className="text-xl">{section.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {section.inputs.map((input) => (
                                                <div key={input.id} className="space-y-2">
                                                    <Label htmlFor={input.id} className="text-sm font-medium">
                                                        {input.label}
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id={input.id}
                                                            type={input.type}
                                                            placeholder={input.placeholder}
                                                            value={inputs[input.id] || ''}
                                                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                                                            className="pr-16"
                                                            min={input.min}
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                            {input.unit}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {/* Calculate Button */}
                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={handleCalculate}
                                disabled={loading}
                                size="lg"
                                className="px-12 py-4 text-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        Calculate Footprint
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    /* Results Display */
                    <div className="space-y-8">
                        {/* Summary Card */}
                        <Card className="shadow-xl border-0 ring-1 ring-gray-200/50 bg-gradient-to-br from-primary/5 to-primary/10">
                            <CardContent className="pt-8">
                                <div className="text-center">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                                        feedback?.level === 'excellent' ? 'bg-green-100' :
                                        feedback?.level === 'good' ? 'bg-blue-100' :
                                        feedback?.level === 'average' ? 'bg-yellow-100' : 'bg-orange-100'
                                    }`}>
                                        <Calculator className={`w-10 h-10 ${
                                            feedback?.level === 'excellent' ? 'text-green-600' :
                                            feedback?.level === 'good' ? 'text-blue-600' :
                                            feedback?.level === 'average' ? 'text-yellow-600' : 'text-orange-600'
                                        }`} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        {results.totalFootprint.toFixed(2)} kg CO₂e
                                    </h2>
                                    <p className="text-gray-600 mb-4">Monthly Carbon Footprint</p>
                                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                                        feedback?.level === 'excellent' ? 'bg-green-100 text-green-800' :
                                        feedback?.level === 'good' ? 'bg-blue-100 text-blue-800' :
                                        feedback?.level === 'average' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                                    }`}>
                                        {feedback?.text}
                                    </div>
                                    <p className="text-gray-600 mt-4 max-w-md mx-auto">
                                        {feedback?.desc}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detailed Breakdown */}
                        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
                            <CardHeader>
                                <CardTitle className="text-xl">Emissions Breakdown</CardTitle>
                                <CardDescription>
                                    See how each category contributes to your total footprint
                                </CardDescription>
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

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={handleReset} variant="outline" size="lg">
                                Calculate Again
                            </Button>
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Create Account for Detailed Tracking
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary-100 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                {Icon && <Icon size={24} />}
                            </div>
                            <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
                            <CardDescription>Question {step + 1} of {questions.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-3">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.label}
                                    onClick={() => handleAnswer(option.score)}
                                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-primary transition-all flex items-center justify-between group"
                                >
                                    <span className="font-medium text-gray-700 group-hover:text-primary">{option.label}</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                </button>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-center pt-2 pb-6">
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300"
                                    style={{ width: `${((step) / questions.length) * 100}%` }}
                                />
                            </div>
                        </CardFooter>
                    </>
                ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold mb-2">Estimation Complete</CardTitle>
                            <div className="py-6">
                                <div className={`text-2xl font-bold ${getResultFeedback(score).color} mb-2`}>
                                    {getResultFeedback(score).text}
                                </div>
                                <p className="text-gray-600">
                                    {getResultFeedback(score).desc}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
                                This is just a rough estimate. For a precise calculation and personalized reduction plan, create your full profile.
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Link href="/register" className="w-full">
                                <Button className="w-full h-12 text-lg">Unlock Full Report</Button>
                            </Link>
                            <Button variant="ghost" onClick={() => { setStep(0); setScore(0); setShowResult(false); }}>
                                Start Over
                            </Button>
                        </CardFooter>
                    </div>
                )}
            </Card>
        </div>
    );
}
