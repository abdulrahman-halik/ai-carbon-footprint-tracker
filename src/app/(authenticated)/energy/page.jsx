"use client";

import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import EnergyHeader from "@/features/energy/EnergyHeader";
import StatsGrid from "@/features/energy/StatsGrid";
import UsageChart from "@/features/energy/UsageChart";
import MeterModal from "@/features/energy/MeterModal";

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
    const [savedToast, setSavedToast] = useState(false);

    const openMeter = () => setIsMeterOpen(true);
    const closeMeter = () => setIsMeterOpen(false);
    const handleSave = () => {
        const entry = { id: Date.now(), reading: Number(reading) || 0, date: date || new Date().toISOString().slice(0,10) };
        setReadings(prev => [entry, ...prev].slice(0,8));
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 1800);
        setIsMeterOpen(false);
        setReading('');
        setDate('');
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
            <MeterModal isOpen={isMeterOpen} onClose={closeMeter} reading={reading} setReading={setReading} date={date} setDate={setDate} readings={readings} onSave={handleSave} savedToast={savedToast} />
            <StatsGrid />
            <UsageChart data={data} options={options} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-0 overflow-hidden flex flex-col">
                    <div className="p-6 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg text-amber-500 shadow-sm">
                            <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 3.055A9 9 0 1 0 20.945 13H19.5A7.5 7.5 0 1 1 11 3.055z"/></svg>
                        </div>
                        <h3 className="font-semibold text-gray-900">Energy Saving Tip</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Switching to LED bulbs can use up to <strong>90% less energy</strong> than traditional incandescent bulbs and last up to 25 times longer. It's the easiest switch with the biggest impact!
                        </p>
                    </div>
                </div>

                <div className="glass-card p-0 overflow-hidden flex flex-col">
                    <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg text-gray-700 shadow-sm">
                            <svg className="w-5 h-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V4a1 1 0 0 1 1-1z"/></svg>
                        </div>
                        <h3 className="font-semibold text-gray-900">Phantom Power</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Electronics plugged in but not in use (TVs, chargers, computers) can account for up to <strong>10%</strong> of your monthly electricity bill. Use power strips to turn them all off at once.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
