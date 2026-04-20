"use client";

import React from 'react';

export default function SimulatorHeader() {
    return (
        <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Future <span className="text-gradient">Impact</span> Simulator
            </h3>
            <p className="text-gray-600 mt-2 max-w-2xl">
                Adjust your lifestyle choices below to see their potential impact on your annual carbon emissions.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-700">
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">Live scenario mix</span>
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">Annualized impact</span>
            </div>
        </div>
    );
}
