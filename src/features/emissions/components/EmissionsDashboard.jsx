"use client";

import React, { useState, useEffect } from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";
import { Button } from "@/components/ui/Button";
import { Calculator } from 'lucide-react';
import { calculateCarbonFootprint, getFootprintFeedback } from '@/lib/carbonCalculator';
import EmissionsInputForm from "./EmissionsInputForm";
import EmissionsSummaryCards from "./EmissionsSummaryCards";
import EmissionsBreakdownTable from "./EmissionsBreakdownTable";
import EmissionItemModal from "./EmissionItemModal";

/**
 * EmissionsDashboard — page-level orchestrator.
 * Manages lifestyle input state & calculation; composites all sub-components.
 */
export default function EmissionsDashboard() {
    const [inputs, setInputs] = useState({
        electricity: 300, lpg: 10, water: 150,
        car: 20, bike: 5, public_transport: 15,
        air_travel: 2000, waste: 5,
    });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const handleInputChange = (id, value) =>
        setInputs(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));

    const handleCalculate = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setResults(calculateCarbonFootprint(inputs));
        setLoading(false);
    };

    // Run on first render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { handleCalculate(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Chart data helpers
    const emissionsData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "CO2 Emissions (kg)",
            data: [25, 30, 28, 35, 32, 20, 22],
            borderColor: "#22C55E",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            fill: true, tension: 0.4, pointRadius: 4,
        }],
    };

    const impactData = results ? {
        labels: results.breakdown.map(i => i.category),
        datasets: [{
            label: "Emissions by Category",
            data: results.breakdown.map(i => i.value),
            backgroundColor: results.breakdown.map(i => i.color),
            hoverOffset: 4, borderWidth: 0,
        }],
    } : { labels: [], datasets: [] };

    const feedback = results ? getFootprintFeedback(results.totalFootprint) : null;

    // Local CRUD for custom emission items
    const [customItems, setCustomItems] = useState([]);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleAddItem = (it) => {
        setCustomItems(prev => [{ ...it, _custom: true }, ...prev]);
    };

    const handleSaveItem = (it) => {
        setCustomItems(prev => prev.map(p => p.id === it.id ? { ...it, _custom: true } : p));
    };

    const handleDeleteItem = (id) => {
        setCustomItems(prev => prev.filter(p => p.id !== id));
    };

    const openNewItem = () => { setEditingItem(null); setIsItemModalOpen(true); };

    const openEditItem = (item) => { setEditingItem(item); setIsItemModalOpen(true); };

    if (!results) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Emissions Dashboard</h2>
                    <p className="text-gray-600">Track and analyze your carbon footprint</p>
                </div>
                <Button onClick={() => setShowInputs(!showInputs)} variant="outline" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    {showInputs ? 'Hide' : 'Update'} Data
                </Button>
            </div>

            {/* Collapsible input form */}
            {showInputs && (
                <EmissionsInputForm
                    inputs={inputs}
                    loading={loading}
                    onChange={handleInputChange}
                    onCalculate={handleCalculate}
                    onCancel={() => setShowInputs(false)}
                />
            )}

            {/* Summary stat cards */}
            <EmissionsSummaryCards results={results} feedback={feedback} />

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card bg-white border-none shadow-sm p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Trends</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Carbon Footprint History</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">↘ -8%</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <EmissionSparkline data={emissionsData} className="h-full w-full" />
                    </div>
                </div>
                <div className="glass-card bg-white border-none shadow-sm p-8">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900">Impact Breakdown</h3>
                        <p className="text-sm text-gray-500 font-medium">Where your emissions come from</p>
                    </div>
                    <div className="h-[340px] w-full">
                        <ImpactVisualizer data={impactData} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Detailed Breakdown</h3>
                <div className="flex items-center gap-3">
                    <button onClick={openNewItem} className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700">Add Item</button>
                </div>
            </div>

            {/* Detailed breakdown table (includes custom items) */}
            <EmissionsBreakdownTable breakdown={results.breakdown} extraEntries={customItems} onEditExtra={openEditItem} onDeleteExtra={handleDeleteItem} />

            <EmissionItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} onSave={(it) => { if (editingItem) handleSaveItem(it); else handleAddItem(it); }} item={editingItem} />
        </div>
    );
}
