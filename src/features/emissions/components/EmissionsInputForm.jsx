"use client";
import React, { useMemo } from 'react';
import { Zap, Car, Trash2, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { calculateCarbonFootprint, getFootprintFeedback } from '@/lib/carbonCalculator';

// Input section config — defined once, shared via props
const INPUT_SECTIONS = [
    {
        title: 'Energy', icon: Zap,
        inputs: [
            { id: 'electricity', label: 'Electricity', unit: 'kWh/month' },
            { id: 'lpg', label: 'LPG', unit: 'kg/month' },
            { id: 'water', label: 'Water', unit: 'litres/day' },
        ],
    },
    {
        title: 'Transport', icon: Car,
        inputs: [
            { id: 'car', label: 'Car', unit: 'km/day' },
            { id: 'bike', label: 'Bike', unit: 'km/day' },
            { id: 'public_transport', label: 'Public Transport', unit: 'km/day' },
            { id: 'air_travel', label: 'Air Travel', unit: 'km/year' },
        ],
    },
    {
        title: 'Waste', icon: Trash2,
        inputs: [{ id: 'waste', label: 'Waste', unit: 'kg/week' }],
    },
];

/**
 * EmissionsInputForm — collapsible lifestyle-data input card.
 *
 * @param {object}   inputs   - Current input values keyed by input id
 * @param {boolean}  loading  - Whether calculation is in progress
 * @param {Function} onChange - (id, value) =>
 * @param {Function} onCalculate
 */
export default function EmissionsInputForm({ inputs, loading, onChange, onCalculate, onCancel }) {
    const preview = useMemo(() => calculateCarbonFootprint(inputs), [inputs]);
    const feedback = useMemo(() => getFootprintFeedback(preview.totalFootprint), [preview]);

    return (
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 border-r border-gray-50 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <CardHeader className="p-0">
                                <CardTitle>Update Your Lifestyle Data</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">Adjust your inputs to recalculate your monthly footprint instantly.</p>
                            </CardHeader>
                        </div>
                        <div className="hidden md:flex items-center gap-3 text-sm text-gray-500">
                            <Calculator className="w-5 h-5 text-gray-400" />
                            Live Preview
                        </div>
                    </div>

                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {INPUT_SECTIONS.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <div key={section.title} className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-md bg-gray-50 border border-gray-100">
                                                <Icon className="w-4 h-4 text-gray-600" />
                                            </div>
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
                                                            onChange={(e) => onChange(input.id, e.target.value)}
                                                            className="pr-20"
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

                        <div className="flex justify-end mt-6 gap-3">
                            <Button variant="outline" onClick={onCancel} disabled={loading}>
                                Cancel
                            </Button>
                            <Button onClick={onCalculate} disabled={loading}>
                                {loading ? 'Calculating...' : 'Update Footprint'}
                            </Button>
                        </div>
                    </CardContent>
                </div>

                <div className="md:col-span-1 p-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Estimated Monthly Footprint</h4>
                                <p className="text-xs text-gray-400">Live estimate based on current inputs</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-extrabold text-gray-900">{preview.totalFootprint.toFixed(1)}</div>
                                <div className="text-xs text-gray-500">kg CO₂e / month</div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            {preview.breakdown.slice(0, 5).map((b) => (
                                <div key={b.category} className="space-y-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 font-medium">{b.category}</span>
                                        <span className="text-xs text-gray-500">{b.value.toFixed(1)} kg</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                        <div className="h-2 rounded-full" style={{ width: `${b.percentage}%`, backgroundColor: b.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 p-3 bg-white rounded-lg border border-gray-50">
                            <div className="flex items-start gap-3">
                                <div className={"p-2 rounded-full " + (feedback.level === 'excellent' ? 'bg-green-100' : feedback.level === 'good' ? 'bg-blue-100' : feedback.level === 'average' ? 'bg-yellow-100' : 'bg-orange-100') }>
                                    <Calculator className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: feedback.text }} />
                                    <div className="text-xs text-gray-500 mt-1">{feedback.desc}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
