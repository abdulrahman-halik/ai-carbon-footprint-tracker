"use client";
import React from "react";
import {
    Zap, BookOpen, Users, Target, Droplets, BarChart3,
    FileText, Lightbulb, Activity, ArrowRight, Leaf
} from "lucide-react";
import Link from "next/link";

const QUICK_ACTIONS = [
    { label: "Log Activity", icon: Activity, color: "emerald", href: null, isModal: true },
    { label: "View Emissions", icon: BarChart3, color: "blue", href: "/emissions", isModal: false },
    { label: "Track Water", icon: Droplets, color: "sky", href: "/water", isModal: false },
    { label: "My Goals", icon: Target, color: "purple", href: "/goals", isModal: false },
    { label: "Energy Usage", icon: Zap, color: "amber", href: "/energy", isModal: false },
    { label: "Reports", icon: FileText, color: "indigo", href: "/reports", isModal: false },
    { label: "Community", icon: Users, color: "orange", href: "/community", isModal: false },
    { label: "Education", icon: BookOpen, color: "teal", href: "/education", isModal: false },
];

const COLOR_MAP = {
    emerald: { bg: "hover:bg-emerald-50", border: "hover:border-emerald-100", icon: "text-gray-400 group-hover:text-emerald-500", text: "group-hover:text-emerald-700" },
    blue: { bg: "hover:bg-blue-50", border: "hover:border-blue-100", icon: "text-gray-400 group-hover:text-blue-500", text: "group-hover:text-blue-700" },
    sky: { bg: "hover:bg-sky-50", border: "hover:border-sky-100", icon: "text-gray-400 group-hover:text-sky-500", text: "group-hover:text-sky-700" },
    purple: { bg: "hover:bg-purple-50", border: "hover:border-purple-100", icon: "text-gray-400 group-hover:text-purple-500", text: "group-hover:text-purple-700" },
    amber: { bg: "hover:bg-amber-50", border: "hover:border-amber-100", icon: "text-gray-400 group-hover:text-amber-500", text: "group-hover:text-amber-700" },
    indigo: { bg: "hover:bg-indigo-50", border: "hover:border-indigo-100", icon: "text-gray-400 group-hover:text-indigo-500", text: "group-hover:text-indigo-700" },
    orange: { bg: "hover:bg-orange-50", border: "hover:border-orange-100", icon: "text-gray-400 group-hover:text-orange-500", text: "group-hover:text-orange-700" },
    teal: { bg: "hover:bg-teal-50", border: "hover:border-teal-100", icon: "text-gray-400 group-hover:text-teal-500", text: "group-hover:text-teal-700" },
};

const RECENT_ACTIVITY = [
    { icon: Leaf, color: "emerald", label: "Carbon entry logged", time: "10 min ago" },
    { icon: Droplets, color: "sky", label: "Water usage tracked — 145 L", time: "2 hours ago" },
    { icon: Target, color: "purple", label: "Goal updated: Reduce Electricity", time: "Yesterday" },
    { icon: Zap, color: "amber", label: "Energy reading recorded", time: "Yesterday" },
    { icon: BookOpen, color: "teal", label: "Completed \"Recycling 101\"", time: "2 days ago" },
];

const AI_TIPS = [
    { text: "Switch to LED bulbs to cut home energy use by up to 25%.", href: "/emissions" },
    { text: "Your water usage is 12% below average — great job! 💧", href: "/water" },
    { text: "You're 15% closer to your monthly carbon goal.", href: "/goals" },
];

export default function DashboardSidebar({ onNewEntry }) {
    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-4 gap-2">
                    {QUICK_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        const c = COLOR_MAP[action.color];
                        const inner = (
                            <span
                                className={`flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 ${c.bg} border border-transparent ${c.border} text-gray-600 transition-all group`}
                            >
                                <Icon className={`w-5 h-5 mb-1.5 ${c.icon}`} />
                                <span className={`text-[10px] font-bold text-center leading-tight text-gray-500 ${c.text}`}>{action.label}</span>
                            </span>
                        );

                        return action.isModal ? (
                            <button key={action.label} onClick={onNewEntry} className="w-full">
                                {inner}
                            </button>
                        ) : (
                            <Link key={action.label} href={action.href}>
                                {inner}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* AI Tip of the Day */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl text-white shadow-lg shadow-emerald-200/40 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white/20 rounded-lg">
                            <Lightbulb className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">AI Insights</p>
                    </div>
                    <div className="space-y-2.5">
                        {AI_TIPS.map((tip, i) => (
                            <Link
                                key={i}
                                href={tip.href}
                                className="group flex items-start gap-2 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors"
                            >
                                <span className="text-[11px] text-emerald-50 leading-relaxed flex-1">{tip.text}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                    <Link href="/log" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                        View all <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="relative pl-5">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-gray-200 to-transparent" />
                    <div className="space-y-4">
                        {RECENT_ACTIVITY.map((item, i) => {
                            const Icon = item.icon;
                            const dotColors = {
                                emerald: "bg-emerald-100 text-emerald-600",
                                sky: "bg-sky-100 text-sky-500",
                                purple: "bg-purple-100 text-purple-600",
                                amber: "bg-amber-100 text-amber-500",
                                teal: "bg-teal-100 text-teal-600",
                            };
                            return (
                                <div key={i} className="relative flex items-start gap-3 group">
                                    <div className={`absolute -left-5 w-3.5 h-3.5 rounded-full border-2 border-white shadow flex-shrink-0 flex items-center justify-center ${dotColors[item.color]}`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                    </div>
                                    <div className="flex-1 bg-gray-50/70 group-hover:bg-gray-50 rounded-xl px-3 py-2.5 transition-colors border border-transparent group-hover:border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1 rounded-md ${dotColors[item.color]}`}>
                                                <Icon className="w-3 h-3" />
                                            </div>
                                            <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 ml-7">{item.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
