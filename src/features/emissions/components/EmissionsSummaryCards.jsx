"use client";
import React from 'react';
import { Zap, Car, Calculator, UtensilsCrossed, ShoppingBag, Leaf } from 'lucide-react';

const IMPACT_COLORS = {
    excellent: { dot: 'bg-emerald-500', label: 'text-emerald-700 bg-emerald-50', text: '🟢 Low' },
    good: { dot: 'bg-blue-500', label: 'text-blue-700 bg-blue-50', text: '🔵 Moderate' },
    average: { dot: 'bg-yellow-500', label: 'text-yellow-700 bg-yellow-50', text: '🟡 Medium' },
    high: { dot: 'bg-red-500', label: 'text-red-700 bg-red-50', text: '🔴 High' },
};

function getImpactLevel(value, low, mid) {
    if (value < low) return 'excellent';
    if (value < mid) return 'good';
    if (value < mid * 1.5) return 'average';
    return 'high';
}

function StatCard({ badge, badgeColor, icon: Icon, iconBg, value, unit, subtitle, impactLevel }) {
    const impact = IMPACT_COLORS[impactLevel] || IMPACT_COLORS.average;
    return (
        <div className="glass-card bg-white border-none shadow-sm hover:shadow-md transition-all duration-200 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <span className={`${badgeColor} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>{badge}</span>
                <div className={`${iconBg} rounded-full p-1.5`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 tabular-nums">{value}</h3>
                <p className="text-sm text-gray-500">{unit}</p>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold mt-1 ${impact.label}`}>
                    Impact: {impact.text}
                </span>
                {subtitle && <p className="text-xs font-medium mt-1">{subtitle}</p>}
            </div>
        </div>
    );
}

/**
 * EmissionsSummaryCards — 5-card grid: Total, Energy, Transport, Food, Shopping.
 */
export default function EmissionsSummaryCards({ results, feedback }) {
    const { categories, totalFootprint } = results;
    const energyPct = ((categories.energy / totalFootprint) * 100).toFixed(1);
    const transportPct = ((categories.transport / totalFootprint) * 100).toFixed(1);
    const foodPct = (((categories.food || 0) / totalFootprint) * 100).toFixed(1);
    const shoppingPct = (((categories.shopping || 0) / totalFootprint) * 100).toFixed(1);

    const levelClass = {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        average: 'bg-yellow-100 text-yellow-800',
    }[feedback?.level] ?? 'bg-orange-100 text-orange-800';

    return (
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Footprint */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Total Footprint
                    </span>
                    <div className="bg-emerald-500 rounded-full p-1">
                        <Calculator className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-gray-900">{results.totalFootprint.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${levelClass}`}>
                        {feedback?.text}
=======
        <div className="space-y-4">
            {/* Hero total card */}
            <div className="glass-card bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-1">Total Carbon Footprint</p>
                        <h2 className="text-4xl font-extrabold tabular-nums">{totalFootprint.toFixed(1)}</h2>
                        <p className="text-sm text-emerald-100">kg CO₂e / month</p>
                    </div>
                    <div className="text-right">
                        <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${levelClass}`}>
                            {feedback?.text}
                        </div>
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                    </div>
                </div>
                {feedback?.desc && <p className="text-xs text-emerald-100 mt-3">{feedback.desc}</p>}
            </div>

<<<<<<< HEAD
            {/* Energy */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Energy
                    </span>
                    <div className="bg-emerald-500 rounded-full p-1">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{results.categories.energy.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <p className="text-xs text-emerald-600 font-medium">{energyPct}% of total</p>
                </div>
            </div>

            {/* Transport */}
            <div className="glass-card bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Transport
                    </span>
                    <div className="bg-amber-500 rounded-full p-1">
                        <Car className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{results.categories.transport.toFixed(1)}</h3>
                    <p className="text-sm text-gray-500">kg CO₂e / month</p>
                    <p className="text-xs text-amber-700 font-medium">{transportPct}% of total</p>
                </div>
=======
            {/* 4 category cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    badge="Energy" badgeColor="bg-emerald-50 text-emerald-600"
                    icon={Zap} iconBg="bg-emerald-500"
                    value={categories.energy.toFixed(1)} unit="kg CO₂e / month"
                    subtitle={<span className="text-emerald-600">{energyPct}% of total</span>}
                    impactLevel={getImpactLevel(categories.energy, 80, 200)}
                />
                <StatCard
                    badge="Transport" badgeColor="bg-orange-50 text-orange-600"
                    icon={Car} iconBg="bg-orange-500"
                    value={categories.transport.toFixed(1)} unit="kg CO₂e / month"
                    subtitle={<span className="text-orange-600">{transportPct}% of total</span>}
                    impactLevel={getImpactLevel(categories.transport, 50, 150)}
                />
                <StatCard
                    badge="Food" badgeColor="bg-rose-50 text-rose-600"
                    icon={UtensilsCrossed} iconBg="bg-rose-500"
                    value={(categories.food || 0).toFixed(1)} unit="kg CO₂e / month"
                    subtitle={<span className="text-rose-600">{foodPct}% of total</span>}
                    impactLevel={getImpactLevel(categories.food || 0, 60, 130)}
                />
                <StatCard
                    badge="Shopping" badgeColor="bg-purple-50 text-purple-600"
                    icon={ShoppingBag} iconBg="bg-purple-500"
                    value={(categories.shopping || 0).toFixed(1)} unit="kg CO₂e / month"
                    subtitle={<span className="text-purple-600">{shoppingPct}% of total</span>}
                    impactLevel={getImpactLevel(categories.shopping || 0, 20, 60)}
                />
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
            </div>
        </div>
    );
}
