"use client";
import React from "react";
import Link from "next/link";
import { BarChart3, TrendingDown, ArrowRight, Droplets, Zap } from "lucide-react";
import { MiniBarChart } from "./DashboardCharts";

const WEEKLY_EMISSIONS = [30, 45, 35, 50, 38, 20, 28];
const WEEKLY_WATER = [145, 132, 155, 120, 140, 148, 150];
const WEEKLY_ENERGY = [280, 310, 295, 340, 300, 260, 290];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function DashboardTrends() {
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Weekly Emissions Trend */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 rounded-xl">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Weekly Carbon Trend</h2>
                            <p className="text-xs text-gray-400">CO2 emissions (kg) · this week</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            <TrendingDown className="w-3.5 h-3.5" /> ↓ 8% avg
                        </span>
                        <Link href="/emissions" className="text-xs font-medium text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
                            Full view <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    <MiniBarChart data={WEEKLY_EMISSIONS} color="#10b981" />
                    <div className="flex justify-between mt-2">
                        {DAYS.map((d, i) => (
                            <span key={i} className="text-[10px] text-gray-400 font-medium flex-1 text-center">{d}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Water & Energy mini panels side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Water */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-sky-50 rounded-xl">
                                <Droplets className="w-4 h-4 text-sky-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">Water Usage</p>
                                <p className="text-[10px] text-gray-400">Liters · daily</p>
                            </div>
                        </div>
                        <Link href="/water" className="text-[10px] font-medium text-sky-600 hover:underline">Details →</Link>
                    </div>
                    <MiniBarChart data={WEEKLY_WATER} color="#0ea5e9" />
                    <div className="flex justify-between mt-2">
                        {DAYS.map((d, i) => (
                            <span key={i} className="text-[10px] text-gray-400 flex-1 text-center">{d}</span>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-xs text-gray-500">Avg / day</span>
                        <span className="text-sm font-bold text-sky-600">
                            {Math.round(WEEKLY_WATER.reduce((a, b) => a + b, 0) / WEEKLY_WATER.length)} L
                        </span>
                    </div>
                </div>

                {/* Energy */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-50 rounded-xl">
                                <Zap className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">Energy Usage</p>
                                <p className="text-[10px] text-gray-400">kWh · daily</p>
                            </div>
                        </div>
                        <Link href="/energy" className="text-[10px] font-medium text-amber-600 hover:underline">Details →</Link>
                    </div>
                    <MiniBarChart data={WEEKLY_ENERGY} color="#f59e0b" />
                    <div className="flex justify-between mt-2">
                        {DAYS.map((d, i) => (
                            <span key={i} className="text-[10px] text-gray-400 flex-1 text-center">{d}</span>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-xs text-gray-500">Avg / day</span>
                        <span className="text-sm font-bold text-amber-600">
                            {Math.round(WEEKLY_ENERGY.reduce((a, b) => a + b, 0) / WEEKLY_ENERGY.length)} kWh
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
