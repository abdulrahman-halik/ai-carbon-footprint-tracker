"use client";
import React from 'react';
import SimulatorTool from '@/features/simulation/SimulatorTool';

export default function SimulatePage() {
    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Impact Simulator</h1>
                <p className="text-gray-500">Explore how lifestyle changes can reduce your carbon footprint.</p>
            </div>

            <SimulatorTool />
        </div>
    );
}
