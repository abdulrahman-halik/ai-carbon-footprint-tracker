"use client";
import React, { useState } from 'react';
import { Zap, Car, Trash2, UtensilsCrossed, Home, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

// Averages for real-time feedback
const AVERAGES = {
    electricity: 250, lpg: 8, water: 120,
    car: 15, bike: 3, public_transport: 10, air_travel: 1500,
    waste: 4, meat_meals: 5, dairy_portions: 7, food_waste: 2,
    clothing: 2, electronics: 0.2, online_orders: 4,
    ac_usage: 3, household_size: 3,
};

function FeedbackBadge({ id, value }) {
    const avg = AVERAGES[id];
    if (!avg || !value) return null;
    if (value > avg * 1.3) return <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">⚠ High</span>;
    if (value < avg * 0.7) return <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">🌿 Low</span>;
    return <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">✅ Avg</span>;
}

function NumField({ id, label, unit, value, onChange, isSlider, min = 0, max = 100 }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <Label htmlFor={id} className="text-sm">{label}</Label>
                <FeedbackBadge id={id} value={value} />
            </div>
            {isSlider ? (
                <div className="space-y-1">
                    <input type="range" id={id} min={min} max={max} step={0.5}
                        value={value} onChange={(e) => onChange(id, e.target.value)}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-500 bg-gray-200"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>{min} {unit}</span><span className="font-semibold text-gray-700">{value} {unit}</span><span>{max} {unit}</span>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <input id={id} type="number" value={value} min={0}
                        onChange={(e) => onChange(id, e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm pr-16 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>
                </div>
            )}
        </div>
    );
}

const TABS = [
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
];

export default function EmissionsInputForm({ inputs, loading, onChange, onCalculate }) {
    const [activeTab, setActiveTab] = useState('energy');

    const dietOptions = [
        { value: 'vegan', label: '🌱 Vegan' },
        { value: 'vegetarian', label: '🥗 Vegetarian' },
        { value: 'mixed', label: '🍽️ Mixed' },
        { value: 'heavy_meat', label: '🥩 High Meat' },
    ];
    const houseOptions = [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'studio', label: 'Studio' },
    ];
    const energySrcOptions = [
        { value: 'grid', label: '🔌 Grid' },
        { value: 'hybrid', label: '⚡ Hybrid' },
        { value: 'solar', label: '☀️ Solar' },
    ];

    return (
        <Card className="shadow-lg border-0 ring-1 ring-gray-200/50">
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Update Your Lifestyle Data</CardTitle>
                {/* Tabs */}
                <div className="flex gap-1 flex-wrap mt-2">
                    {TABS.map((t) => {
                        const Icon = t.icon;
                        return (
                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                    ${activeTab === t.id ? 'bg-emerald-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                <Icon className="w-3.5 h-3.5" />{t.label}
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">

                {activeTab === 'energy' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <NumField id="electricity" label="Electricity" unit="kWh/mo" value={inputs.electricity} onChange={onChange} />
                        <NumField id="lpg" label="LPG" unit="kg/mo" value={inputs.lpg} onChange={onChange} />
                        <NumField id="water" label="Water" unit="L/day" value={inputs.water} onChange={onChange} />
                        <div className="space-y-1">
                            <Label className="text-sm">Energy Source</Label>
                            <div className="flex gap-2 flex-wrap">
                                {energySrcOptions.map(o => (
                                    <button key={o.value} onClick={() => onChange('energy_source', o.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                            ${(inputs.energy_source ?? 'grid') === o.value ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-200 text-gray-700 hover:border-emerald-300'}`}>
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                            {inputs.energy_source === 'solar' && <p className="text-xs text-emerald-600">☀️ 30% energy discount applied!</p>}
                            {inputs.energy_source === 'hybrid' && <p className="text-xs text-blue-600">⚡ 15% energy discount applied!</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'transport' && (
                    <div className="space-y-4">
                        <NumField id="car" label="Car" unit="km/day" value={inputs.car} onChange={onChange} isSlider min={0} max={100} />
                        <NumField id="bike" label="Bike" unit="km/day" value={inputs.bike} onChange={onChange} isSlider min={0} max={50} />
                        <NumField id="public_transport" label="Public Transport" unit="km/day" value={inputs.public_transport} onChange={onChange} isSlider min={0} max={60} />
                        <NumField id="air_travel" label="Air Travel" unit="km/year" value={inputs.air_travel} onChange={onChange} />
                        <NumField id="waste" label="Waste" unit="kg/week" value={inputs.waste} onChange={onChange} isSlider min={0} max={20} />
                    </div>
                )}

                {activeTab === 'food' && (
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="text-sm">Diet Type</Label>
                            <div className="flex gap-2 flex-wrap">
                                {dietOptions.map(o => (
                                    <button key={o.value} onClick={() => onChange('diet_type', o.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                            ${(inputs.diet_type ?? 'mixed') === o.value ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-200 text-gray-700 hover:border-emerald-300'}`}>
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <NumField id="meat_meals" label="Meat Meals" unit="meals/week" value={inputs.meat_meals} onChange={onChange} isSlider min={0} max={21} />
                        <NumField id="dairy_portions" label="Dairy Portions" unit="portions/week" value={inputs.dairy_portions} onChange={onChange} isSlider min={0} max={21} />
                        <NumField id="food_waste" label="Food Waste" unit="kg/week" value={inputs.food_waste} onChange={onChange} isSlider min={0} max={10} />
                    </div>
                )}

                {activeTab === 'home' && (
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="text-sm">House Type</Label>
                            <div className="flex gap-2">
                                {houseOptions.map(o => (
                                    <button key={o.value} onClick={() => onChange('house_type', o.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                            ${(inputs.house_type ?? 'apartment') === o.value ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-200 text-gray-700 hover:border-emerald-300'}`}>
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <NumField id="household_size" label="People in Household" unit="people" value={inputs.household_size} onChange={onChange} isSlider min={1} max={10} />
                        <NumField id="ac_usage" label="AC Usage" unit="hrs/day" value={inputs.ac_usage} onChange={onChange} isSlider min={0} max={16} />
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm">Renewable Energy (Solar Panels)</Label>
                                <button onClick={() => onChange('has_solar', inputs.has_solar ? 0 : 1)}
                                    className={`relative w-11 h-6 rounded-full transition-colors ${inputs.has_solar ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${inputs.has_solar ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>
                            {inputs.has_solar ? <p className="text-xs text-emerald-600">☀️ Solar noted — also select Solar under Energy Source for the discount.</p> : null}
                        </div>
                    </div>
                )}

                {activeTab === 'shopping' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <NumField id="clothing" label="Clothing Purchased" unit="items/mo" value={inputs.clothing} onChange={onChange} />
                        <NumField id="electronics" label="Electronics Purchased" unit="devices/mo" value={inputs.electronics} onChange={onChange} />
                        <NumField id="online_orders" label="Online Orders" unit="orders/mo" value={inputs.online_orders} onChange={onChange} />
                    </div>
                )}

                <div className="flex justify-end pt-2">
                    <Button onClick={onCalculate} disabled={loading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6">
                        {loading ? 'Calculating...' : 'Analyze My Impact 🌍'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
