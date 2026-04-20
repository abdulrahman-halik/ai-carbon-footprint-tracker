"use client";
import React from "react";
import { AlertTriangle, CheckCircle2, Award } from "lucide-react";

const INSIGHTS = [
    { type: "warning", icon: AlertTriangle, color: "amber", text: "High commute detected — 15% above last month. Consider WFH options." },
    { type: "success", icon: CheckCircle2, color: "emerald", text: "Water usage is 12% below average this week. Outstanding!" },
    { type: "info", icon: Award, color: "blue", text: "You're on track for your January carbon budget — 55% remaining." },
];

const ALERT_STYLES = {
    warning: "bg-amber-50 border-amber-100 text-amber-800",
    success: "bg-emerald-50 border-emerald-100 text-emerald-800",
    info: "bg-blue-50 border-blue-100 text-blue-800",
};

export default function DashboardInsights() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSIGHTS.map((ins, i) => {
                const Icon = ins.icon;
                return (
                    <div
                        key={i}
                        className={`flex items-start gap-3 p-4 rounded-2xl border text-sm font-medium ${ALERT_STYLES[ins.type]} animate-in fade-in duration-500`}
                        style={{ animationDelay: `${i * 120}ms` }}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="leading-snug">{ins.text}</p>
                    </div>
                );
            })}
        </div>
    );
}
