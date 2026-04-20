"use client";

import React, { useState, useEffect } from "react";
import EmissionsHero from "./EmissionsHero";
import EmissionsChartsRow from "./EmissionsChartsRow";
import EmissionsBreakdownHeader from "./EmissionsBreakdownHeader";
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
        <div className="relative space-y-8">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            {/* Hero */}
            <EmissionsHero showInputs={showInputs} onToggleInputs={() => setShowInputs(!showInputs)} />

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
            <EmissionsChartsRow emissionsData={emissionsData} impactData={impactData} />

            <EmissionsBreakdownHeader onAddItem={openNewItem} />

            {/* Detailed breakdown table (includes custom items) */}
            <EmissionsBreakdownTable breakdown={results.breakdown} extraEntries={customItems} onEditExtra={openEditItem} onDeleteExtra={handleDeleteItem} />

            <EmissionItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} onSave={(it) => { if (editingItem) handleSaveItem(it); else handleAddItem(it); }} item={editingItem} />
        </div>
    );
}
