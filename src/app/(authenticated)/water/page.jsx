"use client";

import React, { useState } from "react";
import { Droplets, TrendingDown, AlertTriangle } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from "@/components/ui/Modal";
import LogForm from '@/features/water/LogForm';
import RecentEntries from '@/features/water/RecentEntries';
import Sparkline from '@/features/water/Sparkline';
import { waterChartData, waterChartOptions } from '@/features/water/waterData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WaterPage() {
    // chart data/options moved to features/water/waterData.js

    const [isLogOpen, setIsLogOpen] = useState(false);
    const [liters, setLiters] = useState('');
    const [logDate, setLogDate] = useState('');
    const [logs, setLogs] = useState([]);
    const [savedToast, setSavedToast] = useState(false);

    const formatDate = (d) => {
        try {
            return new Date(d).toLocaleDateString();
        } catch (e) {
            return d;
        }
    };

    const openLog = () => setIsLogOpen(true);
    const closeLog = () => setIsLogOpen(false);
    const handleSaveLog = () => {
        const entry = { id: Date.now(), liters: Number(liters) || 0, date: logDate || new Date().toISOString().slice(0,10) };
        setLogs(prev => [entry, ...prev].slice(0,6));
        // TODO: persist to backend
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 1800);
        setIsLogOpen(false);
        setLiters('');
        setLogDate('');
    };

    

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Droplets className="text-sky-500" size={32} />
                        Water Usage Tracker
                    </h1>
                    <p className="text-gray-500 mt-1">Monitor and reduce your daily water consumption.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={openLog} className="bg-sky-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-sky-100 hover:bg-sky-600 transition-colors">
                        Log Usage
                    </button>
                </div>
            </div>

            {/* Log Usage Modal */}
            <Modal isOpen={isLogOpen} onClose={closeLog}>
                <ModalContent className="max-w-3xl">
                    <div className="bg-gradient-to-r from-sky-50 to-white rounded-t-2xl p-4 relative">
                        <div className="flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-lg">
                                <Droplets className="text-sky-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Log Water Usage</h3>
                                <p className="text-sm text-gray-500">Quickly add a water usage entry. This helps track daily consumption trends.</p>
                            </div>
                        </div>
                        {savedToast && (
                            <div className="absolute right-4 top-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm shadow-sm animate-in fade-in">
                                Saved
                            </div>
                        )}
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <LogForm liters={liters} onLiters={setLiters} date={logDate} onDate={setLogDate} onCancel={closeLog} onSave={handleSaveLog} />
                        </div>
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700">Recent Entries</h4>
                                    <p className="text-xs text-gray-400">Last {logs.length || 0} entries</p>
                                </div>
                                <div className="text-sm font-bold text-gray-900">{logs.reduce((s, it) => s + (it.liters || 0), 0)} L</div>
                            </div>
                            <RecentEntries items={logs} />

                            {/* Tiny sparkline */}
                            {logs.length > 0 && (
                                <div className="mt-4">
                                    <Sparkline logs={logs} />
                                </div>
                            )}
                        </div>
                    </div>
                </ModalContent>
            </Modal>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col">
                    <span className="text-gray-500 text-sm font-medium">Daily Average</span>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-4xl font-bold text-gray-900">148</span>
                        <span className="text-gray-500 mb-1">Liters</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full text-xs font-medium">
                        <TrendingDown size={14} />
                        <span>12% less than last week</span>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col">
                    <span className="text-gray-500 text-sm font-medium">Monthly Total</span>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-4xl font-bold text-gray-900">4,200</span>
                        <span className="text-gray-500 mb-1">Liters</span>
                    </div>
                    <div className="mt-4 text-gray-400 text-xs">
                        Projected: 4,500L
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col border-l-4 border-l-amber-400">
                    <span className="text-gray-500 text-sm font-medium">Alerts</span>
                    <div className="mt-4 flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                            <AlertTriangle size={18} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm">High Usage Detectected</h4>
                            <p className="text-xs text-gray-500 mt-1">Sunday check your irrigation system.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
                    <div className="glass-card p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Consumption</h3>
                <div className="h-[300px] w-full">
                            <Bar data={waterChartData} options={waterChartOptions} />
                </div>
            </div>

            {/* Tips Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-sky-50 to-white p-6 rounded-2xl border border-sky-100">
                    <h3 className="font-semibold text-sky-900 mb-2">Water Saving Tip</h3>
                    <p className="text-sky-700 text-sm leading-relaxed">
                        Fixing a leaky faucet can save up to 3,000 gallons of water per year. Check your bathroom and kitchen sinks for any drips!
                    </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100">
                    <h3 className="font-semibold text-emerald-900 mb-2">Did you know?</h3>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                        A 5-minute shower uses about 10-25 gallons of water, while a full bath can use up to 70 gallons.
                    </p>
                </div>
            </div>
        </div>
    );
}
