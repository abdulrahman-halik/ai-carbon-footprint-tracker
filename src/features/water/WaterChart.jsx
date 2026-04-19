"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { waterChartData, waterChartOptions } from './waterData';
import { BarChart3, Clock, Droplets } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WaterChart() {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ring-1 ring-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl text-white shadow-lg shadow-sky-200/50">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Weekly Consumption</h3>
                            <p className="text-xs text-gray-400">Daily water usage breakdown</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                            <span className="text-xs font-medium text-sky-700">Avg: 148L / day</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            This week
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 sm:p-8">
                <div className="h-[300px] w-full">
                    <Bar data={waterChartData} options={waterChartOptions} />
                </div>
            </div>
        </div>
    );
}
