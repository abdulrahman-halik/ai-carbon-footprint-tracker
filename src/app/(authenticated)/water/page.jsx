"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import WaterHeader from '@/features/water/WaterHeader';
import WaterLogModal from '@/features/water/WaterLogModal';
import WaterStats from '@/features/water/WaterStats';
import WaterChart from '@/features/water/WaterChart';
import WaterTips from '@/features/water/WaterTips';
import SavedUsageCards from '@/features/water/SavedUsageCards';
=======
import { WaterHeader, WaterStats, WaterTips } from '@/features/water/WaterDashboardUI';
import { WaterLogModal } from '@/features/water/WaterLogForm';
import { WaterChart } from '@/features/water/WaterVisualization';
import { SavedUsageCards } from '@/features/water/WaterLogHistory';
>>>>>>> origin/main

export default function WaterPage() {
    // chart data/options moved to features/water/waterData.js

    const [isLogOpen, setIsLogOpen] = useState(false);
    const [liters, setLiters] = useState('');
    const [logDate, setLogDate] = useState('');
    const [logs, setLogs] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [savedToast, setSavedToast] = useState(false);

    const formatDate = (d) => {
        try {
            return new Date(d).toLocaleDateString();
        } catch (e) {
            return d;
        }
    };

    // load persisted logs from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem('water_logs');
            if (raw) setLogs(JSON.parse(raw));
        } catch (e) {
            console.error('Failed to load water logs', e);
        }
    }, []);

    const persist = (next) => {
        setLogs(next);
        try { localStorage.setItem('water_logs', JSON.stringify(next)); } catch (e) { console.error('persist failed', e); }
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

    const handleSaveLog = () => {
<<<<<<< HEAD
        const entry = { id: editingId || Date.now(), liters: Number(liters) || 0, date: logDate || new Date().toISOString().slice(0,10) };
=======
        const entry = { id: editingId || Date.now(), liters: Number(liters) || 0, date: logDate || new Date().toISOString().slice(0, 10) };
>>>>>>> origin/main
        if (editingId) {
            const next = logs.map(l => l.id === editingId ? entry : l);
            persist(next);
        } else {
<<<<<<< HEAD
            const next = [entry, ...logs].slice(0,50);
=======
            const next = [entry, ...logs].slice(0, 50);
>>>>>>> origin/main
            persist(next);
        }
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 1800);
        closeLog();
    };

    const handleEdit = (id) => {
        const found = logs.find(l => l.id === id);
        if (!found) return;
        setEditingId(id);
        setLiters(String(found.liters || ''));
<<<<<<< HEAD
        setLogDate(found.date || new Date().toISOString().slice(0,10));
=======
        setLogDate(found.date || new Date().toISOString().slice(0, 10));
>>>>>>> origin/main
        setIsLogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this log entry?')) {
            const next = logs.filter(l => l.id !== id);
            persist(next);
        }
    };

<<<<<<< HEAD
    
=======

>>>>>>> origin/main

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