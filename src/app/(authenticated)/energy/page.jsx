"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { EnergyHeader, EnergyTips } from "@/features/energy/EnergyInfo";
import { StatsGrid, UsageChart } from "@/features/energy/EnergyAnalytics";
import { MeterModal } from "@/features/energy/MeterEntry";
import { MeterList } from "@/features/energy/MeterList";
import energyService from "@/services/energyService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function EnergyPage() {
    const [isMeterOpen, setIsMeterOpen] = useState(false);
    const [reading, setReading] = useState('');
    const [date, setDate] = useState('');
    const [readings, setReadings] = useState([]);
    const [notes, setNotes] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [savedToast, setSavedToast] = useState(false);

    const fetchReadings = useCallback(async () => {
        try {
            const rawData = await energyService.getLogs();
            if (rawData && Array.isArray(rawData)) {
                setReadings(rawData.map(r => ({
                    id: r._id || r.id,
                    reading: r.value,
                    date: r.date ? new Date(r.date).toISOString().slice(0, 10) : '',
                    notes: r.notes || ''
                })));
            }
        } catch (e) {
            console.error("Failed to fetch energy readings", e);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        energyService.getLogs().then(rawData => {
            if (isMounted && rawData && Array.isArray(rawData)) {
                setReadings(rawData.map(r => ({
                    id: r._id || r.id,
                    reading: r.value,
                    date: r.date ? new Date(r.date).toISOString().slice(0, 10) : '',
                    notes: r.notes || ''
                })));
            }
        }).catch(e => console.error("Failed to fetch energy readings", e));
        return () => { isMounted = false; };
    }, []);

    // Compute real stats from fetched readings
    const energyStats = useMemo(() => {
        if (!readings || readings.length === 0) return { dailyAvg: null, monthlyTotal: null, logCount: 0 };
        const values = readings.map(r => Number(r.reading) || 0);
        const total = values.reduce((a, b) => a + b, 0);
        const now = new Date();
        const thisMonthValues = readings
            .filter(r => {
                if (!r.date) return false;
                const d = new Date(r.date);
                return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
            })
            .map(r => Number(r.reading) || 0);
        const monthlyTotal = thisMonthValues.reduce((a, b) => a + b, 0);
        return {
            dailyAvg: values.length > 0 ? total / values.length : 0,
            monthlyTotal,
            logCount: readings.length,
        };
    }, [readings]);

    // Build real chart data from readings (sorted by date, last 10)
    const chartData = useMemo(() => {
        const sorted = [...readings]
            .filter(r => r.date)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-10);

        if (sorted.length === 0) {
            return {
                labels: [],
                datasets: [{
                    label: "Energy Usage (kWh)",
                    data: [],
                    borderColor: "rgb(245, 158, 11)",
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: "rgb(245, 158, 11)",
                }],
            };
        }

        return {
            labels: sorted.map(r => r.date),
            datasets: [{
                label: "Energy Usage (kWh)",
                data: sorted.map(r => Number(r.reading) || 0),
                borderColor: "rgb(245, 158, 11)",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgb(245, 158, 11)",
            }],
        };
    }, [readings]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
            x: { grid: { display: false } },
        },
    };

    const openMeter = () => setIsMeterOpen(true);
    const closeMeter = () => setIsMeterOpen(false);

    const handleSave = async () => {
        try {
            const dateStr = date || new Date().toISOString().slice(0, 10);
            const payload = {
                energy_type: "Electricity",
                unit: "kWh",
                value: Number(reading) || 0,
                date: new Date(dateStr).toISOString(),
                notes: notes.trim()
            };

            if (editingId) {
                await energyService.updateLog(editingId, payload);
            } else {
                await energyService.logEnergy(payload);
            }

            await fetchReadings();
            setSavedToast(true);
            setTimeout(() => setSavedToast(false), 1800);
            setIsMeterOpen(false);
            setReading('');
            setDate('');
            setNotes('');
            setEditingId(null);
        } catch (e) {
            console.error("Save energy log failed", e);
        }
    };

    const handleEdit = (id) => {
        const found = readings.find(r => r.id === id);
        if (!found) return;
        setReading(String(found.reading));
        setDate(found.date);
        setNotes(found.notes || '');
        setEditingId(id);
        setIsMeterOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this reading?')) return;
        try {
            await energyService.deleteLog(id);
            setReadings(readings.filter(r => r.id !== id));
            if (editingId === id) {
                setEditingId(null);
                setIsMeterOpen(false);
                setReading('');
                setDate('');
                setNotes('');
            }
        } catch (e) {
            console.error("Delete energy log failed", e);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setIsMeterOpen(false);
        setReading('');
        setDate('');
        setNotes('');
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <EnergyHeader onAdd={openMeter} />
            <MeterModal isOpen={isMeterOpen} onClose={handleCancelEdit} reading={reading} setReading={setReading} date={date} setDate={setDate} notes={notes} setNotes={setNotes} readings={readings} onSave={handleSave} savedToast={savedToast} />
            <StatsGrid stats={energyStats} />
            <UsageChart data={chartData} options={chartOptions} />

            <div className="mt-6">
                <MeterList readings={readings} onEdit={handleEdit} onDelete={handleDelete} editingId={editingId} onCancel={handleCancelEdit} />
            </div>

            <EnergyTips />
        </div>
    );
}