"use client";
import React from 'react';
import { Zap, Car, Trash2, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

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
export default function EmissionsInputForm({ inputs, loading, onChange, onCalculate }) {
    return (
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <CardHeader>
                <CardTitle>Update Your Lifestyle Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {INPUT_SECTIONS.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.title} className="space-y-4">
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
                                                    onChange={(e) => onChange(input.id, e.target.value)}
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
                    <Button onClick={onCalculate} disabled={loading}>
                        {loading ? 'Calculating...' : 'Update Footprint'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
