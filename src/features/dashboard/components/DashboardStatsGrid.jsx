"use client";
import React from "react";
import {
    Leaf, TrendingDown, Droplets, Zap, Target, Trophy, BookOpen, Users,
    ArrowUp, ArrowDown, Minus
} from "lucide-react";
import Link from "next/link";

const STAT_CARDS = [
    {
        id: "footprint",
        label: "Carbon Footprint",
        value: "850 kg",
        subLabel: "this month",
        badge: "↓ 15%",
        badgeColor: "bg-emerald-100 text-emerald-700",
        icon: Leaf,
        iconBg: "bg-emerald-50 text-emerald-600",
        accent: "from-emerald-50 to-teal-50",
        border: "border-emerald-100",
        trend: "down",
        href: "/emissions",
    },
    {
        id: "water",
        label: "Water Usage",
        value: "148 L",
        subLabel: "daily avg",
        badge: "↓ 12%",
        badgeColor: "bg-sky-100 text-sky-700",
        icon: Droplets,
        iconBg: "bg-sky-50 text-sky-500",
        accent: "from-sky-50 to-cyan-50",
        border: "border-sky-100",
        trend: "down",
        href: "/water",
    },
    {
        id: "energy",
        label: "Energy Usage",
        value: "300 kWh",
        subLabel: "this month",
        badge: "↑ 5%",
        badgeColor: "bg-amber-100 text-amber-700",
        icon: Zap,
        iconBg: "bg-amber-50 text-amber-500",
        accent: "from-amber-50 to-yellow-50",
        border: "border-amber-100",
        trend: "up",
        href: "/energy",
    },
    {
        id: "goals",
        label: "Active Goals",
        value: "3 / 5",
        subLabel: "completed",
        badge: "On Track",
        badgeColor: "bg-purple-100 text-purple-700",
        icon: Target,
        iconBg: "bg-purple-50 text-purple-600",
        accent: "from-purple-50 to-violet-50",
        border: "border-purple-100",
        trend: "neutral",
        href: "/goals",
    },
    {
        id: "reduction",
        label: "Reduction Goal",
        value: "45%",
        subLabel: "of 100% reached",
        badge: "In Progress",
        badgeColor: "bg-blue-100 text-blue-700",
        icon: TrendingDown,
        iconBg: "bg-blue-50 text-blue-600",
        accent: "from-blue-50 to-indigo-50",
        border: "border-blue-100",
        trend: "neutral",
        href: "/emissions",
    },
    {
        id: "rank",
        label: "Community Rank",
        value: "Top 10%",
        subLabel: "vs neighbors",
        badge: "↑ 2 spots",
        badgeColor: "bg-orange-100 text-orange-700",
        icon: Trophy,
        iconBg: "bg-orange-50 text-orange-500",
        accent: "from-orange-50 to-rose-50",
        border: "border-orange-100",
        trend: "up",
        href: "/community",
    },
];

const TrendIcon = ({ trend }) => {
    if (trend === "down") return <ArrowDown className="w-3 h-3 text-emerald-600" />;
    if (trend === "up") return <ArrowUp className="w-3 h-3 text-orange-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
};

export default function DashboardStatsGrid({ stats }) {
    // Override first two cards with live stats if available
    const cards = STAT_CARDS.map((c) => {
        if (c.id === "footprint" && stats?.budget) {
            return { ...c, value: `${stats.budget.used} kg`, subLabel: `of ${stats.budget.total} kg budget` };
        }
        if (c.id === "reduction" && stats?.budget) {
            return { ...c, value: `${stats.budget.percentage}%` };
        }
        return c;
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Link
                        key={card.id}
                        href={card.href}
                        className={`relative overflow-hidden group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br ${card.accent} border ${card.border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
                    >
                        {/* Decorative glow */}
                        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/60 blur-2xl" />

                        <div className="relative flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg ${card.iconBg} shadow-sm`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                                <TrendIcon trend={card.trend} />
                                {card.badge}
                            </div>
                        </div>

                        <div className="relative">
                            <p className="text-[11px] text-gray-500 font-medium mb-0.5">{card.label}</p>
                            <p className="text-xl font-extrabold text-gray-900 tracking-tight">{card.value}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{card.subLabel}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
