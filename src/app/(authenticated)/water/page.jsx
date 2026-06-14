"use client";

import React, { useState, useEffect } from "react";
import { WaterHeader, WaterStats, WaterTips } from '@/features/water/WaterDashboardUI';
import { WaterLogModal } from '@/features/water/WaterLogForm';
import { WaterChart } from '@/features/water/WaterVisualization';
import { SavedUsageCards } from '@/features/water/WaterLogHistory';
import waterService from '@/services/waterService';

export default function WaterPage() {
    // chart data/options moved to features/water/waterData.js

    const [isLogOpen, setIsLogOpen] = useState(false);
    const [liters, setLiters] = useState('');
    const [logDate, setLogDate] = useState('');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const rawData = await waterService.getLogs();
            if (rawData && Array.isArray(rawData)) {
                setLogs(rawData.map(r => ({
                    id: r._id || r.id,
                    liters: r.value,
                    date: r.date
                })));
            }
        } catch (e) {
            console.error(e);
        }
    };
    const [editingId, setEditingId] = useState(null);
    const [savedToast, setSavedToast] = useState(false);

    const formatDate = (d) => {
        try {
            return new Date(d).toLocaleDateString();
        } catch (e) {
            return d;
        }
    };


    const openLog = () => {
        setEditingId(null);
        setLiters('');
        setLogDate('');
        setIsLogOpen(true);
    };

    const closeLog = () => {
        setIsLogOpen(false);
        setEditingId(null);
        setLiters('');
        setLogDate('');
    };

    const handleSaveLog = async () => {
        try {
            const dateStr = logDate || new Date().toISOString().slice(0, 10);
            const payload = { value: Number(liters) || 0, date: new Date(dateStr).toISOString() };

            if (editingId) {
                await waterService.updateLog(editingId, payload);
            } else {
                await waterService.logWater(payload);
            }

            await fetchLogs();
            setSavedToast(true);
            setTimeout(() => setSavedToast(false), 1800);
            closeLog();
        } catch (e) {
            console.error("Save failed", e);
        }
    };

    const handleEdit = (id) => {
        const found = logs.find(l => l.id === id);
        if (!found) return;
        setEditingId(id);
        setLiters(String(found.liters || ''));
        setLogDate(found.date || new Date().toISOString().slice(0, 10));
        setIsLogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this log entry?')) {
            try {
                await waterService.deleteLog(id);
                setLogs(logs.filter(l => l.id !== id));
            } catch (e) {
                console.error("Delete failed", e);
            }
        }
    };



    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <WaterHeader onOpen={openLog} />
            <WaterLogModal
                isOpen={isLogOpen}
                onClose={closeLog}
                savedToast={savedToast}
                liters={liters}
                setLiters={setLiters}
                date={logDate}
                setDate={setLogDate}
                onSave={handleSaveLog}
                logs={logs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editingId={editingId}
            />

            <WaterStats />

            <WaterChart />

            {/* Saved usage cards */}
            <SavedUsageCards logs={logs.slice(0, 12)} onEdit={handleEdit} onDelete={handleDelete} editingId={editingId} onCancel={closeLog} />

            <WaterTips />
        </div>
    );
}