"use client";

import React from 'react';
import { AnimatedNumber, DonutPercent } from './AnimatedNumber';

export default function SimulatorResults({ projectedFootprint, savings, baseFootprint }) {
    return (
        <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden text-center">
                {/* Decorative background circles */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

                <h4 className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-6">Projected Annual Footprint</h4>
                <div className="flex items-center justify-center">
                    <div className="mr-6">
                        <DonutPercent percent={Math.min(100, Math.round((savings / baseFootprint) * 100))} size={120} stroke={14} color="#60a5fa" bg="#ffffff30" />
                    </div>
                    <div className="text-left">
                        <div className="text-6xl font-extrabold tracking-tight">
                            <AnimatedNumber value={projectedFootprint} format={(v) => v.toLocaleString()} className="text-white" />
                        </div>
                        <div className="text-blue-200 mt-1 mb-6 text-sm">kg CO2e / year</div>

                        {savings > 0 ? (
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-fade-in">
                                <p className="text-blue-50 font-medium text-sm mb-1">Total Savings</p>
                                <p className="text-3xl font-bold text-green-300">-<AnimatedNumber value={savings} className="inline" /></p>
                                <p className="text-xs text-blue-100 mt-2 opacity-90">
                                    Equivalent to planting <span className="font-bold text-white">{Math.ceil(savings / 20)}</span> trees! 🌲
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl border border-white/10 text-blue-200 text-sm">
                                Adjust the sliders to see your savings.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
