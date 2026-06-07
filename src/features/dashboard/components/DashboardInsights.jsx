"use client";
import React, { useMemo } from "react";
import { AlertTriangle, CheckCircle2, Award, Info } from "lucide-react";

const ALERT_STYLES = {
    warning: "bg-amber-50 border-amber-100 text-amber-800",
    success: "bg-emerald-50 border-emerald-100 text-emerald-800",
    info: "bg-blue-50 border-blue-100 text-blue-800",
};

export default function DashboardInsights({ stats, trends }) {
    const insights = useMemo(() => {
        let generated = [];

        if (!stats) {
            return [{ type: "info", icon: Info, text: "Log your first activity to start generating personalized environmental insights." }];
        }

        const co2 = stats.total_emissions || 0;
        const water = stats.total_water_usage || 0;

        if (co2 === 0) {
            generated.push({ type: "info", icon: Award, text: "You have a clean slate! Log your latest commute or meal to start tracking." });
        } else if (co2 > 500) {
            generated.push({ type: "warning", icon: AlertTriangle, text: `Your carbon footprint is high (${co2.toFixed(1)} kg) this period. Consider reducing car travel.` });
        } else {
            generated.push({ type: "success", icon: CheckCircle2, text: "Great job keeping your carbon footprint low this period!" });
        }

        if (water > 0) {
            if (water > 300) {
                generated.push({ type: "warning", icon: AlertTriangle, text: "High water usage detected. Try taking shorter showers." });
            } else {
                generated.push({ type: "success", icon: CheckCircle2, text: "Your water conservation habits are excellent!" });
            }
        }

        return generated;
    }, [stats, trends]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.slice(0, 3).map((ins, i) => {
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
