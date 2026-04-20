"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { EnergyHeader, EnergyTips } from "@/features/energy/EnergyInfo";
import { StatsGrid, UsageChart } from "@/features/energy/EnergyAnalytics";
import { MeterModal } from "@/features/energy/MeterEntry";
import { MeterList } from "@/features/energy/MeterList";

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

    useEffect(() => {
        try {
            const raw = localStorage.getItem('energy.readings');
            if (raw) setReadings(JSON.parse(raw));
        } catch (e) {
            console.error('Failed to load energy readings', e);
        }
    }, []);

    const persist = (next) => {
        setReadings(next);
        try {
            localStorage.setItem('energy.readings', JSON.stringify(next));
        } catch (e) {
            console.error('Failed to persist energy readings', e);
        }
    };

    const openMeter = () => setIsMeterOpen(true);
    const closeMeter = () => setIsMeterOpen(false);
    const handleSave = () => {
        const entry = { id: editingId || Date.now(), reading: Number(reading) || 0, date: date || new Date().toISOString().slice(0, 10), notes: notes.trim() };
        let next;
        if (editingId) {
            next = readings.map(r => (r.id === editingId ? entry : r));
        } else {
            next = [entry, ...readings].slice(0, 12);
        }
        persist(next);
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 1800);
        setIsMeterOpen(false);
        setReading('');
        setDate('');
        setNotes('');
        setEditingId(null);
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

    const handleDelete = (id) => {
        if (!window.confirm('Delete this reading?')) return;
        const next = readings.filter(r => r.id !== id);
        persist(next);
        if (editingId === id) {
            setEditingId(null);
            setIsMeterOpen(false);
            setReading('');
            setDate('');
            setNotes('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setIsMeterOpen(false);
        setReading('');
        setDate('');
        setNotes('');
    };

    const data = {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        datasets: [
            {
                label: "Energy Usage (kWh)",
                data: [0.5, 0.4, 1.2, 1.8, 1.5, 2.4, 1.1],
                borderColor: "rgb(245, 158, 11)", // Amber-500
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgb(245, 158, 11)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <EnergyHeader onAdd={openMeter} />
            <MeterModal isOpen={isMeterOpen} onClose={handleCancelEdit} reading={reading} setReading={setReading} date={date} setDate={setDate} notes={notes} setNotes={setNotes} readings={readings} onSave={handleSave} savedToast={savedToast} />
            <StatsGrid />
            <UsageChart data={data} options={options} />

            <div className="mt-6">
                <MeterList readings={readings} onEdit={handleEdit} onDelete={handleDelete} editingId={editingId} onCancel={handleCancelEdit} />
            </div>

            <EnergyTips />
        </div>
    );
}